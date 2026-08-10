/**
 * Precision Present Value (PV) & Net Present Value (NPV) Mathematical Engine
 * Supports Lump Sum PV, Ordinary Annuity PV, Annuity Due PV, Growing Annuity PV,
 * Uneven Cash Flow NPV, Discount Rate Sensitivity Matrix, and Accumulation Schedules.
 */

export type CompoundingFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
export type ContributionFrequency = 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
export type TimingOption = 'end' | 'beginning';

export interface PresentValueInput {
  futureValue: number; // FV
  periodicPayment: number; // PMT
  discountRate: number; // Annual % r
  years: number; // t
  compoundingFrequency?: CompoundingFrequency;
  paymentFrequency?: ContributionFrequency;
  paymentTiming?: TimingOption;
  growthRate?: number; // % annual growth in PMT (step-up)
  inflationRate?: number; // % annual inflation
  taxRate?: number; // % tax drag
  currency?: string;
  unevenCashFlows?: number[]; // Multi-year custom cash flows for NPV
  initialOutlay?: number; // Initial investment for NPV
}

export interface PVScheduleRow {
  year: number;
  period?: number;
  futureCashFlow: number;
  discountFactor: number;
  presentValue: number;
  cumulativePV: number;
  nominalCashFlow: number;
  realPV: number;
}

export interface RateSensitivityPoint {
  rate: number;
  lumpSumPV: number;
  annuityPV: number;
  totalPV: number;
  discountAmount: number;
}

export interface PVScenarioResult {
  title: string;
  discountRate: number;
  presentValue: number;
  futureCashFlowTotal: number;
  discountAmount: number;
  discountRatioPct: number;
}

export interface PresentValueCalculationResult {
  presentValue: number;
  lumpSumPV: number;
  annuityPV: number;
  totalFutureCashFlows: number;
  totalDiscountAmount: number;
  discountRatioPct: number; // (Discount Amount / Future Cash Flows) * 100
  effectiveDiscountRate: number; // APY discount
  realPresentValue: number; // Inflation-adjusted PV
  npvResult?: number; // For uneven cash flows mode
  yearlySchedule: PVScheduleRow[];
  monthlySchedule: PVScheduleRow[];
  sensitivityMatrix: RateSensitivityPoint[];
  scenarios: {
    conservative: PVScenarioResult; // Base rate + 2%
    moderate: PVScenarioResult; // Base rate
    aggressive: PVScenarioResult; // Base rate - 2%
  };
}

export function getPeriodsPerYear(freq: string = 'annually'): number {
  switch (freq) {
    case 'daily': return 365;
    case 'weekly': return 52;
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'semi-annually': return 2;
    case 'annually': return 1;
    default: return 12;
  }
}

/**
 * Calculates complete Present Value projections with precision schedules & sensitivity points.
 */
export function calculatePresentValue(input: PresentValueInput): PresentValueCalculationResult {
  const {
    futureValue = 0,
    periodicPayment = 0,
    discountRate = 0,
    years = 10,
    compoundingFrequency = 'monthly',
    paymentFrequency = 'monthly',
    paymentTiming = 'end',
    growthRate = 0,
    inflationRate = 0,
    taxRate = 0,
    unevenCashFlows = [],
    initialOutlay = 0,
  } = input;

  const fv = Math.max(0, Number(futureValue) || 0);
  const pmtBase = Math.max(0, Number(periodicPayment) || 0);
  const rateNominal = (Number(discountRate) || 0) / 100;
  const tYears = Math.max(1, Math.min(100, Number(years) || 10));
  const gRate = (Number(growthRate) || 0) / 100;
  const infRate = (Number(inflationRate) || 0) / 100;
  const tRate = (Number(taxRate) || 0) / 100;

  const nComp = getPeriodsPerYear(compoundingFrequency);
  const pContrib = getPeriodsPerYear(paymentFrequency);

  // Effective annual rate & period discount rate
  const effectiveRate = Math.pow(1 + rateNominal / nComp, nComp) - 1;
  const rPeriod = Math.pow(1 + effectiveRate, 1 / pContrib) - 1;

  // 1. Lump Sum Present Value: PV_lump = FV / (1 + rPeriod)^(tYears * pContrib)
  const totalPeriods = Math.round(tYears * pContrib);
  const lumpSumPV = fv / Math.pow(1 + rPeriod, totalPeriods);

  // 2. Periodic Payment (Annuity) Present Value calculation
  let annuityPV = 0;
  let currentPmt = pmtBase;
  let totalFutureCashFlowsFromPmt = 0;

  const monthlySchedule: PVScheduleRow[] = [];
  const yearlySchedule: PVScheduleRow[] = [];

  let cumulativePV = lumpSumPV;
  let yearlyCashFlowSum = 0;
  let yearlyPVSum = 0;

  for (let p = 1; p <= totalPeriods; p++) {
    const currentYear = Math.ceil(p / pContrib);

    // Apply annual step-up growth if specified
    if (p > 1 && (p - 1) % pContrib === 0 && gRate > 0) {
      currentPmt = currentPmt * (1 + gRate);
    }

    const periodCashFlow = currentPmt;
    totalFutureCashFlowsFromPmt += periodCashFlow;

    // Timing discount adjustment
    const discountExponent = paymentTiming === 'beginning' ? p - 1 : p;
    const discountFactor = 1 / Math.pow(1 + rPeriod, discountExponent);
    const periodPV = periodCashFlow * discountFactor;

    annuityPV += periodPV;
    cumulativePV += periodPV;

    yearlyCashFlowSum += periodCashFlow;
    yearlyPVSum += periodPV;

    const nominalInfDiscount = Math.pow(1 + infRate, p / pContrib);
    monthlySchedule.push({
      year: currentYear,
      period: p,
      futureCashFlow: Number(periodCashFlow.toFixed(2)),
      discountFactor: Number(discountFactor.toFixed(4)),
      presentValue: Number(periodPV.toFixed(2)),
      cumulativePV: Number(cumulativePV.toFixed(2)),
      nominalCashFlow: Number(periodCashFlow.toFixed(2)),
      realPV: Number((periodPV / nominalInfDiscount).toFixed(2)),
    });

    if (p % pContrib === 0 || p === totalPeriods) {
      const yearIndex = Math.ceil(p / pContrib);
      const yearInfDiscount = Math.pow(1 + infRate, yearIndex);

      // Add lump sum cash flow to final year schedule
      let yearCashFlowTotal = yearlyCashFlowSum;
      let yearPVTotal = yearlyPVSum;
      if (p === totalPeriods && fv > 0) {
        yearCashFlowTotal += fv;
        yearPVTotal += lumpSumPV;
      }

      yearlySchedule.push({
        year: yearIndex,
        futureCashFlow: Number(yearCashFlowTotal.toFixed(2)),
        discountFactor: Number((1 / Math.pow(1 + effectiveRate, yearIndex)).toFixed(4)),
        presentValue: Number(yearPVTotal.toFixed(2)),
        cumulativePV: Number(cumulativePV.toFixed(2)),
        nominalCashFlow: Number(yearCashFlowTotal.toFixed(2)),
        realPV: Number((yearPVTotal / yearInfDiscount).toFixed(2)),
      });

      yearlyCashFlowSum = 0;
      yearlyPVSum = 0;
    }
  }

  const totalPV = lumpSumPV + annuityPV;
  const totalFutureCashFlows = fv + totalFutureCashFlowsFromPmt;
  const totalDiscountAmount = Math.max(0, totalFutureCashFlows - totalPV);
  const discountRatioPct = totalFutureCashFlows > 0 ? (totalDiscountAmount / totalFutureCashFlows) * 100 : 0;

  // Real Inflation-adjusted PV
  const realPresentValue = totalPV / Math.pow(1 + infRate, tYears);

  // NPV calculation for custom uneven cash flows if present
  let npvResult = -Math.max(0, Number(initialOutlay) || 0);
  if (unevenCashFlows && unevenCashFlows.length > 0) {
    unevenCashFlows.forEach((cf, idx) => {
      npvResult += cf / Math.pow(1 + effectiveRate, idx + 1);
    });
  }

  // Rate sensitivity matrix (±1%, ±2%, ±3%, ±5%)
  const sensitivityOffsets = [-3.0, -2.0, -1.0, 0, 1.0, 2.0, 3.0];
  const sensitivityMatrix: RateSensitivityPoint[] = sensitivityOffsets.map((offset) => {
    const testRate = Math.max(0.1, discountRate + offset);
    const testRes = calculatePVFast({ ...input, discountRate: testRate });
    return {
      rate: Number(testRate.toFixed(1)),
      lumpSumPV: testRes.lumpSumPV,
      annuityPV: testRes.annuityPV,
      totalPV: testRes.totalPV,
      discountAmount: testRes.discountAmount,
    };
  });

  // Scenario comparisons (Conservative higher discount rate, Moderate base rate, Aggressive lower discount rate)
  const conservativeRes = calculatePVFast({ ...input, discountRate: discountRate + 2.0 });
  const moderateRes = calculatePVFast({ ...input, discountRate });
  const aggressiveRes = calculatePVFast({ ...input, discountRate: Math.max(0.1, discountRate - 2.0) });

  return {
    presentValue: Number(totalPV.toFixed(2)),
    lumpSumPV: Number(lumpSumPV.toFixed(2)),
    annuityPV: Number(annuityPV.toFixed(2)),
    totalFutureCashFlows: Number(totalFutureCashFlows.toFixed(2)),
    totalDiscountAmount: Number(totalDiscountAmount.toFixed(2)),
    discountRatioPct: Number(discountRatioPct.toFixed(1)),
    effectiveDiscountRate: Number((effectiveRate * 100).toFixed(2)),
    realPresentValue: Number(realPresentValue.toFixed(2)),
    npvResult: Number(npvResult.toFixed(2)),
    yearlySchedule,
    monthlySchedule,
    sensitivityMatrix,
    scenarios: {
      conservative: {
        title: "Conservative (Rate + 2%)",
        discountRate: Number((discountRate + 2.0).toFixed(1)),
        presentValue: conservativeRes.totalPV,
        futureCashFlowTotal: conservativeRes.totalCashFlows,
        discountAmount: conservativeRes.discountAmount,
        discountRatioPct: conservativeRes.discountRatio,
      },
      moderate: {
        title: "Moderate (Base Rate)",
        discountRate: Number(discountRate.toFixed(1)),
        presentValue: moderateRes.totalPV,
        futureCashFlowTotal: moderateRes.totalCashFlows,
        discountAmount: moderateRes.discountAmount,
        discountRatioPct: moderateRes.discountRatio,
      },
      aggressive: {
        title: "Aggressive (Rate - 2%)",
        discountRate: Number(Math.max(0.1, discountRate - 2.0).toFixed(1)),
        presentValue: aggressiveRes.totalPV,
        futureCashFlowTotal: aggressiveRes.totalCashFlows,
        discountAmount: aggressiveRes.discountAmount,
        discountRatioPct: aggressiveRes.discountRatio,
      },
    },
  };
}

/**
 * Fast scalar helper for scenario & sensitivity calculations
 */
function calculatePVFast(input: PresentValueInput): {
  lumpSumPV: number;
  annuityPV: number;
  totalPV: number;
  totalCashFlows: number;
  discountAmount: number;
  discountRatio: number;
} {
  const fv = input.futureValue || 0;
  const pmt = input.periodicPayment || 0;
  const rate = (input.discountRate || 0) / 100;
  const years = input.years || 10;
  const nComp = getPeriodsPerYear(input.compoundingFrequency);
  const pContrib = getPeriodsPerYear(input.paymentFrequency);
  const isBegin = input.paymentTiming === 'beginning';

  const effRate = Math.pow(1 + rate / nComp, nComp) - 1;
  const rP = Math.pow(1 + effRate, 1 / pContrib) - 1;
  const totalPeriods = Math.round(years * pContrib);

  const lumpSumPV = fv / Math.pow(1 + rP, totalPeriods);

  let annuityPV = 0;
  let totalPmtFlows = 0;

  if (pmt > 0 && rP > 0) {
    const annFactor = (1 - Math.pow(1 + rP, -totalPeriods)) / rP;
    const timingMult = isBegin ? (1 + rP) : 1;
    annuityPV = pmt * annFactor * timingMult;
    totalPmtFlows = pmt * totalPeriods;
  } else if (pmt > 0) {
    annuityPV = pmt * totalPeriods;
    totalPmtFlows = pmt * totalPeriods;
  }

  const totalPV = lumpSumPV + annuityPV;
  const totalCashFlows = fv + totalPmtFlows;
  const discountAmount = Math.max(0, totalCashFlows - totalPV);
  const discountRatio = totalCashFlows > 0 ? (discountAmount / totalCashFlows) * 100 : 0;

  return {
    lumpSumPV: Number(lumpSumPV.toFixed(2)),
    annuityPV: Number(annuityPV.toFixed(2)),
    totalPV: Number(totalPV.toFixed(2)),
    totalCashFlows: Number(totalCashFlows.toFixed(2)),
    discountAmount: Number(discountAmount.toFixed(2)),
    discountRatio: Number(discountRatio.toFixed(1)),
  };
}
