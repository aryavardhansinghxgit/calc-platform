/**
 * College Cost & Student Loan Planning Mathematical Engine
 */

export interface CollegeYearSchedule {
  yearNumber: number;
  childAge: number;
  projectedAnnualCost: number;
  startingSavings: number;
  annualContribution: number;
  investmentGrowth: number;
  annualWithdrawal: number;
  endingSavings: number;
  remainingShortfall: number;
}

export interface CollegeCostParams {
  currentAnnualCost: number;
  annualCostInflationPct: number;
  collegeDurationYears: number; // e.g. 4
  yearsUntilCollege: number; // e.g. 10 (or collegeAge - currentAge)
  percentCostsFromSavings: number; // e.g. 100 or 50%
  currentSavings: number;
  monthlySavings: number;
  investmentReturnPct: number;
  taxRateOnReturnPct: number; // 0 for 529 plan
  annualFinancialAid: number;
}

export interface CollegeCostResult {
  totalProjectedCollegeCost: number;
  totalFinancialAid: number;
  netCollegeCost: number;
  targetSavingsAmount: number;
  projectedSavingsAtCollegeStart: number;
  projectedTotalSavingsGrowth: number;
  requiredMonthlySavingsToMeetGoal: number;
  totalOutOfPocketShortfall: number;
  estimatedMonthlyLoanPayment: number;
  totalLoanRepaymentCost: number;
  schedule: CollegeYearSchedule[];
}

/**
 * 1. Comprehensive College Cost & Savings Calculation
 */
export function calculateCollegeCost(params: CollegeCostParams): CollegeCostResult {
  const annualCost = Math.max(0, params.currentAnnualCost);
  const inflation = Math.max(0, params.annualCostInflationPct) / 100;
  const duration = Math.max(1, Math.round(params.collegeDurationYears));
  const prepYears = Math.max(0, params.yearsUntilCollege);
  const targetPct = Math.min(100, Math.max(0, params.percentCostsFromSavings)) / 100;
  const initSavings = Math.max(0, params.currentSavings);
  const monthlyContrib = Math.max(0, params.monthlySavings);
  const nominalReturn = Math.max(0, params.investmentReturnPct) / 100;
  const taxRate = Math.max(0, params.taxRateOnReturnPct) / 100;
  const netReturn = nominalReturn * (1 - taxRate);
  const monthlyNetRate = netReturn / 12;
  const aidPerYear = Math.max(0, params.annualFinancialAid);

  // 1. Calculate projected annual costs for each college year
  let totalGrossCost = 0;
  const yearCosts: number[] = [];
  for (let yr = 1; yr <= duration; yr++) {
    const costForYr = annualCost * Math.pow(1 + inflation, prepYears + yr - 1);
    yearCosts.push(costForYr);
    totalGrossCost += costForYr;
  }

  const totalAid = aidPerYear * duration;
  const netCost = Math.max(0, totalGrossCost - totalAid);
  const targetSavingsGoal = netCost * targetPct;

  // 2. Accumulate savings during preparation years
  let currentBalance = initSavings;
  const prepMonths = prepYears * 12;
  for (let m = 1; m <= prepMonths; m++) {
    currentBalance = currentBalance * (1 + monthlyNetRate) + monthlyContrib;
  }
  const savingsAtStart = currentBalance;

  // 3. Required Monthly Savings to reach targetSavingsGoal
  let requiredMonthlySavings = 0;
  const fvOfInitSavings = initSavings * Math.pow(1 + netReturn, prepYears);
  const shortfallAtStart = Math.max(0, targetSavingsGoal - fvOfInitSavings);
  if (prepMonths > 0 && shortfallAtStart > 0) {
    if (monthlyNetRate === 0) {
      requiredMonthlySavings = shortfallAtStart / prepMonths;
    } else {
      const annuityFactor = (Math.pow(1 + monthlyNetRate, prepMonths) - 1) / monthlyNetRate;
      requiredMonthlySavings = shortfallAtStart / annuityFactor;
    }
  }

  // 4. Generate Year-by-Year Schedule during College
  const schedule: CollegeYearSchedule[] = [];
  let collegeRunningSavings = savingsAtStart;
  let totalShortfall = 0;

  for (let yr = 1; yr <= duration; yr++) {
    const costThisYr = yearCosts[yr - 1] - aidPerYear;
    const startYrSavings = collegeRunningSavings;

    // Mid-year growth on remaining balance
    const growth = (startYrSavings - Math.min(startYrSavings, costThisYr) / 2) * netReturn;
    const availableFunds = startYrSavings + Math.max(0, growth);

    let withdrawal = 0;
    let shortfallThisYr = 0;

    if (availableFunds >= costThisYr) {
      withdrawal = costThisYr;
      collegeRunningSavings = availableFunds - costThisYr;
    } else {
      withdrawal = availableFunds;
      shortfallThisYr = costThisYr - availableFunds;
      collegeRunningSavings = 0;
    }

    totalShortfall += shortfallThisYr;

    schedule.push({
      yearNumber: yr,
      childAge: 18 + yr - 1,
      projectedAnnualCost: yearCosts[yr - 1],
      startingSavings: startYrSavings,
      annualContribution: 0,
      investmentGrowth: Math.max(0, growth),
      annualWithdrawal: withdrawal,
      endingSavings: collegeRunningSavings,
      remainingShortfall: shortfallThisYr,
    });
  }

  // 5. Estimated Student Loan Repayment for Unfunded Shortfall (Standard 10-year loan @ 6.5% APR)
  const loanRate = 0.065 / 12;
  const loanMonths = 120; // 10 years
  let monthlyLoanPmt = 0;
  if (totalShortfall > 0) {
    const f = Math.pow(1 + loanRate, loanMonths);
    monthlyLoanPmt = (totalShortfall * (loanRate * f)) / (f - 1);
  }
  const totalLoanRepayment = monthlyLoanPmt * loanMonths;

  return {
    totalProjectedCollegeCost: totalGrossCost,
    totalFinancialAid: totalAid,
    netCollegeCost: netCost,
    targetSavingsAmount: targetSavingsGoal,
    projectedSavingsAtCollegeStart: savingsAtStart,
    projectedTotalSavingsGrowth: Math.max(0, savingsAtStart - initSavings - monthlyContrib * prepMonths),
    requiredMonthlySavingsToMeetGoal: requiredMonthlySavings,
    totalOutOfPocketShortfall: totalShortfall,
    estimatedMonthlyLoanPayment: monthlyLoanPmt,
    totalLoanRepaymentCost: totalLoanRepayment,
    schedule,
  };
}

/**
 * 2. 529 Plan Tax Advantage Solver
 */
export interface Tax529BenefitResult {
  taxableEndingBalance: number;
  plan529EndingBalance: number;
  totalTaxSavings: number;
  stateTaxDeductionValue: number;
  effectiveAnnualizedBoostPct: number;
}

export function calculate529TaxBenefits(
  annualContribution: number,
  yearsToInvest: number,
  expectedReturnPct: number,
  effectiveTaxBracketPct: number,
  stateTaxDeductionCap: number = 5000,
  stateTaxRatePct: number = 5.0
): Tax529BenefitResult {
  const P = Math.max(0, annualContribution);
  const n = Math.max(1, yearsToInvest);
  const r = Math.max(0, expectedReturnPct) / 100;
  const tax = Math.max(0, effectiveTaxBracketPct) / 100;
  const afterTaxR = r * (1 - tax);

  let bal529 = 0;
  let balTaxable = 0;

  for (let yr = 1; yr <= n; yr++) {
    bal529 = (bal529 + P) * (1 + r);
    balTaxable = (balTaxable + P) * (1 + afterTaxR);
  }

  const taxSavings = Math.max(0, bal529 - balTaxable);
  const stateDeductionPerYear = Math.min(P, stateTaxDeductionCap) * (stateTaxRatePct / 100);
  const totalStateTaxDeduction = stateDeductionPerYear * n;

  return {
    plan529EndingBalance: bal529,
    taxableEndingBalance: balTaxable,
    totalTaxSavings: taxSavings + totalStateTaxDeduction,
    stateTaxDeductionValue: totalStateTaxDeduction,
    effectiveAnnualizedBoostPct: balTaxable > 0 ? ((bal529 - balTaxable) / balTaxable) * 100 : 0,
  };
}

/**
 * 3. Degree Major ROI & Starting Salary vs Debt Analyzer
 */
export interface MajorRoiBenchmark {
  majorName: string;
  avgStartingSalary: number;
  midCareerSalary: number;
  recommendedMaxDebt: number;
  projectedDebtToIncomePct: number;
  monthlyTakeHomePay: number;
  monthlyLoanPayment: number;
  debtBurdenRating: "Low Risk" | "Moderate Burden" | "High Burden" | "Severe Debt Trap";
}

export function calculateMajorRoi(
  totalStudentDebt: number,
  majorSalary: number,
  loanRatePct: number = 6.5,
  termYears: number = 10
): MajorRoiBenchmark {
  const debt = Math.max(0, totalStudentDebt);
  const salary = Math.max(10000, majorSalary);
  const iMonthly = loanRatePct / 100 / 12;
  const nMonths = termYears * 12;

  let pmt = 0;
  if (debt > 0 && iMonthly > 0) {
    const f = Math.pow(1 + iMonthly, nMonths);
    pmt = (debt * (iMonthly * f)) / (f - 1);
  }

  const estMonthlyTakeHome = (salary * 0.75) / 12; // Approx 25% taxes & deductions
  const dti = (debt / salary) * 100;
  const pmtRatio = estMonthlyTakeHome > 0 ? (pmt / estMonthlyTakeHome) * 100 : 0;

  let rating: "Low Risk" | "Moderate Burden" | "High Burden" | "Severe Debt Trap" = "Low Risk";
  if (pmtRatio > 25 || dti > 120) {
    rating = "Severe Debt Trap";
  } else if (pmtRatio > 15 || dti > 80) {
    rating = "High Burden";
  } else if (pmtRatio > 8 || dti > 50) {
    rating = "Moderate Burden";
  }

  return {
    majorName: "Custom Major",
    avgStartingSalary: salary,
    midCareerSalary: salary * 1.7,
    recommendedMaxDebt: salary * 1.0, // 100% of first year salary rule
    projectedDebtToIncomePct: dti,
    monthlyTakeHomePay: estMonthlyTakeHome,
    monthlyLoanPayment: pmt,
    debtBurdenRating: rating,
  };
}

/**
 * 4. College Cost Presets Reference Data (2025-2026 Academic Averages)
 */
export const COLLEGE_COST_PRESETS = [
  { label: "4-Year In-State Public", value: 30990, desc: "Tuition, room & board, fees" },
  { label: "4-Year Out-of-State Public", value: 50920, desc: "Higher non-resident tuition" },
  { label: "4-Year Private Non-Profit", value: 65470, desc: "Private university comprehensive" },
  { label: "2-Year Public Community", value: 21320, desc: "Local commute & tuition" },
  { label: "2+2 Transfer Pathway", value: 26155, desc: "2 yrs Community + 2 yrs In-State" },
];
