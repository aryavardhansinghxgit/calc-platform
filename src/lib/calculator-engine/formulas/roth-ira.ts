/**
 * Dedicated Precision Roth IRA Engine
 * Compares Roth IRA vs. Regular Taxable Account Side-by-Side:
 * 1. Roth IRA: After-tax contributions, tax-free compounding, 100% tax-free withdrawals in retirement.
 * 2. Taxable Account: After-tax contributions, annual tax drag on returns, tax on accumulated gains.
 * Includes "Maximize Contributions" toggle and Backdoor Roth conversion analysis.
 */

export interface RothIraInput {
  currentBalance: number;
  annualContribution: number;
  maximizeContributions?: boolean;
  investmentReturn: number; // %/yr
  currentAge: number;
  retirementAge: number;
  marginalTaxRate: number; // % marginal tax rate
}

export interface BackdoorRothInput {
  traditionalIraBalance: number;
  conversionAmount: number;
  currentTaxRate: number; // %
  yearsToRetirement: number;
  investmentReturn: number; // %
}

export interface AnnualScheduleRothRow {
  age: number;
  year: number;
  principalStart: number;
  principalEnd: number;
  rothStart: number;
  rothEnd: number;
  taxableStart: number;
  taxableEnd: number;
}

export interface RothIraResult {
  currentAge: number;
  retirementAge: number;
  yearsToRetirement: number;

  // Retirement Balances
  rothBalanceAtRetirement: number;
  taxableBalanceAtRetirement: number;
  totalPrincipalContributed: number;

  // Interest & Taxes
  rothTotalInterest: number;
  taxableTotalInterest: number;
  rothTotalTax: number;
  taxableTotalTax: number;

  // Net Roth Advantage
  rothAdvantageOverTaxable: number;

  recommendation: string;
  schedule: AnnualScheduleRothRow[];
}

export interface BackdoorRothResult {
  conversionAmount: number;
  taxDueOnConversion: number;
  rothFutureValueTaxFree: number;
  taxableFutureValueAfterTax: number;
  netBackdoorAdvantage: number;
  recommendation: string;
}

/**
 * Official IRS Contribution Limits
 */
export const ROTH_2025_BASE_CAP = 7000;
export const ROTH_2025_CATCHUP_CAP = 8000; // Age 50+
export const ROTH_2026_BASE_CAP = 7500;
export const ROTH_2026_CATCHUP_CAP = 8600;

export function calculateRothIra(input: RothIraInput): RothIraResult {
  const currentAge = Math.max(18, Number(input.currentAge) || 30);
  const retirementAge = Math.max(currentAge + 1, Number(input.retirementAge) || 65);
  const yearsToRetirement = retirementAge - currentAge;

  const currentBalance = Math.max(0, Number(input.currentBalance) || 30000);
  let annualContrib = Math.max(0, Number(input.annualContribution) || 7500);

  // If Maximize Contributions toggle is enabled
  if (input.maximizeContributions) {
    annualContrib = currentAge >= 50 ? ROTH_2025_CATCHUP_CAP : ROTH_2025_BASE_CAP;
  }

  const r = Number(input.investmentReturn) / 100 || 0.06;
  const taxRate = Number(input.marginalTaxRate) / 100 || 0.25;

  // Taxable account after-tax return drag
  const taxableAfterTaxReturn = r * (1 - taxRate);

  let rothBal = currentBalance;
  let taxableBal = currentBalance;
  let cumPrincipal = currentBalance;

  let cumRothInterest = 0;
  let cumTaxableInterest = 0;
  let cumTaxableTax = 0;

  const schedule: AnnualScheduleRothRow[] = [];
  const currentYear = new Date().getFullYear();

  for (let y = 1; y <= yearsToRetirement; y++) {
    const age = currentAge + y - 1;
    const year = currentYear + y - 1;

    // Principal
    const princStart = cumPrincipal;
    cumPrincipal += annualContrib;
    const princEnd = cumPrincipal;

    // Roth IRA (Tax-Free Growth)
    const rothStart = rothBal;
    const rothGrowth = (rothStart + annualContrib) * r;
    rothBal = rothStart + annualContrib + rothGrowth;
    cumRothInterest += rothGrowth;
    const rothEnd = rothBal;

    // Taxable Account (Tax drag on annual returns)
    const taxableStart = taxableBal;
    const grossTaxableGrowth = (taxableStart + annualContrib) * r;
    const annualTaxOnGrowth = grossTaxableGrowth * taxRate;
    const netTaxableGrowth = grossTaxableGrowth - annualTaxOnGrowth;

    taxableBal = taxableStart + annualContrib + netTaxableGrowth;
    cumTaxableInterest += netTaxableGrowth;
    cumTaxableTax += annualTaxOnGrowth;
    const taxableEnd = taxableBal;

    schedule.push({
      age,
      year,
      principalStart: Number(princStart.toFixed(2)),
      principalEnd: Number(princEnd.toFixed(2)),
      rothStart: Number(rothStart.toFixed(2)),
      rothEnd: Number(rothEnd.toFixed(2)),
      taxableStart: Number(taxableStart.toFixed(2)),
      taxableEnd: Number(taxableEnd.toFixed(2)),
    });
  }

  const rothAdvantage = rothBal - taxableBal;
  const rec = `ROTH IRA ADVANTAGE: According to provided information, the Roth IRA account can accumulate $${rothAdvantage.toLocaleString("en-US", { maximumFractionDigits: 0 })} more than a regular taxable account by age ${retirementAge}, saving you $${cumTaxableTax.toLocaleString("en-US", { maximumFractionDigits: 0 })} in taxes!`;

  return {
    currentAge,
    retirementAge,
    yearsToRetirement,
    rothBalanceAtRetirement: Number(rothBal.toFixed(2)),
    taxableBalanceAtRetirement: Number(taxableBal.toFixed(2)),
    totalPrincipalContributed: Number(cumPrincipal.toFixed(2)),
    rothTotalInterest: Number(cumRothInterest.toFixed(2)),
    taxableTotalInterest: Number(cumTaxableInterest.toFixed(2)),
    rothTotalTax: 0,
    taxableTotalTax: Number(cumTaxableTax.toFixed(2)),
    rothAdvantageOverTaxable: Number(rothAdvantage.toFixed(2)),
    recommendation: rec,
    schedule,
  };
}

/**
 * Backdoor Roth IRA Conversion Solver
 */
export function calculateBackdoorRoth(input: BackdoorRothInput): BackdoorRothResult {
  const conversionAmount = Math.max(0, Number(input.conversionAmount) || 50000);
  const taxRate = Number(input.currentTaxRate) / 100 || 0.25;
  const years = Math.max(1, Number(input.yearsToRetirement) || 20);
  const r = Number(input.investmentReturn) / 100 || 0.06;

  const taxDueOnConversion = conversionAmount * taxRate;
  const netRothInvested = conversionAmount; // assuming tax paid out of pocket

  const rothFutureValue = netRothInvested * Math.pow(1 + r, years);

  // If kept in taxable account
  const taxableInvested = conversionAmount;
  const taxableAfterTaxReturn = r * (1 - taxRate);
  const taxableFutureValue = taxableInvested * Math.pow(1 + taxableAfterTaxReturn, years);

  const netAdvantage = rothFutureValue - taxableFutureValue - taxDueOnConversion;

  return {
    conversionAmount,
    taxDueOnConversion: Number(taxDueOnConversion.toFixed(2)),
    rothFutureValueTaxFree: Number(rothFutureValue.toFixed(2)),
    taxableFutureValueAfterTax: Number(taxableFutureValue.toFixed(2)),
    netBackdoorAdvantage: Number(netAdvantage.toFixed(2)),
    recommendation: `BACKDOOR ROTH CONVERSION GAIN: Converting $${conversionAmount.toLocaleString()} today will require paying $${taxDueOnConversion.toLocaleString()} in upfront income taxes, but will build a $${rothFutureValue.toLocaleString("en-US", { maximumFractionDigits: 0 })} 100% tax-free nest egg, yielding a net tax-free advantage of $${netAdvantage.toLocaleString("en-US", { maximumFractionDigits: 0 })} over taxable savings!`,
  };
}
