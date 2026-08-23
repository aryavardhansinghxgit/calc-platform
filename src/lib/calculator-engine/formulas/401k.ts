/**
 * Precision 401(k) Math Engine
 * Supports 4 Modes:
 * 1. 401(k) Growth & Purchasing Power Accumulation (with 2026 IRS limits & catch-ups)
 * 2. Early Withdrawal Costs & IRS 10% Penalty Solver
 * 3. Employer Match Maximizer (Multi-tier match structures)
 * 4. Traditional 401(k) vs. Roth 401(k) Comparison
 * Includes Age-by-Age Schedule Generation.
 */

export interface FourZeroOneKMode1Input {
  currentAge: number;
  currentSalary: number;
  currentBalance: number;
  contributionPercent: number; // % of salary
  employerMatchPercent: number; // e.g. 50% match
  employerMatchLimitPercent: number; // e.g. up to 6% of salary
  retirementAge: number;
  lifeExpectancy: number;
  salaryIncreaseRate: number; // %/yr
  investmentReturn: number; // %/yr
  inflationRate: number; // %/yr
}

export interface FourZeroOneKEarlyWithdrawalInput {
  withdrawalAmount: number;
  federalTaxRate: number;
  stateTaxRate: number;
  localTaxRate: number;
  isEmployed?: boolean;
  hasDisability?: boolean;
  hasOtherExemption?: boolean;
}

export interface FourZeroOneKMatchMaximizerInput {
  currentAge: number;
  currentSalary: number;
  match1Percent: number;
  match1LimitPercent: number;
  match2Percent?: number;
  match2LimitPercent?: number;
}

export interface AgeSchedule401kRow {
  age: number;
  year: number;
  salary: number;
  employeeContrib: number;
  employerMatch: number;
  investmentGrowth: number;
  endingBalance: number;
  purchasingPower: number;
}

export interface FourZeroOneKResult {
  mode: number;
  currentAge: number;
  retirementAge: number;
  yearsToRetirement: number;
  yearsInRetirement: number;

  // Mode 1 Results
  balanceAtRetirement: number;
  purchasingPowerAtRetirement: number;
  totalEmployeeContributions: number;
  totalEmployerMatch: number;
  totalInvestmentReturns: number;

  // Post-retirement monthly withdrawal capacity
  monthlyWithdrawalFixedPurchasingPower: number;
  monthlyWithdrawalNominal: number;

  // Mode 2 Early Withdrawal Results
  withdrawalAmount?: number;
  irsPenaltyAmount?: number;
  totalTaxAmount?: number;
  netCashReceived?: number;
  effectiveTaxAndPenaltyRate?: number;

  // Mode 3 Match Maximizer Results
  optimalContributionPercent?: number;
  maxMatchDollars?: number;

  // Mode 4 Traditional vs Roth Results
  traditionalFutureBalance?: number;
  rothFutureBalance?: number;
  taxDifferenceAtRetirement?: number;

  recommendation: string;
  schedule: AgeSchedule401kRow[];
}

/**
 * IRS 2026 Contribution Caps
 */
const IRS_BASE_LIMIT = 24500; // 2026 employee elective deferral limit ($24,500)
const IRS_CATCHUP_LIMIT = 8000; // 2026 Age 50+ general catch-up ($8,000)

/**
 * Mode 1: 401(k) Accumulation & Purchasing Power Growth
 */
export function calculate401kGrowth(input: FourZeroOneKMode1Input): FourZeroOneKResult {
  const currentAge = input.currentAge !== undefined && input.currentAge !== null && !isNaN(Number(input.currentAge)) ? Math.max(18, Number(input.currentAge)) : 30;
  const retirementAge = input.retirementAge !== undefined && input.retirementAge !== null && !isNaN(Number(input.retirementAge)) ? Math.max(currentAge + 1, Number(input.retirementAge)) : 65;
  const lifeExpectancy = input.lifeExpectancy !== undefined && input.lifeExpectancy !== null && !isNaN(Number(input.lifeExpectancy)) ? Math.max(retirementAge + 1, Number(input.lifeExpectancy)) : 85;

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;

  const currentSalary = input.currentSalary !== undefined && input.currentSalary !== null && !isNaN(Number(input.currentSalary)) ? Math.max(0, Number(input.currentSalary)) : 75000;
  const currentBalance = input.currentBalance !== undefined && input.currentBalance !== null && !isNaN(Number(input.currentBalance)) ? Math.max(0, Number(input.currentBalance)) : 35000;

  const contribPct = input.contributionPercent !== undefined && input.contributionPercent !== null && !isNaN(Number(input.contributionPercent)) ? Number(input.contributionPercent) / 100 : 0.10;
  const matchPct = input.employerMatchPercent !== undefined && input.employerMatchPercent !== null && !isNaN(Number(input.employerMatchPercent)) ? Number(input.employerMatchPercent) / 100 : 0.50;
  const matchLimitPct = input.employerMatchLimitPercent !== undefined && input.employerMatchLimitPercent !== null && !isNaN(Number(input.employerMatchLimitPercent)) ? Number(input.employerMatchLimitPercent) / 100 : 0.06;

  const salaryIncrease = input.salaryIncreaseRate !== undefined && input.salaryIncreaseRate !== null && !isNaN(Number(input.salaryIncreaseRate)) ? Number(input.salaryIncreaseRate) / 100 : 0.03;
  const investmentReturn = input.investmentReturn !== undefined && input.investmentReturn !== null && !isNaN(Number(input.investmentReturn)) ? Number(input.investmentReturn) / 100 : 0.06;
  const inflationRate = input.inflationRate !== undefined && input.inflationRate !== null && !isNaN(Number(input.inflationRate)) ? Number(input.inflationRate) / 100 : 0.03;

  let currentBal = currentBalance;
  let runningSalary = currentSalary;

  let cumEmployeeContrib = 0;
  let cumEmployerMatch = 0;
  let cumGrowth = 0;

  const schedule: AgeSchedule401kRow[] = [];
  const currentYear = new Date().getFullYear();

  for (let y = 1; y <= yearsToRetirement; y++) {
    const age = currentAge + y - 1;
    const year = currentYear + y - 1;
    const startBal = currentBal;

    // Enforce IRS limit with Catch-up for age 50+
    const irsCap = age >= 50 ? IRS_BASE_LIMIT + IRS_CATCHUP_LIMIT : IRS_BASE_LIMIT;

    const rawEmployeeContrib = runningSalary * contribPct;
    const employeeContrib = Math.min(rawEmployeeContrib, irsCap);

    // Employer Match: matchPct * min(contribPct, matchLimitPct) * salary
    const matchedSalaryPct = Math.min(contribPct, matchLimitPct);
    const employerMatch = runningSalary * matchedSalaryPct * matchPct;

    const totalContrib = employeeContrib + employerMatch;
    const growth = (startBal + totalContrib / 2) * investmentReturn;

    currentBal = startBal + totalContrib + growth;
    cumEmployeeContrib += employeeContrib;
    cumEmployerMatch += employerMatch;
    cumGrowth += growth;

    const purchasingPower = currentBal / Math.pow(1 + inflationRate, y);

    schedule.push({
      age,
      year,
      salary: Number(runningSalary.toFixed(2)),
      employeeContrib: Number(employeeContrib.toFixed(2)),
      employerMatch: Number(employerMatch.toFixed(2)),
      investmentGrowth: Number(growth.toFixed(2)),
      endingBalance: Number(currentBal.toFixed(2)),
      purchasingPower: Number(purchasingPower.toFixed(2)),
    });

    runningSalary *= 1 + salaryIncrease;
  }

  const balanceAtRetirement = currentBal;
  const purchasingPowerAtRetirement = balanceAtRetirement / Math.pow(1 + inflationRate, yearsToRetirement);

  // Post-retirement monthly withdrawal calculation
  const realRetirementReturn = (1 + investmentReturn) / (1 + inflationRate) - 1;
  let monthlyWithdrawalFixedPurchasingPower = 0;

  if (realRetirementReturn === 0) {
    monthlyWithdrawalFixedPurchasingPower = (balanceAtRetirement / yearsInRetirement) / 12;
  } else {
    const annualPurchasingPowerPayout = (purchasingPowerAtRetirement * realRetirementReturn) / (1 - Math.pow(1 + realRetirementReturn, -yearsInRetirement));
    monthlyWithdrawalFixedPurchasingPower = annualPurchasingPowerPayout / 12;
  }

  const monthlyWithdrawalNominal = (balanceAtRetirement * 0.04) / 12; // 4% Rule baseline

  const rec = `At retirement age ${retirementAge}, your 401(k) is projected to reach $${balanceAtRetirement.toLocaleString("en-US", { maximumFractionDigits: 0 })} ($${purchasingPowerAtRetirement.toLocaleString("en-US", { maximumFractionDigits: 0 })} in today's dollars), providing an illustrative monthly withdrawal capacity of $${monthlyWithdrawalFixedPurchasingPower.toFixed(2)}/mo in today's purchasing power.`;

  return {
    mode: 1,
    currentAge,
    retirementAge,
    yearsToRetirement,
    yearsInRetirement,
    balanceAtRetirement: Number(balanceAtRetirement.toFixed(2)),
    purchasingPowerAtRetirement: Number(purchasingPowerAtRetirement.toFixed(2)),
    totalEmployeeContributions: Number(cumEmployeeContrib.toFixed(2)),
    totalEmployerMatch: Number(cumEmployerMatch.toFixed(2)),
    totalInvestmentReturns: Number(cumGrowth.toFixed(2)),
    monthlyWithdrawalFixedPurchasingPower: Number(monthlyWithdrawalFixedPurchasingPower.toFixed(2)),
    monthlyWithdrawalNominal: Number(monthlyWithdrawalNominal.toFixed(2)),
    recommendation: rec,
    schedule,
  };
}

/**
 * Mode 2: 401(k) Early Withdrawal Costs & Penalty Solver
 */
export function calculate401kEarlyWithdrawal(input: FourZeroOneKEarlyWithdrawalInput): FourZeroOneKResult {
  const amount = input.withdrawalAmount !== undefined && input.withdrawalAmount !== null && !isNaN(Number(input.withdrawalAmount)) ? Math.max(0, Number(input.withdrawalAmount)) : 10000;
  const fedTax = input.federalTaxRate !== undefined && input.federalTaxRate !== null && !isNaN(Number(input.federalTaxRate)) ? Number(input.federalTaxRate) / 100 : 0.25;
  const stateTax = input.stateTaxRate !== undefined && input.stateTaxRate !== null && !isNaN(Number(input.stateTaxRate)) ? Number(input.stateTaxRate) / 100 : 0.05;
  const localTax = input.localTaxRate !== undefined && input.localTaxRate !== null && !isNaN(Number(input.localTaxRate)) ? Number(input.localTaxRate) / 100 : 0.0;

  // IRS 10% Penalty applies if under 59½ and no exemption
  const isExempt = Boolean(input.hasDisability || input.hasOtherExemption);
  const penaltyRate = isExempt ? 0.0 : 0.10;

  const irsPenaltyAmount = amount * penaltyRate;
  const totalTaxRate = fedTax + stateTax + localTax;
  const totalTaxAmount = amount * totalTaxRate;
  const netCashReceived = amount - irsPenaltyAmount - totalTaxAmount;
  const effectiveRate = amount > 0 ? ((irsPenaltyAmount + totalTaxAmount) / amount) * 100 : 0;

  return {
    mode: 2,
    currentAge: 40,
    retirementAge: 65,
    yearsToRetirement: 25,
    yearsInRetirement: 20,
    balanceAtRetirement: 0,
    purchasingPowerAtRetirement: 0,
    totalEmployeeContributions: 0,
    totalEmployerMatch: 0,
    totalInvestmentReturns: 0,
    monthlyWithdrawalFixedPurchasingPower: 0,
    monthlyWithdrawalNominal: 0,

    withdrawalAmount: amount,
    irsPenaltyAmount: Number(irsPenaltyAmount.toFixed(2)),
    totalTaxAmount: Number(totalTaxAmount.toFixed(2)),
    netCashReceived: Number(netCashReceived.toFixed(2)),
    effectiveTaxAndPenaltyRate: Number(effectiveRate.toFixed(2)),

    recommendation: `Cashing out $${amount.toLocaleString()} early results in $${(irsPenaltyAmount + totalTaxAmount).toFixed(2)} (${effectiveRate.toFixed(1)}%) in modeled taxes and penalties. Net cash received is $${netCashReceived.toFixed(2)}.`,
    schedule: [],
  };
}

/**
 * Mode 3: Employer Match Maximizer
 */
export function calculate401kMatchMaximizer(input: FourZeroOneKMatchMaximizerInput): FourZeroOneKResult {
  const currentSalary = input.currentSalary !== undefined && input.currentSalary !== null && !isNaN(Number(input.currentSalary)) ? Math.max(0, Number(input.currentSalary)) : 75000;
  const m1Pct = input.match1Percent !== undefined && input.match1Percent !== null && !isNaN(Number(input.match1Percent)) ? Number(input.match1Percent) / 100 : 0.50;
  const m1Limit = input.match1LimitPercent !== undefined && input.match1LimitPercent !== null && !isNaN(Number(input.match1LimitPercent)) ? Number(input.match1LimitPercent) / 100 : 0.06;

  const m2Pct = input.match2Percent !== undefined && input.match2Percent !== null && !isNaN(Number(input.match2Percent)) ? Number(input.match2Percent) / 100 : 0;
  const m2Limit = input.match2LimitPercent !== undefined && input.match2LimitPercent !== null && !isNaN(Number(input.match2LimitPercent)) ? Number(input.match2LimitPercent) / 100 : 0;

  const tier1Dollars = currentSalary * m1Limit * m1Pct;
  const tier2Dollars = currentSalary * m2Limit * m2Pct;
  const maxMatchDollars = tier1Dollars + tier2Dollars;
  const optimalContribPct = Math.max(m1Limit, m2Limit) * 100;

  return {
    mode: 3,
    currentAge: Number(input.currentAge) || 30,
    retirementAge: 65,
    yearsToRetirement: 35,
    yearsInRetirement: 20,
    balanceAtRetirement: 0,
    purchasingPowerAtRetirement: 0,
    totalEmployeeContributions: 0,
    totalEmployerMatch: Number(maxMatchDollars.toFixed(2)),
    totalInvestmentReturns: 0,
    monthlyWithdrawalFixedPurchasingPower: 0,
    monthlyWithdrawalNominal: 0,

    optimalContributionPercent: optimalContribPct,
    maxMatchDollars: Number(maxMatchDollars.toFixed(2)),

    recommendation: `To capture your full modeled employer match ($${maxMatchDollars.toFixed(2)}/year), you must contribute at least ${optimalContribPct}% of your salary ($${(currentSalary * (optimalContribPct / 100)).toFixed(2)}/year).`,
    schedule: [],
  };
}
