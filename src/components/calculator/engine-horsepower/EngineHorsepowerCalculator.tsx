"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Zap,
  Gauge,
  Sliders,
  Printer,
  Check,
  ChevronUp,
  ChevronDown,
  Flame,
  Trophy,
  Wind,
  Info,
  Car,
  Download,
  Save,
  RefreshCw,
  FileText,
  Copy,
  Timer,
  BookOpen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  EngineCalcMode,
  DragModel,
  DrivetrainType,
  AtmosphericConditions,
  EngineHorsepowerResult,
} from "@/app/calculators/engine-horsepower-calculator/types";
import {
  calculateEngineHorsepower,
  MECHANICAL_HP_RPM_CONSTANT,
} from "@/app/calculators/engine-horsepower-calculator/calculator";
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

  // Mode 5: 0–60 Sprint Inputs
  const [targetZeroToSixtySec, setTargetZeroToSixtySec] = useState<number>(4.2);

  // Atmospheric Conditions
  const [atmosphere, setAtmosphere] = useState<AtmosphericConditions>({
    enabled: false,
    tempF: 77,
    pressureInHg: 29.92,
    humidityPercent: 0,
  });

  // UI State
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>("");

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
      atmosphere,
      targetZeroToSixtySec
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
    targetZeroToSixtySec,
  ]);

  // Copy Summary for Forums
  const handleCopySummary = () => {
    let text = `🏎️ CalcPlatform Engine Dyno Briefing:\n`;
    text += `Calculation Mode: ${mode.replace("_", " ").toUpperCase()}\n`;
    text += `Crank Horsepower: ${result.crankBHP} BHP (${result.kilowatts} kW | ${result.metricPS} PS)\n`;
    text += `Wheel Horsepower (${result.drivetrainLossPercent}% loss): ${result.wheelWHP} WHP\n`;
    text += `Total Weight: ${result.totalWeightLbs} lbs (${result.curbWeightLbs} curb + ${result.driverWeightLbs} driver)\n`;
    text += `Power-to-Weight: ${result.hpPerTon} HP/ton (${result.lbPerHp} lb/HP) - ${result.performanceTierLabel}\n`;
    text += `Est 1/4-Mile ET: ${result.estimatedET}s @ ${result.estimatedTrapSpeedMph} mph\n`;
    if (atmosphere.enabled) {
      text += `SAE J1349 Corrected: ${result.correctedBHP} BHP (CF: ${result.saeCorrectionFactor})\n`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Save State to LocalStorage
  const handleSaveState = () => {
    try {
      const stateToSave = {
        mode,
        drivetrain,
        dragModel,
        curbWeight,
        driverWeight,
        quarterMileET,
        trapSpeedMph,
        torqueInput,
        torqueUnit,
        rpmInput,
        displacementLiters,
        boostPsi,
        vePercent,
        staticCR,
        targetZeroToSixtySec,
        atmosphere,
      };
      localStorage.setItem("ehp_saved_state", JSON.stringify(stateToSave));
      setStatusMsg("Configuration Saved!");
      setTimeout(() => setStatusMsg(""), 2500);
    } catch (e) {
      setStatusMsg("Could not save to browser storage.");
      setTimeout(() => setStatusMsg(""), 2500);
    }
  };

  // Restore State from LocalStorage
  const handleRestoreState = () => {
    try {
      const saved = localStorage.getItem("ehp_saved_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.mode) setMode(parsed.mode);
        if (parsed.drivetrain) setDrivetrain(parsed.drivetrain);
        if (parsed.dragModel) setDragModel(parsed.dragModel);
        if (typeof parsed.curbWeight === "number") setCurbWeight(parsed.curbWeight);
        if (typeof parsed.driverWeight === "number") setDriverWeight(parsed.driverWeight);
        if (typeof parsed.quarterMileET === "number") setQuarterMileET(parsed.quarterMileET);
        if (typeof parsed.trapSpeedMph === "number") setTrapSpeedMph(parsed.trapSpeedMph);
        if (typeof parsed.torqueInput === "number") setTorqueInput(parsed.torqueInput);
        if (parsed.torqueUnit) setTorqueUnit(parsed.torqueUnit);
        if (typeof parsed.rpmInput === "number") setRpmInput(parsed.rpmInput);
        if (typeof parsed.displacementLiters === "number") setDisplacementLiters(parsed.displacementLiters);
        if (typeof parsed.boostPsi === "number") setBoostPsi(parsed.boostPsi);
        if (typeof parsed.vePercent === "number") setVePercent(parsed.vePercent);
        if (typeof parsed.staticCR === "number") setStaticCR(parsed.staticCR);
        if (typeof parsed.targetZeroToSixtySec === "number") setTargetZeroToSixtySec(parsed.targetZeroToSixtySec);
        if (parsed.atmosphere) setAtmosphere(parsed.atmosphere);
        setStatusMsg("State Restored!");
        setTimeout(() => setStatusMsg(""), 2500);
      } else {
        setStatusMsg("No saved state found.");
        setTimeout(() => setStatusMsg(""), 2500);
      }
    } catch (e) {
      setStatusMsg("Error restoring state.");
      setTimeout(() => setStatusMsg(""), 2500);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const rows = [
      ["Metric", "Value", "Unit"],
      ["Calculation Mode", mode, ""],
      ["Crankshaft Power (BHP)", result.crankBHP, "BHP"],
      ["Wheel Power (WHP)", result.wheelWHP, "WHP"],
      ["Drivetrain Loss", result.drivetrainLossPercent, "%"],
      ["Kilowatts", result.kilowatts, "kW"],
      ["Metric Horsepower", result.metricPS, "PS"],
      ["Engine Torque", result.torqueLbFt, "lb-ft"],
      ["Engine RPM", result.rpm, "RPM"],
      ["Total Race Weight", result.totalWeightLbs, "lbs"],
      ["Power-to-Weight", result.hpPerTon, "HP/ton"],
      ["Estimated 1/4-Mile ET", result.estimatedET, "seconds"],
      ["Estimated Trap Speed", result.estimatedTrapSpeedMph, "mph"],
      ["SAE Correction Factor", result.saeCorrectionFactor, ""],
      ["Corrected Power", result.correctedBHP, "BHP"],
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.map((val) => `"${val}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `engine_horsepower_${mode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export TXT
  const handleExportTXT = () => {
    let report = `====================================================\n`;
    report += `ENGINE HORSEPOWER & DYNO SPECIFICATION REPORT\n`;
    report += `Generated by CalcPlatform\n`;
    report += `Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n`;
    report += `====================================================\n\n`;
    report += `CALCULATION METHOD: ${mode.replace("_", " ").toUpperCase()}\n`;
    report += `Crankshaft Output:  ${result.crankBHP} BHP\n`;
    report += `Wheel Output:       ${result.wheelWHP} WHP (${result.drivetrainLossPercent}% loss)\n`;
    report += `Metric Equivalent:  ${result.metricPS} PS / ${result.kilowatts} kW\n`;
    report += `Torque:             ${result.torqueLbFt} lb-ft (${result.torqueNm} N-m) @ ${result.rpm} RPM\n`;
    report += `Vehicle Weight:     ${result.totalWeightLbs} lbs (${result.curbWeightLbs} curb + ${result.driverWeightLbs} payload)\n`;
    report += `Power-to-Weight:    ${result.hpPerTon} HP/ton (${result.lbPerHp} lb/HP)\n`;
    report += `Performance Tier:   ${result.performanceTierLabel}\n`;
    report += `Est. 1/4-Mile ET:   ${result.estimatedET} sec @ ${result.estimatedTrapSpeedMph} mph\n`;
    report += `Est. 0–60 Sprint:   ${result.estimatedZeroToSixtySec} sec\n`;
    if (mode === "displacement_boost") {
      report += `Effective CR:       ${result.effectiveCompressionRatio}:1\n`;
      report += `Airflow:            ${result.airflowCFM} CFM\n`;
    }
    if (atmosphere.enabled) {
      report += `SAE J1349 CF:       ${result.saeCorrectionFactor} (${result.correctedBHP} BHP corrected)\n`;
    }
    report += `\n====================================================\n`;

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `engine_horsepower_${mode}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy LaTeX formula
  const handleCopyLatex = () => {
    let latex = "";
    if (mode === "et_mode") {
      latex = `\\text{HP} = \\frac{\\text{Weight}}{\\left(\\frac{\\text{ET}}{5.825}\\right)^3} = \\frac{${result.totalWeightLbs}}{\\left(\\frac{${quarterMileET}}{5.825}\\right)^3} \\approx ${result.crankBHP}\\text{ BHP}`;
    } else if (mode === "trap_speed") {
      latex = `\\text{HP} = \\text{Weight} \\times \\left(\\frac{V}{234}\\right)^3 = ${result.totalWeightLbs} \\times \\left(\\frac{${trapSpeedMph}}{234}\\right)^3 \\approx ${result.crankBHP}\\text{ BHP}`;
    } else if (mode === "torque_rpm") {
      latex = `\\text{HP} = \\frac{\\text{Torque}_{\\text{lb-ft}} \\times \\text{RPM}}{5252.113} = \\frac{${result.torqueLbFt} \\times ${result.rpm}}{5252.113} \\approx ${result.crankBHP}\\text{ BHP}`;
    } else if (mode === "displacement_boost") {
      latex = `\\text{CR}_{\\text{eff}} = \\text{CR}_{\\text{static}} \\times \\sqrt{\\frac{\\text{Boost} + 14.7}{14.7}} = ${staticCR} \\times \\sqrt{\\frac{${boostPsi} + 14.7}{14.7}} \\approx ${result.effectiveCompressionRatio}:1`;
    } else {
      latex = `\\text{WHP}_{\\text{req}} = \\text{Weight} \\times \\left(\\frac{2.5}{t_{0-60}}\\right)^2 = ${result.totalWeightLbs} \\times \\left(\\frac{2.5}{${targetZeroToSixtySec}}\\right)^2 \\approx ${result.wheelWHP}\\text{ WHP}`;
    }

    navigator.clipboard.writeText(latex);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  // PDF Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "Engine Horsepower & Dyno Spec-Sheet",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Engine Horsepower Calculator",
      },
      keyMetrics: [
        {
          label: "Crankshaft Horsepower (BHP)",
          value: `${result.crankBHP} BHP (${result.kilowatts} kW | ${result.metricPS} PS)`,
          highlight: true,
        },
        {
          label: "Wheel Power (WHP)",
          value: `${result.wheelWHP} WHP (${result.drivetrainLossPercent}% drivetrain loss)`,
        },
        {
          label: "Total Race Weight",
          value: `${result.totalWeightLbs} lbs (${result.curbWeightLbs} curb + ${result.driverWeightLbs} payload)`,
        },
        {
          label: "Power-to-Weight Ratio",
          value: `${result.hpPerTon} HP/ton (${result.lbPerHp} lb/HP)`,
        },
      ],
      sections: [
        {
          title: "Quarter-Mile & Acceleration Classification",
          items: [
            { label: "Performance Category Tier", value: result.performanceTierLabel },
            { label: "Estimated 1/4-Mile Elapsed Time", value: `${result.estimatedET} seconds` },
            { label: "Estimated Finish Line Trap Speed", value: `${result.estimatedTrapSpeedMph} mph` },
            { label: "Estimated 0–60 mph Sprint Time", value: `${result.estimatedZeroToSixtySec} seconds` },
            { label: "Specific Output (Power-to-Mass)", value: `${result.wattsPerKg} W/kg` },
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
              title: "Global Power Standard Equivalents & Dyno Weather",
              items: [
                { label: "Mechanical Horsepower", value: `${result.crankBHP} HP` },
                { label: "Metric Horsepower (PS / CV)", value: `${result.metricPS} PS` },
                { label: "Kilowatts Output", value: `${result.kilowatts} kW` },
                {
                  label: "SAE J1349 Weather Corrected Power",
                  value: `${result.correctedBHP} BHP (Correction Factor: ${result.saeCorrectionFactor})`,
                },
              ],
            },
      ],
    };
  }, [result, displacementLiters, vePercent, mode]);

  return (
    <div className="space-y-4">
      {/* 1. TOP TOOLBAR CONTROL BAR */}
      <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Mode Selector (Col 8) */}
          <div className="md:col-span-8 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Calculation Method Mode
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs">
              <button
                type="button"
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
                type="button"
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
                type="button"
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
                type="button"
                onClick={() => setMode("displacement_boost")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "displacement_boost"
                    ? "bg-red-600 text-white font-extrabold shadow-md shadow-red-600/30 border-b-2 border-red-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Boost &amp; CC
              </button>
              <button
                type="button"
                onClick={() => setMode("zero_to_sixty")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "zero_to_sixty"
                    ? "bg-red-600 text-white font-extrabold shadow-md shadow-red-600/30 border-b-2 border-red-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                0–60 Sprint
              </button>
            </div>
          </div>

          {/* Export & Forum Tools (Col 4) */}
          <div className="md:col-span-4 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Forum Export &amp; PDF Spec Sheet
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopySummary}
                className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 flex items-center justify-center gap-1 transition-all cursor-pointer"
                title="Copy structured forum BBCode summary"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                type="button"
                onClick={() => setShowReportModal(true)}
                className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 flex items-center justify-center gap-1 transition-all cursor-pointer"
                title="Open comprehensive Dyno Spec-Sheet & PDF"
              >
                <FileText className="h-3 w-3 text-blue-600" />
                Spec Sheet
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-1.5 px-2 rounded-lg text-[11px] font-bold bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 flex items-center justify-center transition-all cursor-pointer"
                title="Direct Print"
                aria-label="Direct Print"
              >
                <Printer className="h-3 w-3" />
              </button>
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
              type="button"
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
              type="button"
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
              type="button"
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
              type="button"
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

        {/* Action Row: Save, Restore, Export CSV/TXT, LaTeX */}
        <div className="pt-2 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleSaveState}
              className="py-1 px-2.5 rounded-md font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Save className="h-3 w-3" /> Save
            </button>
            <button
              type="button"
              onClick={handleRestoreState}
              className="py-1 px-2.5 rounded-md font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="h-3 w-3" /> Restore
            </button>
            {statusMsg && (
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                {statusMsg}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleExportCSV}
              className="py-1 px-2 rounded-md font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center gap-1 cursor-pointer transition-colors"
              title="Download CSV"
            >
              <Download className="h-3 w-3" /> CSV
            </button>
            <button
              type="button"
              onClick={handleExportTXT}
              className="py-1 px-2 rounded-md font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center gap-1 cursor-pointer transition-colors"
              title="Download Plain Text Report"
            >
              <FileText className="h-3 w-3" /> TXT
            </button>
            <button
              type="button"
              onClick={handleCopyLatex}
              className="py-1 px-2 rounded-md font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center gap-1 cursor-pointer transition-colors"
              title="Copy LaTeX formula"
            >
              {copiedLatex ? <Check className="h-3 w-3 text-emerald-600" /> : <BookOpen className="h-3 w-3" />}
              {copiedLatex ? "LaTeX Copied!" : "LaTeX"}
            </button>
          </div>
        </div>
      </div>

      {/* VALIDATION ERROR BANNER */}
      {!result.isValid && (
        <div
          role="alert"
          className="p-3.5 bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-800 rounded-2xl text-xs text-red-800 dark:text-red-200 font-bold flex items-center gap-2"
        >
          <Info className="h-4 w-4 shrink-0 text-red-600" />
          <span>{result.errorMessage || "Please enter valid numeric parameters."}</span>
        </div>
      )}

      {/* 2. SPLIT PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-4">
          {/* VEHICLE WEIGHT INPUTS (For Modes: ET, Trap Speed, 0-60) */}
          {(mode === "et_mode" || mode === "trap_speed" || mode === "zero_to_sixty") && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Car className="h-4 w-4 text-red-600" /> Vehicle Weight &amp; Driver Payload
                </span>
                {mode !== "zero_to_sixty" && (
                  <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setDragModel("fox")}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        dragModel === "fox" ? "bg-red-600 text-white" : "text-zinc-500"
                      }`}
                    >
                      Fox (234)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDragModel("hale")}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        dragModel === "hale" ? "bg-red-600 text-white" : "text-zinc-500"
                      }`}
                    >
                      Hale (230)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDragModel("hunt")}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        dragModel === "hunt" ? "bg-red-600 text-white" : "text-zinc-500"
                      }`}
                    >
                      Hunt (228)
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="ehp-curb-weight" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Curb Weight (lbs)
                  </label>
                  <Input
                    id="ehp-curb-weight"
                    type="number"
                    value={curbWeight}
                    onChange={(e) => setCurbWeight(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="ehp-driver-weight" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Driver Payload (lbs)
                  </label>
                  <Input
                    id="ehp-driver-weight"
                    type="number"
                    value={driverWeight}
                    onChange={(e) => setDriverWeight(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MODE 1: ELAPSED TIME INPUT */}
          {mode === "et_mode" && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <label htmlFor="ehp-quarter-mile-et" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Trophy className="h-3.5 w-3.5 text-red-600" /> Quarter-Mile Elapsed Time (Seconds)
              </label>
              <Input
                id="ehp-quarter-mile-et"
                type="number"
                step="0.01"
                value={quarterMileET}
                onChange={(e) => setQuarterMileET(Number(e.target.value))}
                className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
              />
            </div>
          )}

          {/* MODE 2: TRAP SPEED INPUT */}
          {mode === "trap_speed" && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <label htmlFor="ehp-trap-speed" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Wind className="h-3.5 w-3.5 text-red-600" /> Finish Line Trap Speed (MPH)
              </label>
              <Input
                id="ehp-trap-speed"
                type="number"
                value={trapSpeedMph}
                onChange={(e) => setTrapSpeedMph(Number(e.target.value))}
                className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
              />
            </div>
          )}

          {/* MODE 3: TORQUE & RPM MODE */}
          {mode === "torque_rpm" && (
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-red-600" /> Rotational Torque &amp; Engine Speed
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    <label htmlFor="ehp-torque">Engine Torque</label>
                    <button
                      type="button"
                      onClick={() => setTorqueUnit(torqueUnit === "lbft" ? "nm" : "lbft")}
                      className="text-[10px] text-red-600 hover:underline font-extrabold cursor-pointer"
                    >
                      Unit: {torqueUnit === "lbft" ? "lb-ft" : "N-m"}
                    </button>
                  </div>
                  <Input
                    id="ehp-torque"
                    type="number"
                    value={torqueInput}
                    onChange={(e) => setTorqueInput(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="ehp-rpm" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Engine Speed (RPM)
                  </label>
                  <Input
                    id="ehp-rpm"
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

          {/* MODE 4: DISPLACEMENT & BOOST ESTIMATOR */}
          {mode === "displacement_boost" && (
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-red-600" /> Engine Displacement &amp; Forced Induction Boost
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="ehp-displacement" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Engine Size (Liters)
                  </label>
                  <Input
                    id="ehp-displacement"
                    type="number"
                    step="0.1"
                    value={displacementLiters}
                    onChange={(e) => setDisplacementLiters(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="ehp-boost" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Boost Pressure (PSI)
                  </label>
                  <Input
                    id="ehp-boost"
                    type="number"
                    step="0.5"
                    value={boostPsi}
                    onChange={(e) => setBoostPsi(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label htmlFor="ehp-ve" className="font-bold text-zinc-700 dark:text-zinc-300">
                    Volumetric Efficiency (%)
                  </label>
                  <Input
                    id="ehp-ve"
                    type="number"
                    value={vePercent}
                    onChange={(e) => setVePercent(Number(e.target.value))}
                    className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="ehp-cr" className="font-bold text-zinc-700 dark:text-zinc-300">
                    Static Compression Ratio
                  </label>
                  <Input
                    id="ehp-cr"
                    type="number"
                    step="0.1"
                    value={staticCR}
                    onChange={(e) => setStaticCR(Number(e.target.value))}
                    className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MODE 5: 0–60 SPRINT INPUT */}
          {mode === "zero_to_sixty" && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <label htmlFor="ehp-zero-sixty" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Timer className="h-3.5 w-3.5 text-red-600" /> Target 0–60 mph Sprint Duration (Seconds)
              </label>
              <Input
                id="ehp-zero-sixty"
                type="number"
                step="0.1"
                value={targetZeroToSixtySec}
                onChange={(e) => setTargetZeroToSixtySec(Number(e.target.value))}
                className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
              />
            </div>
          )}

          {/* EXPANDABLE ACCORDION: SAE WEATHER CORRECTION */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <button
              type="button"
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
                      <label htmlFor="ehp-temp" className="font-bold text-zinc-700 dark:text-zinc-300">
                        Ambient Temp (°F)
                      </label>
                      <Input
                        id="ehp-temp"
                        type="number"
                        value={atmosphere.tempF}
                        onChange={(e) => setAtmosphere({ ...atmosphere, tempF: Number(e.target.value) })}
                        className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 border-zinc-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="ehp-pressure" className="font-bold text-zinc-700 dark:text-zinc-300">
                        Barometric (inHg)
                      </label>
                      <Input
                        id="ehp-pressure"
                        type="number"
                        step="0.01"
                        value={atmosphere.pressureInHg}
                        onChange={(e) =>
                          setAtmosphere({ ...atmosphere, pressureInHg: Number(e.target.value) })
                        }
                        className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 border-zinc-200"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* CALCULATION BREAKDOWN ACCORDION */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <button
              type="button"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="flex items-center justify-between w-full text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-red-600 cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" /> Calculation Breakdown &amp; Intermediate Math
              </span>
              {showBreakdown ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showBreakdown && (
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300 font-sans">
                {mode === "torque_rpm" && (
                  <>
                    <p className="font-bold text-slate-900 dark:text-white">
                      1. Formula: Horsepower from Rotational Torque &amp; Speed
                    </p>
                    <p className="font-mono bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-700">
                      HP = (Torque [lb-ft] × RPM) / 5252.113
                    </p>
                    <p>
                      <strong>Substitution:</strong> ({result.torqueLbFt} lb-ft × {result.rpm} RPM) / 5252.113
                    </p>
                    <p>
                      <strong>Flywheel Power (BHP):</strong> {result.crankBHP} BHP ({result.kilowatts} kW)
                    </p>
                    <p>
                      <strong>Usable Wheel Power (WHP):</strong> {result.crankBHP} × (1 - {result.drivetrainLossPercent}%) = {result.wheelWHP} WHP
                    </p>
                  </>
                )}

                {mode === "et_mode" && (
                  <>
                    <p className="font-bold text-slate-900 dark:text-white">
                      1. Empirical Formula: Hale Quarter-Mile Model
                    </p>
                    <p className="font-mono bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-700">
                      HP = Total Weight / (ET / 5.825)³
                    </p>
                    <p>
                      <strong>Total Weight:</strong> {result.curbWeightLbs} curb + {result.driverWeightLbs} payload = {result.totalWeightLbs} lbs
                    </p>
                    <p>
                      <strong>Substitution:</strong> {result.totalWeightLbs} / ({quarterMileET} / 5.825)³
                    </p>
                    <p>
                      <strong>Calculated Power:</strong> {result.crankBHP} BHP ({result.wheelWHP} WHP at tires)
                    </p>
                  </>
                )}

                {mode === "trap_speed" && (
                  <>
                    <p className="font-bold text-slate-900 dark:text-white">
                      1. Empirical Formula: Fox Trap Speed Model
                    </p>
                    <p className="font-mono bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-700">
                      HP = Total Weight × (Trap Speed / 234)³
                    </p>
                    <p>
                      <strong>Substitution:</strong> {result.totalWeightLbs} × ({trapSpeedMph} / 234)³
                    </p>
                    <p>
                      <strong>Calculated Power:</strong> {result.crankBHP} BHP ({result.wheelWHP} WHP)
                    </p>
                  </>
                )}

                {mode === "displacement_boost" && (
                  <>
                    <p className="font-bold text-slate-900 dark:text-white">
                      1. Forced Induction Airflow &amp; Compression Math
                    </p>
                    <p className="font-mono bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-700">
                      CFM = (CID × RPM × VE% / 3456) × ((Boost + 14.7) / 14.7)
                    </p>
                    <p>
                      <strong>Displacement:</strong> {displacementLiters}L = {(displacementLiters * 61.0237).toFixed(1)} CID
                    </p>
                    <p>
                      <strong>Airflow Inducted:</strong> {result.airflowCFM} CFM @ {boostPsi} PSI boost
                    </p>
                    <p>
                      <strong>Effective Compression Ratio:</strong> {staticCR} × √(({boostPsi} + 14.7) / 14.7) = {result.effectiveCompressionRatio}:1
                    </p>
                    <p>
                      <strong>Estimated Output:</strong> {result.crankBHP} BHP
                    </p>
                  </>
                )}

                {mode === "zero_to_sixty" && (
                  <>
                    <p className="font-bold text-slate-900 dark:text-white">
                      1. Power Required for 0–60 Sprint Target
                    </p>
                    <p className="font-mono bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-700">
                      WHP = Weight × (2.5 / TargetSeconds)²
                    </p>
                    <p>
                      <strong>Substitution:</strong> {result.totalWeightLbs} × (2.5 / {targetZeroToSixtySec})²
                    </p>
                    <p>
                      <strong>Required Wheel Power:</strong> {result.wheelWHP} WHP
                    </p>
                    <p>
                      <strong>Required Crankshaft Power:</strong> {result.wheelWHP} / (1 - {result.drivetrainLossPercent}%) = {result.crankBHP} BHP
                    </p>
                  </>
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

          {/* Primary Result Card with live accessibility */}
          <div className="space-y-0.5" aria-live="polite">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-200 block">
              Calculated Crankshaft Power
            </span>
            <div className="text-3xl sm:text-4xl font-black font-sans tabular-nums tracking-tight text-white">
              {result.crankBHP} BHP
            </div>
            <p className="text-[11px] text-red-100 font-medium">
              Wheel Power: <span className="font-bold text-white">{result.wheelWHP} WHP</span> (
              {result.drivetrainLossPercent}% loss) | {result.kilowatts} kW | {result.metricPS} PS
            </p>
          </div>

          {/* INTERACTIVE SVG CIRCULAR POWER DIAL GAUGE */}
          <div className="bg-black/40 backdrop-blur-xs p-3 rounded-xl border border-white/20 space-y-1.5 text-xs text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-200 block">
              Engine Power Dial &amp; ET Expectation
            </span>

            <div className="h-32 w-full relative flex items-center justify-center pt-1">
              <svg
                className="w-48 h-28 overflow-visible"
                viewBox="0 0 200 120"
                role="img"
                aria-label={`Engine Power Gauge needle showing ${result.crankBHP} BHP out of 1000+ BHP scale`}
              >
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
                <text
                  x="100"
                  y="85"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="22"
                  fontWeight="900"
                  fontFamily="monospace"
                >
                  {result.crankBHP}
                </text>
                <text x="100" y="98" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">
                  EST CRANK BHP
                </text>

                {/* Gauge End Labels */}
                <text x="15" y="115" fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="bold">
                  0 HP
                </text>
                <text x="175" y="115" fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="bold">
                  1k+ HP
                </text>
              </svg>
            </div>
          </div>

          {/* Side-by-side Mini Metrics */}
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-red-200 block">Power-to-Weight</span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">
                {result.hpPerTon} HP/ton ({result.lbPerHp} lb/HP)
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-red-200 block">Est 1/4-Mile ET</span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">
                {result.estimatedET}s @ {result.estimatedTrapSpeedMph} mph
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        reportData={reportData}
      />
    </div>
  );
}
