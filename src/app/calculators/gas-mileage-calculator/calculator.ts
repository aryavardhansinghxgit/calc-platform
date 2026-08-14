import {
  CalcMode,
  UnitSystem,
  FuelType,
  EfficiencyRating,
  FillUpEntry,
  EfficiencyPenaltyFlags,
  GasMileageResult,
} from "./types";

export function convertUSMPGToL100km(usMpg: number): number {
  if (usMpg <= 0) return 0;
  return parseFloat((235.215 / usMpg).toFixed(2));
}

export function convertL100kmToUSMPG(l100: number): number {
  if (l100 <= 0) return 0;
  return parseFloat((235.215 / l100).toFixed(2));
}

export function convertUSMPGToUKMPG(usMpg: number): number {
  return parseFloat((usMpg * 1.20095).toFixed(2));
}

export function convertUKMPGToUSMPG(ukMpg: number): number {
  return parseFloat((ukMpg / 1.20095).toFixed(2));
}

export function convertUSMPGTokmL(usMpg: number): number {
  return parseFloat((usMpg * 0.425144).toFixed(2));
}

export function convertkmLToUSMPG(kmL: number): number {
  return parseFloat((kmL * 2.35215).toFixed(2));
}

export function calculatePenaltyMultiplier(flags: EfficiencyPenaltyFlags): number {
  let mult = 1.0;
  if (flags.cityDriving) mult *= 0.8; // -20%
  if (flags.highSpeed) mult *= 0.8; // -20%
  if (flags.winterCold) mult *= 0.9; // -10%
  if (flags.roofCargo) mult *= 0.85; // -15%
  return mult;
}

export function evaluateEfficiencyRating(usMpg: number, unitSystem: UnitSystem): {
  rating: EfficiencyRating;
  label: string;
  percentage: number;
} {
  const kmL = usMpg * 0.425144;

  if (unitSystem === "indian") {
    if (kmL < 12) {
      return { rating: "poor", label: "Poor Efficiency (<12 km/l)", percentage: 25 };
    } else if (kmL <= 18) {
      return { rating: "average", label: "Average Efficiency (12–18 km/l)", percentage: 50 };
    } else if (kmL <= 25) {
      return { rating: "excellent", label: "Excellent Efficiency (18–25 km/l)", percentage: 75 };
    } else {
      return { rating: "hybrid", label: "Ultra-Efficient / Hybrid / CNG / EV (25+ km/l)", percentage: 100 };
    }
  }

  if (usMpg < 20) {
    return { rating: "poor", label: "Poor Efficiency (<20 MPG)", percentage: 25 };
  } else if (usMpg <= 30) {
    return { rating: "average", label: "Average Efficiency (20–30 MPG)", percentage: 50 };
  } else if (usMpg <= 49) {
    return { rating: "excellent", label: "Excellent Efficiency (31–49 MPG)", percentage: 75 };
  } else {
    return { rating: "hybrid", label: "Ultra-Efficient / Hybrid (50+ MPG)", percentage: 100 };
  }
}

export function calculateGasMileage(
  mode: CalcMode = "odometer",
  unitSystem: UnitSystem = "us",
  fuelType: FuelType = "gasoline",
  startOdo: number = 12000,
  endOdo: number = 12360,
  tripDistance: number = 360,
  fuelAdded: number = 12,
  fuelPrice: number = 3.5,
  tankCapacity: number = 15,
  annualMileageInput: number = 15000,
  multiTankLogs: FillUpEntry[] = [],
  penalties: EfficiencyPenaltyFlags = {
    cityDriving: false,
    highSpeed: false,
    winterCold: false,
    roofCargo: false,
  }
): GasMileageResult {
  const penaltyMult = calculatePenaltyMultiplier(penalties);

  let totalDistance = 0;
  let totalFuelVolume = 0;
  let avgPrice = fuelPrice;

  if (mode === "odometer") {
    totalDistance = Math.max(0, endOdo - startOdo);
    totalFuelVolume = Math.max(0.1, fuelAdded);
  } else if (mode === "trip") {
    totalDistance = Math.max(0, tripDistance);
    totalFuelVolume = Math.max(0.1, fuelAdded);
  } else if (mode === "multi_tank") {
    if (multiTankLogs.length > 0) {
      totalDistance = multiTankLogs.reduce((acc, log) => acc + log.distance, 0);
      totalFuelVolume = multiTankLogs.reduce((acc, log) => acc + log.fuelAdded, 0);
      const totalPriceSum = multiTankLogs.reduce((acc, log) => acc + log.pricePerUnit * log.fuelAdded, 0);
      if (totalFuelVolume > 0) avgPrice = totalPriceSum / totalFuelVolume;
    } else {
      totalDistance = 360;
      totalFuelVolume = 12;
    }
  } else if (mode === "tank_range") {
    totalDistance = tripDistance;
    totalFuelVolume = fuelAdded;
  }

  let usMpg = 0;
  let l100km = 0;
  let kmL = 0;

  if (unitSystem === "us") {
    usMpg = totalDistance > 0 && totalFuelVolume > 0 ? totalDistance / totalFuelVolume : 0;
    l100km = convertUSMPGToL100km(usMpg);
    kmL = convertUSMPGTokmL(usMpg);
  } else if (unitSystem === "uk") {
    const ukMpgRaw = totalDistance > 0 && totalFuelVolume > 0 ? totalDistance / totalFuelVolume : 0;
    usMpg = convertUKMPGToUSMPG(ukMpgRaw);
    l100km = convertUSMPGToL100km(usMpg);
    kmL = convertUSMPGTokmL(usMpg);
  } else if (unitSystem === "indian") {
    // Indian Metric: km driven and Liters (or kg for CNG)
    kmL = totalDistance > 0 && totalFuelVolume > 0 ? totalDistance / totalFuelVolume : 0;
    usMpg = convertkmLToUSMPG(kmL);
    l100km = convertUSMPGToL100km(usMpg);
  } else {
    // Metric L/100km: KM and Liters
    l100km = totalDistance > 0 && totalFuelVolume > 0 ? (totalFuelVolume / totalDistance) * 100 : 0;
    usMpg = convertL100kmToUSMPG(l100km);
    kmL = convertUSMPGTokmL(usMpg);
  }

  const ukMpg = convertUSMPGToUKMPG(usMpg);

  // Real-world effective values applying penalties
  const effectiveMPG = parseFloat((usMpg * penaltyMult).toFixed(1));
  const effectiveL100km = penaltyMult > 0 ? parseFloat((l100km / penaltyMult).toFixed(1)) : l100km;
  const effectiveKmL = parseFloat((kmL * penaltyMult).toFixed(1));

  // Cost per distance unit & distance per dollar
  let costPerDistUnit = 0;
  let distPerDollar = 0;

  if (unitSystem === "indian") {
    const validKmL = Math.max(0.1, effectiveKmL);
    costPerDistUnit = avgPrice / validKmL;
    distPerDollar = avgPrice > 0 ? validKmL / avgPrice : 0;
  } else if (unitSystem === "metric") {
    costPerDistUnit = (effectiveL100km / 100) * avgPrice;
    distPerDollar = avgPrice > 0 ? (100 / (effectiveL100km * avgPrice)) : 0;
  } else {
    const validMpg = Math.max(0.1, effectiveMPG);
    costPerDistUnit = avgPrice / validMpg;
    distPerDollar = avgPrice > 0 ? validMpg / avgPrice : 0;
  }

  // Tank Range & Cost to Fill
  let totalTankRange = 0;
  if (unitSystem === "indian") {
    totalTankRange = tankCapacity * effectiveKmL;
  } else if (unitSystem === "metric") {
    totalTankRange = effectiveL100km > 0 ? (tankCapacity / effectiveL100km) * 100 : 0;
  } else {
    totalTankRange = tankCapacity * effectiveMPG;
  }
  const costToFillTank = tankCapacity * avgPrice;

  // Annual Spending & CO2 Footprint
  const annualDistance = annualMileageInput > 0 ? annualMileageInput : (unitSystem === "metric" || unitSystem === "indian") ? 24000 : 15000;
  let annualFuelVol = 0;

  if (unitSystem === "indian") {
    const validKmL = Math.max(0.1, effectiveKmL);
    annualFuelVol = annualDistance / validKmL;
  } else if (unitSystem === "metric") {
    annualFuelVol = (annualDistance * effectiveL100km) / 100;
  } else {
    const validMpg = Math.max(0.1, effectiveMPG);
    annualFuelVol = annualDistance / validMpg;
  }
  const annualFuelCost = annualFuelVol * avgPrice;

  // Carbon Factor depending on fuel grade
  let co2Factor = 2.348; // default kg/L
  if (unitSystem === "us" || unitSystem === "uk") {
    co2Factor = 8.887; // kg/gal
  }

  if (fuelType === "diesel") {
    co2Factor = (unitSystem === "us" || unitSystem === "uk") ? 10.18 : 2.689;
  } else if (fuelType === "cng") {
    co2Factor = (unitSystem === "us" || unitSystem === "uk") ? 10.4 : 2.75; // kg CO2 per kg CNG
  } else if (fuelType === "flex_fuel") {
    co2Factor = (unitSystem === "us" || unitSystem === "uk") ? 5.75 : 1.52; // Bio-ethanol offset
  } else if (fuelType === "lpg") {
    co2Factor = (unitSystem === "us" || unitSystem === "uk") ? 6.10 : 1.61;
  } else if (fuelType === "electric") {
    co2Factor = (unitSystem === "us" || unitSystem === "uk") ? 3.10 : 0.82; // Grid average
  }

  const carbonKg = annualFuelVol * co2Factor;
  const carbonTons = carbonKg / 1000;

  const ratingInfo = evaluateEfficiencyRating(effectiveMPG, unitSystem);

  // MPGe Equivalent (1 US gal gas = 33.7 kWh)
  const mpgeEquivalent = parseFloat((effectiveMPG * 1.1).toFixed(1));
  const evCostPer100mi = parseFloat(((30 * 0.15)).toFixed(2));

  const distUnit = (unitSystem === "metric" || unitSystem === "indian") ? "km" : "miles";
  const volUnit = fuelType === "cng"
    ? "kg"
    : fuelType === "electric"
    ? "kWh"
    : (unitSystem === "metric" || unitSystem === "indian")
    ? "liters"
    : unitSystem === "uk"
    ? "UK gal"
    : "US gal";

  const effUnit = unitSystem === "indian"
    ? fuelType === "cng"
      ? "km/kg"
      : fuelType === "electric"
      ? "km/kWh"
      : "km/l"
    : unitSystem === "metric"
    ? "L/100km"
    : unitSystem === "uk"
    ? "UK MPG"
    : "US MPG";

  return {
    usMPG: parseFloat(usMpg.toFixed(1)),
    ukMPG: parseFloat(ukMpg.toFixed(1)),
    l100km: parseFloat(l100km.toFixed(1)),
    kmL: parseFloat(kmL.toFixed(1)),
    effectiveMPG,
    effectiveL100km,
    effectiveKmL,
    costPerDistanceUnit: parseFloat(costPerDistUnit.toFixed(2)),
    distancePerCurrencyUnit: parseFloat(distPerDollar.toFixed(1)),
    distanceUnitName: distUnit,
    fuelVolumeUnitName: volUnit,
    efficiencyUnitName: effUnit,
    totalTankRange: Math.round(totalTankRange),
    costToFillTank: parseFloat(costToFillTank.toFixed(2)),
    annualFuelCost: parseFloat(annualFuelCost.toFixed(2)),
    annualFuelVolume: parseFloat(annualFuelVol.toFixed(1)),
    carbonFootprintKg: parseFloat(carbonKg.toFixed(1)),
    carbonFootprintTons: parseFloat(carbonTons.toFixed(2)),
    rating: ratingInfo.rating,
    ratingLabel: ratingInfo.label,
    ratingPercentage: ratingInfo.percentage,
    mpgeEquivalent,
    evCostPer100mi,
  };
}

export function calculateGasMileageFromInputs(inputs: Record<string, any>): GasMileageResult {
  const startOdo = Number(inputs.startOdometer || 12000);
  const endOdo = Number(inputs.endOdometer || 12360);
  const fuelAdded = Number(inputs.fuelAdded || 12);
  const price = Number(inputs.fuelPrice || 3.5);
  const unit = (inputs.unitSystem as UnitSystem) || "us";

  return calculateGasMileage("odometer", unit, "gasoline", startOdo, endOdo, 360, fuelAdded, price);
}
