"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Zap, 
  Settings, 
  RefreshCw, 
  Copy, 
  Share2, 
  Printer, 
  Save, 
  Trash2, 
  Bookmark, 
  Info, 
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { calculateOhmsLawCalculator, formatVoltage, formatCurrent, formatResistance, formatPower } from "@/app/calculators/ohms-law-calculator/calculator";
import { OhmsLawCalculatorInputs, OhmsLawCalculatorOutputs } from "@/app/calculators/ohms-law-calculator/types";

// Tab Definitions
const TABS = [
  { id: "ohms_law", label: "Ohm's Law Core" },
  { id: "voltage_divider", label: "Voltage Divider" },
  { id: "current_divider", label: "Current Divider" },
  { id: "led_resistor", label: "LED Resistor Limit" }
];

export function OhmsLawCalculator() {
  // Tab State
  const [activeTab, setActiveTab] = useState<string>("ohms_law");

  // Core Ohm's Law states
  const [knownVoltage, setKnownVoltage] = useState(true);
  const [voltage, setVoltage] = useState("12");
  const [voltageUnit, setVoltageUnit] = useState<any>("V");

  const [knownCurrent, setKnownCurrent] = useState(false);
  const [current, setCurrent] = useState("3");
  const [currentUnit, setCurrentUnit] = useState<any>("A");

  const [knownResistance, setKnownResistance] = useState(true);
  const [resistance, setResistance] = useState("4");
  const [resistanceUnit, setResistanceUnit] = useState<any>("Ω");

  const [knownPower, setKnownPower] = useState(false);
  const [power, setPower] = useState("36");
  const [powerUnit, setPowerUnit] = useState<any>("W");

  const [safetyMargin, setSafetyMargin] = useState("1.5");
  const [resistorRating, setResistorRating] = useState("0");

  // Voltage Divider states
  const [dividerVin, setDividerVin] = useState("12");
  const [dividerR1, setDividerR1] = useState("10");
  const [dividerR2, setDividerR2] = useState("5");
  const [dividerRl, setDividerRl] = useState("");

  // Current Divider states
  const [dividerItotal, setDividerItotal] = useState("2");
  const [dividerBranchR1, setDividerBranchR1] = useState("10");
  const [dividerBranchR2, setDividerBranchR2] = useState("10");
  const [dividerBranchR3, setDividerBranchR3] = useState("");

  // LED Resistor states
  const [ledVsource, setLedVsource] = useState("9");
  const [ledVforward, setLedVforward] = useState("2.0");
  const [ledIforward, setLedIforward] = useState("20");

  // Interactive Formula Wheel Focus
  const [wheelFocus, setWheelFocus] = useState<"V" | "I" | "R" | "P">("V");

  // Utility states
  const [copied, setCopied] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [savedItems, setSavedItems] = useState<any[]>([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_ohms_calculations");
      if (stored) setSavedItems(JSON.parse(stored));
    } catch (e) {}
  }, []);

  // Sync inputs from share URL query params on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab && TABS.some(t => t.id === tab)) {
        setActiveTab(tab);
      }
    }
  }, []);

  // Enforce exactly two checkboxes for known inputs on Ohm's Law Core
  const activeKnownCount = useMemo(() => {
    return [knownVoltage, knownCurrent, knownResistance, knownPower].filter(Boolean).length;
  }, [knownVoltage, knownCurrent, knownResistance, knownPower]);

  // Preset configuration setups
  const applyPreset = (presetId: string) => {
    if (presetId === "led") {
      setActiveTab("led_resistor");
      setLedVsource("12");
      setLedVforward("2.1");
      setLedIforward("20");
    } else if (presetId === "divider_10k") {
      setActiveTab("voltage_divider");
      setDividerVin("5");
      setDividerR1("10000");
      setDividerR2("10000");
      setDividerRl("");
    } else if (presetId === "ohms_3phase") {
      setActiveTab("ohms_law");
      setKnownVoltage(true);
      setKnownResistance(true);
      setKnownCurrent(false);
      setKnownPower(false);
      setVoltage("230");
      setVoltageUnit("V");
      setResistance("50");
      setResistanceUnit("Ω");
    }
  };

  // Compile inputs for calculator
  const currentInputs: OhmsLawCalculatorInputs = useMemo(() => {
    return {
      activeTab,
      voltage: parseFloat(voltage) || 0,
      voltageUnit,
      current: parseFloat(current) || 0,
      currentUnit,
      resistance: parseFloat(resistance) || 0,
      resistanceUnit,
      power: parseFloat(power) || 0,
      powerUnit,
      knownVoltage,
      knownCurrent,
      knownResistance,
      knownPower,
      safetyMargin: parseFloat(safetyMargin) || 1.5,
      resistorRating: parseFloat(resistorRating) || 0,
      dividerVin: parseFloat(dividerVin) || 0,
      dividerR1: parseFloat(dividerR1) || 0,
      dividerR2: parseFloat(dividerR2) || 0,
      dividerRl: parseFloat(dividerRl) || 0,
      dividerItotal: parseFloat(dividerItotal) || 0,
      dividerBranchR1: parseFloat(dividerBranchR1) || 0,
      dividerBranchR2: parseFloat(dividerBranchR2) || 0,
      dividerBranchR3: parseFloat(dividerBranchR3) || 0,
      ledVsource: parseFloat(ledVsource) || 0,
      ledVforward: parseFloat(ledVforward) || 0,
      ledIforward: parseFloat(ledIforward) || 0
    };
  }, [
    activeTab, voltage, voltageUnit, current, currentUnit, resistance, resistanceUnit, power, powerUnit,
    knownVoltage, knownCurrent, knownResistance, knownPower, safetyMargin, resistorRating,
    dividerVin, dividerR1, dividerR2, dividerRl, dividerItotal, dividerBranchR1, dividerBranchR2, dividerBranchR3,
    ledVsource, ledVforward, ledIforward
  ]);

  // Validation
  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    if (activeTab === "ohms_law") {
      if (activeKnownCount < 2) {
        errors.push("Please check at least two 'Known' boxes to solve the circuit.");
      }
      if (knownVoltage && (isNaN(parseFloat(voltage)) || parseFloat(voltage) < 0)) {
        errors.push("Voltage must be a non-negative number.");
      }
      if (knownCurrent && (isNaN(parseFloat(current)) || parseFloat(current) < 0)) {
        errors.push("Current must be a non-negative number.");
      }
      if (knownResistance && (isNaN(parseFloat(resistance)) || parseFloat(resistance) <= 0)) {
        errors.push("Resistance must be strictly greater than 0 Ω.");
      }
      if (knownPower && (isNaN(parseFloat(power)) || parseFloat(power) < 0)) {
        errors.push("Power must be a non-negative number.");
      }
    } else if (activeTab === "voltage_divider") {
      if (parseFloat(dividerR1) <= 0 || parseFloat(dividerR2) <= 0) {
        errors.push("Resistors R1 and R2 must be greater than 0 Ω.");
      }
    } else if (activeTab === "current_divider") {
      if (parseFloat(dividerBranchR1) <= 0 || parseFloat(dividerBranchR2) <= 0) {
        errors.push("Branch Resistors R1 and R2 must be greater than 0 Ω.");
      }
    } else if (activeTab === "led_resistor") {
      const vs = parseFloat(ledVsource);
      const vf = parseFloat(ledVforward);
      if (vs <= vf) {
        errors.push("Source Voltage must be greater than the LED Forward Voltage.");
      }
      if (parseFloat(ledIforward) <= 0) {
        errors.push("LED Forward Current must be greater than 0 mA.");
      }
    }
    return errors;
  }, [
    activeTab, activeKnownCount, knownVoltage, voltage, knownCurrent, current,
    knownResistance, resistance, knownPower, power, dividerR1, dividerR2,
    dividerBranchR1, dividerBranchR2, ledVsource, ledVforward, ledIforward
  ]);

  // Run calculation
  const result: OhmsLawCalculatorOutputs | null = useMemo(() => {
    if (validationErrors.length > 0) return null;
    try {
      return calculateOhmsLawCalculator(currentInputs);
    } catch (e) {
      return null;
    }
  }, [currentInputs, validationErrors]);

  // If calculation was successful, update the read-only states in Ohm's Law Core
  useEffect(() => {
    if (activeTab === "ohms_law" && result && !result.error) {
      if (!knownVoltage) setVoltage((result.voltage).toString());
      if (!knownCurrent) setCurrent((result.current).toString());
      if (!knownResistance) setResistance((result.resistance).toString());
      if (!knownPower) setPower((result.power).toString());
    }
  }, [result, activeTab, knownVoltage, knownCurrent, knownResistance, knownPower]);

  // Save calculation to local storage
  const handleSave = () => {
    if (!result) return;
    let label = "";
    if (activeTab === "ohms_law") {
      label = `Ohm's Law: ${result.formattedVoltage} | ${result.formattedCurrent} | ${result.formattedResistance}`;
    } else if (activeTab === "voltage_divider") {
      label = `Voltage Divider: Vout = ${result.formattedVoltage} (Vin = ${dividerVin}V)`;
    } else if (activeTab === "current_divider") {
      label = `Current Divider: parallel R_eq = ${result.formattedResistance}`;
    } else if (activeTab === "led_resistor") {
      label = `LED Limit Resistor: E24 standard = ${result.ledResistance} Ω`;
    }

    const newItem = {
      id: Date.now().toString(),
      tab: activeTab,
      title: label,
      value: result.formattedVoltage || result.formattedResistance,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      inputs: { ...currentInputs }
    };

    const updated = [newItem, ...savedItems.filter(i => i.title !== label)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_ohms_calculations", JSON.stringify(updated));
    } catch (e) {}
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  // Delete saved calculation
  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(i => i.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_ohms_calculations", JSON.stringify(updated));
    } catch (e) {}
  };

  // Reset function
  const handleReset = () => {
    setVoltage("12");
    setVoltageUnit("V");
    setCurrent("3");
    setCurrentUnit("A");
    setResistance("4");
    setResistanceUnit("Ω");
    setPower("36");
    setPowerUnit("W");
    setKnownVoltage(true);
    setKnownCurrent(false);
    setKnownResistance(true);
    setKnownPower(false);
    setResistorRating("0");
    setDividerVin("12");
    setDividerR1("10");
    setDividerR2("5");
    setDividerRl("");
    setDividerItotal("2");
    setDividerBranchR1("10");
    setDividerBranchR2("10");
    setDividerBranchR3("");
    setLedVsource("9");
    setLedVforward("2.0");
    setLedIforward("20");
  };

  // Copy details to clipboard
  const handleCopy = () => {
    if (!result) return;
    let summaryText = `Ohm's Law Calculation Summary\n` +
      `---------------------------------\n` +
      `Calculator Mode: ${TABS.find(t => t.id === activeTab)?.label}\n`;

    if (activeTab === "ohms_law") {
      summaryText += `Voltage: ${result.formattedVoltage}\n` +
        `Current: ${result.formattedCurrent}\n` +
        `Resistance: ${result.formattedResistance}\n` +
        `Power: ${result.formattedPower}\n`;
    } else {
      summaryText += `Equivalent Output: ${result.formattedVoltage || result.formattedResistance}\n`;
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
    const url = `${window.location.origin}${window.location.pathname}?tab=${activeTab}`;
    if (navigator.share) {
      navigator.share({
        title: "Ohm's Law Calculator Results",
        text: `Calculated circuit output: ${result.formattedVoltage || result.formattedResistance}. Check it out here:`,
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

  // SVG Formula Wheel Segment Rendering Helper
  const getFormulaWheelData = (variable: "V" | "I" | "R" | "P") => {
    const list: Record<string, string[]> = {
      V: ["V = I × R", "V = P / I", "V = √(P × R)"],
      I: ["I = V / R", "I = P / V", "I = √(P / R)"],
      R: ["R = V / I", "R = V² / P", "R = P / I²"],
      P: ["P = V × I", "P = V² / R", "P = I² × R"]
    };
    return list[variable];
  };

  return (
    <div className="space-y-6">
      {/* TABS CONTROL BAR */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 scrollbar-none text-xs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-black whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PRESETS BAR */}
      <div className="flex flex-wrap items-center gap-2 p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-300 dark:border-zinc-700 shadow-sm">
        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider pl-1 mr-1 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" /> Presets:
        </span>
        {[
          { id: "led", name: "Red LED Indicator (12V Supply)" },
          { id: "divider_10k", name: "Voltage Divider (10k / 10k)" },
          { id: "ohms_3phase", name: "230V Heater Load (50Ω)" }
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
          
          {/* TAB 1: OHM'S LAW CORE SUITE */}
          {activeTab === "ohms_law" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-600" />
                  <span>Configure Parameters (Select any 2 knowns)</span>
                </h3>
                <button
                  onClick={handleReset}
                  className="text-[10px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="space-y-3.5">
                {/* Voltage Input Card */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="knownV"
                      checked={knownVoltage}
                      onChange={(e) => setKnownVoltage(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-zinc-300 rounded-sm focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="knownV" className="text-xs font-black text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      Voltage (V)
                    </label>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider ${knownVoltage ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>
                      {knownVoltage ? "Given" : "Calculated"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="number"
                      value={voltage}
                      disabled={!knownVoltage}
                      onChange={(e) => setVoltage(e.target.value)}
                      className="w-32 h-8 font-mono text-xs font-bold"
                    />
                    <select
                      value={voltageUnit}
                      onChange={(e) => setVoltageUnit(e.target.value as any)}
                      className="h-8 px-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {["μV", "mV", "V", "kV", "MV"].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>

                {/* Current Input Card */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="knownI"
                      checked={knownCurrent}
                      onChange={(e) => setKnownCurrent(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-zinc-300 rounded-sm focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="knownI" className="text-xs font-black text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      Current (I)
                    </label>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider ${knownCurrent ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>
                      {knownCurrent ? "Given" : "Calculated"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="number"
                      value={current}
                      disabled={!knownCurrent}
                      onChange={(e) => setCurrent(e.target.value)}
                      className="w-32 h-8 font-mono text-xs font-bold"
                    />
                    <select
                      value={currentUnit}
                      onChange={(e) => setCurrentUnit(e.target.value as any)}
                      className="h-8 px-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {["nA", "μA", "mA", "A", "kA"].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>

                {/* Resistance Input Card */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="knownR"
                      checked={knownResistance}
                      onChange={(e) => setKnownResistance(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-zinc-300 rounded-sm focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="knownR" className="text-xs font-black text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      Resistance (R)
                    </label>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider ${knownResistance ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>
                      {knownResistance ? "Given" : "Calculated"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="number"
                      value={resistance}
                      disabled={!knownResistance}
                      onChange={(e) => setResistance(e.target.value)}
                      className="w-32 h-8 font-mono text-xs font-bold"
                    />
                    <select
                      value={resistanceUnit}
                      onChange={(e) => setResistanceUnit(e.target.value as any)}
                      className="h-8 px-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {["μΩ", "mΩ", "Ω", "kΩ", "MΩ", "GΩ"].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>

                {/* Power Input Card */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="knownP"
                      checked={knownPower}
                      onChange={(e) => setKnownPower(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-zinc-300 rounded-sm focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="knownP" className="text-xs font-black text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      Power (P)
                    </label>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider ${knownPower ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>
                      {knownPower ? "Given" : "Calculated"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="number"
                      value={power}
                      disabled={!knownPower}
                      onChange={(e) => setPower(e.target.value)}
                      className="w-32 h-8 font-mono text-xs font-bold"
                    />
                    <select
                      value={powerUnit}
                      onChange={(e) => setPowerUnit(e.target.value as any)}
                      className="h-8 px-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {["μW", "mW", "W", "kW", "MW"].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Resistor Wattage Rating Input */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1">
                    Verify Resistor Power Rating (Watts)
                  </label>
                  <Input
                    type="number"
                    value={resistorRating}
                    placeholder="e.g. 0.25, 0.5, 1"
                    onChange={(e) => setResistorRating(e.target.value)}
                    className="h-8 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1">
                    Wattage Safety Margin Factor
                  </label>
                  <select
                    value={safetyMargin}
                    onChange={(e) => setSafetyMargin(e.target.value)}
                    className="w-full h-8 px-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-xs outline-none"
                  >
                    <option value="1.0">No Margin (1.0x)</option>
                    <option value="1.5">Recommended (1.5x)</option>
                    <option value="2.0">Conservative (2.0x)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VOLTAGE DIVIDER */}
          {activeTab === "voltage_divider" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <Settings className="w-4 h-4 text-blue-600" />
                <span>Voltage Divider Inputs</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Input Voltage Vin (Volts)</label>
                  <Input type="number" value={dividerVin} onChange={(e) => setDividerVin(e.target.value)} className="font-mono text-xs font-bold" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Resistor R1 (Ohms)</label>
                  <Input type="number" value={dividerR1} onChange={(e) => setDividerR1(e.target.value)} className="font-mono text-xs font-bold" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Resistor R2 (Ohms)</label>
                  <Input type="number" value={dividerR2} onChange={(e) => setDividerR2(e.target.value)} className="font-mono text-xs font-bold" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Load Resistor R_L (Ohms, Optional)</label>
                  <Input type="number" placeholder="Open Circuit" value={dividerRl} onChange={(e) => setDividerRl(e.target.value)} className="font-mono text-xs" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CURRENT DIVIDER */}
          {activeTab === "current_divider" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <Settings className="w-4 h-4 text-blue-600" />
                <span>Current Divider Inputs (Parallel Branches)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Total Current Itotal (Amperes)</label>
                  <Input type="number" value={dividerItotal} onChange={(e) => setDividerItotal(e.target.value)} className="font-mono text-xs font-bold" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Branch 1 Resistor R1 (Ohms)</label>
                  <Input type="number" value={dividerBranchR1} onChange={(e) => setDividerBranchR1(e.target.value)} className="font-mono text-xs font-bold" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Branch 2 Resistor R2 (Ohms)</label>
                  <Input type="number" value={dividerBranchR2} onChange={(e) => setDividerBranchR2(e.target.value)} className="font-mono text-xs font-bold" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Branch 3 Resistor R3 (Ohms, Optional)</label>
                  <Input type="number" placeholder="None" value={dividerBranchR3} onChange={(e) => setDividerBranchR3(e.target.value)} className="font-mono text-xs" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LED RESISTOR */}
          {activeTab === "led_resistor" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <Settings className="w-4 h-4 text-blue-600" />
                <span>LED Current Limiter Inputs</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Supply Voltage (V)</label>
                  <Input type="number" value={ledVsource} onChange={(e) => setLedVsource(e.target.value)} className="font-mono text-xs font-bold" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">LED Forward Voltage (V)</label>
                  <Input type="number" value={ledVforward} onChange={(e) => setLedVforward(e.target.value)} className="font-mono text-xs font-bold" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Desired Current (mA)</label>
                  <Input type="number" value={ledIforward} onChange={(e) => setLedIforward(e.target.value)} className="font-mono text-xs font-bold" />
                </div>
              </div>
            </div>
          )}

          {/* ERROR DISPLAY CARD */}
          {validationErrors.length > 0 && (
            <div className="p-3 border border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 rounded-xl space-y-1">
              {validationErrors.map((err, index) => (
                <p key={index} className="text-[11px] font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> {err}
                </p>
              ))}
            </div>
          )}

          {/* RESULT CARD & DISSIPATION SAFETY CARDS */}
          {result && !result.error && (
            <div className="space-y-4">
              {/* Primary Results */}
              <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-750 dark:to-indigo-850 rounded-2xl text-white shadow-lg space-y-3">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">Calculation Results</span>
                  <span className="text-xs font-black">{TABS.find(t => t.id === activeTab)?.label}</span>
                </div>
                
                {activeTab === "ohms_law" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">VOLTAGE</span>
                      <span className="text-lg font-black">{result.formattedVoltage}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">CURRENT</span>
                      <span className="text-lg font-black">{result.formattedCurrent}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">RESISTANCE</span>
                      <span className="text-lg font-black">{result.formattedResistance}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">POWER</span>
                      <span className="text-lg font-black">{result.formattedPower}</span>
                    </div>
                  </div>
                ) : activeTab === "voltage_divider" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">Vout (Voltage Output)</span>
                      <span className="text-lg font-black">{result.formattedVoltage}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">Divider Current</span>
                      <span className="text-lg font-black">{result.formattedCurrent}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">Power dissipation R1</span>
                      <span className="text-base font-black">{(result.dividerR1Power || 0).toFixed(3)} W</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">Power dissipation R2</span>
                      <span className="text-base font-black">{(result.dividerR2Power || 0).toFixed(3)} W</span>
                    </div>
                  </div>
                ) : activeTab === "current_divider" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">Equivalent Resistance R_eq</span>
                      <span className="text-lg font-black">{result.formattedResistance}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">Parallel Voltage Drop</span>
                      <span className="text-lg font-black">{result.formattedVoltage}</span>
                    </div>
                    <div className="space-y-0.5 col-span-2 border-t border-white/20 pt-2 space-y-1">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Branch Currents:</span>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>I1 = {(result.branch1Current || 0).toFixed(3)} A</div>
                        <div>I2 = {(result.branch2Current || 0).toFixed(3)} A</div>
                        {result.branch3Current !== undefined && <div>I3 = {result.branch3Current.toFixed(3)} A</div>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">Target Resistance</span>
                      <span className="text-lg font-black">{(result.resistance).toFixed(2)} Ω</span>
                    </div>
                    <div className="space-y-0.5 font-bold">
                      <span className="text-[10px] text-blue-100 font-bold block">Standard Resistor (E24)</span>
                      <span className="text-lg font-black text-amber-200">{result.ledResistance} Ω</span>
                    </div>
                    <div className="space-y-0.5 col-span-2">
                      <span className="text-[10px] text-blue-100 font-bold block">Resistor Power Dissipation</span>
                      <span className="text-base font-black">{(result.ledPower || 0).toFixed(3)} W</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Inconsistency warnings */}
              {result.consistency === "inconsistent" && (
                <div className="p-3.5 border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20 rounded-xl space-y-1 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs font-black text-red-700 dark:text-red-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>⚠️ Warning: Inputs disagree with Ohm&apos;s Law</span>
                  </div>
                  <pre className="text-[10px] font-mono whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 pl-5 leading-normal">
                    {result.inconsistencyMessage}
                  </pre>
                </div>
              )}

              {/* Power Safety advice */}
              {result.powerSafetyMessage && (
                <div className={`p-3.5 border rounded-xl space-y-1 shadow-xs ${
                  result.isOverloaded 
                    ? "border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400"
                    : "border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400"
                }`}>
                  <div className="flex items-center gap-1.5 text-xs font-black">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Resistor Rating Verification</span>
                  </div>
                  <p className="text-[11px] font-bold pl-5 leading-normal">
                    {result.powerSafetyMessage}
                  </p>
                </div>
              )}

              {/* STEP BY STEP BREAKDOWN */}
              {result.calculationSteps && (
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                  <span className="text-[11px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider block mb-2">
                    Step-by-Step Calculation Formula
                  </span>
                  <pre className="text-[11px] font-mono text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {result.calculationSteps}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* ACTION BUTTONS BAR */}
          {/* UNIFIED ACTION BAR: Copy, Save, Share, Print */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 no-print">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!result || !!result.error}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />}
              <span>{copied ? "Copied!" : "Copy Result"}</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!result || !!result.error}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
            >
              {justSaved ? <Check className="w-4 h-4 text-emerald-500" /> : <Bookmark className="w-4 h-4 text-amber-500" />}
              <span>{justSaved ? "Saved!" : "Save"}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              disabled={!result || !!result.error}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
            >
              <Share2 className="w-4 h-4 text-blue-500" />
              <span>Share Link</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-purple-500" />
              <span>Print Report</span>
            </button>
          </div>

          {/* HISTORY BOOKMARKS LIST */}
          {savedItems.length > 0 && (
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-300 dark:border-zinc-800 rounded-2xl space-y-3">
              <span className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-blue-600" /> Saved Calculations History ({savedItems.length})
              </span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {savedItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-mono shadow-xs">
                    <span className="truncate pr-4 text-zinc-700 dark:text-zinc-300 font-bold">{item.title}</span>
                    <button
                      onClick={() => handleDeleteSaved(item.id)}
                      className="text-zinc-400 hover:text-red-500 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: INTERACTIVE FORMULA WHEEL */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4 flex flex-col items-center">
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
              <Lightbulb className="w-4 h-4 text-amber-500" /> Interactive Formula Wheel
            </h3>
            
            {/* SVG Formula Wheel representation */}
            <svg viewBox="0 0 200 200" className="w-56 h-56 transition-transform select-none">
              {/* Outer boundary circle */}
              <circle cx="100" cy="100" r="95" className="fill-none stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="2" />
              
              {/* Quad segment P (Power, Top-Left) */}
              <path
                d="M 100,100 L 100,10 A 90,90 0 0,0 10,100 Z"
                onClick={() => setWheelFocus("P")}
                className={`transition-colors duration-150 cursor-pointer ${
                  wheelFocus === "P" 
                    ? "fill-emerald-100/80 dark:fill-emerald-950/40 stroke-emerald-600 stroke-2" 
                    : "fill-zinc-50/50 dark:fill-zinc-900/30 stroke-zinc-200 dark:stroke-zinc-800 hover:fill-zinc-100/50"
                }`}
              />
              {/* Quad segment V (Voltage, Top-Right) */}
              <path
                d="M 100,100 L 190,100 A 90,90 0 0,0 100,10 Z"
                onClick={() => setWheelFocus("V")}
                className={`transition-colors duration-150 cursor-pointer ${
                  wheelFocus === "V" 
                    ? "fill-pink-100/80 dark:fill-pink-950/40 stroke-pink-600 stroke-2" 
                    : "fill-zinc-50/50 dark:fill-zinc-900/30 stroke-zinc-200 dark:stroke-zinc-800 hover:fill-zinc-100/50"
                }`}
              />
              {/* Quad segment I (Current, Bottom-Left) */}
              <path
                d="M 100,100 L 10,100 A 90,90 0 0,0 100,190 Z"
                onClick={() => setWheelFocus("I")}
                className={`transition-colors duration-150 cursor-pointer ${
                  wheelFocus === "I" 
                    ? "fill-amber-100/80 dark:fill-amber-950/40 stroke-amber-600 stroke-2" 
                    : "fill-zinc-50/50 dark:fill-zinc-900/30 stroke-zinc-200 dark:stroke-zinc-800 hover:fill-zinc-100/50"
                }`}
              />
              {/* Quad segment R (Resistance, Bottom-Right) */}
              <path
                d="M 100,100 L 100,190 A 90,90 0 0,0 190,100 Z"
                onClick={() => setWheelFocus("R")}
                className={`transition-colors duration-150 cursor-pointer ${
                  wheelFocus === "R" 
                    ? "fill-indigo-100/80 dark:fill-indigo-950/40 stroke-indigo-600 stroke-2" 
                    : "fill-zinc-50/50 dark:fill-zinc-900/30 stroke-zinc-200 dark:stroke-zinc-800 hover:fill-zinc-100/50"
                }`}
              />

              {/* inner divider axes lines */}
              <line x1="10" y1="100" x2="190" y2="100" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.5" />
              <line x1="100" y1="10" x2="100" y2="190" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.5" />

              {/* center indicator badge */}
              <circle cx="100" cy="100" r="28" className="fill-white dark:fill-zinc-950 stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="2" />
              <text x="100" y="104" textAnchor="middle" className="text-xs font-black fill-zinc-900 dark:fill-white font-sans">WHEEL</text>

              {/* Quadrant Text Labels */}
              <text x="56" y="56" className="text-[13px] font-black fill-emerald-800 dark:fill-emerald-400">P</text>
              <text x="144" y="56" className="text-[13px] font-black fill-pink-800 dark:fill-pink-400">V</text>
              <text x="56" y="152" className="text-[13px] font-black fill-amber-800 dark:fill-amber-400">I</text>
              <text x="144" y="152" className="text-[13px] font-black fill-indigo-800 dark:fill-indigo-400">R</text>
            </svg>

            {/* Selected segment formulas list */}
            <div className="w-full space-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-3 text-center">
              <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block">
                Formulas to calculate <strong className="text-zinc-900 dark:text-zinc-100 font-black">{wheelFocus}</strong>:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {getFormulaWheelData(wheelFocus).map((f, i) => (
                  <div key={i} className="p-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OhmsLawCalculator;
