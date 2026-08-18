import {
  AnnualPaybackFlowRow,
  IrregularPaybackInputs,
  PaybackPeriodResult,
  PaybackScheduleRow,
  FixedPaybackInputs,
  FixedPaybackResult,
  MonthlyPaybackInputs,
  MonthlyPaybackResult,
  ProjectCompareInputs,
  ProjectCompareResult,
  TargetHurdleInputs,
  TargetHurdleResult,
  SensitivityMatrixCell,
} from "./types";

export function formatYearsToYMD(yearsVal: number): string {
  if (isNaN(yearsVal) || yearsVal <= 0) return "0 Days";
  const wholeYears = Math.floor(yearsVal);
  const fracYear = yearsVal - wholeYears;
  const totalMonths = fracYear * 12;
  const wholeMonths = Math.floor(totalMonths);
  const fracMonth = totalMonths - wholeMonths;
  const days = Math.round(fracMonth * 30.417);

  const parts: string[] = [];
  if (wholeYears > 0) parts.push(`${wholeYears} ${wholeYears === 1 ? "yr" : "yrs"}`);
  if (wholeMonths > 0) parts.push(`${wholeMonths} ${wholeMonths === 1 ? "mo" : "mos"}`);
  if (days > 0 || parts.length === 0) parts.push(`${days} ${days === 1 ? "day" : "days"}`);

  return `${yearsVal.toFixed(2)} Years (${parts.join(", ")})`;
}

export function formatMonthsToMD(monthsVal: number): string {
  if (isNaN(monthsVal) || monthsVal <= 0) return "0 Days";
  const wholeMonths = Math.floor(monthsVal);
  const fracMonth = monthsVal - wholeMonths;
  const days = Math.round(fracMonth * 30.417);

  const parts: string[] = [];
  if (wholeMonths > 0) parts.push(`${wholeMonths} ${wholeMonths === 1 ? "mo" : "mos"}`);
  if (days > 0 || parts.length === 0) parts.push(`${days} ${days === 1 ? "day" : "days"}`);

  return `${monthsVal.toFixed(1)} Months (${parts.join(", ")})`;
}

/**
 * 1. Core Irregular Annual Cash Flow Payback & DPP Engine
 */
export function calculateIrregularPayback(inputs: IrregularPaybackInputs): PaybackPeriodResult {
  const outlay = Math.abs(inputs.initialInvestment || 0);
  const r = (inputs.discountRate || 0) / 100;
  const flows = inputs.cashFlows.map((f) => f.amount);
  const n = flows.length;

  if (outlay === 0 || n === 0) {
    return {
      simplePaybackYears: 0,
      simplePaybackFormatted: "0 Years",
      simpleBreakevenAchieved: false,
      discountedPaybackYears: 0,
      discountedPaybackFormatted: "0 Years",
      discountedBreakevenAchieved: false,
      npv: 0,
      irrPercent: 0,
      profitabilityIndex: 0,
      totalNominalInflows: 0,
      netNominalProfit: 0,
      totalDiscountedInflows: 0,
      schedule: [],
    };
  }

  let cumNominal = 0;
  let cumDiscounted = 0;
  let simplePaybackYears = 0;
  let simpleBreakevenAchieved = false;
  let discountedPaybackYears = 0;
  let discountedBreakevenAchieved = false;

  const schedule: PaybackScheduleRow[] = [
    {
      year: 0,
      nominalCashFlow: -outlay,
      discountFactor: 1.0,
      discountedCashFlow: -outlay,
      cumulativeNominalCashFlow: 0,
      unrecoveredNominalBalance: -outlay,
      cumulativeDiscountedCashFlow: 0,
      unrecoveredDiscountedBalance: -outlay,
    },
  ];

  let totalNominalInflows = 0;
  let totalDiscountedInflows = 0;

  for (let t = 1; t <= n; t++) {
    const cf = flows[t - 1];
    if (cf > 0) totalNominalInflows += cf;

    const discFactor = 1 / Math.pow(1 + r, t);
    const pv = cf * discFactor;
    if (pv > 0) totalDiscountedInflows += pv;

    const prevCumNominal = cumNominal;
    const prevCumDiscounted = cumDiscounted;

    cumNominal += cf;
    cumDiscounted += pv;

    // Simple payback interpolation: A + (Outlay - prevCum) / cf
    if (!simpleBreakevenAchieved && cumNominal >= outlay) {
      simpleBreakevenAchieved = true;
      if (cf > 0) {
        const unrec = outlay - prevCumNominal;
        simplePaybackYears = t - 1 + unrec / cf;
      } else {
        simplePaybackYears = t;
      }
    }

    // Discounted payback interpolation
    if (!discountedBreakevenAchieved && cumDiscounted >= outlay) {
      discountedBreakevenAchieved = true;
      if (pv > 0) {
        const unrecDisc = outlay - prevCumDiscounted;
        discountedPaybackYears = t - 1 + unrecDisc / pv;
      } else {
        discountedPaybackYears = t;
      }
    }

    schedule.push({
      year: t,
      nominalCashFlow: Math.round(cf * 100) / 100,
      discountFactor: Math.round(discFactor * 10000) / 10000,
      discountedCashFlow: Math.round(pv * 100) / 100,
      cumulativeNominalCashFlow: Math.round(cumNominal * 100) / 100,
      unrecoveredNominalBalance: Math.round((cumNominal - outlay) * 100) / 100,
      cumulativeDiscountedCashFlow: Math.round(cumDiscounted * 100) / 100,
      unrecoveredDiscountedBalance: Math.round((cumDiscounted - outlay) * 100) / 100,
    });
  }

  const npv = Math.round((cumDiscounted - outlay) * 100) / 100;
  const netNominalProfit = Math.round((cumNominal - outlay) * 100) / 100;
  const profitabilityIndex = outlay > 0 ? Math.round((cumDiscounted / outlay) * 1000) / 1000 : 0;

  // Solve IRR via Newton-Raphson
  const fullFlows = [-outlay, ...flows];
  const npvFn = (rate: number) => fullFlows.reduce((sum, val, t) => sum + val / Math.pow(1 + rate, t), 0);
  let irrRate = 0.1;
  for (let i = 0; i < 40; i++) {
    const val = npvFn(irrRate);
    if (Math.abs(val) < 1e-6) break;
    const dVal = (npvFn(irrRate + 1e-6) - val) / 1e-6;
    if (Math.abs(dVal) < 1e-9) break;
    irrRate = irrRate - val / dVal;
  }
  const irrPercent = isNaN(irrRate) ? 0 : Math.round(irrRate * 100000) / 1000;

  return {
    simplePaybackYears: Math.round(simplePaybackYears * 1000) / 1000,
    simplePaybackFormatted: simpleBreakevenAchieved ? formatYearsToYMD(simplePaybackYears) : "Never Breakeven",
    simpleBreakevenAchieved,
    discountedPaybackYears: Math.round(discountedPaybackYears * 1000) / 1000,
    discountedPaybackFormatted: discountedBreakevenAchieved ? formatYearsToYMD(discountedPaybackYears) : "Never Breakeven",
    discountedBreakevenAchieved,
    npv,
    irrPercent,
    profitabilityIndex,
    totalNominalInflows: Math.round(totalNominalInflows * 100) / 100,
    netNominalProfit,
    totalDiscountedInflows: Math.round(totalDiscountedInflows * 100) / 100,
    schedule,
  };
}

/**
 * 2. Fixed / Annuity Cash Flow Payback & Escalation Solver
 */
export function calculateFixedPayback(inputs: FixedPaybackInputs): FixedPaybackResult {
  const outlay = Math.abs(inputs.initialInvestment || 0);
  const basePmt = Math.abs(inputs.annualCashFlow || 0);
  const g = (inputs.annualIncreaseRate || 0) / 100;
  const n = Math.max(1, Math.min(40, inputs.numberYears || 5));
  const r = (inputs.discountRate || 0) / 100;

  // Build annual flow array
  const flowRows: AnnualPaybackFlowRow[] = [];
  for (let t = 1; t <= n; t++) {
    const amt = basePmt * Math.pow(1 + g, t - 1);
    flowRows.push({ year: t, amount: amt });
  }

  const res = calculateIrregularPayback({
    initialInvestment: outlay,
    discountRate: inputs.discountRate,
    cashFlows: flowRows,
  });

  // Closed-form DPP for uniform annuity (when g === 0 and basePmt > outlay * r)
  let closedFormDppUniform = 0;
  if (g === 0 && r > 0 && basePmt > outlay * r) {
    closedFormDppUniform = -Math.log(1 - (outlay * r) / basePmt) / Math.log(1 + r);
    closedFormDppUniform = Math.round(closedFormDppUniform * 1000) / 1000;
  } else if (g === 0 && r === 0 && basePmt > 0) {
    closedFormDppUniform = outlay / basePmt;
  }

  return {
    simplePaybackYears: res.simplePaybackYears,
    simplePaybackFormatted: res.simplePaybackFormatted,
    simpleBreakevenAchieved: res.simpleBreakevenAchieved,
    discountedPaybackYears: res.discountedPaybackYears,
    discountedPaybackFormatted: res.discountedPaybackFormatted,
    discountedBreakevenAchieved: res.discountedBreakevenAchieved,
    npv: res.npv,
    totalNominalInflows: res.totalNominalInflows,
    netNominalProfit: res.netNominalProfit,
    closedFormDppUniform,
    schedule: res.schedule,
  };
}

/**
 * 3. Monthly & Periodic Payback Solver
 */
export function calculateMonthlyPayback(inputs: MonthlyPaybackInputs): MonthlyPaybackResult {
  const outlay = Math.abs(inputs.initialInvestment || 0);
  const monthlyPmt = Math.abs(inputs.monthlyCashFlow || 0);
  const totalMonths = Math.max(1, Math.min(120, inputs.holdingMonths || 36));
  const monthlyRate = (inputs.annualDiscountRate || 0) / 100 / 12;

  let cumNominal = 0;
  let cumDiscounted = 0;
  let simplePaybackMonths = 0;
  let simpleFound = false;
  let discountedPaybackMonths = 0;
  let discFound = false;

  const schedule = [];

  for (let m = 1; m <= totalMonths; m++) {
    const pv = monthlyPmt / Math.pow(1 + monthlyRate, m);
    const prevNom = cumNominal;
    const prevDisc = cumDiscounted;

    cumNominal += monthlyPmt;
    cumDiscounted += pv;

    if (!simpleFound && cumNominal >= outlay) {
      simpleFound = true;
      simplePaybackMonths = m - 1 + (outlay - prevNom) / monthlyPmt;
    }

    if (!discFound && cumDiscounted >= outlay) {
      discFound = true;
      discountedPaybackMonths = m - 1 + (outlay - prevDisc) / pv;
    }

    if (m <= 36) {
      schedule.push({
        month: m,
        nominalFlow: monthlyPmt,
        discountedFlow: Math.round(pv * 100) / 100,
        cumulativeNominal: Math.round(cumNominal * 100) / 100,
        cumulativeDiscounted: Math.round(cumDiscounted * 100) / 100,
      });
    }
  }

  const npv = Math.round((cumDiscounted - outlay) * 100) / 100;

  return {
    simplePaybackMonths: Math.round(simplePaybackMonths * 100) / 100,
    simplePaybackFormatted: simpleFound ? formatMonthsToMD(simplePaybackMonths) : "Never Breakeven",
    discountedPaybackMonths: Math.round(discountedPaybackMonths * 100) / 100,
    discountedPaybackFormatted: discFound ? formatMonthsToMD(discountedPaybackMonths) : "Never Breakeven",
    npv,
    totalInflows: Math.round(cumNominal * 100) / 100,
    schedule,
  };
}

/**
 * 4. Side-by-Side Capital Project Comparator (Project A vs. Project B)
 */
export function calculateProjectComparison(inputs: ProjectCompareInputs): ProjectCompareResult {
  const resA = calculateIrregularPayback({
    initialInvestment: inputs.outlayA,
    discountRate: inputs.discountRate,
    cashFlows: inputs.flowsA.map((amt, idx) => ({ year: idx + 1, amount: amt })),
  });

  const resB = calculateIrregularPayback({
    initialInvestment: inputs.outlayB,
    discountRate: inputs.discountRate,
    cashFlows: inputs.flowsB.map((amt, idx) => ({ year: idx + 1, amount: amt })),
  });

  // Calculate post-payback cash flow profits
  const postProfitA = resA.netNominalProfit;
  const postProfitB = resB.netNominalProfit;

  let recommendation: "Project A" | "Project B" | "Both" | "Neither" = "Neither";
  let reasoning = "";

  if (resA.npv > 0 && resB.npv > 0) {
    if (resA.npv > resB.npv) {
      recommendation = "Project A";
      reasoning = `Project A generates superior Net Present Value ($${resA.npv.toLocaleString()} vs $${resB.npv.toLocaleString()}) and creates more total shareholder wealth despite payback timing differences.`;
    } else {
      recommendation = "Project B";
      reasoning = `Project B creates significantly greater total net enterprise value ($${resB.npv.toLocaleString()} vs $${resA.npv.toLocaleString()}) across its project lifecycle.`;
    }
  } else if (resA.npv > 0) {
    recommendation = "Project A";
    reasoning = `Project A is financially viable with a positive NPV ($${resA.npv.toLocaleString()}), whereas Project B fails the required hurdle rate.`;
  } else if (resB.npv > 0) {
    recommendation = "Project B";
    reasoning = `Project B is financially viable with a positive NPV ($${resB.npv.toLocaleString()}), whereas Project A fails the required hurdle rate.`;
  } else {
    recommendation = "Neither";
    reasoning = `Both capital investment proposals result in negative Net Present Value and destroy value at the ${inputs.discountRate}% cost of capital.`;
  }

  return {
    paybackA: resA.simplePaybackYears,
    dppA: resA.discountedPaybackYears,
    npvA: resA.npv,
    postPaybackProfitA: postProfitA,
    paybackB: resB.simplePaybackYears,
    dppB: resB.discountedPaybackYears,
    npvB: resB.npv,
    postPaybackProfitB: postProfitB,
    recommendation,
    reasoning,
  };
}

/**
 * 5. Target Payback Hurdle Solver (Reverse Calculator)
 */
export function calculateTargetHurdle(inputs: TargetHurdleInputs): TargetHurdleResult {
  const outlay = Math.abs(inputs.initialInvestment || 100000);
  const targetT = Math.max(0.5, inputs.targetPaybackYears || 3);
  const r = (inputs.discountRate || 10) / 100;
  const lifeYears = Math.max(targetT, inputs.projectLifeYears || 5);

  // Required annual cash flow simple: CF = Outlay / TargetYears
  const requiredAnnualCashFlowSimple = Math.round((outlay / targetT) * 100) / 100;

  // Required annual cash flow discounted (uniform annuity):
  // Outlay = PMT * [1 - (1+r)^-T] / r  ==> PMT = Outlay * r / [1 - (1+r)^-T]
  let requiredAnnualCashFlowDiscounted = 0;
  let isFeasible = true;

  if (r > 0) {
    const pvaf = (1 - Math.pow(1 + r, -targetT)) / r;
    requiredAnnualCashFlowDiscounted = Math.round((outlay / pvaf) * 100) / 100;
  } else {
    requiredAnnualCashFlowDiscounted = requiredAnnualCashFlowSimple;
  }

  // Maximum allowable investment for target payback assuming current required annual flow
  const maxAllowableInvestmentForTarget = Math.round(requiredAnnualCashFlowSimple * targetT * 100) / 100;

  return {
    requiredAnnualCashFlowSimple,
    requiredAnnualCashFlowDiscounted,
    maxAllowableInvestmentForTarget,
    isFeasible,
  };
}

/**
 * 6. Sensitivity Matrix & Stress Test Grid
 */
export function generatePaybackSensitivityMatrix(
  baseOutlay: number,
  baseFlows: number[]
): SensitivityMatrixCell[] {
  const matrix: SensitivityMatrixCell[] = [];
  const rates = [0, 5, 8, 10, 12, 15, 20];
  const variances = [-20, -10, 0, 10, 20]; // % variance on cash flows

  rates.forEach((discountRate) => {
    variances.forEach((variance) => {
      const mult = 1 + variance / 100;
      const scaledFlows = baseFlows.map((cf, idx) => ({ year: idx + 1, amount: cf * mult }));

      const res = calculateIrregularPayback({
        initialInvestment: baseOutlay,
        discountRate,
        cashFlows: scaledFlows,
      });

      matrix.push({
        discountRate,
        cashFlowVariancePercent: variance,
        simplePaybackYears: res.simplePaybackYears,
        discountedPaybackYears: res.discountedPaybackYears,
        npv: res.npv,
      });
    });
  });

  return matrix;
}
