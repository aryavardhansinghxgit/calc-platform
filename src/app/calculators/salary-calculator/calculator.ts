import {
  UniversalSalaryInputs,
  UniversalSalaryResult,
  FrequencyConversionRow,
  TakeHomeTaxInputs,
  TakeHomeTaxResult,
  OvertimeBoosterInputs,
  OvertimeBoosterResult,
  CostOfLivingInputs,
  CostOfLivingResult,
  ReverseSalaryInputs,
  ReverseSalaryResult,
} from "./types";

/**
 * 1. Universal Salary & Wage Conversion Matrix (Core Engine)
 */
export function calculateUniversalSalary(inputs: UniversalSalaryInputs): UniversalSalaryResult {
  const amt = Math.abs(inputs.salaryAmount || 0);
  const hpw = Math.max(1, inputs.hoursPerWeek || 40);
  const dpw = Math.max(1, Math.min(7, inputs.daysPerWeek || 5));
  const hpd = hpw / dpw; // hours per day
  const holidays = Math.max(0, inputs.holidaysPerYear || 10);
  const vacation = Math.max(0, inputs.vacationDaysPerYear || 15);

  const totalWorkingDays = 52 * dpw; // 260 for 5 days/week
  const nonWorkingDays = holidays + vacation;
  const adjustedWorkingDays = Math.max(1, totalWorkingDays - nonWorkingDays); // 235 for 10+15

  // First determine base unadjusted hourly wage based on input frequency
  let baseUnadjustedHourly = 0;
  switch (inputs.frequency) {
    case "hourly":
      baseUnadjustedHourly = amt;
      break;
    case "daily":
      baseUnadjustedHourly = hpd > 0 ? amt / hpd : 0;
      break;
    case "weekly":
      baseUnadjustedHourly = hpw > 0 ? amt / hpw : 0;
      break;
    case "biWeekly":
      baseUnadjustedHourly = hpw > 0 ? amt / (2 * hpw) : 0;
      break;
    case "semiMonthly":
      baseUnadjustedHourly = hpw > 0 ? (amt * 24) / (52 * hpw) : 0;
      break;
    case "monthly":
      baseUnadjustedHourly = hpw > 0 ? (amt * 12) / (52 * hpw) : 0;
      break;
    case "quarterly":
      baseUnadjustedHourly = hpw > 0 ? (amt * 4) / (52 * hpw) : 0;
      break;
    case "annually":
    default:
      baseUnadjustedHourly = hpw > 0 ? amt / (52 * hpw) : 0;
      break;
  }

  // Unadjusted calculations (assuming full 52 weeks / 260 days)
  const unadjustedAnnual = baseUnadjustedHourly * hpw * 52;
  const unadjustedMonthly = unadjustedAnnual / 12;
  const unadjustedQuarterly = unadjustedAnnual / 4;
  const unadjustedSemiMonthly = unadjustedAnnual / 24;
  const unadjustedBiWeekly = unadjustedAnnual / 26;
  const unadjustedWeekly = unadjustedAnnual / 52;
  const unadjustedDaily = baseUnadjustedHourly * hpd;
  const unadjustedHourly = baseUnadjustedHourly;

  // Adjusted calculations (subtracting paid holidays and vacation)
  const adjustedAnnual = adjustedWorkingDays * hpd * baseUnadjustedHourly;
  const adjustedMonthly = adjustedAnnual / 12;
  const adjustedQuarterly = adjustedAnnual / 4;
  const adjustedSemiMonthly = adjustedAnnual / 24;
  const adjustedBiWeekly = adjustedAnnual / 26;
  const adjustedWeekly = adjustedAnnual / 52;
  const adjustedDaily = adjustedAnnual / totalWorkingDays;
  const adjustedHourly = adjustedAnnual / (totalWorkingDays * hpd);

  const conversionMatrix: FrequencyConversionRow[] = [
    {
      period: "Hourly",
      unadjustedAmount: Math.round(unadjustedHourly * 100) / 100,
      adjustedAmount: Math.round(adjustedHourly * 100) / 100,
      frequencyDescription: `${hpw} hours/week`,
    },
    {
      period: "Daily",
      unadjustedAmount: Math.round(unadjustedDaily * 100) / 100,
      adjustedAmount: Math.round(adjustedDaily * 100) / 100,
      frequencyDescription: `${Math.round(hpd * 10) / 10} hours/day (${dpw} days/wk)`,
    },
    {
      period: "Weekly",
      unadjustedAmount: Math.round(unadjustedWeekly * 100) / 100,
      adjustedAmount: Math.round(adjustedWeekly * 100) / 100,
      frequencyDescription: "52 paychecks per year",
    },
    {
      period: "Bi-weekly",
      unadjustedAmount: Math.round(unadjustedBiWeekly * 100) / 100,
      adjustedAmount: Math.round(adjustedBiWeekly * 100) / 100,
      frequencyDescription: "26 paychecks per year (every 2 wks)",
    },
    {
      period: "Semi-monthly",
      unadjustedAmount: Math.round(unadjustedSemiMonthly * 100) / 100,
      adjustedAmount: Math.round(adjustedSemiMonthly * 100) / 100,
      frequencyDescription: "24 paychecks per year (twice a month)",
    },
    {
      period: "Monthly",
      unadjustedAmount: Math.round(unadjustedMonthly * 100) / 100,
      adjustedAmount: Math.round(adjustedMonthly * 100) / 100,
      frequencyDescription: "12 paychecks per year",
    },
    {
      period: "Quarterly",
      unadjustedAmount: Math.round(unadjustedQuarterly * 100) / 100,
      adjustedAmount: Math.round(adjustedQuarterly * 100) / 100,
      frequencyDescription: "4 quarters per year",
    },
    {
      period: "Annual",
      unadjustedAmount: Math.round(unadjustedAnnual * 100) / 100,
      adjustedAmount: Math.round(adjustedAnnual * 100) / 100,
      frequencyDescription: "52 full weeks / year",
    },
  ];

  return {
    unadjustedAnnual: Math.round(unadjustedAnnual * 100) / 100,
    adjustedAnnual: Math.round(adjustedAnnual * 100) / 100,
    unadjustedMonthly: Math.round(unadjustedMonthly * 100) / 100,
    adjustedMonthly: Math.round(adjustedMonthly * 100) / 100,
    unadjustedBiWeekly: Math.round(unadjustedBiWeekly * 100) / 100,
    adjustedBiWeekly: Math.round(adjustedBiWeekly * 100) / 100,
    unadjustedHourly: Math.round(unadjustedHourly * 100) / 100,
    adjustedHourly: Math.round(adjustedHourly * 100) / 100,
    totalWorkingDays,
    adjustedWorkingDays,
    conversionMatrix,
  };
}

/**
 * 2. Net Take-Home Pay & Tax Deduction Estimator
 */
export function calculateTakeHomeTax(inputs: TakeHomeTaxInputs): TakeHomeTaxResult {
  const gross = Math.abs(inputs.grossAnnualSalary || 0);
  const preTaxAnnual = Math.abs(inputs.monthlyPreTaxDeductions || 0) * 12;
  const taxableGross = Math.max(0, gross - preTaxAnnual);

  // Standard deduction for 2025/2026
  const standardDeductions = {
    single: 15000,
    married: 30000,
    headOfHousehold: 22500,
  };
  const stdDeduction = standardDeductions[inputs.filingStatus] || 15000;
  const federalTaxableIncome = Math.max(0, taxableGross - stdDeduction);

  // Federal progressive tax brackets for 2025/2026
  let fedTax = 0;
  if (inputs.filingStatus === "married") {
    const brackets = [
      { cap: 23200, rate: 0.10 },
      { cap: 94300, rate: 0.12 },
      { cap: 201050, rate: 0.22 },
      { cap: 383900, rate: 0.24 },
      { cap: 487450, rate: 0.32 },
      { cap: 731200, rate: 0.35 },
      { cap: Infinity, rate: 0.37 },
    ];
    let prev = 0;
    for (const b of brackets) {
      if (federalTaxableIncome > prev) {
        const taxableInBracket = Math.min(federalTaxableIncome, b.cap) - prev;
        fedTax += taxableInBracket * b.rate;
        prev = b.cap;
      }
    }
  } else {
    const brackets = [
      { cap: 11600, rate: 0.10 },
      { cap: 47150, rate: 0.12 },
      { cap: 100525, rate: 0.22 },
      { cap: 191950, rate: 0.24 },
      { cap: 243725, rate: 0.32 },
      { cap: 609350, rate: 0.35 },
      { cap: Infinity, rate: 0.37 },
    ];
    let prev = 0;
    for (const b of brackets) {
      if (federalTaxableIncome > prev) {
        const taxableInBracket = Math.min(federalTaxableIncome, b.cap) - prev;
        fedTax += taxableInBracket * b.rate;
        prev = b.cap;
      }
    }
  }

  // FICA: Social Security (6.2% up to $168,600) + Medicare (1.45% + 0.9% surtax over $200k)
  const ssWageCap = 168600;
  const ssTax = Math.min(gross, ssWageCap) * 0.062;
  const medTax = gross * 0.0145 + Math.max(0, gross - 200000) * 0.009;
  const totalFica = ssTax + medTax;

  // State Income Tax rate approximations
  const stateTaxRates: Record<string, number> = {
    TX: 0.0,
    FL: 0.0,
    WA: 0.0,
    NV: 0.0,
    TN: 0.0,
    WY: 0.0,
    SD: 0.0,
    AK: 0.0,
    CA: 0.065, // Effective average for CA progressive
    NY: 0.055,
    IL: 0.0495, // Flat
    PA: 0.0307, // Flat
    NC: 0.0475,
    GA: 0.0549,
    OH: 0.035,
    MA: 0.05,
    NJ: 0.055,
    VA: 0.0575,
    CO: 0.044,
  };
  const stateRate = stateTaxRates[inputs.stateCode] ?? 0.045;
  const stateTax = taxableGross * stateRate;

  const totalTaxes = fedTax + stateTax + totalFica;
  const netTakeHomeAnnual = Math.max(0, gross - totalTaxes - preTaxAnnual);
  const netTakeHomeMonthly = netTakeHomeAnnual / 12;
  const netTakeHomeBiWeekly = netTakeHomeAnnual / 26;
  const netTakeHomeHourly = netTakeHomeAnnual / 2080;
  const effectiveTaxRatePercent = gross > 0 ? (totalTaxes / gross) * 100 : 0;

  return {
    grossAnnual: gross,
    taxableIncome: Math.round(federalTaxableIncome),
    federalIncomeTax: Math.round(fedTax),
    stateIncomeTax: Math.round(stateTax),
    socialSecurityTax: Math.round(ssTax),
    medicareTax: Math.round(medTax),
    totalFicaTax: Math.round(totalFica),
    totalTaxes: Math.round(totalTaxes),
    preTaxDeductionsAnnual: Math.round(preTaxAnnual),
    netTakeHomeAnnual: Math.round(netTakeHomeAnnual),
    netTakeHomeMonthly: Math.round(netTakeHomeMonthly),
    netTakeHomeBiWeekly: Math.round(netTakeHomeBiWeekly),
    netTakeHomeHourly: Math.round(netTakeHomeHourly * 100) / 100,
    effectiveTaxRatePercent: Math.round(effectiveTaxRatePercent * 10) / 10,
  };
}

/**
 * 3. Overtime & Bonus Booster
 */
export function calculateOvertimeBooster(inputs: OvertimeBoosterInputs): OvertimeBoosterResult {
  const baseRate = Math.abs(inputs.baseHourlyRate || 0);
  const regHrs = Math.max(0, inputs.regularHoursPerWeek || 40);
  const otHrs = Math.max(0, inputs.overtimeHoursPerWeek || 0);
  const dtHrs = Math.max(0, inputs.doubleTimeHoursPerWeek || 0);
  const bonus = Math.abs(inputs.annualBonusCommissions || 0);

  const baseWeeklyPay = baseRate * regHrs;
  const overtimeWeeklyPay = baseRate * 1.5 * otHrs;
  const doubleTimeWeeklyPay = baseRate * 2.0 * dtHrs;
  const totalWeeklyGross = baseWeeklyPay + overtimeWeeklyPay + doubleTimeWeeklyPay;
  const totalAnnualGross = totalWeeklyGross * 52 + bonus;

  const totalHoursWorked = (regHrs + otHrs + dtHrs) * 52;
  const effectiveHourlyRate = totalHoursWorked > 0 ? totalAnnualGross / totalHoursWorked : 0;

  return {
    baseWeeklyPay: Math.round(baseWeeklyPay * 100) / 100,
    overtimeWeeklyPay: Math.round(overtimeWeeklyPay * 100) / 100,
    doubleTimeWeeklyPay: Math.round(doubleTimeWeeklyPay * 100) / 100,
    totalWeeklyGross: Math.round(totalWeeklyGross * 100) / 100,
    totalAnnualGross: Math.round(totalAnnualGross * 100) / 100,
    effectiveHourlyRate: Math.round(effectiveHourlyRate * 100) / 100,
  };
}

/**
 * 4. Cost of Living & Relocation Converter
 */
export const CITY_COLI_INDEX: Record<string, { name: string; index: number; housingIndex: number }> = {
  national_avg: { name: "US National Average", index: 100, housingIndex: 100 },
  austin: { name: "Austin, TX", index: 104, housingIndex: 112 },
  dallas: { name: "Dallas, TX", index: 102, housingIndex: 105 },
  houston: { name: "Houston, TX", index: 96, housingIndex: 92 },
  nyc: { name: "New York, NY (Manhattan/Metro)", index: 185, housingIndex: 280 },
  sf: { name: "San Francisco, CA", index: 175, housingIndex: 260 },
  la: { name: "Los Angeles, CA", index: 145, housingIndex: 195 },
  seattle: { name: "Seattle, WA", index: 148, housingIndex: 200 },
  boston: { name: "Boston, MA", index: 152, housingIndex: 210 },
  chicago: { name: "Chicago, IL", index: 115, housingIndex: 125 },
  miami: { name: "Miami, FL", index: 122, housingIndex: 142 },
  atlanta: { name: "Atlanta, GA", index: 106, housingIndex: 114 },
  denver: { name: "Denver, CO", index: 118, housingIndex: 135 },
  phoenix: { name: "Phoenix, AZ", index: 105, housingIndex: 110 },
};

export function calculateCostOfLiving(inputs: CostOfLivingInputs): CostOfLivingResult {
  const salary = Math.abs(inputs.currentSalary || 0);
  const src = CITY_COLI_INDEX[inputs.sourceCityKey] || CITY_COLI_INDEX.national_avg;
  const tgt = CITY_COLI_INDEX[inputs.targetCityKey] || CITY_COLI_INDEX.nyc;

  const ratio = tgt.index / src.index;
  const equivalentSalary = Math.round(salary * ratio);
  const percentageDifference = Math.round((ratio - 1) * 1000) / 10;
  const housingDeltaPercent = Math.round(((tgt.housingIndex - src.housingIndex) / src.housingIndex) * 1000) / 10;

  return {
    equivalentSalary,
    percentageDifference,
    housingDeltaPercent,
    sourceCityName: src.name,
    targetCityName: tgt.name,
  };
}

/**
 * 5. Reverse Salary Solver
 */
export function calculateReverseSalary(inputs: ReverseSalaryInputs): ReverseSalaryResult {
  const netMonthly = Math.abs(inputs.desiredNetMonthly || 0);
  const netAnnual = netMonthly * 12;
  const taxRate = Math.min(0.8, Math.max(0, (inputs.estimatedTaxRatePercent || 25) / 100));

  const requiredGrossAnnual = taxRate < 1 ? netAnnual / (1 - taxRate) : netAnnual;
  const requiredGrossMonthly = requiredGrossAnnual / 12;

  const hpw = Math.max(1, inputs.hoursPerWeek || 40);
  const totalAnnualHours = hpw * 52;
  const requiredGrossHourly = totalAnnualHours > 0 ? requiredGrossAnnual / totalAnnualHours : 0;

  return {
    requiredGrossAnnual: Math.round(requiredGrossAnnual),
    requiredGrossMonthly: Math.round(requiredGrossMonthly),
    requiredGrossHourly: Math.round(requiredGrossHourly * 100) / 100,
  };
}
