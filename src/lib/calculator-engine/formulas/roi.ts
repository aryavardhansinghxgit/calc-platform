/**
 * Pure Mathematical Engine for Return on Investment (ROI) Calculations.
 * Supports:
 * - Standard ROI: ROI = [(Amount Returned - Amount Invested) / Amount Invested] * 100
 * - Annualized ROI: Annualized ROI = [(1 + ROI)^(1 / Years) - 1] * 100 = [(FV / PV)^(1 / Years) - 1] * 100
 * - Tenure Selection: Length in Years/Months OR Date-based duration (From/To dates)
 * - Goal Seeking (Calculate required Amount Returned or Amount Invested for target ROI)
 * - Negative ROI handling (investment loss scenarios)
 * - Inflation-Adjusted Real ROI: Real ROI = ((1 + Nominal ROI) / (1 + Inflation)) - 1
 * - Post-Tax Net Return Calculation (Capital Gains Tax Deduction)
 * - Asset Class Benchmarking Matrix (S&P 500, Real Estate, Gold, Bonds)
 * - What-If Sensitivity Matrix (Returns vs Tenure)
 * - Year-by-Year & Month-by-Month Growth Trajectory Schedules
 */

export type RoiType = "standard" | "goal" | "scenario" | "benchmark" | "sensitivity";

export interface RoiFormulaInput {
  roiType?: RoiType;
  amountInvested?: number; // PV
  amountReturned?: number; // FV
  timeMode?: "length" | "dates";
  years?: number; // N in years (can be fractional, e.g. 4.395)
  fromDate?: string; // YYYY-MM-DD
  toDate?: string; // YYYY-MM-DD
  targetRoi?: number; // Target ROI percentage
  inflationRate?: number; // annual percentage, e.g. 4 for 4%
  taxRate?: number; // capital gains tax slab %, e.g. 15 for 15%
  
  // Scenario B inputs for comparison mode
  amountInvestedB?: number;
  amountReturnedB?: number;
  yearsB?: number;
}

export interface RoiAnnualScheduleRow {
  year: number;
  startingValue: number;
  annualGrowth: number;
  endingValue: number;
  realEndingValue: number;
  cumulativeRoiPercent: number;
}

export interface RoiMonthlyScheduleRow {
  month: number;
  year: number;
  startingValue: number;
  monthlyGrowth: number;
  endingValue: number;
}

export interface RoiSensitivityCell {
  returnRate: number;
  tenureYears: number;
  amountReturned: number;
  netProfit: number;
  roiPercent: number;
}

export interface RoiBenchmark {
  assetClass: string;
  historicalRoi: number;
  projectedAmountReturned: number;
  netProfit: number;
}

export interface RoiFormulaResult {
  amountInvested: number;
  amountReturned: number;
  years: number;
  netProfit: number;
  roiPercent: number;
  annualizedRoiPercent: number;
  wealthMultiplier: number;
  realRoiPercent: number;
  realAnnualizedRoiPercent: number;
  realEndingValue: number;
  postTaxFinalValue: number;
  postTaxProfit: number;
  annualSchedule: any[];
  monthlySchedule: any[];
  sensitivityMatrix: RoiSensitivityCell[];
  benchmarkComparisons: RoiBenchmark[];
  
  // Scenario B results for comparison mode
  scenarioB?: {
    amountInvested: number;
    amountReturned: number;
    years: number;
    netProfit: number;
    roiPercent: number;
    annualizedRoiPercent: number;
  };

  roiHealthScore: number;
  healthRating: "Outperforming" | "Strong" | "Moderate" | "Underperforming";
}

export function calculateRoiFormula(inputs: RoiFormulaInput): RoiFormulaResult {
  const roiType = inputs.roiType || "standard";
  let amountInvested = Math.max(0.01, inputs.amountInvested ?? 1000);
  let amountReturned = inputs.amountReturned ?? 2000;
  let years = Math.max(0.01, inputs.years ?? 4.395);

  // Handle Date-based duration calculation if selected
  if (inputs.timeMode === "dates" && inputs.fromDate && inputs.toDate) {
    const d1 = new Date(inputs.fromDate);
    const d2 = new Date(inputs.toDate);
    const diffTime = d2.getTime() - d1.getTime();
    if (diffTime > 0) {
      years = Math.max(0.01, diffTime / (1000 * 60 * 60 * 24 * 365.25));
    }
  }

  const inflationRate = Math.max(0, inputs.inflationRate ?? 4);
  const taxRate = Math.max(0, inputs.taxRate ?? 15);
  const targetRoi = inputs.targetRoi ?? 100;

  // Handle Goal Seeking Mode
  if (roiType === "goal") {
    // Amount Returned = Amount Invested * (1 + targetRoi / 100)
    amountReturned = amountInvested * (1 + targetRoi / 100);
  }

  const netProfit = amountReturned - amountInvested;
  const roiPercent = amountInvested > 0 ? (netProfit / amountInvested) * 100 : 0;

  // Annualized ROI: [(Amount Returned / Amount Invested)^(1 / Years) - 1] * 100
  let annualizedRoiPercent = 0;
  if (years > 0 && amountInvested > 0 && amountReturned > 0) {
    annualizedRoiPercent = (Math.pow(amountReturned / amountInvested, 1 / years) - 1) * 100;
  } else if (years > 0 && amountInvested > 0 && amountReturned <= 0) {
    annualizedRoiPercent = -100;
  } else if (years > 0 && amountInvested > 0 && amountReturned < amountInvested) {
    annualizedRoiPercent = (Math.pow(amountReturned / amountInvested, 1 / years) - 1) * 100;
  }

  const wealthMultiplier = amountInvested > 0 ? Math.round((amountReturned / amountInvested) * 100) / 100 : 0;

  // Inflation-Adjusted Real Returns
  const totalInflationFactor = Math.pow(1 + inflationRate / 100, years);
  const realEndingValue = Math.round((amountReturned / totalInflationFactor) * 100) / 100;
  const realRoiPercent = amountInvested > 0 ? Math.round(((realEndingValue - amountInvested) / amountInvested) * 10000) / 100 : 0;

  const annRateDecimal = annualizedRoiPercent / 100;
  const inflRateDecimal = inflationRate / 100;
  const realAnnualizedRoiPercent = Math.round(((1 + annRateDecimal) / (1 + inflRateDecimal) - 1) * 10000) / 100;

  // Post-Tax Final Value & Net Profit
  const taxableProfit = Math.max(0, netProfit);
  const totalTaxPaid = taxableProfit * (taxRate / 100);
  const postTaxProfit = Math.round((netProfit - totalTaxPaid) * 100) / 100;
  const postTaxFinalValue = Math.round((amountReturned - totalTaxPaid) * 100) / 100;

  // ----------------------------------------------------
  // ANNUAL & MONTHLY GROWTH TRAJECTORY SCHEDULES
  // ----------------------------------------------------
  const annualSchedule: any[] = [];
  const monthlySchedule: any[] = [];

  const totalFullYears = Math.max(1, Math.ceil(years));
  let currentVal = amountInvested;

  for (let y = 1; y <= totalFullYears; y++) {
    const yearStart = currentVal;
    const effectiveYear = Math.min(y, years);
    const yearEnd = amountInvested * Math.pow(1 + annRateDecimal, effectiveYear);
    const annualGrowth = yearEnd - yearStart;
    const inflFactor = Math.pow(1 + inflRateDecimal, effectiveYear);
    const realEnd = yearEnd / inflFactor;
    const cumRoi = amountInvested > 0 ? ((yearEnd - amountInvested) / amountInvested) * 100 : 0;

    annualSchedule.push({
      year: y,
      startingValue: Math.round(yearStart * 100) / 100,
      annualGrowth: Math.round(annualGrowth * 100) / 100,
      endingValue: Math.round(yearEnd * 100) / 100,
      realEndingValue: Math.round(realEnd * 100) / 100,
      cumulativeRoiPercent: Math.round(cumRoi * 100) / 100,
    });

    currentVal = yearEnd;
  }

  // Monthly Schedule (up to 120 months)
  const totalMonths = Math.min(120, Math.ceil(years * 12));
  const monthlyRate = Math.pow(1 + annRateDecimal, 1 / 12) - 1;
  let currentMonthVal = amountInvested;

  for (let m = 1; m <= totalMonths; m++) {
    const monthStart = currentMonthVal;
    const monthEnd = monthStart * (1 + monthlyRate);
    const monthGrowth = monthEnd - monthStart;

    monthlySchedule.push({
      month: m,
      year: Math.ceil(m / 12),
      startingValue: Math.round(monthStart * 100) / 100,
      monthlyGrowth: Math.round(monthGrowth * 100) / 100,
      endingValue: Math.round(monthEnd * 100) / 100,
    });

    currentMonthVal = monthEnd;
  }

  // ----------------------------------------------------
  // ASSET CLASS BENCHMARK MATRIX
  // ----------------------------------------------------
  const benchmarksPreset = [
    { name: "S&P 500 Stock Index", rate: 10.5 },
    { name: "Nasdaq 100 Tech", rate: 14.8 },
    { name: "Gold (Physical)", rate: 7.5 },
    { name: "Real Estate (Residential)", rate: 8.2 },
    { name: "High-Yield Fixed Deposit", rate: 6.8 },
  ];

  const benchmarkComparisons: RoiBenchmark[] = benchmarksPreset.map((b) => {
    const retBench = amountInvested * Math.pow(1 + b.rate / 100, years);
    const roiBench = Math.round(((retBench - amountInvested) / amountInvested) * 10000) / 100;
    return {
      assetClass: b.name,
      historicalRoi: roiBench,
      projectedAmountReturned: Math.round(retBench),
      netProfit: Math.round(retBench - amountInvested),
    };
  });

  // ----------------------------------------------------
  // WHAT-IF SENSITIVITY MATRIX (Returns vs Tenure)
  // ----------------------------------------------------
  const ratesToTest = [5, 10, 15, 20, 25, 50, 100];
  const tenuresToTest = [1, 2, 3, 5, 10];
  const sensitivityMatrix: RoiSensitivityCell[] = [];

  ratesToTest.forEach((r) => {
    tenuresToTest.forEach((tYears) => {
      const fvMat = amountInvested * Math.pow(1 + r / 100, tYears);
      const totalRoiMat = ((fvMat - amountInvested) / amountInvested) * 100;
      sensitivityMatrix.push({
        returnRate: r,
        tenureYears: tYears,
        amountReturned: Math.round(fvMat),
        netProfit: Math.round(fvMat - amountInvested),
        roiPercent: Math.round(totalRoiMat * 100) / 100,
      });
    });
  });

  // ----------------------------------------------------
  // SCENARIO B COMPARISON CALCULATIONS
  // ----------------------------------------------------
  let scenarioB: RoiFormulaResult["scenarioB"] = undefined;
  if (roiType === "scenario" && inputs.amountInvestedB && inputs.amountReturnedB) {
    const invB = inputs.amountInvestedB;
    const retB = inputs.amountReturnedB;
    const yrsB = Math.max(0.01, inputs.yearsB ?? years);
    const profB = retB - invB;
    const roiPctB = (profB / invB) * 100;
    let annRoiB = 0;
    if (yrsB > 0 && retB > 0) {
      annRoiB = (Math.pow(retB / invB, 1 / yrsB) - 1) * 100;
    }
    scenarioB = {
      amountInvested: Math.round(invB * 100) / 100,
      amountReturned: Math.round(retB * 100) / 100,
      years: Math.round(yrsB * 100) / 100,
      netProfit: Math.round(profB * 100) / 100,
      roiPercent: Math.round(roiPctB * 100) / 100,
      annualizedRoiPercent: Math.round(annRoiB * 100) / 100,
    };
  }

  // ----------------------------------------------------
  // ROI HEALTH SCORE & RATING
  // ----------------------------------------------------
  let roiHealthScore = 70;
  if (annualizedRoiPercent >= 15) roiHealthScore += 25;
  else if (annualizedRoiPercent >= 10) roiHealthScore += 15;
  else if (annualizedRoiPercent >= 5) roiHealthScore += 5;
  else if (roiPercent < 0) roiHealthScore -= 40;

  if (realAnnualizedRoiPercent > 5) roiHealthScore += 5;
  roiHealthScore = Math.min(100, Math.max(10, roiHealthScore));

  let healthRating: "Outperforming" | "Strong" | "Moderate" | "Underperforming" = "Strong";
  if (roiHealthScore >= 90) healthRating = "Outperforming";
  else if (roiHealthScore >= 75) healthRating = "Strong";
  else if (roiHealthScore >= 55) healthRating = "Moderate";
  else healthRating = "Underperforming";

  return {
    amountInvested: Math.round(amountInvested * 100) / 100,
    amountReturned: Math.round(amountReturned * 100) / 100,
    years: Math.round(years * 1000) / 1000,
    netProfit: Math.round(netProfit * 100) / 100,
    roiPercent: Math.round(roiPercent * 100) / 100,
    annualizedRoiPercent: Math.round(annualizedRoiPercent * 100) / 100,
    wealthMultiplier,
    realRoiPercent,
    realAnnualizedRoiPercent,
    realEndingValue,
    postTaxFinalValue,
    postTaxProfit,
    annualSchedule,
    monthlySchedule,
    sensitivityMatrix,
    benchmarkComparisons,
    scenarioB,
    roiHealthScore,
    healthRating,
  };
}
