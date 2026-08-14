"use client";

import React, { useState, useMemo } from "react";
import {
  Zap,
  Activity,
  Gauge,
  Sliders,
  Share2,
  Printer,
  Check,
  ChevronUp,
  ChevronDown,
  Flame,
  Trophy,
  Wind,
  Info,
  Car,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  EngineCalcMode,
  DragModel,
  DrivetrainType,
  AtmosphericConditions,
  EngineHorsepowerResult,
} from "@/app/calculators/engine-horsepower-calculator/types";
import { calculateEngineHorsepower } from "@/app/calculators/engine-horsepower-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function EngineHorsepowerCalculator() {
  // Mode & Config State
  const [mode, setMode] = useState<EngineCalcMode>("et_mode");
  const [drivetrain, setDrivetrain] = useState<DrivetrainType>("rwd_manual");
  const [dragModel, setDragModel] = useState<DragModel>("fox");

  // Mode 1: ET Mode & Mode 2: Trap Speed Mode Inputs
  const [curbWeight, setCurbWeight] = useState<number>(3500);
  const [driverWeight, setDriverWeight] = useState<number>(180);
  const [quarterMileET, setQuarterMileET] = useState<number>(12.0);
  const [trapSpeedMph, setTrapSpeedMph] = useState<number>(115);

  // Mode 3: Torque & RPM Inputs
  const [torqueInput, setTorqueInput] = useState<number>(400);
  const [torqueUnit, setTorqueUnit] = useState<"lbft" | "nm">("lbft");
  const [rpmInput, setRpmInput] = useState<number>(5252);

  // Mode 4: Displacement & Boost Inputs
  const [displacementLiters, setDisplacementLiters] = useState<number>(5.0);
  const [boostPsi, setBoostPsi] = useState<number>(10);
  const [vePercent, setVePercent] = useState<number>(85);
  const [staticCR, setStaticCR] = useState<number>(9.5);

  // Atmospheric Conditions
  const [atmosphere, setAtmosphere] = useState<AtmosphericConditions>({
    enabled: false,
    tempF: 77,
    pressureInHg: 29.92,
    humidityPercent: 0,
  });

  // UI State
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Compute Results
  const result: EngineHorsepowerResult = useMemo(() => {
    return calculateEngineHorsepower(
      mode,
      drivetrain,
      dragModel,
      quarterMileET,
      trapSpeedMph,
      curbWeight,
      driverWeight,
      torqueInput,
      torqueUnit,
      rpmInput,
      displacementLiters,
      boostPsi,
      vePercent,
      staticCR,
      atmosphere
    );
  }, [
    mode,
    drivetrain,
    dragModel,
    quarterMileET,
    trapSpeedMph,
    curbWeight,
    driverWeight,
    torqueInput,
    torqueUnit,
    rpmInput,
    displacementLiters,
    boostPsi,
    vePercent,
    staticCR,
    atmosphere,
  ]);

  // Copy Summary for Forums
  const handleCopySummary = () => {
    let text = `🏎️ CalcPlatform Engine Dyno Briefing:\n`;
    text += `Crank Horsepower: ${result.crankBHP} BHP (${result.kilowatts} kW | ${result.metricPS} PS)\n`;
    text += `Wheel Horsepower (${result.drivetrainLossPercent}% loss): ${result.wheelWHP} WHP\n`;
    text += `Total Weight: ${result.totalWeightLbs} lbs (${result.curbWeightLbs} curb + ${result.driverWeightLbs} driver)\n`;
    text += `Power-to-Weight: ${result.hpPerTon} HP/ton (${result.lbPerHp} lb/HP) - ${result.performanceTierLabel}\n`;
    text += `Est 1/4-Mile ET: ${result.estimatedET}s @ ${result.estimatedTrapSpeedMph} mph\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // PDF Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "Engine Horsepower & Performance Spec-Sheet",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Engine Horsepower Calculator",
      },
      keyMetrics: [
        { label: "Crankshaft Horsepower (BHP)", value: `${result.crankBHP} BHP (${result.kilowatts} kW)`, highlight: true },
        { label: "Wheel Power (WHP)", value: `${result.wheelWHP} WHP (${result.drivetrainLossPercent}% loss)` },
        { label: "Total Race Weight", value: `${result.totalWeightLbs} lbs (${result.curbWeightLbs} curb + ${result.driverWeightLbs} payload)` },
        { label: "Power-to-Weight Ratio", value: `${result.hpPerTon} HP/ton (${result.lbPerHp} lb/HP)` },
      ],
      sections: [
        {
          title: "Quarter-Mile & Performance Classification",
          items: [
            { label: "Performance Category Tier", value: result.performanceTierLabel },
            { label: "Estimated 1/4-Mile Elapsed Time", value: `${result.estimatedET} seconds` },
            { label: "Estimated Finish Line Trap Speed", value: `${result.estimatedTrapSpeedMph} mph` },
            { label: "Estimated 0–60 mph Sprint Time", value: `${result.estimatedZeroToSixtySec} seconds` },
          ],
        },
        mode === "displacement_boost"
          ? {
              title: "Forced Induction & Air Flow Metrics",
              items: [
                { label: "Engine Displacement", value: `${displacementLiters} Liters` },
                { label: "Boost Pressure", value: `${result.boostPsi} PSI` },
                { label: "Volumetric Efficiency (VE)", value: `${vePercent}%` },
                { label: "Effective Compression Ratio", value: `${result.effectiveCompressionRatio}:1` },
                { label: "Calculated Intake Air Flow", value: `${result.airflowCFM} CFM` },
              ],
            }
          : {
              title: "Global Power Standard Equivalents",
              items: [
                { label: "Mechanical Horsepower", value: `${result.crankBHP} HP` },
                { label: "Metric Horsepower", value: `${result.metricPS} PS / CV` },
                { label: "Kilowatts Output", value: `${result.kilowatts} kW` },
                { label: "SAE Weather Corrected Power", value: `${result.correctedBHP} BHP (CF: ${result.saeCorrectionFactor})` },
              ],
            },
      ],
    };
  }, [result, displacementLiters, vePercent, mode]);

  return (
    <div className="space-y-4">
      {/* 1. TOP TOOLBAR CONTROL BAR - LIGHT HARMONIOUS THEME WITH 3D BUTTONS */}
      <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Mode Selector (Col 8) */}
          <div className="md:col-span-8 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Calculation Method Mode
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              <button
                onClick={() => setMode("et_mode")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "et_mode"
                    ? "bg-red-600 text-white font-extrabold shadow-md shadow-red-600/30 border-b-2 border-red-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                1/4-Mile ET
              </button>
              <button
                onClick={() => setMode("trap_speed")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "trap_speed"
                    ? "bg-red-600 text-white font-extrabold shadow-md shadow-red-600/30 border-b-2 border-red-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Trap Speed
              </button>
              <button
                onClick={() => setMode("torque_rpm")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "torque_rpm"
                    ? "bg-red-600 text-white font-extrabold shadow-md shadow-red-600/30 border-b-2 border-red-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Torque &amp; RPM
              </button>
              <button
                onClick={() => setMode("displacement_boost")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "displacement_boost"
                    ? "bg-red-600 text-white font-extrabold shadow-md shadow-red-600/30 border-b-2 border-red-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Boost &amp; CC
              </button>
            </div>
          </div>

          {/* Export & Forum Tools (Col 4) */}
          <div className="md:col-span-4 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Forum Export &amp; PDF Spec Sheet
            </span>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleCopySummary}
                variant="outline"
                size="sm"
                className="h-8 text-xs font-bold gap-1 cursor-pointer bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950 flex-1"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy Specs"}
              </Button>

              <Button
                onClick={() => setShowReportModal(true)}
                variant="outline"
                size="sm"
                className="h-8 text-xs font-bold gap-1 cursor-pointer bg-red-600 hover:bg-red-500 text-white border-b-2 border-red-800 shadow-md shadow-red-600/20 flex-1"
              >
                <Printer className="h-3.5 w-3.5" /> PDF Sheet
              </Button>
            </div>
          </div>
        </div>

        {/* Drivetrain Loss Selection */}
        <div className="pt-2.5 border-t border-slate-200 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
            Drivetrain Loss Matrix (WHP vs. BHP)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
            <button
              onClick={() => setDrivetrain("fwd_manual")}
              className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                drivetrain === "fwd_manual"
                  ? "bg-slate-800 text-white font-extrabold shadow-md shadow-slate-900/30 border-b-2 border-slate-950 active:translate-y-0.5"
                  : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
              }`}
            >
              FWD Manual (-11%)
            </button>
            <button
              onClick={() => setDrivetrain("rwd_manual")}
              className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                drivetrain === "rwd_manual"
                  ? "bg-slate-800 text-white font-extrabold shadow-md shadow-slate-900/30 border-b-2 border-slate-950 active:translate-y-0.5"
                  : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
              }`}
            >
              RWD Manual (-14%)
            </button>
            <button
              onClick={() => setDrivetrain("rwd_auto")}
              className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                drivetrain === "rwd_auto"
                  ? "bg-slate-800 text-white font-extrabold shadow-md shadow-slate-900/30 border-b-2 border-slate-950 active:translate-y-0.5"
                  : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
              }`}
            >
              RWD Auto (-17.5%)
            </button>
            <button
              onClick={() => setDrivetrain("awd")}
              className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                drivetrain === "awd"
                  ? "bg-slate-800 text-white font-extrabold shadow-md shadow-slate-900/30 border-b-2 border-slate-950 active:translate-y-0.5"
                  : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
              }`}
            >
              AWD / 4WD (-22%)
            </button>
          </div>
        </div>
      </div>

      {/* 2. SPLIT PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-4">
          {/* VEHICLE WEIGHT INPUTS (For Mode 1 & Mode 2) */}
          {(mode === "et_mode" || mode === "trap_speed") && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Car className="h-4 w-4 text-red-600" /> Vehicle Weight &amp; Driver Payload
                </label>
                <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-[10px] font-bold">
                  <button
                    onClick={() => setDragModel("fox")}
                    className={`px-2 py-0.5 rounded cursor-pointer ${
                      dragModel === "fox" ? "bg-red-600 text-white" : "text-zinc-500"
                    }`}
                  >
                    Fox (234)
                  </button>
                  <button
                    onClick={() => setDragModel("hale")}
                    className={`px-2 py-0.5 rounded cursor-pointer ${
                      dragModel === "hale" ? "bg-red-600 text-white" : "text-zinc-500"
                    }`}
                  >
                    Hale (230)
                  </button>
                  <button
                    onClick={() => setDragModel("hunt")}
                    className={`px-2 py-0.5 rounded cursor-pointer ${
                      dragModel === "hunt" ? "bg-red-600 text-white" : "text-zinc-500"
                    }`}
                  >
                    Hunt (228)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Curb Weight (lbs)</label>
                  <Input
                    type="number"
                    value={curbWeight}
                    onChange={(e) => setCurbWeight(Number(e.target.value))}
                    className="h-9 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Driver Payload (lbs)</label>
                  <Input
                    type="number"
                    value={driverWeight}
                    onChange={(e) => setDriverWeight(Number(e.target.value))}
                    className="h-9 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MODE 1: ELAPSED TIME INPUT */}
          {mode === "et_mode" && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Trophy className="h-3.5 w-3.5 text-red-600" /> Quarter-Mile Elapsed Time (Seconds)
              </label>
              <Input
                type="number"
                step="0.01"
                value={quarterMileET}
                onChange={(e) => setQuarterMileET(Number(e.target.value))}
                className="h-9 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
              />
            </div>
          )}

          {/* MODE 2: TRAP SPEED INPUT */}
          {mode === "trap_speed" && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Wind className="h-3.5 w-3.5 text-red-600" /> Finish Line Trap Speed (MPH)
              </label>
              <Input
                type="number"
                value={trapSpeedMph}
                onChange={(e) => setTrapSpeedMph(Number(e.target.value))}
                className="h-9 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
              />
            </div>
          )}

          {/* MODE 3: TORQUE & RPM MODE */}
          {mode === "torque_rpm" && (
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-red-600" /> Rotational Torque &amp; Engine Speed
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    <span>Engine Torque</span>
                    <button
                      onClick={() => setTorqueUnit(torqueUnit === "lbft" ? "nm" : "lbft")}
                      className="text-[10px] text-red-600 hover:underline font-extrabold cursor-pointer"
                    >
                      Unit: {torqueUnit === "lbft" ? "lb-ft" : "N-m"}
                    </button>
                  </div>
                  <Input
                    type="number"
                    value={torqueInput}
                    onChange={(e) => setTorqueInput(Number(e.target.value))}
                    className="h-9 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Engine Speed (RPM)</label>
                  <Input
                    type="number"
                    step="100"
                    value={rpmInput}
                    onChange={(e) => setRpmInput(Number(e.target.value))}
                    className="h-9 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MODE 4: DISPLACEMENT & BOOST ESTIMATOR */}
          {mode === "displacement_boost" && (
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-red-600" /> Engine Displacement &amp; Forced Induction Boost
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Engine Size (Liters)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={displacementLiters}
                    onChange={(e) => setDisplacementLiters(Number(e.target.value))}
                    className="h-9 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Boost Pressure (PSI)</label>
                  <Input
                    type="number"
                    step="0.5"
                    value={boostPsi}
                    onChange={(e) => setBoostPsi(Number(e.target.value))}
                    className="h-9 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300">Volumetric Efficiency (%)</label>
                  <Input
                    type="number"
                    value={vePercent}
                    onChange={(e) => setVePercent(Number(e.target.value))}
                    className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300">Static Compression Ratio</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={staticCR}
                    onChange={(e) => setStaticCR(Number(e.target.value))}
                    className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* EXPANDABLE ACCORDION: SAE WEATHER CORRECTION */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-red-600 cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <Sliders className="h-3.5 w-3.5" /> Atmospheric SAE J1349 Weather Correction
              </span>
              {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showAdvanced && (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-3 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-red-700 dark:text-red-400">
                  <input
                    type="checkbox"
                    checked={atmosphere.enabled}
                    onChange={(e) => setAtmosphere({ ...atmosphere, enabled: e.target.checked })}
                    className="rounded text-red-600 accent-red-600 cursor-pointer"
                  />
                  Enable SAE J1349 Dyno Correction
                </label>

                {atmosphere.enabled && (
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="space-y-1">
                      <label className="font-bold text-zinc-700 dark:text-zinc-300">Ambient Temp (°F)</label>
                      <Input
                        type="number"
                        value={atmosphere.tempF}
                        onChange={(e) => setAtmosphere({ ...atmosphere, tempF: Number(e.target.value) })}
                        className="h-8 text-xs font-mono bg-white dark:bg-zinc-900 border-zinc-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-zinc-700 dark:text-zinc-300">Barometric (inHg)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={atmosphere.pressureInHg}
                        onChange={(e) => setAtmosphere({ ...atmosphere, pressureInHg: Number(e.target.value) })}
                        className="h-8 text-xs font-mono bg-white dark:bg-zinc-900 border-zinc-200"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DASHBOARD (Col 5) - INTERACTIVE CIRCULAR POWER GAUGE */}
        <div className="lg:col-span-5 bg-gradient-to-br from-red-600 via-rose-700 to-slate-900 text-white p-4 rounded-2xl shadow-md space-y-3.5">
          <div className="flex items-center justify-between border-b border-white/20 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-100 flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-white" /> Engine Performance Output
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
              {result.performanceTierLabel.split(" ")[0]} Tier
            </span>
          </div>

          {/* Primary Result Card */}
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-200 block">
              Calculated Crankshaft Power
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              {result.crankBHP} BHP
            </div>
            <p className="text-[11px] text-red-100 font-medium">
              Wheel Power: <span className="font-bold text-white">{result.wheelWHP} WHP</span> ({result.drivetrainLossPercent}% loss) | {result.kilowatts} kW | {result.metricPS} PS
            </p>
          </div>

          {/* INTERACTIVE SVG CIRCULAR POWER DIAL GAUGE */}
          <div className="bg-black/40 backdrop-blur-xs p-3 rounded-xl border border-white/20 space-y-1.5 text-xs text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-200 block">
              Engine Power Dial &amp; ET Expectation
            </span>

            <div className="h-32 w-full relative flex items-center justify-center pt-1">
              <svg className="w-48 h-28 overflow-visible" viewBox="0 0 200 120">
                {/* Arc Background track */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="14"
                  strokeLinecap="round"
                />

                {/* Animated Power Arc fill */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#gaugeGradient)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (Math.min(180, result.gaugeAngle) / 180) * 251.2}
                  className="transition-all duration-700 ease-out"
                />

                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </linearGradient>
                </defs>

                {/* Center Dial Text */}
                <text x="100" y="85" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="monospace">
                  {result.crankBHP}
                </text>
                <text x="100" y="98" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">
                  EST CRANK BHP
                </text>

                {/* Gauge End Labels */}
                <text x="15" y="115" fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="bold">0 HP</text>
                <text x="175" y="115" fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="bold">1k+ HP</text>
              </svg>
            </div>
          </div>

          {/* Side-by-side Mini Metrics */}
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-red-200 block">Power-to-Weight</span>
              <span className="font-mono font-bold text-xs text-white">{result.hpPerTon} HP/ton ({result.lbPerHp} lb/HP)</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-red-200 block">Est 1/4-Mile ET</span>
              <span className="font-mono font-bold text-xs text-white">{result.estimatedET}s @ {result.estimatedTrapSpeedMph} mph</span>
            </div>
          </div>
        </div>
      </div>

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />
    </div>
  );
}
