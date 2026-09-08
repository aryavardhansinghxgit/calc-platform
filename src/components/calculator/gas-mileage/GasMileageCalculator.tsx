"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Gauge,
  Fuel,
  Car,
  Check,
  ChevronUp,
  ChevronDown,
  Sliders,
  Leaf,
  Plus,
  Trash2,
  FileText,
  Download,
  Printer,
  Copy,
  Save,
  RotateCcw,
  AlertTriangle,
  Code,
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
  SavedGasMileageState,
} from "@/app/calculators/gas-mileage-calculator/types";
import { calculateGasMileage } from "@/app/calculators/gas-mileage-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export const formatMoney = (amount: number, symbol: string = "$"): string => {
  if (isNaN(amount) || !isFinite(amount)) return `${symbol}0.00`;
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const STORAGE_KEY = "gas_mileage_saved_state_v1";

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
  const [copyStatus, setCopyStatus] = useState<string>("");
  const [hasSavedState, setHasSavedState] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setHasSavedState(true);
    } catch {
      // ignore
    }
  }, []);

  // Switch currency symbol and fuel price when selecting Indian metric or fuel grades
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
      setAnnualMileage(24000);
    } else if (sys === "uk") {
      setCurrencySymbol("£");
      setFuelPrice(1.45);
      setAnnualMileage(10000);
    } else {
      setCurrencySymbol("$");
      setFuelPrice(3.5);
      setAnnualMileage(15000);
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
    if (multiTankLogs.length >= 10) return;
    const nextId = multiTankLogs.length > 0 ? Math.max(...multiTankLogs.map((l) => l.id)) + 1 : 1;
    setMultiTankLogs([
      ...multiTankLogs,
      { id: nextId, distance: 350, fuelAdded: 12, pricePerUnit: fuelPrice },
    ]);
  };

  const removeFillUp = (id: number) => {
    setMultiTankLogs(multiTankLogs.filter((l) => l.id !== id));
  };

  const updateFillUp = (id: number, field: keyof FillUpEntry, value: number) => {
    setMultiTankLogs(
      multiTankLogs.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  // Flash feedback helper
  const triggerCopyFeedback = (msg: string) => {
    setCopyStatus(msg);
    setTimeout(() => setCopyStatus(""), 2200);
  };

  // 1. Copy Result (Active Mode Specific)
  const handleCopyResult = () => {
    let text = "";
    if (mode === "odometer") {
      text = `Distance: ${result.totalDistance} ${result.distanceUnitName} | Fuel Economy: ${
        unitSystem === "indian"
          ? `${result.kmL} km/l`
          : unitSystem === "metric"
          ? `${result.l100km} L/100km`
          : `${result.usMPG} US MPG`
      } | Trip Cost: ${formatMoney(result.tripFuelCost, currencySymbol)} | Cost/${result.distanceUnitName}: ${formatMoney(
        result.costPerDistanceUnit,
        currencySymbol
      )} | Range: ${result.totalTankRange} ${result.distanceUnitName} | Annual Cost: ${formatMoney(
        result.annualFuelCost,
        currencySymbol
      )} | CO2: ${result.carbonFootprintTons} t`;
    } else if (mode === "trip") {
      text = `Distance: ${result.totalDistance} ${result.distanceUnitName} | Fuel Added: ${result.totalFuelVolume} ${result.fuelVolumeUnitName} | Fuel Economy: ${
        unitSystem === "indian" ? `${result.kmL} km/l` : `${result.usMPG} US MPG`
      } | Trip Cost: ${formatMoney(result.tripFuelCost, currencySymbol)} | Cost/${result.distanceUnitName}: ${formatMoney(
        result.costPerDistanceUnit,
        currencySymbol
      )} | CO2: ${result.carbonFootprintKg} kg`;
    } else if (mode === "multi_tank") {
      text = `Tanks Logged: ${multiTankLogs.length} | Total Distance: ${result.totalDistance} ${result.distanceUnitName} | Total Fuel: ${result.totalFuelVolume} ${result.fuelVolumeUnitName} | Weighted Fuel Economy: ${
        unitSystem === "indian" ? `${result.kmL} km/l` : `${result.usMPG} US MPG`
      } | Total Cost: ${formatMoney(result.tripFuelCost, currencySymbol)}`;
    } else {
      text = `Tank Capacity: ${tankCapacity} ${result.fuelVolumeUnitName} | Fuel Economy: ${
        unitSystem === "indian" ? `${result.kmL} km/l` : `${result.usMPG} US MPG`
      } | Estimated Range: ${result.totalTankRange} ${result.distanceUnitName} | Full Tank Cost: ${formatMoney(
        result.costToFillTank,
        currencySymbol
      )}`;
    }
    navigator.clipboard.writeText(text);
    triggerCopyFeedback("Result Copied!");
  };

  // 2. Copy Summary (Comprehensive)
  const handleCopySummary = () => {
    let text = `⛽ CalcPlatform Gas Mileage Log (${mode.toUpperCase()} MODE):\n`;
    text += `Standard: ${unitSystem === "indian" ? "Indian (km/l)" : unitSystem === "us" ? "US MPG" : unitSystem === "metric" ? "Metric (L/100km)" : "UK Imperial MPG"}\n`;
    text += `Fuel Economy: ${
      unitSystem === "indian"
        ? `${result.kmL} km/l (${result.l100km} L/100km | ${result.usMPG} US MPG)`
        : unitSystem === "metric"
        ? `${result.l100km} L/100km (${result.kmL} km/l | ${result.usMPG} US MPG)`
        : `${result.usMPG} US MPG (${result.l100km} L/100km | ${result.ukMPG} UK MPG)`
    }\n`;
    text += `Trip Distance: ${result.totalDistance} ${result.distanceUnitName}\n`;
    text += `Fuel Volume: ${result.totalFuelVolume} ${result.fuelVolumeUnitName}\n`;
    text += `Trip Fuel Cost: ${formatMoney(result.tripFuelCost, currencySymbol)}\n`;
    text += `Cost per ${result.distanceUnitName}: ${formatMoney(result.costPerDistanceUnit, currencySymbol)}\n`;
    text += `Driving Range per Tank: ${result.totalTankRange.toLocaleString()} ${result.distanceUnitName}\n`;
    text += `Cost to Fill Tank: ${formatMoney(result.costToFillTank, currencySymbol)}\n`;
    text += `Annual Fuel Spending (${annualMileage.toLocaleString()} ${result.distanceUnitName}): ${formatMoney(
      result.annualFuelCost,
      currencySymbol
    )}\n`;
    text += `Annual Carbon Footprint: ${result.carbonFootprintTons} Tons CO2 (${result.carbonFootprintKg} kg)\n`;
    text += `Timestamp: ${new Date().toISOString()}\n`;

    navigator.clipboard.writeText(text);
    triggerCopyFeedback("Summary Copied!");
  };

  // 3. Export CSV (Active Mode Specific RFC-4180)
  const handleExportCSV = () => {
    let headers: string[] = [];
    let rows: string[][] = [];

    if (mode === "multi_tank") {
      headers = ["Tank #", "Distance", "Distance Unit", "Fuel Volume Added", "Fuel Unit", "Price Per Unit", "Currency", "Tank Cost"];
      rows = multiTankLogs.map((log, idx) => [
        `Tank #${idx + 1}`,
        log.distance.toString(),
        result.distanceUnitName,
        log.fuelAdded.toString(),
        result.fuelVolumeUnitName,
        log.pricePerUnit.toFixed(2),
        currencySymbol,
        (log.distance > 0 && log.fuelAdded > 0 ? (log.fuelAdded * log.pricePerUnit).toFixed(2) : "0.00"),
      ]);
      rows.push([
        "TOTAL / WEIGHTED",
        result.totalDistance.toString(),
        result.distanceUnitName,
        result.totalFuelVolume.toString(),
        result.fuelVolumeUnitName,
        result.avgPricePerUnit.toFixed(2),
        currencySymbol,
        result.tripFuelCost.toFixed(2),
      ]);
    } else {
      headers = [
        "Mode",
        "Total Distance",
        "Distance Unit",
        "Total Fuel Volume",
        "Fuel Unit",
        "Fuel Economy",
        "Efficiency Unit",
        "Fuel Price",
        "Trip Fuel Cost",
        "Cost Per Distance",
        "Tank Capacity",
        "Driving Range",
        "Full Tank Cost",
        "Annual Distance",
        "Annual Fuel Cost",
        "CO2 Tons",
        "Currency",
        "Timestamp",
      ];
      rows = [
        [
          mode,
          result.totalDistance.toString(),
          result.distanceUnitName,
          result.totalFuelVolume.toString(),
          result.fuelVolumeUnitName,
          unitSystem === "indian" ? result.kmL.toString() : unitSystem === "metric" ? result.l100km.toString() : result.usMPG.toString(),
          result.efficiencyUnitName,
          fuelPrice.toFixed(2),
          result.tripFuelCost.toFixed(2),
          result.costPerDistanceUnit.toFixed(2),
          tankCapacity.toString(),
          result.totalTankRange.toString(),
          result.costToFillTank.toFixed(2),
          annualMileage.toString(),
          result.annualFuelCost.toFixed(2),
          result.carbonFootprintTons.toString(),
          currencySymbol,
          new Date().toISOString(),
        ],
      ];
    }

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gas_mileage_${mode}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerCopyFeedback("CSV Downloaded!");
  };

  // 4. Download TXT Report
  const handleDownloadTXT = () => {
    let report = `=================================================================\n`;
    report += `CALCPLATFORM GAS MILEAGE & FUEL ECONOMY REPORT\n`;
    report += `Mode: ${mode.toUpperCase()} | Standard: ${unitSystem.toUpperCase()}\n`;
    report += `Timestamp: ${new Date().toLocaleString()}\n`;
    report += `=================================================================\n\n`;
    report += `PRIMARY EFFICIENCY METRICS:\n`;
    report += `  - Primary Fuel Economy: ${unitSystem === "indian" ? `${result.kmL} km/l` : unitSystem === "metric" ? `${result.l100km} L/100km` : `${result.usMPG} US MPG`}\n`;
    report += `  - Metric L/100km: ${result.l100km} L/100km\n`;
    report += `  - Indian km/l: ${result.kmL} km/l\n`;
    report += `  - UK Imperial MPG: ${result.ukMPG} UK MPG\n`;
    report += `  - Efficiency Rating: ${result.ratingLabel}\n\n`;
    report += `TRIP & FUEL COSTS:\n`;
    report += `  - Total Distance: ${result.totalDistance} ${result.distanceUnitName}\n`;
    report += `  - Total Fuel Volume: ${result.totalFuelVolume} ${result.fuelVolumeUnitName}\n`;
    report += `  - Fuel Price per Unit: ${formatMoney(fuelPrice, currencySymbol)}\n`;
    report += `  - Recorded Trip Fuel Cost: ${formatMoney(result.tripFuelCost, currencySymbol)}\n`;
    report += `  - Running Cost per ${result.distanceUnitName}: ${formatMoney(result.costPerDistanceUnit, currencySymbol)}\n\n`;
    report += `RANGE & PROJECTIONS:\n`;
    report += `  - Usable Tank Capacity: ${tankCapacity} ${result.fuelVolumeUnitName}\n`;
    report += `  - Estimated Driving Range: ${result.totalTankRange.toLocaleString()} ${result.distanceUnitName}\n`;
    report += `  - Full Tank Fill Cost: ${formatMoney(result.costToFillTank, currencySymbol)}\n`;
    report += `  - Annual Driving Target: ${annualMileage.toLocaleString()} ${result.distanceUnitName}\n`;
    report += `  - Annual Fuel Spending: ${formatMoney(result.annualFuelCost, currencySymbol)}\n`;
    report += `  - Annual Carbon Footprint: ${result.carbonFootprintTons} Metric Tons CO2 (${result.carbonFootprintKg} kg)\n`;

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gas_mileage_report_${mode}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerCopyFeedback("TXT Downloaded!");
  };

  // 5. Copy LaTeX
  const handleCopyLaTeX = () => {
    let latex = "";
    if (mode === "odometer") {
      latex = `% Gas Mileage Calculator - Odometer Model\n` +
        `\\text{Distance } d = \\text{Odo}_{\\text{end}} - \\text{Odo}_{\\text{start}} = ${endOdo} - ${startOdo} = ${result.totalDistance}\\text{ ${result.distanceUnitName}}\\\\\n` +
        `\\text{Fuel Economy } = \\frac{d}{V} = \\frac{${result.totalDistance}}{${result.totalFuelVolume}} = ${result.usMPG}\\text{ MPG}\\\\\n` +
        `\\text{Trip Fuel Cost} = V \\times P = ${result.totalFuelVolume} \\times ${fuelPrice} = ${formatMoney(result.tripFuelCost, currencySymbol)}\\\\\n` +
        `\\text{Cost per Mile} = \\frac{P}{\\text{MPG}} = \\frac{${fuelPrice}}{${result.usMPG}} = ${formatMoney(result.costPerDistanceUnit, currencySymbol)}`;
    } else if (unitSystem === "indian") {
      latex = `% Gas Mileage Calculator - Metric km/L Model\n` +
        `\\text{km/L} = \\frac{\\text{Distance (km)}}{\\text{Fuel (L)}} = \\frac{${result.totalDistance}}{${result.totalFuelVolume}} = ${result.kmL}\\text{ km/L}\\\\\n` +
        `\\text{L/100km} = \\frac{100}{\\text{km/L}} = ${result.l100km}\\text{ L/100km}\\\\\n` +
        `\\text{Trip Cost} = ${result.totalFuelVolume} \\times ${fuelPrice} = ${formatMoney(result.tripFuelCost, currencySymbol)}`;
    } else {
      latex = `% Gas Mileage Calculator - Formula\n` +
        `\\text{Fuel Economy} = \\frac{\\text{Distance}}{\\text{Fuel Volume}} = ${result.usMPG}\\text{ MPG}\\\\\n` +
        `\\text{Driving Range} = \\text{Tank Capacity} \\times \\text{MPG} = ${tankCapacity} \\times ${result.effectiveMPG} = ${result.totalTankRange}\\text{ miles}\\\\\n` +
        `\\text{Annual Cost} = \\left(\\frac{\\text{Annual Distance}}{\\text{MPG}}\\right) \\times P = ${formatMoney(result.annualFuelCost, currencySymbol)}`;
    }

    navigator.clipboard.writeText(latex);
    triggerCopyFeedback("LaTeX Copied!");
  };

  // 6. Save & Restore
  const handleSaveState = () => {
    try {
      const stateToSave: SavedGasMileageState = {
        id: `save_${Date.now()}`,
        timestamp: Date.now(),
        mode,
        unitSystem,
        currencySymbol,
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
        resultSummary: `${result.usMPG} MPG | ${formatMoney(result.tripFuelCost, currencySymbol)}`,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      setHasSavedState(true);
      triggerCopyFeedback("Calculation Saved!");
    } catch {
      triggerCopyFeedback("Save failed");
    }
  };

  const handleRestoreState = () => {
    try {
      const savedStr = localStorage.getItem(STORAGE_KEY);
      if (!savedStr) return;
      const saved: SavedGasMileageState = JSON.parse(savedStr);
      setMode(saved.mode ?? "odometer");
      setUnitSystem(saved.unitSystem ?? "us");
      setCurrencySymbol(saved.currencySymbol ?? "$");
      setFuelType(saved.fuelType ?? "gasoline");
      setStartOdo(saved.startOdo ?? 12000);
      setEndOdo(saved.endOdo ?? 12360);
      setTripDistance(saved.tripDistance ?? 360);
      setFuelAdded(saved.fuelAdded ?? 12);
      setFuelPrice(saved.fuelPrice ?? 3.5);
      setTankCapacity(saved.tankCapacity ?? 15);
      setAnnualMileage(saved.annualMileage ?? 15000);
      if (Array.isArray(saved.multiTankLogs)) {
        setMultiTankLogs(saved.multiTankLogs);
      }
      if (saved.penalties) {
        setPenalties(saved.penalties);
      }
      triggerCopyFeedback("State Restored!");
    } catch {
      triggerCopyFeedback("Restore failed");
    }
  };

  // 7. Report Modal Data (Mode-Specific)
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: `Vehicle Fuel Mileage & Efficiency Report (${mode.toUpperCase()})`,
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Gas Mileage Calculator",
      },
      keyMetrics: [
        {
          label: "Primary Fuel Economy",
          value:
            unitSystem === "indian"
              ? `${result.kmL} km/l (${result.l100km} L/100km)`
              : unitSystem === "metric"
              ? `${result.l100km} L/100km (${result.kmL} km/l)`
              : `${result.usMPG} US MPG (${result.l100km} L/100km)`,
          highlight: true,
        },
        { label: "Trip Fuel Cost", value: formatMoney(result.tripFuelCost, currencySymbol), highlight: true },
        { label: "Cost Per Distance Unit", value: `${formatMoney(result.costPerDistanceUnit, currencySymbol)} / ${result.distanceUnitName}` },
        { label: "Estimated Tank Range", value: `${result.totalTankRange.toLocaleString()} ${result.distanceUnitName}` },
      ],
      sections: [
        {
          title: "Recorded Fill-Up & Distance Data",
          items:
            mode === "odometer"
              ? [
                  { label: "Start Odometer", value: `${startOdo.toLocaleString()} ${result.distanceUnitName}` },
                  { label: "End Odometer", value: `${endOdo.toLocaleString()} ${result.distanceUnitName}` },
                  { label: "Net Distance Driven", value: `${result.totalDistance.toLocaleString()} ${result.distanceUnitName}` },
                  { label: "Fuel Volume Added", value: `${result.totalFuelVolume} ${result.fuelVolumeUnitName}` },
                  { label: "Fuel Unit Price", value: formatMoney(fuelPrice, currencySymbol) },
                  { label: "Trip Fuel Expense", value: formatMoney(result.tripFuelCost, currencySymbol) },
                ]
              : mode === "multi_tank"
              ? [
                  { label: "Tanks Included in Rolling Average", value: multiTankLogs.length.toString() },
                  { label: "Aggregated Distance", value: `${result.totalDistance.toLocaleString()} ${result.distanceUnitName}` },
                  { label: "Aggregated Fuel Volume", value: `${result.totalFuelVolume} ${result.fuelVolumeUnitName}` },
                  { label: "Weighted Average Fuel Economy", value: `${unitSystem === "indian" ? result.kmL : result.usMPG} ${result.efficiencyUnitName}` },
                  { label: "Total Multi-Tank Cost", value: formatMoney(result.tripFuelCost, currencySymbol) },
                ]
              : [
                  { label: "Trip Distance", value: `${result.totalDistance.toLocaleString()} ${result.distanceUnitName}` },
                  { label: "Fuel Volume Added", value: `${result.totalFuelVolume} ${result.fuelVolumeUnitName}` },
                  { label: "Trip Fuel Expense", value: formatMoney(result.tripFuelCost, currencySymbol) },
                ],
        },
        {
          title: "International Fuel Economy Equivalencies",
          items: [
            { label: "US MPG Standard", value: `${result.usMPG} US MPG` },
            { label: "UK Imperial MPG Standard", value: `${result.ukMPG} UK MPG` },
            { label: "European Metric Standard", value: `${result.l100km} L/100km` },
            { label: "Indian Metric Standard", value: `${result.kmL} km/l` },
          ],
        },
        {
          title: "Operating Cost & Environmental Projections",
          items: [
            { label: "Full Tank Capacity", value: `${tankCapacity} ${result.fuelVolumeUnitName}` },
            { label: "Cost to Fill Full Tank", value: formatMoney(result.costToFillTank, currencySymbol) },
            { label: "Estimated Driving Range", value: `${result.totalTankRange.toLocaleString()} ${result.distanceUnitName}` },
            { label: "Annual Driving Mileage", value: `${annualMileage.toLocaleString()} ${result.distanceUnitName}` },
            { label: "Annual Projected Fuel Spending", value: formatMoney(result.annualFuelCost, currencySymbol) },
            { label: "Annual Carbon Footprint", value: `${result.carbonFootprintTons} Metric Tons CO2 (${result.carbonFootprintKg} kg)` },
          ],
        },
      ],
    };
  }, [result, currencySymbol, tankCapacity, annualMileage, unitSystem, mode, startOdo, endOdo, fuelPrice, multiTankLogs]);

  return (
    <div className="space-y-4">
      {/* 1. TOP TOOLBAR CONTROL BAR */}
      <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Mode Selector */}
          <div className="md:col-span-6 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Calculation Mode
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setMode("odometer")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "odometer"
                    ? "bg-sky-600 text-white font-extrabold shadow-md shadow-sky-600/30 border-b-2 border-sky-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Odometer Log
              </button>
              <button
                type="button"
                onClick={() => setMode("trip")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "trip"
                    ? "bg-sky-600 text-white font-extrabold shadow-md shadow-sky-600/30 border-b-2 border-sky-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Single Trip
              </button>
              <button
                type="button"
                onClick={() => setMode("multi_tank")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "multi_tank"
                    ? "bg-sky-600 text-white font-extrabold shadow-md shadow-sky-600/30 border-b-2 border-sky-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Multi-Tank Log
              </button>
              <button
                type="button"
                onClick={() => setMode("tank_range")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "tank_range"
                    ? "bg-sky-600 text-white font-extrabold shadow-md shadow-sky-600/30 border-b-2 border-sky-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Range Planner
              </button>
            </div>
          </div>

          {/* Currency & Save/Restore Toolbar */}
          <div className="md:col-span-6 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
                Currency &amp; Data State
              </span>
              {copyStatus && (
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
                  {copyStatus}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <label htmlFor="gas-currency-select" className="sr-only">Currency Selection</label>
              <select
                id="gas-currency-select"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                className="h-8 text-xs font-bold px-2 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 border border-slate-200 dark:border-zinc-700 rounded-lg cursor-pointer flex-1"
              >
                <option value="$">$ (USD / CAD / AUD)</option>
                <option value="₹">₹ (INR)</option>
                <option value="€">€ (EUR)</option>
                <option value="£">£ (GBP)</option>
                <option value="CA$">CA$ (CAD)</option>
                <option value="A$">A$ (AUD)</option>
              </select>

              <Button
                type="button"
                onClick={handleSaveState}
                variant="outline"
                size="sm"
                className="h-8 text-xs font-bold gap-1 cursor-pointer bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100"
                title="Save calculation state"
              >
                <Save className="h-3.5 w-3.5 text-blue-600" /> Save
              </Button>

              {hasSavedState && (
                <Button
                  type="button"
                  onClick={handleRestoreState}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs font-bold gap-1 cursor-pointer bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100"
                  title="Restore saved calculation"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-emerald-600" /> Restore
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Unit System Switcher Buttons */}
        <div className="pt-2.5 border-t border-slate-200 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
            International Unit Standard
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => handleUnitSystemChange("us")}
              className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                unitSystem === "us"
                  ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/30 border-b-2 border-blue-800 active:translate-y-0.5"
                  : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
              }`}
            >
              US MPG
            </button>
            <button
              type="button"
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
              type="button"
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
              type="button"
              onClick={() => handleUnitSystemChange("uk")}
              className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                unitSystem === "uk"
                  ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/30 border-b-2 border-blue-800 active:translate-y-0.5"
                  : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
              }`}
            >
              UK Imperial MPG
            </button>
          </div>
        </div>

        {/* Comprehensive Export Toolbar */}
        <div className="pt-2.5 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap items-center gap-1.5 text-xs">
          <Button
            type="button"
            onClick={handleCopyResult}
            variant="outline"
            size="sm"
            className="h-7 text-[11px] font-bold gap-1 cursor-pointer bg-white dark:bg-zinc-800"
          >
            <Copy className="h-3 w-3" /> Copy Result
          </Button>

          <Button
            type="button"
            onClick={handleCopySummary}
            variant="outline"
            size="sm"
            className="h-7 text-[11px] font-bold gap-1 cursor-pointer bg-white dark:bg-zinc-800"
          >
            <FileText className="h-3 w-3" /> Copy Summary
          </Button>

          <Button
            type="button"
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="h-7 text-[11px] font-bold gap-1 cursor-pointer bg-white dark:bg-zinc-800"
          >
            <Download className="h-3 w-3" /> CSV
          </Button>

          <Button
            type="button"
            onClick={handleDownloadTXT}
            variant="outline"
            size="sm"
            className="h-7 text-[11px] font-bold gap-1 cursor-pointer bg-white dark:bg-zinc-800"
          >
            <FileText className="h-3 w-3" /> TXT
          </Button>

          <Button
            type="button"
            onClick={handleCopyLaTeX}
            variant="outline"
            size="sm"
            className="h-7 text-[11px] font-bold gap-1 cursor-pointer bg-white dark:bg-zinc-800"
          >
            <Code className="h-3 w-3" /> LaTeX
          </Button>

          <Button
            type="button"
            onClick={() => setShowReportModal(true)}
            size="sm"
            className="h-7 text-[11px] font-bold gap-1 cursor-pointer bg-sky-600 hover:bg-sky-500 text-white"
          >
            <Printer className="h-3 w-3" /> PDF Receipt
          </Button>

          <Button
            type="button"
            onClick={() => window.print()}
            variant="outline"
            size="sm"
            className="h-7 text-[11px] font-bold gap-1 cursor-pointer bg-white dark:bg-zinc-800"
          >
            <Printer className="h-3 w-3" /> Print
          </Button>
        </div>
      </div>

      {/* VALIDATION ERROR BANNER */}
      {result.validationError && (
        <div
          role="alert"
          className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 rounded-xl flex items-center gap-2.5 text-xs font-bold text-rose-800 dark:text-rose-300"
        >
          <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
          <span>{result.validationError}</span>
        </div>
      )}

      {/* 2. SPLIT PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT INPUT PANE */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-4">
          {/* MODE 1: ODOMETER MODE */}
          {mode === "odometer" && (
            <div className="space-y-2.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Gauge className="h-4 w-4 text-sky-600" /> Odometer Readings ({result.distanceUnitName})
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="gas-start-odometer" className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    Start Odometer
                  </label>
                  <Input
                    id="gas-start-odometer"
                    type="number"
                    value={startOdo}
                    onChange={(e) => setStartOdo(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="gas-end-odometer" className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    End Odometer
                  </label>
                  <Input
                    id="gas-end-odometer"
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
              <label htmlFor="gas-trip-distance" className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Car className="h-4 w-4 text-sky-600" /> Trip Meter Distance ({result.distanceUnitName})
              </label>
              <Input
                id="gas-trip-distance"
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
                {multiTankLogs.length < 10 && (
                  <Button
                    type="button"
                    onClick={addFillUp}
                    variant="outline"
                    size="sm"
                    className="h-6 text-[11px] font-bold gap-1 cursor-pointer"
                  >
                    <Plus className="h-3 w-3" /> Add Tank
                  </Button>
                )}
              </div>

              {multiTankLogs.length === 0 ? (
                <div className="p-4 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 text-center text-xs text-slate-500 space-y-2">
                  <p>No fill-up entries recorded.</p>
                  <Button type="button" onClick={addFillUp} size="sm" variant="outline" className="text-xs font-bold">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add First Fill-Up
                  </Button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {multiTankLogs.map((log, index) => (
                    <div
                      key={log.id}
                      className="flex items-center gap-2 p-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/60 text-xs font-sans tabular-nums"
                    >
                      <span className="font-bold text-zinc-400 w-12 text-[11px]">Tank #{index + 1}</span>
                      <Input
                        id={`gas-multi-tank-dist-${log.id}`}
                        type="number"
                        value={log.distance}
                        onChange={(e) => updateFillUp(log.id, "distance", Number(e.target.value))}
                        placeholder={result.distanceUnitName}
                        aria-label={`Tank #${index + 1} distance in ${result.distanceUnitName}`}
                        className="h-7 text-xs font-sans tabular-nums w-24"
                      />
                      <Input
                        id={`gas-multi-tank-fuel-${log.id}`}
                        type="number"
                        value={log.fuelAdded}
                        onChange={(e) => updateFillUp(log.id, "fuelAdded", Number(e.target.value))}
                        placeholder={result.fuelVolumeUnitName}
                        aria-label={`Tank #${index + 1} fuel volume in ${result.fuelVolumeUnitName}`}
                        className="h-7 text-xs font-sans tabular-nums w-24"
                      />
                      <Input
                        id={`gas-multi-tank-price-${log.id}`}
                        type="number"
                        step="0.01"
                        value={log.pricePerUnit}
                        onChange={(e) => updateFillUp(log.id, "pricePerUnit", Number(e.target.value))}
                        placeholder="Price"
                        aria-label={`Tank #${index + 1} price per unit`}
                        className="h-7 text-xs font-sans tabular-nums w-20"
                      />
                      <button
                        type="button"
                        onClick={() => removeFillUp(log.id)}
                        aria-label={`Delete Tank #${index + 1}`}
                        className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MODE 4: TANK RANGE PLANNER MODE */}
          {mode === "tank_range" && (
            <div className="space-y-2.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Fuel className="h-4 w-4 text-sky-600" /> Fuel Tank Capacity &amp; Distance
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="gas-tank-capacity" className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    Tank Capacity ({result.fuelVolumeUnitName})
                  </label>
                  <Input
                    id="gas-tank-capacity"
                    type="number"
                    value={tankCapacity}
                    onChange={(e) => setTankCapacity(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="gas-range-trip-dist" className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    Sample Trip Distance ({result.distanceUnitName})
                  </label>
                  <Input
                    id="gas-range-trip-dist"
                    type="number"
                    value={tripDistance}
                    onChange={(e) => setTripDistance(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Fuel Added & Fuel Price (Odometer, Trip, and Range Modes) */}
          {(mode === "odometer" || mode === "trip" || mode === "tank_range") && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="space-y-1">
                <label htmlFor="gas-fuel-added" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Fuel Volume Added ({result.fuelVolumeUnitName})
                </label>
                <Input
                  id="gas-fuel-added"
                  type="number"
                  value={fuelAdded}
                  onChange={(e) => setFuelAdded(Number(e.target.value))}
                  className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="gas-fuel-price" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Fuel Price ({currencySymbol} per {result.fuelVolumeUnitName})
                </label>
                <Input
                  id="gas-fuel-price"
                  type="number"
                  step="0.01"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(Number(e.target.value))}
                  className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
            </div>
          )}

          {/* Fuel Grade & Annual Driving Distance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
            <div className="space-y-1">
              <label htmlFor="gas-fuel-type" className="font-bold text-zinc-700 dark:text-zinc-300">
                Fuel Grade &amp; Energy Type
              </label>
              <select
                id="gas-fuel-type"
                value={fuelType}
                onChange={(e) => handleFuelTypeChange(e.target.value as FuelType)}
                className="w-full h-8 font-bold px-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer text-xs"
              >
                <option value="gasoline">Regular Petrol (E20 Blend - 87-91 Octane)</option>
                <option value="premium_petrol">Premium Petrol (XP95 / Speed - 95+ Octane)</option>
                <option value="diesel">Clean Diesel (Low Sulfur)</option>
                <option value="cng">CNG - Compressed Natural Gas (km/kg)</option>
                <option value="flex_fuel">Flex-Fuel (E85 Bio-Ethanol Blend)</option>
                <option value="lpg">Auto LPG (Liquefied Petroleum Gas)</option>
                <option value="electric">Battery Electric EV (km/kWh)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="gas-annual-mileage" className="font-bold text-zinc-700 dark:text-zinc-300">
                Estimated Annual Driving ({result.distanceUnitName})
              </label>
              <Input
                id="gas-annual-mileage"
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
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-sky-600 cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <Sliders className="h-3.5 w-3.5" /> Real-World Efficiency Penalty Modifiers
              </span>
              {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showAdvanced && (
              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-2 text-xs text-slate-800 dark:text-slate-200 font-semibold">
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
                    Winter Cold Weather (-10%)
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={penalties.roofCargo}
                      onChange={(e) => setPenalties({ ...penalties, roofCargo: e.target.checked })}
                      className="rounded text-sky-600 accent-sky-600 cursor-pointer"
                    />
                    Roof Cargo Box (-15%)
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DASHBOARD (Col 5) */}
        <div
          aria-live="polite"
          className="lg:col-span-5 bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-950 text-white p-4 rounded-2xl shadow-md space-y-3.5"
        >
          <div className="flex items-center justify-between border-b border-white/20 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-100 flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-white" /> Fuel Efficiency Dashboard
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
              {unitSystem === "indian" ? "Indian (km/l)" : unitSystem === "us" ? "US MPG" : unitSystem === "metric" ? "Metric (L/100km)" : "UK Imperial MPG"}
            </span>
          </div>

          {/* Primary Fuel Economy Card */}
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200 block">
              Calculated Fuel Mileage
            </span>
            <div className="text-3xl sm:text-4xl font-black font-sans tabular-nums tracking-tight text-white">
              {result.validationError ? (
                <span className="text-lg text-rose-200">Invalid Input</span>
              ) : unitSystem === "indian" ? (
                `${result.kmL} ${result.efficiencyUnitName}`
              ) : unitSystem === "metric" ? (
                `${result.l100km} L/100km`
              ) : (
                `${result.usMPG} MPG`
              )}
            </div>
            {!result.validationError && (
              <p className="text-[11px] text-sky-100 font-medium">
                Equivalent: {result.kmL} km/l | {result.usMPG} US MPG | {result.l100km} L/100km
              </p>
            )}
          </div>

          {/* Continuous Visual Efficiency Gauge */}
          <div className="p-2.5 bg-white/10 backdrop-blur-xs rounded-xl border border-white/20 space-y-1.5 text-xs">
            <div className="flex justify-between font-bold text-[11px]">
              <span className="text-sky-200">Efficiency Scale</span>
              <span className="text-white">{result.validationError ? "No result" : result.ratingLabel}</span>
            </div>

            {/* Continuous Progress Meter Bar */}
            <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  result.validationError
                    ? "bg-transparent"
                    : result.rating === "hybrid"
                    ? "bg-emerald-400"
                    : result.rating === "excellent"
                    ? "bg-teal-300"
                    : result.rating === "average"
                    ? "bg-yellow-400"
                    : "bg-rose-400"
                }`}
                style={{ width: `${result.validationError ? 0 : result.ratingPercentage}%` }}
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
              <span className="text-[9px] uppercase font-bold text-sky-200 block">
                Trip Fuel Cost
              </span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">
                {result.validationError ? "—" : formatMoney(result.tripFuelCost, currencySymbol)}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-sky-200 block">
                Cost Per {result.distanceUnitName}
              </span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">
                {result.validationError ? "—" : formatMoney(result.costPerDistanceUnit, currencySymbol)}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-sky-200 block">Driving Range</span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">
                {result.validationError ? "—" : `${result.totalTankRange.toLocaleString()} ${result.distanceUnitName}`}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-sky-200 block">Full Tank Cost</span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">
                {result.validationError ? "—" : formatMoney(result.costToFillTank, currencySymbol)}
              </span>
            </div>
          </div>

          {/* Annual Spending & CO2 Emissions */}
          <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/20 space-y-1 text-xs">
            <span className="text-[9px] font-bold uppercase text-sky-200 flex items-center gap-1">
              <Leaf className="h-3 w-3 text-emerald-300" /> Annual Projection ({annualMileage.toLocaleString()} {result.distanceUnitName})
            </span>
            <div className="flex justify-between font-sans tabular-nums text-xs font-bold text-white">
              <span>Annual Fuel: {result.validationError ? "—" : formatMoney(result.annualFuelCost, currencySymbol)}</span>
              <span className="text-emerald-300">{result.validationError ? "—" : `${result.carbonFootprintTons} Tons CO2`}</span>
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
