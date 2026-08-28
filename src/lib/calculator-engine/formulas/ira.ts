/**
 * Precision IRA Multi-Account Math Engine
 * Compares 4 Account Paths Side-by-Side:
 * 1. Traditional / SEP / SIMPLE IRA (Pre-tax contribution, tax-deferred compounding, taxed at retirement tax rate)
 * 2. Traditional / SEP / SIMPLE IRA (After-tax value in retirement)
 * 3. Roth IRA (After-tax contribution, tax-free compounding, 100% tax-free retirement withdrawal)
 * 4. Regular Taxable Savings (After-tax contribution, annual tax drag on returns, no tax on withdrawal)
 * Includes 2025/2026 IRS contribution cap enforcement, catch-up rules, compensation limits, and Age-by-Age Schedule generation.
 */

export interface IraInput {
  currentBalance?: number;
  annualContribution?: number; // Before-tax annual contribution
  investmentReturn?: number; // %/yr
  currentAge?: number;
  retirementAge?: number;
  currentTaxRate?: number; // % marginal tax rate now
  retirementTaxRate?: number; // % expected tax rate in retirement
  taxYear?: 2025 | 2026 | number;
  taxableCompensation?: number; // Earned income limitation
}

export interface AgeScheduleIraRow {
  age: number;
  year: number;
  traditionalPreTaxStart: number;
  traditionalPreTaxEnd: number;
  traditionalPostTaxStart: number;
  traditionalPostTaxEnd: number;
  rothStart: number;
  rothEnd: number;
  taxableStart: number;
  taxableEnd: number;
  principalContributed: number;
}

export interface IraResult {
  currentAge: number;
  retirementAge: number;
  yearsToRetirement: number;
  taxYear: number;

  // Traditional Pre-Tax & Post-Tax Balances at Retirement
  traditionalPreTaxBalance: number;
  traditionalPostTaxBalance: number;

  // Roth IRA Balance at Retirement
  rothBalance: number;

  // Regular Taxable Savings Balance at Retirement
  taxableBalance: number;

  // Principal Invested
  totalPrincipalInvested: number;

  // Comparison Advantages
  traditionalVsRothDiff: number;
  rothVsTaxableDiff: number;
  traditionalVsTaxableDiff: number;

  // Limits & Validation
  annualContributionLimit: number;
  isCatchUpEligible: boolean;
  exceedsLimitWarning: string | null;
  exceedsCompensationWarning: string | null;

  recommendation: string;
  schedule: AgeScheduleIraRow[];
}

/**
 * Official IRS Contribution Limits for 2025 and 2026
 */
export const IRA_2025_BASE_CAP = 7000;
export const IRA_2025_CATCHUP = 1000;
export const IRA_2025_TOTAL_CATCHUP_CAP = 8000; // Age 50+

export const IRA_2026_BASE_CAP = 7500;
export const IRA_2026_CATCHUP = 1100;
export const IRA_2026_TOTAL_CATCHUP_CAP = 8600; // Age 50+

export const SEP_IRA_2025_MAX = 70000;
export const SEP_IRA_2026_MAX = 72000; // 25% of compensation or $72,000 max for 2026
export const SIMPLE_IRA_2025_BASE = 16500;
export const SIMPLE_IRA_2026_BASE = 17000; // $17,000 base in 2026
export const SIMPLE_IRA_2026_CATCHUP = 3500; // $20,500 total age 50+ in 2026

export function getIraContributionLimit(taxYear: number, age: number): { baseCap: number; catchUp: number; totalCap: number } {
  if (taxYear === 2025) {
    const isCatchUp = age >= 50;
    return {
      baseCap: IRA_2025_BASE_CAP,
      catchUp: IRA_2025_CATCHUP,
      totalCap: isCatchUp ? IRA_2025_TOTAL_CATCHUP_CAP : IRA_2025_BASE_CAP,
    };
  }
  // Default 2026
  const isCatchUp = age >= 50;
  return {
    baseCap: IRA_2026_BASE_CAP,
    catchUp: IRA_2026_CATCHUP,
    totalCap: isCatchUp ? IRA_2026_TOTAL_CATCHUP_CAP : IRA_2026_BASE_CAP,
  };
}

export function calculateIra(input: IraInput): IraResult {
  const currentAge = input.currentAge !== undefined && !isNaN(Number(input.currentAge))
    ? Math.max(0, Math.min(100, Number(input.currentAge)))
    : 30;

  const rawRetirementAge = input.retirementAge !== undefined && !isNaN(Number(input.retirementAge))
    ? Number(input.retirementAge)
    : 65;

  const retirementAge = Math.max(currentAge + 1, Math.min(100, rawRetirementAge));
  const yearsToRetirement = retirementAge - currentAge;

  const currentBalance = input.currentBalance !== undefined && !isNaN(Number(input.currentBalance))
    ? Math.max(0, Number(input.currentBalance))
    : 30000;

  const annualContrib = input.annualContribution !== undefined && !isNaN(Number(input.annualContribution))
    ? Math.max(0, Number(input.annualContribution))
    : 7500;

  const r = input.investmentReturn !== undefined && !isNaN(Number(input.investmentReturn))
    ? Math.max(0, Number(input.investmentReturn)) / 100
    : 0.06;

  const currentTax = input.currentTaxRate !== undefined && !isNaN(Number(input.currentTaxRate))
    ? Math.max(0, Math.min(100, Number(input.currentTaxRate))) / 100
    : 0.25;

  const retirementTax = input.retirementTaxRate !== undefined && !isNaN(Number(input.retirementTaxRate))
    ? Math.max(0, Math.min(100, Number(input.retirementTaxRate))) / 100
    : 0.15;

  const taxYear = input.taxYear === 2025 ? 2025 : 2026;
  const limits = getIraContributionLimit(taxYear, currentAge);
  const isCatchUpEligible = currentAge >= 50;

  let exceedsLimitWarning: string | null = null;
  if (annualContrib > limits.totalCap) {
    exceedsLimitWarning = `Contributions ($${annualContrib.toLocaleString()}) exceed the ${taxYear} IRS statutory IRA limit ($${limits.totalCap.toLocaleString()}${isCatchUpEligible ? " including age 50+ catch-up" : " for under age 50"}). Standard IRAs cap contributions at this limit across all accounts.`;
  }

  let exceedsCompensationWarning: string | null = null;
  if (input.taxableCompensation !== undefined && !isNaN(Number(input.taxableCompensation))) {
    const comp = Math.max(0, Number(input.taxableCompensation));
    if (annualContrib > comp) {
      exceedsCompensationWarning = `Contributions ($${annualContrib.toLocaleString()}) exceed your entered taxable compensation ($${comp.toLocaleString()}). The IRS restricts annual IRA contributions to taxable earned compensation.`;
    }
  }

  // 1. Traditional IRA (Pre-tax contribution, annuity-due beginning of year compounding)
  let tradPreBal = currentBalance;

  // 2. Roth IRA (After-tax funding, tax-free compounding)
  let rothBal = currentBalance * (1 - currentTax);
  const rothAnnualContrib = annualContrib * (1 - currentTax);

  // 3. Regular Taxable Savings (After-tax funding + annual tax drag on investment growth)
  let taxableBal = currentBalance * (1 - currentTax);
  const taxableAnnualContrib = annualContrib * (1 - currentTax);
  const taxableAfterTaxReturn = r * (1 - currentTax);

  let cumPrincipal = currentBalance;
  const schedule: AgeScheduleIraRow[] = [];
  const startYear = 2026;

  for (let y = 1; y <= yearsToRetirement; y++) {
    const age = currentAge + y - 1;
    const year = startYear + y - 1;

    // Traditional IRA Pre-tax
    const tradPreStart = tradPreBal;
    tradPreBal = (tradPreStart + annualContrib) * (1 + r);
    const tradPreEnd = tradPreBal;

    // Traditional IRA Post-tax
    const tradPostStart = tradPreStart * (1 - retirementTax);
    const tradPostEnd = tradPreEnd * (1 - retirementTax);

    // Roth IRA (Tax-free growth)
    const rothStart = rothBal;
    rothBal = (rothStart + rothAnnualContrib) * (1 + r);
    const rothEnd = rothBal;

    // Taxable Savings (After-tax return drag)
    const taxableStart = taxableBal;
    taxableBal = (taxableStart + taxableAnnualContrib) * (1 + taxableAfterTaxReturn);
    const taxableEnd = taxableBal;

    cumPrincipal += annualContrib;

    schedule.push({
      age,
      year,
      traditionalPreTaxStart: Number(tradPreStart.toFixed(2)),
      traditionalPreTaxEnd: Number(tradPreEnd.toFixed(2)),
      traditionalPostTaxStart: Number(tradPostStart.toFixed(2)),
      traditionalPostTaxEnd: Number(tradPostEnd.toFixed(2)),
      rothStart: Number(rothStart.toFixed(2)),
      rothEnd: Number(rothEnd.toFixed(2)),
      taxableStart: Number(taxableStart.toFixed(2)),
      taxableEnd: Number(taxableEnd.toFixed(2)),
      principalContributed: Number(cumPrincipal.toFixed(2)),
    });
  }

  const traditionalPreTaxBalance = tradPreBal;
  const traditionalPostTaxBalance = traditionalPreTaxBalance * (1 - retirementTax);
  const rothBalance = rothBal;
  const taxableBalance = taxableBal;

  const traditionalVsRothDiff = traditionalPostTaxBalance - rothBalance;
  const rothVsTaxableDiff = rothBalance - taxableBalance;
  const traditionalVsTaxableDiff = traditionalPostTaxBalance - taxableBalance;

  let rec = "";
  if (currentTax > retirementTax) {
    rec = `TRADITIONAL IRA OPTIMAL: Because your current marginal tax rate (${(currentTax * 100).toFixed(0)}%) is higher than your expected retirement tax rate (${(retirementTax * 100).toFixed(0)}%), a Traditional IRA will yield $${Math.abs(traditionalVsRothDiff).toLocaleString("en-US", { maximumFractionDigits: 0 })} more after-tax wealth than a Roth IRA at age ${retirementAge}.`;
  } else if (retirementTax > currentTax) {
    rec = `ROTH IRA OPTIMAL: Because your expected retirement tax rate (${(retirementTax * 100).toFixed(0)}%) is higher than your current tax rate (${(currentTax * 100).toFixed(0)}%), a Roth IRA will yield $${Math.abs(traditionalVsRothDiff).toLocaleString("en-US", { maximumFractionDigits: 0 })} more tax-free wealth than a Traditional IRA at age ${retirementAge}.`;
  } else {
    rec = `BALANCED BENEFIT: At identical current and retirement tax rates (${(currentTax * 100).toFixed(0)}%), Traditional and Roth IRAs provide equivalent after-tax balances of $${rothBalance.toLocaleString("en-US", { maximumFractionDigits: 0 })}, both outperforming taxable savings by $${rothVsTaxableDiff.toLocaleString("en-US", { maximumFractionDigits: 0 })}. Roth IRA offers the additional advantage of no Required Minimum Distributions (RMDs) during your lifetime.`;
  }

  return {
    currentAge,
    retirementAge,
    yearsToRetirement,
    taxYear,
    traditionalPreTaxBalance: Number(traditionalPreTaxBalance.toFixed(2)),
    traditionalPostTaxBalance: Number(traditionalPostTaxBalance.toFixed(2)),
    rothBalance: Number(rothBalance.toFixed(2)),
    taxableBalance: Number(taxableBalance.toFixed(2)),
    totalPrincipalInvested: Number(cumPrincipal.toFixed(2)),
    traditionalVsRothDiff: Number(traditionalVsRothDiff.toFixed(2)),
    rothVsTaxableDiff: Number(rothVsTaxableDiff.toFixed(2)),
    traditionalVsTaxableDiff: Number(traditionalVsTaxableDiff.toFixed(2)),
    annualContributionLimit: limits.totalCap,
    isCatchUpEligible,
    exceedsLimitWarning,
    exceedsCompensationWarning,
    recommendation: rec,
    schedule,
  };
}
