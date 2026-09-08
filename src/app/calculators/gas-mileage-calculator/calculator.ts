import {
  CalcMode,
  UnitSystem,
  FuelType,
  EfficiencyRating,
  FillUpEntry,
  EfficiencyPenaltyFlags,
  GasMileageResult,
} from "./types";

// Exact physical constants (NIST / ISO standards)
export const US_MPG_TO_L100KM_CONST = 235.214583;
export const UK_MPG_TO_L100KM_CONST = 282.481;
export const US_TO_UK_GALLON_RATIO = 4.54609 / 3.785411784; // ~1.2009499255
export const US_MPG_TO_KM_PER_L = 1.609344 / 3.785411784; // ~0.425143707

/**
 * Pure numeric conversion helpers returning unrounded IEEE 754 numbers.
 * Formatting with .toFixed() must only occur at presentation.
 */
export function convertUSMPGToL100km(usMpg: number): number {
  if (usMpg <= 0) return 0;
  return US_MPG_TO_L100KM_CONST / usMpg;
}

export function convertL100kmToUSMPG(l100: number): number {
  if (l100 <= 0) return 0;
  return US_MPG_TO_L100KM_CONST / l100;
}

export function convertUKMPGToL100km(ukMpg: number): number {
  if (ukMpg <= 0) return 0;
  return UK_MPG_TO_L100KM_CONST / ukMpg;
}

export function convertL100kmToUKMPG(l100: number): number {
  if (l100 <= 0) return 0;
  return UK_MPG_TO_L100KM_CONST / l100;
}

export function convertUSMPGToUKMPG(usMpg: number): number {
  return usMpg * US_TO_UK_GALLON_RATIO;
}

export function convertUKMPGToUSMPG(ukMpg: number): number {
  return ukMpg / US_TO_UK_GALLON_RATIO;
}

export function convertUSMPGTokmL(usMpg: number): number {
  return usMpg * US_MPG_TO_KM_PER_L;
}

export function convertkmLToUSMPG(kmL: number): number {
  return kmL / US_MPG_TO_KM_PER_L;
}

export function convertkmLToL100km(kmL: number): number {
  if (kmL <= 0) return 0;
  return 100 / kmL;
}

export function convertL100kmTokmL(l100: number): number {
  if (l100 <= 0) return 0;
  return 100 / l100;
}

export function calculatePenaltyMultiplier(flags: EfficiencyPenaltyFlags): number {
  let mult = 1.0;
  if (flags.cityDriving) mult *= 0.8; // -20%
  if (flags.highSpeed) mult *= 0.8; // -20%
  if (flags.winterCold) mult *= 0.9; // -10%
  if (flags.roofCargo) mult *= 0.85; // -15%
  return mult;
}

export function evaluateEfficiencyRating(effectiveMpg: number, unitSystem: UnitSystem): {
  rating: EfficiencyRating;
  label: string;
  percentage: number;
} {
  const kmL = effectiveMpg * US_MPG_TO_KM_PER_L;

  // Continuous linear progress bar calculation (0-100%)
  // 30 MPG maps to ~54.5%, 50 MPG maps to ~91%, 55+ MPG is 100%
  const percentage = Math.min(100, Math.max(0, parseFloat(((effectiveMpg / 55) * 100).toFixed(1))));

  if (unitSystem === "indian") {
    if (kmL < 12) {
      return { rating: "poor", label: "Poor Efficiency (<12 km/l)", percentage };
    } else if (kmL <= 18) {
      return { rating: "average", label: "Average Efficiency (12–18 km/l)", percentage };
    } else if (kmL <= 25) {
      return { rating: "excellent", label: "Excellent Efficiency (18–25 km/l)", percentage };
    } else {
      return { rating: "hybrid", label: "Ultra-Efficient / Hybrid / CNG / EV (25+ km/l)", percentage };
    }
  }

  if (effectiveMpg < 20) {
    return { rating: "poor", label: "Poor Efficiency (<20 MPG)", percentage };
  } else if (effectiveMpg <= 30) {
    return { rating: "average", label: "Average Efficiency (20–30 MPG)", percentage };
  } else if (effectiveMpg <= 49) {
    return { rating: "excellent", label: "Excellent Efficiency (31–49 MPG)", percentage };
  } else {
    return { rating: "hybrid", label: "Ultra-Efficient / Hybrid (50+ MPG)", percentage };
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
  annualMileageInput?: number,
  multiTankLogs: FillUpEntry[] = [],
  penalties: EfficiencyPenaltyFlags = {
    cityDriving: false,
    highSpeed: false,
    winterCold: false,
    roofCargo: false,
  }
): GasMileageResult {
  const distUnit = unitSystem === "metric" || unitSystem === "indian" ? "km" : "miles";
  const volUnit =
    fuelType === "cng"
      ? "kg"
      : fuelType === "electric"
      ? "kWh"
      : unitSystem === "metric" || unitSystem === "indian"
      ? "liters"
      : unitSystem === "uk"
      ? "UK gal"
      : "US gal";

  const effUnit =
    unitSystem === "indian"
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

  // Base empty result template for validation errors
  const createEmptyResult = (validationError: string): GasMileageResult => ({
    validationError,
    totalDistance: 0,
    totalFuelVolume: 0,
    avgPricePerUnit: fuelPrice,
    tripFuelCost: 0,
    usMPG: 0,
    ukMPG: 0,
    l100km: 0,
    kmL: 0,
    effectiveMPG: 0,
    effectiveL100km: 0,
    effectiveKmL: 0,
    costPerDistanceUnit: 0,
    distancePerCurrencyUnit: 0,
    distanceUnitName: distUnit,
    fuelVolumeUnitName: volUnit,
    efficiencyUnitName: effUnit,
    totalTankRange: 0,
    costToFillTank: 0,
    annualFuelCost: 0,
    annualFuelVolume: 0,
    carbonFootprintKg: 0,
    carbonFootprintTons: 0,
    rating: "poor",
    ratingLabel: "No result",
    ratingPercentage: 0,
    mpgeEquivalent: 0,
    evCostPer100mi: 0,
  });

  // Universal numeric domain checks
  if (fuelPrice < 0) {
    return createEmptyResult("Fuel price cannot be negative.");
  }
  if (tankCapacity < 0) {
    return createEmptyResult("Tank capacity cannot be negative.");
  }
  if (annualMileageInput !== undefined && annualMileageInput !== null && annualMileageInput < 0) {
    return createEmptyResult("Annual driving mileage cannot be negative.");
  }

  let totalDistance = 0;
  let totalFuelVolume = 0;
  let avgPrice = fuelPrice;

  if (mode === "odometer") {
    if (startOdo < 0 || endOdo < 0) {
      return createEmptyResult("Odometer readings cannot be negative.");
    }
    if (endOdo < startOdo) {
      return createEmptyResult("End odometer reading must be greater than or equal to start odometer.");
    }
    totalDistance = endOdo - startOdo;
    if (fuelAdded < 0) {
      return createEmptyResult("Fuel volume added cannot be negative.");
    }
    if (totalDistance > 0 && fuelAdded === 0) {
      return createEmptyResult("Fuel volume added must be greater than 0 to calculate fuel economy.");
    }
    if (totalDistance === 0 && fuelAdded > 0) {
      return createEmptyResult("Distance traveled is 0. Fuel economy is undefined.");
    }
    totalFuelVolume = fuelAdded;
  } else if (mode === "trip") {
    if (tripDistance < 0) {
      return createEmptyResult("Trip distance cannot be negative.");
    }
    if (fuelAdded < 0) {
      return createEmptyResult("Fuel volume added cannot be negative.");
    }
    if (tripDistance > 0 && fuelAdded === 0) {
      return createEmptyResult("Fuel volume added must be greater than 0 to calculate fuel economy.");
    }
    if (tripDistance === 0 && fuelAdded > 0) {
      return createEmptyResult("Distance traveled is 0. Fuel economy is undefined.");
    }
    totalDistance = tripDistance;
    totalFuelVolume = fuelAdded;
  } else if (mode === "multi_tank") {
    if (multiTankLogs.length === 0) {
      return createEmptyResult("Add at least one fuel-up record to calculate rolling mileage.");
    }
    for (const log of multiTankLogs) {
      if (log.distance < 0 || log.fuelAdded < 0 || log.pricePerUnit < 0) {
        return createEmptyResult("Fill-up entries cannot contain negative values.");
      }
      if (log.distance > 0 && log.fuelAdded === 0) {
        return createEmptyResult("Fuel volume in each tank entry must be greater than 0.");
      }
    }
    totalDistance = multiTankLogs.reduce((acc, log) => acc + log.distance, 0);
    totalFuelVolume = multiTankLogs.reduce((acc, log) => acc + log.fuelAdded, 0);
    const totalPriceSum = multiTankLogs.reduce((acc, log) => acc + log.pricePerUnit * log.fuelAdded, 0);
    if (totalFuelVolume > 0) {
      avgPrice = totalPriceSum / totalFuelVolume;
    }
  } else if (mode === "tank_range") {
    if (tripDistance < 0) {
      return createEmptyResult("Trip distance cannot be negative.");
    }
    if (fuelAdded < 0) {
      return createEmptyResult("Fuel volume added cannot be negative.");
    }
    if (tripDistance > 0 && fuelAdded === 0) {
      return createEmptyResult("Fuel volume added must be greater than 0 to calculate fuel economy.");
    }
    totalDistance = tripDistance;
    totalFuelVolume = fuelAdded;
  }

  // Raw fuel economies
  let usMpg = 0;
  let ukMpg = 0;
  let l100km = 0;
  let kmL = 0;

  if (totalDistance > 0 && totalFuelVolume > 0) {
    if (unitSystem === "us") {
      usMpg = totalDistance / totalFuelVolume;
      ukMpg = convertUSMPGToUKMPG(usMpg);
      l100km = convertUSMPGToL100km(usMpg);
      kmL = convertUSMPGTokmL(usMpg);
    } else if (unitSystem === "uk") {
      ukMpg = totalDistance / totalFuelVolume;
      usMpg = convertUKMPGToUSMPG(ukMpg);
      l100km = convertUKMPGToL100km(ukMpg);
      kmL = convertUSMPGTokmL(usMpg);
    } else if (unitSystem === "indian") {
      kmL = totalDistance / totalFuelVolume;
      l100km = convertkmLToL100km(kmL);
      usMpg = convertkmLToUSMPG(kmL);
      ukMpg = convertUSMPGToUKMPG(usMpg);
    } else {
      // Metric (L/100km)
      l100km = (totalFuelVolume / totalDistance) * 100;
      kmL = convertL100kmTokmL(l100km);
      usMpg = convertL100kmToUSMPG(l100km);
      ukMpg = convertUSMPGToUKMPG(usMpg);
    }
  }

  // Multiplicative real-world penalties applied to unrounded raw numbers
  const penaltyMult = calculatePenaltyMultiplier(penalties);
  const effectiveMPG = usMpg * penaltyMult;
  const effectiveKmL = kmL * penaltyMult;
  const effectiveUKMPG = ukMpg * penaltyMult;
  const effectiveL100km = penaltyMult > 0 && l100km > 0 ? l100km / penaltyMult : l100km;

  // Actual trip fuel cost
  const tripFuelCost = parseFloat((totalFuelVolume * avgPrice).toFixed(2));

  // Cost per distance unit & distance per currency unit
  let costPerDistUnit = 0;
  let distPerCurrency = 0;

  if (unitSystem === "indian") {
    if (effectiveKmL > 0) {
      costPerDistUnit = avgPrice / effectiveKmL;
      distPerCurrency = avgPrice > 0 ? effectiveKmL / avgPrice : 0;
    }
  } else if (unitSystem === "metric") {
    if (effectiveL100km > 0) {
      costPerDistUnit = (effectiveL100km / 100) * avgPrice;
      distPerCurrency = avgPrice > 0 && effectiveL100km > 0 ? 100 / (effectiveL100km * avgPrice) : 0;
    }
  } else if (unitSystem === "uk") {
    if (effectiveUKMPG > 0) {
      costPerDistUnit = avgPrice / effectiveUKMPG;
      distPerCurrency = avgPrice > 0 ? effectiveUKMPG / avgPrice : 0;
    }
  } else {
    if (effectiveMPG > 0) {
      costPerDistUnit = avgPrice / effectiveMPG;
      distPerCurrency = avgPrice > 0 ? effectiveMPG / avgPrice : 0;
    }
  }

  // Tank Range & Cost to Fill
  let totalTankRange = 0;
  if (unitSystem === "indian") {
    totalTankRange = tankCapacity * effectiveKmL;
  } else if (unitSystem === "metric") {
    totalTankRange = effectiveL100km > 0 ? (tankCapacity / effectiveL100km) * 100 : 0;
  } else if (unitSystem === "uk") {
    totalTankRange = tankCapacity * effectiveUKMPG;
  } else {
    totalTankRange = tankCapacity * effectiveMPG;
  }
  const costToFillTank = parseFloat((tankCapacity * avgPrice).toFixed(2));

  // Annual spending & Fuel consumption: explicit numeric 0 must survive
  const annualDistance =
    annualMileageInput !== undefined && annualMileageInput !== null
      ? Math.max(0, annualMileageInput)
      : unitSystem === "metric" || unitSystem === "indian"
      ? 24000
      : 15000;

  let annualFuelVol = 0;
  if (annualDistance > 0) {
    if (unitSystem === "indian") {
      annualFuelVol = effectiveKmL > 0 ? annualDistance / effectiveKmL : 0;
    } else if (unitSystem === "metric") {
      annualFuelVol = (annualDistance * effectiveL100km) / 100;
    } else if (unitSystem === "uk") {
      annualFuelVol = effectiveUKMPG > 0 ? annualDistance / effectiveUKMPG : 0;
    } else {
      annualFuelVol = effectiveMPG > 0 ? annualDistance / effectiveMPG : 0;
    }
  }
  const annualFuelCost = parseFloat((annualFuelVol * avgPrice).toFixed(2));

  // CO2 Footprint
  let co2Factor = 2.348; // default kg/L
  if (unitSystem === "us") {
    co2Factor = 8.887; // kg CO2 per US gallon
  } else if (unitSystem === "uk") {
    co2Factor = 8.887 * US_TO_UK_GALLON_RATIO; // ~10.6728 kg CO2 per UK gallon
  }

  if (fuelType === "diesel") {
    co2Factor = unitSystem === "us" ? 10.18 : unitSystem === "uk" ? 10.18 * US_TO_UK_GALLON_RATIO : 2.689;
  } else if (fuelType === "cng") {
    co2Factor = unitSystem === "us" || unitSystem === "uk" ? 10.4 : 2.75;
  } else if (fuelType === "flex_fuel") {
    co2Factor = unitSystem === "us" || unitSystem === "uk" ? 5.75 : 1.52;
  } else if (fuelType === "lpg") {
    co2Factor = unitSystem === "us" || unitSystem === "uk" ? 6.1 : 1.61;
  } else if (fuelType === "electric") {
    co2Factor = unitSystem === "us" || unitSystem === "uk" ? 3.1 : 0.82;
  }

  // Carbon Footprint: Trip mode reports trip emissions; Odometer / Annual modes report annual emissions
  const tripCarbonKg = totalFuelVolume * co2Factor;
  const annualCarbonKg = annualFuelVol * co2Factor;
  const carbonKg = mode === "trip" ? tripCarbonKg : annualCarbonKg;
  const carbonTons = carbonKg / 1000;

  const ratingInfo = evaluateEfficiencyRating(effectiveMPG, unitSystem);
  const mpgeEquivalent = effectiveMPG * 1.1;
  const evCostPer100mi = 30 * 0.15;

  return {
    totalDistance,
    totalFuelVolume,
    avgPricePerUnit: avgPrice,
    tripFuelCost: totalFuelVolume * avgPrice,
    usMPG: usMpg,
    ukMPG: ukMpg,
    l100km,
    kmL,
    effectiveMPG,
    effectiveL100km,
    effectiveKmL,
    costPerDistanceUnit: costPerDistUnit,
    distancePerCurrencyUnit: distPerCurrency,
    distanceUnitName: distUnit,
    fuelVolumeUnitName: volUnit,
    efficiencyUnitName: effUnit,
    totalTankRange,
    costToFillTank: tankCapacity * avgPrice,
    annualFuelCost: annualFuelVol * avgPrice,
    annualFuelVolume: annualFuelVol,
    carbonFootprintKg: carbonKg,
    carbonFootprintTons: carbonTons,
    rating: ratingInfo.rating,
    ratingLabel: ratingInfo.label,
    ratingPercentage: ratingInfo.percentage,
    mpgeEquivalent,
    evCostPer100mi,
  };
}

export function calculateGasMileageFromInputs(inputs: Record<string, any>): GasMileageResult {
  const startOdo = inputs.startOdometer !== undefined && inputs.startOdometer !== null ? Number(inputs.startOdometer) : 12000;
  const endOdo = inputs.endOdometer !== undefined && inputs.endOdometer !== null ? Number(inputs.endOdometer) : 12360;
  const fuelAdded = inputs.fuelAdded !== undefined && inputs.fuelAdded !== null ? Number(inputs.fuelAdded) : 12;
  const price = inputs.fuelPrice !== undefined && inputs.fuelPrice !== null ? Number(inputs.fuelPrice) : 3.5;
  const unit = (inputs.unitSystem as UnitSystem) ?? "us";

  return calculateGasMileage("odometer", unit, "gasoline", startOdo, endOdo, 360, fuelAdded, price);
}
