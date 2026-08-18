import { getCpiForPeriod } from "./cpi-data";
import {
  HistoricalInflationInputs,
  HistoricalInflationResult,
  ForwardInflationInputs,
  ForwardInflationResult,
  BackwardInflationInputs,
  BackwardInflationResult,
  RealWageInputs,
  RealWageResult,
  RealInvestmentReturnInputs,
  RealInvestmentReturnResult,
} from "./types";

/**
 * 1. Historical CPI Purchasing Power Solver (US BLS CPI-U 1913–2026)
 */
export function calculateHistoricalInflation(inputs: HistoricalInflationInputs): HistoricalInflationResult {
  const amt = Math.abs(inputs.amount || 0);
  const startCpi = getCpiForPeriod(inputs.startYear, inputs.startMonth);
  const targetCpi = getCpiForPeriod(inputs.targetYear, inputs.targetMonth);

  if (startCpi <= 0 || targetCpi <= 0) {
    return {
      startCpi: 100,
      targetCpi: 100,
      equivalentAmount: amt,
      cumulativeInflationPercent: 0,
      annualizedInflationPercent: 0,
      purchasingPowerLossPercent: 0,
      yearsSpan: 0,
    };
  }

  // Equivalent target amount = Amount * (Target CPI / Start CPI)
  const equivalentAmount = amt * (targetCpi / startCpi);
  const cumulativeInflationPercent = ((targetCpi - startCpi) / startCpi) * 100;

  // Years span
  const startYearFrac = inputs.startYear + (inputs.startMonth > 0 ? (inputs.startMonth - 0.5) / 12 : 0);
  const targetYearFrac = inputs.targetYear + (inputs.targetMonth > 0 ? (inputs.targetMonth - 0.5) / 12 : 0);
  const yearsSpan = Math.abs(targetYearFrac - startYearFrac);

  let annualizedInflationPercent = 0;
  if (yearsSpan > 0.05) {
    annualizedInflationPercent = (Math.pow(targetCpi / startCpi, 1 / yearsSpan) - 1) * 100;
  } else {
    annualizedInflationPercent = cumulativeInflationPercent;
  }

  // Purchasing power loss %
  const purchasingPowerLossPercent = targetCpi > startCpi ? (1 - startCpi / targetCpi) * 100 : 0;

  return {
    startCpi: Math.round(startCpi * 1000) / 1000,
    targetCpi: Math.round(targetCpi * 1000) / 1000,
    equivalentAmount: Math.round(equivalentAmount * 100) / 100,
    cumulativeInflationPercent: Math.round(cumulativeInflationPercent * 100) / 100,
    annualizedInflationPercent: Math.round(annualizedInflationPercent * 100) / 100,
    purchasingPowerLossPercent: Math.round(purchasingPowerLossPercent * 100) / 100,
    yearsSpan: Math.round(yearsSpan * 10) / 10,
  };
}

/**
 * 2. Forward Future Inflation & Purchasing Power Decay Solver
 */
export function calculateForwardInflation(inputs: ForwardInflationInputs): ForwardInflationResult {
  const current = Math.abs(inputs.currentAmount || 0);
  const rate = Math.abs(inputs.expectedAnnualRatePercent || 0) / 100;
  const t = Math.abs(inputs.years || 0);

  const growthFactor = Math.pow(1 + rate, t);
  const futureCost = current * growthFactor;
  const realPurchasingPower = growthFactor > 0 ? current / growthFactor : current;

  const totalInflationIncrease = Math.max(0, futureCost - current);
  const totalInflationPercent = current > 0 ? (totalInflationIncrease / current) * 100 : 0;

  return {
    futureCost: Math.round(futureCost * 100) / 100,
    realPurchasingPower: Math.round(realPurchasingPower * 100) / 100,
    totalInflationIncrease: Math.round(totalInflationIncrease * 100) / 100,
    totalInflationPercent: Math.round(totalInflationPercent * 100) / 100,
  };
}

/**
 * 3. Backward Historical Flat-Rate Calculator
 */
export function calculateBackwardInflation(inputs: BackwardInflationInputs): BackwardInflationResult {
  const current = Math.abs(inputs.currentAmount || 0);
  const rate = Math.abs(inputs.averageAnnualRatePercent || 0) / 100;
  const t = Math.abs(inputs.yearsInPast || 0);

  const discountFactor = Math.pow(1 + rate, t);
  const pastEquivalentValue = discountFactor > 0 ? current / discountFactor : current;

  const totalInflationPercent = pastEquivalentValue > 0 ? ((current - pastEquivalentValue) / pastEquivalentValue) * 100 : 0;
  const purchasingPowerChangePercent = current > 0 ? (1 - pastEquivalentValue / current) * 100 : 0;

  return {
    pastEquivalentValue: Math.round(pastEquivalentValue * 100) / 100,
    totalInflationPercent: Math.round(totalInflationPercent * 100) / 100,
    purchasingPowerChangePercent: Math.round(purchasingPowerChangePercent * 100) / 100,
  };
}

/**
 * 4. Real Wage & Salary Growth Adjuster
 */
export function calculateRealWage(inputs: RealWageInputs): RealWageResult {
  const pastSal = Math.abs(inputs.pastSalary || 0);
  const curSal = Math.abs(inputs.currentSalary || 0);

  const pastCpi = getCpiForPeriod(inputs.pastYear, 0);
  const curCpi = getCpiForPeriod(inputs.currentYear, 0);

  // What past salary would be worth in today's dollars
  const pastSalaryAdjusted = pastCpi > 0 ? pastSal * (curCpi / pastCpi) : pastSal;

  const nominalWageChangeDollar = curSal - pastSal;
  const nominalWageChangePercent = pastSal > 0 ? (nominalWageChangeDollar / pastSal) * 100 : 0;

  const realWageChangeDollar = curSal - pastSalaryAdjusted;
  const realWageChangePercent = pastSalaryAdjusted > 0 ? (realWageChangeDollar / pastSalaryAdjusted) * 100 : 0;

  return {
    pastSalaryAdjusted: Math.round(pastSalaryAdjusted),
    nominalWageChangeDollar: Math.round(nominalWageChangeDollar),
    nominalWageChangePercent: Math.round(nominalWageChangePercent * 10) / 10,
    realWageChangeDollar: Math.round(realWageChangeDollar),
    realWageChangePercent: Math.round(realWageChangePercent * 10) / 10,
    isRealPayRaise: realWageChangeDollar >= 0,
  };
}

/**
 * 5. Real Rate of Return & Investment Inflation Drag (Fisher Equation)
 */
export function calculateRealInvestmentReturn(inputs: RealInvestmentReturnInputs): RealInvestmentReturnResult {
  const p = Math.abs(inputs.principal || 0);
  const nomRate = (inputs.nominalReturnPercent || 0) / 100;
  const infRate = (inputs.inflationRatePercent || 0) / 100;
  const taxRate = (inputs.taxRatePercent || 0) / 100;
  const t = Math.abs(inputs.years || 0);

  // After-tax nominal return
  const afterTaxNomRate = nomRate * (1 - taxRate);

  // Exact Fisher real rate: (1 + r_after_tax) / (1 + i) - 1
  const realRate = (1 + afterTaxNomRate) / (1 + infRate) - 1;

  const nominalFutureValue = p * Math.pow(1 + nomRate, t);
  const afterTaxNominalFV = p * Math.pow(1 + afterTaxNomRate, t);
  const realFutureValue = p * Math.pow(1 + realRate, t);

  const taxDragDollar = Math.max(0, nominalFutureValue - afterTaxNominalFV);
  const inflationDragDollar = Math.max(0, afterTaxNominalFV - realFutureValue);

  return {
    nominalFutureValue: Math.round(nominalFutureValue),
    realFutureValue: Math.round(realFutureValue),
    nominalAnnualReturnPercent: Math.round(nomRate * 1000) / 10,
    realAnnualReturnPercent: Math.round(realRate * 1000) / 10,
    inflationDragDollar: Math.round(inflationDragDollar),
    taxDragDollar: Math.round(taxDragDollar),
  };
}
