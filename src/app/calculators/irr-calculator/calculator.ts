import {
  CoreIrrInputs,
  CoreIrrResult,
  AnnualDiscountScheduleRow,
  FixedCashFlowInputs,
  FixedCashFlowResult,
  NpvSensitivityPoint,
  MultiProjectInputs,
  MultiProjectResult,
} from "./types";

/**
 * 1. Core Annual Cash Flow IRR, MIRR, NPV, PI & Payback Engine
 */
export function calculateCoreIrr(inputs: CoreIrrInputs): CoreIrrResult {
  const outlay = Math.abs(inputs.initialOutlay || 0);
  const flows = [-outlay, ...inputs.cashFlows.map((cf) => cf.amount)];
  const n = flows.length - 1;

  if (n <= 0 || outlay === 0) {
    return {
      irrPercent: 0,
      mirrPercent: 0,
      npv: 0,
      profitabilityIndex: 0,
      simplePaybackYears: 0,
      discountedPaybackYears: 0,
      totalInflows: 0,
      netProfit: 0,
      isAccept: false,
      schedule: [],
      signChangesCount: 0,
      hasMultipleRoots: false,
    };
  }

  // Count sign changes (Descartes' Rule of Signs)
  let signChangesCount = 0;
  let nonZeroFlows = flows.filter((f) => f !== 0);
  for (let i = 1; i < nonZeroFlows.length; i++) {
    if ((nonZeroFlows[i] > 0 && nonZeroFlows[i - 1] < 0) || (nonZeroFlows[i] < 0 && nonZeroFlows[i - 1] > 0)) {
      signChangesCount++;
    }
  }
  const hasMultipleRoots = signChangesCount > 1;

  // NPV function
  const npvFn = (r: number): number => {
    return flows.reduce((sum, val, t) => sum + val / Math.pow(1 + r, t), 0);
  };

  // Derivative of NPV for Newton-Raphson
  const dNpvFn = (r: number): number => {
    return flows.reduce((sum, val, t) => (t === 0 ? sum : sum - (t * val) / Math.pow(1 + r, t + 1)), 0);
  };

  // Newton-Raphson solver with bisection fallback
  let r = 0.1;
  let converged = false;

  for (let i = 0; i < 50; i++) {
    const val = npvFn(r);
    if (Math.abs(val) < 1e-6) {
      converged = true;
      break;
    }
    const deriv = dNpvFn(r);
    if (Math.abs(deriv) < 1e-9) break;
    const nextR = r - val / deriv;
    if (nextR <= -0.99 || nextR > 20.0) break;
    r = nextR;
  }

  if (!converged) {
    let low = -0.99;
    let high = 5.0;
    let valLow = npvFn(low);
    let valHigh = npvFn(high);

    if (valLow * valHigh <= 0) {
      for (let i = 0; i < 100; i++) {
        const mid = (low + high) / 2;
        const valMid = npvFn(mid);
        if (Math.abs(valMid) < 1e-5) {
          r = mid;
          converged = true;
          break;
        }
        if (valLow * valMid <= 0) {
          high = mid;
          valHigh = valMid;
        } else {
          low = mid;
          valLow = valMid;
        }
        r = mid;
      }
    }
  }

  const irrPercent = Math.round(r * 100000) / 1000;

  // Calculate MIRR
  // MIRR = [ FV(pos flows @ reinvestRate) / PV(neg flows @ finRate) ]^(1/n) - 1
  const rReinvest = (inputs.reinvestmentRate || 10) / 100;
  const rFinance = (inputs.financingRate || 8) / 100;

  let fvPos = 0;
  let pvNeg = 0;

  flows.forEach((val, t) => {
    if (val > 0) {
      fvPos += val * Math.pow(1 + rReinvest, n - t);
    } else if (val < 0) {
      pvNeg += Math.abs(val) / Math.pow(1 + rFinance, t);
    }
  });

  let mirrPercent = 0;
  if (pvNeg > 0 && fvPos > 0 && n > 0) {
    const mirrVal = Math.pow(fvPos / pvNeg, 1 / n) - 1;
    mirrPercent = Math.round(mirrVal * 100000) / 1000;
  }

  // NPV at Hurdle Rate (WACC)
  const hurdle = (inputs.hurdleRate || 12) / 100;
  const npv = Math.round(npvFn(hurdle) * 100) / 100;

  // Profitability Index
  const pvInflows = flows.slice(1).reduce((sum, val, idx) => {
    const t = idx + 1;
    return val > 0 ? sum + val / Math.pow(1 + hurdle, t) : sum;
  }, 0);
  const profitabilityIndex = outlay > 0 ? Math.round((pvInflows / outlay) * 1000) / 1000 : 0;

  // Schedule & Payback Calculations
  let cumCash = -outlay;
  let cumDiscounted = -outlay;
  let simplePaybackYears = 0;
  let discountedPaybackYears = 0;
  let simpleFound = false;
  let discFound = false;

  const schedule: AnnualDiscountScheduleRow[] = [
    {
      year: 0,
      cashFlow: -outlay,
      discountFactor: 1.0,
      presentValue: -outlay,
      cumulativeCashFlow: -outlay,
      cumulativeDiscountedValue: -outlay,
    },
  ];

  let totalInflows = 0;

  for (let t = 1; t <= n; t++) {
    const cf = flows[t];
    if (cf > 0) totalInflows += cf;

    const discFactor = 1 / Math.pow(1 + hurdle, t);
    const pv = cf * discFactor;

    const prevCumCash = cumCash;
    const prevCumDisc = cumDiscounted;

    cumCash += cf;
    cumDiscounted += pv;

    // Simple Payback interpolation
    if (!simpleFound && cumCash >= 0) {
      simpleFound = true;
      if (cf !== 0) {
        simplePaybackYears = t - 1 + Math.abs(prevCumCash) / cf;
      } else {
        simplePaybackYears = t;
      }
    }

    // Discounted Payback interpolation
    if (!discFound && cumDiscounted >= 0) {
      discFound = true;
      if (pv !== 0) {
        discountedPaybackYears = t - 1 + Math.abs(prevCumDisc) / pv;
      } else {
        discountedPaybackYears = t;
      }
    }

    schedule.push({
      year: t,
      cashFlow: Math.round(cf * 100) / 100,
      discountFactor: Math.round(discFactor * 10000) / 10000,
      presentValue: Math.round(pv * 100) / 100,
      cumulativeCashFlow: Math.round(cumCash * 100) / 100,
      cumulativeDiscountedValue: Math.round(cumDiscounted * 100) / 100,
    });
  }

  if (!simpleFound) simplePaybackYears = n + 1; // indicates does not pay back within horizon
  if (!discFound) discountedPaybackYears = n + 1;

  const netProfit = Math.round((totalInflows - outlay) * 100) / 100;
  const isAccept = irrPercent >= (inputs.hurdleRate || 12);

  return {
    irrPercent: isNaN(irrPercent) ? 0 : irrPercent,
    mirrPercent: isNaN(mirrPercent) ? 0 : mirrPercent,
    npv,
    profitabilityIndex,
    simplePaybackYears: Math.round(simplePaybackYears * 100) / 100,
    discountedPaybackYears: Math.round(discountedPaybackYears * 100) / 100,
    totalInflows: Math.round(totalInflows * 100) / 100,
    netProfit,
    isAccept,
    schedule,
    signChangesCount,
    hasMultipleRoots,
  };
}

/**
 * 2. Fixed / Annuity Recurring Cash Flow IRR Engine
 */
export function calculateFixedCashFlowIrr(inputs: FixedCashFlowInputs): FixedCashFlowResult {
  const initial = Math.abs(inputs.initialInvestment || 0);
  const ending = Math.abs(inputs.endingBalance || 0);
  const pmt = Math.abs(inputs.recurringPayment || 0);
  const isWithdrawal = inputs.direction === "withdraw"; // Withdrawal = cash received by investor (+)
  const isBeginning = inputs.timing === "beginning";

  // Periods per year
  const freqMap = {
    monthly: 12,
    quarterly: 4,
    semiAnnually: 2,
    annually: 1,
  };
  const ppy = freqMap[inputs.frequency] || 12;
  const totalYears = (inputs.holdingYears || 0) + (inputs.holdingMonths || 0) / 12;
  const totalPeriods = Math.max(1, Math.round(totalYears * ppy));

  // Build cash flow sequence
  // If withdrawal: investor puts in initial (outflow -), receives pmt (inflow +) each period, and receives ending (inflow +) at terminal.
  // If deposit: investor puts in initial (-), adds pmt (-) each period, and receives ending (+) at terminal.
  const signedPmt = isWithdrawal ? pmt : -pmt;

  const npvFixed = (periodRate: number): number => {
    let sum = -initial;
    for (let p = 1; p <= totalPeriods; p++) {
      const t = isBeginning ? p - 1 : p;
      let cf = signedPmt;
      if (p === totalPeriods) {
        cf += ending;
      }
      sum += cf / Math.pow(1 + periodRate, t);
    }
    return sum;
  };

  // Newton-Raphson for period rate
  let pr = 0.01;
  for (let i = 0; i < 50; i++) {
    const val = npvFixed(pr);
    if (Math.abs(val) < 1e-6) break;
    const dVal = (npvFixed(pr + 1e-6) - val) / 1e-6;
    if (Math.abs(dVal) < 1e-9) break;
    pr = pr - val / dVal;
  }

  const annualCompoundedIrr = Math.round((Math.pow(1 + pr, ppy) - 1) * 100000) / 1000;
  const nominalAnnualIrr = Math.round(pr * ppy * 100000) / 1000;
  const totalPeriodicFlows = Math.round(pmt * totalPeriods * 100) / 100;
  const netCashReceived = isWithdrawal
    ? Math.round((totalPeriodicFlows + ending - initial) * 100) / 100
    : Math.round((ending - (initial + totalPeriodicFlows)) * 100) / 100;
  const totalWealthMultiple = initial > 0 ? Math.round(((netCashReceived + initial) / initial) * 100) / 100 : 0;

  const schedule = [];
  let runningBalance = initial;
  for (let p = 1; p <= Math.min(totalPeriods, 36); p++) {
    schedule.push({
      period: p,
      cashFlow: signedPmt,
      endingBalance: p === totalPeriods ? ending : runningBalance,
    });
  }

  return {
    annualCompoundedIrr: isNaN(annualCompoundedIrr) ? 0 : annualCompoundedIrr,
    nominalAnnualIrr: isNaN(nominalAnnualIrr) ? 0 : nominalAnnualIrr,
    totalPeriodicFlows,
    netCashReceived,
    totalWealthMultiple,
    totalPeriods,
    schedule,
  };
}

/**
 * 3. Dynamic NPV vs. Discount Rate Profile Curve Generator (0% to 50%)
 */
export function generateNpvSensitivityCurve(flows: number[]): NpvSensitivityPoint[] {
  const points: NpvSensitivityPoint[] = [];
  const rates = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40, 45, 50];

  rates.forEach((rate) => {
    const r = rate / 100;
    const npv = flows.reduce((sum, val, t) => sum + val / Math.pow(1 + r, t), 0);
    points.push({
      rate,
      npv: Math.round(npv * 100) / 100,
    });
  });

  return points;
}

/**
 * 4. Multi-Project Capital Budgeting Comparator (Project A vs. Project B)
 */
export function calculateMultiProjectComparison(inputs: MultiProjectInputs): MultiProjectResult {
  const flowsA = [-Math.abs(inputs.projectAOutlay || 0), ...inputs.projectAFlows];
  const flowsB = [-Math.abs(inputs.projectBOutlay || 0), ...inputs.projectBFlows];
  const wacc = (inputs.costOfCapital || 10) / 100;

  const solveSingleIrr = (cfList: number[]): number => {
    const npv = (r: number) => cfList.reduce((sum, val, t) => sum + val / Math.pow(1 + r, t), 0);
    let r = 0.1;
    for (let i = 0; i < 40; i++) {
      const val = npv(r);
      if (Math.abs(val) < 1e-6) break;
      const dVal = (npv(r + 1e-6) - val) / 1e-6;
      r = r - val / dVal;
    }
    return Math.round(r * 100000) / 1000;
  };

  const npvA = Math.round(flowsA.reduce((sum, val, t) => sum + val / Math.pow(1 + wacc, t), 0) * 100) / 100;
  const npvB = Math.round(flowsB.reduce((sum, val, t) => sum + val / Math.pow(1 + wacc, t), 0) * 100) / 100;
  const irrA = solveSingleIrr(flowsA);
  const irrB = solveSingleIrr(flowsB);

  // Differential flows for Crossover Rate (Fisher's Rate)
  const maxLen = Math.max(flowsA.length, flowsB.length);
  const diffFlows: number[] = [];
  for (let t = 0; t < maxLen; t++) {
    const aVal = flowsA[t] || 0;
    const bVal = flowsB[t] || 0;
    diffFlows.push(aVal - bVal);
  }
  const crossoverRate = solveSingleIrr(diffFlows);

  let recommendedProject: "Project A" | "Project B" | "Both" | "Neither" = "Neither";
  let reasoning = "";

  if (npvA > 0 && npvB > 0) {
    if (npvA > npvB) {
      recommendedProject = "Project A";
      reasoning = `Project A maximizes shareholder wealth with a higher Net Present Value ($${npvA.toLocaleString()} vs $${npvB.toLocaleString()}) at your ${inputs.costOfCapital}% cost of capital.`;
    } else {
      recommendedProject = "Project B";
      reasoning = `Project B creates greater total enterprise value with a higher Net Present Value ($${npvB.toLocaleString()} vs $${npvA.toLocaleString()}) at your ${inputs.costOfCapital}% cost of capital.`;
    }
  } else if (npvA > 0) {
    recommendedProject = "Project A";
    reasoning = `Project A is financially viable (NPV > 0), whereas Project B fails the required hurdle rate.`;
  } else if (npvB > 0) {
    recommendedProject = "Project B";
    reasoning = `Project B is financially viable (NPV > 0), whereas Project A fails the required hurdle rate.`;
  } else {
    recommendedProject = "Neither";
    reasoning = `Both projects produce negative NPV at the specified cost of capital and should be rejected.`;
  }

  return {
    projectAIrr: irrA,
    projectANpv: npvA,
    projectBIrr: irrB,
    projectBNpv: npvB,
    crossoverRate: isNaN(crossoverRate) ? 0 : crossoverRate,
    recommendedProject,
    reasoning,
  };
}
