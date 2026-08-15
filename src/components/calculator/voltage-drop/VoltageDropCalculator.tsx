"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Copy, Check, Bookmark, Trash2, History, Printer, Share2, Zap, Settings, RefreshCw, Info, HelpCircle } from "lucide-react";
import { calculateVoltageDropCalculator, AWG_CONDUCTORS, METRIC_CONDUCTORS } from "@/app/calculators/voltage-drop-calculator/calculator";
import { VoltageDropCalculatorInputs, VoltageDropCalculatorOutputs } from "@/app/calculators/voltage-drop-calculator/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AWG_SIZES = AWG_CONDUCTORS.map(c => c.size);
const METRIC_SIZES = METRIC_CONDUCTORS.map(c => c.size);

const PRESETS = [
  {
    name: "Residential 120V Branch Run (15A)",
    inputs: { voltage: 120, currentAmps: 15, distance: 75, distanceUnit: "ft", phase: "ac_single", mode: "nec", wireMaterial: "copper", wireType: "awg", wireSize: "14", conduitMaterial: "pvc", powerFactor: 0.95, conductorsPerPhase: 1 }
  },
  {
    name: "EV Charger Run (240V, 40A)",
    inputs: { voltage: 240, currentAmps: 40, distance: 100, distanceUnit: "ft", phase: "ac_single", mode: "nec", wireMaterial: "copper", wireType: "awg", wireSize: "8", conduitMaterial: "pvc", powerFactor: 1.0, conductorsPerPhase: 1 }
  },
  {
    name: "Industrial Motor Feed (480V 3Ø, 150A)",
    inputs: { voltage: 480, currentAmps: 150, distance: 300, distanceUnit: "ft", phase: "ac_three", mode: "nec", wireMaterial: "copper", wireType: "awg", wireSize: "2/0", conduitMaterial: "steel", powerFactor: 0.85, conductorsPerPhase: 1 }
  },
  {
    name: "Solar PV DC Run (24V, 15A)",
    inputs: { voltage: 24, currentAmps: 15, distance: 50, distanceUnit: "ft", phase: "dc", mode: "estimated", wireMaterial: "copper", wireType: "awg", wireSize: "10", conduitMaterial: "pvc", powerFactor: 1.0, conductorsPerPhase: 1 }
  }
];

export function VoltageDropCalculator() {
  // Mode selection: nec (NEC Table 9), estimated (DC/Table 8), custom (custom impedance)
  const [mode, setMode] = useState<"nec" | "estimated" | "custom">("nec");

  // Core Inputs
  const [voltage, setVoltage] = useState("120");
  const [currentAmps, setCurrentAmps] = useState("15");
  const [distance, setDistance] = useState("100");
  const [distanceUnit, setDistanceUnit] = useState<"ft" | "m">("ft");
  const [phase, setPhase] = useState<"dc" | "ac_single" | "ac_three">("ac_single");
  const [wireMaterial, setWireMaterial] = useState<"copper" | "aluminum">("copper");
  const [wireType, setWireType] = useState<"awg" | "metric">("awg");
  const [wireSize, setWireSize] = useState("12");
  const [conduitMaterial, setConduitMaterial] = useState<"pvc" | "steel" | "aluminum">("pvc");
  const [powerFactor, setPowerFactor] = useState("0.85");
  const [conductorsPerPhase, setConductorsPerPhase] = useState("1");
  const [targetDropPct, setTargetDropPct] = useState("3");

  // Custom Mode Inputs
  const [customResistance, setCustomResistance] = useState("1.93");
  const [customReactance, setCustomReactance] = useState("0.054");
  const [customResistanceUnit, setCustomResistanceUnit] = useState<"ft" | "m">("ft");
  const [customReactanceUnit, setCustomReactanceUnit] = useState<"ft" | "m">("ft");

  // Multi-conductor Comparison Selector
  const [compareSizes, setCompareSizes] = useState<string[]>([]);

  // Local/UI states
  const [copied, setCopied] = useState(false);
  const [savedItems, setSavedItems] = useState<Array<{ id: string; title: string; desc: string; drop: string; timestamp: string; inputs: any }>>([]);
  const [justSaved, setJustSaved] = useState(false);

  // Sync wire size defaults when wire type shifts
  useEffect(() => {
    if (wireType === "awg") {
      setWireSize("12");
    } else {
      setWireSize("4");
    }
  }, [wireType]);

  // Load Saved Calculations from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_voltage_drop_calculations");
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  // Validation
  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    const vVal = parseFloat(voltage);
    const iVal = parseFloat(currentAmps);
    const dVal = parseFloat(distance);
    const pfVal = parseFloat(powerFactor);
    const condVal = parseInt(conductorsPerPhase);
    const targetVal = parseFloat(targetDropPct);

    if (isNaN(vVal) || vVal <= 0) errors.push("Supply voltage must be greater than 0.");
    if (isNaN(iVal) || iVal < 0) errors.push("Current cannot be negative.");
    if (isNaN(dVal) || dVal <= 0) errors.push("Distance must be greater than 0.");
    if (phase !== "dc") {
      if (isNaN(pfVal) || pfVal < 0 || pfVal > 1) errors.push("Power factor must be between 0.0 and 1.0.");
    }
    if (isNaN(condVal) || condVal < 1) errors.push("Parallel conductors must be 1 or more.");
    if (isNaN(targetVal) || targetVal <= 0 || targetVal > 100) errors.push("Target drop % must be between 0.1% and 100%.");

    if (mode === "custom") {
      const rVal = parseFloat(customResistance);
      const xVal = parseFloat(customReactance);
      if (isNaN(rVal) || rVal < 0) errors.push("Custom resistance cannot be negative.");
      if (isNaN(xVal) || xVal < 0) errors.push("Custom reactance cannot be negative.");
    }

    return errors;
  }, [voltage, currentAmps, distance, phase, powerFactor, conductorsPerPhase, targetDropPct, mode, customResistance, customReactance]);

  // Apply Preset
  const applyPreset = (preset: typeof PRESETS[0]) => {
    const inputs = preset.inputs;
    setVoltage(String(inputs.voltage));
    setCurrentAmps(String(inputs.currentAmps));
    setDistance(String(inputs.distance));
    setDistanceUnit(inputs.distanceUnit as any);
    setPhase(inputs.phase as any);
    setMode(inputs.mode as any);
    setWireMaterial(inputs.wireMaterial as any);
    setWireType(inputs.wireType as any);
    setWireSize(inputs.wireSize);
    setConduitMaterial(inputs.conduitMaterial as any);
    setPowerFactor(String(inputs.powerFactor));
    setConductorsPerPhase(String(inputs.conductorsPerPhase));
  };

  // Compile calculations inputs
  const currentInputs = useMemo<Record<string, any>>(() => {
    return {
      voltage: parseFloat(voltage) || 120,
      currentAmps: parseFloat(currentAmps) || 15,
      distance: parseFloat(distance) || 100,
      distanceUnit,
      phase,
      mode,
      wireMaterial,
      wireType,
      wireSize,
      conduitMaterial,
      powerFactor: parseFloat(powerFactor) || 0.85,
      conductorsPerPhase: parseInt(conductorsPerPhase) || 1,
      customResistance: parseFloat(customResistance) || 0,
      customReactance: parseFloat(customReactance) || 0,
      customResistanceUnit,
      customReactanceUnit,
      targetDropPct: parseFloat(targetDropPct) || 3
    };
  }, [voltage, currentAmps, distance, distanceUnit, phase, mode, wireMaterial, wireType, wireSize, conduitMaterial, powerFactor, conductorsPerPhase, customResistance, customReactance, customResistanceUnit, customReactanceUnit, targetDropPct]);

  // Run core calculation
  const result: VoltageDropCalculatorOutputs | null = useMemo(() => {
    if (validationErrors.length > 0) return null;
    try {
      return calculateVoltageDropCalculator(currentInputs);
    } catch (e) {
      return null;
    }
  }, [currentInputs, validationErrors]);

  // Status computation
  const statusInfo = useMemo(() => {
    if (!result) return { text: "No Data", color: "text-zinc-500 bg-zinc-100 dark:bg-zinc-800" };
    const pct = result.voltageDropPct;
    const target = parseFloat(targetDropPct) || 3;

    if (pct < 1.5) {
      return { text: "Excellent (Very Low Loss)", color: "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800" };
    } else if (pct <= target) {
      return { text: "Acceptable (Within Target)", color: "text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800" };
    } else {
      return { text: "High Voltage Drop (Consider Upgrading)", color: "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950/40 border border-red-200 dark:border-red-800" };
    }
  }, [result, targetDropPct]);

  // Dynamic recommendations for alternate wire sizes
  const recommendations = useMemo(() => {
    if (!result) return [];
    const sizes = wireType === "awg" ? AWG_SIZES : METRIC_SIZES;
    const currentIndex = sizes.indexOf(wireSize);
    if (currentIndex === -1) return [];

    // Calculate drops for sizes around the current wire size
    const range = [-2, -1, 1, 2, 3];
    const recs = [];

    for (const offset of range) {
      const idx = currentIndex + offset;
      if (idx >= 0 && idx < sizes.length) {
        const altSize = sizes[idx];
        const altInputs = { ...currentInputs, wireSize: altSize };
        try {
          const altRes = calculateVoltageDropCalculator(altInputs);
          recs.push({
            size: altSize,
            voltageDrop: altRes.voltageDrop,
            voltageDropPct: altRes.voltageDropPct,
            endVoltage: altRes.endVoltage,
            isBetter: altRes.voltageDropPct < result.voltageDropPct,
            isCurrent: false
          });
        } catch (e) {}
      }
    }
    return recs.sort((a, b) => b.voltageDropPct - a.voltageDropPct);
  }, [result, currentInputs, wireType, wireSize]);

  // Compare selected list
  const comparisonResults = useMemo(() => {
    if (compareSizes.length === 0) return [];
    return compareSizes.map(sz => {
      try {
        const altRes = calculateVoltageDropCalculator({ ...currentInputs, wireSize: sz });
        return {
          size: sz,
          material: currentInputs.wireMaterial,
          r: altRes.r,
          x: altRes.x,
          drop: altRes.voltageDrop,
          dropPct: altRes.voltageDropPct,
          loadV: altRes.endVoltage
        };
      } catch (e) {
        return null;
      }
    }).filter(Boolean);
  }, [compareSizes, currentInputs]);

  // Save calculation
  const handleSave = () => {
    if (!result) return;
    const desc = `${result.wireSize} ${result.wireMaterial} | ${result.current}A @ ${result.distance}${result.distanceUnit} | ${result.phase}`;
    const newItem = {
      id: Date.now().toString(),
      title: `Voltage Drop: ${result.voltageDropPct}%`,
      desc,
      drop: `${result.voltageDrop} V`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      inputs: { ...currentInputs }
    };

    const updated = [newItem, ...savedItems.filter(i => i.desc !== newItem.desc)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_voltage_drop_calculations", JSON.stringify(updated));
    } catch (e) {}
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  // Delete saved calculation
  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(i => i.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_voltage_drop_calculations", JSON.stringify(updated));
    } catch (e) {}
  };

  // Copy result summary
  const handleCopy = () => {
    if (!result) return;
    const text = `Voltage Drop Calculation Summary\n` +
      `---------------------------------\n` +
      `Supply Voltage: ${result.startingVoltage} V\n` +
      `Current: ${result.current} A\n` +
      `Conductor: ${result.wireSize} ${result.wireMaterial} (${result.conductors} per phase)\n` +
      `Distance: ${result.distance} ${result.distanceUnit}\n` +
      `Phase: ${result.phase}\n` +
      `---------------------------------\n` +
      `Voltage Drop: ${result.voltageDrop} V (${result.voltageDropPct}%)\n` +
      `Voltage at Load: ${result.endVoltage} V\n` +
      `Conductor R: ${result.r} Ω/kft | X: ${result.x} Ω/kft`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share calculation url
  const handleShare = () => {
    if (!result) return;
    const url = `${window.location.origin}${window.location.pathname}?voltage=${voltage}&current=${currentAmps}&distance=${distance}&distanceUnit=${distanceUnit}&phase=${phase}&mode=${mode}&wireMaterial=${wireMaterial}&wireType=${wireType}&wireSize=${wireSize}&conduitMaterial=${conduitMaterial}&powerFactor=${powerFactor}&conductorsPerPhase=${conductorsPerPhase}&target=${targetDropPct}`;
    if (navigator.share) {
      navigator.share({
        title: "Voltage Drop Calculation Results",
        text: `Check out this voltage drop calculation: ${result.voltageDropPct}% loss over ${result.distance} ${result.distanceUnit}.`,
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert("Share URL copied to clipboard!");
    }
  };

  // Print friendly engineering report
  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setVoltage("120");
    setCurrentAmps("15");
    setDistance("100");
    setDistanceUnit("ft");
    setPhase("ac_single");
    setMode("nec");
    setWireMaterial("copper");
    setWireType("awg");
    setWireSize("12");
    setConduitMaterial("pvc");
    setPowerFactor("0.85");
    setConductorsPerPhase("1");
    setCustomResistance("1.93");
    setCustomReactance("0.054");
    setCustomResistanceUnit("ft");
    setCustomReactanceUnit("ft");
    setTargetDropPct("3");
    setCompareSizes([]);
  };

  return (
    <div className="space-y-6">
      {/* TABS MODE SELECTOR */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 scrollbar-none text-xs">
        {[
          { id: "nec", label: "NEC Table 9 Mode" },
          { id: "estimated", label: "Estimated Resistance (DC/Basic)" },
          { id: "custom", label: "Custom Conductor Data" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
              mode === tab.id
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PRESETS BAR */}
      <div className="flex flex-wrap items-center gap-2 p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider pl-1 mr-1 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" /> Presets:
        </span>
        {PRESETS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => applyPreset(preset)}
            className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: INPUT CONTROLS */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2"><span>Electrical Parameters</span>
              </h3>
              <button
                onClick={handleReset}
                className="text-[10px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 font-semibold transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset Defaults
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Supply Voltage */}
              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Supply Voltage (V)</label>
                <Input
                  type="number"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  className="font-sans tabular-nums"
                  placeholder="120"
                />
              </div>

              {/* Load Current */}
              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Load Current (Amps)</label>
                <Input
                  type="number"
                  value={currentAmps}
                  onChange={(e) => setCurrentAmps(e.target.value)}
                  className="font-sans tabular-nums"
                  placeholder="15"
                />
              </div>

              {/* Length */}
              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">One-Way Distance</label>
                <div className="flex gap-1">
                  <Input
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="font-sans tabular-nums rounded-r-none border-r-0 flex-1"
                    placeholder="100"
                  />
                  <select
                    value={distanceUnit}
                    onChange={(e) => setDistanceUnit(e.target.value as any)}
                    className="px-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-lg rounded-l-none text-xs outline-none"
                  >
                    <option value="ft">Feet (ft)</option>
                    <option value="m">Meters (m)</option>
                  </select>
                </div>
              </div>

              {/* Phase */}
              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Circuit Phase</label>
                <select
                  value={phase}
                  onChange={(e) => setPhase(e.target.value as any)}
                  className="w-full h-9 px-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="dc">Direct Current (DC)</option>
                  <option value="ac_single">AC Single-Phase</option>
                  <option value="ac_three">AC Three-Phase</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: CONDUCTOR DETAILS */}
          <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 border-b border-zinc-200 dark:border-zinc-800 pb-2">
              Conductor Configuration
            </h3>

            {mode !== "custom" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Conductor Material */}
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Conductor Material</label>
                  <div className="flex gap-2 text-xs">
                    {["copper", "aluminum"].map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setWireMaterial(m as any)}
                        className={`flex-1 py-1.5 border rounded-lg font-bold transition-all capitalize ${
                          wireMaterial === m
                            ? "border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-950/20"
                            : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conductor Unit Standard */}
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Sizing Standard</label>
                  <div className="flex gap-2 text-xs">
                    {["awg", "metric"].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setWireType(t as any)}
                        className={`flex-1 py-1.5 border rounded-lg font-bold transition-all uppercase ${
                          wireType === t
                            ? "border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-950/20"
                            : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wire Size Selector */}
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">
                    Conductor Size {wireType === "awg" ? "(AWG)" : "(mm²)"}
                  </label>
                  <select
                    value={wireSize}
                    onChange={(e) => setWireSize(e.target.value)}
                    className="w-full h-9 px-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 font-sans tabular-nums font-bold"
                  >
                    {wireType === "awg"
                      ? AWG_SIZES.map(s => <option key={s} value={s}>{s} AWG</option>)
                      : METRIC_SIZES.map(s => <option key={s} value={s}>{s} mm²</option>)
                    }
                  </select>
                </div>

                {/* Conductors per phase */}
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Conductors per Phase</label>
                  <Input
                    type="number"
                    value={conductorsPerPhase}
                    onChange={(e) => setConductorsPerPhase(e.target.value)}
                    className="font-sans tabular-nums"
                    placeholder="1"
                  />
                </div>
              </div>
            ) : (
              // Custom Mode Values Inputs
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Resistance (R)</label>
                  <div className="flex gap-1">
                    <Input
                      type="number"
                      value={customResistance}
                      onChange={(e) => setCustomResistance(e.target.value)}
                      className="font-sans tabular-nums flex-1 rounded-r-none border-r-0"
                    />
                    <select
                      value={customResistanceUnit}
                      onChange={(e) => setCustomResistanceUnit(e.target.value as any)}
                      className="px-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-lg rounded-l-none text-xs outline-none"
                    >
                      <option value="ft">Ω/kft</option>
                      <option value="m">Ω/km</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Reactance (X)</label>
                  <div className="flex gap-1">
                    <Input
                      type="number"
                      value={customReactance}
                      onChange={(e) => setCustomReactance(e.target.value)}
                      className="font-sans tabular-nums flex-1 rounded-r-none border-r-0"
                    />
                    <select
                      value={customReactanceUnit}
                      onChange={(e) => setCustomReactanceUnit(e.target.value as any)}
                      className="px-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-lg rounded-l-none text-xs outline-none"
                    >
                      <option value="ft">Ω/kft</option>
                      <option value="m">Ω/km</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Conductors per Phase</label>
                  <Input
                    type="number"
                    value={conductorsPerPhase}
                    onChange={(e) => setConductorsPerPhase(e.target.value)}
                    className="font-sans tabular-nums"
                  />
                </div>
              </div>
            )}
          </div>

          {/* SECTION 3: ENVIRONMENT PARAMETERS (only when AC is active) */}
          {phase !== "dc" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                Conduit & Power Factor
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Conduit Material */}
                {mode !== "custom" && (
                  <div>
                    <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Conduit Material</label>
                    <select
                      value={conduitMaterial}
                      onChange={(e) => setConduitMaterial(e.target.value as any)}
                      className="w-full h-9 px-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="pvc">PVC Conduit (Nonmetallic)</option>
                      <option value="steel">Steel Conduit (Metallic/Ferrous)</option>
                      <option value="aluminum">Aluminum Conduit (Nonmetallic)</option>
                    </select>
                  </div>
                )}

                {/* Power Factor */}
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Load Power Factor (PF)</label>
                  <Input
                    type="number"
                    value={powerFactor}
                    onChange={(e) => setPowerFactor(e.target.value)}
                    className="font-sans tabular-nums"
                    placeholder="0.85"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: DESIGN GOALS */}
          <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 border-b border-zinc-200 dark:border-zinc-800 pb-2">
              Design Constraints
            </h3>

            <div>
              <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5 block">Target Voltage Drop (%)</label>
              <div className="flex flex-wrap gap-2 text-xs">
                {["1", "2", "3", "5"].map(pct => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setTargetDropPct(pct)}
                    className={`px-3 py-1 border rounded-lg font-sans tabular-nums font-bold transition-all ${
                      targetDropPct === pct
                        ? "border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-950/20"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
                <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-850 px-2 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-500 font-bold">Custom:</span>
                  <input
                    type="number"
                    value={targetDropPct}
                    onChange={(e) => setTargetDropPct(e.target.value)}
                    className="w-12 bg-transparent outline-none text-center font-sans tabular-nums font-bold text-xs"
                  />
                  <span className="text-[10px] text-zinc-500 font-bold">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY RESULTS */}
        <div className="lg:col-span-5 space-y-4 sticky top-4">
          {/* RESULTS CARD */}
          <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span>⚡</span> Electrical Calculation Results
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

            {/* Error notifications */}
            {validationErrors.length > 0 ? (
              <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-xl text-xs text-red-400 font-semibold space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0" /> Please correct the following inputs:
                </div>
                <ul className="list-disc pl-4 space-y-1">
                  {validationErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            ) : result ? (
              <div className="space-y-4">
                {/* Primary numbers */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-semibold">Voltage Drop</div>
                    <div className="text-2xl font-sans tabular-nums font-black text-emerald-300 mt-0.5">
                      {result.voltageDrop} V
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-semibold">Percentage Drop</div>
                    <div className="text-2xl font-sans tabular-nums font-black text-emerald-300 mt-0.5">
                      {result.voltageDropPct}%
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-semibold">Voltage at Load Terminal</span>
                  <span className="text-lg font-sans tabular-nums font-bold text-slate-100">
                    {result.endVoltage} V
                  </span>
                </div>

                {/* Status indicator */}
                <div className={`p-2.5 rounded-xl text-center text-xs font-bold ${statusInfo.color}`}>
                  Status: {statusInfo.text}
                </div>

                {/* Conductor properties details list */}
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-800 text-xs font-sans tabular-nums space-y-1 text-slate-300">
                  <div className="flex justify-between border-b border-slate-800 pb-1 mb-1">
                    <span className="text-slate-400">Total Circuit Length:</span>
                    <span>{(result.conductors * result.distance * 2).toFixed(0)} {result.distanceUnit} (loop)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Effective Resistance:</span>
                    <span>{result.r.toFixed(5)} Ω/1000 ft</span>
                  </div>
                  {phase !== "dc" && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Effective Reactance:</span>
                      <span>{result.x.toFixed(5)} Ω/1000 ft</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Effective Impedance:</span>
                    <span>{result.z.toFixed(5)} Ω/1000 ft</span>
                  </div>
                </div>

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
                Calculation failed.
              </div>
            )}
          </div>

          {/* HISTORIC SAVED LIST */}
          {savedItems.length > 0 && (
            <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-3 no-print">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-1.5">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-blue-500" /> Saved Calculations ({savedItems.length})
                </span>
                <button
                  onClick={() => {
                    setSavedItems([]);
                    localStorage.removeItem("saved_voltage_drop_calculations");
                  }}
                  className="text-[10px] text-zinc-400 hover:text-red-500 font-semibold"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {savedItems.map((item) => (
                  <div key={item.id} className="p-2 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-sans tabular-nums">
                    <button
                      onClick={() => {
                        // Restore saved inputs
                        const inputs = item.inputs;
                        setVoltage(String(inputs.voltage));
                        setCurrentAmps(String(inputs.currentAmps));
                        setDistance(String(inputs.distance));
                        setDistanceUnit(inputs.distanceUnit);
                        setPhase(inputs.phase);
                        setMode(inputs.mode);
                        setWireMaterial(inputs.wireMaterial);
                        setWireType(inputs.wireType);
                        setWireSize(inputs.wireSize);
                        setConduitMaterial(inputs.conduitMaterial);
                        setPowerFactor(String(inputs.powerFactor));
                        setConductorsPerPhase(String(inputs.conductorsPerPhase));
                      }}
                      className="text-left font-bold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 truncate flex-1"
                    >
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-500">{item.timestamp}</div>
                      {item.desc} = <span className="text-emerald-600 font-black">{item.drop}</span>
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
          {result && result.formulaBreakdown && (
            <details className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-3 group outline-none">
              <summary className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 cursor-pointer flex items-center justify-between select-none">
                <span>📘 Show Calculation Breakdown</span>
                <span className="text-[10px] font-sans tabular-nums group-open:hidden">Expand +</span>
                <span className="text-[10px] font-sans tabular-nums hidden group-open:inline">Collapse -</span>
              </summary>
              <div className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800 mt-2">
                <pre className="p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-sans tabular-nums text-[11px] text-zinc-800 dark:text-zinc-300 overflow-x-auto leading-normal whitespace-pre-wrap">
                  {result.formulaBreakdown}
                </pre>
              </div>
            </details>
          )}
        </div>
      </div>

      {/* WHAT-IF RECOMMENDED WIRE GAUGE TABLE */}
      {result && recommendations.length > 0 && (
        <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
          <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5"><span>&quot;What If?&quot; Conductor Size Impact Table</span>
          </h3>
          <p className="text-xs text-zinc-500">
            See how upgrading or downgrading wire sizes affects voltage drop and terminal voltage under identical electrical conditions:
          </p>

          <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-xs text-left border-collapse font-sans tabular-nums">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">
                  <th className="p-2.5 border-r border-zinc-200 dark:border-zinc-700">Wire Size</th>
                  <th className="p-2.5 border-r border-zinc-200 dark:border-zinc-700">Voltage Drop (V)</th>
                  <th className="p-2.5 border-r border-zinc-200 dark:border-zinc-700">Drop Percentage</th>
                  <th className="p-2.5 border-r border-zinc-200 dark:border-zinc-700">Load Voltage (V)</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {/* Render the current size row first or inline */}
                <tr className="bg-blue-50/20 dark:bg-blue-950/10 font-bold border-l-2 border-l-blue-600">
                  <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-750">{result.wireSize} (Current)</td>
                  <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-750">{result.voltageDrop} V</td>
                  <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-750">{result.voltageDropPct}%</td>
                  <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-750">{result.endVoltage} V</td>
                  <td className="p-2.5 font-bold">{parseFloat(targetDropPct) && result.voltageDropPct <= parseFloat(targetDropPct) ? "Acceptable" : "Excessive"}</td>
                </tr>
                {recommendations.map((rec, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40">
                    <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800">{wireType === "awg" ? `${rec.size} AW` : `${rec.size} mm²`}</td>
                    <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800">{rec.voltageDrop.toFixed(3)} V</td>
                    <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800">{rec.voltageDropPct.toFixed(2)}%</td>
                    <td className="p-2.5 border-r border-zinc-200 dark:border-zinc-800">{rec.endVoltage.toFixed(2)} V</td>
                    <td className={`p-2.5 font-semibold ${rec.voltageDropPct <= (parseFloat(targetDropPct) || 3) ? "text-emerald-600" : "text-red-500"}`}>
                      {rec.voltageDropPct <= (parseFloat(targetDropPct) || 3) ? "Acceptable" : "Excessive"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* COMPARE GAUGE TOOL */}
      {mode !== "custom" && (
        <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4 no-print">
          <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <span>📊</span> Conductor Sizing Comparator
          </h3>
          <p className="text-xs text-zinc-500">
            Select multiple wire sizes below to perform a side-by-side performance analysis of their voltage properties:
          </p>

          <div className="flex flex-wrap gap-2 text-xs">
            {(wireType === "awg" ? AWG_SIZES.slice(0, 15) : METRIC_SIZES.slice(0, 12)).map(s => {
              const isChecked = compareSizes.includes(s);
              return (
                <label
                  key={s}
                  className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-lg cursor-pointer transition-all select-none ${
                    isChecked
                      ? "border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-950/20 font-bold"
                      : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      if (isChecked) {
                        setCompareSizes(compareSizes.filter(x => x !== s));
                      } else {
                        setCompareSizes([...compareSizes, s]);
                      }
                    }}
                    className="sr-only"
                  />
                  <span>{wireType === "awg" ? `${s} AWG` : `${s} mm²`}</span>
                </label>
              );
            })}
          </div>

          {comparisonResults.length > 0 && (
            <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
              <table className="w-full text-xs text-left border-collapse font-sans tabular-nums">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-850/50 text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">
                    <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">Size</th>
                    <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">Resistance (R)</th>
                    <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">Reactance (X)</th>
                    <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">Voltage Drop (V)</th>
                    <th className="p-2 border-r border-zinc-200 dark:border-zinc-700">Voltage Drop (%)</th>
                    <th className="p-2">Load Voltage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {comparisonResults.map((r, idx) => r && (
                    <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40">
                      <td className="p-2 border-r border-zinc-200 dark:border-zinc-800 font-bold">{wireType === "awg" ? `${r.size} AWG` : `${r.size} mm²`}</td>
                      <td className="p-2 border-r border-zinc-200 dark:border-zinc-800">{r.r.toFixed(5)} Ω/kft</td>
                      <td className="p-2 border-r border-zinc-200 dark:border-zinc-800">{r.x.toFixed(5)} Ω/kft</td>
                      <td className="p-2 border-r border-zinc-200 dark:border-zinc-800">{r.drop.toFixed(3)} V</td>
                      <td className="p-2 border-r border-zinc-200 dark:border-zinc-800">{r.dropPct.toFixed(2)}%</td>
                      <td className="p-2 font-bold">{r.loadV.toFixed(2)} V</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VoltageDropCalculator;
