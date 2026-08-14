"use client";

import React, { useState, useMemo } from "react";
import {
  Fuel,
  DollarSign,
  Car,
  Users,
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
  Info,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CalcMode,
  UnitSystem,
  FuelType,
  EfficiencyPenaltyFlags,
  FuelCostResult,
} from "@/app/calculators/fuel-cost-calculator/types";
import { calculateFuelCost } from "@/app/calculators/fuel-cost-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

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
  const [copied, setCopied] = useState<boolean>(false);

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

  // Copy Group Summary
  const handleCopySummary = () => {
    let text = `🚗 CalcPlatform Trip Budget & Split Summary:\n`;
    text += `Distance: ${result.distanceFormatted} (${isRoundTrip ? "Round-Trip" : "One-Way"})\n`;
    text += `Total Trip Expense: ${currencySymbol}${result.totalCost}\n`;
    if (passengers > 1) {
      text += `Cost Per Person (${passengers} passengers): ${currencySymbol}${result.costPerPerson}\n`;
    }
    text += `Fuel Needed: ${result.fuelVolumeNeeded} ${result.fuelVolumeUnit}\n`;
    if (tolls + parking > 0) {
      text += `Tolls & Parking: ${currencySymbol}${tolls + parking}\n`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "Vehicle Trip Fuel Cost & Expense Briefing",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Fuel Cost Calculator",
      },
      keyMetrics: [
        { label: "Total Trip Expense", value: `${currencySymbol}${result.totalCost}`, highlight: true },
        { label: "Cost Per Passenger", value: `${currencySymbol}${result.costPerPerson} (${passengers} split)` },
        { label: "Fuel Volume Required", value: `${result.fuelVolumeNeeded} ${result.fuelVolumeUnit}` },
        { label: "Cost Per Unit Distance", value: `${currencySymbol}${result.costPerDistanceUnit} / ${result.distanceUnitName}` },
      ],
      sections: [
        {
          title: "Trip Logistics & Breakdown",
          items: [
            { label: "Calculated Distance", value: `${result.distanceFormatted} (${isRoundTrip ? "Round-Trip" : "One-Way"})` },
            { label: "Fuel Price Rate", value: `${currencySymbol}${fuelPrice} per ${unitSystem === "imperial" ? "Gallon" : "Liter"}` },
            { label: "Effective Fuel Economy", value: `${result.effectiveEfficiency} ${result.efficiencyUnitName}` },
            { label: "Pure Fuel Cost", value: `${currencySymbol}${result.fuelOnlyCost}` },
            { label: "Tolls & Parking Fees", value: `${currencySymbol}${result.tollsAndExpenses}` },
            { label: "Estimated CO2 Footprint", value: `${result.carbonFootprintKg} kg CO2` },
          ],
        },
        mode === "commute"
          ? {
              title: "Commute Budget Outlook",
              items: [
                { label: "Weekly Commute Cost", value: `${currencySymbol}${result.weeklyCommuteCost}` },
                { label: "Monthly Commute Cost", value: `${currencySymbol}${result.monthlyCommuteCost} (${workDays} work days)` },
                { label: "Annual Commute Cost", value: `${currencySymbol}${result.annualCommuteCost}` },
              ],
            }
          : mode === "ev_compare"
          ? {
              title: "EV vs. Gas Cost Comparison",
              items: [
                { label: "Gasoline Trip Cost", value: `${currencySymbol}${result.gasTripCost}` },
                { label: "Electric EV Trip Cost", value: `${currencySymbol}${result.evTripCost}` },
                { label: "Net EV Savings", value: `${currencySymbol}${result.evSavings} per trip` },
              ],
            }
          : {
              title: "Passenger Cost Sharing Roster",
              items: [
                { label: "Total Group Members", value: `${passengers} Passenger(s)` },
                { label: "Equal Contribution Share", value: `${currencySymbol}${result.costPerPerson} per person` },
              ],
            },
      ],
    };
  }, [result, currencySymbol, passengers, isRoundTrip, fuelPrice, unitSystem, mode, workDays]);

  return (
    <div className="space-y-4">
      {/* 1. TOP TOOLBAR BAR - LIGHT HARMONIOUS THEME */}
      <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Mode Selector (Col 7) */}
          <div className="md:col-span-7 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Trip Calculation Mode
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              <button
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

          {/* Actions & Currency (Col 5) */}
          <div className="md:col-span-5 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Currency &amp; Export Tools
            </span>
            <div className="flex items-center gap-2">
              <select
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
                className="h-8 text-xs font-bold gap-1 cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white border-b-2 border-emerald-800 shadow-md shadow-emerald-600/20"
              >
                <Printer className="h-3.5 w-3.5" /> PDF Receipt
              </Button>
            </div>
          </div>
        </div>

        {/* Row 2: Unit System Switcher */}
        <div className="pt-2.5 border-t border-slate-200 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
            Distance &amp; Consumption Units
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs max-w-md">
            <button
              onClick={() => setUnitSystem("imperial")}
              className={`py-1.5 px-3 rounded-lg text-center cursor-pointer transition-all ${
                unitSystem === "imperial"
                  ? "bg-teal-600 text-white font-extrabold shadow-md shadow-teal-600/30 border-b-2 border-teal-800 active:translate-y-0.5"
                  : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
              }`}
            >
              Miles / MPG (Imperial)
            </button>
            <button
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
      </div>

      {/* 2. SPLIT PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-4">
          {/* Trip Distance & Round Trip */}
          {mode !== "mpg_solver" ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Car className="h-4 w-4 text-emerald-600" />{" "}
                  {mode === "commute" ? "Daily Round-Trip Distance" : "Trip Distance"}{" "}
                  ({unitSystem === "imperial" ? "Miles" : "KM"})
                </label>

                {mode === "trip" && (
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-900">
                    <input
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
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="h-9 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 w-32"
                />
                <input
                  type="range"
                  min={5}
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
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Start Odometer</label>
                <Input
                  type="number"
                  value={startOdo}
                  onChange={(e) => setStartOdo(Number(e.target.value))}
                  className="h-8 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">End Odometer</label>
                <Input
                  type="number"
                  value={endOdo}
                  onChange={(e) => setEndOdo(Number(e.target.value))}
                  className="h-8 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Fuel Added ({unitSystem === "imperial" ? "Gal" : "L"})</label>
                <Input
                  type="number"
                  value={fuelAdded}
                  onChange={(e) => setFuelAdded(Number(e.target.value))}
                  className="h-8 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
            </div>
          )}

          {/* Efficiency & Price Inputs */}
          {mode !== "ev_compare" && mode !== "mpg_solver" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Fuel Efficiency ({unitSystem === "imperial" ? "MPG" : "L/100km"})
                </label>
                <Input
                  type="number"
                  value={efficiency}
                  onChange={(e) => setEfficiency(Number(e.target.value))}
                  className="h-9 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Fuel Price ({currencySymbol} per {unitSystem === "imperial" ? "Gallon" : "Liter"})
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(Number(e.target.value))}
                  className="h-9 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
            </div>
          )}

          {/* EV Comparison Specific Inputs */}
          {mode === "ev_compare" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-zinc-700 dark:text-zinc-300">Gas Vehicle MPG / Fuel Price</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={efficiency}
                    onChange={(e) => setEfficiency(Number(e.target.value))}
                    placeholder="MPG"
                    className="h-8 text-xs font-mono"
                  />
                  <Input
                    type="number"
                    step="0.05"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(Number(e.target.value))}
                    placeholder="$/gal"
                    className="h-8 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700 dark:text-zinc-300">EV Rate (kWh/100mi &amp; $/kWh)</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={evKwhPer100}
                    onChange={(e) => setEvKwhPer100(Number(e.target.value))}
                    placeholder="kWh/100mi"
                    className="h-8 text-xs font-mono"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    value={electricityRate}
                    onChange={(e) => setElectricityRate(Number(e.target.value))}
                    placeholder="$/kWh"
                    className="h-8 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Passengers & Commute Days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
            {mode === "trip" && (
              <div className="space-y-1">
                <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-emerald-600" /> Passenger Group Split ({passengers} people)
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    variant="outline"
                    size="sm"
                    className="h-7 w-7 text-xs font-bold cursor-pointer"
                  >
                    -
                  </Button>
                  <span className="font-mono font-bold text-xs text-zinc-800 dark:text-zinc-200 px-2">
                    {passengers}
                  </span>
                  <Button
                    onClick={() => setPassengers(passengers + 1)}
                    variant="outline"
                    size="sm"
                    className="h-7 w-7 text-xs font-bold cursor-pointer"
                  >
                    +
                  </Button>
                </div>
              </div>
            )}

            {mode === "commute" && (
              <div className="space-y-1">
                <label className="font-bold text-zinc-700 dark:text-zinc-300">Work Days Per Month</label>
                <Input
                  type="number"
                  value={workDays}
                  onChange={(e) => setWorkDays(Number(e.target.value))}
                  className="h-8 text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800"
                />
              </div>
            )}
          </div>

          {/* EXPANDABLE ACCORDION: REAL-WORLD PENALTIES & EXPENSES */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <button
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
                  <div className="grid grid-cols-2 gap-2 text-zinc-600 dark:text-zinc-300">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={penalties.roofRack}
                        onChange={(e) => setPenalties({ ...penalties, roofRack: e.target.checked })}
                        className="rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                      />
                      Roof Cargo (-15%)
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={penalties.highSpeed}
                        onChange={(e) => setPenalties({ ...penalties, highSpeed: e.target.checked })}
                        className="rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                      />
                      Speed 75+ mph (-20%)
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={penalties.towing}
                        onChange={(e) => setPenalties({ ...penalties, towing: e.target.checked })}
                        className="rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                      />
                      Towing (-25%)
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
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
                    <label className="font-bold text-zinc-700 dark:text-zinc-300">Tolls ({currencySymbol})</label>
                    <Input
                      type="number"
                      value={tolls}
                      onChange={(e) => setTolls(Number(e.target.value))}
                      className="h-7 text-xs font-mono bg-white dark:bg-zinc-900 border-zinc-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-zinc-700 dark:text-zinc-300">Parking ({currencySymbol})</label>
                    <Input
                      type="number"
                      value={parking}
                      onChange={(e) => setParking(Number(e.target.value))}
                      className="h-7 text-xs font-mono bg-white dark:bg-zinc-900 border-zinc-200"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DASHBOARD (Col 5) - SLEEK COMPACT DESIGN */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white p-4 rounded-2xl shadow-md space-y-3.5">
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
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                {currencySymbol}{mode === "commute" ? result.monthlyCommuteCost : result.totalCost}
              </div>
              <p className="text-[11px] text-emerald-100 font-medium">
                {result.distanceFormatted} ({isRoundTrip ? "Round-Trip" : "One-Way"}) | Fuel: {result.fuelVolumeNeeded} {result.fuelVolumeUnit}
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 block">
                Calculated Fuel Economy
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                {result.calculatedMPG} MPG
              </div>
              <p className="text-[11px] text-emerald-100 font-medium">
                Equivalent to {result.calculatedL100km} L/100km
              </p>
            </div>
          )}

          {/* Passenger Cost Card */}
          {mode === "trip" && passengers > 1 && (
            <div className="p-2.5 bg-white/10 backdrop-blur-xs rounded-xl border border-white/20 space-y-0.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-1">
                <Users className="h-3 w-3" /> Group Passenger Split
              </span>
              <div className="text-2xl font-black font-mono text-white">
                {currencySymbol}{result.costPerPerson}
              </div>
              <p className="text-[10px] text-emerald-100">Per person share across {passengers} passengers</p>
            </div>
          )}

          {/* Commute Budget Outlook */}
          {mode === "commute" && (
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
                <span className="text-[9px] uppercase font-bold text-emerald-200 block">Weekly Cost</span>
                <span className="font-mono font-bold text-xs text-white">{currencySymbol}{result.weeklyCommuteCost}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
                <span className="text-[9px] uppercase font-bold text-emerald-200 block">Annual Cost</span>
                <span className="font-mono font-bold text-xs text-white">{currencySymbol}{result.annualCommuteCost}</span>
              </div>
            </div>
          )}

          {/* EV Comparison Card */}
          {mode === "ev_compare" && (
            <div className="p-2.5 bg-white/10 backdrop-blur-xs rounded-xl border border-white/20 space-y-1.5 text-xs">
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-1">
                <Zap className="h-3 w-3 fill-yellow-400 text-yellow-400" /> EV vs. Gas Savings
              </span>
              <div className="flex justify-between font-mono text-[11px]">
                <span>Gasoline: {currencySymbol}{result.gasTripCost}</span>
                <span className="font-bold text-yellow-300">EV: {currencySymbol}{result.evTripCost}</span>
              </div>
              <div className="p-1.5 bg-emerald-500/30 rounded-lg border border-emerald-300/40 text-center font-bold text-white text-xs">
                EV Savings: {currencySymbol}{result.evSavings} per trip!
              </div>
            </div>
          )}

          {/* Side-by-side Mini Metrics */}
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-emerald-200 block">Cost Per {result.distanceUnitName}</span>
              <span className="font-mono font-bold text-xs text-white">{currencySymbol}{result.costPerDistanceUnit}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase font-bold text-emerald-200 block flex items-center gap-1">
                <Leaf className="h-3 w-3 text-emerald-300" /> CO2 Emissions
              </span>
              <span className="font-mono font-bold text-xs text-white">{result.carbonFootprintKg} kg CO2</span>
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
