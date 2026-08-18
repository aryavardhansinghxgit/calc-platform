import {
  PaycheckFrequency,
  FilingStatus,
  TakeHomePayInputs,
  TakeHomePayResult,
  PaycheckLineItem,
  HourlyOvertimeInputs,
  HourlyOvertimeResult,
  BonusTaxInputs,
  BonusTaxResult,
  RelocationStateComparisonPoint,
  ReverseSalaryInputs,
  ReverseSalaryResult,
  Budget503020Result,
} from "./types";

export const FREQUENCY_MULTIPLIERS: Record<PaycheckFrequency, number> = {
  daily: 260,
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
  annually: 1,
};

const SS_WAGE_CAP = 168600;

/**
 * 2025/2026 Progressive Federal Tax Brackets for Annualized Wages
 */
const FED_TAX_BRACKETS: Record<FilingStatus, { cap: number; rate: number }[]> = {
  single: [
    { cap: 11600, rate: 0.10 },
    { cap: 47150, rate: 0.12 },
    { cap: 100525, rate: 0.22 },
    { cap: 191950, rate: 0.24 },
    { cap: 243725, rate: 0.32 },
    { cap: 609350, rate: 0.35 },
    { cap: Infinity, rate: 0.37 },
  ],
  married_joint: [
    { cap: 23200, rate: 0.10 },
    { cap: 94300, rate: 0.12 },
    { cap: 201050, rate: 0.22 },
    { cap: 383900, rate: 0.24 },
    { cap: 487450, rate: 0.32 },
    { cap: 731200, rate: 0.35 },
    { cap: Infinity, rate: 0.37 },
  ],
  married_separate: [
    { cap: 11600, rate: 0.10 },
    { cap: 47150, rate: 0.12 },
    { cap: 100525, rate: 0.22 },
    { cap: 191950, rate: 0.24 },
    { cap: 243725, rate: 0.32 },
    { cap: 365600, rate: 0.35 },
    { cap: Infinity, rate: 0.37 },
  ],
  head_of_household: [
    { cap: 16550, rate: 0.10 },
    { cap: 63100, rate: 0.12 },
    { cap: 100500, rate: 0.22 },
    { cap: 191950, rate: 0.24 },
    { cap: 243700, rate: 0.32 },
    { cap: 609350, rate: 0.35 },
    { cap: Infinity, rate: 0.37 },
  ],
};

const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 15000,
  married_joint: 30000,
  married_separate: 15000,
  head_of_household: 22500,
};

function computeAnnualFederalTax(taxableAnnual: number, filingStatus: FilingStatus): number {
  if (taxableAnnual <= 0) return 0;
  const brackets = FED_TAX_BRACKETS[filingStatus];
  let tax = 0;
  let prev = 0;
  for (const b of brackets) {
    if (taxableAnnual > prev) {
      const amtInBracket = Math.min(taxableAnnual, b.cap) - prev;
      tax += amtInBracket * b.rate;
      prev = b.cap;
    }
  }
  return tax;
}

/**
 * 1. Core Take-Home Paycheck & Tax Withholding Calculation Engine
 */
export function calculateTakeHomePay(inputs: TakeHomePayInputs): TakeHomePayResult {
  const periods = FREQUENCY_MULTIPLIERS[inputs.frequency] || 26;

  // 1. Gross Earnings normalization
  let grossPerPeriod = 0;
  let grossAnnual = 0;

  if (inputs.isGrossAnnual) {
    grossAnnual = Math.abs(inputs.grossPay || 0);
    grossPerPeriod = grossAnnual / periods;
  } else {
    grossPerPeriod = Math.abs(inputs.grossPay || 0);
    grossAnnual = grossPerPeriod * periods;
  }

  // 2. Pre-Tax Deductions
  const pre = inputs.preTaxDeductions;
  const preTaxPerPeriod =
    (pre.retirement401k || 0) +
    (pre.healthDentalVision || 0) +
    (pre.hsaFsa || 0) +
    (pre.transitCommuter || 0) +
    (pre.otherPreTax || 0);
  const preTaxAnnual = preTaxPerPeriod * periods;

  // 3. Federal Taxable Wage Base
  const fedTaxablePerPeriod = Math.max(0, grossPerPeriod - preTaxPerPeriod);
  const fedTaxableAnnual = fedTaxablePerPeriod * periods;

  // 4. Form W-4 Adjustments & Standard Deduction
  const w4 = inputs.w4Adjustments;
  const stdDed = STANDARD_DEDUCTION[inputs.filingStatus];
  const adjustedAnnualTaxable = Math.max(
    0,
    fedTaxableAnnual + (w4.otherIncomeStep4a || 0) - (w4.extraDeductionsStep4b || 0) - stdDed
  );

  let annualFedTaxBeforeCredits = computeAnnualFederalTax(adjustedAnnualTaxable, inputs.filingStatus);

  // Apply Step 3 Dependent Tax Credits ($2,000 CTC / $500 ODC)
  const dependentCredits = Math.abs(w4.claimDependentsStep3 || 0);
  const annualFedTaxAfterCredits = Math.max(0, annualFedTaxBeforeCredits - dependentCredits);

  let fedTaxPerPeriod = annualFedTaxAfterCredits / periods + (w4.extraWithholdingStep4c || 0);
  const fedTaxAnnual = fedTaxPerPeriod * periods;

  // 5. FICA Taxes (Social Security & Medicare)
  let ssTaxPerPeriod = 0;
  let ssTaxAnnual = 0;
  let medTaxPerPeriod = 0;
  let medTaxAnnual = 0;

  if (!inputs.isFicaExempt) {
    // Social Security 6.2% up to cap
    const ssTaxableAnnual = Math.min(grossAnnual, SS_WAGE_CAP);
    ssTaxAnnual = ssTaxableAnnual * 0.062;
    ssTaxPerPeriod = ssTaxAnnual / periods;

    // Medicare 1.45% + 0.9% surtax over $200k single / $250k joint
    const medThreshold = inputs.filingStatus === "married_joint" ? 250000 : 200000;
    const baseMedTax = grossAnnual * 0.0145;
    const surtax = Math.max(0, grossAnnual - medThreshold) * 0.009;
    medTaxAnnual = baseMedTax + surtax;
    medTaxPerPeriod = medTaxAnnual / periods;
  }

  // 6. State & Local Income Taxes
  const stateRate = (inputs.stateTaxRatePercent || 0) / 100;
  const stateTaxPerPeriod = fedTaxablePerPeriod * stateRate;
  const stateTaxAnnual = stateTaxPerPeriod * periods;

  const localRate = (inputs.localTaxRatePercent || 0) / 100;
  const localTaxPerPeriod = fedTaxablePerPeriod * localRate;
  const localTaxAnnual = localTaxPerPeriod * periods;

  const totalTaxesPerPeriod = fedTaxPerPeriod + ssTaxPerPeriod + medTaxPerPeriod + stateTaxPerPeriod + localTaxPerPeriod;
  const totalTaxesAnnual = totalTaxesPerPeriod * periods;

  // 7. Post-Tax Deductions
  const post = inputs.postTaxDeductions;
  const postTaxPerPeriod =
    (post.roth401k || 0) +
    (post.garnishmentsChildSupport || 0) +
    (post.unionDuesCharity || 0) +
    (post.otherPostTax || 0);
  const postTaxAnnual = postTaxPerPeriod * periods;

  // 8. Net In-Hand Take-Home Pay
  const netTakeHomePerPeriod = Math.max(
    0,
    grossPerPeriod - preTaxPerPeriod - totalTaxesPerPeriod - postTaxPerPeriod
  );
  const netTakeHomeAnnual = netTakeHomePerPeriod * periods;

  const takeHomePercentage = grossPerPeriod > 0 ? (netTakeHomePerPeriod / grossPerPeriod) * 100 : 0;

  // Build Line Items for Itemized Table & Charts
  const lineItems: PaycheckLineItem[] = [
    {
      name: "Gross Pay",
      perPeriod: Math.round(grossPerPeriod * 100) / 100,
      annual: Math.round(grossAnnual),
      percentageOfGross: 100,
    },
    {
      name: "Pre-Tax Deductions (401k, HSA, Ins.)",
      perPeriod: Math.round(preTaxPerPeriod * 100) / 100,
      annual: Math.round(preTaxAnnual),
      percentageOfGross: grossPerPeriod > 0 ? Math.round((preTaxPerPeriod / grossPerPeriod) * 1000) / 10 : 0,
    },
    {
      name: "Federal Income Tax Withholding",
      perPeriod: Math.round(fedTaxPerPeriod * 100) / 100,
      annual: Math.round(fedTaxAnnual),
      percentageOfGross: grossPerPeriod > 0 ? Math.round((fedTaxPerPeriod / grossPerPeriod) * 1000) / 10 : 0,
    },
    {
      name: "Social Security Tax (6.2%)",
      perPeriod: Math.round(ssTaxPerPeriod * 100) / 100,
      annual: Math.round(ssTaxAnnual),
      percentageOfGross: grossPerPeriod > 0 ? Math.round((ssTaxPerPeriod / grossPerPeriod) * 1000) / 10 : 0,
    },
    {
      name: "Medicare Tax (1.45% + Surtax)",
      perPeriod: Math.round(medTaxPerPeriod * 100) / 100,
      annual: Math.round(medTaxAnnual),
      percentageOfGross: grossPerPeriod > 0 ? Math.round((medTaxPerPeriod / grossPerPeriod) * 1000) / 10 : 0,
    },
    {
      name: "State Income Tax Withholding",
      perPeriod: Math.round(stateTaxPerPeriod * 100) / 100,
      annual: Math.round(stateTaxAnnual),
      percentageOfGross: grossPerPeriod > 0 ? Math.round((stateTaxPerPeriod / grossPerPeriod) * 1000) / 10 : 0,
    },
    {
      name: "Local / City Wage Tax",
      perPeriod: Math.round(localTaxPerPeriod * 100) / 100,
      annual: Math.round(localTaxAnnual),
      percentageOfGross: grossPerPeriod > 0 ? Math.round((localTaxPerPeriod / grossPerPeriod) * 1000) / 10 : 0,
    },
    {
      name: "Post-Tax Deductions (Roth, Dues)",
      perPeriod: Math.round(postTaxPerPeriod * 100) / 100,
      annual: Math.round(postTaxAnnual),
      percentageOfGross: grossPerPeriod > 0 ? Math.round((postTaxPerPeriod / grossPerPeriod) * 1000) / 10 : 0,
    },
    {
      name: "Net In-Hand Take-Home Pay",
      perPeriod: Math.round(netTakeHomePerPeriod * 100) / 100,
      annual: Math.round(netTakeHomeAnnual),
      percentageOfGross: Math.round(takeHomePercentage * 10) / 10,
    },
  ];

  return {
    periodsPerYear: periods,
    grossPayPerPeriod: Math.round(grossPerPeriod * 100) / 100,
    grossPayAnnual: Math.round(grossAnnual),
    totalPreTaxDeductionsPerPeriod: Math.round(preTaxPerPeriod * 100) / 100,
    totalPreTaxDeductionsAnnual: Math.round(preTaxAnnual),
    federalTaxableWagesPerPeriod: Math.round(fedTaxablePerPeriod * 100) / 100,
    federalTaxableWagesAnnual: Math.round(fedTaxableAnnual),
    federalIncomeTaxPerPeriod: Math.round(fedTaxPerPeriod * 100) / 100,
    federalIncomeTaxAnnual: Math.round(fedTaxAnnual),
    socialSecurityTaxPerPeriod: Math.round(ssTaxPerPeriod * 100) / 100,
    socialSecurityTaxAnnual: Math.round(ssTaxAnnual),
    medicareTaxPerPeriod: Math.round(medTaxPerPeriod * 100) / 100,
    medicareTaxAnnual: Math.round(medTaxAnnual),
    stateIncomeTaxPerPeriod: Math.round(stateTaxPerPeriod * 100) / 100,
    stateIncomeTaxAnnual: Math.round(stateTaxAnnual),
    localTaxPerPeriod: Math.round(localTaxPerPeriod * 100) / 100,
    localTaxAnnual: Math.round(localTaxAnnual),
    totalTaxesPerPeriod: Math.round(totalTaxesPerPeriod * 100) / 100,
    totalTaxesAnnual: Math.round(totalTaxesAnnual),
    totalPostTaxDeductionsPerPeriod: Math.round(postTaxPerPeriod * 100) / 100,
    totalPostTaxDeductionsAnnual: Math.round(postTaxAnnual),
    netTakeHomePayPerPeriod: Math.round(netTakeHomePerPeriod * 100) / 100,
    netTakeHomePayAnnual: Math.round(netTakeHomeAnnual),
    takeHomePercentage: Math.round(takeHomePercentage * 10) / 10,
    lineItems,
  };
}

/**
 * 2. Hourly, Overtime ($1.5x) & Tips Paycheck Engine
 */
export function calculateHourlyOvertime(inputs: HourlyOvertimeInputs): HourlyOvertimeResult {
  const rate = Math.abs(inputs.hourlyRate || 0);
  const regHours = Math.abs(inputs.regularHoursPerWeek || 0);
  const otHours = Math.abs(inputs.overtimeHoursPerWeek || 0);
  const dtHours = Math.abs(inputs.doubleTimeHoursPerWeek || 0);
  const tips = Math.abs(inputs.tipsAndCommissionsPerPeriod || 0);

  const regularPay = rate * regHours;
  const overtimePay = rate * 1.5 * otHours;
  const doubleTimePay = rate * 2.0 * dtHours;

  const totalWeeklyGross = regularPay + overtimePay + doubleTimePay;
  const periods = FREQUENCY_MULTIPLIERS[inputs.frequency] || 26;
  const totalGrossPay = (totalWeeklyGross * 52) / periods + tips;
  const annualGrossPay = totalGrossPay * periods;

  const taxRate = (inputs.effectiveTaxRatePercent || 22.0) / 100;
  const estimatedTaxes = totalGrossPay * taxRate;
  const netTakeHomePay = Math.max(0, totalGrossPay - estimatedTaxes);

  const totalHoursWorked = (regHours + otHours + dtHours) * (52 / periods);
  const effectiveNetHourlyRate = totalHoursWorked > 0 ? netTakeHomePay / totalHoursWorked : 0;

  return {
    regularPay: Math.round(regularPay * 100) / 100,
    overtimePay: Math.round(overtimePay * 100) / 100,
    doubleTimePay: Math.round(doubleTimePay * 100) / 100,
    totalGrossPay: Math.round(totalGrossPay * 100) / 100,
    annualGrossPay: Math.round(annualGrossPay),
    estimatedTaxes: Math.round(estimatedTaxes * 100) / 100,
    netTakeHomePay: Math.round(netTakeHomePay * 100) / 100,
    effectiveNetHourlyRate: Math.round(effectiveNetHourlyRate * 100) / 100,
  };
}

/**
 * 3. Supplemental Bonus & Lump-Sum Tax Engine
 */
export function calculateBonusTax(inputs: BonusTaxInputs): BonusTaxResult {
  const bonus = Math.abs(inputs.bonusAmount || 0);

  // IRS Flat Percentage Method: 22% federal (or 37% over $1M)
  let fedRate = 0.22;
  let fedTax = bonus * fedRate;
  if (bonus > 1000000) {
    fedTax = 1000000 * 0.22 + (bonus - 1000000) * 0.37;
    fedRate = fedTax / bonus;
  }

  // FICA
  const ssTax = Math.min(bonus, Math.max(0, SS_WAGE_CAP - inputs.regularSalaryAnnual)) * 0.062;
  const medTax = bonus * 0.0145;

  // State & Local
  const stateTax = bonus * ((inputs.stateTaxRatePercent || 0) / 100);
  const localTax = bonus * ((inputs.localTaxRatePercent || 0) / 100);

  const totalBonusTaxes = fedTax + ssTax + medTax + stateTax + localTax;
  const netTakeHomeBonus = Math.max(0, bonus - totalBonusTaxes);
  const bonusRetentionPercent = bonus > 0 ? (netTakeHomeBonus / bonus) * 100 : 0;

  return {
    grossBonus: Math.round(bonus),
    federalWithholding: Math.round(fedTax),
    federalRatePercent: Math.round(fedRate * 1000) / 10,
    socialSecurityTax: Math.round(ssTax),
    medicareTax: Math.round(medTax),
    stateTax: Math.round(stateTax),
    localTax: Math.round(localTax),
    totalBonusTaxes: Math.round(totalBonusTaxes),
    netTakeHomeBonus: Math.round(netTakeHomeBonus),
    bonusRetentionPercent: Math.round(bonusRetentionPercent * 10) / 10,
  };
}

/**
 * 4. Multi-State Take-Home Paycheck Relocation Comparator
 */
export function calculateRelocationComparison(
  grossSalary: number,
  originStateName: string,
  originTaxRate: number,
  destinations: { name: string; rate: number }[]
): RelocationStateComparisonPoint[] {
  const basePreTax = 0;
  const fedTaxAnnual = computeAnnualFederalTax(Math.max(0, grossSalary - 15000), "single");
  const ficaAnnual = Math.min(grossSalary, SS_WAGE_CAP) * 0.062 + grossSalary * 0.0145;

  const originStateTax = grossSalary * (originTaxRate / 100);
  const originNetAnnual = grossSalary - fedTaxAnnual - ficaAnnual - originStateTax;

  return destinations.map((d) => {
    const destStateTax = grossSalary * (d.rate / 100);
    const destNetAnnual = grossSalary - fedTaxAnnual - ficaAnnual - destStateTax;
    const diff = destNetAnnual - originNetAnnual;

    return {
      stateName: d.name,
      stateTaxRatePercent: d.rate,
      grossSalary: Math.round(grossSalary),
      stateTaxAnnual: Math.round(destStateTax),
      netTakeHomeAnnual: Math.round(destNetAnnual),
      netTakeHomeMonthly: Math.round(destNetAnnual / 12),
      differenceVsOrigin: Math.round(diff),
    };
  });
}

/**
 * 5. Reverse Salary & Target Take-Home Solver
 */
export function calculateReverseSalary(inputs: ReverseSalaryInputs): ReverseSalaryResult {
  const targetNet = Math.abs(inputs.targetNetPerPeriod || 0);
  const periods = FREQUENCY_MULTIPLIERS[inputs.frequency] || 26;
  const taxFraction = Math.min(0.6, Math.max(0.05, (inputs.estimatedTaxAndDeductionPercent || 25) / 100));

  // targetNet = gross * (1 - taxFraction) => gross = targetNet / (1 - taxFraction)
  const requiredGrossPerPeriod = targetNet / (1 - taxFraction);
  const requiredGrossAnnual = requiredGrossPerPeriod * periods;
  const requiredHourlyRate = requiredGrossAnnual / 2080;
  const estimatedTaxesPerPeriod = requiredGrossPerPeriod - targetNet;

  return {
    requiredGrossPerPeriod: Math.round(requiredGrossPerPeriod * 100) / 100,
    requiredGrossAnnual: Math.round(requiredGrossAnnual),
    requiredHourlyRate: Math.round(requiredHourlyRate * 100) / 100,
    estimatedTaxesPerPeriod: Math.round(estimatedTaxesPerPeriod * 100) / 100,
  };
}

/**
 * 6. 50/30/20 Post-Tax Personal Budget Planner
 */
export function calculate503020Budget(netAnnual: number): Budget503020Result {
  const netMonthly = netAnnual / 12;

  const needs50Monthly = netMonthly * 0.50;
  const needs50Annual = netAnnual * 0.50;

  const wants30Monthly = netMonthly * 0.30;
  const wants30Annual = netAnnual * 0.30;

  const savings20Monthly = netMonthly * 0.20;
  const savings20Annual = netAnnual * 0.20;

  return {
    netMonthlyPay: Math.round(netMonthly),
    needs50Monthly: Math.round(needs50Monthly),
    needs50Annual: Math.round(needs50Annual),
    wants30Monthly: Math.round(wants30Monthly),
    wants30Annual: Math.round(wants30Annual),
    savings20Monthly: Math.round(savings20Monthly),
    savings20Annual: Math.round(savings20Annual),
  };
}
