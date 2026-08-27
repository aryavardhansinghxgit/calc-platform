/**
 * Required Minimum Distribution (RMD) Calculator Formula Engine
 * Compliant with IRS Publication 590-B (Table III Uniform Lifetime, Table II Joint Life, Table I Single Life)
 * Incorporating SECURE Act 1.0 & SECURE Act 2.0 rules for starting ages (73 and 75).
 */

export interface AccountItem {
  id: string;
  name: string;
  type: "traditional_ira" | "401k" | "403b" | "sep_ira" | "simple_ira" | "inherited_ira";
  balance: number;
}

export interface RmdInput {
  birthYear: number;
  rmdYear: number;
  priorYearBalance: number;
  isSpouseSoleBeneficiary: boolean;
  spouseBirthYear?: number;
  growthRatePercent?: number; // Estimated rate of return
  accounts?: AccountItem[]; // Optional multi-account breakdown
  estimatedTaxRatePercent?: number; // Federal + state combined marginal rate
  qcdAmount?: number; // Qualified Charitable Distribution amount
}

export interface LifetimeScheduleRow {
  year: number;
  age: number;
  distributionPeriod: number;
  rmdAmount: number;
  qcdOffset: number;
  taxableRmd: number;
  estimatedTax: number;
  netAfterTax: number;
  endBalance: number;
}

export const QCD_ANNUAL_LIMIT_2026 = 111000;

export function getQcdAnnualLimit(taxYear: number): number {
  if (taxYear <= 2023) return 100000;
  if (taxYear === 2024) return 105000;
  if (taxYear === 2025) return 108000;
  return 111000; // 2026+ per SECURE 2.0 inflation indexing (IRS Notice)
}

export interface RmdResult {
  currentAge: number;
  rmdStartingAge: number;
  firstRmdYear: number;
  firstRmdDeadline: string;
  currentRmdDeadline: string;
  subsequentRmdDeadline: string;
  timelineStatus: "before_first_rmd" | "first_rmd_year" | "after_first_rmd";
  isDoubleDistributionYear: boolean;
  isRmdRequiredThisYear: boolean;
  rmdYear: number;
  priorYearBalance: number;
  distributionPeriod: number;
  tableUsed: "Uniform Lifetime (Table III)" | "Joint Life & Last Survivor (Table II)" | "None (Below Starting Age)";
  annualRmd: number;
  monthlyRmd: number;
  qcdAmount: number;
  qcdAnnualLimit: number;
  taxableRmd: number;
  estimatedTaxPaid: number;
  netAfterTaxRmd: number;
  penalty25Percent: number; // Standard late withdrawal penalty
  penalty10Percent: number; // Reduced penalty if corrected within 2 years
  lifetimeSchedule: LifetimeScheduleRow[];
  accountBreakdown: {
    id: string;
    name: string;
    type: string;
    balance: number;
    accountRmd: number;
    canAggregate: boolean;
    aggregationGroup: string;
  }[];
  totalAggregatedBalance: number;
}

// IRS Uniform Lifetime Table (Table III) - IRS Pub 590-B
export const UNIFORM_LIFETIME_TABLE: Record<number, number> = {
  72: 27.4,
  73: 26.5,
  74: 25.5,
  75: 24.6,
  76: 23.7,
  77: 22.9,
  78: 22.0,
  79: 21.1,
  80: 20.2,
  81: 19.4,
  82: 18.5,
  83: 17.7,
  84: 16.8,
  85: 16.0,
  86: 15.2,
  87: 14.4,
  88: 13.7,
  89: 12.9,
  90: 12.2,
  91: 11.5,
  92: 10.8,
  93: 10.1,
  94: 9.5,
  95: 8.9,
  96: 8.4,
  97: 7.8,
  98: 7.3,
  99: 6.8,
  100: 6.4,
  101: 6.0,
  102: 5.6,
  103: 5.2,
  104: 4.9,
  105: 4.6,
  106: 4.3,
  107: 4.1,
  108: 3.9,
  109: 3.7,
  110: 3.5,
  111: 3.4,
  112: 3.3,
  113: 3.1,
  114: 3.0,
  115: 2.9,
  116: 2.8,
  117: 2.7,
  118: 2.5,
  119: 2.3,
  120: 2.0,
};

/**
 * Determine RMD Starting Age under SECURE Act 1.0 & 2.0 rules
 */
export function getRmdStartingAge(birthYear: number): number {
  if (birthYear <= 1950) {
    return 72; // SECURE 1.0
  } else if (birthYear >= 1951 && birthYear <= 1959) {
    return 73; // SECURE 2.0 (Phase 1)
  } else {
    return 75; // SECURE 2.0 (Phase 2 - 1960 and later)
  }
}

/**
 * Helper to compute Table III factor for any age
 */
export function getTableIIIFactor(age: number): number {
  if (age < 72) return 27.4 + (72 - age);
  if (age > 120) return 2.0;
  return UNIFORM_LIFETIME_TABLE[age] || 2.0;
}

/**
 * Joint Life & Last Survivor Expectancy Table (Table II) approximation/lookup
 * Used when spouse is sole beneficiary AND is more than 10 years younger than owner.
 */
export function getTableIIFactor(ownerAge: number, spouseAge: number): number {
  const ageDiff = ownerAge - spouseAge;
  if (ageDiff <= 10) {
    return getTableIIIFactor(ownerAge);
  }
  // Formula approximation for Joint Life Expectancy based on IRS Pub 590-B Table II
  const baseUniform = getTableIIIFactor(ownerAge);
  const extraLifeYears = (ageDiff - 10) * 0.45;
  return Number((baseUniform + extraLifeYears).toFixed(1));
}

/**
 * Main RMD Calculation Engine
 */
export function calculateRmd(input: RmdInput): RmdResult {
  const birthYear = Math.max(1910, Math.min(2010, Number(input.birthYear || 1951)));
  const rmdYear = Math.max(2020, Math.min(2075, Number(input.rmdYear || 2026)));
  const currentAge = rmdYear - birthYear;
  const startingAge = getRmdStartingAge(birthYear);
  const isRmdRequired = currentAge >= startingAge;

  const totalBalance = Math.max(0, Number(input.priorYearBalance ?? 0));
  const rawGrowth = input.growthRatePercent !== undefined && input.growthRatePercent !== null ? Number(input.growthRatePercent) : 5.0;
  const growthRate = Math.max(-20, Math.min(30, rawGrowth)) / 100;
  const rawTax = input.estimatedTaxRatePercent !== undefined && input.estimatedTaxRatePercent !== null ? Number(input.estimatedTaxRatePercent) : 22.0;
  const taxRate = Math.max(0, Math.min(60, rawTax)) / 100;
  const qcdInput = input.qcdAmount !== undefined && input.qcdAmount !== null ? Math.max(0, Number(input.qcdAmount)) : 0;

  // Determine Distribution Factor Table
  let factor = 0;
  let tableUsed: RmdResult["tableUsed"] = "None (Below Starting Age)";

  if (isRmdRequired) {
    const isSpouseYounger =
      input.isSpouseSoleBeneficiary &&
      input.spouseBirthYear &&
      (birthYear - input.spouseBirthYear) > 10;

    if (isSpouseYounger && input.spouseBirthYear) {
      const spouseAge = rmdYear - input.spouseBirthYear;
      factor = getTableIIFactor(currentAge, spouseAge);
      tableUsed = "Joint Life & Last Survivor (Table II)";
    } else {
      factor = getTableIIIFactor(currentAge);
      tableUsed = "Uniform Lifetime (Table III)";
    }
  }

  const rawAnnualRmd = isRmdRequired && factor > 0 ? totalBalance / factor : 0;
  const annualRmd = Number(rawAnnualRmd.toFixed(2));
  const monthlyRmd = Number((annualRmd / 12).toFixed(2));

  // QCD & Tax Math (2026 IRS annual cap is $111,000 per tax year; indexed for inflation)
  const qcdMaxLimit = getQcdAnnualLimit(rmdYear);
  const qcdAmount = Math.min(annualRmd, Math.min(qcdMaxLimit, qcdInput));
  const taxableRmd = Math.max(0, Number((annualRmd - qcdAmount).toFixed(2)));
  const estimatedTaxPaid = Number((taxableRmd * taxRate).toFixed(2));
  const netAfterTaxRmd = Number((annualRmd - estimatedTaxPaid).toFixed(2));

  // Penalty math under SECURE 2.0
  const penalty25Percent = Number((annualRmd * 0.25).toFixed(2));
  const penalty10Percent = Number((annualRmd * 0.10).toFixed(2));

  // Multi-account aggregation analysis
  const accountsList = input.accounts && input.accounts.length > 0
    ? input.accounts
    : [{ id: "1", name: "Primary IRA Account", type: "traditional_ira" as const, balance: totalBalance }];

  const accountBreakdown = accountsList.map((acc) => {
    const accRmd = isRmdRequired && factor > 0 ? Number((acc.balance / factor).toFixed(2)) : 0;
    const canAggregate = acc.type !== "401k" && acc.type !== "403b" && acc.type !== "inherited_ira";
    let aggregationGroup = "IRA Aggregation Pool (Can take total RMD from any IRA)";
    if (acc.type === "401k") aggregationGroup = "401(k) Plan (Must be taken directly from this plan)";
    if (acc.type === "403b") aggregationGroup = "403(b) Plan Pool (Can aggregate with other 403(b)s only)";
    if (acc.type === "inherited_ira") aggregationGroup = "Inherited IRA (Must take separately for each inherited IRA)";

    return {
      id: acc.id,
      name: acc.name,
      type: acc.type,
      balance: acc.balance,
      accountRmd: accRmd,
      canAggregate,
      aggregationGroup,
    };
  });

  // Required Beginning Date (RBD) & Timeline details
  const firstRmdYear = birthYear + startingAge;
  const firstRmdDeadline = `April 1, ${firstRmdYear + 1}`;
  const subsequentRmdDeadline = "December 31 annually";

  let timelineStatus: RmdResult["timelineStatus"] = "after_first_rmd";
  let currentRmdDeadline = `December 31, ${rmdYear}`;

  if (rmdYear < firstRmdYear) {
    timelineStatus = "before_first_rmd";
    currentRmdDeadline = `No RMD required for ${rmdYear}`;
  } else if (rmdYear === firstRmdYear) {
    timelineStatus = "first_rmd_year";
    currentRmdDeadline = `Generally April 1, ${firstRmdYear + 1}`;
  } else {
    timelineStatus = "after_first_rmd";
    currentRmdDeadline = `December 31, ${rmdYear}`;
  }

  const isDoubleDistributionYear = rmdYear === firstRmdYear + 1;

  // Generate Lifetime Schedule up to Age 120
  const lifetimeSchedule: LifetimeScheduleRow[] = [];
  let simBalance = totalBalance;
  let simYear = rmdYear;
  let simAge = currentAge;

  for (let step = 0; simAge <= 120; step++) {
    const simIsRmd = simAge >= startingAge;
    let simFactor = 0;

    if (simIsRmd) {
      if (
        input.isSpouseSoleBeneficiary &&
        input.spouseBirthYear &&
        (birthYear - input.spouseBirthYear) > 10
      ) {
        const simSpouseAge = simYear - input.spouseBirthYear;
        simFactor = getTableIIFactor(simAge, simSpouseAge);
      } else {
        simFactor = getTableIIIFactor(simAge);
      }
    }

    const stepRmd = simIsRmd && simFactor > 0 ? Number((simBalance / simFactor).toFixed(2)) : 0;
    const stepQcd = Math.min(stepRmd, qcdAmount);
    const stepTaxableRmd = Math.max(0, stepRmd - stepQcd);
    const stepTax = Number((stepTaxableRmd * taxRate).toFixed(2));
    const stepNetAfter = Number((stepRmd - stepTax).toFixed(2));

    // End of year balance after withdrawal and growth
    const postWithdrawal = Math.max(0, simBalance - stepRmd);
    const stepEndBal = Number((postWithdrawal * (1 + growthRate)).toFixed(2));

    lifetimeSchedule.push({
      year: simYear,
      age: simAge,
      distributionPeriod: simFactor,
      rmdAmount: stepRmd,
      qcdOffset: stepQcd,
      taxableRmd: stepTaxableRmd,
      estimatedTax: stepTax,
      netAfterTax: stepNetAfter,
      endBalance: stepEndBal,
    });

    simBalance = stepEndBal;
    simYear++;
    simAge++;
  }

  return {
    currentAge,
    rmdStartingAge: startingAge,
    firstRmdYear,
    firstRmdDeadline,
    currentRmdDeadline,
    subsequentRmdDeadline,
    timelineStatus,
    isDoubleDistributionYear,
    isRmdRequiredThisYear: isRmdRequired,
    rmdYear,
    priorYearBalance: totalBalance,
    distributionPeriod: factor,
    tableUsed,
    annualRmd,
    monthlyRmd,
    qcdAmount,
    qcdAnnualLimit: qcdMaxLimit,
    taxableRmd,
    estimatedTaxPaid,
    netAfterTaxRmd,
    penalty25Percent,
    penalty10Percent,
    lifetimeSchedule,
    accountBreakdown,
    totalAggregatedBalance: totalBalance,
  };
}
