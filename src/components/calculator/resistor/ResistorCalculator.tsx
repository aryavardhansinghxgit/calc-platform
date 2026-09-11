"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Copy,
  Check,
  Bookmark,
  Trash2,
  History,
  Printer,
  Share2,
  Zap,
  RefreshCw,
  Info,
  Download,
  FileText,
  Code
} from "lucide-react";
import {
  calculateResistorCalculator,
  COLOR_DATABASE,
  VALID_COLORS,
  formatOhms,
  E_SERIES_BASES,
  E_SERIES_TOLERANCES,
  MATERIAL_RESISTIVITIES,
  awgToDiameterMeters
} from "@/app/calculators/resistor-calculator/calculator";
import { ResistorColor, ResistorCalculatorInputs, ResistorCalculatorOutputs } from "@/app/calculators/resistor-calculator/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

const TABS = [
  { id: "color", label: "Resistor Color Code" },
  { id: "series_parallel", label: "Series & Parallel Networks" },
  { id: "conductor", label: "Conductor Resistance" },
  { id: "smd", label: "SMD Resistor Decoder" },
  { id: "finder", label: "E-Series Finder" }
];

const AWG_GAUGES = [
  "0000", "000", "00", "0", "1", "2", "4", "6", "8", "10",
  "12", "14", "16", "18", "20", "22", "24", "26", "28", "30",
  "32", "34", "36", "38", "40"
];

export function ResistorCalculator() {
  const [activeTab, setActiveTab] = useState<string>("color");

  // ==========================================
  // STATE: TAB 1 - Resistor Color Code
  // ==========================================
  const [reverseMode, setReverseMode] = useState<boolean>(false);
  const [bandCount, setBandCount] = useState<4 | 5 | 6>(4);
  const [band1, setBand1] = useState<ResistorColor>("brown");
  const [band2, setBand2] = useState<ResistorColor>("black");
  const [band3, setBand3] = useState<ResistorColor>("black");
  const [multiplier, setMultiplier] = useState<ResistorColor>("red");
  const [tolerance, setTolerance] = useState<ResistorColor>("gold");
  const [tempCoeff, setTempCoeff] = useState<ResistorColor>("brown");

  // Two-way reverse mode inputs
  const [targetResistance, setTargetResistance] = useState("1.2");
  const [targetResistanceUnit, setTargetResistanceUnit] = useState<"mΩ" | "Ω" | "kΩ" | "MΩ" | "GΩ">("kΩ");
  const [targetTolerance, setTargetTolerance] = useState("5");
  const [targetTempCoeff, setTargetTempCoeff] = useState("100");

  // ==========================================
  // STATE: TAB 2 - Series & Parallel Networks
  // ==========================================
  const [resistorValuesString, setResistorValuesString] = useState("100, 220, 470");
  const [parallelMode, setParallelMode] = useState<boolean>(false);
  const [supplyVoltage, setSupplyVoltage] = useState("12");

  // ==========================================
  // STATE: TAB 3 - Conductor Resistance
  // ==========================================
  const [conductorLength, setConductorLength] = useState("100");
  const [conductorLengthUnit, setConductorLengthUnit] = useState<any>("m");
  const [conductorSizeInputType, setConductorSizeInputType] = useState<"diameter" | "area" | "awg">("diameter");
  const [conductorDiameter, setConductorDiameter] = useState("1");
  const [conductorDiameterUnit, setConductorDiameterUnit] = useState<any>("mm");
  const [conductorArea, setConductorArea] = useState("0.785398");
  const [conductorAreaUnit, setConductorAreaUnit] = useState<any>("mm²");
  const [conductorAwg, setConductorAwg] = useState("14");
  const [conductorMaterial, setConductorMaterial] = useState("copper");
  const [conductorTemp, setConductorTemp] = useState("20");

  // ==========================================
  // STATE: TAB 4 - SMD Resistor Decoder
  // ==========================================
  const [smdCode, setSmdCode] = useState("103");

  // ==========================================
  // STATE: TAB 5 - E-Series Finder
  // ==========================================
  const [finderTargetResistance, setFinderTargetResistance] = useState("1.5");
  const [finderTargetUnit, setFinderTargetUnit] = useState<any>("kΩ");
  const [finderESeries, setFinderESeries] = useState<any>("E24");

  // ==========================================
  // STATE: INTERACTIVE FORMULA WHEEL
  // ==========================================
  const [wheelFocus, setWheelFocus] = useState<"V" | "I" | "R" | "P">("V");

  // ==========================================
  // STATE: COMMON / PERSISTENCE & EXPORTS
  // ==========================================
  const [copiedResult, setCopiedResult] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedLatex, setCopiedLatex] = useState(false);
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [justSaved, setJustSaved] = useState(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Sync saved list from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_resistor_calculations");
      if (stored) setSavedItems(JSON.parse(stored));
    } catch (e) {}
  }, []);

  // Compile inputs for standard calculation engine
  const currentInputs = useMemo<Record<string, any>>(() => {
    return {
      activeTab,
      reverseMode,
      bandCount,
      band1,
      band2,
      band3,
      multiplier,
      tolerance,
      tempCoeff,
      targetResistance: parseFloat(targetResistance) || 0,
      targetResistanceUnit,
      targetTolerance: parseFloat(targetTolerance) || 5,
      targetTempCoeff: parseFloat(targetTempCoeff) || 100,
      resistorValuesString,
      parallelMode,
      supplyVoltage: supplyVoltage !== "" ? parseFloat(supplyVoltage) : 0,
      conductorLength: parseFloat(conductorLength) || 0,
      conductorLengthUnit,
      conductorSizeInputType,
      conductorDiameter: parseFloat(conductorDiameter) || 0,
      conductorDiameterUnit,
      conductorArea: parseFloat(conductorArea) || 0,
      conductorAreaUnit,
      conductorAwg,
      conductorMaterial,
      conductorTemp: conductorTemp !== "" ? parseFloat(conductorTemp) : 20,
      smdCode,
      finderTargetResistance: parseFloat(finderTargetResistance) || 0,
      finderTargetUnit,
      finderESeries
    };
  }, [
    activeTab, reverseMode, bandCount, band1, band2, band3, multiplier, tolerance, tempCoeff,
    targetResistance, targetResistanceUnit, targetTolerance, targetTempCoeff,
    resistorValuesString, parallelMode, supplyVoltage,
    conductorLength, conductorLengthUnit, conductorSizeInputType, conductorDiameter, conductorDiameterUnit,
    conductorArea, conductorAreaUnit, conductorAwg, conductorMaterial, conductorTemp,
    smdCode, finderTargetResistance, finderTargetUnit, finderESeries
  ]);

  // Validation errors
  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    if (activeTab === "color" && reverseMode) {
      const tr = parseFloat(targetResistance);
      if (isNaN(tr) || tr <= 0) errors.push("Target resistance value must be greater than 0.");
    }
    if (activeTab === "series_parallel") {
      if (!resistorValuesString.trim()) {
        errors.push("Please enter at least one resistor value.");
      }
      if (supplyVoltage !== "" && (isNaN(parseFloat(supplyVoltage)) || parseFloat(supplyVoltage) < 0)) {
        errors.push("Supply voltage cannot be negative.");
      }
    }
    if (activeTab === "conductor") {
      const len = parseFloat(conductorLength);
      if (isNaN(len) || len <= 0) errors.push("Conductor length must be greater than 0.");
      if (conductorSizeInputType === "diameter") {
        const diam = parseFloat(conductorDiameter);
        if (isNaN(diam) || diam <= 0) errors.push("Wire diameter must be greater than 0.");
      } else if (conductorSizeInputType === "area") {
        const area = parseFloat(conductorArea);
        if (isNaN(area) || area <= 0) errors.push("Cross-sectional area must be greater than 0.");
      }
    }
    if (activeTab === "smd") {
      if (!smdCode.trim()) errors.push("Please enter an SMD resistor marking code.");
    }
    if (activeTab === "finder") {
      const ft = parseFloat(finderTargetResistance);
      if (isNaN(ft) || ft <= 0) errors.push("Finder target resistance must be greater than 0.");
    }
    return errors;
  }, [activeTab, reverseMode, targetResistance, resistorValuesString, supplyVoltage, conductorLength, conductorSizeInputType, conductorDiameter, conductorArea, smdCode, finderTargetResistance]);

  // Run calculation
  const result: ResistorCalculatorOutputs | null = useMemo(() => {
    if (validationErrors.length > 0) return null;
    try {
      return calculateResistorCalculator(currentInputs);
    } catch (e) {
      return null;
    }
  }, [currentInputs, validationErrors]);

  // Handle setting bands from reverse conversion output
  useEffect(() => {
    if (activeTab === "color" && reverseMode && result && result.bands) {
      const bands = result.bands;
      if (bands[0]) setBand1(bands[0]);
      if (bands[1]) setBand2(bands[1]);
      if (bandCount === 4) {
        if (bands[2]) setMultiplier(bands[2]);
        if (bands[3]) setTolerance(bands[3]);
      } else {
        if (bands[2]) setBand3(bands[2]);
        if (bands[3]) setMultiplier(bands[3]);
        if (bands[4]) setTolerance(bands[4]);
        if (bandCount === 6 && bands[5]) setTempCoeff(bands[5]);
      }
    }
  }, [result, reverseMode, activeTab, bandCount]);

  // Preset Handlers
  const applyPreset = (preset: string) => {
    if (preset === "led") {
      setActiveTab("series_parallel");
      setResistorValuesString("220, 220, 220");
      setParallelMode(false);
      setSupplyVoltage("9");
    } else if (preset === "divider") {
      setActiveTab("series_parallel");
      setResistorValuesString("10k, 5k");
      setParallelMode(false);
      setSupplyVoltage("5");
    } else if (preset === "shunt") {
      setActiveTab("series_parallel");
      setResistorValuesString("100, 100");
      setParallelMode(true);
      setSupplyVoltage("5");
    } else if (preset === "wire") {
      setActiveTab("conductor");
      setConductorLength("15");
      setConductorLengthUnit("m");
      setConductorSizeInputType("diameter");
      setConductorDiameter("0.5");
      setConductorDiameterUnit("mm");
      setConductorMaterial("copper");
      setConductorTemp("20");
    }
  };

  // Helper colors mapping for SVG visualizer
  const getHexColor = (color: ResistorColor): string => {
    const colors: Record<ResistorColor, string> = {
      black: "#1e293b",
      brown: "#78350f",
      red: "#dc2626",
      orange: "#f97316",
      yellow: "#eab308",
      green: "#10b981",
      blue: "#2563eb",
      violet: "#8b5cf6",
      gray: "#6b7280",
      white: "#f8fafc",
      gold: "#d97706",
      silver: "#94a3b8",
      none: "#d1d5db"
    };
    return colors[color] || "#d1d5db";
  };

  // Reset function
  const handleReset = () => {
    setBandCount(4);
    setBand1("brown");
    setBand2("black");
    setBand3("black");
    setMultiplier("red");
    setTolerance("gold");
    setTempCoeff("brown");
    setTargetResistance("1.2");
    setTargetResistanceUnit("kΩ");
    setTargetTolerance("5");
    setTargetTempCoeff("100");
    setResistorValuesString("100, 220, 470");
    setParallelMode(false);
    setSupplyVoltage("12");
    setConductorLength("100");
    setConductorLengthUnit("m");
    setConductorSizeInputType("diameter");
    setConductorDiameter("1");
    setConductorDiameterUnit("mm");
    setConductorArea("0.785398");
    setConductorAreaUnit("mm²");
    setConductorAwg("14");
    setConductorMaterial("copper");
    setConductorTemp("20");
    setSmdCode("103");
    setFinderTargetResistance("1.5");
    setFinderTargetUnit("kΩ");
    setFinderESeries("E24");
    setReverseMode(false);
    setWheelFocus("V");
  };

  // Save calculation to local storage
  const handleSave = () => {
    if (!result) return;
    let label = "";
    if (activeTab === "color") {
      label = `Colors: ${result.formattedValue} (±${result.tolerancePct}%)`;
    } else if (activeTab === "series_parallel") {
      label = `${parallelMode ? "Parallel" : "Series"}: ${result.formattedValue}`;
    } else if (activeTab === "conductor") {
      label = `Conductor R: ${result.formattedValue}`;
    } else if (activeTab === "smd") {
      label = `SMD ${smdCode}: ${result.formattedValue}`;
    } else if (activeTab === "finder") {
      label = `E-Series: ${result.formattedValue}`;
    }

    const newItem = {
      id: Date.now().toString(),
      tab: activeTab,
      title: label,
      value: result.formattedValue,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      inputs: { ...currentInputs }
    };

    const updated = [newItem, ...savedItems.filter(i => i.title !== label)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_resistor_calculations", JSON.stringify(updated));
    } catch (e) {}
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  // Delete saved calculation
  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(i => i.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_resistor_calculations", JSON.stringify(updated));
    } catch (e) {}
  };

  // Copy Result (pure value and unit)
  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.formattedValue);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2000);
  };

  // Copy Summary (full Markdown engineering summary)
  const handleCopySummary = () => {
    if (!result) return;
    const tabName = TABS.find(t => t.id === activeTab)?.label || activeTab;
    let summaryText = `Resistor Calculation Summary\n` +
      `---------------------------------\n` +
      `Calculator Mode: ${tabName}\n` +
      `Calculated Resistance: ${result.formattedValue} (${result.resistanceOhms} Ω)\n`;

    if (result.minOhms !== undefined && result.maxOhms !== undefined) {
      summaryText += `Tolerance Range: ${formatOhms(result.minOhms)} to ${formatOhms(result.maxOhms)} (±${result.tolerancePct}%)\n`;
    }
    if (result.errorPct !== undefined) {
      summaryText += `Target Deviation: ${result.errorPct >= 0 ? "+" : ""}${result.errorPct}%\n`;
    }
    if (result.tempCoeffPpm) {
      summaryText += `TCR: ${result.tempCoeffPpm} ppm/K\n`;
    }
    if (activeTab === "conductor") {
      summaryText += `Material: ${conductorMaterial.toUpperCase()}, Length: ${conductorLength} ${conductorLengthUnit}, Temperature: ${conductorTemp}°C\n`;
    }
    if (activeTab === "series_parallel" && supplyVoltage && parseFloat(supplyVoltage) > 0) {
      const v = parseFloat(supplyVoltage);
      const i = result.resistanceOhms > 0 ? v / result.resistanceOhms : 0;
      const p = v * i;
      summaryText += `Supply Voltage: ${v} V | Current: ${i.toFixed(5)} A | Power: ${p.toFixed(4)} W\n`;
    }
    if (result.calculationSteps) {
      summaryText += `\nCalculation Breakdown:\n${result.calculationSteps}\n`;
    }
    summaryText += `Timestamp: ${new Date().toISOString()}\n`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // CSV Export
  const handleExportCsv = () => {
    if (!result) return;
    let headers: string[] = [];
    let row: (string | number)[] = [];

    if (activeTab === "color") {
      headers = ["Mode", "Band Count", "Resistance (Ohm)", "Formatted", "Tolerance (%)", "Min (Ohm)", "Max (Ohm)", "TCR (ppm)", "Timestamp"];
      row = [
        `"Color Code"`, bandCount, result.resistanceOhms, `"${result.formattedValue}"`,
        result.tolerancePct ?? "", result.minOhms?.toFixed(2) ?? "", result.maxOhms?.toFixed(2) ?? "",
        result.tempCoeffPpm ?? "", `"${new Date().toISOString()}"`
      ];
    } else if (activeTab === "series_parallel") {
      headers = ["Mode", "Configuration", "Input Resistors", "Supply Voltage (V)", "Equivalent (Ohm)", "Formatted", "Min (Ohm)", "Max (Ohm)", "Timestamp"];
      row = [
        `"Resistor Network"`, parallelMode ? `"Parallel"` : `"Series"`, `"${resistorValuesString}"`,
        supplyVoltage || 0, result.resistanceOhms, `"${result.formattedValue}"`,
        result.minOhms?.toFixed(2) ?? "", result.maxOhms?.toFixed(2) ?? "", `"${new Date().toISOString()}"`
      ];
    } else if (activeTab === "conductor") {
      headers = ["Mode", "Material", "Length", "Size Type", "Temperature (C)", "Resistance (Ohm)", "Formatted", "Timestamp"];
      row = [
        `"Conductor Resistance"`, `"${conductorMaterial}"`, `"${conductorLength} ${conductorLengthUnit}"`,
        `"${conductorSizeInputType}"`, conductorTemp, result.resistanceOhms.toFixed(5),
        `"${result.formattedValue}"`, `"${new Date().toISOString()}"`
      ];
    } else if (activeTab === "smd") {
      headers = ["Mode", "SMD Code", "Resistance (Ohm)", "Formatted", "Tolerance (%)", "Min (Ohm)", "Max (Ohm)", "Timestamp"];
      row = [
        `"SMD Decoder"`, `"${smdCode}"`, result.resistanceOhms, `"${result.formattedValue}"`,
        result.tolerancePct ?? "", result.minOhms?.toFixed(2) ?? "", result.maxOhms?.toFixed(2) ?? "",
        `"${new Date().toISOString()}"`
      ];
    } else {
      headers = ["Mode", "Target (Ohm)", "Standard E-Series", "Closest Standard (Ohm)", "Formatted", "Tolerance (%)", "Error (%)", "Timestamp"];
      row = [
        `"E-Series Finder"`, `${finderTargetResistance} ${finderTargetUnit}`, `"${finderESeries}"`,
        result.resistanceOhms, `"${result.formattedValue}"`, result.tolerancePct ?? "",
        result.errorPct ?? "", `"${new Date().toISOString()}"`
      ];
    }

    const csvContent = `${headers.join(",")}\n${row.join(",")}\n`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `resistor_calculator_${activeTab}_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // TXT Export
  const handleExportTxt = () => {
    if (!result) return;
    const tabName = TABS.find(t => t.id === activeTab)?.label || activeTab;
    const reportText = `============================================================\n` +
      `CALCPLATFORM ENGINEERING REPORT: RESISTOR SUITE\n` +
      `============================================================\n` +
      `Module: ${tabName}\n` +
      `Date/Time: ${new Date().toLocaleString()}\n` +
      `------------------------------------------------------------\n` +
      `CALCULATED EQUIVALENT RESISTANCE:\n` +
      `Nominal Resistance : ${result.formattedValue} (${result.resistanceOhms} Ω)\n` +
      (result.minOhms !== undefined && result.maxOhms !== undefined
        ? `Tolerance Range    : ${formatOhms(result.minOhms)} to ${formatOhms(result.maxOhms)} (±${result.tolerancePct}%)\n`
        : "") +
      (result.errorPct !== undefined ? `Target Deviation   : ${result.errorPct >= 0 ? "+" : ""}${result.errorPct}%\n` : "") +
      (result.tempCoeffPpm ? `Temperature Coeff  : ${result.tempCoeffPpm} ppm/K\n` : "") +
      `------------------------------------------------------------\n` +
      `MATHEMATICAL STEPS & DERIVATION:\n` +
      `${result.calculationSteps || "Standard evaluation."}\n` +
      `============================================================\n` +
      `ENGINEERING NOTICE:\n` +
      `Calculations conform to IEC 60062, IEC 60063, and standard conductor physics.\n` +
      `Worst-case tolerance bounds assume extreme branch drifts under load.\n` +
      `============================================================\n`;

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `resistor_report_${activeTab}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // LaTeX Export
  const handleExportLatex = () => {
    if (!result) return;
    let latex = "";
    if (activeTab === "color") {
      latex = `% Resistor Color Code Formulation\n` +
        `\\begin{aligned}\n` +
        `  R_{\\text{nominal}} &= ${result.resistanceOhms}\\,\\Omega = ${result.formattedValue} \\\\[4pt]\n` +
        (result.minOhms !== undefined && result.maxOhms !== undefined
          ? `  R_{\\text{min}} &= R_{\\text{nom}} \\times (1 - ${result.tolerancePct}/100) = ${result.minOhms.toFixed(2)}\\,\\Omega \\\\[4pt]\n` +
            `  R_{\\text{max}} &= R_{\\text{nom}} \\times (1 + ${result.tolerancePct}/100) = ${result.maxOhms.toFixed(2)}\\,\\Omega\n`
          : "") +
        `\\end{aligned}`;
    } else if (activeTab === "series_parallel") {
      if (!parallelMode) {
        latex = `% Series Resistor Network Formulation\n` +
          `\\begin{aligned}\n` +
          `  R_{\\text{total}} &= \\sum_{i=1}^{n} R_i = ${result.formattedValue} \\\\[4pt]\n` +
          (supplyVoltage && parseFloat(supplyVoltage) > 0
            ? `  I_{\\text{total}} &= \\frac{V}{R_{\\text{total}}} = \\frac{${supplyVoltage}\\,\\text{V}}{${result.resistanceOhms.toFixed(2)}\\,\\Omega} = ${(parseFloat(supplyVoltage) / result.resistanceOhms).toFixed(5)}\\,\\text{A} \\\\[4pt]\n` +
              `  P_{\\text{total}} &= V \\cdot I = \\frac{V^2}{R} = ${(parseFloat(supplyVoltage) ** 2 / result.resistanceOhms).toFixed(4)}\\,\\text{W}\n`
            : "") +
          `\\end{aligned}`;
      } else {
        latex = `% Parallel Resistor Network Formulation\n` +
          `\\begin{aligned}\n` +
          `  \\frac{1}{R_{\\text{total}}} &= \\sum_{i=1}^{n} \\frac{1}{R_i} \\implies R_{\\text{total}} = ${result.formattedValue} \\\\[4pt]\n` +
          (supplyVoltage && parseFloat(supplyVoltage) > 0 && result.resistanceOhms > 0
            ? `  I_{\\text{total}} &= \\frac{V}{R_{\\text{total}}} = ${(parseFloat(supplyVoltage) / result.resistanceOhms).toFixed(5)}\\,\\text{A} \\\\[4pt]\n` +
              `  P_{\\text{total}} &= V \\cdot I = ${(parseFloat(supplyVoltage) ** 2 / result.resistanceOhms).toFixed(4)}\\,\\text{W}\n`
            : "") +
          `\\end{aligned}`;
      }
    } else if (activeTab === "conductor") {
      latex = `% Conductor Resistance Formulation\n` +
        `\\begin{aligned}\n` +
        `  R_{20} &= \\frac{\\rho \\cdot L}{A} \\\\[4pt]\n` +
        `  R(T) &= R_{20} \\cdot [1 + \\alpha(T - 20^\\circ\\text{C})] = ${result.formattedValue}\n` +
        `\\end{aligned}`;
    } else if (activeTab === "smd") {
      latex = `% SMD Resistor Decoding\n` +
        `\\begin{aligned}\n` +
        `  \\text{Code: } & \\text{${smdCode}} \\implies R = ${result.formattedValue}\\,(\\pm${result.tolerancePct}\\%)\n` +
        `\\end{aligned}`;
    } else {
      latex = `% E-Series Standard Resistor Selection\n` +
        `\\begin{aligned}\n` +
        `  \\text{Standard: } & ${finderESeries} \\implies R_{\\text{standard}} = ${result.formattedValue} \\quad (\\pm${result.tolerancePct}\\%)\n` +
        `\\end{aligned}`;
    }

    navigator.clipboard.writeText(latex);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  // ReportModal report data configuration
  const reportData: CalculatorReportData | undefined = useMemo(() => {
    if (!result) return undefined;
    const tabName = TABS.find(t => t.id === activeTab)?.label || activeTab;
    return {
      meta: {
        calculatorName: "Resistor Calculator Suite",
        reportTitle: "Resistor & Circuit Analysis Engineering Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
      },
      keyMetrics: [
        { label: "Calculated Resistance", value: result.formattedValue, colorTheme: "blue" },
        { label: "Nominal Ohms", value: `${result.resistanceOhms} Ω`, colorTheme: "emerald" },
        {
          label: "Tolerance Range",
          value: result.minOhms !== undefined && result.maxOhms !== undefined
            ? `${formatOhms(result.minOhms)} - ${formatOhms(result.maxOhms)} (±${result.tolerancePct}%)`
            : "Exact",
          colorTheme: "purple"
        }
      ],
      sections: [
        {
          title: "Circuit Parameters & Specifications",
          items: [
            { label: "Calculation Module", value: tabName },
            { label: "Calculated Resistance", value: result.formattedValue },
            { label: "Nominal Ohms", value: `${result.resistanceOhms} Ω` },
            { label: "Minimum Bound", value: result.minOhms !== undefined ? formatOhms(result.minOhms) : "N/A" },
            { label: "Maximum Bound", value: result.maxOhms !== undefined ? formatOhms(result.maxOhms) : "N/A" },
            { label: "Tolerance Rate", value: result.tolerancePct !== undefined ? `±${result.tolerancePct}%` : "N/A" },
            { label: "Temperature Coefficient", value: result.tempCoeffPpm ? `${result.tempCoeffPpm} ppm/K` : "Standard" },
            { label: "Operating Supply Voltage", value: supplyVoltage && parseFloat(supplyVoltage) > 0 ? `${supplyVoltage} V` : "Passive" }
          ]
        },
        {
          title: "Step-by-Step Calculation Breakdown",
          items: [
            { label: "Mathematical Steps", value: result.calculationSteps || "Standard algebraic component derivation." }
          ]
        }
      ],
      recommendation: {
        title: "Engineering Recommendations",
        text: "Select component wattage with a minimum 50% derating safety margin (rated power ≥ 2 × calculated dissipation) and verify thermal drift under maximum operational ambient temperatures."
      }
    };
  }, [result, activeTab, supplyVoltage]);

  // Formula Wheel Data Helper
  const getFormulaWheelData = (variable: "V" | "I" | "R" | "P") => {
    switch (variable) {
      case "V":
        return [
          { formula: "V = I × R", label: "Ohm's Law" },
          { formula: "V = P / I", label: "Power & Current" },
          { formula: "V = √(P × R)", label: "Power & Resistance" }
        ];
      case "I":
        return [
          { formula: "I = V / R", label: "Ohm's Law" },
          { formula: "I = P / V", label: "Power & Voltage" },
          { formula: "I = √(P / R)", label: "Power & Resistance" }
        ];
      case "R":
        return [
          { formula: "R = V / I", label: "Ohm's Law" },
          { formula: "R = V² / P", label: "Voltage & Power" },
          { formula: "R = P / I²", label: "Power & Current" }
        ];
      case "P":
        return [
          { formula: "P = V × I", label: "Joule's First Law" },
          { formula: "P = I² × R", label: "Current & Resistance" },
          { formula: "P = V² / R", label: "Voltage & Resistance" }
        ];
    }
  };

  return (
    <div className="space-y-6">
      {/* TABS CONTROL BAR */}
      <div 
        role="tablist"
        aria-label="Resistor Calculator Modules"
        className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 scrollbar-none text-xs"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            id={`tab-${tab.id}`}
            aria-controls={`panel-${tab.id}`}
            onClick={() => {
              setActiveTab(tab.id);
              setReverseMode(false);
            }}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PRESETS BAR */}
      <div className="flex flex-wrap items-center gap-2 p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-300 dark:border-zinc-700 shadow-xs">
        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider pl-1 mr-1 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" /> Circuit Presets:
        </span>
        {[
          { id: "led", name: "LED Current Limiter (3x220Ω)" },
          { id: "divider", name: "Voltage Divider (10k/5k)" },
          { id: "shunt", name: "Parallel Shunt (2x100Ω)" },
          { id: "wire", name: "15m Copper Wire" }
        ].map((pr) => (
          <button
            key={pr.id}
            onClick={() => applyPreset(pr.id)}
            className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-[11px] font-bold text-zinc-600 dark:text-zinc-400 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer shadow-xs"
          >
            {pr.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: ACTIVE MODULE FORM */}
        <div className="lg:col-span-7 space-y-5">
          {/* TAB 1: RESISTOR COLOR CODE */}
          {activeTab === "color" && (
            <div id="panel-color" role="tabpanel" aria-labelledby="tab-color" className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span>Color Band Parameters</span>
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setReverseMode(!reverseMode)}
                    className={`text-[10px] font-bold px-2 py-0.5 border rounded-md transition-all cursor-pointer ${
                      reverseMode 
                        ? "border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-950/40" 
                        : "border-zinc-200 dark:border-zinc-700 text-zinc-400"
                    }`}
                  >
                    {reverseMode ? "← Value to Color Active" : "Value to Color Mode"}
                  </button>
                  <button
                    onClick={handleReset}
                    className="text-[10px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                </div>
              </div>

              {/* Band Count Selection */}
              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5 block">Resistor Bands Count</label>
                <div className="flex gap-2 text-xs">
                  {[4, 5, 6].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setBandCount(num as any)}
                      className={`flex-1 py-1.5 border rounded-lg font-bold transition-all cursor-pointer ${
                        bandCount === num
                          ? "border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-950/40"
                          : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {num} Bands
                    </button>
                  ))}
                </div>
              </div>

              {!reverseMode ? (
                // Standard mode: Color grids with swatches
                <div className="space-y-4">
                  {(() => {
                    const renderColorGrid = (
                      title: string,
                      currentValue: ResistorColor,
                      onChange: (val: ResistorColor) => void,
                      filterFn: (c: ResistorColor) => boolean,
                      labelFn: (c: ResistorColor) => string
                    ) => {
                      const list = Object.keys(COLOR_DATABASE).filter(c => filterFn(c as ResistorColor)) as ResistorColor[];
                      return (
                        <div className="space-y-1.5 p-3 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-zinc-300 dark:border-zinc-800">
                          <span className="text-[11px] font-black text-zinc-700 dark:text-zinc-300 block">{title}</span>
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                            {list.map(c => {
                              const isSelected = currentValue === c;
                              const swatchColor = getHexColor(c);
                              return (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => onChange(c)}
                                  className={`flex flex-col items-center justify-center p-2 border rounded-xl transition-all text-center group cursor-pointer shadow-xs ${
                                    isSelected
                                      ? "border-2 border-blue-600 dark:border-blue-500 bg-blue-50/80 dark:bg-blue-950/30 scale-[1.03]"
                                      : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                  }`}
                                >
                                  <span
                                    className="w-4 h-4 rounded-full border border-zinc-400 dark:border-zinc-600 shadow-inner mb-1.5 ring-1 ring-zinc-300 dark:ring-zinc-700 shrink-0"
                                    style={{ backgroundColor: swatchColor }}
                                  />
                                  <span className="text-[9px] font-bold text-slate-800 dark:text-slate-200 truncate w-full max-w-[80px]">
                                    {labelFn(c)}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    };

                    return (
                      <>
                        {renderColorGrid("1st Band (Significant Digit 1)", band1, setBand1,
                          (c) => COLOR_DATABASE[c].digit !== null && c !== "gold" && c !== "silver",
                          (c) => `${COLOR_DATABASE[c].label} (${COLOR_DATABASE[c].digit})`
                        )}
                        {renderColorGrid("2nd Band (Significant Digit 2)", band2, setBand2,
                          (c) => COLOR_DATABASE[c].digit !== null && c !== "gold" && c !== "silver",
                          (c) => `${COLOR_DATABASE[c].label} (${COLOR_DATABASE[c].digit})`
                        )}
                        {bandCount >= 5 && renderColorGrid("3rd Band (Significant Digit 3)", band3, setBand3,
                          (c) => COLOR_DATABASE[c].digit !== null && c !== "gold" && c !== "silver",
                          (c) => `${COLOR_DATABASE[c].label} (${COLOR_DATABASE[c].digit})`
                        )}
                        {renderColorGrid("Multiplier Band (Multiplier value)", multiplier, setMultiplier,
                          (c) => COLOR_DATABASE[c].multiplier !== null,
                          (c) => {
                            const val = COLOR_DATABASE[c].multiplier;
                            return val && val >= 1000 ? `${COLOR_DATABASE[c].label} (x${val / 1000}k)` : `${COLOR_DATABASE[c].label} (x${val})`;
                          }
                        )}
                        {renderColorGrid("Tolerance Band (Accuracy range)", tolerance, setTolerance,
                          (c) => COLOR_DATABASE[c].tolerance !== null,
                          (c) => `${COLOR_DATABASE[c].label} (±${COLOR_DATABASE[c].tolerance}%)`
                        )}
                        {bandCount === 6 && renderColorGrid("TCR Band (Temperature Coefficient)", tempCoeff, setTempCoeff,
                          (c) => COLOR_DATABASE[c].tempCoeff !== null,
                          (c) => `${COLOR_DATABASE[c].label} (${COLOR_DATABASE[c].tempCoeff} ppm)`
                        )}
                      </>
                    );
                  })()}
                </div>
              ) : (
                // Reverse Mode: Enter Target Resistance
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="target-resistance" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Target Resistance</label>
                    <div className="flex gap-1">
                      <Input
                        id="target-resistance"
                        type="number"
                        value={targetResistance}
                        onChange={(e) => setTargetResistance(e.target.value)}
                        className="font-sans tabular-nums flex-1 rounded-r-none border-r-0 text-xs"
                      />
                      <select
                        id="target-resistance-unit"
                        aria-label="Target Resistance Unit"
                        value={targetResistanceUnit}
                        onChange={(e) => setTargetResistanceUnit(e.target.value as any)}
                        className="px-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-lg rounded-l-none text-xs outline-hidden"
                      >
                        <option value="mΩ">mΩ</option>
                        <option value="Ω">Ω</option>
                        <option value="kΩ">kΩ</option>
                        <option value="MΩ">MΩ</option>
                        <option value="GΩ">GΩ</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="target-tolerance" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Desired Tolerance (±%)</label>
                    <select
                      id="target-tolerance"
                      aria-label="Desired Tolerance"
                      value={targetTolerance}
                      onChange={(e) => setTargetTolerance(e.target.value)}
                      className="w-full h-9 px-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-hidden"
                    >
                      <option value="1">±1% (Brown)</option>
                      <option value="2">±2% (Red)</option>
                      <option value="0.5">±0.5% (Green)</option>
                      <option value="0.25">±0.25% (Blue)</option>
                      <option value="0.1">±0.1% (Violet)</option>
                      <option value="0.05">±0.05% (Orange)</option>
                      <option value="5">±5% (Gold)</option>
                      <option value="10">±10% (Silver)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SERIES & PARALLEL NETWORKS */}
          {activeTab === "series_parallel" && (
            <div id="panel-series_parallel" role="tabpanel" aria-labelledby="tab-series_parallel" className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  Network Configuration
                </h3>
                <button
                  onClick={() => setResistorValuesString("")}
                  className="text-[10px] text-zinc-400 hover:text-red-500 font-semibold cursor-pointer"
                >
                  Clear Fields
                </button>
              </div>

              {/* Series or Parallel Switch */}
              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Connection Method</label>
                <div className="flex gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setParallelMode(false)}
                    className={`flex-1 py-1.5 border rounded-lg font-bold transition-all cursor-pointer ${
                      !parallelMode
                        ? "border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-950/40"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    Series Connection
                  </button>
                  <button
                    type="button"
                    onClick={() => setParallelMode(true)}
                    className={`flex-1 py-1.5 border rounded-lg font-bold transition-all cursor-pointer ${
                      parallelMode
                        ? "border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-950/40"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    Parallel Connection
                  </button>
                </div>
              </div>

              {/* Resistor values */}
              <div>
                <label htmlFor="resistor-values" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">
                  Resistor Values (comma separated)
                </label>
                <textarea
                  id="resistor-values"
                  rows={3}
                  value={resistorValuesString}
                  onChange={(e) => setResistorValuesString(e.target.value)}
                  placeholder="e.g. 100, 220, 470 or 10k@1, 2.2M"
                  className="w-full p-2.5 text-xs font-sans tabular-nums rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 outline-hidden focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-[10px] text-zinc-400 block mt-1">
                  Add custom tolerance via &apos;@&apos;, e.g. &apos;2.2k@1&apos; specifies 2.2 kΩ with ±1% tolerance.
                </span>
              </div>

              {/* Supply Voltage */}
              <div>
                <label htmlFor="supply-voltage" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">
                  Supply Voltage (V) — Optional
                </label>
                <Input
                  id="supply-voltage"
                  type="number"
                  value={supplyVoltage}
                  onChange={(e) => setSupplyVoltage(e.target.value)}
                  placeholder="e.g. 12"
                  className="font-sans tabular-nums text-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 3: CONDUCTOR RESISTANCE */}
          {activeTab === "conductor" && (
            <div id="panel-conductor" role="tabpanel" aria-labelledby="tab-conductor" className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  Conductor physical properties
                </h3>
                <button
                  onClick={() => {
                    setConductorLength("100");
                    setConductorDiameter("1");
                    setConductorMaterial("copper");
                    setConductorTemp("20");
                  }}
                  className="text-[10px] text-zinc-400 hover:text-blue-500 font-semibold cursor-pointer"
                >
                  Reset Defaults
                </button>
              </div>

              <div className="space-y-3">
                {/* Material */}
                <div>
                  <label htmlFor="conductor-material" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Conductor Material</label>
                  <select
                    id="conductor-material"
                    value={conductorMaterial}
                    onChange={(e) => setConductorMaterial(e.target.value)}
                    className="w-full h-9 px-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-hidden"
                  >
                    {Object.entries(MATERIAL_RESISTIVITIES).map(([key, mat]) => (
                      <option key={key} value={key}>
                        {mat.name} (ρ_20 = {mat.rho.toExponential(2)} Ω·m, α = {mat.alpha}/°C)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Length */}
                <div>
                  <label htmlFor="conductor-length" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Conductor Length</label>
                  <div className="flex gap-1">
                    <Input
                      id="conductor-length"
                      type="number"
                      value={conductorLength}
                      onChange={(e) => setConductorLength(e.target.value)}
                      className="font-sans tabular-nums flex-1 rounded-r-none border-r-0 text-xs"
                    />
                    <select
                      id="conductor-length-unit"
                      aria-label="Conductor Length Unit"
                      value={conductorLengthUnit}
                      onChange={(e) => setConductorLengthUnit(e.target.value as any)}
                      className="px-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-lg rounded-l-none text-xs outline-hidden"
                    >
                      <option value="mm">mm</option>
                      <option value="cm">cm</option>
                      <option value="m">meters (m)</option>
                      <option value="km">km</option>
                      <option value="in">inches</option>
                      <option value="ft">feet (ft)</option>
                      <option value="yd">yards</option>
                      <option value="mile">miles</option>
                    </select>
                  </div>
                </div>

                {/* Size Type selector */}
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Size Input Type</label>
                  <div className="flex gap-2 text-xs">
                    {(["diameter", "area", "awg"] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setConductorSizeInputType(type)}
                        className={`flex-1 py-1.5 border rounded-lg font-bold transition-all uppercase cursor-pointer ${
                          conductorSizeInputType === type
                            ? "border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-950/40"
                            : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Diameter, Area or AWG input */}
                {conductorSizeInputType === "diameter" ? (
                  <div>
                    <label htmlFor="conductor-diameter" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Wire Diameter</label>
                    <div className="flex gap-1">
                      <Input
                        id="conductor-diameter"
                        type="number"
                        value={conductorDiameter}
                        onChange={(e) => setConductorDiameter(e.target.value)}
                        className="font-sans tabular-nums flex-1 rounded-r-none border-r-0 text-xs"
                      />
                      <select
                        id="conductor-diameter-unit"
                        aria-label="Wire Diameter Unit"
                        value={conductorDiameterUnit}
                        onChange={(e) => setConductorDiameterUnit(e.target.value as any)}
                        className="px-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-lg rounded-l-none text-xs outline-hidden"
                      >
                        <option value="mm">mm</option>
                        <option value="cm">cm</option>
                        <option value="in">inches (in)</option>
                      </select>
                    </div>
                  </div>
                ) : conductorSizeInputType === "awg" ? (
                  <div>
                    <label htmlFor="conductor-awg" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">AWG Wire Gauge</label>
                    <select
                      id="conductor-awg"
                      value={conductorAwg}
                      onChange={(e) => setConductorAwg(e.target.value)}
                      className="w-full h-9 px-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-hidden font-bold"
                    >
                      {AWG_GAUGES.map(gauge => (
                        <option key={gauge} value={gauge}>
                          AWG {gauge} (Ø {(awgToDiameterMeters(gauge) * 1000).toFixed(3)} mm)
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="conductor-area" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Cross-sectional Area</label>
                    <div className="flex gap-1">
                      <Input
                        id="conductor-area"
                        type="number"
                        value={conductorArea}
                        onChange={(e) => setConductorArea(e.target.value)}
                        className="font-sans tabular-nums flex-1 rounded-r-none border-r-0 text-xs"
                      />
                      <select
                        id="conductor-area-unit"
                        aria-label="Conductor Area Unit"
                        value={conductorAreaUnit}
                        onChange={(e) => setConductorAreaUnit(e.target.value as any)}
                        className="px-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-lg rounded-l-none text-xs outline-hidden"
                      >
                        <option value="mm²">mm²</option>
                        <option value="cm²">cm²</option>
                        <option value="in²">in²</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Operating temperature */}
                <div>
                  <label htmlFor="conductor-temp" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">
                    Operating Temperature (°C)
                  </label>
                  <Input
                    id="conductor-temp"
                    type="number"
                    value={conductorTemp}
                    onChange={(e) => setConductorTemp(e.target.value)}
                    className="font-sans tabular-nums text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SMD RESISTOR DECODER */}
          {activeTab === "smd" && (
            <div id="panel-smd" role="tabpanel" aria-labelledby="tab-smd" className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 border-b border-zinc-200 dark:border-zinc-800 pb-2 flex items-center justify-between">
                <span>SMD Resistor Codes</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Standards: 3-digit, 4-digit, EIA-96</span>
              </h3>

              <div>
                <label htmlFor="smd-code" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">SMD Marking Code</label>
                <Input
                  id="smd-code"
                  type="text"
                  value={smdCode}
                  onChange={(e) => setSmdCode(e.target.value)}
                  placeholder="e.g. 103, 4R7, 1002, 01A"
                  className="font-sans tabular-nums text-xs font-bold text-blue-600 dark:text-blue-400 uppercase"
                />
                <span className="text-[10px] text-zinc-400 mt-1 block">
                  Supports 3-digit codes (e.g. `103`), 4-digit codes (e.g. `1002`), decimal codes (e.g. `4R7`), and EIA-96 codes (e.g. `01A`).
                </span>
              </div>
            </div>
          )}

          {/* TAB 5: E-SERIES FINDER */}
          {activeTab === "finder" && (
            <div id="panel-finder" role="tabpanel" aria-labelledby="tab-finder" className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                E-Series Lookup and Resistor Finder
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Target resistance */}
                <div>
                  <label htmlFor="finder-target" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Target Resistance</label>
                  <div className="flex gap-1">
                    <Input
                      id="finder-target"
                      type="number"
                      value={finderTargetResistance}
                      onChange={(e) => setFinderTargetResistance(e.target.value)}
                      className="font-sans tabular-nums flex-1 rounded-r-none border-r-0 text-xs"
                    />
                    <select
                      id="finder-target-unit"
                      aria-label="Target Resistance Unit"
                      value={finderTargetUnit}
                      onChange={(e) => setFinderTargetUnit(e.target.value as any)}
                      className="px-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-lg rounded-l-none text-xs outline-hidden font-bold"
                    >
                      <option value="Ω">Ω</option>
                      <option value="kΩ">kΩ</option>
                      <option value="MΩ">MΩ</option>
                    </select>
                  </div>
                </div>

                {/* E-Series set */}
                <div>
                  <label htmlFor="finder-eseries" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Preferred E-Series Standard</label>
                  <select
                    id="finder-eseries"
                    value={finderESeries}
                    onChange={(e) => setFinderESeries(e.target.value as any)}
                    className="w-full h-9 px-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-blue-500 font-bold"
                  >
                    <option value="E6">E6 (±20% Tolerance)</option>
                    <option value="E12">E12 (±10% Tolerance)</option>
                    <option value="E24">E24 (±5% Tolerance)</option>
                    <option value="E48">E48 (±2% Tolerance)</option>
                    <option value="E96">E96 (±1% Tolerance)</option>
                    <option value="E192">E192 (±0.5% Tolerance)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* INTERACTIVE FORMULA WHEEL */}
          <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4 flex flex-col items-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
              Interactive Formula Wheel (V, I, R, P)
            </h4>

            {/* SVG Formula Wheel representation */}
            <svg 
              viewBox="0 0 200 200" 
              className="w-52 h-52 transition-transform select-none"
              role="region"
              aria-label="Interactive Resistor Formula Wheel"
            >
              {/* Outer boundary circle */}
              <circle cx="100" cy="100" r="95" className="fill-none stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="2" />
              
              {/* Quad segment P (Power, Top-Left) */}
              <path
                d="M 100,100 L 100,10 A 90,90 0 0,0 10,100 Z"
                role="button"
                tabIndex={0}
                aria-label="Select Power formulas"
                onClick={() => setWheelFocus("P")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setWheelFocus("P"); } }}
                className={`transition-colors duration-150 cursor-pointer focus:outline-hidden ${
                  wheelFocus === "P" 
                    ? "fill-emerald-100/80 dark:fill-emerald-950/40 stroke-emerald-600 stroke-2" 
                    : "fill-zinc-50/50 dark:fill-zinc-900/30 stroke-zinc-200 dark:stroke-zinc-800 hover:fill-zinc-100/50"
                }`}
              />
              {/* Quad segment V (Voltage, Top-Right) */}
              <path
                d="M 100,100 L 190,100 A 90,90 0 0,0 100,10 Z"
                role="button"
                tabIndex={0}
                aria-label="Select Voltage formulas"
                onClick={() => setWheelFocus("V")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setWheelFocus("V"); } }}
                className={`transition-colors duration-150 cursor-pointer focus:outline-hidden ${
                  wheelFocus === "V" 
                    ? "fill-pink-100/80 dark:fill-pink-950/40 stroke-pink-600 stroke-2" 
                    : "fill-zinc-50/50 dark:fill-zinc-900/30 stroke-zinc-200 dark:stroke-zinc-800 hover:fill-zinc-100/50"
                }`}
              />
              {/* Quad segment I (Current, Bottom-Left) */}
              <path
                d="M 100,100 L 10,100 A 90,90 0 0,0 100,190 Z"
                role="button"
                tabIndex={0}
                aria-label="Select Current formulas"
                onClick={() => setWheelFocus("I")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setWheelFocus("I"); } }}
                className={`transition-colors duration-150 cursor-pointer focus:outline-hidden ${
                  wheelFocus === "I" 
                    ? "fill-amber-100/80 dark:fill-amber-950/40 stroke-amber-600 stroke-2" 
                    : "fill-zinc-50/50 dark:fill-zinc-900/30 stroke-zinc-200 dark:stroke-zinc-800 hover:fill-zinc-100/50"
                }`}
              />
              {/* Quad segment R (Resistance, Bottom-Right) */}
              <path
                d="M 100,100 L 100,190 A 90,90 0 0,0 190,100 Z"
                role="button"
                tabIndex={0}
                aria-label="Select Resistance formulas"
                onClick={() => setWheelFocus("R")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setWheelFocus("R"); } }}
                className={`transition-colors duration-150 cursor-pointer focus:outline-hidden ${
                  wheelFocus === "R" 
                    ? "fill-indigo-100/80 dark:fill-indigo-950/40 stroke-indigo-600 stroke-2" 
                    : "fill-zinc-50/50 dark:fill-zinc-900/30 stroke-zinc-200 dark:stroke-zinc-800 hover:fill-zinc-100/50"
                }`}
              />

              {/* inner divider axes lines */}
              <line x1="10" y1="100" x2="190" y2="100" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.5" />
              <line x1="100" y1="10" x2="100" y2="190" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.5" />

              {/* center indicator badge */}
              <circle cx="100" cy="100" r="26" className="fill-white dark:fill-zinc-950 stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="2" />
              <text x="100" y="104" textAnchor="middle" className="text-[10px] font-black fill-zinc-900 dark:fill-white font-sans">WHEEL</text>

              {/* Quadrant Text Labels */}
              <text x="56" y="56" className="text-[13px] font-black fill-emerald-800 dark:fill-emerald-400">P</text>
              <text x="144" y="56" className="text-[13px] font-black fill-pink-800 dark:fill-pink-400">V</text>
              <text x="56" y="152" className="text-[13px] font-black fill-amber-800 dark:fill-amber-400">I</text>
              <text x="144" y="152" className="text-[13px] font-black fill-indigo-800 dark:fill-indigo-400">R</text>
            </svg>

            {/* Selected segment formulas list */}
            <div className="w-full space-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-3 text-center">
              <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block">
                Formulas to calculate <strong className="text-zinc-900 dark:text-zinc-100 font-bold">{wheelFocus}</strong>:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {getFormulaWheelData(wheelFocus).map((item, i) => (
                  <div key={i} className="p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-center">
                    <div className="text-xs font-sans tabular-nums font-black text-blue-600 dark:text-blue-400">{item.formula}</div>
                    <div className="text-[9px] text-zinc-400 font-semibold">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY RESULTS PANEL */}
        <div className="lg:col-span-5 space-y-4 sticky top-4">
          {/* DYNAMIC SVG RESISTOR BAND VISUALIZER */}
          {activeTab === "color" && !validationErrors.length && result && result.bands && (
            <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-md space-y-2">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-center">Resistor Band Visualizer</h4>
              <div className="flex justify-center p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border dark:border-zinc-800">
                <svg width="100%" height="80" viewBox="0 0 320 80" className="max-w-[280px]">
                  {/* Lead wires */}
                  <line x1="10" y1="40" x2="310" y2="40" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Resistor body */}
                  <rect x="60" y="20" width="200" height="40" rx="10" fill="#f5ebe0" stroke="#e3d5ca" strokeWidth="2" />
                  
                  {/* Colored bands */}
                  {bandCount === 4 && result.bands.length >= 4 && (
                    <>
                      <rect x="90" y="20" width="8" height="40" fill={getHexColor(result.bands[0])} />
                      <rect x="125" y="20" width="8" height="40" fill={getHexColor(result.bands[1])} />
                      <rect x="160" y="20" width="8" height="40" fill={getHexColor(result.bands[2])} />
                      <rect x="215" y="20" width="8" height="40" fill={getHexColor(result.bands[3])} />
                    </>
                  )}

                  {bandCount === 5 && result.bands.length >= 5 && (
                    <>
                      <rect x="85" y="20" width="8" height="40" fill={getHexColor(result.bands[0])} />
                      <rect x="110" y="20" width="8" height="40" fill={getHexColor(result.bands[1])} />
                      <rect x="135" y="20" width="8" height="40" fill={getHexColor(result.bands[2])} />
                      <rect x="165" y="20" width="8" height="40" fill={getHexColor(result.bands[3])} />
                      <rect x="215" y="20" width="8" height="40" fill={getHexColor(result.bands[4])} />
                    </>
                  )}

                  {bandCount === 6 && result.bands.length >= 6 && (
                    <>
                      <rect x="80" y="20" width="7" height="40" fill={getHexColor(result.bands[0])} />
                      <rect x="105" y="20" width="7" height="40" fill={getHexColor(result.bands[1])} />
                      <rect x="130" y="20" width="7" height="40" fill={getHexColor(result.bands[2])} />
                      <rect x="155" y="20" width="7" height="40" fill={getHexColor(result.bands[3])} />
                      <rect x="190" y="20" width="7" height="40" fill={getHexColor(result.bands[4])} />
                      <rect x="225" y="20" width="7" height="40" fill={getHexColor(result.bands[5])} />
                    </>
                  )}
                </svg>
              </div>
            </div>
          )}

          {/* RESULTS CARD */}
          <div 
            aria-live="polite"
            className="p-4 sm:p-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl border border-blue-600/30 dark:border-blue-500/30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08),0_2px_6px_-1px_rgba(0,0,0,0.04)] space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <span>⚡</span> Resistor Suite Outputs
              </span>
              <div className="flex items-center gap-1.5 no-print">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  className="h-7 text-xs gap-1 border border-slate-200 dark:border-slate-700 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-xs cursor-pointer rounded-lg"
                >
                  {justSaved ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Bookmark className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                  {justSaved ? "Saved!" : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyResult}
                  className="h-7 text-xs gap-1 border border-slate-200 dark:border-slate-700 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-xs cursor-pointer rounded-lg"
                >
                  {copiedResult ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
                  {copiedResult ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>

            {validationErrors.length > 0 ? (
              <div role="alert" className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/80 rounded-xl text-xs text-red-600 dark:text-red-400 font-semibold space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0" /> Input Validation Errors:
                </div>
                <ul className="list-disc pl-4 space-y-1">
                  {validationErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            ) : result ? (
              <div className="space-y-4">
                {/* Main value display */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-4 bg-gradient-to-b from-blue-50/80 via-white to-blue-50/40 dark:from-slate-800/80 dark:via-slate-900 dark:to-slate-800/40 border border-blue-200 dark:border-blue-900/50 rounded-xl text-center shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.8),0_2px_8px_-2px_rgba(37,99,235,0.12)]">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Calculated Resistance</div>
                    <div className="text-3xl sm:text-4xl font-sans tabular-nums font-black text-blue-600 dark:text-blue-400 mt-1 tracking-tight">
                      {result.formattedValue}
                    </div>
                  </div>
                </div>

                {/* Nominal and tolerance details */}
                {result.minOhms !== undefined && result.maxOhms !== undefined && (
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-sans tabular-nums space-y-1.5 text-slate-700 dark:text-slate-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                    <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Nominal resistance:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{result.resistanceOhms} Ω</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Tolerance rate:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">±{result.tolerancePct}%</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Minimum resistance:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{formatOhms(result.minOhms)}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Maximum resistance:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{formatOhms(result.maxOhms)}</span>
                    </div>
                    {result.errorPct !== undefined && (
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Deviation from target:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">{result.errorPct >= 0 ? "+" : ""}{result.errorPct}%</span>
                      </div>
                    )}
                  </div>
                )}

                {/* EXPORT ACTION TOOLBAR */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 no-print space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Export & Reports</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCopySummary}
                      className="h-7 text-[11px] gap-1 px-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 border-slate-200 dark:border-slate-700 cursor-pointer"
                    >
                      {copiedSummary ? <Check className="w-3 h-3 text-emerald-600" /> : <FileText className="w-3 h-3 text-blue-500" />}
                      {copiedSummary ? "Copied!" : "Summary"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleExportCsv}
                      className="h-7 text-[11px] gap-1 px-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 border-slate-200 dark:border-slate-700 cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-emerald-500" />
                      CSV
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleExportTxt}
                      className="h-7 text-[11px] gap-1 px-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 border-slate-200 dark:border-slate-700 cursor-pointer"
                    >
                      <FileText className="w-3 h-3 text-amber-500" />
                      TXT
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleExportLatex}
                      className="h-7 text-[11px] gap-1 px-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 border-slate-200 dark:border-slate-700 cursor-pointer"
                    >
                      {copiedLatex ? <Check className="w-3 h-3 text-emerald-600" /> : <Code className="w-3 h-3 text-indigo-500" />}
                      {copiedLatex ? "Copied!" : "LaTeX"}
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReportModal(true)}
                    className="w-full h-8 text-xs gap-1.5 bg-blue-50/50 hover:bg-blue-100/50 dark:bg-blue-950/30 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50 font-bold cursor-pointer rounded-xl"
                  >
                    <Printer className="w-3.5 h-3.5" /> Generate Printable PDF Report
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                Resistor suite calculation failed.
              </div>
            )}
          </div>

          {/* HISTORIC SAVED CALCULATIONS */}
          {savedItems.length > 0 && (
            <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-3 no-print">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-1.5">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-blue-500" /> Saved Calculations ({savedItems.length})
                </span>
                <button
                  onClick={() => {
                    setSavedItems([]);
                    localStorage.removeItem("saved_resistor_calculations");
                  }}
                  className="text-[10px] text-zinc-400 hover:text-red-500 font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {savedItems.map((item) => (
                  <div key={item.id} className="p-2 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-sans tabular-nums">
                    <button
                      onClick={() => {
                        const inputs = item.inputs;
                        setActiveTab(item.tab);
                        if (item.tab === "color") {
                          setBandCount(inputs.bandCount);
                          setBand1(inputs.band1);
                          setBand2(inputs.band2);
                          setBand3(inputs.band3);
                          setMultiplier(inputs.multiplier);
                          setTolerance(inputs.tolerance);
                          setTempCoeff(inputs.tempCoeff);
                          setTargetResistance(String(inputs.targetResistance));
                          setTargetResistanceUnit(inputs.targetResistanceUnit);
                          setTargetTolerance(String(inputs.targetTolerance));
                          setTargetTempCoeff(String(inputs.targetTempCoeff));
                          setReverseMode(inputs.reverseMode);
                        } else if (item.tab === "series_parallel") {
                          setResistorValuesString(inputs.resistorValuesString);
                          setParallelMode(inputs.parallelMode);
                          setSupplyVoltage(String(inputs.supplyVoltage));
                        } else if (item.tab === "conductor") {
                          setConductorLength(String(inputs.conductorLength));
                          setConductorLengthUnit(inputs.conductorLengthUnit);
                          setConductorSizeInputType(inputs.conductorSizeInputType);
                          setConductorDiameter(String(inputs.conductorDiameter));
                          setConductorDiameterUnit(inputs.conductorDiameterUnit);
                          setConductorArea(String(inputs.conductorArea));
                          setConductorAreaUnit(inputs.conductorAreaUnit);
                          setConductorAwg(String(inputs.conductorAwg || "14"));
                          setConductorMaterial(inputs.conductorMaterial);
                          setConductorTemp(String(inputs.conductorTemp));
                        } else if (item.tab === "smd") {
                          setSmdCode(inputs.smdCode);
                        } else if (item.tab === "finder") {
                          setFinderTargetResistance(String(inputs.finderTargetResistance));
                          setFinderTargetUnit(inputs.finderTargetUnit);
                          setFinderESeries(inputs.finderESeries);
                        }
                      }}
                      className="text-left font-bold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 truncate flex-1 cursor-pointer"
                    >
                      <div className="text-[10px] text-zinc-400">{item.timestamp}</div>
                      {item.title}
                    </button>
                    <button
                      onClick={() => handleDeleteSaved(item.id)}
                      className="text-zinc-400 hover:text-red-500 p-0.5 ml-2 cursor-pointer"
                      aria-label={`Delete saved item ${item.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP BY STEP FORMULA BREAKDOWN */}
          {result && result.calculationSteps && (
            <details className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-3 group outline-hidden">
              <summary className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 cursor-pointer flex items-center justify-between select-none">
                <span>📘 Show Calculation Breakdown</span>
                <span className="text-[10px] font-sans tabular-nums group-open:hidden">Expand +</span>
                <span className="text-[10px] font-sans tabular-nums hidden group-open:inline">Collapse -</span>
              </summary>
              <div className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800 mt-2">
                <pre className="p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-sans tabular-nums text-[11px] text-zinc-800 dark:text-zinc-300 overflow-x-auto leading-normal whitespace-pre-wrap">
                  {result.calculationSteps}
                </pre>
              </div>
            </details>
          )}
        </div>
      </div>

      {/* PDF / Print Report Modal */}
      {showReportModal && reportData && (
        <ReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          reportData={reportData}
        />
      )}
    </div>
  );
}

export default ResistorCalculator;
