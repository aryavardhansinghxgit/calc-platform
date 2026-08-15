"use client";

import React, { useState, useMemo } from "react";
import {
  Gauge,
  Fuel,
  Car,
  DollarSign,
  Zap,
  TrendingDown,
  Share2,
  Printer,
  Check,
  ChevronUp,
  ChevronDown,
  Sliders,
  Layers,
  Leaf,
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CalcMode,
  UnitSystem,
  FuelType,
  FillUpEntry,
  EfficiencyPenaltyFlags,
  GasMileageResult,
} from "@/app/calculators/gas-mileage-calculator/types";
import { calculateGasMileage } from "@/app/calculators/gas-mileage-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function GasMileageCalculator() {
  // Mode & System State
  const [mode, setMode] = useState<CalcMode>("odometer");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");
  const [fuelType, setFuelType] = useState<FuelType>("gasoline");

  // Odometer & Single Trip State
  const [startOdo, setStartOdo] = useState<number>(12000);
  const [endOdo, setEndOdo] = useState<number>(12360);
  const [tripDistance, setTripDistance] = useState<number>(360);
  const [fuelAdded, setFuelAdded] = useState<number>(12);
  const [fuelPrice, setFuelPrice] = useState<number>(3.5);

  // Tank Range Planner
  const [tankCapacity, setTankCapacity] = useState<number>(15);
  const [annualMileage, setAnnualMileage] = useState<number>(15000);

  // Multi-Tank Log State
  const [multiTankLogs, setMultiTankLogs] = useState<FillUpEntry[]>([
    { id: 1, distance: 340, fuelAdded: 11.8, pricePerUnit: 3.45 },
    { id: 2, distance: 355, fuelAdded: 12.1, pricePerUnit: 3.52 },
    { id: 3, distance: 330, fuelAdded: 11.5, pricePerUnit: 3.48 },
  ]);

  // Penalties State
  const [penalties, setPenalties] = useState<EfficiencyPenaltyFlags>({
    cityDriving: false,
    highSpeed: false,
    winterCold: false,
    roofCargo: false,
  });

  // UI State
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Auto-switch currency symbol and fuel price when selecting Indian metric or fuel grades
  const handleUnitSystemChange = (sys: UnitSystem) => {
    setUnitSystem(sys);
    if (sys === "indian") {
      setCurrencySymbol("₹");
      setFuelPrice(96.72);
      setAnnualMileage(15000);
      setStartOdo(45000);
      setEndOdo(45360);
    } else if (sys === "metric") {
      setCurrencySymbol("€");
      setFuelPrice(1.85);
    } else {
      setCurrencySymbol("$");
      setFuelPrice(3.5);
    }
  };

  const handleFuelTypeChange = (type: FuelType) => {
    setFuelType(type);
    if (unitSystem === "indian") {
      if (type === "gasoline") setFuelPrice(96.72);
      else if (type === "premium_petrol") setFuelPrice(105.5);
      else if (type === "diesel") setFuelPrice(89.62);
      else if (type === "cng") setFuelPrice(76.5);
      else if (type === "flex_fuel") setFuelPrice(75.0);
      else if (type === "lpg") setFuelPrice(58.0);
      else if (type === "electric") setFuelPrice(10.0);
    }
  };

  // Compute Results
  const result: GasMileageResult = useMemo(() => {
    return calculateGasMileage(
      mode,
      unitSystem,
      fuelType,
      startOdo,
      endOdo,
      tripDistance,
      fuelAdded,
      fuelPrice,
      tankCapacity,
      annualMileage,
      multiTankLogs,
      penalties
    );
  }, [
    mode,
    unitSystem,
    fuelType,
    startOdo,
    endOdo,
    tripDistance,
    fuelAdded,
    fuelPrice,
    tankCapacity,
    annualMileage,
    multiTankLogs,
    penalties,
  ]);

  // Multi-tank helper methods
  const addFillUp = () => {
    if (multiTankLogs.length >= 5) return;
    const nextId = multiTankLogs.length + 1;
    setMultiTankLogs([
      ...multiTankLogs,
      { id: nextId, distance: 350, fuelAdded: 12, pricePerUnit: fuelPrice },
    ]);
  };

  const removeFillUp = (id: number) => {
    if (multiTankLogs.length <= 1) return;
    setMultiTankLogs(multiTankLogs.filter((l) => l.id !== id));
  };

  const updateFillUp = (id: number, field: keyof FillUpEntry, value: number) => {
    setMultiTankLogs(
      multiTankLogs.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  // Copy Summary
  const handleCopySummary = () => {
    let text = `⛽ CalcPlatform Fuel Efficiency Log:\n`;
    text += `Fuel Economy: ${result.efficiencyUnitName === "km/l" || result.efficiencyUnitName === "km/kg" ? `${result.kmL} ${result.efficiencyUnitName}` : `${result.usMPG} US MPG (${result.l100km} L/100km)`}\n`;
    text += `Rating: ${result.ratingLabel}\n`;
    text += `Cost per ${result.distanceUnitName}: ${currencySymbol}${result.costPerDistanceUnit}\n`;
    text += `Estimated Range per Tank: ${result.totalTankRange.toLocaleString()} ${result.distanceUnitName}\n`;
    text += `Annual Fuel Cost (${annualMileage.toLocaleString()} ${result.distanceUnitName}): ${currencySymbol}${result.annualFuelCost}\n`;
    text += `Annual CO2 Emissions: ${result.carbonFootprintKg} kg CO2\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "Vehicle Fuel Mileage & Efficiency Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Gas Mileage Calculator",
      },
      keyMetrics: [
        {
          label: "Primary Fuel Economy",
          value: unitSystem === "indian"
            ? `${result.kmL} ${result.efficiencyUnitName} (${result.l100km} L/100km)`
            : `${result.usMPG} US MPG (${result.l100km} L/100km)`,
          highlight: true,
        },
        { label: "Efficiency Rating", value: result.ratingLabel },
        { label: "Cost Per Distance Unit", value: `${currencySymbol}${result.costPerDistanceUnit} / ${result.distanceUnitName}` },
        { label: "Distance Per Currency Unit", value: `${result.distancePerCurrencyUnit} ${result.distanceUnitName} / ${currencySymbol}1` },
      ],
      sections: [
        {
          title: "Tank Range & Operating Costs",
          items: [
            { label: "Tank Driving Range", value: `${result.totalTankRange.toLocaleString()} ${result.distanceUnitName}` },
            { label: "Cost to Fill Tank", value: `${currencySymbol}${result.costToFillTank} (${tankCapacity} ${result.fuelVolumeUnitName})` },
            { label: "Indian km/l Equivalent", value: `${result.kmL} km/l` },
            { label: "UK Imperial MPG Equivalent", value: `${result.ukMPG} UK MPG` },
          ],
        },
        {
          title: "Annual Financial & CO2 Environmental Projections",
          items: [
            { label: "Annual Driving Mileage", value: `${annualMileage.toLocaleString()} ${result.distanceUnitName} / year` },
            { label: "Annual Fuel Spending", value: `${currencySymbol}${result.annualFuelCost}` },
            { label: "Annual Fuel Consumed", value: `${result.annualFuelVolume} ${result.fuelVolumeUnitName}` },
            { label: "Annual Carbon Footprint", value: `${result.carbonFootprintTons} Metric Tons CO2 (${result.carbonFootprintKg} kg)` },
          ],
        },
        {
          title: "Alternative Powertrain MPGe Benchmark",
          items: [
            { label: "Calculated EV Equivalent", value: `${result.mpgeEquivalent} MPGe` },
            { label: "EV Cost Benchmark", value: `$4.50 / 100 mi (vs ${currencySymbol}${(result.costPerDistanceUnit * 100).toFixed(2)})` },
          ],
        },
      ],
    };
  }, [result, currencySymbol, tankCapacity, annualMileage, unitSystem]);

  return (
    <div className="space-y-4">
      {/* 1. TOP TOOLBAR CONTROL BAR - LIGHT HARMONIOUS THEME */}
      <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Mode Selector (Col 7) */}
          <div className="md:col-span-7 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Calculation Mode
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              <button
                onClick={() => setMode("odometer")}
                className={`py-1.5 px-2.5 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "odometer"
                    ? "bg-sky-600 text-white font-extrabold shadow-md shadow-sky-600/30 border-b-2 border-sky-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Odometer Log
              </button>
              <button
                onClick={() => setMode("trip")}
                className={`py-1.5 px-2.5 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "trip"
                    ? "bg-sky-600 text-white font-extrabold shadow-md shadow-sky-600/30 border-b-2 border-sky-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Single Trip
              </button>
              <button
                onClick={() => setMode("multi_tank")}
                className={`py-1.5 px-2.5 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "multi_tank"
                    ? "bg-sky-600 text-white font-extrabold shadow-md shadow-sky-600/30 border-b-2 border-sky-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Multi-Tank Log
              </button>
              <button
                onClick={() => setMode("tank_range")}
                className={`py-1.5 px-2.5 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "tank_range"
                    ? "bg-sky-600 text-white font-extrabold shadow-md shadow-sky-600/30 border-b-2 border-sky-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Range Planner
              </button>
            </div>
          </div>

          {/* Actions & Currency (Col 5) */}
          <div className="md:col-span-5 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Currency &amp; Export Tools
            </span>
            <div className="flex items-center gap-2">
              <select
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                className="h-8 text-xs font-bold px-2.5 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 border border-slate-200 dark:border-zinc-700 rounded-lg cursor-pointer flex-1"
              >
                <option value="₹">₹ (INR)</option>
                <option value="$">$ (USD)</option>
                <option value="€">€ (EUR)</option>
                <option value="£">£ (GBP)</option>
                <option value="CA$">CA$ (CAD)</option>
                <option value="A$">A$ (AUD)</option>
              </select>

              <Button
                onClick={handleCopySummary}
                variant="outline"
                size="sm"
                className="h-8 text-xs font-bold gap-1 cursor-pointer bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>

              <Button
                onClick={() => setShowReportModal(true)}
                variant="outline"
                size="sm"
                className="h-8 text-xs font-bold gap-1 cursor-pointer bg-sky-600 hover:bg-sky-500 text-white border-b-2 border-sky-800 shadow-md shadow-sky-600/20"
              >
                <Printer className="h-3.5 w-3.5" /> PDF Log
              </Button>
            </div>
          </div>
        </div>

        {/* Row 2: Unit System Switcher Buttons (Full Width) */}
        <div className="pt-2.5 border-t border-slate-200 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
            International Unit Standard
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
            <button
              onClick={() => handleUnitSystemChange("us")}
              className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                unitSystem === "us"
                  ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/30 border-b-2 border-blue-800 active:translate-y-0.5"
                  : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
              }`}
            >
              US Imperial (MPG)
            </button>
            <button
              onClick={() => handleUnitSystemChange("indian")}
              className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                unitSystem === "indian"
                  ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/30 border-b-2 border-blue-800 active:translate-y-0.5"
                  : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
              }`}
            >
              Indian (km/l)
            </button>
            <button
              onClick={() => handleUnitSystemChange("metric")}
              className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                unitSystem === "metric"
                  ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/30 border-b-2 border-blue-800 active:translate-y-0.5"
                  : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
              }`}
            >
              Metric (L/100km)
            </button>
            <button
              onClick={() => handleUnitSystemChange("uk")}
              className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                unitSystem === "uk"
                  ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/30 border-b-2 border-blue-800 active:translate-y-0.5"
                  : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
              }`}
            >
              UK Imperial (MPG)
            </button>
          </div>
        </div>
      </div>

      {/* 2. SPLIT PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-4">
          {/* MODE 1: ODOMETER MODE */}
          {mode === "odometer" && (
            <div className="space-y-2.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Gauge className="h-4 w-4 text-sky-600" /> Odometer Readings ({result.distanceUnitName})
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Start Odometer</label>
                  <Input
                    type="number"
                    value={startOdo}
                    onChange={(e) => setStartOdo(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">End Odometer</label>
                  <Input
                    type="number"
                    value={endOdo}
                    onChange={(e) => setEndOdo(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: TRIP DISTANCE MODE */}
          {mode === "trip" && (
            <div className="space-y-2.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Car className="h-4 w-4 text-sky-600" /> Trip Meter Distance ({result.distanceUnitName})
              </label>
              <Input
                type="number"
                value={tripDistance}
                onChange={(e) => setTripDistance(Number(e.target.value))}
                className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
              />
            </div>
          )}

          {/* MODE 3: MULTI-TANK ROLLING LOG MODE */}
          {mode === "multi_tank" && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Fuel className="h-4 w-4 text-sky-600" /> Multi-Tank Rolling Average Fill-up Log
                </label>
                {multiTankLogs.length < 5 && (
                  <Button
                    onClick={addFillUp}
                    variant="outline"
                    size="sm"
                    className="h-6 text-[11px] font-bold gap-1 cursor-pointer"
                  >
                    <Plus className="h-3 w-3" /> Add Tank
                  </Button>
                )}
              </div>

              <div className="space-y-1.5">
                {multiTankLogs.map((log, index) => (
                  <div key={log.id} className="flex items-center gap-2 p-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/60 text-xs font-sans tabular-nums">
                    <span className="font-bold text-zinc-400 w-12 text-[11px]">Tank #{index + 1}</span>
                    <Input
                      type="number"
                      value={log.distance}
                      onChange={(e) => updateFillUp(log.id, "distance", Number(e.target.value))}
                      placeholder={result.distanceUnitName}
                      className="h-7 text-xs font-sans tabular-nums w-24"
                    />
                    <Input
                      type="number"
                      value={log.fuelAdded}
                      onChange={(e) => updateFillUp(log.id, "fuelAdded", Number(e.target.value))}
                      placeholder={result.fuelVolumeUnitName}
                      className="h-7 text-xs font-sans tabular-nums w-24"
                    />
                    <Input
                      type="number"
                      step="0.05"
                      value={log.pricePerUnit}
                      onChange={(e) => updateFillUp(log.id, "pricePerUnit", Number(e.target.value))}
                      placeholder="Price"
                      className="h-7 text-xs font-sans tabular-nums w-20"
                    />
                    {multiTankLogs.length > 1 && (
                      <button
                        onClick={() => removeFillUp(log.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODE 4: TANK RANGE PLANNER MODE */}
          {mode === "tank_range" && (
            <div className="space-y-2.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Fuel className="h-4 w-4 text-sky-600" /> Fuel Tank Capacity &amp; Mileage
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    Tank Capacity ({result.fuelVolumeUnitName})
                  </label>
                  <Input
                    type="number"
                    value={tankCapacity}
                    onChange={(e) => setTankCapacity(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    Trip Distance ({result.distanceUnitName})
                  </label>
                  <Input
                    type="number"
                    value={tripDistance}
                    onChange={(e) => setTripDistance(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Fuel Added & Fuel Price (Odometer & Trip Modes) */}
          {(mode === "odometer" || mode === "trip" || mode === "tank_range") && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Fuel Volume Added ({result.fuelVolumeUnitName})
                </label>
                <Input
                  type="number"
                  value={fuelAdded}
                  onChange={(e) => setFuelAdded(Number(e.target.value))}
                  className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Fuel Price ({currencySymbol} per {result.fuelVolumeUnitName})
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(Number(e.target.value))}
                  className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
            </div>
          )}

          {/* Fuel Grade Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 dark:text-zinc-300">Fuel Grade &amp; Energy Type</label>
              <select
                value={fuelType}
                onChange={(e) => handleFuelTypeChange(e.target.value as FuelType)}
                className="w-full h-8 font-bold px-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer text-xs"
              >
                <option value="gasoline">Regular Petrol (E20 Blend - 87-91 Octane)</option>
                <option value="premium_petrol">Premium Petrol (XP95 / Speed - 95+ Octane)</option>
                <option value="diesel">BS-VI Clean Diesel</option>
                <option value="cng">CNG - Compressed Natural Gas (km/kg)</option>
                <option value="flex_fuel">Flex-Fuel (E85 Bio-Ethanol Blend)</option>
                <option value="lpg">Auto LPG (Liquefied Petroleum Gas)</option>
                <option value="electric">Battery Electric EV (km/kWh)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-zinc-700 dark:text-zinc-300">
                Estimated Annual Driving ({result.distanceUnitName})
              </label>
              <Input
                type="number"
                value={annualMileage}
                onChange={(e) => setAnnualMileage(Number(e.target.value))}
                className="h-8 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
              />
            </div>
          </div>

          {/* EXPANDABLE ACCORDION: REAL-WORLD PENALTIES */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-sky-600 cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <Sliders className="h-3.5 w-3.5" /> Real-World Efficiency Penalty Modifiers
              </span>
              {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showAdvanced && (
              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={penalties.cityDriving}
                      onChange={(e) => setPenalties({ ...penalties, cityDriving: e.target.checked })}
                      className="rounded text-sky-600 accent-sky-600 cursor-pointer"
                    />
                    City / Stop-and-Go (-20%)
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={penalties.highSpeed}
                      onChange={(e) => setPenalties({ ...penalties, highSpeed: e.target.checked })}
                      className="rounded text-sky-600 accent-sky-600 cursor-pointer"
                    />
                    Speeding 75+ mph (-20%)
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={penalties.winterCold}
                      onChange={(e) => setPenalties({ ...penalties, winterCold: e.target.checked })}
                      className="rounded text-sky-600 accent-sky-600 cursor-pointer"
                    />
                    Winter Cold / Short Trips (-10%)
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={penalties.roofCargo}
                      onChange={(e) => setPenalties({ ...penalties, roofCargo: e.target.checked })}
                      className="rounded text-sky-600 accent-sky-600 cursor-pointer"
                    />
                    Roof Cargo / Heavy Load (-15%)
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DASHBOARD (Col 5) - SLEEK COMPACT PROPORTIONAL DESIGN */}
        <div className="lg:col-span-5 bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-950 text-white p-4 rounded-2xl shadow-md space-y-3.5">
          <div className="flex items-center justify-between border-b border-white/20 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-100 flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-white" /> Fuel Efficiency Dashboard
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
              {unitSystem === "indian" ? "Indian (km/l)" : unitSystem === "us" ? "US Imperial" : unitSystem === "metric" ? "Metric (L/100km)" : "UK Imperial"}
            </span>
          </div>

          {/* Primary Fuel Economy Card */}
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200 block">
              Calculated Fuel Mileage
            </span>
            <div className="text-3xl sm:text-4xl font-black font-sans tabular-nums tracking-tight text-white">
              {unitSystem === "indian"
                ? `${result.kmL} ${result.efficiencyUnitName}`
                : unitSystem === "metric"
                ? `${result.l100km} L/100km`
                : `${result.usMPG} MPG`}
            </div>
            <p className="text-[11px] text-sky-100 font-medium">
              Equivalent: {result.kmL} km/l | {result.usMPG} US MPG | {result.l100km} L/100km
            </p>
          </div>

          {/* Animated Visual Efficiency Gauge */}
          <div className="p-2.5 bg-white/10 backdrop-blur-xs rounded-xl border border-white/20 space-y-1.5 text-xs">
            <div className="flex justify-between font-bold text-[11px]">
              <span className="text-sky-200">Efficiency Scale</span>
              <span className="text-white">{result.ratingLabel}</span>
            </div>

            {/* Progress Meter Bar */}
            <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  result.rating === "hybrid"
                    ? "bg-emerald-400"
                    : result.rating === "excellent"
                    ? "bg-teal-300"
                    : result.rating === "average"
                    ? "bg-yellow-400"
                    : "bg-rose-400"
                }`}
                style={{ width: `${result.ratingPercentage}%` }}
              />
            </div>

            <div className="flex justify-between text-[9px] text-sky-200 font-sans tabular-nums">
              {unitSystem === "indian" ? (
                <>
                  <span>&lt;12 km/l</span>
                  <span>12-18 (Avg)</span>
                  <span>18-25 (Exc)</span>
                  <span>25+ (Hybrid/CNG)</span>
                </>
              ) : (
                <>
                  <span>&lt;20 MPG</span>
                  <span>25-30 (Avg)</span>
                  <span>35-45 (Exc)</span>
                  <span>50+ (Hybrid)</span>
                </>
              )}
            </div>
          </div>

          {/* Side-by-side Mini Metrics */}
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-sky-200 block">Cost Per {result.distanceUnitName}</span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">{currencySymbol}{result.costPerDistanceUnit}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-sky-200 block">Distance Per {currencySymbol}1</span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">{result.distancePerCurrencyUnit} {result.distanceUnitName}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-sky-200 block">Driving Range</span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">{result.totalTankRange.toLocaleString()} {result.distanceUnitName}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-sky-200 block">Fill Tank Cost</span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">{currencySymbol}{result.costToFillTank}</span>
            </div>
          </div>

          {/* Annual Spending & CO2 Emissions */}
          <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/20 space-y-1 text-xs">
            <span className="text-[9px] font-bold uppercase text-sky-200 flex items-center gap-1">
              <Leaf className="h-3 w-3 text-emerald-300" /> Annual Projection ({annualMileage.toLocaleString()} {result.distanceUnitName})
            </span>
            <div className="flex justify-between font-sans tabular-nums text-xs font-bold text-white">
              <span>Annual Fuel: {currencySymbol}{result.annualFuelCost}</span>
              <span className="text-emerald-300">{result.carbonFootprintTons} Tons CO2</span>
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
