/**
 * Precision Retirement Engine
 * Supports 4 Modes:
 * 1. Target Nest Egg & Savings Gap Solver ("How much do you need to retire?")
 * 2. Required Savings Goal Accumulation Solver ("How can you save for retirement?")
 * 3. Post-Retirement Income & Withdrawal Solver ("How much can you withdraw?")
 * 4. Nest Egg Longevity & Depletion Solver ("How long can your money last?")
 * Includes 4% withdrawal benchmarking and Age-by-Age Accumulation/Decumulation schedules.
 */

export interface RetirementMode1Input {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentIncome: number;
  incomeIncreaseRate: number; // %/yr
  incomeReplacementPercent: number; // % of income needed in retirement (default 75%)
  investmentReturn: number; // %/yr pre-retirement
  retirementReturn?: number; // %/yr in retirement (defaults to investmentReturn - 1%)
  inflationRate: number; // %/yr
  otherIncomeMonthly?: number; // Social Security, pension ($/mo)
  currentSavings: number;
  futureSavingsPercent: number; // % of income saved annually
}

export interface RetirementMode2Input {
  currentAge: number;
  retirementAge: number;
  targetNestEgg: number;
  currentSavings: number;
  investmentReturn: number;
}

export interface RetirementMode3Input {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentSavings: number;
  annualContribution: number;
  monthlyContribution: number;
  investmentReturn: number;
  inflationRate: number;
}

export interface RetirementMode4Input {
  nestEgg: number;
  monthlyWithdrawal: number;
  investmentReturn: number;
  inflationRate?: number;
}

export interface AgeScheduleRow {
  age: number;
  year: number;
  phase: "Accumulation" | "Retirement";
  startingBalance: number;
  incomeOrWithdrawal: number;
  contributionOrGrowth: number;
  endingBalance: number;
}

export interface RetirementResult {
  mode: number;
  currentAge: number;
  retirementAge: number;
  yearsToRetirement: number;
  yearsInRetirement: number;

  // Mode 1 Results
  targetNestEggAtRetirement: number;
  projectedSavingsAtRetirement: number;
  savingsGapOrSurplus: number;
  annualIncomeNeededAtRetirement: number;
  monthlyIncomeNeededAtRetirement: number;
  fourPercentRuleAnnualIncome: number;

  // Mode 2 Results
  requiredMonthlyContribution?: number;
  requiredAnnualContribution?: number;

  // Mode 3 Results
  maxMonthlyWithdrawalInRetirement?: number;
  maxAnnualWithdrawalInRetirement?: number;

  // Mode 4 Results
  nestEggLongevityYears?: number;
  nestEggLongevityMonths?: number;

  recommendation: string;
  schedule: AgeScheduleRow[];
}

function parseNum(val: unknown, fallback: number): number {
  const n = Number(val);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Mode 1: How much do you need to retire?
 */
export function calculateRetirementMode1(input: RetirementMode1Input): RetirementResult {
  const currentAge = Math.max(18, parseNum(input.currentAge, 35));
  const retirementAge = Math.max(currentAge + 1, parseNum(input.retirementAge, 67));
  const lifeExpectancy = Math.max(retirementAge + 1, parseNum(input.lifeExpectancy, 85));

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;

  const currentIncome = Math.max(0, parseNum(input.currentIncome, 70000));
  const incomeIncreaseRate = parseNum(input.incomeIncreaseRate, 3) / 100;
  const replacementPct = parseNum(input.incomeReplacementPercent, 75) / 100;

  const investmentReturn = parseNum(input.investmentReturn, 6) / 100;
  const retirementReturn = input.retirementReturn !== undefined && Number.isFinite(Number(input.retirementReturn))
    ? Number(input.retirementReturn) / 100
    : Math.max(0.02, investmentReturn - 0.01);
  const inflationRate = parseNum(input.inflationRate, 3) / 100;

  const otherIncomeMonthly = Math.max(0, parseNum(input.otherIncomeMonthly, 0));
  const currentSavings = Math.max(0, parseNum(input.currentSavings, 30000));
  const futureSavingsPct = parseNum(input.futureSavingsPercent, 10) / 100;

  // Project income at retirement age
  const projectedFinalIncome = currentIncome * Math.pow(1 + incomeIncreaseRate, yearsToRetirement);
  const annualGrossNeeded = projectedFinalIncome * replacementPct;
  const annualOtherIncome = otherIncomeMonthly * 12 * Math.pow(1 + inflationRate, yearsToRetirement);
  const netAnnualNeededFromNestEgg = Math.max(0, annualGrossNeeded - annualOtherIncome);

  // Real return rate during retirement
  const realRetirementReturn = (1 + retirementReturn) / (1 + inflationRate) - 1;

  // Present value of annuity for retirement years at real return rate
  let targetNestEgg = 0;
  if (Math.abs(realRetirementReturn) < 1e-7) {
    targetNestEgg = netAnnualNeededFromNestEgg * yearsInRetirement;
  } else {
    targetNestEgg = (netAnnualNeededFromNestEgg * (1 - Math.pow(1 + realRetirementReturn, -yearsInRetirement))) / realRetirementReturn;
  }

  // Project actual savings at retirement age
  let currentBal = currentSavings;
  let runningIncome = currentIncome;
  const schedule: AgeScheduleRow[] = [];
  const currentYear = new Date().getFullYear();

  for (let y = 1; y <= yearsToRetirement; y++) {
    const age = currentAge + y - 1;
    const year = currentYear + y - 1;
    const startBal = currentBal;
    const annualContrib = runningIncome * futureSavingsPct;
    const growth = (startBal + annualContrib / 2) * investmentReturn;
    currentBal = startBal + annualContrib + growth;
    runningIncome *= 1 + incomeIncreaseRate;

    schedule.push({
      age,
      year,
      phase: "Accumulation",
      startingBalance: Number(startBal.toFixed(2)),
      incomeOrWithdrawal: Number(annualContrib.toFixed(2)),
      contributionOrGrowth: Number(growth.toFixed(2)),
      endingBalance: Number(currentBal.toFixed(2)),
    });
  }

  const projectedSavings = currentBal;
  const savingsGap = projectedSavings - targetNestEgg;

  // Decumulation schedule
  let decumBal = projectedSavings;
  let runningWithdrawal = netAnnualNeededFromNestEgg;

  for (let y = 1; y <= yearsInRetirement; y++) {
    const age = retirementAge + y - 1;
    const year = currentYear + yearsToRetirement + y - 1;
    const startBal = decumBal;
    const growth = (startBal - runningWithdrawal / 2) * retirementReturn;
    decumBal = Math.max(0, startBal - runningWithdrawal + growth);

    schedule.push({
      age,
      year,
      phase: "Retirement",
      startingBalance: Number(startBal.toFixed(2)),
      incomeOrWithdrawal: Number(runningWithdrawal.toFixed(2)),
      contributionOrGrowth: Number(growth.toFixed(2)),
      endingBalance: Number(decumBal.toFixed(2)),
    });

    runningWithdrawal *= 1 + inflationRate;
  }

  const fourPercentRuleAnnual = projectedSavings * 0.04;

  let rec = "";
  if (savingsGap >= 0) {
    rec = `ON TRACK! Your projected savings of $${projectedSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })} exceeds your target nest egg of $${targetNestEgg.toLocaleString("en-US", { maximumFractionDigits: 0 })} by $${savingsGap.toLocaleString("en-US", { maximumFractionDigits: 0 })}.`;
  } else {
    const shortfall = Math.abs(savingsGap);
    rec = `SAVINGS GAP ALERT: You are projected to be $${shortfall.toLocaleString("en-US", { maximumFractionDigits: 0 })} short of your $${targetNestEgg.toLocaleString("en-US", { maximumFractionDigits: 0 })} target nest egg. Increase your savings rate or extend retirement age slightly.`;
  }

  return {
    mode: 1,
    currentAge,
    retirementAge,
    yearsToRetirement,
    yearsInRetirement,
    targetNestEggAtRetirement: Number(targetNestEgg.toFixed(2)),
    projectedSavingsAtRetirement: Number(projectedSavings.toFixed(2)),
    savingsGapOrSurplus: Number(savingsGap.toFixed(2)),
    annualIncomeNeededAtRetirement: Number(annualGrossNeeded.toFixed(2)),
    monthlyIncomeNeededAtRetirement: Number((annualGrossNeeded / 12).toFixed(2)),
    fourPercentRuleAnnualIncome: Number(fourPercentRuleAnnual.toFixed(2)),
    recommendation: rec,
    schedule,
  };
}

/**
 * Mode 2: How can you save for retirement? (Goal Accumulation Solver)
 */
export function calculateRetirementMode2(input: RetirementMode2Input): RetirementResult {
  const currentAge = Math.max(18, parseNum(input.currentAge, 35));
  const retirementAge = Math.max(currentAge + 1, parseNum(input.retirementAge, 67));
  const yearsToRetirement = retirementAge - currentAge;

  const targetNestEgg = Math.max(0, parseNum(input.targetNestEgg, 600000));
  const currentSavings = Math.max(0, parseNum(input.currentSavings, 30000));
  const r = parseNum(input.investmentReturn, 6) / 100;

  // Future value of current savings
  const fvCurrent = currentSavings * Math.pow(1 + r, yearsToRetirement);
  const remainingNeeded = Math.max(0, targetNestEgg - fvCurrent);

  let annualContrib = 0;
  if (remainingNeeded > 0) {
    if (Math.abs(r) < 1e-7) {
      annualContrib = remainingNeeded / yearsToRetirement;
    } else {
      annualContrib = (remainingNeeded * r) / (Math.pow(1 + r, yearsToRetirement) - 1);
    }
  }

  const monthlyContrib = annualContrib / 12;

  return {
    mode: 2,
    currentAge,
    retirementAge,
    yearsToRetirement,
    yearsInRetirement: 20,
    targetNestEggAtRetirement: targetNestEgg,
    projectedSavingsAtRetirement: targetNestEgg,
    savingsGapOrSurplus: 0,
    annualIncomeNeededAtRetirement: targetNestEgg * 0.04,
    monthlyIncomeNeededAtRetirement: (targetNestEgg * 0.04) / 12,
    fourPercentRuleAnnualIncome: targetNestEgg * 0.04,
    requiredMonthlyContribution: Number(monthlyContrib.toFixed(2)),
    requiredAnnualContribution: Number(annualContrib.toFixed(2)),
    recommendation: `To hit your target $${targetNestEgg.toLocaleString()} nest egg at age ${retirementAge}, you need to save $${monthlyContrib.toFixed(2)} per month ($${annualContrib.toFixed(2)} per year).`,
    schedule: [],
  };
}

/**
 * Mode 3: How much can you withdraw after retirement?
 */
export function calculateRetirementMode3(input: RetirementMode3Input): RetirementResult {
  const currentAge = Math.max(18, parseNum(input.currentAge, 35));
  const retirementAge = Math.max(currentAge + 1, parseNum(input.retirementAge, 67));
  const lifeExpectancy = Math.max(retirementAge + 1, parseNum(input.lifeExpectancy, 85));
  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;

  const currentSavings = Math.max(0, parseNum(input.currentSavings, 30000));
  const annualContrib = Math.max(0, parseNum(input.annualContribution, 0));
  const monthlyContrib = Math.max(0, parseNum(input.monthlyContribution, 500));
  const r = parseNum(input.investmentReturn, 6) / 100;
  const inflation = parseNum(input.inflationRate, 3) / 100;

  const totalAnnualContrib = annualContrib + monthlyContrib * 12;

  // Accumulation
  let bal = currentSavings;
  for (let y = 1; y <= yearsToRetirement; y++) {
    bal = (bal + totalAnnualContrib) * (1 + r);
  }

  const nestEggAtRetirement = bal;
  const realRetirementReturn = (1 + r) / (1 + inflation) - 1;

  let maxAnnualWithdrawal = 0;
  if (Math.abs(realRetirementReturn) < 1e-7) {
    maxAnnualWithdrawal = nestEggAtRetirement / yearsInRetirement;
  } else {
    maxAnnualWithdrawal = (nestEggAtRetirement * realRetirementReturn) / (1 - Math.pow(1 + realRetirementReturn, -yearsInRetirement));
  }

  const maxMonthlyWithdrawal = maxAnnualWithdrawal / 12;

  return {
    mode: 3,
    currentAge,
    retirementAge,
    yearsToRetirement,
    yearsInRetirement,
    targetNestEggAtRetirement: Number(nestEggAtRetirement.toFixed(2)),
    projectedSavingsAtRetirement: Number(nestEggAtRetirement.toFixed(2)),
    savingsGapOrSurplus: 0,
    annualIncomeNeededAtRetirement: Number(maxAnnualWithdrawal.toFixed(2)),
    monthlyIncomeNeededAtRetirement: Number(maxMonthlyWithdrawal.toFixed(2)),
    fourPercentRuleAnnualIncome: Number((nestEggAtRetirement * 0.04).toFixed(2)),
    maxMonthlyWithdrawalInRetirement: Number(maxMonthlyWithdrawal.toFixed(2)),
    maxAnnualWithdrawalInRetirement: Number(maxAnnualWithdrawal.toFixed(2)),
    recommendation: `Based on your projected $${nestEggAtRetirement.toLocaleString("en-US", { maximumFractionDigits: 0 })} nest egg at age ${retirementAge}, you can safely withdraw $${maxMonthlyWithdrawal.toFixed(2)}/mo ($${maxAnnualWithdrawal.toFixed(2)}/yr) for ${yearsInRetirement} years.`,
    schedule: [],
  };
}

/**
 * Mode 4: How long can your money last? (Nest Egg Longevity Solver)
 */
export function calculateRetirementMode4(input: RetirementMode4Input): RetirementResult {
  const nestEgg = Math.max(0, parseNum(input.nestEgg, 600000));
  const monthlyWithdrawal = Math.max(0, parseNum(input.monthlyWithdrawal, 5000));
  const r = parseNum(input.investmentReturn, 6) / 100;
  const mRate = r / 12;

  let bal = nestEgg;
  let months = 0;

  if (mRate > 0 && monthlyWithdrawal <= bal * mRate) {
    return {
      mode: 4,
      currentAge: 67,
      retirementAge: 67,
      yearsToRetirement: 0,
      yearsInRetirement: 99,
      targetNestEggAtRetirement: nestEgg,
      projectedSavingsAtRetirement: nestEgg,
      savingsGapOrSurplus: 0,
      annualIncomeNeededAtRetirement: monthlyWithdrawal * 12,
      monthlyIncomeNeededAtRetirement: monthlyWithdrawal,
      fourPercentRuleAnnualIncome: nestEgg * 0.04,
      nestEggLongevityYears: 99,
      nestEggLongevityMonths: 999,
      recommendation: "PERPETUAL NEST EGG: Your monthly withdrawal is less than your monthly interest earned! Your nest egg will last indefinitely.",
      schedule: [],
    };
  }

  while (bal > 0 && months < 1200) {
    months++;
    bal = bal * (1 + mRate) - monthlyWithdrawal;
  }

  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  return {
    mode: 4,
    currentAge: 67,
    retirementAge: 67,
    yearsToRetirement: 0,
    yearsInRetirement: years,
    targetNestEggAtRetirement: nestEgg,
    projectedSavingsAtRetirement: nestEgg,
    savingsGapOrSurplus: 0,
    annualIncomeNeededAtRetirement: monthlyWithdrawal * 12,
    monthlyIncomeNeededAtRetirement: monthlyWithdrawal,
    fourPercentRuleAnnualIncome: nestEgg * 0.04,
    nestEggLongevityYears: years,
    nestEggLongevityMonths: remMonths,
    recommendation: `Your $${nestEgg.toLocaleString()} nest egg will last ${years} years and ${remMonths} months at a withdrawal rate of $${monthlyWithdrawal.toLocaleString()}/month.`,
    schedule: [],
  };
}
