/**
 * Universal Asset Depreciation & Tax Depreciation Mathematical Engine
 */

export interface DepreciationScheduleRow {
  year: number;
  beginningBookValue: number;
  depreciationExpense: number;
  accumulatedDepreciation: number;
  endingBookValue: number;
}

export type DepreciationMethod =
  | "straight-line"
  | "double-declining"
  | "150-declining"
  | "sum-of-years-digits"
  | "units-of-production";

export interface UniversalDepreciationParams {
  assetCost: number;
  salvageValue: number;
  usefulLifeYears: number;
  method?: DepreciationMethod;
  decliningFactor?: number; // e.g. 2.0 for DDB, 1.5 for 150% DB
  partialYearMonthStart?: number; // 1 to 12 (month asset was placed in service)
  totalEstimatedUnits?: number;
  actualUnitsPerYear?: number[];
}

export interface UniversalDepreciationResult {
  methodName: string;
  totalDepreciableCost: number;
  year1Depreciation: number;
  totalAccumulatedDepreciation: number;
  endingBookValue: number;
  schedule: DepreciationScheduleRow[];
}

/**
 * 1. Calculate Single Method Depreciation Schedule
 */
export function calculateDepreciation(params: UniversalDepreciationParams): UniversalDepreciationResult {
  const cost = Math.max(0, params.assetCost);
  const salvage = Math.max(0, Math.min(cost, params.salvageValue));
  const life = Math.max(1, Math.round(params.usefulLifeYears));
  const method = params.method || "straight-line";
  const startMonth = Math.min(12, Math.max(1, params.partialYearMonthStart || 1));
  const factor = params.decliningFactor || (method === "150-declining" ? 1.5 : 2.0);

  const depreciableBase = Math.max(0, cost - salvage);
  const schedule: DepreciationScheduleRow[] = [];

  let currentBookValue = cost;
  let cumulativeDepreciation = 0;

  // Fraction for first year if placed in service mid-year
  const firstYearFraction = (13 - startMonth) / 12;
  const hasPartialYear = startMonth > 1;
  const totalScheduleYears = hasPartialYear ? life + 1 : life;

  if (method === "straight-line") {
    const annualStraightLine = depreciableBase / life;

    for (let yr = 1; yr <= totalScheduleYears; yr++) {
      const startBV = currentBookValue;
      let exp = annualStraightLine;

      if (hasPartialYear) {
        if (yr === 1) {
          exp = annualStraightLine * firstYearFraction;
        } else if (yr === totalScheduleYears) {
          exp = annualStraightLine * (1 - firstYearFraction);
        }
      }

      // Cap at salvage
      exp = Math.min(exp, Math.max(0, currentBookValue - salvage));
      cumulativeDepreciation += exp;
      currentBookValue -= exp;

      schedule.push({
        year: yr,
        beginningBookValue: startBV,
        depreciationExpense: exp,
        accumulatedDepreciation: cumulativeDepreciation,
        endingBookValue: currentBookValue,
      });
    }
  } else if (method === "double-declining" || method === "150-declining") {
    const rate = factor / life;

    for (let yr = 1; yr <= totalScheduleYears; yr++) {
      const startBV = currentBookValue;
      let exp = startBV * rate;

      if (hasPartialYear && yr === 1) {
        exp = startBV * rate * firstYearFraction;
      }

      // Cannot depreciate below salvage value
      exp = Math.min(exp, Math.max(0, currentBookValue - salvage));
      cumulativeDepreciation += exp;
      currentBookValue -= exp;

      schedule.push({
        year: yr,
        beginningBookValue: startBV,
        depreciationExpense: exp,
        accumulatedDepreciation: cumulativeDepreciation,
        endingBookValue: currentBookValue,
      });

      if (currentBookValue <= salvage) break;
    }
  } else if (method === "sum-of-years-digits") {
    const syd = (life * (life + 1)) / 2;

    for (let yr = 1; yr <= life; yr++) {
      const startBV = currentBookValue;
      const remainingLife = life - yr + 1;
      const exp = Math.min(depreciableBase * (remainingLife / syd), Math.max(0, currentBookValue - salvage));

      cumulativeDepreciation += exp;
      currentBookValue -= exp;

      schedule.push({
        year: yr,
        beginningBookValue: startBV,
        depreciationExpense: exp,
        accumulatedDepreciation: cumulativeDepreciation,
        endingBookValue: currentBookValue,
      });
    }
  } else if (method === "units-of-production") {
    const totalUnits = Math.max(1, params.totalEstimatedUnits || 100000);
    const unitRate = depreciableBase / totalUnits;
    const unitsPerYr = params.actualUnitsPerYear && params.actualUnitsPerYear.length > 0
      ? params.actualUnitsPerYear
      : Array(life).fill(Math.round(totalUnits / life));

    for (let yr = 1; yr <= unitsPerYr.length; yr++) {
      const startBV = currentBookValue;
      const unitsThisYr = unitsPerYr[yr - 1] || 0;
      let exp = unitsThisYr * unitRate;
      exp = Math.min(exp, Math.max(0, currentBookValue - salvage));

      cumulativeDepreciation += exp;
      currentBookValue -= exp;

      schedule.push({
        year: yr,
        beginningBookValue: startBV,
        depreciationExpense: exp,
        accumulatedDepreciation: cumulativeDepreciation,
        endingBookValue: currentBookValue,
      });
    }
  }

  const y1 = schedule.length > 0 ? schedule[0].depreciationExpense : 0;

  return {
    methodName:
      method === "straight-line"
        ? "Straight-Line"
        : method === "double-declining"
        ? "200% Double Declining Balance"
        : method === "150-declining"
        ? "150% Declining Balance"
        : method === "sum-of-years-digits"
        ? "Sum-of-Years' Digits"
        : "Units of Production",
    totalDepreciableCost: depreciableBase,
    year1Depreciation: y1,
    totalAccumulatedDepreciation: cumulativeDepreciation,
    endingBookValue: currentBookValue,
    schedule,
  };
}

/**
 * 2. Multi-Method Comparative Matrix (Straight-Line vs DDB vs 150% DB vs SYD)
 */
export interface MethodComparisonMatrix {
  years: number;
  straightLine: UniversalDepreciationResult;
  doubleDeclining: UniversalDepreciationResult;
  declining150: UniversalDepreciationResult;
  sumOfYearsDigits: UniversalDepreciationResult;
}

export function compareAllDepreciationMethods(
  cost: number,
  salvage: number,
  life: number
): MethodComparisonMatrix {
  return {
    years: life,
    straightLine: calculateDepreciation({ assetCost: cost, salvageValue: salvage, usefulLifeYears: life, method: "straight-line" }),
    doubleDeclining: calculateDepreciation({ assetCost: cost, salvageValue: salvage, usefulLifeYears: life, method: "double-declining", decliningFactor: 2.0 }),
    declining150: calculateDepreciation({ assetCost: cost, salvageValue: salvage, usefulLifeYears: life, method: "150-declining", decliningFactor: 1.5 }),
    sumOfYearsDigits: calculateDepreciation({ assetCost: cost, salvageValue: salvage, usefulLifeYears: life, method: "sum-of-years-digits" }),
  };
}

/**
 * 3. MACRS (Modified Accelerated Cost Recovery System - IRS Tax Depreciation)
 */
export type MacrsClass = 3 | 5 | 7 | 10 | 15 | 20;

export const MACRS_RATES_HALF_YEAR: Record<MacrsClass, number[]> = {
  3: [0.3333, 0.4445, 0.1481, 0.0741],
  5: [0.20, 0.32, 0.192, 0.1152, 0.1152, 0.0576],
  7: [0.1429, 0.2449, 0.1749, 0.1249, 0.0893, 0.0892, 0.0893, 0.0446],
  10: [0.10, 0.18, 0.144, 0.1152, 0.0922, 0.0737, 0.0655, 0.0655, 0.0656, 0.0655, 0.0328],
  15: [0.05, 0.095, 0.0855, 0.0770, 0.0693, 0.0623, 0.0590, 0.0590, 0.0591, 0.0590, 0.0591, 0.0590, 0.0591, 0.0590, 0.0591, 0.0295],
  20: [0.0375, 0.07219, 0.06677, 0.06177, 0.05713, 0.05285, 0.04888, 0.04522, 0.04462, 0.04461, 0.04462, 0.04461, 0.04462, 0.04461, 0.04462, 0.04461, 0.04462, 0.04461, 0.04462, 0.04461, 0.02231],
};

export interface MacrsResult {
  propertyClass: MacrsClass;
  costBasis: number;
  schedule: DepreciationScheduleRow[];
  totalDeductions: number;
}

export function calculateMacrsDepreciation(costBasis: number, propertyClass: MacrsClass): MacrsResult {
  const cost = Math.max(0, costBasis);
  const rates = MACRS_RATES_HALF_YEAR[propertyClass] || MACRS_RATES_HALF_YEAR[5];

  const schedule: DepreciationScheduleRow[] = [];
  let currentBV = cost;
  let accumDepr = 0;

  rates.forEach((rate, idx) => {
    const startBV = currentBV;
    const exp = cost * rate;
    accumDepr += exp;
    currentBV = Math.max(0, currentBV - exp);

    schedule.push({
      year: idx + 1,
      beginningBookValue: startBV,
      depreciationExpense: exp,
      accumulatedDepreciation: accumDepr,
      endingBookValue: currentBV,
    });
  });

  return {
    propertyClass,
    costBasis: cost,
    schedule,
    totalDeductions: accumDepr,
  };
}
