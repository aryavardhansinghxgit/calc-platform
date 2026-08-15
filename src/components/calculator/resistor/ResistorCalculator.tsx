"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Copy, Check, Bookmark, Trash2, History, Printer, Share2, Zap, Settings, RefreshCw, Info, HelpCircle } from "lucide-react";
import {
  calculateResistorCalculator,
  COLOR_DATABASE,
  VALID_COLORS,
  formatOhms,
  E_SERIES_BASES
} from "@/app/calculators/resistor-calculator/calculator";
import { ResistorColor, ResistorCalculatorInputs, ResistorCalculatorOutputs } from "@/app/calculators/resistor-calculator/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TABS = [
  { id: "color", label: "Resistor Color Code" },
  { id: "series_parallel", label: "Series & Parallel Networks" },
  { id: "conductor", label: "Conductor Resistance" },
  { id: "smd", label: "SMD Resistor Decoder" },
  { id: "finder", label: "E-Series Finder" }
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
  const [conductorSizeInputType, setConductorSizeInputType] = useState<"diameter" | "area">("diameter");
  const [conductorDiameter, setConductorDiameter] = useState("1");
  const [conductorDiameterUnit, setConductorDiameterUnit] = useState<any>("mm");
  const [conductorArea, setConductorArea] = useState("0.785");
  const [conductorAreaUnit, setConductorAreaUnit] = useState<any>("mm²");
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
  // STATE: COMMON / PERSISTENCE
  // ==========================================
  const [copied, setCopied] = useState(false);
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [justSaved, setJustSaved] = useState(false);

  // Sync saved list from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_resistor_calculations");
      if (stored) setSavedItems(JSON.parse(stored));
    } catch (e) {}
  }, []);

  // Sync reverse inputs if colors change in standard mode
  const syncColorsToReverse = (res: ResistorCalculatorOutputs) => {
    if (!res) return;
    setTargetTolerance(String(res.tolerancePct || 5));
    if (res.tempCoeffPpm) setTargetTempCoeff(String(res.tempCoeffPpm));
  };

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
      supplyVoltage: parseFloat(supplyVoltage) || 0,
      conductorLength: parseFloat(conductorLength) || 0,
      conductorLengthUnit,
      conductorSizeInputType,
      conductorDiameter: parseFloat(conductorDiameter) || 0,
      conductorDiameterUnit,
      conductorArea: parseFloat(conductorArea) || 0,
      conductorAreaUnit,
      conductorMaterial,
      conductorTemp: parseFloat(conductorTemp) || 20,
      smdCode,
      finderTargetResistance: parseFloat(finderTargetResistance) || 0,
      finderTargetUnit,
      finderESeries
    };
  }, [
    activeTab, reverseMode, bandCount, band1, band2, band3, multiplier, tolerance, tempCoeff,
    targetResistance, targetResistanceUnit, targetTolerance, targetTempCoeff,
    resistorValuesString, parallelMode, supplyVoltage,
    conductorLength, conductorLengthUnit, conductorSizeInputType, conductorDiameter, conductorDiameterUnit, conductorArea, conductorAreaUnit, conductorMaterial, conductorTemp,
    smdCode, finderTargetResistance, finderTargetUnit, finderESeries
  ]);

  // Validation
  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    if (activeTab === "color" && reverseMode) {
      const tr = parseFloat(targetResistance);
      if (isNaN(tr) || tr <= 0) errors.push("Target resistance value must be greater than 0.");
    }
    if (activeTab === "series_parallel") {
      if (!resistorValuesString.trim()) errors.push("Please enter at least one resistor value.");
    }
    if (activeTab === "conductor") {
      const len = parseFloat(conductorLength);
      if (isNaN(len) || len <= 0) errors.push("Conductor length must be greater than 0.");
      if (conductorSizeInputType === "diameter") {
        const diam = parseFloat(conductorDiameter);
        if (isNaN(diam) || diam <= 0) errors.push("Conductor diameter must be greater than 0.");
      } else {
        const area = parseFloat(conductorArea);
        if (isNaN(area) || area <= 0) errors.push("Conductor cross-sectional area must be greater than 0.");
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
  }, [activeTab, reverseMode, targetResistance, resistorValuesString, conductorLength, conductorSizeInputType, conductorDiameter, conductorArea, smdCode, finderTargetResistance]);

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
    return colors[color];
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
    setConductorArea("0.785");
    setConductorAreaUnit("mm²");
    setConductorMaterial("copper");
    setConductorTemp("20");
    setSmdCode("103");
    setFinderTargetResistance("1.5");
    setFinderTargetUnit("kΩ");
    setFinderESeries("E24");
    setReverseMode(false);
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

  // Copy details to clipboard
  const handleCopy = () => {
    if (!result) return;
    let summaryText = `Resistor Calculation Summary\n` +
      `---------------------------------\n` +
      `Calculator Mode: ${TABS.find(t => t.id === activeTab)?.label}\n` +
      `Equivalent Value: ${result.formattedValue}\n`;

    if (result.minOhms && result.maxOhms) {
      summaryText += `Range: ${formatOhms(result.minOhms)} to ${formatOhms(result.maxOhms)} (±${result.tolerancePct}%)\n`;
    }
    if (result.tempCoeffPpm) {
      summaryText += `TCR: ${result.tempCoeffPpm} ppm/K\n`;
    }
    if (result.calculationSteps) {
      summaryText += `\nSteps:\n${result.calculationSteps}\n`;
    }

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share calculation url
  const handleShare = () => {
    if (!result) return;
    const url = `${window.location.origin}${window.location.pathname}?tab=${activeTab}&code=${smdCode}&parallel=${parallelMode}&voltage=${supplyVoltage}&length=${conductorLength}&diam=${conductorDiameter}&material=${conductorMaterial}`;
    if (navigator.share) {
      navigator.share({
        title: "Resistor Calculator Suite Results",
        text: `Calculated resistor network output: ${result.formattedValue}. Check it out here:`,
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert("Share URL copied to clipboard!");
    }
  };

  // Trigger browser print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* TABS CONTROL BAR */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 scrollbar-none text-xs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
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
      <div className="flex flex-wrap items-center gap-2 p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-300 dark:border-zinc-700 shadow-sm">
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
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-600" />
                  <span>Color Band Parameters</span>
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setReverseMode(!reverseMode)}
                    className={`text-[10px] font-bold px-2 py-0.5 border rounded-md transition-all ${
                      reverseMode 
                        ? "border-blue-600 text-blue-600 bg-blue-50/50" 
                        : "border-zinc-200 text-zinc-400"
                    }`}
                  >
                    {reverseMode ? "← Value to Color Active" : "Value to Color Mode"}
                  </button>
                  <button
                    onClick={handleReset}
                    className="text-[10px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 font-semibold"
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
                      className={`flex-1 py-1.5 border rounded-lg font-bold transition-all ${
                        bandCount === num
                          ? "border-blue-600 text-blue-600 bg-blue-50/50"
                          : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
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
                                  className={`flex flex-col items-center justify-center p-2 border rounded-xl transition-all text-center group cursor-pointer shadow-sm ${
                                    isSelected
                                      ? "border-2 border-blue-600 dark:border-blue-500 bg-blue-50/80 dark:bg-blue-950/30 scale-[1.03]"
                                      : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                  }`}
                                >
                                  <span
                                    className="w-4.5 h-4.5 rounded-full border border-zinc-400 dark:border-zinc-600 shadow-inner mb-1.5 ring-1 ring-zinc-300 dark:ring-zinc-700 shrink-0"
                                    style={{ backgroundColor: swatchColor }}
                                  />
                                  <span className="text-[9px] font-black text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-800 dark:group-hover:text-zinc-100 truncate w-full max-w-[80px]">
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
                            return val && val >= 1000 ? `${COLOR_DATABASE[c].label} (x${val/1000}k)` : `${COLOR_DATABASE[c].label} (x${val})`;
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
                    <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Target Resistance</label>
                    <div className="flex gap-1">
                      <Input
                        type="number"
                        value={targetResistance}
                        onChange={(e) => setTargetResistance(e.target.value)}
                        className="font-mono flex-1 rounded-r-none border-r-0"
                      />
                      <select
                        value={targetResistanceUnit}
                        onChange={(e) => setTargetResistanceUnit(e.target.value as any)}
                        className="px-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-lg rounded-l-none text-xs outline-none"
                      >
                        {["mΩ", "Ω", "kΩ", "MΩ", "GΩ"].map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Target Tolerance</label>
                    <select
                      value={targetTolerance}
                      onChange={(e) => setTargetTolerance(e.target.value)}
                      className="w-full h-9 px-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="0.01">±0.01% (Gray)</option>
                      <option value="0.02">±0.02% (Yellow)</option>
                      <option value="0.05">±0.05% (Orange)</option>
                      <option value="0.1">±0.1% (Violet)</option>
                      <option value="0.25">±0.25% (Blue)</option>
                      <option value="0.5">±0.5% (Green)</option>
                      <option value="1">±1% (Brown)</option>
                      <option value="2">±2% (Red)</option>
                      <option value="5">±5% (Gold)</option>
                      <option value="10">±10% (Silver)</option>
                      <option value="20">±20% (None)</option>
                    </select>
                  </div>

                  {bandCount === 6 && (
                    <div>
                      <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">TCR coefficient (ppm/K)</label>
                      <select
                        value={targetTempCoeff}
                        onChange={(e) => setTargetTempCoeff(e.target.value)}
                        className="w-full h-9 px-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="250">250 ppm/K (Black)</option>
                        <option value="100">100 ppm/K (Brown)</option>
                        <option value="50">50 ppm/K (Red)</option>
                        <option value="15">15 ppm/K (Orange)</option>
                        <option value="25">25 ppm/K (Yellow)</option>
                        <option value="20">20 ppm/K (Green)</option>
                        <option value="10">10 ppm/K (Blue)</option>
                        <option value="5">5 ppm/K (Violet)</option>
                        <option value="1">1 ppm/K (Gray)</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SERIES & PARALLEL NETWORKS */}
          {activeTab === "series_parallel" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2 flex items-center justify-between">
                <span>Network Configuration</span>
                <button
                  onClick={handleReset}
                  className="text-[10px] text-zinc-400 hover:text-blue-500 font-semibold"
                >
                  Clear Fields
                </button>
              </h3>

              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5 block">Connection Method</label>
                <div className="flex gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setParallelMode(false)}
                    className={`flex-1 py-1.5 border rounded-lg font-bold transition-all ${
                      !parallelMode
                        ? "border-blue-600 text-blue-600 bg-blue-50/50"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                    }`}
                  >
                    Series Connection
                  </button>
                  <button
                    type="button"
                    onClick={() => setParallelMode(true)}
                    className={`flex-1 py-1.5 border rounded-lg font-bold transition-all ${
                      parallelMode
                        ? "border-blue-600 text-blue-600 bg-blue-50/50"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                    }`}
                  >
                    Parallel Connection
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">
                  Resistor Values (comma separated)
                </label>
                <textarea
                  value={resistorValuesString}
                  onChange={(e) => setResistorValuesString(e.target.value)}
                  placeholder="e.g. 100, 220, 4.7k, 1M, 2.2k@1"
                  rows={3}
                  className="w-full p-2.5 text-xs font-mono border border-zinc-200 dark:border-zinc-800 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-zinc-900"
                />
                <span className="text-[10px] text-zinc-400 mt-1 block">
                  Add custom tolerance via &apos;@&apos;, e.g. `2.2k@1` specifies 2.2 kΩ with ±1% tolerance.
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">
                  Supply Voltage (V) — Optional
                </label>
                <Input
                  type="number"
                  value={supplyVoltage}
                  onChange={(e) => setSupplyVoltage(e.target.value)}
                  placeholder="e.g. 12"
                  className="font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 3: CONDUCTOR RESISTANCE */}
          {activeTab === "conductor" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2 flex items-center justify-between">
                <span>Conductor physical properties</span>
                <button
                  onClick={handleReset}
                  className="text-[10px] text-zinc-400 hover:text-blue-500 font-semibold"
                >
                  Reset Defaults
                </button>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Material Presets */}
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Conductor Material</label>
                  <select
                    value={conductorMaterial}
                    onChange={(e) => setConductorMaterial(e.target.value)}
                    className="w-full h-9 px-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="copper">Copper (ρ_20 = 1.72e-8)</option>
                    <option value="aluminum">Aluminum (ρ_20 = 2.82e-8)</option>
                    <option value="silver">Silver (ρ_20 = 1.59e-8)</option>
                    <option value="gold">Gold (ρ_20 = 2.44e-8)</option>
                    <option value="iron">Iron (ρ_20 = 1.0e-7)</option>
                    <option value="carbon">Carbon (ρ_20 = 3.5e-5)</option>
                  </select>
                </div>

                {/* Length */}
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Conductor Length</label>
                  <div className="flex gap-1">
                    <Input
                      type="number"
                      value={conductorLength}
                      onChange={(e) => setConductorLength(e.target.value)}
                      className="font-mono flex-1 rounded-r-none border-r-0 text-xs"
                    />
                    <select
                      value={conductorLengthUnit}
                      onChange={(e) => setConductorLengthUnit(e.target.value as any)}
                      className="px-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-lg rounded-l-none text-xs outline-none"
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
                    {["diameter", "area"].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setConductorSizeInputType(type as any)}
                        className={`flex-1 py-1.5 border rounded-lg font-bold transition-all capitalize ${
                          conductorSizeInputType === type
                            ? "border-blue-600 text-blue-600 bg-blue-50/50"
                            : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Diameter or Area inputs */}
                {conductorSizeInputType === "diameter" ? (
                  <div>
                    <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Wire Diameter</label>
                    <div className="flex gap-1">
                      <Input
                        type="number"
                        value={conductorDiameter}
                        onChange={(e) => setConductorDiameter(e.target.value)}
                        className="font-mono flex-1 rounded-r-none border-r-0 text-xs"
                      />
                      <select
                        value={conductorDiameterUnit}
                        onChange={(e) => setConductorDiameterUnit(e.target.value as any)}
                        className="px-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-lg rounded-l-none text-xs outline-none"
                      >
                        <option value="mm">mm</option>
                        <option value="cm">cm</option>
                        <option value="in">inches (in)</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Cross-sectional Area</label>
                    <div className="flex gap-1">
                      <Input
                        type="number"
                        value={conductorArea}
                        onChange={(e) => setConductorArea(e.target.value)}
                        className="font-mono flex-1 rounded-r-none border-r-0 text-xs"
                      />
                      <select
                        value={conductorAreaUnit}
                        onChange={(e) => setConductorAreaUnit(e.target.value as any)}
                        className="px-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-lg rounded-l-none text-xs outline-none"
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
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">
                    Operating Temperature (°C)
                  </label>
                  <Input
                    type="number"
                    value={conductorTemp}
                    onChange={(e) => setConductorTemp(e.target.value)}
                    className="font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SMD RESISTOR DECODER */}
          {activeTab === "smd" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2 flex items-center justify-between">
                <span>SMD Resistor Codes</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Standards: 3-digit, 4-digit, EIA-96</span>
              </h3>

              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">SMD Marking Code</label>
                <Input
                  type="text"
                  value={smdCode}
                  onChange={(e) => setSmdCode(e.target.value)}
                  placeholder="e.g. 103, 4R7, 1002, 01A"
                  className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase"
                />
                <span className="text-[10px] text-zinc-400 mt-1 block">
                  Supports 3-digit codes (e.g. `103`), 4-digit codes (e.g. `1002`), decimal codes (e.g. `4R7`), and EIA-96 codes (e.g. `01A`).
                </span>
              </div>
            </div>
          )}

          {/* TAB 5: E-SERIES FINDER */}
          {activeTab === "finder" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                E-Series Lookup and Resistor Finder
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Target resistance */}
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Target Resistance</label>
                  <div className="flex gap-1">
                    <Input
                      type="number"
                      value={finderTargetResistance}
                      onChange={(e) => setFinderTargetResistance(e.target.value)}
                      className="font-mono flex-1 rounded-r-none border-r-0 text-xs"
                    />
                    <select
                      value={finderTargetUnit}
                      onChange={(e) => setFinderTargetUnit(e.target.value as any)}
                      className="px-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-lg rounded-l-none text-xs outline-none font-bold"
                    >
                      <option value="Ω">Ω</option>
                      <option value="kΩ">kΩ</option>
                      <option value="MΩ">MΩ</option>
                    </select>
                  </div>
                </div>

                {/* E-Series set */}
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Prefered E-Series Standard</label>
                  <select
                    value={finderESeries}
                    onChange={(e) => setFinderESeries(e.target.value as any)}
                    className="w-full h-9 px-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 font-bold"
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
        </div>

        {/* RIGHT COLUMN: STICKY RESULTS PANEL */}
        <div className="lg:col-span-5 space-y-4 sticky top-4">
          {/* DYNAMIC SVG ILLUSTRATION (only when color code is active) */}
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
          <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span>⚡</span> Resistor Suite Outputs
              </span>
              <div className="flex items-center gap-1.5 no-print">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  className="h-7 text-xs gap-1.5 border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-700 text-slate-100 cursor-pointer"
                >
                  {justSaved ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Bookmark className="h-3.5 w-3.5 text-blue-400" />}
                  {justSaved ? "Saved!" : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="h-7 text-xs gap-1.5 border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-700 text-slate-100 cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>

            {validationErrors.length > 0 ? (
              <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-xl text-xs text-red-400 font-semibold space-y-1">
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
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-center">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Calculated Resistance</div>
                    <div className="text-3xl font-mono font-black text-emerald-300 mt-1">
                      {result.formattedValue}
                    </div>
                  </div>
                </div>

                {/* Nominal and tolerance details */}
                {result.minOhms !== undefined && result.maxOhms !== undefined && (
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nominal resistance:</span>
                      <span>{result.resistanceOhms} Ω</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tolerance rate:</span>
                      <span>±{result.tolerancePct}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Minimum resistance:</span>
                      <span>{formatOhms(result.minOhms)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Maximum resistance:</span>
                      <span>{formatOhms(result.maxOhms)}</span>
                    </div>
                  </div>
                )}

                {/* UNIFIED ACTION BAR: Copy, Save, Share, Print */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 no-print">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                    <span>{copied ? "Copied!" : "Copy Result"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {justSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4 text-amber-400" />}
                    <span>{justSaved ? "Saved!" : "Save"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-blue-400" />
                    <span>Share Link</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-purple-400" />
                    <span>Print Report</span>
                  </button>
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
                  className="text-[10px] text-zinc-400 hover:text-red-500 font-semibold"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {savedItems.map((item) => (
                  <div key={item.id} className="p-2 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono">
                    <button
                      onClick={() => {
                        // Restore saved inputs
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
                      className="text-left font-bold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 truncate flex-1"
                    >
                      <div className="text-[10px] text-zinc-400">{item.timestamp}</div>
                      {item.title}
                    </button>
                    <button
                      onClick={() => handleDeleteSaved(item.id)}
                      className="text-zinc-400 hover:text-red-500 p-0.5 ml-2"
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
            <details className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-3 group outline-none">
              <summary className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 cursor-pointer flex items-center justify-between select-none">
                <span>📘 Show Calculation Breakdown</span>
                <span className="text-[10px] font-mono group-open:hidden">Expand +</span>
                <span className="text-[10px] font-mono hidden group-open:inline">Collapse -</span>
              </summary>
              <div className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800 mt-2">
                <pre className="p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-mono text-[11px] text-zinc-800 dark:text-zinc-300 overflow-x-auto leading-normal whitespace-pre-wrap">
                  {result.calculationSteps}
                </pre>
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResistorCalculator;
