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

export function convertMPGToL100km(mpg: number): number {
  if (mpg <= 0) return 0;
  return parseFloat((235.215 / mpg).toFixed(2));
}

export function convertL100kmToMPG(l100: number): number {
  if (l100 <= 0) return 0;
  return parseFloat((235.215 / l100).toFixed(2));
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
  const penaltyMult = calculatePenaltyMultiplier(penalties);

  // Determine Distance
  let totalDistance = distanceInput * (isRoundTrip ? 2 : 1);
  if (mode === "mpg_solver") {
    totalDistance = Math.max(0, endOdo - startOdo);
  }

  // Effective Efficiency
  let effectiveEfficiency = efficiencyInput;
  if (unitSystem === "imperial") {
    effectiveEfficiency = efficiencyInput * penaltyMult;
  } else {
    // Metric L/100km: penalty increases consumption
    effectiveEfficiency = penaltyMult > 0 ? efficiencyInput / penaltyMult : efficiencyInput;
  }

  // Calculate Fuel Volume & Cost
  let fuelVolume = 0;
  let fuelOnlyCost = 0;

  if (unitSystem === "imperial") {
    const validMPG = Math.max(0.1, effectiveEfficiency);
    fuelVolume = totalDistance / validMPG;
    fuelOnlyCost = fuelVolume * fuelPriceInput;
  } else {
    const validL100 = Math.max(0.1, effectiveEfficiency);
    fuelVolume = (totalDistance * validL100) / 100;
    fuelOnlyCost = fuelVolume * fuelPriceInput;
  }

  const maintCost = totalDistance * maintPerDistance;
  const tollsAndExpenses = tolls + parking + maintCost;
  const totalCost = fuelOnlyCost + tollsAndExpenses;
  const costPerPerson = totalCost / Math.max(1, passengers);

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

  // 1. Commute Planner Results
  let weeklyCommuteCost = 0;
  let monthlyCommuteCost = 0;
  let annualCommuteCost = 0;

  if (mode === "commute") {
    const dailyCost = totalCost;
    weeklyCommuteCost = dailyCost * 5;
    monthlyCommuteCost = dailyCost * workDaysPerMonth;
    annualCommuteCost = monthlyCommuteCost * 12;
  }

  // 2. EV Comparison Results
  let evTripCost = 0;
  let gasTripCost = 0;
  let evSavings = 0;

  if (mode === "ev_compare") {
    gasTripCost = fuelOnlyCost;
    // EV Energy = (Distance / 100) * kWh_per_100mi
    const evKwhTotal = (totalDistance / 100) * evKwhPer100mi;
    evTripCost = evKwhTotal * electricityRatePerKwh;
    evSavings = gasTripCost - evTripCost;
  }

  // 3. MPG Solver Results
  let calculatedMPG = 0;
  let calculatedL100km = 0;

  if (mode === "mpg_solver") {
    if (fuelAdded > 0 && totalDistance > 0) {
      if (unitSystem === "imperial") {
        calculatedMPG = parseFloat((totalDistance / fuelAdded).toFixed(2));
        calculatedL100km = convertMPGToL100km(calculatedMPG);
      } else {
        calculatedL100km = parseFloat(((fuelAdded / totalDistance) * 100).toFixed(2));
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
    weeklyCommuteCost: parseFloat(weeklyCommuteCost.toFixed(2)),
    monthlyCommuteCost: parseFloat(monthlyCommuteCost.toFixed(2)),
    annualCommuteCost: parseFloat(annualCommuteCost.toFixed(2)),
    evTripCost: parseFloat(evTripCost.toFixed(2)),
    gasTripCost: parseFloat(gasTripCost.toFixed(2)),
    evSavings: parseFloat(evSavings.toFixed(2)),
    calculatedMPG,
    calculatedL100km,
    fuelOnlyCost: parseFloat(fuelOnlyCost.toFixed(2)),
    tollsAndExpenses: parseFloat(tollsAndExpenses.toFixed(2)),
  };
}

export function calculateFuelCostFromInputs(inputs: Record<string, any>): FuelCostResult {
  const distance = Number(inputs.distance || inputs.tripDistance || 300);
  const efficiency = Number(inputs.efficiency || inputs.mpg || 25);
  const price = Number(inputs.fuelPrice || inputs.price || 3.5);
  const unit = (inputs.unitSystem as UnitSystem) || "imperial";

  return calculateFuelCost("trip", unit, "gasoline", distance, false, efficiency, price);
}
