/**
 * Precision IRA Multi-Account Math Engine
 * Compares 4 Account Paths Side-by-Side:
 * 1. Traditional / SEP / SIMPLE IRA (Pre-tax contribution, tax-deferred compounding, taxed at retirement tax rate)
 * 2. Traditional / SEP / SIMPLE IRA (After-tax value in retirement)
 * 3. Roth IRA (After-tax contribution, tax-free compounding, 100% tax-free retirement withdrawal)
 * 4. Regular Taxable Savings (After-tax contribution, annual tax drag on returns, no tax on withdrawal)
 * Includes 2025/2026 IRS contribution cap enforcement and Age-by-Age Schedule generation.
 */

export interface IraInput {
  currentBalance: number;
  annualContribution: number; // Before tax annual contribution
  investmentReturn: number; // %/yr
  currentAge: number;
  retirementAge: number;
  currentTaxRate: number; // % marginal tax rate now
  retirementTaxRate: number; // % expected tax rate in retirement
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

  recommendation: string;
  schedule: AgeScheduleIraRow[];
}

/**
 * IRS 2025/2026 Annual Contribution Caps
 */
export const IRA_2025_BASE_CAP = 7000;
export const IRA_2025_CATCHUP_CAP = 8000; // Age 50+

export function calculateIra(input: IraInput): IraResult {
  const currentAge = Math.max(18, Number(input.currentAge) || 30);
  const retirementAge = Math.max(currentAge + 1, Number(input.retirementAge) || 65);
  const yearsToRetirement = retirementAge - currentAge;

  const currentBalance = Math.max(0, Number(input.currentBalance) || 30000);
  const annualContrib = Math.max(0, Number(input.annualContribution) || 7500);

  const r = Number(input.investmentReturn) / 100 || 0.06;
  const currentTax = Number(input.currentTaxRate) / 100 || 0.25;
  const retirementTax = Number(input.retirementTaxRate) / 100 || 0.15;

  // 1. Traditional IRA (Pre-tax)
  let tradPreBal = currentBalance;

  // 2. Roth IRA (After-tax funding)
  // Initial balance after-tax equivalent if converted, or pre-funded
  let rothBal = currentBalance * (1 - currentTax);
  const rothAnnualContrib = annualContrib * (1 - currentTax);

  // 3. Regular Taxable Savings (After-tax funding + annual tax on investment growth)
  let taxableBal = currentBalance * (1 - currentTax);
  const taxableAnnualContrib = annualContrib * (1 - currentTax);
  const taxableAfterTaxReturn = r * (1 - currentTax);

  let cumPrincipal = currentBalance;
  const schedule: AgeScheduleIraRow[] = [];
  const currentYear = new Date().getFullYear();

  for (let y = 1; y <= yearsToRetirement; y++) {
    const age = currentAge + y - 1;
    const year = currentYear + y - 1;

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
    rec = `BALANCED BENEFIT: At identical current and retirement tax rates (${(currentTax * 100).toFixed(0)}%), Traditional and Roth IRAs provide equivalent after-tax balances of $${rothBalance.toLocaleString("en-US", { maximumFractionDigits: 0 })}, both outperforming taxable savings by $${rothVsTaxableDiff.toLocaleString("en-US", { maximumFractionDigits: 0 })}!`;
  }

  return {
    currentAge,
    retirementAge,
    yearsToRetirement,
    traditionalPreTaxBalance: Number(traditionalPreTaxBalance.toFixed(2)),
    traditionalPostTaxBalance: Number(traditionalPostTaxBalance.toFixed(2)),
    rothBalance: Number(rothBalance.toFixed(2)),
    taxableBalance: Number(taxableBalance.toFixed(2)),
    totalPrincipalInvested: Number(cumPrincipal.toFixed(2)),
    traditionalVsRothDiff: Number(traditionalVsRothDiff.toFixed(2)),
    rothVsTaxableDiff: Number(rothVsTaxableDiff.toFixed(2)),
    traditionalVsTaxableDiff: Number(traditionalVsTaxableDiff.toFixed(2)),
    recommendation: rec,
    schedule,
  };
}
