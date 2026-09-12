import {
  MileageCalcMode,
  UnitSystem,
  IndianFuelType,
  ReimbursementCategory,
  TaxYear,
  EfficiencyTier,
  LegInput,
  EnvironmentalModifiers,
  MileageResult,
} from "./types";

// Mathematical Conversion Constants
export const US_TO_L100KM = 235.214583;
export const UK_TO_L100KM = 282.480936;
export const US_TO_UK_MPG = 4.54609 / 3.785411784; // ~1.2009499
export const MPGE_KWH_EQUIV = 33.7; // 1 US gallon of gasoline = 33.7 kWh energy equivalent

export function getIRSReimbursementRate(category: ReimbursementCategory, year: TaxYear = "2024"): number {
  if (year === "2025") {
    switch (category) {
      case "business":
        return 0.70; // 2025 IRS standard rate
      case "medical":
        return 0.21;
      case "charity":
        return 0.14;
      default:
        return 0.70;
    }
  }

  // 2024 IRS standard rates
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

export function formatCurrency(amount: number, symbol: string = "$"): string {
  if (isNaN(amount) || !isFinite(amount)) return `${symbol}0.00`;
  const isNeg = amount < 0;
  const abs = Math.abs(amount);
  const locale = symbol === "₹" ? "en-IN" : "en-US";
  const str = abs.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${isNeg ? "-" : ""}${symbol}${str}`;
}

export function evaluateEfficiencyTier(usMpg: number): {
  tier: EfficiencyTier;
  label: string;
} {
  if (usMpg < 20) {
    return { tier: "heavy_consumption", label: "Heavy Consumption (<20 MPG / <8.5 km/l)" };
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
  // Fuel / Energy Type
  indianFuelType: IndianFuelType = "petrol",
  taxYear: TaxYear = "2024"
): MileageResult {
  // Environmental penalty ratio (additive compounding of real-world degradation)
  let penaltyRatio = 0;
  if (modifiers?.cityDriving) penaltyRatio += 0.15;
  if (modifiers?.towing) penaltyRatio += 0.25;
  if (modifiers?.aggressiveDriving) penaltyRatio += 0.20;
  if (modifiers?.coldWeather) penaltyRatio += 0.12;

  const penaltyMultiplier = 1 + penaltyRatio;

  // Currency symbol & Units
  const currencySymbol = unitSystem === "indian_metric" ? "₹" : "$";
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

  // Determine active reimbursement rate
  let reimbursementRatePerMile = getIRSReimbursementRate(reimbursementCategory, taxYear);
  if (customRatePerMile !== undefined && !isNaN(customRatePerMile) && customRatePerMile >= 0) {
    reimbursementRatePerMile = customRatePerMile;
  }

  // Base output variables
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
  let isValid = true;
  let errorMessage: string | undefined = undefined;
  let isEmpty = false;

  // VALIDATION & CORE LOGIC PER MODE
  if (mode === "fuel_mileage") {
    if (isOdometerMode) {
      if (isNaN(startOdometer) || isNaN(endOdometer)) {
        isValid = false;
        errorMessage = "Odometer readings must be valid numbers.";
      } else if (endOdometer < startOdometer) {
        isValid = false;
        errorMessage = "End odometer reading cannot be less than start odometer reading.";
      } else {
        totalDistance = endOdometer - startOdometer;
      }
    } else {
      if (isNaN(distanceInput)) {
        isValid = false;
        errorMessage = "Trip distance must be a valid number.";
      } else if (distanceInput < 0) {
        isValid = false;
        errorMessage = "Trip distance cannot be negative.";
      } else {
        totalDistance = distanceInput;
      }
    }

    if (isNaN(fuelInput)) {
      isValid = false;
      errorMessage = "Fuel volume must be a valid number.";
    } else if (fuelInput <= 0) {
      isValid = false;
      errorMessage = "Fuel volume must be greater than zero to calculate mileage.";
      totalFuelUsed = 0;
    } else {
      totalFuelUsed = fuelInput * penaltyMultiplier;
    }

    if (isNaN(fuelPriceInput) || fuelPriceInput < 0) {
      isValid = false;
      errorMessage = "Fuel price cannot be negative.";
    } else {
      totalFuelCost = totalFuelUsed * fuelPriceInput;
    }

    if (isValid && totalFuelUsed > 0 && totalDistance >= 0) {
      if (unitSystem === "indian_metric") {
        kmPerLiter = totalDistance / totalFuelUsed;
        litersPer100km = kmPerLiter > 0 ? 100 / kmPerLiter : 0;
        usMpg = kmPerLiter * (US_TO_L100KM / 100);
        ukMpg = usMpg * US_TO_UK_MPG;
      } else if (unitSystem === "metric") {
        litersPer100km = totalDistance > 0 ? (totalFuelUsed * 100) / totalDistance : 0;
        kmPerLiter = totalFuelUsed > 0 ? totalDistance / totalFuelUsed : 0;
        usMpg = litersPer100km > 0 ? US_TO_L100KM / litersPer100km : 0;
        ukMpg = litersPer100km > 0 ? UK_TO_L100KM / litersPer100km : 0;
      } else if (unitSystem === "uk_imperial") {
        ukMpg = totalDistance / totalFuelUsed;
        usMpg = ukMpg / US_TO_UK_MPG;
        litersPer100km = ukMpg > 0 ? UK_TO_L100KM / ukMpg : 0;
        kmPerLiter = litersPer100km > 0 ? 100 / litersPer100km : 0;
      } else {
        // us_imperial
        usMpg = totalDistance / totalFuelUsed;
        ukMpg = usMpg * US_TO_UK_MPG;
        litersPer100km = usMpg > 0 ? US_TO_L100KM / usMpg : 0;
        kmPerLiter = litersPer100km > 0 ? 100 / litersPer100km : 0;
      }
    }
  } else if (mode === "tax_reimbursement") {
    if (isNaN(businessMiles)) {
      isValid = false;
      errorMessage = "Business miles must be a valid number.";
    } else if (businessMiles < 0) {
      isValid = false;
      errorMessage = "Business miles cannot be negative.";
    } else if (reimbursementRatePerMile < 0) {
      isValid = false;
      errorMessage = "Allowance rate cannot be negative.";
    } else {
      totalDistance = businessMiles;
      taxReimbursementAmount = totalDistance * reimbursementRatePerMile;
    }
    // Baseline vehicle context for gauge display
    usMpg = 28;
    ukMpg = usMpg * US_TO_UK_MPG;
    litersPer100km = US_TO_L100KM / usMpg;
    kmPerLiter = 100 / litersPer100km;
  } else if (mode === "multi_leg") {
    if (!legs || legs.length === 0) {
      isEmpty = true;
      isValid = true;
      totalDistance = 0;
      totalFuelUsed = 0;
      totalFuelCost = 0;
    } else {
      let legDistSum = 0;
      let legFuelSum = 0;
      let legCostSum = 0;

      for (let i = 0; i < legs.length; i++) {
        const leg = legs[i];
        if (isNaN(leg.distance) || leg.distance < 0 || isNaN(leg.fuel) || leg.fuel < 0 || isNaN(leg.pricePerUnit) || leg.pricePerUnit < 0) {
          isValid = false;
          errorMessage = `Fill-up #${i + 1} contains invalid or negative numbers.`;
          break;
        }
        const effectiveFuel = leg.fuel * penaltyMultiplier;
        legDistSum += leg.distance;
        legFuelSum += effectiveFuel;
        legCostSum += effectiveFuel * leg.pricePerUnit;
      }

      if (isValid) {
        totalDistance = legDistSum;
        totalFuelUsed = legFuelSum;
        totalFuelCost = legCostSum;

        if (totalFuelUsed > 0) {
          if (unitSystem === "indian_metric") {
            kmPerLiter = totalDistance / totalFuelUsed;
            litersPer100km = kmPerLiter > 0 ? 100 / kmPerLiter : 0;
            usMpg = kmPerLiter * (US_TO_L100KM / 100);
            ukMpg = usMpg * US_TO_UK_MPG;
          } else if (unitSystem === "metric") {
            litersPer100km = totalDistance > 0 ? (totalFuelUsed * 100) / totalDistance : 0;
            kmPerLiter = totalFuelUsed > 0 ? totalDistance / totalFuelUsed : 0;
            usMpg = litersPer100km > 0 ? US_TO_L100KM / litersPer100km : 0;
            ukMpg = litersPer100km > 0 ? UK_TO_L100KM / litersPer100km : 0;
          } else if (unitSystem === "uk_imperial") {
            ukMpg = totalDistance / totalFuelUsed;
            usMpg = ukMpg / US_TO_UK_MPG;
            litersPer100km = ukMpg > 0 ? UK_TO_L100KM / ukMpg : 0;
            kmPerLiter = litersPer100km > 0 ? 100 / litersPer100km : 0;
          } else {
            usMpg = totalDistance / totalFuelUsed;
            ukMpg = usMpg * US_TO_UK_MPG;
            litersPer100km = usMpg > 0 ? US_TO_L100KM / usMpg : 0;
            kmPerLiter = litersPer100km > 0 ? 100 / litersPer100km : 0;
          }
        }
      }
    }
  } else if (mode === "ev_mpge") {
    if (isNaN(evDistanceMiles)) {
      isValid = false;
      errorMessage = "Distance driven must be a valid number.";
    } else if (evDistanceMiles < 0) {
      isValid = false;
      errorMessage = "Distance driven cannot be negative.";
    } else if (isNaN(evKWhConsumed)) {
      isValid = false;
      errorMessage = "Electricity used must be a valid number.";
    } else if (evKWhConsumed <= 0) {
      isValid = false;
      errorMessage = "Electricity consumed must be greater than zero.";
    } else if (isNaN(electricityCostPerKWh) || electricityCostPerKWh < 0) {
      isValid = false;
      errorMessage = "Electricity charging cost cannot be negative.";
    } else {
      totalDistance = evDistanceMiles;
      const kwh = evKWhConsumed * penaltyMultiplier;
      totalFuelUsed = kwh;
      fuelUnit = "kWh";
      totalFuelCost = kwh * electricityCostPerKWh;

      const milesPerKWh = totalDistance > 0 ? totalDistance / kwh : 0;
      mpge = milesPerKWh * MPGE_KWH_EQUIV;
      kWhPer100mi = totalDistance > 0 ? (kwh / totalDistance) * 100 : 0;

      usMpg = mpge;
      ukMpg = mpge * US_TO_UK_MPG;
      litersPer100km = mpge > 0 ? US_TO_L100KM / mpge : 0;
      kmPerLiter = litersPer100km > 0 ? 100 / litersPer100km : 0;
    }
  }

  // Financial Analytics
  const costPerDistance = isValid && totalDistance > 0 ? totalFuelCost / totalDistance : 0;
  const distancePerDollar = isValid && totalFuelCost > 0 ? totalDistance / totalFuelCost : 0;
  const effectiveAnnualDist = isNaN(annualDistanceMiles) ? 12000 : Math.max(0, annualDistanceMiles);
  const annualFuelCost = isValid && usMpg > 0 ? (effectiveAnnualDist / usMpg) * (fuelPriceInput || 0) : 0;

  // Carbon Emissions Calculation
  let co2Factor = 2.348; // default kg CO2 per Liter (gasoline)
  let co2EmissionsLabel = "Direct Tailpipe CO₂";
  if (mode === "ev_mpge" || (unitSystem === "indian_metric" && (indianFuelType === "ev_home" || indianFuelType === "ev_commercial"))) {
    co2Factor = 0.386; // kg CO2 per kWh grid electric generation
    co2EmissionsLabel = "Indirect Power Grid Generation CO₂";
  } else if (unitSystem === "indian_metric") {
    if (indianFuelType === "diesel") co2Factor = 2.689;
    else if (indianFuelType === "cng") co2Factor = 2.750;
    else if (indianFuelType === "lpg") co2Factor = 1.500;
    else co2Factor = 2.348;
  } else if (unitSystem === "us_imperial") {
    co2Factor = 8.887; // kg CO2 per US gallon
  } else if (unitSystem === "uk_imperial") {
    co2Factor = 10.672; // kg CO2 per UK gallon
  } else {
    co2Factor = 2.348; // kg CO2 per Liter
  }

  const co2EmissionsKg = isValid && totalFuelUsed > 0 ? totalFuelUsed * co2Factor : 0;

  // Primary Output Formatting
  let primaryValue = 0;
  let formattedPrimaryValue = "0.0";
  let primaryUnit = "MPG";
  let primaryLabel = "Fuel Economy";

  if (!isValid) {
    primaryValue = 0;
    formattedPrimaryValue = "--";
    primaryUnit = "";
    primaryLabel = "Input Validation Required";
  } else if (isEmpty) {
    primaryValue = 0;
    formattedPrimaryValue = "0.0";
    primaryUnit = unitSystem === "indian_metric" ? "km/l" : unitSystem === "metric" ? "L/100 km" : "MPG";
    primaryLabel = "No Fill-Up Records";
  } else if (mode === "tax_reimbursement") {
    primaryValue = parseFloat(taxReimbursementAmount.toFixed(2));
    formattedPrimaryValue = formatCurrency(taxReimbursementAmount, currencySymbol);
    primaryUnit = currencySymbol;
    primaryLabel = "Total Mileage Tax Reimbursement";
  } else if (mode === "ev_mpge") {
    primaryValue = parseFloat(mpge.toFixed(1));
    formattedPrimaryValue = mpge.toFixed(1);
    primaryUnit = "MPGe";
    primaryLabel = "Electric Vehicle Efficiency";
  } else if (unitSystem === "indian_metric") {
    primaryValue = parseFloat(kmPerLiter.toFixed(1));
    formattedPrimaryValue = kmPerLiter.toFixed(1);
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
    formattedPrimaryValue = litersPer100km.toFixed(2);
    primaryUnit = "L/100 km";
    primaryLabel = "Fuel Consumption";
  } else if (unitSystem === "uk_imperial") {
    primaryValue = parseFloat(ukMpg.toFixed(1));
    formattedPrimaryValue = ukMpg.toFixed(1);
    primaryUnit = "UK MPG";
    primaryLabel = "Imperial Fuel Economy";
  } else {
    primaryValue = parseFloat(usMpg.toFixed(1));
    formattedPrimaryValue = usMpg.toFixed(1);
    primaryUnit = "US MPG";
    primaryLabel = "Fuel Economy";
  }

  // Tier info & Unit-aware gauge configuration
  const tierInfo = evaluateEfficiencyTier(usMpg);

  let gaugeAngle = 0;
  let gaugeLeftLabel = "Heavy";
  let gaugeRightLabel = "60+ MPG";

  if (!isValid || isEmpty) {
    gaugeAngle = 0;
  } else if (mode === "tax_reimbursement") {
    gaugeAngle = Math.min(180, Math.max(0, (taxReimbursementAmount / 1000) * 180));
    gaugeLeftLabel = "$0";
    gaugeRightLabel = "$1,000+";
  } else if (mode === "ev_mpge") {
    gaugeAngle = Math.min(180, Math.max(0, (mpge / 140) * 180));
    gaugeLeftLabel = "Heavy";
    gaugeRightLabel = "140+ MPGe";
  } else if (unitSystem === "indian_metric") {
    gaugeAngle = Math.min(180, Math.max(0, (kmPerLiter / 25.5) * 180));
    gaugeLeftLabel = "Heavy";
    gaugeRightLabel = "25+ km/l";
  } else if (unitSystem === "metric") {
    // For L/100km, lower is better. 15 L/100km = heavy, 4 L/100km = eco.
    gaugeAngle = Math.min(180, Math.max(0, (usMpg / 60) * 180));
    gaugeLeftLabel = "Heavy (15+)";
    gaugeRightLabel = "3.9 L/100km";
  } else if (unitSystem === "uk_imperial") {
    gaugeAngle = Math.min(180, Math.max(0, (ukMpg / 72) * 180));
    gaugeLeftLabel = "Heavy";
    gaugeRightLabel = "72+ UK MPG";
  } else {
    gaugeAngle = Math.min(180, Math.max(0, (usMpg / 60) * 180));
    gaugeLeftLabel = "Heavy";
    gaugeRightLabel = "60+ MPG";
  }

  return {
    primaryValue,
    formattedPrimaryValue,
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
    formattedCostPerDistance: formatCurrency(costPerDistance, currencySymbol),
    distancePerDollar: parseFloat(distancePerDollar.toFixed(2)),
    distancePerDollarUnit: `${distanceUnit} / ${currencySymbol}`,
    formattedDistancePerDollar: `${distancePerDollar.toFixed(2)} ${distanceUnit} / ${currencySymbol}`,
    annualFuelCost: Math.round(annualFuelCost),
    formattedAnnualFuelCost: formatCurrency(annualFuelCost, currencySymbol),
    taxReimbursementAmount: parseFloat(taxReimbursementAmount.toFixed(2)),
    formattedTaxReimbursement: formatCurrency(taxReimbursementAmount, currencySymbol),
    reimbursementRatePerMile,
    taxYear,
    totalDistance: parseFloat(totalDistance.toFixed(1)),
    distanceUnit,
    totalFuelUsed: parseFloat(totalFuelUsed.toFixed(2)),
    fuelUnit,
    totalFuelCost: parseFloat(totalFuelCost.toFixed(2)),
    formattedTotalFuelCost: formatCurrency(totalFuelCost, currencySymbol),
    co2EmissionsKg: parseFloat(co2EmissionsKg.toFixed(2)),
    co2EmissionsLabel,
    efficiencyTier: tierInfo.tier,
    efficiencyTierLabel: tierInfo.label,
    gaugeAngle,
    gaugeLeftLabel,
    gaugeRightLabel,
    environmentalPenaltyPercent: Math.round(penaltyRatio * 100),
    isValid,
    errorMessage,
    isEmpty,
  };
}

export function calculateMileageFromInputs(inputs: Record<string, any>): MileageResult {
  const dist = Number(inputs.distance || inputs.distanceInput || 350);
  const fuel = Number(inputs.fuel || inputs.fuelInput || 11.5);
  const price = Number(inputs.price || inputs.fuelPriceInput || 3.50);

  return calculateMileage("fuel_mileage", "us_imperial", dist, fuel, price);
}
