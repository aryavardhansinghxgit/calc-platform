import {
  MileageCalcMode,
  UnitSystem,
  IndianFuelType,
  ReimbursementCategory,
  EfficiencyTier,
  LegInput,
  EnvironmentalModifiers,
  MileageResult,
} from "./types";

export function getIRSReimbursementRate(category: ReimbursementCategory): number {
  switch (category) {
    case "business":
      return 0.67;
    case "medical":
      return 0.21;
    case "charity":
      return 0.14;
    default:
      return 0.67;
  }
}

export function getIndianDefaultFuelPrice(fuelType: IndianFuelType): number {
  switch (fuelType) {
    case "petrol":
      return 102.50; // ₹/Liter avg
    case "diesel":
      return 90.00; // ₹/Liter avg
    case "cng":
      return 79.50; // ₹/kg avg
    case "lpg":
      return 58.00; // ₹/Liter avg
    case "ev_home":
      return 8.00; // ₹/kWh avg
    case "ev_commercial":
      return 21.00; // ₹/kWh avg
    default:
      return 102.50;
  }
}

export function evaluateEfficiencyTier(usMpg: number): {
  tier: EfficiencyTier;
  label: string;
} {
  if (usMpg < 20) {
    return { tier: "heavy_consumption", label: "Heavy Fuel Consumption (<20 MPG / <8.5 km/l)" };
  } else if (usMpg <= 32) {
    return { tier: "average", label: "Average Efficiency (20–32 MPG / 8.5–13.6 km/l)" };
  } else if (usMpg <= 50) {
    return { tier: "high_efficiency", label: "High Efficiency (33–50 MPG / 14–21 km/l)" };
  } else {
    return { tier: "eco_hybrid", label: "Eco / Hybrid / EV Tier (50+ MPG / 21+ km/l)" };
  }
}

export function calculateMileage(
  mode: MileageCalcMode = "fuel_mileage",
  unitSystem: UnitSystem = "us_imperial",
  // Mode 1: Fuel Mileage Inputs
  distanceInput: number = 350,
  fuelInput: number = 11.5,
  fuelPriceInput: number = 3.50,
  isOdometerMode: boolean = false,
  startOdometer: number = 10000,
  endOdometer: number = 10350,
  // Mode 2: Business Tax Reimbursement Inputs
  businessMiles: number = 450,
  reimbursementCategory: ReimbursementCategory = "business",
  customRatePerMile?: number,
  // Mode 3: Multi-Leg Logger Inputs
  legs: LegInput[] = [],
  // Mode 4: EV & MPGe Inputs
  evDistanceMiles: number = 240,
  evKWhConsumed: number = 75,
  electricityCostPerKWh: number = 0.16,
  // Annual Distance
  annualDistanceMiles: number = 12000,
  // Environmental Modifiers
  modifiers: EnvironmentalModifiers = {
    cityDriving: false,
    towing: false,
    aggressiveDriving: false,
    coldWeather: false,
  },
  // Indian Metric Specifics
  indianFuelType: IndianFuelType = "petrol"
): MileageResult {
  // Environmental penalty ratio
  let penaltyRatio = 0;
  if (modifiers.cityDriving) penaltyRatio += 0.15;
  if (modifiers.towing) penaltyRatio += 0.25;
  if (modifiers.aggressiveDriving) penaltyRatio += 0.20;
  if (modifiers.coldWeather) penaltyRatio += 0.12;

  const penaltyMultiplier = 1 + penaltyRatio;

  let totalDistance = 0;
  let totalFuelUsed = 0;
  let totalFuelCost = 0;
  let usMpg = 0;
  let ukMpg = 0;
  let litersPer100km = 0;
  let kmPerLiter = 0;
  let mpge = 0;
  let kWhPer100mi = 0;
  let taxReimbursementAmount = 0;
  let reimbursementRatePerMile = getIRSReimbursementRate(reimbursementCategory);

  if (customRatePerMile !== undefined && customRatePerMile > 0) {
    reimbursementRatePerMile = customRatePerMile;
  }

  // Currency symbol
  const currencySymbol = unitSystem === "indian_metric" ? "₹" : "$";

  // Units
  let distanceUnit = "mi";
  let fuelUnit = "US Gal";

  if (unitSystem === "indian_metric") {
    distanceUnit = "km";
    if (indianFuelType === "cng") fuelUnit = "kg";
    else if (indianFuelType === "ev_home" || indianFuelType === "ev_commercial") fuelUnit = "kWh";
    else fuelUnit = "Liters";
  } else if (unitSystem === "metric") {
    distanceUnit = "km";
    fuelUnit = "Liters";
  } else if (unitSystem === "uk_imperial") {
    distanceUnit = "mi";
    fuelUnit = "UK Gal";
  }

  if (mode === "fuel_mileage") {
    totalDistance = isOdometerMode ? Math.max(0, endOdometer - startOdometer) : Math.max(0, distanceInput);
    totalFuelUsed = Math.max(0.1, fuelInput) * penaltyMultiplier;
    totalFuelCost = totalFuelUsed * Math.max(0, fuelPriceInput);

    if (unitSystem === "indian_metric") {
      // Input is km and Liters/kg
      const km = totalDistance;
      const fuel = totalFuelUsed;
      kmPerLiter = fuel > 0 ? km / fuel : 0;
      litersPer100km = kmPerLiter > 0 ? 100 / kmPerLiter : 0;
      usMpg = kmPerLiter * 2.35215;
      ukMpg = usMpg * 1.20095;
    } else if (unitSystem === "metric") {
      const km = totalDistance;
      const liters = totalFuelUsed;
      litersPer100km = km > 0 ? (liters * 100) / km : 0;
      kmPerLiter = liters > 0 ? km / liters : 0;
      usMpg = litersPer100km > 0 ? 235.215 / litersPer100km : 0;
      ukMpg = litersPer100km > 0 ? 282.481 / litersPer100km : 0;
    } else if (unitSystem === "uk_imperial") {
      const miles = totalDistance;
      const ukGal = totalFuelUsed;
      ukMpg = ukGal > 0 ? miles / ukGal : 0;
      const usGal = ukGal * 1.20095;
      usMpg = usGal > 0 ? miles / usGal : 0;
      litersPer100km = usMpg > 0 ? 235.215 / usMpg : 0;
      kmPerLiter = litersPer100km > 0 ? 100 / litersPer100km : 0;
    } else {
      const miles = totalDistance;
      const usGal = totalFuelUsed;
      usMpg = usGal > 0 ? miles / usGal : 0;
      ukMpg = usMpg * 1.20095;
      litersPer100km = usMpg > 0 ? 235.215 / usMpg : 0;
      kmPerLiter = litersPer100km > 0 ? 100 / litersPer100km : 0;
    }
  } else if (mode === "tax_reimbursement") {
    totalDistance = Math.max(0, businessMiles);
    taxReimbursementAmount = totalDistance * reimbursementRatePerMile;
    usMpg = 28;
    ukMpg = usMpg * 1.20095;
    litersPer100km = 235.215 / usMpg;
    kmPerLiter = 100 / litersPer100km;
  } else if (mode === "multi_leg") {
    let legDistSum = 0;
    let legFuelSum = 0;
    let legCostSum = 0;

    for (const leg of legs) {
      const d = Math.max(0, leg.distance);
      const f = Math.max(0, leg.fuel) * penaltyMultiplier;
      const p = Math.max(0, leg.pricePerUnit);
      legDistSum += d;
      legFuelSum += f;
      legCostSum += f * p;
    }

    totalDistance = legDistSum;
    totalFuelUsed = legFuelSum;
    totalFuelCost = legCostSum;

    if (unitSystem === "indian_metric") {
      kmPerLiter = totalFuelUsed > 0 ? totalDistance / totalFuelUsed : 0;
      litersPer100km = kmPerLiter > 0 ? 100 / kmPerLiter : 0;
      usMpg = kmPerLiter * 2.35215;
      ukMpg = usMpg * 1.20095;
    } else if (unitSystem === "metric") {
      litersPer100km = totalDistance > 0 ? (totalFuelUsed * 100) / totalDistance : 0;
      kmPerLiter = totalFuelUsed > 0 ? totalDistance / totalFuelUsed : 0;
      usMpg = litersPer100km > 0 ? 235.215 / litersPer100km : 0;
      ukMpg = litersPer100km > 0 ? 282.481 / litersPer100km : 0;
    } else {
      usMpg = totalFuelUsed > 0 ? totalDistance / totalFuelUsed : 0;
      ukMpg = usMpg * 1.20095;
      litersPer100km = usMpg > 0 ? 235.215 / usMpg : 0;
      kmPerLiter = litersPer100km > 0 ? 100 / litersPer100km : 0;
    }
  } else if (mode === "ev_mpge") {
    totalDistance = Math.max(0, evDistanceMiles);
    const kwh = Math.max(0.1, evKWhConsumed) * penaltyMultiplier;
    totalFuelCost = kwh * Math.max(0, electricityCostPerKWh);
    const milesPerKWh = totalDistance / kwh;
    mpge = milesPerKWh * 33.7;
    kWhPer100mi = (kwh / totalDistance) * 100;

    usMpg = mpge;
    ukMpg = mpge * 1.20095;
    litersPer100km = 235.215 / Math.max(1, mpge);
    kmPerLiter = 100 / litersPer100km;
  }

  // Financial Analytics
  const costPerDistance = totalDistance > 0 ? totalFuelCost / totalDistance : 0;
  const distancePerDollar = totalFuelCost > 0 ? totalDistance / totalFuelCost : 0;
  const annualFuelCost = usMpg > 0 ? (annualDistanceMiles / usMpg) * fuelPriceInput : 0;

  // Primary output selection
  let primaryValue = 0;
  let primaryUnit = "MPG";
  let primaryLabel = "Fuel Economy";

  if (mode === "tax_reimbursement") {
    primaryValue = parseFloat(taxReimbursementAmount.toFixed(2));
    primaryUnit = currencySymbol;
    primaryLabel = "Total Mileage Tax Reimbursement";
  } else if (mode === "ev_mpge") {
    primaryValue = parseFloat(mpge.toFixed(1));
    primaryUnit = "MPGe";
    primaryLabel = "Electric Vehicle Efficiency";
  } else if (unitSystem === "indian_metric") {
    primaryValue = parseFloat(kmPerLiter.toFixed(2));
    if (indianFuelType === "ev_home" || indianFuelType === "ev_commercial") {
      primaryUnit = "km/kWh";
      primaryLabel = "EV Efficiency";
    } else if (indianFuelType === "cng") {
      primaryUnit = "km/kg";
      primaryLabel = "CNG Mileage";
    } else {
      primaryUnit = "km/l";
      primaryLabel = "Indian Mileage";
    }
  } else if (unitSystem === "metric") {
    primaryValue = parseFloat(litersPer100km.toFixed(2));
    primaryUnit = "L/100 km";
    primaryLabel = "Fuel Consumption";
  } else if (unitSystem === "uk_imperial") {
    primaryValue = parseFloat(ukMpg.toFixed(1));
    primaryUnit = "UK MPG";
    primaryLabel = "Imperial Fuel Economy";
  } else {
    primaryValue = parseFloat(usMpg.toFixed(1));
    primaryUnit = "US MPG";
    primaryLabel = "Fuel Economy";
  }

  const tierInfo = evaluateEfficiencyTier(usMpg);
  const gaugeAngle = Math.min(180, Math.max(0, (usMpg / 60) * 180));

  return {
    primaryValue,
    primaryUnit,
    primaryLabel,
    currencySymbol,
    usMpg: parseFloat(usMpg.toFixed(1)),
    ukMpg: parseFloat(ukMpg.toFixed(1)),
    litersPer100km: parseFloat(litersPer100km.toFixed(2)),
    kmPerLiter: parseFloat(kmPerLiter.toFixed(2)),
    mpge: parseFloat(mpge.toFixed(1)),
    kWhPer100mi: parseFloat(kWhPer100mi.toFixed(1)),
    costPerDistance: parseFloat(costPerDistance.toFixed(2)),
    costPerDistanceUnit: `${currencySymbol} / ${distanceUnit}`,
    distancePerDollar: parseFloat(distancePerDollar.toFixed(2)),
    distancePerDollarUnit: `${distanceUnit} / ${currencySymbol}`,
    annualFuelCost: Math.round(annualFuelCost),
    taxReimbursementAmount: parseFloat(taxReimbursementAmount.toFixed(2)),
    reimbursementRatePerMile,
    totalDistance: parseFloat(totalDistance.toFixed(1)),
    distanceUnit,
    totalFuelUsed: parseFloat(totalFuelUsed.toFixed(2)),
    fuelUnit,
    totalFuelCost: parseFloat(totalFuelCost.toFixed(2)),
    efficiencyTier: tierInfo.tier,
    efficiencyTierLabel: tierInfo.label,
    gaugeAngle,
    environmentalPenaltyPercent: Math.round(penaltyRatio * 100),
  };
}

export function calculateMileageFromInputs(inputs: Record<string, any>): MileageResult {
  const dist = Number(inputs.distance || inputs.distanceInput || 350);
  const fuel = Number(inputs.fuel || inputs.fuelInput || 11.5);
  const price = Number(inputs.price || inputs.fuelPriceInput || 3.50);

  return calculateMileage("fuel_mileage", "us_imperial", dist, fuel, price);
}
