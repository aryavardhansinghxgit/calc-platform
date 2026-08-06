/**
 * Shared Financial Mathematics Utilities.
 * Implements PMT, NPV, IRR, APR to EAR, PV, FV, and loan schedule algorithms.
 */

export interface LoanSchedulePeriod {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

/**
 * PMT - Calculates periodic loan payment amount.
 * @param rate Periodic interest rate (e.g. annual rate / 12)
 * @param nper Total number of payment periods (e.g. years * 12)
 * @param pv Present value (loan principal)
 * @param fv Future value (defaults to 0)
 * @param type 0 = payment at end of period, 1 = payment at start of period
 */
export function PMT(rate: number, nper: number, pv: number, fv: number = 0, type: number = 0): number {
  if (rate === 0) return -(pv + fv) / nper;
  const pvif = Math.pow(1 + rate, nper);
  let pmt = (rate * (pv * pvif + fv)) / (pvif - 1);
  if (type === 1) {
    pmt /= 1 + rate;
  }
  return pmt;
}

/**
 * Future Value (FV)
 */
export function FutureValue(pv: number, rate: number, nper: number): number {
  return pv * Math.pow(1 + rate, nper);
}

/**
 * Present Value (PV)
 */
export function PresentValue(fv: number, rate: number, nper: number): number {
  return fv / Math.pow(1 + rate, nper);
}

/**
 * Converts nominal APR to Effective Annual Rate (EAR)
 */
export function APRToEffectiveRate(apr: number, compoundingPeriodsPerYear: number): number {
  const r = apr / 100;
  const ear = Math.pow(1 + r / compoundingPeriodsPerYear, compoundingPeriodsPerYear) - 1;
  return ear * 100;
}

/**
 * Net Present Value (NPV)
 */
export function NPV(discountRate: number, cashflows: number[]): number {
  const rate = discountRate / 100;
  return cashflows.reduce((acc, cf, i) => acc + cf / Math.pow(1 + rate, i), 0);
}

/**
 * Internal Rate of Return (IRR) using Newton-Raphson iteration method.
 */
export function IRR(cashflows: number[], guess: number = 0.1): number {
  const maxIterations = 100;
  const precision = 1e-7;
  let rate = guess;

  for (let iter = 0; iter < maxIterations; iter++) {
    let npvValue = 0;
    let derivativeValue = 0;

    for (let i = 0; i < cashflows.length; i++) {
      npvValue += cashflows[i] / Math.pow(1 + rate, i);
      derivativeValue -= (i * cashflows[i]) / Math.pow(1 + rate, i + 1);
    }

    const newRate = rate - npvValue / derivativeValue;
    if (Math.abs(newRate - rate) < precision) {
      return newRate * 100;
    }
    rate = newRate;
  }

  return rate * 100;
}

/**
 * Calculates complete loan amortization schedule.
 */
export function CalculateLoanSchedule(
  principal: number,
  annualInterestRate: number,
  tenureMonths: number
): LoanSchedulePeriod[] {
  const monthlyRate = annualInterestRate / 100 / 12;
  const monthlyPayment = PMT(monthlyRate, tenureMonths, principal);

  const schedule: LoanSchedulePeriod[] = [];
  let balance = principal;

  for (let month = 1; month <= tenureMonths; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = Math.min(monthlyPayment - interest, balance);
    balance = Math.max(0, balance - principalPaid);

    schedule.push({
      period: month,
      payment: monthlyPayment,
      principal: principalPaid,
      interest: interest,
      remainingBalance: balance,
    });
  }

  return schedule;
}
