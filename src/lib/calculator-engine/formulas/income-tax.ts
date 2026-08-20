/**
 * Precision US Federal Income Tax & Refund Calculation Engine
 * 
 * Statutory Authorities & Sources:
 * - IRS Revenue Procedure 2025-32 (Tax Year 2026 Inflation Adjustments & Tax Brackets)
 * - IRS Revenue Procedure 2024-40 (Tax Year 2025 Inflation Adjustments & Tax Brackets)
 * - Internal Revenue Code (IRC §§ 1, 24, 63, 164, 1401, 1402)
 * - IRS Form 1040 & Schedule Instructions (Schedules 1, A, C, SE, 8812)
 * - Current Enacted Statutes (including One Big Beautiful Bill Act Provisions for 2025–2028)
 */

export type FilingStatus = 'single' | 'joint' | 'separately' | 'head';
export type TaxYear = '2026' | '2025';

export interface IncomeTaxInput {
  taxYear?: TaxYear;
  filingStatus?: FilingStatus;
  youngDependents?: number; // Age 0-16 (Qualifying child under CTC)
  otherDependents?: number; // Age 17+ (Qualifying relative under ODC)
  age?: number;

  // W-2 & Primary Income
  wagesW2?: number; // Box 1
  fedTaxWithheld?: number; // Box 2
  stateTaxWithheld?: number; // Box 17
  localTaxWithheld?: number; // Box 19

  // Self-Employment & Additional Income
  hasBusinessIncome?: boolean;
  selfEmploymentIncome?: number; // Schedule C Net Profit
  socialSecurityIncome?: number; // SSA-1099
  interestIncome?: number; // 1099-INT
  ordinaryDividends?: number;
  qualifiedDividends?: number; // 1099-DIV (Preferential rates)
  passiveRentalIncome?: number;
  shortTermCapitalGains?: number;
  longTermCapitalGains?: number; // Preferential rates
  otherIncome?: number; // Unemployment, 1099-R
  stateLocalTaxRate?: number; // %

  // Above-the-Line (ATL) Deductions & Enacted Provisions
  tipsIncome?: number; // Max $25,000 deduction
  overtimeIncome?: number; // Max $12,500 Single / $25,000 Joint deduction
  carLoanInterest?: number; // Max $10,000 deduction for qualified vehicle loan
  iraContributions?: number;
  studentLoanInterest?: number; // Max $2,500
  educatorExpenses?: number; // Max $300
  hsaContributions?: number;

  // Itemized (Below-the-Line BTL) Deductions
  mortgageInterest?: number; // Max $750k debt limit
  realEstateTax?: number;
  charitableDonations?: number;
  medicalExpenses?: number; // >7.5% AGI limit
  otherDeductions?: number;

  // Credits
  childCareExpenses?: number; // Child & dependent care expense (Max $3k/1 child, $6k/2+ children)
  student1College?: number;
  student2College?: number;
  student3College?: number;
  student4College?: number;
  collegeEducationExpenses?: number;
  energyPropertyCredits?: number;
  saversCredit?: number;

  currency?: string;
}

export interface TaxBracketBreakdown {
  rate: number;
  bracketMin: number;
  bracketMax: number;
  taxableInBracket: number;
  taxAmount: number;
}

export interface TaxFormStepRow {
  line: string;
  description: string;
  amount: number;
  isHeader?: boolean;
  isTotal?: boolean;
}

export interface FilingStatusComparison {
  status: FilingStatus;
  statusLabel: string;
  standardDeduction: number;
  taxableIncome: number;
  federalTax: number;
  effectiveTaxRate: number;
  refundOrOwed: number;
}

export interface IncomeTaxCalculationResult {
  taxYear: TaxYear;
  filingStatus: FilingStatus;
  totalGrossIncome: number;
  aboveTheLineDeductions: number;
  adjustedGrossIncome: number; // AGI
  standardDeduction: number;
  seniorBonus: number;
  enhancedSeniorDeduction: number;
  itemizedDeductions: number;
  deductionUsed: 'standard' | 'itemized';
  effectiveDeduction: number;
  taxableOrdinaryIncome: number;
  taxablePreferentialIncome: number; // Qualified Div + LT Cap Gains
  totalTaxableIncome: number;
  
  // Tax Computations
  ordinaryIncomeTax: number;
  preferentialIncomeTax: number; // LT Cap Gains / Qualified Div tax
  selfEmploymentTax: number; // SE Tax 15.3% (half deductible)
  totalTaxBeforeCredits: number;
  
  // Credits
  childTaxCredit: number; // CTC (after phaseout)
  otherDependentCredit: number; // ODC (after phaseout)
  totalTaxCredits: number;
  totalTaxLiability: number; // After nonrefundable credits

  // Payments & Refund/Owed
  totalTaxWithheld: number;
  netTaxRefundOrOwed: number; // Positive = Refund, Negative = Amount Owed
  isRefund: boolean;

  // Tax Rates & Ratios
  effectiveTaxRate: number; // (Total Tax / Gross Income) * 100
  marginalTaxBracketRate: number; // % top bracket
  marginalTaxBracketLabel: string;
  takeHomePay: number; // Gross Income - Federal Tax - SE Tax - State/Local Tax

  bracketBreakdown: TaxBracketBreakdown[];
  form1040Summary: TaxFormStepRow[];
  filingStatusComparison: FilingStatusComparison[];
}

// 2026 IRS Federal Tax Brackets (IRS Revenue Procedure 2025-32)
const BRACKETS_2026: Record<FilingStatus, { rate: number; min: number; max: number }[]> = {
  single: [
    { rate: 0.10, min: 0, max: 12400 },
    { rate: 0.12, min: 12400, max: 50400 },
    { rate: 0.22, min: 50400, max: 105700 },
    { rate: 0.24, min: 105700, max: 201775 },
    { rate: 0.32, min: 201775, max: 256225 },
    { rate: 0.35, min: 256225, max: 640600 },
    { rate: 0.37, min: 640600, max: Infinity },
  ],
  joint: [
    { rate: 0.10, min: 0, max: 24800 },
    { rate: 0.12, min: 24800, max: 100800 },
    { rate: 0.22, min: 100800, max: 211400 },
    { rate: 0.24, min: 211400, max: 403550 },
    { rate: 0.32, min: 403550, max: 512450 },
    { rate: 0.35, min: 512450, max: 768700 },
    { rate: 0.37, min: 768700, max: Infinity },
  ],
  separately: [
    { rate: 0.10, min: 0, max: 12400 },
    { rate: 0.12, min: 12400, max: 50400 },
    { rate: 0.22, min: 50400, max: 105700 },
    { rate: 0.24, min: 105700, max: 201775 },
    { rate: 0.32, min: 201775, max: 256225 },
    { rate: 0.35, min: 256225, max: 384350 },
    { rate: 0.37, min: 384350, max: Infinity },
  ],
  head: [
    { rate: 0.10, min: 0, max: 17650 },
    { rate: 0.12, min: 17650, max: 67450 },
    { rate: 0.22, min: 67450, max: 105700 },
    { rate: 0.24, min: 105700, max: 201750 },
    { rate: 0.32, min: 201750, max: 256200 },
    { rate: 0.35, min: 256200, max: 640600 },
    { rate: 0.37, min: 640600, max: Infinity },
  ],
};

// 2025 IRS Federal Tax Brackets (IRS Revenue Procedure 2024-40)
const BRACKETS_2025: Record<FilingStatus, { rate: number; min: number; max: number }[]> = {
  single: [
    { rate: 0.10, min: 0, max: 11925 },
    { rate: 0.12, min: 11925, max: 48475 },
    { rate: 0.22, min: 48475, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250525 },
    { rate: 0.35, min: 250525, max: 626350 },
    { rate: 0.37, min: 626350, max: Infinity },
  ],
  joint: [
    { rate: 0.10, min: 0, max: 23850 },
    { rate: 0.12, min: 23850, max: 96950 },
    { rate: 0.22, min: 96950, max: 206700 },
    { rate: 0.24, min: 206700, max: 394600 },
    { rate: 0.32, min: 394600, max: 501050 },
    { rate: 0.35, min: 501050, max: 751600 },
    { rate: 0.37, min: 751600, max: Infinity },
  ],
  separately: [
    { rate: 0.10, min: 0, max: 11925 },
    { rate: 0.12, min: 11925, max: 48475 },
    { rate: 0.22, min: 48475, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250525 },
    { rate: 0.35, min: 250525, max: 375800 },
    { rate: 0.37, min: 375800, max: Infinity },
  ],
  head: [
    { rate: 0.10, min: 0, max: 17000 },
    { rate: 0.12, min: 17000, max: 64850 },
    { rate: 0.22, min: 64850, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250500 },
    { rate: 0.35, min: 250500, max: 626350 },
    { rate: 0.37, min: 626350, max: Infinity },
  ],
};

// Standard Deductions for 2026 (IRS Rev. Proc. 2025-32)
const STANDARD_DEDUCTIONS_2026: Record<FilingStatus, number> = {
  single: 16100,
  joint: 32200,
  separately: 16100,
  head: 24150,
};

// Standard Deductions for 2025 (Enacted Statutory Law)
const STANDARD_DEDUCTIONS_2025: Record<FilingStatus, number> = {
  single: 15750,
  joint: 31500,
  separately: 15750,
  head: 23625,
};

// SALT Limitations (State and Local Tax Cap)
const SALT_CAPS: Record<TaxYear, { standard: number; separately: number }> = {
  '2026': { standard: 40400, separately: 20200 },
  '2025': { standard: 40000, separately: 20000 },
};

/**
 * Calculates complete US Federal Income Tax Liability, Credits, Deductions, and Refund/Owed
 */
export function calculateIncomeTax(input: IncomeTaxInput): IncomeTaxCalculationResult {
  const {
    taxYear = '2026',
    filingStatus = 'single',
    youngDependents = 0,
    otherDependents = 0,
    age = 30,

    wagesW2 = 85000,
    fedTaxWithheld = 9500,
    stateTaxWithheld = 0,
    localTaxWithheld = 0,

    selfEmploymentIncome = 0,
    socialSecurityIncome = 0,
    interestIncome = 0,
    ordinaryDividends = 0,
    qualifiedDividends = 0,
    passiveRentalIncome = 0,
    shortTermCapitalGains = 0,
    longTermCapitalGains = 0,
    otherIncome = 0,
    stateLocalTaxRate = 0,

    iraContributions = 0,
    studentLoanInterest = 0,
    educatorExpenses = 0,
    hsaContributions = 0,

    mortgageInterest = 0,
    realEstateTax = 0,
    charitableDonations = 0,
    medicalExpenses = 0,
    otherDeductions = 0,

    childCareExpenses = 0,
    collegeEducationExpenses = 0,
    energyPropertyCredits = 0,
    saversCredit = 0,
  } = input;

  const brackets = taxYear === '2026' ? BRACKETS_2026[filingStatus] : BRACKETS_2025[filingStatus];
  const standardDeductionBase = taxYear === '2026' ? STANDARD_DEDUCTIONS_2026[filingStatus] : STANDARD_DEDUCTIONS_2025[filingStatus];

  // 1. Self-Employment Tax (Schedule SE: 12.4% Social Security up to wage base + 2.9% Medicare)
  const netSEProfit = Math.max(0, Number(selfEmploymentIncome) || 0);
  const seTaxableSubject = netSEProfit * 0.9235;
  const ssWageBase = taxYear === '2026' ? 184500 : 176100;
  const seSubjectToSS = Math.min(seTaxableSubject, ssWageBase);
  const selfEmploymentTax = (seSubjectToSS * 0.124) + (seTaxableSubject * 0.029);
  const halfSETaxDeduction = selfEmploymentTax * 0.50; // 50% SE tax is Above-the-line deduction

  // 2. Gross Income Aggregation
  const ssTaxablePortion = Math.max(0, Number(socialSecurityIncome) || 0) * 0.85; // Max 85% SS is taxable
  const totalGrossIncome =
    (Number(wagesW2) || 0) +
    netSEProfit +
    ssTaxablePortion +
    (Number(interestIncome) || 0) +
    (Number(ordinaryDividends) || 0) +
    (Number(qualifiedDividends) || 0) +
    (Number(passiveRentalIncome) || 0) +
    (Number(shortTermCapitalGains) || 0) +
    (Number(longTermCapitalGains) || 0) +
    (Number(otherIncome) || 0);

  // 3. Above-the-Line (ATL) Deductions & Enacted Provisions
  const cappedStudentLoan = Math.min(2500, Math.max(0, Number(studentLoanInterest) || 0));
  const cappedEducator = Math.min(300, Math.max(0, Number(educatorExpenses) || 0));
  const cappedTips = Math.min(25000, Math.max(0, Number(input.tipsIncome) || 0));
  const maxOvertimeCap = filingStatus === 'joint' ? 25000 : 12500;
  const cappedOvertime = Math.min(maxOvertimeCap, Math.max(0, Number(input.overtimeIncome) || 0));
  const cappedCarInterest = Math.min(10000, Math.max(0, Number(input.carLoanInterest) || 0));

  const aboveTheLineDeductions =
    halfSETaxDeduction +
    Math.max(0, Number(iraContributions) || 0) +
    cappedStudentLoan +
    cappedEducator +
    Math.max(0, Number(hsaContributions) || 0) +
    cappedTips +
    cappedOvertime +
    cappedCarInterest;

  // Adjusted Gross Income (AGI)
  const adjustedGrossIncome = Math.max(0, totalGrossIncome - aboveTheLineDeductions);

  // 4. Senior Deductions (Age 65+)
  // A. Traditional Additional Standard Deduction for Age 65+
  let seniorBonus = 0;
  if (age >= 65) {
    if (taxYear === '2026') {
      seniorBonus = (filingStatus === 'single' || filingStatus === 'head') ? 2050 : 1650;
    } else {
      seniorBonus = (filingStatus === 'single' || filingStatus === 'head') ? 2000 : 1600;
    }
  }

  // B. Enhanced Senior Deduction (2025–2028: $6,000 with phaseout)
  let enhancedSeniorDeduction = 0;
  if (age >= 65) {
    const seniorPhaseoutThreshold = filingStatus === 'joint' ? 150000 : 75000;
    const excessIncome = Math.max(0, adjustedGrossIncome - seniorPhaseoutThreshold);
    const seniorReduction = Math.floor(excessIncome / 1000) * 50;
    enhancedSeniorDeduction = Math.max(0, 6000 - seniorReduction);
  }

  const totalStandardDeduction = standardDeductionBase + seniorBonus + enhancedSeniorDeduction;

  // 5. Below-the-Line (Itemized) Deductions (SALT cap: $40,000 / $40,400; MFS $20,000 / $20,200)
  const saltCap = filingStatus === 'separately' ? SALT_CAPS[taxYear].separately : SALT_CAPS[taxYear].standard;
  const totalSaltTaxes = (Number(stateTaxWithheld) || 0) + (Number(localTaxWithheld) || 0) + (Number(realEstateTax) || 0);
  const saltClaimed = Math.min(saltCap, totalSaltTaxes);
  const medicalThreshold = adjustedGrossIncome * 0.075;
  const medicalDeductible = Math.max(0, (Number(medicalExpenses) || 0) - medicalThreshold);

  const itemizedDeductions =
    (Number(mortgageInterest) || 0) +
    saltClaimed +
    (Number(charitableDonations) || 0) +
    medicalDeductible +
    (Number(otherDeductions) || 0);

  // Select larger deduction
  const useItemized = itemizedDeductions > totalStandardDeduction;
  const effectiveDeduction = useItemized ? itemizedDeductions : totalStandardDeduction;
  const deductionUsed = useItemized ? 'itemized' : 'standard';

  // 6. Taxable Income Calculation
  const totalTaxableIncome = Math.max(0, adjustedGrossIncome - effectiveDeduction);

  // Separate Preferential Income (Qualified Dividends + Long-Term Capital Gains) from Ordinary Income
  const preferentialIncome = Math.max(0, (Number(qualifiedDividends) || 0) + (Number(longTermCapitalGains) || 0));
  const taxablePreferentialIncome = Math.min(totalTaxableIncome, preferentialIncome);
  const taxableOrdinaryIncome = Math.max(0, totalTaxableIncome - taxablePreferentialIncome);

  // 7. Ordinary Tax Brackets Computation
  let ordinaryIncomeTax = 0;
  const bracketBreakdown: TaxBracketBreakdown[] = [];
  let marginalRate = 0.10;
  let marginalLabel = "10%";

  brackets.forEach((b) => {
    if (taxableOrdinaryIncome > b.min) {
      const taxableInBracket = Math.min(taxableOrdinaryIncome, b.max) - b.min;
      const taxAmount = taxableInBracket * b.rate;
      ordinaryIncomeTax += taxAmount;

      if (taxableInBracket > 0) {
        marginalRate = b.rate;
        marginalLabel = `${(b.rate * 100).toFixed(0)}%`;
      }

      bracketBreakdown.push({
        rate: b.rate * 100,
        bracketMin: b.min,
        bracketMax: b.max === Infinity ? taxableOrdinaryIncome : b.max,
        taxableInBracket: Number(taxableInBracket.toFixed(2)),
        taxAmount: Number(taxAmount.toFixed(2)),
      });
    }
  });

  // 8. Preferential Tax Computation (0%, 15%, 20% rates for LT Cap Gains & Qualified Divs)
  let preferentialIncomeTax = 0;
  if (taxablePreferentialIncome > 0) {
    let prefThreshold0 = 49450;
    let prefThreshold15 = 545500;

    if (taxYear === '2026') {
      prefThreshold0 = filingStatus === 'joint' ? 98900 : (filingStatus === 'head' ? 66200 : 49450);
      prefThreshold15 = filingStatus === 'joint' ? 613700 : (filingStatus === 'head' ? 579600 : 545500);
    } else {
      prefThreshold0 = filingStatus === 'joint' ? 96700 : (filingStatus === 'head' ? 64750 : 48350);
      prefThreshold15 = filingStatus === 'joint' ? 600050 : (filingStatus === 'head' ? 566700 : 533400);
    }

    let remainingPref = taxablePreferentialIncome;
    let baseOrdinary = taxableOrdinaryIncome;

    if (baseOrdinary < prefThreshold0) {
      const roomIn0 = Math.min(remainingPref, prefThreshold0 - baseOrdinary);
      remainingPref -= roomIn0;
      baseOrdinary += roomIn0;
    }

    if (remainingPref > 0 && baseOrdinary < prefThreshold15) {
      const roomIn15 = Math.min(remainingPref, prefThreshold15 - baseOrdinary);
      preferentialIncomeTax += roomIn15 * 0.15;
      remainingPref -= roomIn15;
      baseOrdinary += roomIn15;
    }

    if (remainingPref > 0) {
      preferentialIncomeTax += remainingPref * 0.20;
    }
  }

  const totalTaxBeforeCredits = ordinaryIncomeTax + preferentialIncomeTax + selfEmploymentTax;

  // 9. Child Tax Credit (CTC) & Credit for Other Dependents (ODC) with Statutory Phaseout
  const rawCTC = Math.max(0, (Number(youngDependents) || 0) * 2200);
  const rawODC = Math.max(0, (Number(otherDependents) || 0) * 500);
  const totalDependentCreditsRaw = rawCTC + rawODC;

  // Phaseout: $50 per $1,000 MAGI over $200k Single / $400k MFJ
  const phaseoutThreshold = filingStatus === 'joint' ? 400000 : 200000;
  const magiExcess = Math.max(0, adjustedGrossIncome - phaseoutThreshold);
  const creditReduction = Math.ceil(magiExcess / 1000) * 50;

  const totalDependentCreditsAfterPhaseout = Math.max(0, totalDependentCreditsRaw - creditReduction);
  
  // Allocate phaseout reduction first to ODC then to CTC
  let otherDependentCredit = 0;
  let childTaxCredit = 0;
  if (totalDependentCreditsRaw > 0) {
    const ratio = totalDependentCreditsAfterPhaseout / totalDependentCreditsRaw;
    otherDependentCredit = rawODC * ratio;
    childTaxCredit = rawCTC * ratio;
  }

  // Child & Dependent Care Credit (20% of up to $3k for 1, $6k for 2+)
  const childCareCap = (youngDependents + otherDependents) >= 2 ? 6000 : 3000;
  const childCareCredit = Math.min(childCareCap, Math.max(0, Number(childCareExpenses) || 0)) * 0.20;

  // College Education Expenses (Students 1-4 AOTC Credit)
  const totalCollegeExpenses =
    (Number(input.student1College) || 0) +
    (Number(input.student2College) || 0) +
    (Number(input.student3College) || 0) +
    (Number(input.student4College) || 0) +
    (Number(collegeEducationExpenses) || 0);

  const collegeCredit = Math.min(10000, totalCollegeExpenses * 0.25);

  const addlCredits =
    childCareCredit +
    collegeCredit +
    Math.max(0, Number(energyPropertyCredits) || 0) +
    Math.max(0, Number(saversCredit) || 0);

  const totalTaxCredits = childTaxCredit + otherDependentCredit + addlCredits;
  const totalTaxLiability = Math.max(0, totalTaxBeforeCredits - totalTaxCredits);

  // 10. Withholdings & Refund / Owed
  const totalTaxWithheld = Number(fedTaxWithheld) || 0;
  const netTaxRefundOrOwed = totalTaxWithheld - totalTaxLiability;
  const isRefund = netTaxRefundOrOwed >= 0;

  // Effective Tax Rate & Take-Home Pay
  const effectiveTaxRate = totalGrossIncome > 0 ? (totalTaxLiability / totalGrossIncome) * 100 : 0;
  const estimatedStateTax = totalGrossIncome * ((Number(stateLocalTaxRate) || 0) / 100);
  const takeHomePay = Math.max(0, totalGrossIncome - totalTaxLiability - (Number(stateTaxWithheld) || estimatedStateTax));

  // Form 1040 Summary Table Data
  const form1040Summary: TaxFormStepRow[] = [
    { line: "1", description: "W-2 Wages & Salary", amount: Number(wagesW2) || 0 },
    { line: "2-8", description: "Business, Capital Gains & Other Income", amount: totalGrossIncome - (Number(wagesW2) || 0) },
    { line: "9", description: "Total Gross Income", amount: totalGrossIncome, isHeader: true },
    { line: "10", description: "Above-the-Line Adjustments to Income", amount: aboveTheLineDeductions },
    { line: "11", description: "Adjusted Gross Income (AGI)", amount: adjustedGrossIncome, isHeader: true },
    { line: "12", description: `${useItemized ? "Itemized" : "Standard"} Deduction`, amount: effectiveDeduction },
    { line: "15", description: "Taxable Income", amount: totalTaxableIncome, isHeader: true },
    { line: "16", description: "Total Tax Before Credits", amount: totalTaxBeforeCredits },
    { line: "19-20", description: "Child & Total Tax Credits", amount: totalTaxCredits },
    { line: "24", description: "Total Federal Tax Liability", amount: totalTaxLiability, isTotal: true },
    { line: "25", description: "Federal Tax Withheld (Box 2)", amount: totalTaxWithheld },
    { line: "34/37", description: isRefund ? "ESTIMATED REFUND" : "ESTIMATED TAX OWED", amount: Math.abs(netTaxRefundOrOwed), isTotal: true },
  ];

  // Side-by-Side Filing Status Comparison
  const filingStatusComparison: FilingStatusComparison[] = [
    calculateScenarioForStatus('single', "Single", input),
    calculateScenarioForStatus('joint', "Married Filing Jointly", input),
    calculateScenarioForStatus('separately', "Married Filing Separately", input),
    calculateScenarioForStatus('head', "Head of Household", input),
  ];

  return {
    taxYear,
    filingStatus,
    totalGrossIncome: Number(totalGrossIncome.toFixed(2)),
    aboveTheLineDeductions: Number(aboveTheLineDeductions.toFixed(2)),
    adjustedGrossIncome: Number(adjustedGrossIncome.toFixed(2)),
    standardDeduction: Number(totalStandardDeduction.toFixed(2)),
    seniorBonus: Number(seniorBonus.toFixed(2)),
    enhancedSeniorDeduction: Number(enhancedSeniorDeduction.toFixed(2)),
    itemizedDeductions: Number(itemizedDeductions.toFixed(2)),
    deductionUsed,
    effectiveDeduction: Number(effectiveDeduction.toFixed(2)),
    taxableOrdinaryIncome: Number(taxableOrdinaryIncome.toFixed(2)),
    taxablePreferentialIncome: Number(taxablePreferentialIncome.toFixed(2)),
    totalTaxableIncome: Number(totalTaxableIncome.toFixed(2)),
    ordinaryIncomeTax: Number(ordinaryIncomeTax.toFixed(2)),
    preferentialIncomeTax: Number(preferentialIncomeTax.toFixed(2)),
    selfEmploymentTax: Number(selfEmploymentTax.toFixed(2)),
    totalTaxBeforeCredits: Number(totalTaxBeforeCredits.toFixed(2)),
    childTaxCredit: Number(childTaxCredit.toFixed(2)),
    otherDependentCredit: Number(otherDependentCredit.toFixed(2)),
    totalTaxCredits: Number(totalTaxCredits.toFixed(2)),
    totalTaxLiability: Number(totalTaxLiability.toFixed(2)),
    totalTaxWithheld: Number(totalTaxWithheld.toFixed(2)),
    netTaxRefundOrOwed: Number(netTaxRefundOrOwed.toFixed(2)),
    isRefund,
    effectiveTaxRate: Number(effectiveTaxRate.toFixed(2)),
    marginalTaxBracketRate: Number((marginalRate * 100).toFixed(0)),
    marginalTaxBracketLabel: marginalLabel,
    takeHomePay: Number(takeHomePay.toFixed(2)),
    bracketBreakdown,
    form1040Summary,
    filingStatusComparison,
  };
}

function calculateScenarioForStatus(
  status: FilingStatus,
  statusLabel: string,
  input: IncomeTaxInput
): FilingStatusComparison {
  const res = calculateIncomeTaxFast({ ...input, filingStatus: status });
  return {
    status,
    statusLabel,
    standardDeduction: res.stdDeduction,
    taxableIncome: res.taxableIncome,
    federalTax: res.taxLiability,
    effectiveTaxRate: res.effectiveRate,
    refundOrOwed: res.refundOrOwed,
  };
}

function calculateIncomeTaxFast(input: IncomeTaxInput): {
  stdDeduction: number;
  taxableIncome: number;
  taxLiability: number;
  effectiveRate: number;
  refundOrOwed: number;
} {
  const year = input.taxYear || '2026';
  const status = input.filingStatus || 'single';
  const gross = (input.wagesW2 || 0) + (input.selfEmploymentIncome || 0) + (input.interestIncome || 0) + (input.ordinaryDividends || 0);

  const stdDeduction = year === '2026' ? STANDARD_DEDUCTIONS_2026[status] : STANDARD_DEDUCTIONS_2025[status];
  const taxableIncome = Math.max(0, gross - stdDeduction);

  const brackets = year === '2026' ? BRACKETS_2026[status] : BRACKETS_2025[status];
  let tax = 0;
  brackets.forEach((b) => {
    if (taxableIncome > b.min) {
      tax += (Math.min(taxableIncome, b.max) - b.min) * b.rate;
    }
  });

  const rawCredits = (input.youngDependents || 0) * 2200;
  const threshold = status === 'joint' ? 400000 : 200000;
  const phaseout = Math.ceil(Math.max(0, gross - threshold) / 1000) * 50;
  const credits = Math.max(0, rawCredits - phaseout);

  const taxLiability = Math.max(0, tax - credits);
  const effectiveRate = gross > 0 ? (taxLiability / gross) * 100 : 0;
  const refundOrOwed = (input.fedTaxWithheld || 0) - taxLiability;

  return {
    stdDeduction: Number(stdDeduction.toFixed(2)),
    taxableIncome: Number(taxableIncome.toFixed(2)),
    taxLiability: Number(taxLiability.toFixed(2)),
    effectiveRate: Number(effectiveRate.toFixed(2)),
    refundOrOwed: Number(refundOrOwed.toFixed(2)),
  };
}
