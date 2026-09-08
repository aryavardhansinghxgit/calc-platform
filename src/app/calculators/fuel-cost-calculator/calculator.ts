import {
  CalcMode,
  UnitSystem,
  FuelType,
  EfficiencyPenaltyFlags,
  FuelCostResult,
} from "./types";

export function calculatePenaltyMultiplier(flags: EfficiencyPenaltyFlags): number {
  let mult = 1.0;
  if (flags.roofRack) mult *= 0.85; // -15%
  if (flags.highSpeed) mult *= 0.8; // -20%
  if (flags.towing) mult *= 0.75; // -25%
  if (flags.winterCold) mult *= 0.9; // -10%
  return mult;
}

// Full floating-point precision conversion constants (US: 235.214583, UK Imperial: 282.481)
export function convertMPGToL100km(mpg: number, isImperialGal: boolean = false): number {
  if (mpg <= 0) return 0;
  const constant = isImperialGal ? 282.481 : 235.214583;
  return constant / mpg;
}

export function convertL100kmToMPG(l100: number, isImperialGal: boolean = false): number {
  if (l100 <= 0) return 0;
  const constant = isImperialGal ? 282.481 : 235.214583;
  return constant / l100;
}

export function calculateFuelCost(
  mode: CalcMode = "trip",
  unitSystem: UnitSystem = "imperial",
  fuelType: FuelType = "gasoline",
  distanceInput: number = 300,
  isRoundTrip: boolean = false,
  efficiencyInput: number = 25, // MPG or L/100km
  fuelPriceInput: number = 3.5,
  passengers: number = 1,
  tolls: number = 0,
  parking: number = 0,
  maintPerDistance: number = 0,
  penalties: EfficiencyPenaltyFlags = {
    roofRack: false,
    highSpeed: false,
    towing: false,
    winterCold: false,
  },
  // Commute Planner
  workDaysPerMonth: number = 22,
  // MPG Solver
  startOdo: number = 10000,
  endOdo: number = 10350,
  fuelAdded: number = 14,
  // EV Comparison
  evKwhPer100mi: number = 30,
  electricityRatePerKwh: number = 0.15
): FuelCostResult {
  let validationError: string | null = null;

  // Validation checks
  if (distanceInput < 0) {
    validationError = "Distance cannot be negative.";
  }
  if (fuelPriceInput < 0) {
    validationError = "Fuel price cannot be negative.";
  }
  if (tolls < 0 || parking < 0) {
    validationError = "Tolls and parking fees cannot be negative.";
  }
  if (mode !== "mpg_solver" && efficiencyInput <= 0) {
    validationError = "Fuel efficiency must be greater than 0.";
  }
  if (mode === "mpg_solver") {
    if (endOdo < startOdo) {
      validationError = "End odometer must be greater than or equal to start odometer.";
    } else if (fuelAdded < 0) {
      validationError = "Fuel added cannot be negative.";
    } else if (fuelAdded === 0 && endOdo > startOdo) {
      validationError = "Fuel added must be greater than 0 to calculate MPG.";
    }
  }

  const penaltyMult = calculatePenaltyMultiplier(penalties);

  // Determine Distance
  let totalDistance = 0;
  if (mode === "mpg_solver") {
    totalDistance = Math.max(0, endOdo - startOdo);
  } else {
    totalDistance = Math.max(0, distanceInput) * (isRoundTrip ? 2 : 1);
  }

  // Effective Efficiency
  let effectiveEfficiency = Math.max(0, efficiencyInput);
  if (unitSystem === "imperial") {
    effectiveEfficiency = efficiencyInput * penaltyMult;
  } else {
    // Metric L/100km: penalty increases fuel consumption rate
    effectiveEfficiency = penaltyMult > 0 ? efficiencyInput / penaltyMult : efficiencyInput;
  }

  // Calculate Fuel Volume & Cost
  let fuelVolume = 0;
  let fuelOnlyCost = 0;

  if (mode === "mpg_solver") {
    // P1-01 Fix: In MPG Solver mode, fuel volume is the actual fuel added by the user
    fuelVolume = Math.max(0, fuelAdded);
    fuelOnlyCost = fuelVolume * Math.max(0, fuelPriceInput);
  } else if (effectiveEfficiency > 0 && totalDistance > 0) {
    if (unitSystem === "imperial") {
      fuelVolume = totalDistance / effectiveEfficiency;
      fuelOnlyCost = fuelVolume * Math.max(0, fuelPriceInput);
    } else {
      fuelVolume = (totalDistance * effectiveEfficiency) / 100;
      fuelOnlyCost = fuelVolume * Math.max(0, fuelPriceInput);
    }
  }

  const maintCost = totalDistance * Math.max(0, maintPerDistance);
  const tollsAndExpenses = Math.max(0, tolls) + Math.max(0, parking) + maintCost;
  const totalCost = fuelOnlyCost + tollsAndExpenses;
  const safePassengers = Math.max(1, passengers);
  const costPerPerson = totalCost / safePassengers;

  const distUnit = unitSystem === "imperial" ? "miles" : "km";
  const volUnit = unitSystem === "imperial" ? "gallons" : "liters";
  const effUnit = unitSystem === "imperial" ? "MPG" : "L/100km";

  const costPerDistUnit = totalDistance > 0 ? totalCost / totalDistance : 0;

  // Carbon Footprint: Gas = 8.887 kg CO2 / gal (2.348 kg/L), Diesel = 10.18 kg CO2 / gal (2.689 kg/L)
  let co2PerUnit = unitSystem === "imperial" ? 8.887 : 2.348;
  if (fuelType === "diesel") {
    co2PerUnit = unitSystem === "imperial" ? 10.18 : 2.689;
  }
  const carbonFootprint = fuelVolume * co2PerUnit;

  // 1. Commute Planner Results (P1-02 Fix)
  let weeklyCommuteCost = 0;
  let monthlyCommuteCost = 0;
  let annualCommuteCost = 0;
  let dailyFuelCost = 0;
  let dailyFuelVolume = 0;
  let monthlyDistanceFormatted = "";
  let monthlyFuelVolume = 0;

  if (mode === "commute") {
    const validWorkDays = Math.max(0, workDaysPerMonth);
    dailyFuelCost = totalCost;
    dailyFuelVolume = fuelVolume;
    weeklyCommuteCost = dailyFuelCost * 5;
    monthlyCommuteCost = dailyFuelCost * validWorkDays;
    annualCommuteCost = monthlyCommuteCost * 12;
    monthlyFuelVolume = dailyFuelVolume * validWorkDays;
    const monthlyDistance = totalDistance * validWorkDays;
    monthlyDistanceFormatted = `${monthlyDistance.toLocaleString()} ${distUnit}`;
  }

  // 2. EV Comparison Results (P2-01 & P2-02 Fix)
  let evTripCost = 0;
  let gasTripCost = 0;
  let evSavings = 0;
  let evKwhTotal = 0;
  let isEvPremium = false;

  if (mode === "ev_compare") {
    gasTripCost = fuelOnlyCost;
    // EV Energy = (Distance / 100) * kWh_per_100mi
    evKwhTotal = (totalDistance / 100) * Math.max(0, evKwhPer100mi);
    evTripCost = evKwhTotal * Math.max(0, electricityRatePerKwh);
    evSavings = gasTripCost - evTripCost;
    isEvPremium = evSavings < 0;
  }

  // 3. MPG Solver Results (P1-01 & P2-04 Fix)
  let calculatedMPG = 0;
  let calculatedL100km = 0;

  if (mode === "mpg_solver") {
    if (fuelAdded > 0 && totalDistance > 0) {
      if (unitSystem === "imperial") {
        calculatedMPG = totalDistance / fuelAdded;
        calculatedL100km = convertMPGToL100km(calculatedMPG);
      } else {
        calculatedL100km = (fuelAdded / totalDistance) * 100;
        calculatedMPG = convertL100kmToMPG(calculatedL100km);
      }
    }
  }

  return {
    totalCost: parseFloat(totalCost.toFixed(2)),
    costPerPerson: parseFloat(costPerPerson.toFixed(2)),
    fuelVolumeNeeded: parseFloat(fuelVolume.toFixed(2)),
    fuelVolumeUnit: volUnit,
    distanceFormatted: `${totalDistance.toLocaleString()} ${distUnit}`,
    costPerDistanceUnit: parseFloat(costPerDistUnit.toFixed(3)),
    distanceUnitName: distUnit,
    effectiveEfficiency: parseFloat(effectiveEfficiency.toFixed(1)),
    efficiencyUnitName: effUnit,
    carbonFootprintKg: parseFloat(carbonFootprint.toFixed(1)),
    // Commute Planner
    weeklyCommuteCost: parseFloat(weeklyCommuteCost.toFixed(2)),
    monthlyCommuteCost: parseFloat(monthlyCommuteCost.toFixed(2)),
    annualCommuteCost: parseFloat(annualCommuteCost.toFixed(2)),
    dailyFuelCost: parseFloat(dailyFuelCost.toFixed(2)),
    dailyFuelVolume: parseFloat(dailyFuelVolume.toFixed(2)),
    monthlyDistanceFormatted,
    monthlyFuelVolume: parseFloat(monthlyFuelVolume.toFixed(2)),
    workDaysCount: workDaysPerMonth,
    // EV Comparison
    evTripCost: parseFloat(evTripCost.toFixed(2)),
    gasTripCost: parseFloat(gasTripCost.toFixed(2)),
    evSavings: parseFloat(evSavings.toFixed(2)),
    isEvPremium,
    evKwhTotal: parseFloat(evKwhTotal.toFixed(1)),
    // MPG Solver
    calculatedMPG: parseFloat(calculatedMPG.toFixed(2)),
    calculatedL100km: parseFloat(calculatedL100km.toFixed(2)),
    fuelOnlyCost: parseFloat(fuelOnlyCost.toFixed(2)),
    tollsAndExpenses: parseFloat(tollsAndExpenses.toFixed(2)),
    validationError,
  };
}

// P1-03 Fix: Explicit nullish coalescing to preserve legitimate numeric zeroes
export function calculateFuelCostFromInputs(inputs: Record<string, any>): FuelCostResult {
  const distance = Number(inputs.distance ?? inputs.tripDistance ?? 300);
  const efficiency = Number(inputs.efficiency ?? inputs.mpg ?? 25);
  const price = Number(inputs.fuelPrice ?? inputs.price ?? 3.5);
  const unit = (inputs.unitSystem as UnitSystem) ?? "imperial";

  return calculateFuelCost("trip", unit, "gasoline", distance, false, efficiency, price);
}
