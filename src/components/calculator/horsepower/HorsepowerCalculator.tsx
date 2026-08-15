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
  Layers,
  Flame,
  Sparkles,
  Trophy,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CalcMode,
  DragModel,
  DrivetrainType,
  PowerUnit,
  AtmosphericConditions,
  HorsepowerResult,
} from "@/app/calculators/horsepower-calculator/types";
import { calculateHorsepower } from "@/app/calculators/horsepower-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function HorsepowerCalculator() {
  // Mode & Config State
  const [mode, setMode] = useState<CalcMode>("torque_rpm");
  const [drivetrain, setDrivetrain] = useState<DrivetrainType>("rwd_manual");
  const [dragModel, setDragModel] = useState<DragModel>("fox");

  // Mode 1: Torque & RPM Inputs
  const [torqueInput, setTorqueInput] = useState<number>(400);
  const [torqueUnit, setTorqueUnit] = useState<"lbft" | "nm">("lbft");
  const [rpmInput, setRpmInput] = useState<number>(5252);

  // Mode 2: Drag Strip Inputs
  const [vehicleWeight, setVehicleWeight] = useState<number>(3500);
  const [quarterMileET, setQuarterMileET] = useState<number>(12.0);
  const [trapSpeedMph, setTrapSpeedMph] = useState<number>(115);
  const [useETMethod, setUseETMethod] = useState<boolean>(true);

  // Mode 3: Acceleration Inputs
  const [targetZeroSixty, setTargetZeroSixty] = useState<number>(4.2);

  // Mode 4: Unit Converter Inputs
  const [fromValue, setFromValue] = useState<number>(300);
  const [fromUnit, setFromUnit] = useState<PowerUnit>("hp_mechanical");
  const [toUnit, setToUnit] = useState<PowerUnit>("kilowatt");

  // SAE Atmospheric Conditions State
  const [atmosphere, setAtmosphere] = useState<AtmosphericConditions>({
    enabled: false,
    tempF: 77,
    pressureInHg: 29.92,
    humidityPercent: 0,
    turbocharged: false,
  });

  // UI State
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Compute Results
  const result: HorsepowerResult = useMemo(() => {
    return calculateHorsepower(
      mode,
      drivetrain,
      dragModel,
      torqueInput,
      torqueUnit,
      rpmInput,
      vehicleWeight,
      quarterMileET,
      trapSpeedMph,
      useETMethod,
      targetZeroSixty,
      0.32,
      22.0,
      fromValue,
      fromUnit,
      toUnit,
      atmosphere
    );
  }, [
    mode,
    drivetrain,
    dragModel,
    torqueInput,
    torqueUnit,
    rpmInput,
    vehicleWeight,
    quarterMileET,
    trapSpeedMph,
    useETMethod,
    targetZeroSixty,
    fromValue,
    fromUnit,
    toUnit,
    atmosphere,
  ]);

  // Copy Summary
  const handleCopySummary = () => {
    let text = `🏎️ CalcPlatform Horsepower & Dyno Spec Sheet:\n`;
    text += `Crank Horsepower: ${result.crankBHP} BHP (${result.kilowatts} kW | ${result.metricPS} PS)\n`;
    text += `Wheel Horsepower (${result.drivetrainLossPercent}% loss): ${result.wheelWHP} WHP\n`;
    text += `Torque: ${result.torqueLbFt} lb-ft (${result.torqueNm} N-m) @ ${result.rpm} RPM\n`;
    text += `Power-to-Weight: ${result.hpPerTon} HP/ton (${result.lbPerHp} lb/HP) - ${result.performanceTierLabel}\n`;
    text += `Est 1/4-Mile ET: ${result.estimatedET}s @ ${result.estimatedTrapSpeedMph} mph\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "Vehicle Engine Dyno & Horsepower Spec-Sheet",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Horsepower Calculator",
      },
      keyMetrics: [
        { label: "Crankshaft Power (BHP)", value: `${result.crankBHP} BHP (${result.kilowatts} kW)`, highlight: true },
        { label: "Wheel Power (WHP)", value: `${result.wheelWHP} WHP (${result.drivetrainLossPercent}% loss)` },
        { label: "Engine Torque", value: `${result.torqueLbFt} lb-ft (${result.torqueNm} N-m) @ ${result.rpm} RPM` },
        { label: "Power-to-Weight Ratio", value: `${result.hpPerTon} HP/ton (${result.lbPerHp} lb/HP)` },
      ],
      sections: [
        {
          title: "Performance Classification & Acceleration Estimates",
          items: [
            { label: "Performance Category Tier", value: result.performanceTierLabel },
            { label: "Estimated 1/4-Mile Elapsed Time", value: `${result.estimatedET} seconds` },
            { label: "Estimated 1/4-Mile Trap Speed", value: `${result.estimatedTrapSpeedMph} mph` },
            { label: "Estimated 0–60 mph Sprint Time", value: `${result.estimatedZeroToSixtySec} seconds` },
          ],
        },
        {
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
  }, [result]);

  return (
    <div className="space-y-4">
      {/* 1. TOP TOOLBAR CONTROL BAR - LIGHT HARMONIOUS THEME WITH 3D BUTTONS */}
      <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Mode Selector (Col 8) */}
          <div className="md:col-span-8 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Horsepower Calculation Mode
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              <button
                onClick={() => setMode("torque_rpm")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "torque_rpm"
                    ? "bg-amber-600 text-white font-extrabold shadow-md shadow-amber-600/30 border-b-2 border-amber-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Torque &amp; RPM
              </button>
              <button
                onClick={() => setMode("drag_strip")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "drag_strip"
                    ? "bg-amber-600 text-white font-extrabold shadow-md shadow-amber-600/30 border-b-2 border-amber-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                1/4-Mile Drag
              </button>
              <button
                onClick={() => setMode("acceleration")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "acceleration"
                    ? "bg-amber-600 text-white font-extrabold shadow-md shadow-amber-600/30 border-b-2 border-amber-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                0–60 Sprint
              </button>
              <button
                onClick={() => setMode("unit_converter")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "unit_converter"
                    ? "bg-amber-600 text-white font-extrabold shadow-md shadow-amber-600/30 border-b-2 border-amber-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Unit Converter
              </button>
            </div>
          </div>

          {/* Export & Spec Tools (Col 4) */}
          <div className="md:col-span-4 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Spec Sheet &amp; Export
            </span>
            
          </div>
        </div>

        {/* Drivetrain Configuration Selector */}
        <div className="pt-2.5 border-t border-slate-200 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
            Drivetrain Loss Configuration (WHP vs. BHP)
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
          {/* MODE 1: TORQUE & RPM MODE */}
          {mode === "torque_rpm" && (
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-amber-600" /> Engine Torque &amp; Speed (RPM)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    <span>Torque Input</span>
                    <button
                      onClick={() => setTorqueUnit(torqueUnit === "lbft" ? "nm" : "lbft")}
                      className="text-[10px] text-amber-600 hover:underline font-extrabold cursor-pointer"
                    >
                      Unit: {torqueUnit === "lbft" ? "lb-ft" : "N-m"}
                    </button>
                  </div>
                  <Input
                    type="number"
                    value={torqueInput}
                    onChange={(e) => setTorqueInput(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Engine RPM</label>
                  <Input
                    type="number"
                    step="100"
                    value={rpmInput}
                    onChange={(e) => setRpmInput(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: 1/4-MILE DRAG STRIP MODE */}
          {mode === "drag_strip" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-amber-600" /> 1/4-Mile Drag Strip Modeling
                </label>
                <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-[10px] font-bold">
                  <button
                    onClick={() => setDragModel("fox")}
                    className={`px-2 py-0.5 rounded cursor-pointer ${
                      dragModel === "fox" ? "bg-amber-600 text-white" : "text-zinc-500"
                    }`}
                  >
                    Fox
                  </button>
                  <button
                    onClick={() => setDragModel("hale")}
                    className={`px-2 py-0.5 rounded cursor-pointer ${
                      dragModel === "hale" ? "bg-amber-600 text-white" : "text-zinc-500"
                    }`}
                  >
                    Hale
                  </button>
                  <button
                    onClick={() => setDragModel("hunt")}
                    className={`px-2 py-0.5 rounded cursor-pointer ${
                      dragModel === "hunt" ? "bg-amber-600 text-white" : "text-zinc-500"
                    }`}
                  >
                    Hunt
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Vehicle Weight (lbs)</label>
                  <Input
                    type="number"
                    value={vehicleWeight}
                    onChange={(e) => setVehicleWeight(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    <span>{useETMethod ? "1/4-Mile ET (sec)" : "Trap Speed (mph)"}</span>
                    <button
                      onClick={() => setUseETMethod(!useETMethod)}
                      className="text-[10px] text-amber-600 hover:underline font-extrabold cursor-pointer"
                    >
                      {useETMethod ? "Use Speed" : "Use ET"}
                    </button>
                  </div>
                  {useETMethod ? (
                    <Input
                      type="number"
                      step="0.1"
                      value={quarterMileET}
                      onChange={(e) => setQuarterMileET(Number(e.target.value))}
                      className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                    />
                  ) : (
                    <Input
                      type="number"
                      value={trapSpeedMph}
                      onChange={(e) => setTrapSpeedMph(Number(e.target.value))}
                      className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* MODE 3: 0-60 SPRINT ESTIMATOR */}
          {mode === "acceleration" && (
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-amber-600" /> 0–60 MPH Sprint Time Estimator
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Vehicle Weight (lbs)</label>
                  <Input
                    type="number"
                    value={vehicleWeight}
                    onChange={(e) => setVehicleWeight(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Target 0–60 Time (sec)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={targetZeroSixty}
                    onChange={(e) => setTargetZeroSixty(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MODE 4: POWER UNIT CONVERTER */}
          {mode === "unit_converter" && (
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-600" /> Omnidirectional Power Unit Converter
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300">Value</label>
                  <Input
                    type="number"
                    value={fromValue}
                    onChange={(e) => setFromValue(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300">From Unit</label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value as PowerUnit)}
                    className="w-full h-9 font-bold px-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs"
                  >
                    <option value="hp_mechanical">Mechanical HP (hp)</option>
                    <option value="hp_metric">Metric HP (PS / CV)</option>
                    <option value="hp_electrical">Electrical HP (hp(E))</option>
                    <option value="hp_boiler">Boiler HP (hp(S))</option>
                    <option value="kilowatt">Kilowatts (kW)</option>
                    <option value="watt">Watts (W)</option>
                    <option value="btu_hr">BTU / Hour</option>
                    <option value="ft_lbs_sec">ft-lb / sec</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300">To Unit</label>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value as PowerUnit)}
                    className="w-full h-9 font-bold px-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs"
                  >
                    <option value="kilowatt">Kilowatts (kW)</option>
                    <option value="hp_mechanical">Mechanical HP (hp)</option>
                    <option value="hp_metric">Metric HP (PS / CV)</option>
                    <option value="hp_electrical">Electrical HP (hp(E))</option>
                    <option value="hp_boiler">Boiler HP (hp(S))</option>
                    <option value="watt">Watts (W)</option>
                    <option value="btu_hr">BTU / Hour</option>
                    <option value="ft_lbs_sec">ft-lb / sec</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* EXPANDABLE ACCORDION: SAE J1349 ATMOSPHERIC CORRECTION */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-amber-600 cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <Sliders className="h-3.5 w-3.5" /> Atmospheric SAE J1349 Dyno Correction
              </span>
              {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showAdvanced && (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-3 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-amber-700 dark:text-amber-400">
                  <input
                    type="checkbox"
                    checked={atmosphere.enabled}
                    onChange={(e) => setAtmosphere({ ...atmosphere, enabled: e.target.checked })}
                    className="rounded text-amber-600 accent-amber-600 cursor-pointer"
                  />
                  Enable SAE J1349 Weather Correction
                </label>

                {atmosphere.enabled && (
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="space-y-1">
                      <label className="font-bold text-zinc-700 dark:text-zinc-300">Ambient Temp (°F)</label>
                      <Input
                        type="number"
                        value={atmosphere.tempF}
                        onChange={(e) => setAtmosphere({ ...atmosphere, tempF: Number(e.target.value) })}
                        className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 border-zinc-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-zinc-700 dark:text-zinc-300">Barometric (inHg)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={atmosphere.pressureInHg}
                        onChange={(e) => setAtmosphere({ ...atmosphere, pressureInHg: Number(e.target.value) })}
                        className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 border-zinc-200"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DASHBOARD (Col 5) - SLEEK DYNO DASHBOARD WITH INTERACTIVE CURVE */}
        <div className="lg:col-span-5 bg-gradient-to-br from-amber-600 via-orange-700 to-stone-900 text-white p-4 rounded-2xl shadow-md space-y-3.5">
          <div className="flex items-center justify-between border-b border-white/20 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-100 flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-white" /> Dyno Performance Output
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
              {result.performanceTierLabel.split(" ")[0]} Tier
            </span>
          </div>

          {/* Primary Result Card */}
          {mode !== "unit_converter" ? (
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 block">
                Crankshaft Power Output
              </span>
              <div className="text-3xl sm:text-4xl font-black font-sans tabular-nums tracking-tight text-white">
                {result.crankBHP} BHP
              </div>
              <p className="text-[11px] text-amber-100 font-medium">
                Wheel Power: <span className="font-bold text-white">{result.wheelWHP} WHP</span> ({result.drivetrainLossPercent}% loss) | {result.kilowatts} kW | {result.metricPS} PS
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 block">
                Converted Power Output
              </span>
              <div className="text-3xl sm:text-4xl font-black font-sans tabular-nums tracking-tight text-white">
                {result.convertedValue}
              </div>
              <p className="text-[11px] text-amber-100 font-medium">
                {result.convertedUnitName}
              </p>
            </div>
          )}

          {/* INTERACTIVE DYNAMIC SVG DYNO TORQUE/HP CURVE (Intersection @ 5,252 RPM) */}
          <div className="bg-black/40 backdrop-blur-xs p-3 rounded-xl border border-white/20 space-y-2 text-xs">
            <div className="flex justify-between items-center text-[10px] font-bold text-amber-200">
              <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-rose-400" /> Torque: {result.torqueLbFt} lb-ft</span>
              <span className="text-amber-300 font-sans tabular-nums text-[9px] bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-400/40">
                5,252 RPM Crossing
              </span>
              <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-sky-400" /> Power: {result.crankBHP} HP</span>
            </div>

            {/* Dynamic SVG Visualizer */}
            <div className="h-32 w-full relative pt-1">
              {(() => {
                const points = result.dynoCurve;
                if (!points || points.length === 0) return null;

                const highestVal = Math.max(100, ...points.map((p) => Math.max(p.horsepower, p.torque)));
                let maxVal = 250;
                if (highestVal <= 200) maxVal = 250;
                else if (highestVal <= 400) maxVal = 500;
                else if (highestVal <= 700) maxVal = 850;
                else if (highestVal <= 1100) maxVal = 1250;
                else maxVal = Math.ceil(highestVal / 250) * 250;

                const paddingLeft = 24;
                const paddingRight = 280;
                const paddingTop = 12;
                const paddingBottom = 92;
                const chartWidth = paddingRight - paddingLeft;
                const chartHeight = paddingBottom - paddingTop;

                const minRpm = 1000;
                const maxRpm = 8000;

                const getX = (rpm: number) => paddingLeft + ((Math.max(minRpm, Math.min(maxRpm, rpm)) - minRpm) / (maxRpm - minRpm)) * chartWidth;
                const getY = (val: number) => paddingBottom - (Math.max(0, Math.min(maxVal, val)) / maxVal) * chartHeight;

                const torquePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${getX(p.rpm).toFixed(1)} ${getY(p.torque).toFixed(1)}`).join(" ");
                const hpPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${getX(p.rpm).toFixed(1)} ${getY(p.horsepower).toFixed(1)}`).join(" ");

                const x5252 = getX(5252);
                const pointAt5252 = points.find((p) => Math.abs(p.rpm - 5250) <= 250) || points[Math.floor(points.length / 2)];
                const y5252 = getY(pointAt5252 ? pointAt5252.horsepower : (result.torqueLbFt * 5252) / 5252.11);

                const activeX = getX(result.rpm);
                const activeHpY = getY(result.crankBHP);
                const activeTorqueY = getY(result.torqueLbFt);

                return (
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 110">
                    {/* Y-Axis Horizontal Grid Lines */}
                    <line x1={paddingLeft} y1={paddingTop} x2={paddingRight} y2={paddingTop} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                    <line x1={paddingLeft} y1={(paddingTop + paddingBottom) / 2} x2={paddingRight} y2={(paddingTop + paddingBottom) / 2} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                    <line x1={paddingLeft} y1={paddingBottom} x2={paddingRight} y2={paddingBottom} stroke="rgba(255,255,255,0.2)" />

                    {/* Y-Axis Labels */}
                    <text x="2" y={paddingTop + 3} fill="rgba(255,255,255,0.5)" fontSize="7" fontWeight="bold" fontFamily="monospace">{Math.round(maxVal)}</text>
                    <text x="2" y={(paddingTop + paddingBottom) / 2 + 2} fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">{Math.round(maxVal / 2)}</text>
                    <text x="2" y={paddingBottom + 2} fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">0</text>

                    {/* 5252 RPM Crossing Vertical Guideline */}
                    <line x1={x5252} y1={paddingTop} x2={x5252} y2={paddingBottom} stroke="#fbbf24" strokeDasharray="3 3" strokeWidth="1.2" />

                    {/* Active Input RPM Vertical Guideline */}
                    {result.rpm >= 1000 && result.rpm <= 8000 && (
                      <line x1={activeX} y1={paddingTop} x2={activeX} y2={paddingBottom} stroke="#ffffff" strokeDasharray="2 2" strokeWidth="1.5" opacity="0.8" />
                    )}

                    {/* Torque Curve Line (Rose #f43f5e) */}
                    <path d={torquePath} fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Horsepower Curve Line (Sky Blue #38bdf8) */}
                    <path d={hpPath} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                    {/* 5,252 RPM Golden Intersection Dot */}
                    <circle cx={x5252} cy={y5252} r="4" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />
                    <text x={x5252 > 200 ? x5252 - 48 : x5252 + 5} y={Math.max(paddingTop + 10, y5252 - 6)} fill="#fbbf24" fontSize="8" fontWeight="bold">
                      5,252 RPM
                    </text>

                    {/* Active Input Dots */}
                    {result.rpm >= 1000 && result.rpm <= 8000 && (
                      <>
                        <circle cx={activeX} cy={activeHpY} r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
                        <circle cx={activeX} cy={activeTorqueY} r="3.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />
                      </>
                    )}

                    {/* X-Axis RPM Labels */}
                    <text x={getX(1000)} y={paddingBottom + 12} fill="rgba(255,255,255,0.6)" fontSize="7" textAnchor="middle" fontFamily="monospace">1k</text>
                    <text x={getX(3000)} y={paddingBottom + 12} fill="rgba(255,255,255,0.6)" fontSize="7" textAnchor="middle" fontFamily="monospace">3k</text>
                    <text x={x5252} y={paddingBottom + 12} fill="#fbbf24" fontSize="7" textAnchor="middle" fontWeight="bold" fontFamily="monospace">5.25k</text>
                    <text x={getX(7000)} y={paddingBottom + 12} fill="rgba(255,255,255,0.6)" fontSize="7" textAnchor="middle" fontFamily="monospace">7k</text>
                    <text x={getX(8000)} y={paddingBottom + 12} fill="rgba(255,255,255,0.6)" fontSize="7" textAnchor="middle" fontFamily="monospace">8k</text>
                  </svg>
                );
              })()}
            </div>
          </div>

          {/* Side-by-side Mini Metrics */}
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-amber-200 block">Power-to-Weight</span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">{result.hpPerTon} HP/ton ({result.lbPerHp} lb/HP)</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-amber-200 block">Est 1/4-Mile ET</span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">{result.estimatedET}s @ {result.estimatedTrapSpeedMph} mph</span>
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
