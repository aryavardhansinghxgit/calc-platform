/**
 * Repayment Calculator & Multi-Compounding Debt Elimination Mathematical Engine
 */

export type CompoundingFrequency =
  | "annually"
  | "semiannually"
  | "quarterly"
  | "monthly"
  | "semimonthly"
  | "biweekly"
  | "weekly"
  | "daily"
  | "continuously";

export type RepaymentFrequency =
  | "daily"
  | "weekly"
  | "biweekly"
  | "semimonthly"
  | "monthly"
  | "quarterly"
  | "semiannually"
  | "annually";

export interface RepaymentAmortizationRow {
  period: number;
  yearNumber: number;
  startingBalance: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

export interface RepaymentCalculationParams {
  loanBalance: number;
  interestRatePct: number; // e.g. 8 for 8%
  compoundingFrequency: CompoundingFrequency;
  paymentFrequency: RepaymentFrequency;
  mode: "term" | "installment"; // term = Mode A (Fixed Term), installment = Mode B (Fixed Installment)
  targetYears?: number;
  targetMonths?: number;
  fixedInstallmentAmount?: number;
  extraPaymentPerPeriod?: number;
  annualLumpSum?: number;
  oneTimeLumpSum?: number;
  oneTimeLumpSumPeriod?: number;
}

export interface RepaymentCalculationResult {
  installmentPayment: number;
  totalPeriods: number;
  totalYears: number;
  totalMonths: number;
  totalDays: number;
  totalAmountRepaid: number;
  totalInterestPaid: number;
  interestToPrincipalRatio: number;
  payoffDate: string;
  isNeverEnding: boolean;
  warningMessage?: string;
  schedule: RepaymentAmortizationRow[];
  annualSummary: {
    year: number;
    principalPaid: number;
    interestPaid: number;
    endingBalance: number;
  }[];
  prepaymentSavings?: {
    interestSaved: number;
    periodsSaved: number;
    monthsSaved: number;
  };
}

export const COMPOUNDING_PERIODS_PER_YEAR: Record<CompoundingFrequency, number> = {
  annually: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  semimonthly: 24,
  biweekly: 26,
  weekly: 52,
  daily: 365,
  continuously: Infinity,
};

export const PAYMENT_PERIODS_PER_YEAR: Record<RepaymentFrequency, number> = {
  daily: 365,
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
  quarterly: 4,
  semiannually: 2,
  annually: 1,
};

/**
 * Calculates the effective periodic interest rate i given nominal annual rate r,
 * compounding frequency m per year, and payment frequency k per year.
 */
export function calculateEffectivePeriodicRate(
  nominalRateAnnual: number,
  compounding: CompoundingFrequency,
  repaymentFreq: RepaymentFrequency
): number {
  const r = nominalRateAnnual / 100;
  const k = PAYMENT_PERIODS_PER_YEAR[repaymentFreq];

  if (r <= 0) return 0;

  if (compounding === "continuously") {
    // Continuous compounding: i = e^(r/k) - 1
    return Math.exp(r / k) - 1;
  }

  const m = COMPOUNDING_PERIODS_PER_YEAR[compounding];

  if (m === k) {
    // Simple match: i = r / k
    return r / k;
  }

  // Discrete mismatched compounding: i = (1 + r/m)^(m/k) - 1
  return Math.pow(1 + r / m, m / k) - 1;
}

/**
 * Core Universal Repayment Engine
 */
export function calculateRepayment(params: RepaymentCalculationParams): RepaymentCalculationResult {
  const P = Math.max(0, params.loanBalance);
  const rNominal = Math.max(0, params.interestRatePct);
  const k = PAYMENT_PERIODS_PER_YEAR[params.paymentFrequency];
  const i = calculateEffectivePeriodicRate(rNominal, params.compoundingFrequency, params.paymentFrequency);

  const extraPerPeriod = Math.max(0, params.extraPaymentPerPeriod || 0);
  const annualLump = Math.max(0, params.annualLumpSum || 0);
  const oneTimeLump = Math.max(0, params.oneTimeLumpSum || 0);
  const oneTimePeriod = Math.max(1, params.oneTimeLumpSumPeriod || 1);

  if (P === 0) {
    return {
      installmentPayment: 0,
      totalPeriods: 0,
      totalYears: 0,
      totalMonths: 0,
      totalDays: 0,
      totalAmountRepaid: 0,
      totalInterestPaid: 0,
      interestToPrincipalRatio: 0,
      payoffDate: "Immediately",
      isNeverEnding: false,
      schedule: [],
      annualSummary: [],
    };
  }

  let requiredPayment = 0;
  let targetTotalPeriods = 0;

  if (params.mode === "term") {
    const years = Math.max(0, params.targetYears || 0);
    const months = Math.max(0, params.targetMonths || 0);
    targetTotalPeriods = Math.round(years * k + (months / 12) * k);

    if (targetTotalPeriods <= 0) targetTotalPeriods = 1;

    if (i === 0) {
      requiredPayment = P / targetTotalPeriods;
    } else {
      // Standard PMT = P * [i(1+i)^n] / [(1+i)^n - 1]
      const factor = Math.pow(1 + i, targetTotalPeriods);
      requiredPayment = (P * (i * factor)) / (factor - 1);
    }
  } else {
    // Mode B: Fixed installment
    requiredPayment = Math.max(0, params.fixedInstallmentAmount || 0);
    const minInterestPerPeriod = P * i;

    // Check for negative amortization or infinite term
    if (requiredPayment + extraPerPeriod <= minInterestPerPeriod) {
      return {
        installmentPayment: requiredPayment,
        totalPeriods: Infinity,
        totalYears: Infinity,
        totalMonths: Infinity,
        totalDays: Infinity,
        totalAmountRepaid: Infinity,
        totalInterestPaid: Infinity,
        interestToPrincipalRatio: Infinity,
        payoffDate: "Never (Interest Trap)",
        isNeverEnding: true,
        warningMessage: `Negative Amortization Warning: Your periodic payment (${requiredPayment.toFixed(2)}) is less than or equal to the periodic interest charge (${minInterestPerPeriod.toFixed(2)}). The debt will increase indefinitely.`,
        schedule: [],
        annualSummary: [],
      };
    }

    if (i === 0) {
      targetTotalPeriods = Math.ceil(P / (requiredPayment + extraPerPeriod));
    } else {
      // Logarithmic solve: n = -ln(1 - (P * i)/PMT) / ln(1 + i)
      const totalPmt = requiredPayment + extraPerPeriod;
      targetTotalPeriods = Math.ceil(-Math.log(1 - (P * i) / totalPmt) / Math.log(1 + i));
    }
  }

  // Generate Amortization Schedule with Extra Prepayments
  let currentBalance = P;
  let periodCount = 0;
  let cumulativeInterest = 0;
  let cumulativePrincipal = 0;
  const schedule: RepaymentAmortizationRow[] = [];
  const maxPeriods = 1200; // 100-year safety ceiling

  while (currentBalance > 0.005 && periodCount < maxPeriods) {
    periodCount++;
    const startingBal = currentBalance;
    const interestCharge = startingBal * i;

    let plannedPayment = requiredPayment + extraPerPeriod;

    // Annual lump sum check
    if (annualLump > 0 && periodCount % k === 0) {
      plannedPayment += annualLump;
    }

    // One-time lump sum check
    if (oneTimeLump > 0 && periodCount === oneTimePeriod) {
      plannedPayment += oneTimeLump;
    }

    let principalCharge = plannedPayment - interestCharge;
    let actualPayment = plannedPayment;

    if (startingBal + interestCharge <= plannedPayment) {
      // Final payoff period
      actualPayment = startingBal + interestCharge;
      principalCharge = startingBal;
      currentBalance = 0;
    } else {
      currentBalance = startingBal - principalCharge;
    }

    cumulativeInterest += interestCharge;
    cumulativePrincipal += principalCharge;

    const yearNum = Math.ceil(periodCount / k);

    schedule.push({
      period: periodCount,
      yearNumber: yearNum,
      startingBalance: startingBal,
      payment: actualPayment,
      principalPaid: principalCharge,
      interestPaid: interestCharge,
      endingBalance: Math.max(0, currentBalance),
      cumulativeInterest,
      cumulativePrincipal,
    });
  }

  // Calculate annual summaries
  const annualSummary: RepaymentCalculationResult["annualSummary"] = [];
  let currentYear = 1;
  let yrPrincipal = 0;
  let yrInterest = 0;
  let yrEndBal = 0;

  schedule.forEach((row, idx) => {
    yrPrincipal += row.principalPaid;
    yrInterest += row.interestPaid;
    yrEndBal = row.endingBalance;

    const isYearEnd = row.period % k === 0 || idx === schedule.length - 1;
    if (isYearEnd) {
      annualSummary.push({
        year: row.yearNumber,
        principalPaid: yrPrincipal,
        interestPaid: yrInterest,
        endingBalance: yrEndBal,
      });
      yrPrincipal = 0;
      yrInterest = 0;
      currentYear++;
    }
  });

  const totalYears = Math.floor(periodCount / k);
  const remainingPeriods = periodCount % k;
  const totalMonths = Math.floor((periodCount / k) * 12);
  const totalDays = Math.round((periodCount / k) * 365);

  const now = new Date();
  const payoffTargetDate = new Date(now.getTime() + (periodCount / k) * 365.25 * 24 * 60 * 60 * 1000);
  const payoffDate = payoffTargetDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const totalAmountRepaid = cumulativePrincipal + cumulativeInterest;
  const interestToPrincipalRatio = P > 0 ? (cumulativeInterest / P) * 100 : 0;

  return {
    installmentPayment: requiredPayment,
    totalPeriods: periodCount,
    totalYears,
    totalMonths,
    totalDays,
    totalAmountRepaid,
    totalInterestPaid: cumulativeInterest,
    interestToPrincipalRatio,
    payoffDate,
    isNeverEnding: false,
    schedule,
    annualSummary,
  };
}

/**
 * 2. Bi-Weekly Accelerated Repayment Optimizer Engine
 */
export interface BiWeeklyRepaymentResult {
  monthlyPayment: number;
  biWeeklyPayment: number;
  monthlyTotalInterest: number;
  biWeeklyTotalInterest: number;
  monthlyPayoffMonths: number;
  biWeeklyPayoffMonths: number;
  interestSaved: number;
  monthsSaved: number;
  yearsSaved: string;
}

export function calculateAcceleratedBiWeeklyRepayment(
  loanBalance: number,
  interestRatePct: number,
  termYears: number
): BiWeeklyRepaymentResult {
  const P = Math.max(0, loanBalance);
  const r = Math.max(0, interestRatePct) / 100;
  const iMonthly = r / 12;
  const totalMonths = Math.max(1, termYears * 12);

  // Standard Monthly PMT
  let monthlyPMT = 0;
  if (iMonthly === 0) {
    monthlyPMT = P / totalMonths;
  } else {
    const f = Math.pow(1 + iMonthly, totalMonths);
    monthlyPMT = (P * (iMonthly * f)) / (f - 1);
  }

  // Standard schedule calculation
  const standardRes = calculateRepayment({
    loanBalance: P,
    interestRatePct,
    compoundingFrequency: "monthly",
    paymentFrequency: "monthly",
    mode: "term",
    targetYears: termYears,
    targetMonths: 0,
  });

  // Accelerated Bi-Weekly payment = Half of monthly payment paid every 2 weeks (26 times/year)
  const biWeeklyPMT = monthlyPMT / 2;

  const biWeeklyRes = calculateRepayment({
    loanBalance: P,
    interestRatePct,
    compoundingFrequency: "monthly",
    paymentFrequency: "biweekly",
    mode: "installment",
    fixedInstallmentAmount: biWeeklyPMT,
  });

  const interestSaved = Math.max(0, standardRes.totalInterestPaid - biWeeklyRes.totalInterestPaid);
  const monthsSaved = Math.max(0, standardRes.totalMonths - biWeeklyRes.totalMonths);
  const yearsSaved = (monthsSaved / 12).toFixed(1);

  return {
    monthlyPayment: monthlyPMT,
    biWeeklyPayment: biWeeklyPMT,
    monthlyTotalInterest: standardRes.totalInterestPaid,
    biWeeklyTotalInterest: biWeeklyRes.totalInterestPaid,
    monthlyPayoffMonths: standardRes.totalMonths,
    biWeeklyPayoffMonths: biWeeklyRes.totalMonths,
    interestSaved,
    monthsSaved,
    yearsSaved,
  };
}

/**
 * 3. Multi-Debt Consolidation Repayment Engine
 */
export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  interestRatePct: number;
  monthlyPayment: number;
}

export interface DebtConsolidationResult {
  totalCurrentBalance: number;
  totalCurrentMonthlyPayment: number;
  totalCurrentInterestPaid: number;
  maxCurrentPayoffMonths: number;
  consolidatedMonthlyPayment: number;
  consolidatedTotalInterestPaid: number;
  consolidatedPayoffMonths: number;
  monthlyPaymentSavings: number;
  totalInterestSavings: number;
  monthsSaved: number;
}

export function calculateMultiDebtConsolidation(
  debts: DebtItem[],
  consolidationAprPct: number,
  consolidationTermYears: number
): DebtConsolidationResult {
  let totalBal = 0;
  let totalMonthly = 0;
  let totalCurrentInterest = 0;
  let maxMonths = 0;

  debts.forEach((debt) => {
    totalBal += debt.balance;
    totalMonthly += debt.monthlyPayment;
    const res = calculateRepayment({
      loanBalance: debt.balance,
      interestRatePct: debt.interestRatePct,
      compoundingFrequency: "monthly",
      paymentFrequency: "monthly",
      mode: "installment",
      fixedInstallmentAmount: debt.monthlyPayment,
    });
    if (!res.isNeverEnding) {
      totalCurrentInterest += res.totalInterestPaid;
      if (res.totalMonths > maxMonths) maxMonths = res.totalMonths;
    }
  });

  const consRes = calculateRepayment({
    loanBalance: totalBal,
    interestRatePct: consolidationAprPct,
    compoundingFrequency: "monthly",
    paymentFrequency: "monthly",
    mode: "term",
    targetYears: consolidationTermYears,
    targetMonths: 0,
  });

  return {
    totalCurrentBalance: totalBal,
    totalCurrentMonthlyPayment: totalMonthly,
    totalCurrentInterestPaid: totalCurrentInterest,
    maxCurrentPayoffMonths: maxMonths,
    consolidatedMonthlyPayment: consRes.installmentPayment,
    consolidatedTotalInterestPaid: consRes.totalInterestPaid,
    consolidatedPayoffMonths: consRes.totalMonths,
    monthlyPaymentSavings: totalMonthly - consRes.installmentPayment,
    totalInterestSavings: Math.max(0, totalCurrentInterest - consRes.totalInterestPaid),
    monthsSaved: Math.max(0, maxMonths - consRes.totalMonths),
  };
}

/**
 * 4. Inflation-Adjusted Debt Purchasing Power Engine
 */
export interface InflationAdjustedResult {
  nominalTotalPaid: number;
  realPresentValuePaid: number;
  inflationSavingsAmount: number;
  inflationDiscountPct: number;
}

export function calculateInflationAdjustedCost(
  loanBalance: number,
  interestRatePct: number,
  termYears: number,
  inflationRatePct: number
): InflationAdjustedResult {
  const base = calculateRepayment({
    loanBalance,
    interestRatePct,
    compoundingFrequency: "monthly",
    paymentFrequency: "monthly",
    mode: "term",
    targetYears: termYears,
    targetMonths: 0,
  });

  const pmt = base.installmentPayment;
  const iInfMonthly = Math.max(0, inflationRatePct) / 100 / 12;

  let realPV = 0;
  for (let m = 1; m <= base.totalMonths; m++) {
    realPV += pmt / Math.pow(1 + iInfMonthly, m);
  }

  const nominalTotal = base.totalAmountRepaid;
  const inflationSavings = Math.max(0, nominalTotal - realPV);
  const discountPct = nominalTotal > 0 ? (inflationSavings / nominalTotal) * 100 : 0;

  return {
    nominalTotalPaid: nominalTotal,
    realPresentValuePaid: realPV,
    inflationSavingsAmount: inflationSavings,
    inflationDiscountPct: discountPct,
  };
}

/**
 * 5. Reverse Loan Affordability & Budget Solver Engine
 */
export interface LoanAffordabilityResult {
  maxBorrowablePrincipal: number;
  totalRepaid: number;
  totalInterestPaid: number;
  monthlyPayment: number;
}

export function calculateLoanAffordability(
  monthlyBudget: number,
  interestRatePct: number,
  termYears: number
): LoanAffordabilityResult {
  const pmt = Math.max(0, monthlyBudget);
  const r = Math.max(0, interestRatePct) / 100;
  const i = r / 12;
  const n = Math.max(1, termYears * 12);

  let maxP = 0;
  if (i === 0) {
    maxP = pmt * n;
  } else {
    // P = PMT * [(1+i)^n - 1] / [i(1+i)^n]
    const factor = Math.pow(1 + i, n);
    maxP = (pmt * (factor - 1)) / (i * factor);
  }

  const totalRepaid = pmt * n;
  const totalInterest = Math.max(0, totalRepaid - maxP);

  return {
    maxBorrowablePrincipal: maxP,
    totalRepaid,
    totalInterestPaid: totalInterest,
    monthlyPayment: pmt,
  };
}

/**
 * 6. Debt Payoff Velocity Comparator (Snowball vs Avalanche)
 */
export interface DebtVelocityResult {
  avalancheMonths: number;
  avalancheInterest: number;
  snowballMonths: number;
  snowballInterest: number;
  avalancheInterestSaved: number;
  avalancheMonthsSaved: number;
}

export function calculateDebtPayoffVelocity(
  debts: DebtItem[],
  extraMonthlyBudget: number
): DebtVelocityResult {
  const totalMinPmt = debts.reduce((s, d) => s + d.monthlyPayment, 0);
  const totalBudget = totalMinPmt + Math.max(0, extraMonthlyBudget);

  const simulateStrategy = (orderType: "avalanche" | "snowball") => {
    let currentDebts = debts.map((d) => ({
      ...d,
      currentBal: d.balance,
    }));

    let months = 0;
    let totalInterest = 0;

    while (currentDebts.some((d) => d.currentBal > 0.01) && months < 600) {
      months++;
      let unallocatedBudget = totalBudget;

      // 1. Accrue interest & pay minimums
      currentDebts.forEach((d) => {
        if (d.currentBal > 0) {
          const interest = d.currentBal * (d.interestRatePct / 100 / 12);
          totalInterest += interest;
          d.currentBal += interest;

          const pmt = Math.min(d.currentBal, d.monthlyPayment);
          d.currentBal -= pmt;
          unallocatedBudget -= pmt;
        }
      });

      // 2. Sort remaining debts according to strategy
      const activeDebts = currentDebts.filter((d) => d.currentBal > 0.01);
      if (orderType === "avalanche") {
        activeDebts.sort((a, b) => b.interestRatePct - a.interestRatePct);
      } else {
        activeDebts.sort((a, b) => a.currentBal - b.currentBal);
      }

      // 3. Dump remaining unallocated budget into top target
      for (const target of activeDebts) {
        if (unallocatedBudget <= 0) break;
        const extraPmt = Math.min(target.currentBal, unallocatedBudget);
        target.currentBal -= extraPmt;
        unallocatedBudget -= extraPmt;
      }
    }

    return { months, totalInterest };
  };

  const avalanche = simulateStrategy("avalanche");
  const snowball = simulateStrategy("snowball");

  return {
    avalancheMonths: avalanche.months,
    avalancheInterest: avalanche.totalInterest,
    snowballMonths: snowball.months,
    snowballInterest: snowball.totalInterest,
    avalancheInterestSaved: Math.max(0, snowball.totalInterest - avalanche.totalInterest),
    avalancheMonthsSaved: Math.max(0, snowball.months - avalanche.months),
  };
}
