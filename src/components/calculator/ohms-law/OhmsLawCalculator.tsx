"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Zap, 
  RefreshCw, 
  Copy, 
  FileSpreadsheet, 
  FileText, 
  Code, 
  Printer, 
  Bookmark, 
  RotateCcw, 
  Trash2, 
  Info, 
  AlertTriangle,
  Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  calculateOhmsLawCalculator, 
  formatVoltage, 
  formatCurrent, 
  formatResistance, 
  formatPower 
} from "@/app/calculators/ohms-law-calculator/calculator";
import { OhmsLawCalculatorInputs, OhmsLawCalculatorOutputs } from "@/app/calculators/ohms-law-calculator/types";

// Tab Definitions
const TABS = [
  { id: "ohms_law", label: "Ohm's Law Core" },
  { id: "voltage_divider", label: "Voltage Divider" },
  { id: "current_divider", label: "Current Divider" },
  { id: "led_resistor", label: "LED Resistor Limit" }
];

export interface SavedOhmsRecord {
  id: string;
  tab: string;
  title: string;
  timestamp: string;
  inputs: Record<string, any>;
  outputs: {
    voltage: number;
    current: number;
    resistance: number;
    power: number;
    formattedVoltage: string;
    formattedCurrent: string;
    formattedResistance: string;
    formattedPower: string;
  };
}

export function OhmsLawCalculator() {
  // Tab State
  const [activeTab, setActiveTab] = useState<string>("ohms_law");

  // Core Ohm's Law states
  const [knownVoltage, setKnownVoltage] = useState(true);
  const [voltage, setVoltage] = useState("12");
  const [voltageUnit, setVoltageUnit] = useState<string>("V");

  const [knownCurrent, setKnownCurrent] = useState(false);
  const [current, setCurrent] = useState("3");
  const [currentUnit, setCurrentUnit] = useState<string>("A");

  const [knownResistance, setKnownResistance] = useState(true);
  const [resistance, setResistance] = useState("4");
  const [resistanceUnit, setResistanceUnit] = useState<string>("Ω");

  const [knownPower, setKnownPower] = useState(false);
  const [power, setPower] = useState("36");
  const [powerUnit, setPowerUnit] = useState<string>("W");

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

  // Action/Export feedback states
  const [copiedResult, setCopiedResult] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedLatex, setCopiedLatex] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [savedItems, setSavedItems] = useState<SavedOhmsRecord[]>([]);

  // Load saved calculations from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_ohms_calculations_v2");
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
      setDividerVin("12");
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
      setResistorRating("0");
    }
  };

  // Compile inputs for calculator engine
  const currentInputs: OhmsLawCalculatorInputs = useMemo(() => {
    const parseNumber = (val: string): number | undefined => {
      if (val === undefined || val === null || val.trim() === "") return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    };

    return {
      activeTab,
      voltage: parseNumber(voltage),
      voltageUnit: voltageUnit as any,
      current: parseNumber(current),
      currentUnit: currentUnit as any,
      resistance: parseNumber(resistance),
      resistanceUnit: resistanceUnit as any,
      power: parseNumber(power),
      powerUnit: powerUnit as any,
      knownVoltage,
      knownCurrent,
      knownResistance,
      knownPower,
      safetyMargin: parseNumber(safetyMargin) || 1.5,
      resistorRating: parseNumber(resistorRating) || 0,
      dividerVin: parseNumber(dividerVin),
      dividerR1: parseNumber(dividerR1),
      dividerR2: parseNumber(dividerR2),
      dividerRl: parseNumber(dividerRl),
      dividerItotal: parseNumber(dividerItotal),
      dividerBranchR1: parseNumber(dividerBranchR1),
      dividerBranchR2: parseNumber(dividerBranchR2),
      dividerBranchR3: parseNumber(dividerBranchR3),
      ledVsource: parseNumber(ledVsource),
      ledVforward: parseNumber(ledVforward),
      ledIforward: parseNumber(ledIforward)
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
      if (knownVoltage) {
        const v = parseFloat(voltage);
        if (voltage.trim() === "" || isNaN(v) || v < 0) errors.push("Voltage must be a non-negative number.");
      }
      if (knownCurrent) {
        const i = parseFloat(current);
        if (current.trim() === "" || isNaN(i) || i < 0) errors.push("Current must be a non-negative number.");
      }
      if (knownResistance) {
        const r = parseFloat(resistance);
        if (resistance.trim() === "" || isNaN(r) || r < 0) errors.push("Resistance must be a non-negative number.");
      }
      if (knownPower) {
        const p = parseFloat(power);
        if (power.trim() === "" || isNaN(p) || p < 0) errors.push("Power must be a non-negative number.");
      }
    } else if (activeTab === "voltage_divider") {
      const vin = parseFloat(dividerVin);
      const r1 = parseFloat(dividerR1);
      const r2 = parseFloat(dividerR2);
      if (dividerVin.trim() === "" || isNaN(vin) || vin < 0) errors.push("Input Voltage (Vin) must be non-negative.");
      if (dividerR1.trim() === "" || isNaN(r1) || r1 <= 0) errors.push("Resistor R1 must be strictly greater than 0 Ω.");
      if (dividerR2.trim() === "" || isNaN(r2) || r2 <= 0) errors.push("Resistor R2 must be strictly greater than 0 Ω.");
      if (dividerRl.trim() !== "") {
        const rl = parseFloat(dividerRl);
        if (isNaN(rl) || rl < 0) errors.push("Load resistor RL must be non-negative.");
      }
    } else if (activeTab === "current_divider") {
      const itotal = parseFloat(dividerItotal);
      const r1 = parseFloat(dividerBranchR1);
      const r2 = parseFloat(dividerBranchR2);
      if (dividerItotal.trim() === "" || isNaN(itotal) || itotal < 0) errors.push("Total Current must be non-negative.");
      if (dividerBranchR1.trim() === "" || isNaN(r1) || r1 <= 0) errors.push("Branch Resistor R1 must be strictly greater than 0 Ω.");
      if (dividerBranchR2.trim() === "" || isNaN(r2) || r2 <= 0) errors.push("Branch Resistor R2 must be strictly greater than 0 Ω.");
      if (dividerBranchR3.trim() !== "") {
        const r3 = parseFloat(dividerBranchR3);
        if (isNaN(r3) || r3 <= 0) errors.push("Branch Resistor R3 must be strictly greater than 0 Ω.");
      }
    } else if (activeTab === "led_resistor") {
      const vs = parseFloat(ledVsource);
      const vf = parseFloat(ledVforward);
      const ifwd = parseFloat(ledIforward);
      if (ledVsource.trim() === "" || isNaN(vs) || vs <= 0) errors.push("Supply Voltage must be strictly positive.");
      if (ledVforward.trim() === "" || isNaN(vf) || vf <= 0) errors.push("LED Forward Voltage must be strictly positive.");
      if (!isNaN(vs) && !isNaN(vf) && vs <= vf) errors.push("Supply Voltage must be strictly greater than LED Forward Voltage.");
      if (ledIforward.trim() === "" || isNaN(ifwd) || ifwd <= 0) errors.push("LED Forward Current must be strictly greater than 0 mA.");
    }
    return errors;
  }, [
    activeTab, activeKnownCount, knownVoltage, voltage, knownCurrent, current,
    knownResistance, resistance, knownPower, power, dividerVin, dividerR1, dividerR2, dividerRl,
    dividerItotal, dividerBranchR1, dividerBranchR2, dividerBranchR3, ledVsource, ledVforward, ledIforward
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

  // Update read-only inputs in Ohm's Law Core upon successful calculation
  useEffect(() => {
    if (activeTab === "ohms_law" && result && !result.error) {
      if (!knownVoltage) setVoltage(result.voltage.toString());
      if (!knownCurrent) setCurrent(result.current.toString());
      if (!knownResistance) setResistance(result.resistance.toString());
      if (!knownPower) setPower(result.power.toString());
    }
  }, [result, activeTab, knownVoltage, knownCurrent, knownResistance, knownPower]);

  // Save calculation to local storage
  const handleSave = () => {
    if (!result || result.error) return;
    let label = "";
    if (activeTab === "ohms_law") {
      label = `Ohm's Law: ${result.formattedVoltage} | ${result.formattedCurrent} | ${result.formattedResistance} | ${result.formattedPower}`;
    } else if (activeTab === "voltage_divider") {
      label = `Voltage Divider: Vout = ${result.formattedVoltage} (Vin = ${dividerVin}V)`;
    } else if (activeTab === "current_divider") {
      label = `Current Divider: Req = ${result.formattedResistance} (Itotal = ${dividerItotal}A)`;
    } else if (activeTab === "led_resistor") {
      label = `LED Limiter: E24 = ${result.ledResistance} Ω (${result.formattedPower})`;
    }

    const newItem: SavedOhmsRecord = {
      id: Date.now().toString(),
      tab: activeTab,
      title: label,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      inputs: {
        activeTab,
        voltage,
        voltageUnit,
        current,
        currentUnit,
        resistance,
        resistanceUnit,
        power,
        powerUnit,
        knownVoltage,
        knownCurrent,
        knownResistance,
        knownPower,
        safetyMargin,
        resistorRating,
        dividerVin,
        dividerR1,
        dividerR2,
        dividerRl,
        dividerItotal,
        dividerBranchR1,
        dividerBranchR2,
        dividerBranchR3,
        ledVsource,
        ledVforward,
        ledIforward
      },
      outputs: {
        voltage: result.voltage,
        current: result.current,
        resistance: result.resistance,
        power: result.power,
        formattedVoltage: result.formattedVoltage,
        formattedCurrent: result.formattedCurrent,
        formattedResistance: result.formattedResistance,
        formattedPower: result.formattedPower
      }
    };

    const updated = [newItem, ...savedItems.filter(i => i.title !== label)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_ohms_calculations_v2", JSON.stringify(updated));
    } catch (e) {}
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  // Restore calculation from history
  const handleRestore = (item: SavedOhmsRecord) => {
    const inp = item.inputs;
    setActiveTab(inp.activeTab || item.tab);
    if (inp.activeTab === "ohms_law" || item.tab === "ohms_law") {
      setVoltage(inp.voltage !== undefined ? inp.voltage : "12");
      setVoltageUnit(inp.voltageUnit || "V");
      setCurrent(inp.current !== undefined ? inp.current : "3");
      setCurrentUnit(inp.currentUnit || "A");
      setResistance(inp.resistance !== undefined ? inp.resistance : "4");
      setResistanceUnit(inp.resistanceUnit || "Ω");
      setPower(inp.power !== undefined ? inp.power : "36");
      setPowerUnit(inp.powerUnit || "W");
      setKnownVoltage(inp.knownVoltage ?? true);
      setKnownCurrent(inp.knownCurrent ?? false);
      setKnownResistance(inp.knownResistance ?? true);
      setKnownPower(inp.knownPower ?? false);
      setSafetyMargin(inp.safetyMargin || "1.5");
      setResistorRating(inp.resistorRating || "0");
    } else if (inp.activeTab === "voltage_divider" || item.tab === "voltage_divider") {
      setDividerVin(inp.dividerVin || "12");
      setDividerR1(inp.dividerR1 || "10");
      setDividerR2(inp.dividerR2 || "5");
      setDividerRl(inp.dividerRl || "");
    } else if (inp.activeTab === "current_divider" || item.tab === "current_divider") {
      setDividerItotal(inp.dividerItotal || "2");
      setDividerBranchR1(inp.dividerBranchR1 || "10");
      setDividerBranchR2(inp.dividerBranchR2 || "10");
      setDividerBranchR3(inp.dividerBranchR3 || "");
    } else if (inp.activeTab === "led_resistor" || item.tab === "led_resistor") {
      setLedVsource(inp.ledVsource || "9");
      setLedVforward(inp.ledVforward || "2.0");
      setLedIforward(inp.ledIforward || "20");
    }
  };

  // Delete saved calculation
  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(i => i.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_ohms_calculations_v2", JSON.stringify(updated));
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
    setSafetyMargin("1.5");
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

  // Copy Result
  const handleCopyResult = () => {
    if (!result || result.error) return;
    let text = "";
    if (activeTab === "ohms_law") {
      text = `Voltage: ${result.formattedVoltage}, Current: ${result.formattedCurrent}, Resistance: ${result.formattedResistance}, Power: ${result.formattedPower}`;
    } else if (activeTab === "voltage_divider") {
      text = `Vout: ${result.formattedVoltage}, Divider Current: ${result.formattedCurrent}, PR1: ${(result.dividerR1Power || 0).toFixed(3)} W, PR2: ${(result.dividerR2Power || 0).toFixed(3)} W`;
    } else if (activeTab === "current_divider") {
      text = `Req: ${result.formattedResistance}, Vparallel: ${result.formattedVoltage}, I1: ${(result.branch1Current || 0).toFixed(3)} A, I2: ${(result.branch2Current || 0).toFixed(3)} A`;
      if (result.branch3Current !== undefined) text += `, I3: ${result.branch3Current.toFixed(3)} A`;
    } else {
      text = `Target Resistance: ${result.resistance.toFixed(2)} Ω, Standard Resistor (E24): ${result.ledResistance} Ω, Power: ${(result.ledPower || 0).toFixed(3)} W`;
    }
    navigator.clipboard.writeText(text);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2000);
  };

  // Copy Summary
  const handleCopySummary = () => {
    if (!result || result.error) return;
    const tabName = TABS.find(t => t.id === activeTab)?.label || activeTab;
    let summaryText = `============================================================\n` +
      `OHM'S LAW CALCULATION SUMMARY\n` +
      `============================================================\n` +
      `Mode: ${tabName}\n` +
      `Timestamp: ${new Date().toLocaleString()}\n` +
      `------------------------------------------------------------\n`;

    if (activeTab === "ohms_law") {
      summaryText += `Voltage (V): ${result.formattedVoltage} (${result.voltage} V)\n` +
        `Current (I): ${result.formattedCurrent} (${result.current} A)\n` +
        `Resistance (R): ${result.formattedResistance} (${result.resistance} Ω)\n` +
        `Power (P): ${result.formattedPower} (${result.power} W)\n`;
      if (result.powerSafetyMessage) {
        summaryText += `Resistor Rating Advisory: ${result.powerSafetyMessage}\n`;
      }
    } else if (activeTab === "voltage_divider") {
      summaryText += `Input Voltage (Vin): ${dividerVin} V\n` +
        `Resistor R1: ${dividerR1} Ω\n` +
        `Resistor R2: ${dividerR2} Ω\n` +
        `Load Resistor RL: ${dividerRl ? `${dividerRl} Ω` : "None (Unloaded)"}\n` +
        `Output Voltage (Vout): ${result.formattedVoltage}\n` +
        `Divider Current: ${result.formattedCurrent}\n` +
        `Power Dissipation R1: ${(result.dividerR1Power || 0).toFixed(4)} W\n` +
        `Power Dissipation R2: ${(result.dividerR2Power || 0).toFixed(4)} W\n`;
    } else if (activeTab === "current_divider") {
      summaryText += `Total Current: ${dividerItotal} A\n` +
        `Branch 1 Resistor (R1): ${dividerBranchR1} Ω\n` +
        `Branch 2 Resistor (R2): ${dividerBranchR2} Ω\n` +
        `Branch 3 Resistor (R3): ${dividerBranchR3 ? `${dividerBranchR3} Ω` : "None"}\n` +
        `Equivalent Parallel Resistance (Req): ${result.formattedResistance}\n` +
        `Parallel Voltage Drop: ${result.formattedVoltage}\n` +
        `Branch 1 Current (I1): ${(result.branch1Current || 0).toFixed(4)} A\n` +
        `Branch 2 Current (I2): ${(result.branch2Current || 0).toFixed(4)} A\n`;
      if (result.branch3Current !== undefined) {
        summaryText += `Branch 3 Current (I3): ${result.branch3Current.toFixed(4)} A\n`;
      }
    } else {
      summaryText += `Supply Voltage (Vs): ${ledVsource} V\n` +
        `LED Forward Voltage (Vf): ${ledVforward} V\n` +
        `Desired Forward Current (If): ${ledIforward} mA\n` +
        `Calculated Resistor Drop: ${result.formattedVoltage}\n` +
        `Calculated Target Resistance: ${result.resistance.toFixed(2)} Ω\n` +
        `Selected Standard Resistor (E24): ${result.ledResistance} Ω\n` +
        `Resistor Power Dissipation: ${(result.ledPower || 0).toFixed(4)} W\n`;
    }

    if (result.calculationSteps) {
      summaryText += `------------------------------------------------------------\n` +
        `Calculation Breakdown:\n${result.calculationSteps}\n`;
    }
    summaryText += `============================================================\n`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // CSV Export
  const handleExportCsv = () => {
    if (!result || result.error) return;
    let headers: string[] = [];
    let row: (string | number)[] = [];

    if (activeTab === "ohms_law") {
      headers = [
        "Mode", "Voltage (V)", "Current (A)", "Resistance (Ohm)", "Power (W)",
        "Formatted Voltage", "Formatted Current", "Formatted Resistance", "Formatted Power",
        "Resistor Rating (W)", "Safety Margin", "Timestamp"
      ];
      row = [
        `"Ohm's Law Core"`, result.voltage, result.current, result.resistance, result.power,
        `"${result.formattedVoltage}"`, `"${result.formattedCurrent}"`, `"${result.formattedResistance}"`, `"${result.formattedPower}"`,
        resistorRating, safetyMargin, `"${new Date().toISOString()}"`
      ];
    } else if (activeTab === "voltage_divider") {
      headers = [
        "Mode", "Vin (V)", "R1 (Ohm)", "R2 (Ohm)", "RL (Ohm)", "Vout (V)", "Divider Current (A)",
        "P_R1 (W)", "P_R2 (W)", "Timestamp"
      ];
      row = [
        `"Voltage Divider"`, dividerVin, dividerR1, dividerR2, dividerRl ? dividerRl : `"None"`,
        result.voltage, result.current, (result.dividerR1Power || 0).toFixed(4), (result.dividerR2Power || 0).toFixed(4),
        `"${new Date().toISOString()}"`
      ];
    } else if (activeTab === "current_divider") {
      headers = [
        "Mode", "Total Current (A)", "R1 (Ohm)", "R2 (Ohm)", "R3 (Ohm)", "Req (Ohm)",
        "Parallel Voltage (V)", "I1 (A)", "I2 (A)", "I3 (A)", "Timestamp"
      ];
      row = [
        `"Current Divider"`, dividerItotal, dividerBranchR1, dividerBranchR2, dividerBranchR3 ? dividerBranchR3 : `"None"`,
        result.resistance, result.voltage, (result.branch1Current || 0).toFixed(4), (result.branch2Current || 0).toFixed(4),
        result.branch3Current !== undefined ? result.branch3Current.toFixed(4) : `"None"`,
        `"${new Date().toISOString()}"`
      ];
    } else {
      headers = [
        "Mode", "Supply Voltage (V)", "LED Vf (V)", "Desired Current (mA)", "Resistor Drop (V)",
        "Target Resistance (Ohm)", "Standard E24 Resistor (Ohm)", "Power Dissipation (W)", "Timestamp"
      ];
      row = [
        `"LED Resistor Limit"`, ledVsource, ledVforward, ledIforward, result.voltage,
        result.resistance.toFixed(2), result.ledResistance || "", (result.ledPower || 0).toFixed(4),
        `"${new Date().toISOString()}"`
      ];
    }

    const csvContent = `${headers.join(",")}\n${row.join(",")}\n`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ohms_law_${activeTab}_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // TXT Export
  const handleExportTxt = () => {
    if (!result || result.error) return;
    const tabName = TABS.find(t => t.id === activeTab)?.label || activeTab;
    const textReport = `============================================================\n` +
      `CALCPLATFORM ENGINEERING REPORT: OHM'S LAW & CIRCUIT SUITE\n` +
      `============================================================\n` +
      `Module: ${tabName}\n` +
      `Date/Time: ${new Date().toLocaleString()}\n` +
      `------------------------------------------------------------\n` +
      `SUMMARY OF RESULTS:\n` +
      (activeTab === "ohms_law" 
        ? `Voltage (V)    : ${result.formattedVoltage} (${result.voltage} V)\n` +
          `Current (I)    : ${result.formattedCurrent} (${result.current} A)\n` +
          `Resistance (R) : ${result.formattedResistance} (${result.resistance} Ω)\n` +
          `Power (P)      : ${result.formattedPower} (${result.power} W)\n`
        : activeTab === "voltage_divider"
        ? `Output Voltage (Vout) : ${result.formattedVoltage}\n` +
          `Divider Current       : ${result.formattedCurrent}\n` +
          `Power R1              : ${(result.dividerR1Power || 0).toFixed(4)} W\n` +
          `Power R2              : ${(result.dividerR2Power || 0).toFixed(4)} W\n`
        : activeTab === "current_divider"
        ? `Equivalent R (Req)    : ${result.formattedResistance}\n` +
          `Parallel Voltage      : ${result.formattedVoltage}\n` +
          `Branch 1 Current (I1) : ${(result.branch1Current || 0).toFixed(4)} A\n` +
          `Branch 2 Current (I2) : ${(result.branch2Current || 0).toFixed(4)} A\n` +
          (result.branch3Current !== undefined ? `Branch 3 Current (I3) : ${result.branch3Current.toFixed(4)} A\n` : "")
        : `Target Resistance     : ${result.resistance.toFixed(2)} Ω\n` +
          `Standard Resistor E24 : ${result.ledResistance} Ω\n` +
          `Power Dissipation     : ${(result.ledPower || 0).toFixed(4)} W\n`
      ) +
      `------------------------------------------------------------\n` +
      `MATHEMATICAL DERIVATION & STEPS:\n` +
      `${result.calculationSteps || "Standard algebraic evaluation."}\n` +
      `============================================================\n` +
      `ENGINEERING NOTICE:\n` +
      `Calculations assume linear ohmic conductors and ideal steady-state DC.\n` +
      `Nonlinear components and AC reactance require vector impedance analysis.\n` +
      `============================================================\n`;

    const blob = new Blob([textReport], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ohms_law_report_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // LaTeX Export
  const handleExportLatex = () => {
    if (!result || result.error) return;
    let latex = "";
    if (activeTab === "ohms_law") {
      latex = `% Ohm's Law Core Formulations\n` +
        `\\begin{aligned}\n` +
        `  V &= I \\cdot R = ${result.current}\\,\\text{A} \\times ${result.resistance}\\,\\Omega = ${result.voltage}\\,\\text{V} \\\\[4pt]\n` +
        `  I &= \\frac{V}{R} = \\frac{${result.voltage}\\,\\text{V}}{${result.resistance}\\,\\Omega} = ${result.current}\\,\\text{A} \\\\[4pt]\n` +
        `  P &= V \\cdot I = I^2 R = \\frac{V^2}{R} = ${result.power}\\,\\text{W}\n` +
        `\\end{aligned}`;
    } else if (activeTab === "voltage_divider") {
      latex = `% Voltage Divider Formulation\n` +
        `\\begin{aligned}\n` +
        `  V_{\\text{out}} &= V_{\\text{in}} \\cdot \\frac{R_2}{R_1 + R_2} = ${dividerVin}\\,\\text{V} \\times \\frac{${dividerR2}\\,\\Omega}{${dividerR1}\\,\\Omega + ${dividerR2}\\,\\Omega} = ${result.voltage.toFixed(4)}\\,\\text{V} \\\\[4pt]\n` +
        `  I_{\\text{divider}} &= \\frac{V_{\\text{in}}}{R_1 + R_2} = ${result.current.toFixed(5)}\\,\\text{A}\n` +
        `\\end{aligned}`;
    } else if (activeTab === "current_divider") {
      latex = `% Current Divider Formulation\n` +
        `\\begin{aligned}\n` +
        `  \\frac{1}{R_{\\text{eq}}} &= \\frac{1}{R_1} + \\frac{1}{R_2} \\implies R_{\\text{eq}} = ${result.resistance.toFixed(4)}\\,\\Omega \\\\[4pt]\n` +
        `  V_{\\text{parallel}} &= I_{\\text{total}} \\cdot R_{\\text{eq}} = ${result.voltage.toFixed(4)}\\,\\text{V} \\\\[4pt]\n` +
        `  I_1 &= \\frac{V}{R_1} = ${(result.branch1Current || 0).toFixed(4)}\\,\\text{A}, \\quad I_2 = \\frac{V}{R_2} = ${(result.branch2Current || 0).toFixed(4)}\\,\\text{A}\n` +
        `\\end{aligned}`;
    } else {
      latex = `% LED Current Limiting Resistor\n` +
        `\\begin{aligned}\n` +
        `  V_{\\text{resistor}} &= V_{\\text{source}} - V_{\\text{led}} = ${ledVsource}\\,\\text{V} - ${ledVforward}\\,\\text{V} = ${result.voltage.toFixed(2)}\\,\\text{V} \\\\[4pt]\n` +
        `  R_{\\text{target}} &= \\frac{V_{\\text{resistor}}}{I_{\\text{led}}} = \\frac{${result.voltage.toFixed(2)}\\,\\text{V}}{${result.current.toFixed(4)}\\,\\text{A}} = ${result.resistance.toFixed(2)}\\,\\Omega \\\\[4pt]\n` +
        `  R_{\\text{standard (E24)}} &= ${result.ledResistance}\\,\\Omega, \\quad P_{\\text{dissipation}} = I_{\\text{led}}^2 R = ${(result.ledPower || 0).toFixed(4)}\\,\\text{W}\n` +
        `\\end{aligned}`;
    }
    navigator.clipboard.writeText(latex);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  // Browser print
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
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 scrollbar-none text-xs no-print">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
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
      <div className="flex flex-wrap items-center gap-2 p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200/80 dark:border-zinc-800 no-print">
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
            type="button"
            onClick={() => applyPreset(pr.id)}
            aria-label={`Apply preset: ${pr.name}`}
            className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer shadow-xs"
          >
            {pr.name}
          </button>
        ))}
      </div>

      {/* VALIDATION ALERT */}
      {validationErrors.length > 0 && (
        <div role="alert" className="p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 rounded-xl flex items-start gap-2 text-xs text-red-700 dark:text-red-400">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Please adjust input parameters:</span>
            <ul className="list-disc pl-4 space-y-0.5 font-medium">
              {validationErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: ACTIVE MODULE FORM */}
        <div className="lg:col-span-7 space-y-5 no-print">
          
          {/* TAB 1: OHM'S LAW CORE SUITE */}
          {activeTab === "ohms_law" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span>Configure Parameters (Select any 2 knowns)</span>
                </h2>
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset parameters to defaults"
                  className="text-[10px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Defaults
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
                    <label htmlFor="knownV" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      Voltage (V)
                    </label>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${knownVoltage ? "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300" : "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300"}`}>
                      {knownVoltage ? "Given" : "Calculated"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Input
                      id="ohms-voltage-input"
                      type="number"
                      aria-label="Voltage value"
                      value={voltage}
                      disabled={!knownVoltage}
                      onChange={(e) => setVoltage(e.target.value)}
                      className="w-32 h-8 font-sans tabular-nums text-xs font-semibold"
                    />
                    <select
                      id="ohms-voltage-unit"
                      aria-label="Voltage unit"
                      value={voltageUnit}
                      onChange={(e) => setVoltageUnit(e.target.value)}
                      className="h-8 px-2 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
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
                    <label htmlFor="knownI" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      Current (I)
                    </label>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${knownCurrent ? "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300" : "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300"}`}>
                      {knownCurrent ? "Given" : "Calculated"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Input
                      id="ohms-current-input"
                      type="number"
                      aria-label="Current value"
                      value={current}
                      disabled={!knownCurrent}
                      onChange={(e) => setCurrent(e.target.value)}
                      className="w-32 h-8 font-sans tabular-nums text-xs font-semibold"
                    />
                    <select
                      id="ohms-current-unit"
                      aria-label="Current unit"
                      value={currentUnit}
                      onChange={(e) => setCurrentUnit(e.target.value)}
                      className="h-8 px-2 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
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
                    <label htmlFor="knownR" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      Resistance (R)
                    </label>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${knownResistance ? "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300" : "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300"}`}>
                      {knownResistance ? "Given" : "Calculated"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Input
                      id="ohms-resistance-input"
                      type="number"
                      aria-label="Resistance value"
                      value={resistance}
                      disabled={!knownResistance}
                      onChange={(e) => setResistance(e.target.value)}
                      className="w-32 h-8 font-sans tabular-nums text-xs font-semibold"
                    />
                    <select
                      id="ohms-resistance-unit"
                      aria-label="Resistance unit"
                      value={resistanceUnit}
                      onChange={(e) => setResistanceUnit(e.target.value)}
                      className="h-8 px-2 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
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
                    <label htmlFor="knownP" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      Power (P)
                    </label>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${knownPower ? "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300" : "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300"}`}>
                      {knownPower ? "Given" : "Calculated"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Input
                      id="ohms-power-input"
                      type="number"
                      aria-label="Power value"
                      value={power}
                      disabled={!knownPower}
                      onChange={(e) => setPower(e.target.value)}
                      className="w-32 h-8 font-sans tabular-nums text-xs font-semibold"
                    />
                    <select
                      id="ohms-power-unit"
                      aria-label="Power unit"
                      value={powerUnit}
                      onChange={(e) => setPowerUnit(e.target.value)}
                      className="h-8 px-2 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {["μW", "mW", "W", "kW", "MW"].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Power Rating & Safety Margin verification controls */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="resistor-rating-input" className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                      Verify Resistor Power Rating (Watts)
                    </label>
                    <Input
                      id="resistor-rating-input"
                      type="number"
                      value={resistorRating}
                      onChange={(e) => setResistorRating(e.target.value)}
                      placeholder="e.g. 0.25 for 1/4W"
                      className="h-8 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label htmlFor="resistor-safety-margin-select" className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                      Wattage Safety Margin Factor
                    </label>
                    <select
                      id="resistor-safety-margin-select"
                      value={safetyMargin}
                      onChange={(e) => setSafetyMargin(e.target.value)}
                      className="w-full h-8 px-2 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="1.0">No Margin (1.0x)</option>
                      <option value="1.25">Moderate (1.25x)</option>
                      <option value="1.5">Recommended (1.5x)</option>
                      <option value="2.0">Conservative (2.0x Derate)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VOLTAGE DIVIDER */}
          {activeTab === "voltage_divider" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  Voltage Divider Inputs
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setDividerVin("12");
                    setDividerR1("10");
                    setDividerR2("5");
                    setDividerRl("");
                  }}
                  aria-label="Reset voltage divider inputs"
                  className="text-[10px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="divider-vin-input" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Input Voltage Vin (Volts)
                  </label>
                  <Input
                    id="divider-vin-input"
                    type="number"
                    value={dividerVin}
                    onChange={(e) => setDividerVin(e.target.value)}
                    className="h-8 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label htmlFor="divider-r1-input" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Resistor R1 (Ohms)
                  </label>
                  <Input
                    id="divider-r1-input"
                    type="number"
                    value={dividerR1}
                    onChange={(e) => setDividerR1(e.target.value)}
                    className="h-8 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label htmlFor="divider-r2-input" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Resistor R2 (Ohms)
                  </label>
                  <Input
                    id="divider-r2-input"
                    type="number"
                    value={dividerR2}
                    onChange={(e) => setDividerR2(e.target.value)}
                    className="h-8 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label htmlFor="divider-rl-input" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Load Resistor R_L (Ohms, Optional)
                  </label>
                  <Input
                    id="divider-rl-input"
                    type="number"
                    value={dividerRl}
                    onChange={(e) => setDividerRl(e.target.value)}
                    placeholder="Open Circuit"
                    className="h-8 text-xs font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CURRENT DIVIDER */}
          {activeTab === "current_divider" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  Current Divider Inputs (Parallel Branches)
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setDividerItotal("2");
                    setDividerBranchR1("10");
                    setDividerBranchR2("10");
                    setDividerBranchR3("");
                  }}
                  aria-label="Reset current divider inputs"
                  className="text-[10px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="current-divider-itotal-input" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Total Current Itotal (Amperes)
                  </label>
                  <Input
                    id="current-divider-itotal-input"
                    type="number"
                    value={dividerItotal}
                    onChange={(e) => setDividerItotal(e.target.value)}
                    className="h-8 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label htmlFor="current-divider-r1-input" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Branch 1 Resistor R1 (Ohms)
                  </label>
                  <Input
                    id="current-divider-r1-input"
                    type="number"
                    value={dividerBranchR1}
                    onChange={(e) => setDividerBranchR1(e.target.value)}
                    className="h-8 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label htmlFor="current-divider-r2-input" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Branch 2 Resistor R2 (Ohms)
                  </label>
                  <Input
                    id="current-divider-r2-input"
                    type="number"
                    value={dividerBranchR2}
                    onChange={(e) => setDividerBranchR2(e.target.value)}
                    className="h-8 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label htmlFor="current-divider-r3-input" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Branch 3 Resistor R3 (Ohms, Optional)
                  </label>
                  <Input
                    id="current-divider-r3-input"
                    type="number"
                    value={dividerBranchR3}
                    onChange={(e) => setDividerBranchR3(e.target.value)}
                    placeholder="None"
                    className="h-8 text-xs font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LED RESISTOR LIMITER */}
          {activeTab === "led_resistor" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  LED Current Limiter Inputs
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setLedVsource("9");
                    setLedVforward("2.0");
                    setLedIforward("20");
                  }}
                  aria-label="Reset LED resistor inputs"
                  className="text-[10px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="led-vsource-input" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Supply Voltage (V)
                  </label>
                  <Input
                    id="led-vsource-input"
                    type="number"
                    value={ledVsource}
                    onChange={(e) => setLedVsource(e.target.value)}
                    className="h-8 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label htmlFor="led-vforward-input" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    LED Forward Voltage (V)
                  </label>
                  <Input
                    id="led-vforward-input"
                    type="number"
                    value={ledVforward}
                    onChange={(e) => setLedVforward(e.target.value)}
                    className="h-8 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label htmlFor="led-iforward-input" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Desired Current (mA)
                  </label>
                  <Input
                    id="led-iforward-input"
                    type="number"
                    value={ledIforward}
                    onChange={(e) => setLedIforward(e.target.value)}
                    className="h-8 text-xs font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC RESULTS DISPLAY CARD */}
          {result && !result.error && (
            <div aria-live="polite" className="space-y-4">
              <div className="p-5 bg-linear-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
                    Calculation Results
                  </span>
                  <span className="text-[11px] font-bold bg-white/10 px-2 py-0.5 rounded-full">
                    {TABS.find(t => t.id === activeTab)?.label}
                  </span>
                </div>

                {activeTab === "ohms_law" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Voltage</span>
                      <span className="text-2xl font-extrabold">{result.formattedVoltage}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Current</span>
                      <span className="text-2xl font-extrabold">{result.formattedCurrent}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Resistance</span>
                      <span className="text-2xl font-extrabold">{result.formattedResistance}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Power</span>
                      <span className="text-2xl font-extrabold">{result.formattedPower}</span>
                    </div>
                  </div>
                ) : activeTab === "voltage_divider" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Vout (Voltage Output)</span>
                      <span className="text-2xl font-extrabold">{result.formattedVoltage}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Divider Current</span>
                      <span className="text-2xl font-extrabold">{result.formattedCurrent}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Power Dissipation R1</span>
                      <span className="text-lg font-bold">{(result.dividerR1Power || 0).toFixed(3)} W</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Power Dissipation R2</span>
                      <span className="text-lg font-bold">{(result.dividerR2Power || 0).toFixed(3)} W</span>
                    </div>
                  </div>
                ) : activeTab === "current_divider" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Equivalent Resistance Req</span>
                      <span className="text-2xl font-extrabold">{result.formattedResistance}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Parallel Voltage Drop</span>
                      <span className="text-2xl font-extrabold">{result.formattedVoltage}</span>
                    </div>
                    <div className="space-y-0.5 col-span-2 border-t border-white/20 pt-2 space-y-1">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Branch Currents:</span>
                      <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                        <div>I1 = {(result.branch1Current || 0).toFixed(3)} A</div>
                        <div>I2 = {(result.branch2Current || 0).toFixed(3)} A</div>
                        {result.branch3Current !== undefined && <div>I3 = {result.branch3Current.toFixed(3)} A</div>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Target Resistance</span>
                      <span className="text-2xl font-extrabold">{result.resistance.toFixed(2)} Ω</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Standard Resistor (E24)</span>
                      <span className="text-2xl font-extrabold text-amber-200">{result.ledResistance} Ω</span>
                    </div>
                    <div className="space-y-0.5 col-span-2">
                      <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Resistor Power Dissipation</span>
                      <span className="text-lg font-bold">{(result.ledPower || 0).toFixed(3)} W</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Inconsistency warnings */}
              {result.consistency === "inconsistent" && (
                <div className="p-3.5 border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20 rounded-xl space-y-1 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>⚠️ Warning: Entered values disagree with Ohm&apos;s Law</span>
                  </div>
                  <pre className="text-[10px] font-sans tabular-nums whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 pl-5 leading-normal">
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
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Resistor Rating Verification</span>
                  </div>
                  <p className="text-[11px] font-medium pl-5 leading-normal">
                    {result.powerSafetyMessage}
                  </p>
                </div>
              )}

              {/* STEP BY STEP BREAKDOWN */}
              {result.calculationSteps && (
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                  <span className="text-[11px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider block mb-2">
                    Step-by-Step Calculation Formula
                  </span>
                  <pre className="text-[11px] font-sans tabular-nums text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {result.calculationSteps}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* ACTION BUTTONS BAR: Copy Result, Copy Summary, CSV, TXT, LaTeX, Print, Save */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800 no-print">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyResult}
                disabled={!result || !!result.error}
                aria-label="Copy key calculated result"
                className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40"
              >
                {copiedResult ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                <span>{copiedResult ? "Copied!" : "Copy Result"}</span>
              </button>

              <button
                type="button"
                onClick={handleCopySummary}
                disabled={!result || !!result.error}
                aria-label="Copy full calculation summary"
                className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <FileText className="w-3.5 h-3.5 text-zinc-500" />}
                <span>{copiedSummary ? "Copied!" : "Copy Summary"}</span>
              </button>

              <button
                type="button"
                onClick={handleExportCsv}
                disabled={!result || !!result.error}
                aria-label="Export calculation as CSV"
                className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-zinc-500" />
                <span>CSV</span>
              </button>

              <button
                type="button"
                onClick={handleExportTxt}
                disabled={!result || !!result.error}
                aria-label="Export report as TXT"
                className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40"
              >
                <FileText className="w-3.5 h-3.5 text-zinc-500" />
                <span>TXT</span>
              </button>

              <button
                type="button"
                onClick={handleExportLatex}
                disabled={!result || !!result.error}
                aria-label="Copy LaTeX mathematical formulations"
                className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40"
              >
                {copiedLatex ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Code className="w-3.5 h-3.5 text-zinc-500" />}
                <span>{copiedLatex ? "Copied!" : "LaTeX"}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                aria-label="Print engineering calculation"
                className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-500" />
                <span>Print</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={!result || !!result.error}
                aria-label="Save calculation to history"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs disabled:opacity-40"
              >
                {justSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{justSaved ? "Saved!" : "Save"}</span>
              </button>
            </div>
          </div>

          {/* HISTORY BOOKMARKS LIST WITH TRUE RESTORE */}
          {savedItems.length > 0 && (
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3 no-print">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" /> Saved Calculations History ({savedItems.length})
                </span>
                <span className="text-[10px] text-zinc-400">Click &apos;Restore&apos; to load state</span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {savedItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-sans tabular-nums shadow-xs">
                    <div className="truncate pr-3 space-y-0.5">
                      <span className="truncate text-zinc-800 dark:text-zinc-200 font-bold block">{item.title}</span>
                      <span className="text-[10px] text-zinc-400 block">{item.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleRestore(item)}
                        aria-label={`Restore calculation: ${item.title}`}
                        className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-md text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" /> Restore
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSaved(item.id)}
                        aria-label={`Delete calculation: ${item.title}`}
                        className="text-zinc-400 hover:text-red-500 cursor-pointer p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: INTERACTIVE FORMULA WHEEL */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4 flex flex-col items-center">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
              Interactive Formula Wheel
            </h2>
            
            {/* SVG Formula Wheel representation */}
            <svg 
              viewBox="0 0 200 200" 
              className="w-56 h-56 transition-transform select-none"
              role="region"
              aria-label="Interactive Ohm's Law Formula Wheel"
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
                Formulas to calculate <strong className="text-zinc-900 dark:text-zinc-100 font-bold">{wheelFocus}</strong>:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {getFormulaWheelData(wheelFocus).map((f, i) => (
                  <div key={i} className="p-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-sans tabular-nums font-bold text-zinc-800 dark:text-zinc-200">
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
