"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Fuel,
  DollarSign,
  Car,
  Users,
  Zap,
  Share2,
  Printer,
  Check,
  ChevronUp,
  ChevronDown,
  Sliders,
  Leaf,
  BookmarkPlus,
  Trash2,
  RotateCcw,
  Download,
  FileCode,
  FileText,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CalcMode,
  UnitSystem,
  FuelType,
  EfficiencyPenaltyFlags,
  FuelCostResult,
  SavedFuelCalculation,
} from "@/app/calculators/fuel-cost-calculator/types";
import { calculateFuelCost } from "@/app/calculators/fuel-cost-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

// Currency formatting helper: always 2 decimal places
export function fmtMoney(val: number, symbol: string = "$"): string {
  if (isNaN(val)) return `${symbol}0.00`;
  return `${symbol}${val.toFixed(2)}`;
}

export function FuelCostCalculator() {
  // Inputs State
  const [mode, setMode] = useState<CalcMode>("trip");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");
  const [fuelType, setFuelType] = useState<FuelType>("gasoline");

  // Trip Mode Inputs
  const [distance, setDistance] = useState<number>(300);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [efficiency, setEfficiency] = useState<number>(25);
  const [fuelPrice, setFuelPrice] = useState<number>(3.5);
  const [passengers, setPassengers] = useState<number>(1);
  const [tolls, setTolls] = useState<number>(0);
  const [parking, setParking] = useState<number>(0);

  // Commute Planner
  const [workDays, setWorkDays] = useState<number>(22);

  // MPG Solver
  const [startOdo, setStartOdo] = useState<number>(10000);
  const [endOdo, setEndOdo] = useState<number>(10350);
  const [fuelAdded, setFuelAdded] = useState<number>(14);

  // EV Comparison
  const [evKwhPer100, setEvKwhPer100] = useState<number>(30);
  const [electricityRate, setElectricityRate] = useState<number>(0.15);

  // Real-World Penalties
  const [penalties, setPenalties] = useState<EfficiencyPenaltyFlags>({
    roofRack: false,
    highSpeed: false,
    towing: false,
    winterCold: false,
  });

  // UI State
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [showSavedDrawer, setShowSavedDrawer] = useState<boolean>(false);
  const [savedCalculations, setSavedCalculations] = useState<SavedFuelCalculation[]>([]);

  // Load saved calculations from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("fuel_calc_saved_v1");
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Compute Results
  const result: FuelCostResult = useMemo(() => {
    return calculateFuelCost(
      mode,
      unitSystem,
      fuelType,
      distance,
      isRoundTrip,
      efficiency,
      fuelPrice,
      passengers,
      tolls,
      parking,
      0,
      penalties,
      workDays,
      startOdo,
      endOdo,
      fuelAdded,
      evKwhPer100,
      electricityRate
    );
  }, [
    mode,
    unitSystem,
    fuelType,
    distance,
    isRoundTrip,
    efficiency,
    fuelPrice,
    passengers,
    tolls,
    parking,
    penalties,
    workDays,
    startOdo,
    endOdo,
    fuelAdded,
    evKwhPer100,
    electricityRate,
  ]);

  // Copy Active Result Metric
  const handleCopyResult = () => {
    let text = "";
    if (mode === "trip") {
      text = `Total Trip Expense: ${fmtMoney(result.totalCost, currencySymbol)} (${result.distanceFormatted}, ${result.fuelVolumeNeeded} ${result.fuelVolumeUnit}, CO2: ${result.carbonFootprintKg} kg)`;
    } else if (mode === "commute") {
      text = `Monthly Commute Cost: ${fmtMoney(result.monthlyCommuteCost || 0, currencySymbol)} (Daily: ${fmtMoney(result.dailyFuelCost || 0, currencySymbol)}, Annual: ${fmtMoney(result.annualCommuteCost || 0, currencySymbol)})`;
    } else if (mode === "mpg_solver") {
      text = `Calculated Fuel Economy: ${result.calculatedMPG?.toFixed(2)} MPG (${result.calculatedL100km?.toFixed(2)} L/100km) | ${result.distanceFormatted} on ${fuelAdded} ${result.fuelVolumeUnit}`;
    } else if (mode === "ev_compare") {
      const diffText = result.isEvPremium
        ? `EV Premium: ${fmtMoney(Math.abs(result.evSavings || 0), currencySymbol)} more than gas`
        : `EV Savings: ${fmtMoney(result.evSavings || 0, currencySymbol)} per trip`;
      text = `Gasoline: ${fmtMoney(result.gasTripCost || 0, currencySymbol)} | EV: ${fmtMoney(result.evTripCost || 0, currencySymbol)} | ${diffText}`;
    }
    navigator.clipboard.writeText(text);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2000);
  };

  // Copy Complete Briefing Summary
  const handleCopySummary = () => {
    let text = `🚗 CalcPlatform Fuel Cost Calculation Briefing\n`;
    text += `Generated: ${new Date().toLocaleString()}\n`;
    text += `Mode: ${mode.toUpperCase()} | Unit System: ${unitSystem.toUpperCase()}\n`;
    text += `Distance: ${result.distanceFormatted}\n`;

    if (mode === "trip") {
      text += `Total Trip Expense: ${fmtMoney(result.totalCost, currencySymbol)}\n`;
      text += `Fuel Needed: ${result.fuelVolumeNeeded} ${result.fuelVolumeUnit}\n`;
      text += `Pure Fuel Cost: ${fmtMoney(result.fuelOnlyCost, currencySymbol)}\n`;
      if (tolls + parking > 0) {
        text += `Tolls & Parking: ${fmtMoney(tolls + parking, currencySymbol)}\n`;
      }
      if (passengers > 1) {
        text += `Passenger Split (${passengers} people): ${fmtMoney(result.costPerPerson, currencySymbol)} each\n`;
      }
      text += `Estimated CO2: ${result.carbonFootprintKg} kg CO2\n`;
    } else if (mode === "commute") {
      text += `Daily Commute Cost: ${fmtMoney(result.dailyFuelCost || 0, currencySymbol)} (${result.dailyFuelVolume} ${result.fuelVolumeUnit}/day)\n`;
      text += `Weekly Commute Cost: ${fmtMoney(result.weeklyCommuteCost || 0, currencySymbol)}\n`;
      text += `Monthly Commute Cost (${workDays} days): ${fmtMoney(result.monthlyCommuteCost || 0, currencySymbol)} (${result.monthlyFuelVolume} ${result.fuelVolumeUnit}/month)\n`;
      text += `Annual Commute Cost: ${fmtMoney(result.annualCommuteCost || 0, currencySymbol)}\n`;
    } else if (mode === "mpg_solver") {
      text += `Start Odometer: ${startOdo.toLocaleString()} | End Odometer: ${endOdo.toLocaleString()}\n`;
      text += `Distance Driven: ${result.distanceFormatted}\n`;
      text += `Fuel Added: ${fuelAdded} ${result.fuelVolumeUnit}\n`;
      text += `Calculated Economy: ${result.calculatedMPG?.toFixed(2)} MPG (${result.calculatedL100km?.toFixed(2)} L/100km)\n`;
      text += `Fuel Expense: ${fmtMoney(result.fuelOnlyCost, currencySymbol)} | CO2: ${result.carbonFootprintKg} kg\n`;
    } else if (mode === "ev_compare") {
      text += `Gasoline Cost (at ${efficiency} MPG, ${currencySymbol}${fuelPrice}/${result.fuelVolumeUnit}): ${fmtMoney(result.gasTripCost || 0, currencySymbol)}\n`;
      text += `EV Electricity Cost (at ${evKwhPer100} kWh/100mi, ${currencySymbol}${electricityRate}/kWh): ${fmtMoney(result.evTripCost || 0, currencySymbol)}\n`;
      text += result.isEvPremium
        ? `EV Premium: ${fmtMoney(Math.abs(result.evSavings || 0), currencySymbol)} more than gasoline\n`
        : `EV Savings: ${fmtMoney(result.evSavings || 0, currencySymbol)} per trip\n`;
    }

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // CSV Export Download
  const handleDownloadCsv = () => {
    let headers: string[] = [];
    let row: (string | number)[] = [];

    if (mode === "trip") {
      headers = [
        "Mode",
        "Distance",
        "Distance Unit",
        "Round Trip",
        "Fuel Economy",
        "Fuel Economy Unit",
        "Fuel Price",
        "Fuel Required",
        "Fuel Cost",
        "Tolls",
        "Parking",
        "Passengers",
        "Cost Per Person",
        "Total Cost",
        "CO2 (kg)",
        "Currency",
        "Timestamp",
      ];
      row = [
        "Road Trip",
        distance,
        result.distanceUnitName,
        isRoundTrip ? "Yes" : "No",
        result.effectiveEfficiency,
        result.efficiencyUnitName,
        fuelPrice,
        result.fuelVolumeNeeded,
        result.fuelOnlyCost,
        tolls,
        parking,
        passengers,
        result.costPerPerson,
        result.totalCost,
        result.carbonFootprintKg,
        currencySymbol,
        new Date().toISOString(),
      ];
    } else if (mode === "commute") {
      headers = [
        "Mode",
        "Daily Distance",
        "Work Days Per Month",
        "Monthly Distance",
        "Fuel Economy",
        "Fuel Price",
        "Daily Fuel",
        "Monthly Fuel",
        "Daily Cost",
        "Weekly Cost",
        "Monthly Cost",
        "Annual Cost",
        "CO2 (kg)",
        "Currency",
        "Timestamp",
      ];
      row = [
        "Commute",
        distance,
        workDays,
        result.monthlyDistanceFormatted || "",
        result.effectiveEfficiency,
        fuelPrice,
        result.dailyFuelVolume || 0,
        result.monthlyFuelVolume || 0,
        result.dailyFuelCost || 0,
        result.weeklyCommuteCost || 0,
        result.monthlyCommuteCost || 0,
        result.annualCommuteCost || 0,
        result.carbonFootprintKg,
        currencySymbol,
        new Date().toISOString(),
      ];
    } else if (mode === "mpg_solver") {
      headers = [
        "Mode",
        "Start Odometer",
        "End Odometer",
        "Distance",
        "Distance Unit",
        "Fuel Added",
        "Fuel Added Unit",
        "Calculated MPG",
        "Calculated L/100km",
        "Fuel Price",
        "Fuel Cost",
        "CO2 (kg)",
        "Timestamp",
      ];
      row = [
        "MPG Solver",
        startOdo,
        endOdo,
        Math.max(0, endOdo - startOdo),
        result.distanceUnitName,
        fuelAdded,
        result.fuelVolumeUnit,
        result.calculatedMPG || 0,
        result.calculatedL100km || 0,
        fuelPrice,
        result.fuelOnlyCost,
        result.carbonFootprintKg,
        new Date().toISOString(),
      ];
    } else {
      headers = [
        "Mode",
        "Distance",
        "Gas MPG",
        "Gas Price",
        "Gas Cost",
        "EV Rate (kWh/100mi)",
        "EV Total Energy (kWh)",
        "Electricity Rate ($/kWh)",
        "EV Cost",
        "EV Savings / Premium",
        "CO2 (kg)",
        "Timestamp",
      ];
      row = [
        "EV vs Gas",
        distance,
        efficiency,
        fuelPrice,
        result.gasTripCost || 0,
        evKwhPer100,
        result.evKwhTotal || 0,
        electricityRate,
        result.evTripCost || 0,
        result.evSavings || 0,
        result.carbonFootprintKg,
        new Date().toISOString(),
      ];
    }

    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      row.map((val) => `"${val}"`).join(",");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fuel_cost_${mode}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // TXT Audit Export Download
  const handleDownloadTxt = () => {
    let txt = "============================================================\n";
    txt += "CALCPLATFORM FUEL COST & LOGISTICS AUDIT REPORT\n";
    txt += "============================================================\n";
    txt += `Timestamp: ${new Date().toLocaleString()}\n`;
    txt += `Mode: ${mode.toUpperCase()} | Unit System: ${unitSystem.toUpperCase()}\n\n`;

    if (mode === "trip") {
      txt += `Trip Distance: ${result.distanceFormatted} (${isRoundTrip ? "Round-Trip" : "One-Way"})\n`;
      txt += `Fuel Efficiency: ${result.effectiveEfficiency} ${result.efficiencyUnitName}\n`;
      txt += `Fuel Unit Price: ${currencySymbol}${fuelPrice} per ${unitSystem === "imperial" ? "Gallon" : "Liter"}\n`;
      txt += `Total Fuel Required: ${result.fuelVolumeNeeded} ${result.fuelVolumeUnit}\n`;
      txt += `Fuel Expense: ${fmtMoney(result.fuelOnlyCost, currencySymbol)}\n`;
      txt += `Tolls: ${fmtMoney(tolls, currencySymbol)} | Parking: ${fmtMoney(parking, currencySymbol)}\n`;
      txt += `Total Trip Expense: ${fmtMoney(result.totalCost, currencySymbol)}\n`;
      if (passengers > 1) {
        txt += `Passenger Split (${passengers} people): ${fmtMoney(result.costPerPerson, currencySymbol)} each\n`;
      }
      txt += `Cost Per Distance Unit: ${fmtMoney(result.costPerDistanceUnit, currencySymbol)} / ${result.distanceUnitName}\n`;
      txt += `Estimated CO2 Emissions: ${result.carbonFootprintKg} kg CO2\n`;
    } else if (mode === "commute") {
      txt += `Daily Round-Trip Distance: ${distance} ${result.distanceUnitName}\n`;
      txt += `Monthly Work Days: ${workDays} days\n`;
      txt += `Monthly Commute Distance: ${result.monthlyDistanceFormatted}\n`;
      txt += `Daily Fuel Cost: ${fmtMoney(result.dailyFuelCost || 0, currencySymbol)} (${result.dailyFuelVolume} ${result.fuelVolumeUnit})\n`;
      txt += `Weekly Commute Cost: ${fmtMoney(result.weeklyCommuteCost || 0, currencySymbol)}\n`;
      txt += `Monthly Commute Cost: ${fmtMoney(result.monthlyCommuteCost || 0, currencySymbol)} (${result.monthlyFuelVolume} ${result.fuelVolumeUnit})\n`;
      txt += `Annual Commute Cost: ${fmtMoney(result.annualCommuteCost || 0, currencySymbol)}\n`;
    } else if (mode === "mpg_solver") {
      txt += `Start Odometer: ${startOdo.toLocaleString()} | End Odometer: ${endOdo.toLocaleString()}\n`;
      txt += `Net Distance Driven: ${result.distanceFormatted}\n`;
      txt += `Fuel Added: ${fuelAdded} ${result.fuelVolumeUnit}\n`;
      txt += `Calculated Fuel Economy: ${result.calculatedMPG?.toFixed(2)} MPG\n`;
      txt += `Metric Equivalent: ${result.calculatedL100km?.toFixed(2)} L/100km\n`;
      txt += `Fuel Cost: ${fmtMoney(result.fuelOnlyCost, currencySymbol)}\n`;
      txt += `Estimated CO2: ${result.carbonFootprintKg} kg CO2\n`;
    } else {
      txt += `Trip Distance: ${result.distanceFormatted}\n`;
      txt += `Gasoline Vehicle: ${efficiency} MPG at ${currencySymbol}${fuelPrice}/gal -> ${fmtMoney(result.gasTripCost || 0, currencySymbol)}\n`;
      txt += `Electric Vehicle: ${evKwhPer100} kWh/100mi (${result.evKwhTotal} kWh total) at ${currencySymbol}${electricityRate}/kWh -> ${fmtMoney(result.evTripCost || 0, currencySymbol)}\n`;
      txt += result.isEvPremium
        ? `EV Premium: ${fmtMoney(Math.abs(result.evSavings || 0), currencySymbol)} more expensive than gasoline\n`
        : `EV Savings: ${fmtMoney(result.evSavings || 0, currencySymbol)} net savings per trip\n`;
    }

    txt += "\n============================================================\n";
    txt += "Official Report generated by CalcPlatform\n";
    txt += "============================================================\n";

    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fuel_cost_${mode}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // LaTeX Formula Export
  const handleCopyLatex = () => {
    let latex = "";
    if (mode === "trip" || mode === "commute") {
      if (unitSystem === "imperial") {
        latex = `\\text{Fuel Needed (gal)} = \\frac{\\text{Distance (mi)}}{\\text{MPG}} = \\frac{${distance * (isRoundTrip ? 2 : 1)}}{${result.effectiveEfficiency}} = ${result.fuelVolumeNeeded}\\,\\text{gal}\n\n`;
        latex += `\\text{Total Cost} = (\\text{Fuel Needed} \\times P_{\\text{fuel}}) + \\text{Tolls} + \\text{Parking} = (${result.fuelVolumeNeeded} \\times ${fuelPrice}) + ${tolls} + ${parking} = ${result.totalCost}`;
      } else {
        latex = `\\text{Fuel Needed (L)} = \\text{Distance (km)} \\times \\frac{\\text{L/100km}}{100} = ${distance * (isRoundTrip ? 2 : 1)} \\times \\frac{${result.effectiveEfficiency}}{100} = ${result.fuelVolumeNeeded}\\,\\text{L}\n\n`;
        latex += `\\text{Total Cost} = (\\text{Fuel Needed} \\times P_{\\text{fuel}}) + \\text{Tolls} + \\text{Parking} = (${result.fuelVolumeNeeded} \\times ${fuelPrice}) + ${tolls} + ${parking} = ${result.totalCost}`;
      }
    } else if (mode === "mpg_solver") {
      const delta = Math.max(0, endOdo - startOdo);
      if (unitSystem === "imperial") {
        latex = `\\text{MPG} = \\frac{\\text{Odo}_{\\text{end}} - \\text{Odo}_{\\text{start}}}{\\text{Fuel Added (gal)}} = \\frac{${endOdo} - ${startOdo}}{${fuelAdded}} = \\frac{${delta}}{${fuelAdded}} = ${result.calculatedMPG?.toFixed(2)}\\,\\text{MPG}`;
      } else {
        latex = `\\text{L/100km} = \\frac{\\text{Fuel Added (L)}}{\\text{Distance (km)}} \\times 100 = \\frac{${fuelAdded}}{${delta}} \\times 100 = ${result.calculatedL100km?.toFixed(2)}\\,\\text{L/100km}`;
      }
    } else {
      latex = `\\text{Gas Cost} = \\frac{\\text{Distance}}{\\text{MPG}} \\times P_{\\text{gas}} = \\frac{${distance}}{${efficiency}} \\times ${fuelPrice} = ${result.gasTripCost}\n\n`;
      latex += `\\text{EV Cost} = \\left(\\frac{\\text{Distance}}{100} \\times \\text{kWh/100mi}\\right) \\times P_{\\text{elec}} = \\left(\\frac{${distance}}{100} \\times ${evKwhPer100}\\right) \\times ${electricityRate} = ${result.evTripCost}\n\n`;
      latex += `\\text{EV Savings} = \\text{Gas Cost} - \\text{EV Cost} = ${result.gasTripCost} - ${result.evTripCost} = ${result.evSavings}`;
    }

    navigator.clipboard.writeText(latex);
    alert("LaTeX formula copied to clipboard!");
  };

  // Save Raw Calculation State
  const handleSaveCalculation = () => {
    const newRecord: SavedFuelCalculation = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      label: `${mode.toUpperCase()} — ${result.distanceFormatted} (${fmtMoney(result.totalCost, currencySymbol)})`,
      mode,
      unitSystem,
      currencySymbol,
      fuelType,
      distance,
      isRoundTrip,
      efficiency,
      fuelPrice,
      passengers,
      tolls,
      parking,
      workDays,
      startOdo,
      endOdo,
      fuelAdded,
      evKwhPer100,
      electricityRate,
      penalties: { ...penalties },
      summaryOutput: `${result.distanceFormatted} | Total: ${fmtMoney(result.totalCost, currencySymbol)}`,
    };

    const updated = [newRecord, ...savedCalculations.slice(0, 19)];
    setSavedCalculations(updated);
    try {
      localStorage.setItem("fuel_calc_saved_v1", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Restore Raw State
  const handleRestoreCalculation = (record: SavedFuelCalculation) => {
    setMode(record.mode);
    setUnitSystem(record.unitSystem);
    setCurrencySymbol(record.currencySymbol);
    setFuelType(record.fuelType);
    setDistance(record.distance);
    setIsRoundTrip(record.isRoundTrip);
    setEfficiency(record.efficiency);
    setFuelPrice(record.fuelPrice);
    setPassengers(record.passengers);
    setTolls(record.tolls);
    setParking(record.parking);
    setWorkDays(record.workDays);
    setStartOdo(record.startOdo);
    setEndOdo(record.endOdo);
    setFuelAdded(record.fuelAdded);
    setEvKwhPer100(record.evKwhPer100);
    setElectricityRate(record.electricityRate);
    setPenalties({ ...record.penalties });
    setShowSavedDrawer(false);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("fuel_calc_saved_v1", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // P2-05 Fix: Mode-Specific PDF Report Generation Data
  const reportData: CalculatorReportData = useMemo(() => {
    if (mode === "mpg_solver") {
      const delta = Math.max(0, endOdo - startOdo);
      return {
        meta: {
          reportTitle: "Vehicle Fuel Economy (MPG Solver) Audit Briefing",
          generatedDate: new Date().toLocaleDateString(),
          generatedTime: new Date().toLocaleTimeString(),
          calculatorName: "Fuel Cost Calculator — MPG Solver",
        },
        keyMetrics: [
          { label: "Calculated Fuel Economy", value: `${result.calculatedMPG?.toFixed(2)} MPG`, highlight: true },
          { label: "Metric Equivalent", value: `${result.calculatedL100km?.toFixed(2)} L/100km` },
          { label: "Distance Traveled", value: `${delta.toLocaleString()} ${result.distanceUnitName}` },
          { label: "Fuel Added", value: `${fuelAdded} ${result.fuelVolumeUnit}` },
        ],
        sections: [
          {
            title: "Odometer & Fuel Consumption Breakdown",
            items: [
              { label: "Start Odometer Reading", value: `${startOdo.toLocaleString()} ${result.distanceUnitName}` },
              { label: "End Odometer Reading", value: `${endOdo.toLocaleString()} ${result.distanceUnitName}` },
              { label: "Net Distance Driven", value: `${delta.toLocaleString()} ${result.distanceUnitName}` },
              { label: "Fuel Volume Added", value: `${fuelAdded} ${result.fuelVolumeUnit}` },
              { label: "Fuel Price Assumption", value: `${currencySymbol}${fuelPrice} / ${result.fuelVolumeUnit}` },
              { label: "Estimated Fuel Cost", value: fmtMoney(result.fuelOnlyCost, currencySymbol) },
              { label: "Cost Per Unit Distance", value: `${fmtMoney(result.costPerDistanceUnit, currencySymbol)} / ${result.distanceUnitName}` },
              { label: "Estimated CO2 Footprint", value: `${result.carbonFootprintKg} kg CO2` },
            ],
          },
        ],
      };
    }

    return {
      meta: {
        reportTitle: "Vehicle Trip Fuel Cost & Expense Briefing",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Fuel Cost Calculator",
      },
      keyMetrics: [
        { label: "Total Trip Expense", value: fmtMoney(result.totalCost, currencySymbol), highlight: true },
        { label: "Cost Per Passenger", value: `${fmtMoney(result.costPerPerson, currencySymbol)} (${passengers} split)` },
        { label: "Fuel Volume Required", value: `${result.fuelVolumeNeeded} ${result.fuelVolumeUnit}` },
        { label: "Cost Per Unit Distance", value: `${fmtMoney(result.costPerDistanceUnit, currencySymbol)} / ${result.distanceUnitName}` },
      ],
      sections: [
        {
          title: "Trip Logistics & Breakdown",
          items: [
            { label: "Calculated Distance", value: `${result.distanceFormatted} (${isRoundTrip ? "Round-Trip" : "One-Way"})` },
            { label: "Fuel Price Rate", value: `${currencySymbol}${fuelPrice} per ${unitSystem === "imperial" ? "Gallon" : "Liter"}` },
            { label: "Effective Fuel Economy", value: `${result.effectiveEfficiency} ${result.efficiencyUnitName}` },
            { label: "Pure Fuel Cost", value: fmtMoney(result.fuelOnlyCost, currencySymbol) },
            { label: "Tolls & Parking Fees", value: fmtMoney(result.tollsAndExpenses, currencySymbol) },
            { label: "Estimated CO2 Footprint", value: `${result.carbonFootprintKg} kg CO2` },
          ],
        },
        mode === "commute"
          ? {
              title: "Commute Budget Outlook",
              items: [
                { label: "Daily Fuel Cost", value: fmtMoney(result.dailyFuelCost || 0, currencySymbol) },
                { label: "Weekly Commute Cost", value: fmtMoney(result.weeklyCommuteCost || 0, currencySymbol) },
                { label: "Monthly Commute Cost", value: `${fmtMoney(result.monthlyCommuteCost || 0, currencySymbol)} (${workDays} work days)` },
                { label: "Annual Commute Cost", value: fmtMoney(result.annualCommuteCost || 0, currencySymbol) },
                { label: "Monthly Distance Traveled", value: result.monthlyDistanceFormatted || "" },
                { label: "Monthly Fuel Consumption", value: `${result.monthlyFuelVolume} ${result.fuelVolumeUnit}` },
              ],
            }
          : mode === "ev_compare"
          ? {
              title: "EV vs. Gas Cost Comparison",
              items: [
                { label: "Gasoline Trip Cost", value: fmtMoney(result.gasTripCost || 0, currencySymbol) },
                { label: "Electric EV Trip Cost", value: fmtMoney(result.evTripCost || 0, currencySymbol) },
                {
                  label: result.isEvPremium ? "Net EV Premium (Gas Cheaper)" : "Net EV Savings",
                  value: `${fmtMoney(Math.abs(result.evSavings || 0), currencySymbol)} per trip`,
                },
                { label: "EV Energy Consumption", value: `${result.evKwhTotal} kWh total` },
              ],
            }
          : {
              title: "Passenger Cost Sharing Roster",
              items: [
                { label: "Total Group Members", value: `${passengers} Passenger(s)` },
                { label: "Equal Contribution Share", value: `${fmtMoney(result.costPerPerson, currencySymbol)} per person` },
              ],
            },
      ],
    };
  }, [result, currencySymbol, passengers, isRoundTrip, fuelPrice, unitSystem, mode, workDays, startOdo, endOdo, fuelAdded]);

  return (
    <div className="space-y-4">
      {/* 1. TOP TOOLBAR — CLEAN & LIGHT HARMONIOUS THEME */}
      <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-3 print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Mode Selector (Col 7) */}
          <div className="md:col-span-7 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Trip Calculation Mode
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setMode("trip")}
                className={`py-1.5 px-2.5 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "trip"
                    ? "bg-emerald-600 text-white font-extrabold shadow-md shadow-emerald-600/30 border-b-2 border-emerald-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Road Trip
              </button>
              <button
                type="button"
                onClick={() => setMode("commute")}
                className={`py-1.5 px-2.5 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "commute"
                    ? "bg-emerald-600 text-white font-extrabold shadow-md shadow-emerald-600/30 border-b-2 border-emerald-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Commute
              </button>
              <button
                type="button"
                onClick={() => setMode("mpg_solver")}
                className={`py-1.5 px-2.5 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "mpg_solver"
                    ? "bg-emerald-600 text-white font-extrabold shadow-md shadow-emerald-600/30 border-b-2 border-emerald-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                MPG Solver
              </button>
              <button
                type="button"
                onClick={() => setMode("ev_compare")}
                className={`py-1.5 px-2.5 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "ev_compare"
                    ? "bg-emerald-600 text-white font-extrabold shadow-md shadow-emerald-600/30 border-b-2 border-emerald-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                EV vs. Gas
              </button>
            </div>
          </div>

          {/* Currency & Action Toolbar (Col 5) */}
          <div className="md:col-span-5 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Currency &amp; Export Tools
            </span>
            <div className="flex items-center gap-1.5">
              <label htmlFor="fuel-currency-select" className="sr-only">Currency</label>
              <select
                id="fuel-currency-select"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                className="h-8 text-xs font-bold px-2 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 border border-slate-200 dark:border-zinc-700 rounded-lg cursor-pointer flex-1"
              >
                <option value="$">$ (USD)</option>
                <option value="€">€ (EUR)</option>
                <option value="£">£ (GBP)</option>
                <option value="₹">₹ (INR)</option>
                <option value="CA$">CA$ (CAD)</option>
                <option value="A$">A$ (AUD)</option>
              </select>

              <Button
                type="button"
                onClick={handleCopyResult}
                variant="outline"
                size="sm"
                className="h-8 text-xs font-bold gap-1 cursor-pointer bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                title="Copy Active Result"
              >
                {copiedResult ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                {copiedResult ? "Copied" : "Copy Result"}
              </Button>

              <Button
                type="button"
                onClick={() => setShowReportModal(true)}
                variant="outline"
                size="sm"
                className="h-8 text-xs font-bold gap-1 cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white border-b-2 border-emerald-800 shadow-md shadow-emerald-600/20"
              >
                <Printer className="h-3.5 w-3.5" /> PDF Receipt
              </Button>
            </div>
          </div>
        </div>

        {/* Row 2: Secondary Action Toolbar & Unit Switcher */}
        <div className="pt-2.5 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Distance &amp; Consumption Units
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setUnitSystem("imperial")}
                className={`py-1.5 px-3 rounded-lg text-center cursor-pointer transition-all ${
                  unitSystem === "imperial"
                    ? "bg-teal-600 text-white font-extrabold shadow-md shadow-teal-600/30 border-b-2 border-teal-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Miles / MPG (US)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem("metric")}
                className={`py-1.5 px-3 rounded-lg text-center cursor-pointer transition-all ${
                  unitSystem === "metric"
                    ? "bg-teal-600 text-white font-extrabold shadow-md shadow-teal-600/30 border-b-2 border-teal-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Kilometers / L/100km (Metric)
              </button>
            </div>
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-1.5 pt-3 sm:pt-0">
            <Button
              type="button"
              onClick={handleSaveCalculation}
              variant="outline"
              size="sm"
              className="h-7 text-xs font-semibold gap-1"
              title="Save this calculation scenario"
            >
              <BookmarkPlus className="h-3.5 w-3.5 text-blue-600" /> Save
            </Button>
            <Button
              type="button"
              onClick={() => setShowSavedDrawer(!showSavedDrawer)}
              variant="outline"
              size="sm"
              className="h-7 text-xs font-semibold gap-1 relative"
            >
              Saved ({savedCalculations.length})
            </Button>
            <Button
              type="button"
              onClick={handleCopySummary}
              variant="outline"
              size="sm"
              className="h-7 text-xs font-semibold gap-1"
              title="Copy formatted summary text"
            >
              {copiedSummary ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <FileText className="h-3.5 w-3.5" />}
              {copiedSummary ? "Copied" : "Summary"}
            </Button>
            <Button
              type="button"
              onClick={handleDownloadCsv}
              variant="outline"
              size="sm"
              className="h-7 text-xs font-semibold gap-1"
              title="Download CSV"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" /> CSV
            </Button>
            <Button
              type="button"
              onClick={handleDownloadTxt}
              variant="outline"
              size="sm"
              className="h-7 text-xs font-semibold gap-1"
              title="Download TXT report"
            >
              <Download className="h-3.5 w-3.5 text-slate-600" /> TXT
            </Button>
            <Button
              type="button"
              onClick={handleCopyLatex}
              variant="outline"
              size="sm"
              className="h-7 text-xs font-semibold gap-1"
              title="Copy LaTeX Formula"
            >
              <FileCode className="h-3.5 w-3.5 text-purple-600" /> LaTeX
            </Button>
          </div>
        </div>

        {/* Saved Scenarios Drawer */}
        {showSavedDrawer && (
          <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-800 dark:text-zinc-200">
                Saved Scenarios ({savedCalculations.length})
              </span>
              <button
                type="button"
                onClick={() => setShowSavedDrawer(false)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>
            {savedCalculations.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No saved calculations yet. Click &quot;Save&quot; to bookmark a calculation.</p>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {savedCalculations.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-800 dark:text-zinc-100 block">{item.label}</span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(item.timestamp).toLocaleDateString()} — {item.summaryOutput}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRestoreCalculation(item)}
                        className="h-6 px-2 text-xs text-blue-600 font-semibold"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" /> Restore
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteSaved(item.id)}
                        className="h-6 w-6 p-0 text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Validation Alert */}
      {result.validationError && (
        <div role="alert" className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl flex items-center gap-2 text-xs font-semibold text-red-700 dark:text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <span>{result.validationError}</span>
        </div>
      )}

      {/* 2. SPLIT PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-4">
          {/* Trip Distance & Round Trip */}
          {mode !== "mpg_solver" ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="fuel-distance"
                  className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5"
                >
                  <Car className="h-4 w-4 text-emerald-600" />{" "}
                  {mode === "commute" ? "Daily Round-Trip Distance" : "Trip Distance"}{" "}
                  ({unitSystem === "imperial" ? "Miles" : "KM"})
                </label>

                {mode === "trip" && (
                  <label htmlFor="fuel-round-trip-checkbox" className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-900">
                    <input
                      id="fuel-round-trip-checkbox"
                      type="checkbox"
                      checked={isRoundTrip}
                      onChange={(e) => setIsRoundTrip(e.target.checked)}
                      className="rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                    />
                    Round-Trip (2x)
                  </label>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Input
                  id="fuel-distance"
                  type="number"
                  min={0}
                  value={distance}
                  onChange={(e) => setDistance(Math.max(0, Number(e.target.value)))}
                  className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 w-32"
                />
                <label htmlFor="fuel-distance-slider" className="sr-only">Distance Slider</label>
                <input
                  id="fuel-distance-slider"
                  type="range"
                  min={0}
                  max={2000}
                  step={5}
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>
          ) : (
            /* Odometer MPG Solver Inputs */
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label htmlFor="fuel-start-odometer" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Start Odometer</label>
                <Input
                  id="fuel-start-odometer"
                  type="number"
                  min={0}
                  value={startOdo}
                  onChange={(e) => setStartOdo(Number(e.target.value))}
                  className="h-8 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="fuel-end-odometer" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">End Odometer</label>
                <Input
                  id="fuel-end-odometer"
                  type="number"
                  min={0}
                  value={endOdo}
                  onChange={(e) => setEndOdo(Number(e.target.value))}
                  className="h-8 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="fuel-added" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Fuel Added ({unitSystem === "imperial" ? "Gal" : "L"})</label>
                <Input
                  id="fuel-added"
                  type="number"
                  min={0}
                  step="0.1"
                  value={fuelAdded}
                  onChange={(e) => setFuelAdded(Number(e.target.value))}
                  className="h-8 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
            </div>
          )}

          {/* Efficiency & Price Inputs */}
          {mode !== "ev_compare" && mode !== "mpg_solver" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="space-y-1">
                <label htmlFor="fuel-efficiency" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Fuel Efficiency ({unitSystem === "imperial" ? "MPG" : "L/100km"})
                </label>
                <Input
                  id="fuel-efficiency"
                  type="number"
                  min={0.1}
                  step="0.5"
                  value={efficiency}
                  onChange={(e) => setEfficiency(Number(e.target.value))}
                  className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="fuel-price" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Fuel Price ({currencySymbol} per {unitSystem === "imperial" ? "Gallon" : "Liter"})
                </label>
                <Input
                  id="fuel-price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(Number(e.target.value))}
                  className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
            </div>
          )}

          {/* EV Comparison Specific Inputs */}
          {mode === "ev_compare" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-zinc-700 dark:text-zinc-300 block">Gas Vehicle MPG / Fuel Price</span>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label htmlFor="fuel-ev-gas-mpg" className="sr-only">Gas Vehicle MPG</label>
                    <Input
                      id="fuel-ev-gas-mpg"
                      type="number"
                      min={1}
                      value={efficiency}
                      onChange={(e) => setEfficiency(Number(e.target.value))}
                      placeholder="MPG"
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="fuel-ev-gas-price" className="sr-only">Fuel Price</label>
                    <Input
                      id="fuel-ev-gas-price"
                      type="number"
                      min={0}
                      step="0.05"
                      value={fuelPrice}
                      onChange={(e) => setFuelPrice(Number(e.target.value))}
                      placeholder="$/gal"
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-zinc-700 dark:text-zinc-300 block">EV Rate (kWh/100mi &amp; {currencySymbol}/kWh)</span>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label htmlFor="fuel-ev-kwh" className="sr-only">EV kWh/100mi</label>
                    <Input
                      id="fuel-ev-kwh"
                      type="number"
                      min={1}
                      value={evKwhPer100}
                      onChange={(e) => setEvKwhPer100(Number(e.target.value))}
                      placeholder="kWh/100mi"
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="fuel-ev-rate" className="sr-only">EV Electricity Rate</label>
                    <Input
                      id="fuel-ev-rate"
                      type="number"
                      min={0}
                      step="0.01"
                      value={electricityRate}
                      onChange={(e) => setElectricityRate(Number(e.target.value))}
                      placeholder="$/kWh"
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Passengers & Commute Days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
            {mode === "trip" && (
              <div className="space-y-1">
                <label htmlFor="fuel-passenger-count" className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-emerald-600" /> Passenger Group Split ({passengers} people)
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    variant="outline"
                    size="sm"
                    className="h-7 w-7 text-xs font-bold cursor-pointer"
                    aria-label="Decrease passengers"
                  >
                    -
                  </Button>
                  <span id="fuel-passenger-count" className="font-sans tabular-nums font-bold text-xs text-zinc-800 dark:text-zinc-200 px-2">
                    {passengers}
                  </span>
                  <Button
                    type="button"
                    onClick={() => setPassengers(passengers + 1)}
                    variant="outline"
                    size="sm"
                    className="h-7 w-7 text-xs font-bold cursor-pointer"
                    aria-label="Increase passengers"
                  >
                    +
                  </Button>
                </div>
              </div>
            )}

            {mode === "commute" && (
              <div className="space-y-1">
                <label htmlFor="fuel-work-days" className="font-bold text-zinc-700 dark:text-zinc-300">Work Days Per Month</label>
                <Input
                  id="fuel-work-days"
                  type="number"
                  min={0}
                  max={31}
                  value={workDays}
                  onChange={(e) => setWorkDays(Math.max(0, Number(e.target.value)))}
                  className="h-8 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
            )}
          </div>

          {/* EXPANDABLE ACCORDION: REAL-WORLD PENALTIES, TOLLS & PARKING */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <Sliders className="h-3.5 w-3.5" /> Real-World Efficiency Penalties, Tolls &amp; Parking
              </span>
              {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showAdvanced && (
              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-2 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300 block text-[11px]">Efficiency Penalty Toggles</span>
                  <div className="grid grid-cols-2 gap-2 text-slate-800 dark:text-slate-200 font-semibold">
                    <label htmlFor="penalty-roof-rack" className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        id="penalty-roof-rack"
                        type="checkbox"
                        checked={penalties.roofRack}
                        onChange={(e) => setPenalties({ ...penalties, roofRack: e.target.checked })}
                        className="rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                      />
                      Roof Cargo (-15%)
                    </label>
                    <label htmlFor="penalty-high-speed" className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        id="penalty-high-speed"
                        type="checkbox"
                        checked={penalties.highSpeed}
                        onChange={(e) => setPenalties({ ...penalties, highSpeed: e.target.checked })}
                        className="rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                      />
                      Speed 75+ mph (-20%)
                    </label>
                    <label htmlFor="penalty-towing" className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        id="penalty-towing"
                        type="checkbox"
                        checked={penalties.towing}
                        onChange={(e) => setPenalties({ ...penalties, towing: e.target.checked })}
                        className="rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                      />
                      Towing (-25%)
                    </label>
                    <label htmlFor="penalty-winter" className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        id="penalty-winter"
                        type="checkbox"
                        checked={penalties.winterCold}
                        onChange={(e) => setPenalties({ ...penalties, winterCold: e.target.checked })}
                        className="rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                      />
                      Winter (-10%)
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200/60 dark:border-zinc-700">
                  <div className="space-y-1">
                    <label htmlFor="fuel-tolls" className="font-bold text-zinc-700 dark:text-zinc-300">Tolls ({currencySymbol})</label>
                    <Input
                      id="fuel-tolls"
                      type="number"
                      min={0}
                      value={tolls}
                      onChange={(e) => setTolls(Math.max(0, Number(e.target.value)))}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 border-zinc-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="fuel-parking" className="font-bold text-zinc-700 dark:text-zinc-300">Parking ({currencySymbol})</label>
                    <Input
                      id="fuel-parking"
                      type="number"
                      min={0}
                      value={parking}
                      onChange={(e) => setParking(Math.max(0, Number(e.target.value)))}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 border-zinc-200"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DASHBOARD (Col 5) — SLEEK COMPACT DESIGN */}
        <div
          aria-live="polite"
          className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white p-4 rounded-2xl shadow-md space-y-3.5"
        >
          <div className="flex items-center justify-between border-b border-white/20 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
              <Fuel className="h-3.5 w-3.5 text-white" /> Financial &amp; Logistics Summary
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
              {mode === "commute"
                ? "Commute"
                : mode === "mpg_solver"
                ? "MPG Solver"
                : mode === "ev_compare"
                ? "EV Compare"
                : isRoundTrip
                ? "Round Trip"
                : "One-Way"}
            </span>
          </div>

          {/* Primary Result Card */}
          {mode !== "mpg_solver" ? (
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 block">
                {mode === "commute"
                  ? "Monthly Commute Fuel Cost"
                  : isRoundTrip
                  ? "Total Round-Trip Expense"
                  : "Total Trip Expense"}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-sans tabular-nums tracking-tight text-white">
                {mode === "commute"
                  ? fmtMoney(result.monthlyCommuteCost || 0, currencySymbol)
                  : fmtMoney(result.totalCost, currencySymbol)}
              </div>

              {/* Mode-Aware Subtitle (P1-02 Fix) */}
              {mode === "commute" ? (
                <div className="text-[11px] text-emerald-100 font-medium space-y-0.5 pt-0.5">
                  <p>Daily: {distance} {result.distanceUnitName} round-trip | {result.dailyFuelVolume} {result.fuelVolumeUnit}/day ({fmtMoney(result.dailyFuelCost || 0, currencySymbol)})</p>
                  <p>Monthly: {result.monthlyDistanceFormatted} ({workDays} work days) | Fuel: {result.monthlyFuelVolume} {result.fuelVolumeUnit}/month</p>
                </div>
              ) : (
                <p className="text-[11px] text-emerald-100 font-medium">
                  {result.distanceFormatted} ({isRoundTrip ? "Round-Trip" : "One-Way"}) | Fuel: {result.fuelVolumeNeeded} {result.fuelVolumeUnit}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 block">
                Calculated Fuel Economy
              </span>
              <div className="text-3xl sm:text-4xl font-black font-sans tabular-nums tracking-tight text-white">
                {result.calculatedMPG ? result.calculatedMPG.toFixed(2) : "0.00"} MPG
              </div>
              <p className="text-[11px] text-emerald-100 font-medium">
                Equivalent to {result.calculatedL100km ? result.calculatedL100km.toFixed(2) : "0.00"} L/100km | {result.distanceFormatted} on {result.fuelVolumeNeeded} {result.fuelVolumeUnit}
              </p>
            </div>
          )}

          {/* Passenger Cost Card */}
          {mode === "trip" && passengers > 1 && (
            <div className="p-2.5 bg-white/10 backdrop-blur-xs rounded-xl border border-white/20 space-y-0.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-1">
                <Users className="h-3 w-3" /> Group Passenger Split
              </span>
              <div className="text-2xl font-black font-sans tabular-nums text-white">
                {fmtMoney(result.costPerPerson, currencySymbol)}
              </div>
              <p className="text-[10px] text-emerald-100">Per person share across {passengers} passengers</p>
            </div>
          )}

          {/* Commute Budget Outlook */}
          {mode === "commute" && (
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
                <span className="text-[9px] uppercase font-bold text-emerald-200 block">Weekly Cost</span>
                <span className="font-sans tabular-nums font-bold text-xs text-white">
                  {fmtMoney(result.weeklyCommuteCost || 0, currencySymbol)}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
                <span className="text-[9px] uppercase font-bold text-emerald-200 block">Annual Cost</span>
                <span className="font-sans tabular-nums font-bold text-xs text-white">
                  {fmtMoney(result.annualCommuteCost || 0, currencySymbol)}
                </span>
              </div>
            </div>
          )}

          {/* EV Comparison Card (P2-01 & P2-02 Fix) */}
          {mode === "ev_compare" && (
            <div className="p-2.5 bg-white/10 backdrop-blur-xs rounded-xl border border-white/20 space-y-1.5 text-xs">
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-1">
                <Zap className="h-3 w-3 fill-yellow-400 text-yellow-400" /> EV vs. Gas Comparison
              </span>
              <div className="flex justify-between font-sans tabular-nums text-[11px]">
                <span>Gasoline: {fmtMoney(result.gasTripCost || 0, currencySymbol)}</span>
                <span className="font-bold text-yellow-300">EV: {fmtMoney(result.evTripCost || 0, currencySymbol)}</span>
              </div>

              {result.evSavings !== undefined && result.evSavings > 0 ? (
                <div className="p-1.5 bg-emerald-500/30 rounded-lg border border-emerald-300/40 text-center font-bold text-white text-xs">
                  EV Savings: {fmtMoney(result.evSavings, currencySymbol)} per trip!
                </div>
              ) : result.evSavings === 0 ? (
                <div className="p-1.5 bg-white/20 rounded-lg border border-white/30 text-center font-bold text-white text-xs">
                  Same Energy Cost: {fmtMoney(result.gasTripCost || 0, currencySymbol)} per trip
                </div>
              ) : (
                <div className="p-1.5 bg-amber-500/30 rounded-lg border border-amber-300/40 text-center font-bold text-amber-100 text-xs">
                  EV Premium: {fmtMoney(Math.abs(result.evSavings || 0), currencySymbol)} more per trip (Gasoline is cheaper)
                </div>
              )}
            </div>
          )}

          {/* P3-01: Comparative Data Visualization */}
          <div className="p-2.5 bg-white/10 backdrop-blur-xs rounded-xl border border-white/20 space-y-2 text-xs">
            <span className="text-[9px] uppercase font-bold text-emerald-200 block">
              {mode === "ev_compare" ? "Cost Comparison Visualization" : "Trip Expense Composition"}
            </span>

            {mode === "ev_compare" ? (
              // EV vs Gas Bar Chart
              (result.gasTripCost || 0) + (result.evTripCost || 0) > 0 ? (
                <div className="space-y-1.5">
                  {(() => {
                    const maxCost = Math.max(result.gasTripCost || 0, result.evTripCost || 0, 0.01);
                    const gasPct = ((result.gasTripCost || 0) / maxCost) * 100;
                    const evPct = ((result.evTripCost || 0) / maxCost) * 100;
                    return (
                      <>
                        <div className="space-y-0.5">
                          <div className="flex justify-between text-[10px] text-emerald-100">
                            <span>Gasoline Vehicle</span>
                            <span className="font-bold">{fmtMoney(result.gasTripCost || 0, currencySymbol)}</span>
                          </div>
                          <div className="h-2.5 w-full bg-black/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                              style={{ width: `${gasPct}%` }}
                            />
                          </div>
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex justify-between text-[10px] text-emerald-100">
                            <span>Electric Vehicle (EV)</span>
                            <span className="font-bold">{fmtMoney(result.evTripCost || 0, currencySymbol)}</span>
                          </div>
                          <div className="h-2.5 w-full bg-black/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                              style={{ width: `${evPct}%` }}
                            />
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-[10px] text-emerald-200 italic py-1">
                  No trip energy cost to compare (Distance or prices are zero).
                </div>
              )
            ) : (
              // Trip / Commute Breakdown
              result.totalCost > 0 ? (
                <div className="space-y-1.5">
                  {(() => {
                    const fuelPct = (result.fuelOnlyCost / result.totalCost) * 100;
                    const tollPct = (result.tollsAndExpenses / result.totalCost) * 100;
                    return (
                      <>
                        <div className="h-3 w-full bg-black/30 rounded-full overflow-hidden flex">
                          <div
                            className="h-full bg-emerald-400 transition-all duration-300"
                            style={{ width: `${fuelPct}%` }}
                            title={`Fuel: ${fuelPct.toFixed(1)}%`}
                          />
                          <div
                            className="h-full bg-amber-400 transition-all duration-300"
                            style={{ width: `${tollPct}%` }}
                            title={`Tolls & Parking: ${tollPct.toFixed(1)}%`}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-emerald-100 font-medium">
                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" /> Fuel: {fmtMoney(result.fuelOnlyCost, currencySymbol)} ({fuelPct.toFixed(0)}%)
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-amber-400 inline-block" /> Tolls: {fmtMoney(result.tollsAndExpenses, currencySymbol)} ({tollPct.toFixed(0)}%)
                          </span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-[10px] text-emerald-200 italic py-1">
                  No trip expense to allocate.
                </div>
              )
            )}
          </div>

          {/* Side-by-side Mini Metrics */}
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-emerald-200 block">Cost Per {result.distanceUnitName}</span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">
                {fmtMoney(result.costPerDistanceUnit, currencySymbol)}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-emerald-200 block flex items-center gap-1">
                <Leaf className="h-3 w-3 text-emerald-300" /> CO2 Emissions
              </span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">
                {result.carbonFootprintKg} kg CO2
              </span>
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
