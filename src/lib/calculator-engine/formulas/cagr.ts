/**
 * Pure Mathematical Engine for Compound Annual Growth Rate (CAGR) Calculations.
 * Supports:
 * - Standard CAGR Calculation: CAGR = (FV / PV)^(1 / N) - 1
 * - Target Future Value (Reverse CAGR): FV = PV * (1 + CAGR)^N
 * - Required Initial Capital: PV = FV / (1 + CAGR)^N
 * - Required Tenure: N = ln(FV / PV) / ln(1 + CAGR)
 * - Negative CAGR handling (investment loss scenarios)
 * - Inflation-Adjusted Real CAGR: Real CAGR = ((1 + Nominal CAGR) / (1 + Inflation)) - 1
 * - Post-Tax Net Return Calculation
 * - Asset Class Benchmarking Matrix
 * - What-If Sensitivity Matrix (Tenure vs Growth Rate)
 * - Year-by-Year & Month-by-Month Growth Trajectory Schedules
 */

export type CagrType = "standard" | "future-value" | "initial-capital" | "tenure" | "benchmark";

export interface CagrFormulaInput {
  cagrType?: CagrType;
  initialValue?: number; // PV
  finalValue?: number; // FV
  years?: number; // N (can be decimal, e.g., 5.5 years)
  targetCagr?: number; // CAGR percentage, e.g., 12 for 12%
  inflationRate?: number; // annual percentage, e.g., 4 for 4%
  taxRate?: number; // capital gains tax slab %, e.g., 15 for 15%
}

export interface CagrAnnualScheduleRow {
  year: number;
  startingValue: number;
  annualGrowth: number;
  endingValue: number;
  realEndingValue: number;
  cumulativeReturnPercent: number;
}

export interface CagrMonthlyScheduleRow {
  month: number;
  year: number;
  startingValue: number;
  monthlyGrowth: number;
  endingValue: number;
}

export interface CagrSensitivityCell {
  returnRate: number;
  tenureYears: number;
  futureValue: number;
  totalProfit: number;
  cagrPercent: number;
}

export interface CagrBenchmark {
  assetClass: string;
  historicalCagr: number;
  projectedFutureValue: number;
  totalProfit: number;
}

export interface CagrFormulaResult {
  initialValue: number;
  finalValue: number;
  years: number;
  cagrPercent: number;
  absoluteReturnPercent: number;
  totalProfit: number;
  wealthMultiplier: number;
  realCagrPercent: number;
  realEndingValue: number;
  postTaxFinalValue: number;
  postTaxProfit: number;
  annualSchedule: CagrAnnualScheduleRow[];
  monthlySchedule: CagrMonthlyScheduleRow[];
  sensitivityMatrix: CagrSensitivityCell[];
  benchmarkComparisons: CagrBenchmark[];
  cagrHealthScore: number;
  healthRating: "Outperforming" | "Strong" | "Moderate" | "Underperforming";
}

export function calculateCagrFormula(inputs: CagrFormulaInput): CagrFormulaResult {
  const cagrType = inputs.cagrType || "standard";
  let initialValue = Math.max(0.01, inputs.initialValue ?? 10000);
  let finalValue = inputs.finalValue ?? 25000;
  let years = Math.max(0.1, inputs.years ?? 5);
  let targetCagr = inputs.targetCagr ?? 12;

  const inflationRate = Math.max(0, inputs.inflationRate ?? 4);
  const taxRate = Math.max(0, inputs.taxRate ?? 15);

  let calculatedCagr = 0;

  // Solve based on calculation mode
  if (cagrType === "future-value") {
    // FV = PV * (1 + CAGR)^N
    calculatedCagr = targetCagr;
    finalValue = initialValue * Math.pow(1 + targetCagr / 100, years);
  } else if (cagrType === "initial-capital") {
    // PV = FV / (1 + CAGR)^N
    calculatedCagr = targetCagr;
    if (1 + targetCagr / 100 > 0) {
      initialValue = finalValue / Math.pow(1 + targetCagr / 100, years);
    }
  } else if (cagrType === "tenure") {
    // N = ln(FV / PV) / ln(1 + CAGR)
    calculatedCagr = targetCagr;
    if (initialValue > 0 && finalValue > 0 && targetCagr > -100 && 1 + targetCagr / 100 !== 1) {
      years = Math.max(0.1, Math.log(finalValue / initialValue) / Math.log(1 + targetCagr / 100));
    }
  } else {
    // Standard CAGR: (FV / PV)^(1 / N) - 1
    if (initialValue > 0 && finalValue > 0 && years > 0) {
      calculatedCagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
    } else if (initialValue > 0 && finalValue <= 0) {
      // Negative Return / Total Loss
      calculatedCagr = -100;
    } else if (initialValue > 0 && finalValue < initialValue) {
      // Loss scenario
      calculatedCagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
    }
  }

  const cagrRate = calculatedCagr / 100;
  const totalProfit = finalValue - initialValue;
  const absoluteReturnPercent = initialValue > 0 ? ((finalValue - initialValue) / initialValue) * 100 : 0;
  const wealthMultiplier = initialValue > 0 ? Math.round((finalValue / initialValue) * 100) / 100 : 0;

  // Real CAGR (Inflation-Adjusted): ((1 + Nominal CAGR) / (1 + Inflation)) - 1
  const inflationDecimal = inflationRate / 100;
  const realCagrDecimal = (1 + cagrRate) / (1 + inflationDecimal) - 1;
  const realCagrPercent = Math.round(realCagrDecimal * 10000) / 100;

  // Real Ending Value (Purchasing Power)
  const totalInflationFactor = Math.pow(1 + inflationDecimal, years);
  const realEndingValue = Math.round((finalValue / totalInflationFactor) * 100) / 100;

  // Post-Tax Profit & Final Value (Capital Gains Tax applied to profits)
  const taxableProfit = Math.max(0, totalProfit);
  const totalTaxPaid = taxableProfit * (taxRate / 100);
  const postTaxProfit = Math.round((totalProfit - totalTaxPaid) * 100) / 100;
  const postTaxFinalValue = Math.round((finalValue - totalTaxPaid) * 100) / 100;

  // ----------------------------------------------------
  // ANNUAL & MONTHLY GROWTH SCHEDULES
  // ----------------------------------------------------
  const annualSchedule: CagrAnnualScheduleRow[] = [];
  const monthlySchedule: CagrMonthlyScheduleRow[] = [];

  const totalFullYears = Math.ceil(years);
  let currentVal = initialValue;

  for (let y = 1; y <= totalFullYears; y++) {
    const yearStart = currentVal;
    const yearEnd = initialValue * Math.pow(1 + cagrRate, y);
    const annualGrowth = yearEnd - yearStart;
    const inflFactor = Math.pow(1 + inflationDecimal, y);
    const realEnd = yearEnd / inflFactor;
    const cumReturnPct = initialValue > 0 ? ((yearEnd - initialValue) / initialValue) * 100 : 0;

    annualSchedule.push({
      year: y,
      startingValue: Math.round(yearStart * 100) / 100,
      annualGrowth: Math.round(annualGrowth * 100) / 100,
      endingValue: Math.round(yearEnd * 100) / 100,
      realEndingValue: Math.round(realEnd * 100) / 100,
      cumulativeReturnPercent: Math.round(cumReturnPct * 100) / 100,
    });

    currentVal = yearEnd;
  }

  // Monthly breakdown for up to 60 months
  const totalMonths = Math.min(120, Math.ceil(years * 12));
  const monthlyRate = Math.pow(1 + cagrRate, 1 / 12) - 1;
  let currentMonthVal = initialValue;

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
    { name: "S&P 500 / Stock Index", rate: 10.5 },
    { name: "US Tech / Nasdaq 100", rate: 14.8 },
    { name: "Gold (Physical)", rate: 7.5 },
    { name: "Real Estate (Residential)", rate: 8.2 },
    { name: "High-Yield Fixed Deposit", rate: 6.8 },
    { name: "Treasury Bonds", rate: 4.5 },
  ];

  const benchmarkComparisons: CagrBenchmark[] = benchmarksPreset.map((b) => {
    const fvBench = initialValue * Math.pow(1 + b.rate / 100, years);
    return {
      assetClass: b.name,
      historicalCagr: b.rate,
      projectedFutureValue: Math.round(fvBench),
      totalProfit: Math.round(fvBench - initialValue),
    };
  });

  // ----------------------------------------------------
  // WHAT-IF SENSITIVITY MATRIX (Rate vs Tenure)
  // ----------------------------------------------------
  const ratesToTest = [6, 8, 10, 12, 15, 18, 20];
  const tenuresToTest = [1, 3, 5, 7, 10];
  const sensitivityMatrix: CagrSensitivityCell[] = [];

  ratesToTest.forEach((r) => {
    tenuresToTest.forEach((tYears) => {
      const fvMat = initialValue * Math.pow(1 + r / 100, tYears);
      sensitivityMatrix.push({
        returnRate: r,
        tenureYears: tYears,
        futureValue: Math.round(fvMat),
        totalProfit: Math.round(fvMat - initialValue),
        cagrPercent: r,
      });
    });
  });

  // ----------------------------------------------------
  // PERFORMANCE RATING & SCORE
  // ----------------------------------------------------
  let cagrHealthScore = 70;
  if (calculatedCagr >= 15) cagrHealthScore += 25;
  else if (calculatedCagr >= 10) cagrHealthScore += 15;
  else if (calculatedCagr >= 7) cagrHealthScore += 5;
  else if (calculatedCagr < 0) cagrHealthScore -= 30;

  if (realCagrPercent > 5) cagrHealthScore += 5;
  cagrHealthScore = Math.min(100, Math.max(10, cagrHealthScore));

  let healthRating: "Outperforming" | "Strong" | "Moderate" | "Underperforming" = "Strong";
  if (cagrHealthScore >= 90) healthRating = "Outperforming";
  else if (cagrHealthScore >= 75) healthRating = "Strong";
  else if (cagrHealthScore >= 55) healthRating = "Moderate";
  else healthRating = "Underperforming";

  return {
    initialValue: Math.round(initialValue * 100) / 100,
    finalValue: Math.round(finalValue * 100) / 100,
    years: Math.round(years * 100) / 100,
    cagrPercent: Math.round(calculatedCagr * 100) / 100,
    absoluteReturnPercent: Math.round(absoluteReturnPercent * 100) / 100,
    totalProfit: Math.round(totalProfit * 100) / 100,
    wealthMultiplier,
    realCagrPercent,
    realEndingValue,
    postTaxFinalValue,
    postTaxProfit,
    annualSchedule,
    monthlySchedule,
    sensitivityMatrix,
    benchmarkComparisons,
    cagrHealthScore,
    healthRating,
  };
}
