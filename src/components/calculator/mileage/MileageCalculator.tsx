"use client";

import React, { useState, useMemo } from "react";
import {
  Gauge,
  Sliders,
  Share2,
  Printer,
  Check,
  ChevronUp,
  ChevronDown,
  Car,
  DollarSign,
  Plus,
  Trash2,
  Zap,
  Briefcase,
  Layers,
  Fuel,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MileageCalcMode,
  UnitSystem,
  IndianFuelType,
  ReimbursementCategory,
  LegInput,
  EnvironmentalModifiers,
  MileageResult,
} from "@/app/calculators/mileage-calculator/types";
import { calculateMileage, getIndianDefaultFuelPrice } from "@/app/calculators/mileage-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function MileageCalculator() {
  // Mode & Config State
  const [mode, setMode] = useState<MileageCalcMode>("fuel_mileage");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us_imperial");
  const [indianFuelType, setIndianFuelType] = useState<IndianFuelType>("petrol");

  // Mode 1: Fuel Mileage State
  const [distanceInput, setDistanceInput] = useState<number>(350);
  const [fuelInput, setFuelInput] = useState<number>(11.5);
  const [fuelPriceInput, setFuelPriceInput] = useState<number>(3.50);

  // Handle switching to Indian Metric
  const handleUnitSystemChange = (newUnit: UnitSystem) => {
    setUnitSystem(newUnit);
    if (newUnit === "indian_metric") {
      setFuelPriceInput(getIndianDefaultFuelPrice(indianFuelType));
      setDistanceInput(300);
      setFuelInput(15.0);
    } else if (newUnit === "metric") {
      setDistanceInput(500);
      setFuelInput(35.0);
      setFuelPriceInput(1.75);
    } else {
      setDistanceInput(350);
      setFuelInput(11.5);
      setFuelPriceInput(3.50);
    }
  };

  const handleIndianFuelTypeChange = (type: IndianFuelType) => {
    setIndianFuelType(type);
    setFuelPriceInput(getIndianDefaultFuelPrice(type));
  };
  const [isOdometerMode, setIsOdometerMode] = useState<boolean>(false);
  const [startOdometer, setStartOdometer] = useState<number>(10000);
  const [endOdometer, setEndOdometer] = useState<number>(10350);

  // Mode 2: Business Tax Reimbursement State
  const [businessMiles, setBusinessMiles] = useState<number>(450);
  const [reimbursementCategory, setReimbursementCategory] = useState<ReimbursementCategory>("business");
  const [customRate, setCustomRate] = useState<number>(0.67);

  // Mode 3: Multi-Leg Logger State
  const [legs, setLegs] = useState<LegInput[]>([
    { id: "1", distance: 320, fuel: 10.5, pricePerUnit: 3.45 },
    { id: "2", distance: 340, fuel: 11.0, pricePerUnit: 3.52 },
  ]);

  // Mode 4: EV & MPGe State
  const [evDistance, setEvDistance] = useState<number>(240);
  const [evKWhConsumed, setEvKWhConsumed] = useState<number>(75);
  const [electricityCost, setElectricityCost] = useState<number>(0.16);

  // Environmental Modifiers State
  const [modifiers, setModifiers] = useState<EnvironmentalModifiers>({
    cityDriving: false,
    towing: false,
    aggressiveDriving: false,
    coldWeather: false,
  });

  // UI State
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Add & Remove Multi-Leg Rows
  const handleAddLeg = () => {
    if (legs.length >= 6) return;
    const newLeg: LegInput = {
      id: Date.now().toString(),
      distance: 300,
      fuel: 10.0,
      pricePerUnit: 3.50,
    };
    setLegs([...legs, newLeg]);
  };

  const handleRemoveLeg = (id: string) => {
    if (legs.length <= 1) return;
    setLegs(legs.filter((l) => l.id !== id));
  };

  const handleUpdateLeg = (id: string, field: keyof LegInput, val: number) => {
    setLegs(legs.map((l) => (l.id === id ? { ...l, [field]: val } : l)));
  };

  // Compute Results
  const result: MileageResult = useMemo(() => {
    return calculateMileage(
      mode,
      unitSystem,
      distanceInput,
      fuelInput,
      fuelPriceInput,
      isOdometerMode,
      startOdometer,
      endOdometer,
      businessMiles,
      reimbursementCategory,
      customRate,
      legs,
      evDistance,
      evKWhConsumed,
      electricityCost,
      12000,
      modifiers,
      indianFuelType
    );
  }, [
    mode,
    unitSystem,
    distanceInput,
    fuelInput,
    fuelPriceInput,
    isOdometerMode,
    startOdometer,
    endOdometer,
    businessMiles,
    reimbursementCategory,
    customRate,
    legs,
    evDistance,
    evKWhConsumed,
    electricityCost,
    modifiers,
    indianFuelType,
  ]);

  // Copy Summary to Clipboard
  const handleCopySummary = () => {
    let text = `🚗 CalcPlatform Mileage Briefing:\n`;
    if (mode === "tax_reimbursement") {
      text += `IRS Tax Deduction: $${result.taxReimbursementAmount} (${result.totalDistance} miles @ $${result.reimbursementRatePerMile}/mi)\n`;
      text += `Category: ${reimbursementCategory.toUpperCase()}\n`;
    } else {
      text += `Fuel Economy: ${result.primaryValue} ${result.primaryUnit} (${result.usMpg} US MPG | ${result.litersPer100km} L/100km)\n`;
      text += `Distance & Fuel: ${result.totalDistance} ${result.distanceUnit} driven using ${result.totalFuelUsed} ${result.fuelUnit}\n`;
      text += `Financials: $${result.costPerDistance}/mi | ${result.distancePerDollar} mi/$ | Est Annual Fuel: $${result.annualFuelCost}\n`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // PDF Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: mode === "tax_reimbursement" ? "Business Mileage Tax Reimbursement Report" : "Vehicle Fuel Economy & Mileage Log Sheet",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Mileage Calculator",
      },
      keyMetrics: [
        { label: result.primaryLabel, value: `${result.primaryValue} ${result.primaryUnit}`, highlight: true },
        { label: "Total Trip Distance", value: `${result.totalDistance} ${result.distanceUnit}` },
        { label: "Cost Per Distance", value: `${result.costPerDistance} ${result.costPerDistanceUnit}` },
        { label: "Distance Per Dollar", value: `${result.distancePerDollar} ${result.distancePerDollarUnit}` },
      ],
      sections: [
        mode === "tax_reimbursement"
          ? {
              title: "IRS Business Reimbursement Details",
              items: [
                { label: "Eligible Miles Driven", value: `${result.totalDistance} miles` },
                { label: "Reimbursement Category", value: reimbursementCategory.toUpperCase() },
                { label: "Allowance Rate per Mile", value: `$${result.reimbursementRatePerMile} / mile` },
                { label: "Total Expense Claim Amount", value: `$${result.taxReimbursementAmount}` },
              ],
            }
          : {
              title: "Multi-Standard Efficiency Breakdown",
              items: [
                { label: "US Fuel Economy", value: `${result.usMpg} US MPG` },
                { label: "UK Imperial Fuel Economy", value: `${result.ukMpg} UK MPG` },
                { label: "Metric Fuel Consumption", value: `${result.litersPer100km} L/100 km (${result.kmPerLiter} km/L)` },
                { label: "EV Equivalent Rating", value: `${result.mpge} MPGe (${result.kWhPer100mi} kWh/100mi)` },
                { label: "Projected Annual Fuel Spend", value: `$${result.annualFuelCost} / year` },
              ],
            },
      ],
    };
  }, [result, mode, reimbursementCategory]);

  return (
    <div className="space-y-4">
      {/* 1. TOP CONTROL TOOLBAR - LIGHT SLATE THEME WITH 3D BUTTONS */}
      <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Mode Tabs (Col 7) */}
          <div className="md:col-span-7 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Calculator Mode
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              <button
                onClick={() => setMode("fuel_mileage")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "fuel_mileage"
                    ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/30 border-b-2 border-blue-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Fuel Mileage
              </button>
              <button
                onClick={() => setMode("tax_reimbursement")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "tax_reimbursement"
                    ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/30 border-b-2 border-blue-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                IRS Tax Claim
              </button>
              <button
                onClick={() => setMode("multi_leg")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "multi_leg"
                    ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/30 border-b-2 border-blue-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Multi-Leg Log
              </button>
              <button
                onClick={() => setMode("ev_mpge")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  mode === "ev_mpge"
                    ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/30 border-b-2 border-blue-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                EV &amp; MPGe
              </button>
            </div>
          </div>

          {/* Unit System Pills (Col 5) */}
          <div className="md:col-span-5 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Unit System Standard
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              <button
                onClick={() => handleUnitSystemChange("us_imperial")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  unitSystem === "us_imperial"
                    ? "bg-slate-800 text-white font-extrabold border-b-2 border-slate-950 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 border-b-2 border-b-slate-300"
                }`}
              >
                US (mi/gal)
              </button>
              <button
                onClick={() => handleUnitSystemChange("metric")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  unitSystem === "metric"
                    ? "bg-slate-800 text-white font-extrabold border-b-2 border-slate-950 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 border-b-2 border-b-slate-300"
                }`}
              >
                Metric (L/100km)
              </button>
              <button
                onClick={() => handleUnitSystemChange("uk_imperial")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  unitSystem === "uk_imperial"
                    ? "bg-slate-800 text-white font-extrabold border-b-2 border-slate-950 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 border-b-2 border-b-slate-300"
                }`}
              >
                UK (Imp Gal)
              </button>
              <button
                onClick={() => handleUnitSystemChange("indian_metric")}
                className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-all ${
                  unitSystem === "indian_metric"
                    ? "bg-emerald-700 text-white font-extrabold border-b-2 border-emerald-900 active:translate-y-0.5 shadow-md shadow-emerald-700/20"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 border-b-2 border-b-slate-300"
                }`}
              >
                IN Metric (km/l)
              </button>
            </div>
          </div>
        </div>

        {/* Indian Fuel Type Dropdown Selector */}
        {unitSystem === "indian_metric" && (
          <div className="pt-2 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <Fuel className="h-3.5 w-3.5 text-emerald-600" /> Indian Fuel &amp; Energy Type:
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                onClick={() => handleIndianFuelTypeChange("petrol")}
                className={`px-2.5 py-1 rounded-md cursor-pointer font-bold transition-all ${
                  indianFuelType === "petrol"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200"
                }`}
              >
                Petrol
              </button>
              <button
                onClick={() => handleIndianFuelTypeChange("diesel")}
                className={`px-2.5 py-1 rounded-md cursor-pointer font-bold transition-all ${
                  indianFuelType === "diesel"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200"
                }`}
              >
                Diesel
              </button>
              <button
                onClick={() => handleIndianFuelTypeChange("cng")}
                className={`px-2.5 py-1 rounded-md cursor-pointer font-bold transition-all ${
                  indianFuelType === "cng"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200"
                }`}
              >
                CNG
              </button>
              <button
                onClick={() => handleIndianFuelTypeChange("lpg")}
                className={`px-2.5 py-1 rounded-md cursor-pointer font-bold transition-all ${
                  indianFuelType === "lpg"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200"
                }`}
              >
                Auto LPG
              </button>
              <button
                onClick={() => handleIndianFuelTypeChange("ev_home")}
                className={`px-2.5 py-1 rounded-md cursor-pointer font-bold transition-all ${
                  indianFuelType === "ev_home"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200"
                }`}
              >
                EV Home
              </button>
              <button
                onClick={() => handleIndianFuelTypeChange("ev_commercial")}
                className={`px-2.5 py-1 rounded-md cursor-pointer font-bold transition-all ${
                  indianFuelType === "ev_commercial"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200"
                }`}
              >
                EV Fast DC
              </button>
            </div>
          </div>
        )}

        {/* Action Export Buttons */}
        <div className="pt-2.5 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            {mode === "tax_reimbursement" ? "IRS Standard Rate: $0.67/mile" : `Active Unit: ${unitSystem.toUpperCase()}`}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleCopySummary}
              variant="outline"
              size="sm"
              className="h-8 text-xs font-bold gap-1 cursor-pointer bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 border-b-2 border-b-slate-300"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy Log"}
            </Button>
            <Button
              onClick={() => setShowReportModal(true)}
              variant="outline"
              size="sm"
              className="h-8 text-xs font-bold gap-1 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white border-b-2 border-blue-800 shadow-md shadow-blue-600/20"
            >
              <Printer className="h-3.5 w-3.5" /> Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* 2. SPLIT PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-4">
          {/* MODE 1: FUEL MILEAGE INPUTS */}
          {mode === "fuel_mileage" && (
            <div className="space-y-3">
              {(() => {
                const isElectric = unitSystem === "indian_metric" && (indianFuelType === "ev_home" || indianFuelType === "ev_commercial");
                const isCNG = unitSystem === "indian_metric" && indianFuelType === "cng";

                const logTitle = isElectric ? "Battery Charging Log" : isCNG ? "CNG Filling Log" : "Tank-to-Tank Fuel Log";
                const qtyLabel = isElectric ? "Energy Charged (kWh)" : isCNG ? "CNG Added (kg)" : `Fuel Added (${result.fuelUnit})`;
                const priceLabel = isElectric
                  ? `Electricity Tariff per kWh (${result.currencySymbol})`
                  : isCNG
                  ? `CNG Price per kg (${result.currencySymbol})`
                  : `Fuel Price per ${result.fuelUnit.replace("US ", "").replace("UK ", "")} (${result.currencySymbol})`;

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                        {isElectric ? <Zap className="h-4 w-4 text-emerald-500" /> : <Fuel className="h-4 w-4 text-blue-600" />} {logTitle}
                      </label>
                      <button
                        onClick={() => setIsOdometerMode(!isOdometerMode)}
                        className="text-[10px] text-blue-600 hover:underline font-extrabold cursor-pointer"
                      >
                        {isOdometerMode ? "Switch to Trip Distance" : "Switch to Odometer Readings"}
                      </button>
                    </div>

                    {isOdometerMode ? (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Start Odometer ({result.distanceUnit})</label>
                          <Input
                            type="number"
                            value={startOdometer}
                            onChange={(e) => setStartOdometer(Number(e.target.value))}
                            className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">End Odometer ({result.distanceUnit})</label>
                          <Input
                            type="number"
                            value={endOdometer}
                            onChange={(e) => setEndOdometer(Number(e.target.value))}
                            className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Trip Distance Driven ({result.distanceUnit})</label>
                        <Input
                          type="number"
                          value={distanceInput}
                          onChange={(e) => setDistanceInput(Number(e.target.value))}
                          className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{qtyLabel}</label>
                        <Input
                          type="number"
                          step="0.1"
                          value={fuelInput}
                          onChange={(e) => setFuelInput(Number(e.target.value))}
                          className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{priceLabel}</label>
                        <Input
                          type="number"
                          step="0.05"
                          value={fuelPriceInput}
                          onChange={(e) => setFuelPriceInput(Number(e.target.value))}
                          className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                        />
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* MODE 2: BUSINESS TAX REIMBURSEMENT INPUTS */}
          {mode === "tax_reimbursement" && (
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-blue-600" /> IRS Business Travel &amp; Tax Deduction
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Business Miles Driven</label>
                  <Input
                    type="number"
                    value={businessMiles}
                    onChange={(e) => setBusinessMiles(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Reimbursement Category</label>
                  <select
                    value={reimbursementCategory}
                    onChange={(e) => setReimbursementCategory(e.target.value as ReimbursementCategory)}
                    className="h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 text-xs font-bold"
                  >
                    <option value="business">Business Travel ($0.67 / mi)</option>
                    <option value="medical">Medical / Moving ($0.21 / mi)</option>
                    <option value="charity">Charitable Transport ($0.14 / mi)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Custom Mileage Allowance Rate ($/mi)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={customRate}
                  onChange={(e) => setCustomRate(Number(e.target.value))}
                  className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
            </div>
          )}

          {/* MODE 3: MULTI-LEG TRIP LOGGER INPUTS */}
          {mode === "multi_leg" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-blue-600" /> Multi-Tank / Multi-Leg Fleet Logger
                </label>
                <Button
                  onClick={handleAddLeg}
                  disabled={legs.length >= 6}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs font-bold gap-1 cursor-pointer"
                >
                  <Plus className="h-3 w-3" /> Add Fill-Up
                </Button>
              </div>

              <div className="space-y-2">
                {legs.map((leg, index) => (
                  <div key={leg.id} className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between font-bold text-zinc-700 dark:text-zinc-300">
                      <span>Fill-Up #{index + 1}</span>
                      {legs.length > 1 && (
                        <button
                          onClick={() => handleRemoveLeg(leg.id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        type="number"
                        placeholder="Dist (mi/km)"
                        value={leg.distance}
                        onChange={(e) => handleUpdateLeg(leg.id, "distance", Number(e.target.value))}
                        className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900"
                      />
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Fuel (gal/L)"
                        value={leg.fuel}
                        onChange={(e) => handleUpdateLeg(leg.id, "fuel", Number(e.target.value))}
                        className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900"
                      />
                      <Input
                        type="number"
                        step="0.05"
                        placeholder="Price ($/unit)"
                        value={leg.pricePerUnit}
                        onChange={(e) => handleUpdateLeg(leg.id, "pricePerUnit", Number(e.target.value))}
                        className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODE 4: EV & MPGE INPUTS */}
          {mode === "ev_mpge" && (
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-blue-600" /> EV &amp; Plug-in Hybrid Energy Calculator
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Distance Driven (Miles)</label>
                  <Input
                    type="number"
                    value={evDistance}
                    onChange={(e) => setEvDistance(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Electricity Used (kWh)</label>
                  <Input
                    type="number"
                    step="0.5"
                    value={evKWhConsumed}
                    onChange={(e) => setEvKWhConsumed(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Electricity Charging Cost ($/kWh)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={electricityCost}
                  onChange={(e) => setElectricityCost(Number(e.target.value))}
                  className="h-9 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
            </div>
          )}

          {/* REAL-WORLD ENVIRONMENTAL MODIFIERS */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <Sliders className="h-3.5 w-3.5" /> Real-World Driving Modifiers ({result.environmentalPenaltyPercent}% penalty)
              </span>
              {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showAdvanced && (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2 font-bold text-zinc-700 dark:text-zinc-300">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modifiers.cityDriving}
                      onChange={(e) => setModifiers({ ...modifiers, cityDriving: e.target.checked })}
                      className="rounded text-blue-600 accent-blue-600 cursor-pointer"
                    />
                    Stop-and-Go City (+15%)
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modifiers.towing}
                      onChange={(e) => setModifiers({ ...modifiers, towing: e.target.checked })}
                      className="rounded text-blue-600 accent-blue-600 cursor-pointer"
                    />
                    Heavy Cargo / Towing (+25%)
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modifiers.aggressiveDriving}
                      onChange={(e) => setModifiers({ ...modifiers, aggressiveDriving: e.target.checked })}
                      className="rounded text-blue-600 accent-blue-600 cursor-pointer"
                    />
                    Aggressive Driving (+20%)
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modifiers.coldWeather}
                      onChange={(e) => setModifiers({ ...modifiers, coldWeather: e.target.checked })}
                      className="rounded text-blue-600 accent-blue-600 cursor-pointer"
                    />
                    Winter / Cold Weather (+12%)
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DASHBOARD (Col 5) - VISUAL EFFICIENCY GAUGE */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 text-white p-4 rounded-2xl shadow-md space-y-3.5">
          <div className="flex items-center justify-between border-b border-white/20 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-100 flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-white" /> Efficiency Dashboard
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
              {result.efficiencyTierLabel.split(" ")[0]}
            </span>
          </div>

          {/* Primary Result Card */}
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
              {result.primaryLabel}
            </span>
            <div className="text-3xl sm:text-4xl font-black font-sans tabular-nums tracking-tight text-white">
              {mode === "tax_reimbursement" ? `$${result.primaryValue}` : `${result.primaryValue} ${result.primaryUnit}`}
            </div>
            <p className="text-[11px] text-blue-100 font-medium">
              {mode === "tax_reimbursement"
                ? `${result.totalDistance} miles @ $${result.reimbursementRatePerMile}/mi standard rate`
                : (unitSystem === "indian_metric" && (indianFuelType === "ev_home" || indianFuelType === "ev_commercial")) || mode === "ev_mpge"
                ? `${result.mpge} MPGe | ${result.kWhPer100mi} kWh/100mi | ${result.costPerDistance} ${result.costPerDistanceUnit}`
                : unitSystem === "indian_metric" && indianFuelType === "cng"
                ? `${result.kmPerLiter} km/kg | ${result.usMpg} US MPG eq | ${result.costPerDistance} ${result.costPerDistanceUnit}`
                : `${result.usMpg} US MPG | ${result.litersPer100km} L/100 km | ${result.ukMpg} UK MPG`}
            </p>
          </div>

          {/* VISUAL EFFICIENCY TIER GAUGE */}
          <div className="bg-black/40 backdrop-blur-xs p-3 rounded-xl border border-white/20 space-y-1.5 text-xs text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
              Vehicle Efficiency Tier Gauge
            </span>

            <div className="h-32 w-full relative flex items-center justify-center pt-1">
              <svg className="w-48 h-28 overflow-visible" viewBox="0 0 200 120">
                {/* Arc Track */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="14"
                  strokeLinecap="round"
                />

                {/* Animated Efficiency Arc fill */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#efficiencyGradient)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (Math.min(180, result.gaugeAngle) / 180) * 251.2}
                  className="transition-all duration-700 ease-out"
                />

                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="efficiencyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>

                {/* Center Text */}
                <text x="100" y="85" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="monospace">
                  {mode === "tax_reimbursement" ? `$${result.primaryValue}` : result.primaryValue}
                </text>
                <text x="100" y="98" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">
                  {mode === "tax_reimbursement" ? "TAX CLAIM" : result.primaryUnit}
                </text>

                {/* Labels */}
                <text x="15" y="115" fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="bold">Heavy</text>
                <text x="175" y="115" fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="bold">60+ MPG</text>
              </svg>
            </div>
          </div>

          {/* Sub-metric Analytics Cards */}
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-blue-200 block">Cost Per Distance</span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">${result.costPerDistance} / {result.distanceUnit}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-blue-200 block">Distance Per Dollar</span>
              <span className="font-sans tabular-nums font-bold text-xs text-white">{result.distancePerDollar} {result.distanceUnit} / $</span>
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
