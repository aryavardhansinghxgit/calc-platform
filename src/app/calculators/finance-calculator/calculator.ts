import {
  TVMMode,
  TVMInput,
  TVMResult,
  ScheduleRow,
  InflationInput,
  InflationResult,
  TaxDragInput,
  TaxDragResult,
  MilestoneInput,
  MilestoneResult,
  ScenarioInput,
  ScenarioResult,
} from "./types";

// Helper: Calculate periodic rate i given annual I/Y, P/Y, C/Y
function getPeriodicRate(iy: number, py: number, cy: number): number {
  const annualRate = iy / 100;
  if (py === cy) {
    return annualRate / py;
  }
  return Math.pow(1 + annualRate / cy, cy / py) - 1;
}

// Solves TVM equation for FV, PV, PMT, N, or I/Y
export function calculateTVM(input: TVMInput): TVMResult {
  const {
    mode = "FV",
    n: inputN = 10,
    iy: inputIY = 6,
    pv: inputPV = 20000,
    pmt: inputPMT = -2000,
    py: inputPY = 1,
    cy: inputCY = 1,
    pmtTiming = "end",
    inflationRate = 2.5,
    taxRate = 0,
    currencySymbol = "$",
  } = input;

  const py = Math.max(1, inputPY);
  const cy = Math.max(1, inputCY);
  const type = pmtTiming === "beginning" ? 1 : 0;

  let solvedVariable = mode;
  let n = Math.max(0, inputN);
  let iy = inputIY;
  let pv = inputPV;
  let pmt = inputPMT;
  let fv = 0;

  let iRate = getPeriodicRate(iy, py, cy);

  if (mode === "FV") {
    if (iRate === 0) {
      fv = -(pv + pmt * n);
    } else {
      const powVal = Math.pow(1 + iRate, n);
      const pmtFactor = (1 + iRate * type) * ((powVal - 1) / iRate);
      fv = -(pv * powVal + pmt * pmtFactor);
    }
  } else if (mode === "PV") {
    if (iRate === 0) {
      pv = -(fv + pmt * n);
    } else {
      const powVal = Math.pow(1 + iRate, n);
      const pmtFactor = (1 + iRate * type) * ((powVal - 1) / iRate);
      pv = -(fv + pmt * pmtFactor) / powVal;
    }
  } else if (mode === "PMT") {
    if (iRate === 0) {
      pmt = n > 0 ? -(pv + fv) / n : 0;
    } else {
      const powVal = Math.pow(1 + iRate, n);
      const pmtFactor = (1 + iRate * type) * ((powVal - 1) / iRate);
      pmt = pmtFactor !== 0 ? -(fv + pv * powVal) / pmtFactor : 0;
    }
  } else if (mode === "N") {
    if (iRate === 0) {
      n = pmt !== 0 ? Math.abs((pv + fv) / pmt) : 0;
    } else {
      // Newton-Raphson for N
      let guessN = 10;
      for (let k = 0; k < 50; k++) {
        const powVal = Math.pow(1 + iRate, guessN);
        const f = pv * powVal + pmt * (1 + iRate * type) * ((powVal - 1) / iRate) + fv;
        const df =
          pv * powVal * Math.log(1 + iRate) +
          pmt * (1 + iRate * type) * ((powVal * Math.log(1 + iRate)) / iRate);
        if (Math.abs(df) < 1e-12) break;
        const nextN = guessN - f / df;
        if (Math.abs(nextN - guessN) < 1e-6) {
          guessN = nextN;
          break;
        }
        guessN = nextN;
      }
      n = Math.max(0, guessN);
    }
  } else if (mode === "IY") {
    // Solves for iRate using Secant / Bisection Method
    let low = -0.999;
    let high = 5.0; // 500%
    for (let k = 0; k < 100; k++) {
      const mid = (low + high) / 2;
      const powVal = Math.pow(1 + mid, n);
      const pmtFactor = mid === 0 ? n : (1 + mid * type) * ((powVal - 1) / mid);
      const f = pv * powVal + pmt * pmtFactor + fv;
      if (f > 0) {
        high = mid;
      } else {
        low = mid;
      }
    }
    const solvedRate = (low + high) / 2;
    iy = solvedRate * py * 100;
    iRate = solvedRate;
  }

  // Round solved values
  let solvedValue = 0;
  if (mode === "FV") solvedValue = Number(fv.toFixed(2));
  if (mode === "PV") solvedValue = Number(pv.toFixed(2));
  if (mode === "PMT") solvedValue = Number(pmt.toFixed(2));
  if (mode === "N") solvedValue = Number(n.toFixed(2));
  if (mode === "IY") solvedValue = Number(iy.toFixed(2));

  // Schedule Generator
  const schedule: ScheduleRow[] = [];
  let currentPV = pv;
  const numPeriods = Math.round(n);

  for (let p = 1; p <= numPeriods; p++) {
    const periodStartBalance = currentPV;
    let periodPMT = pmt;
    let interestEarned = 0;

    if (type === 1) {
      // Beginning of period
      const tempBal = periodStartBalance + periodPMT;
      interestEarned = tempBal * iRate;
      currentPV = tempBal + interestEarned;
    } else {
      // End of period
      interestEarned = periodStartBalance * iRate;
      currentPV = periodStartBalance + interestEarned + periodPMT;
    }

    schedule.push({
      period: p,
      pv: Number(periodStartBalance.toFixed(2)),
      pmt: Number(periodPMT.toFixed(2)),
      interest: Number(interestEarned.toFixed(2)),
      fv: Number(currentPV.toFixed(2)),
    });
  }

  const sumPayments = Number((pmt * n).toFixed(2));
  const totalInterest = Number((Math.abs(fv) - Math.abs(pv) - Math.abs(sumPayments)).toFixed(2));
  const totalCostOrEndValue = Number(fv.toFixed(2));

  // Inflation-Adjusted Purchasing Power
  const years = n / py;
  const realPurchasingPower = Number((fv / Math.pow(1 + inflationRate / 100, years)).toFixed(2));

  // Post-Tax Return
  const totalGains = Math.max(0, Math.abs(fv) - Math.abs(pv) - Math.abs(sumPayments));
  const taxDrag = (totalGains * taxRate) / 100;
  const postTaxValue = Number((fv - taxDrag).toFixed(2));

  return {
    solvedVariable,
    solvedValue,
    fv: Number(fv.toFixed(2)),
    pv: Number(pv.toFixed(2)),
    pmt: Number(pmt.toFixed(2)),
    n: Number(n.toFixed(2)),
    iy: Number(iy.toFixed(2)),
    sumPayments,
    totalInterest: Math.abs(totalInterest),
    totalCostOrEndValue,
    realPurchasingPower,
    postTaxValue,
    schedule,
  };
}

export function calculateInflation(input: InflationInput): InflationResult {
  const { nominalAmount = 100000, inflationRate = 3.0, years = 10 } = input;
  const realValue = Math.round(nominalAmount / Math.pow(1 + inflationRate / 100, years));
  const lossPct = Number((((nominalAmount - realValue) / nominalAmount) * 100).toFixed(1));

  return {
    realValue,
    purchasingPowerLossPct: lossPct,
    explanation: `Due to a ${inflationRate}% annual inflation rate, $${nominalAmount.toLocaleString()} will have the purchasing power of $${realValue.toLocaleString()} in ${years} years (a ${lossPct}% drop).`,
  };
}

export function calculateTaxDrag(input: TaxDragInput): TaxDragResult {
  const { startingAmount = 50000, annualReturnPct = 8.0, taxRatePct = 20.0, years = 10 } = input;

  const preTaxEndBalance = Math.round(startingAmount * Math.pow(1 + annualReturnPct / 100, years));
  const netReturnPct = annualReturnPct * (1 - taxRatePct / 100);
  const postTaxEndBalance = Math.round(startingAmount * Math.pow(1 + netReturnPct / 100, years));
  const taxDragAmount = preTaxEndBalance - postTaxEndBalance;

  return {
    preTaxEndBalance,
    postTaxEndBalance,
    taxDragAmount,
  };
}

export function calculateMilestone(input: MilestoneInput): MilestoneResult {
  const { pv = 10000, pmt = 500, iy = 7.0, targetAmount = 100000 } = input;

  const res = calculateTVM({
    mode: "N",
    n: 10,
    iy,
    pv,
    pmt: -pmt,
    py: 12,
    cy: 12,
    pmtTiming: "end",
    inflationRate: 2.5,
    taxRate: 0,
    currencySymbol: "$",
  });

  const totalMonths = Math.max(0, Math.round(res.solvedValue));
  const yearsToTarget = Number((totalMonths / 12).toFixed(1));

  return {
    yearsToTarget,
    monthsToTarget: totalMonths,
    explanation: `At $${pmt}/mo contribution and ${iy}% annual return, reaching $${targetAmount.toLocaleString()} will take approximately ${yearsToTarget} years (${totalMonths} months).`,
  };
}

export function calculateScenario(input: ScenarioInput): ScenarioResult {
  const { pv = 10000, pmt = -500, n = 120, rateA = 7.0, rateB = 9.0 } = input;

  const resA = calculateTVM({ mode: "FV", n, iy: rateA, pv, pmt, py: 12, cy: 12, pmtTiming: "end", inflationRate: 0, taxRate: 0, currencySymbol: "$" });
  const resB = calculateTVM({ mode: "FV", n, iy: rateB, pv, pmt, py: 12, cy: 12, pmtTiming: "end", inflationRate: 0, taxRate: 0, currencySymbol: "$" });

  const diff = Math.round(Math.abs(resB.fv - resA.fv));
  const winner = resB.fv > resA.fv ? `Scenario B (${rateB}%)` : `Scenario A (${rateA}%)`;

  return {
    fvScenarioA: Math.round(Math.abs(resA.fv)),
    fvScenarioB: Math.round(Math.abs(resB.fv)),
    difference: diff,
    winner,
  };
}

export function calculateFinanceCalculator(inputs: Record<string, any>): Record<string, any> {
  const mode = (inputs.mode as TVMMode) || "FV";
  const res = calculateTVM({
    mode,
    n: parseFloat(inputs.n) || 10,
    iy: parseFloat(inputs.iy) || 6,
    pv: parseFloat(inputs.pv) || 20000,
    pmt: parseFloat(inputs.pmt) || -2000,
    py: parseFloat(inputs.py) || 1,
    cy: parseFloat(inputs.cy) || 1,
    pmtTiming: inputs.pmtTiming === "beginning" ? "beginning" : "end",
    inflationRate: parseFloat(inputs.inflationRate) || 2.5,
    taxRate: parseFloat(inputs.taxRate) || 0,
    currencySymbol: "$",
  });

  return {
    solvedVariable: res.solvedVariable,
    solvedValue: res.solvedValue,
    fv: `$${res.fv.toLocaleString()}`,
    pv: `$${res.pv.toLocaleString()}`,
    pmt: `$${res.pmt.toLocaleString()}`,
    totalInterest: `$${res.totalInterest.toLocaleString()}`,
  };
}
