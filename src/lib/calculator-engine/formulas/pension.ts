/**
 * Pension Calculator Engine
 * Fully implementing the 4 core pension modules:
 * 1. Lump Sum Payout vs. Monthly Pension Income (with PV & Breakeven)
 * 2. Single-Life vs. Joint-and-Survivor Pension Payout
 * 3. Work Longer vs. Retire Earlier Trade-Offs
 * 4. Defined Benefit Multiplier Formula Helper
 * Plus Complete Age-by-Age Longevity Projection Schedule.
 */

export interface LumpSumVsPensionInput {
  retirementAge: number;
  lifeExpectancy: number; // default 85
  lumpSumAmount: number;
  investmentReturnPercent: number; // e.g. 5%
  monthlyPension: number;
  colaPercent: number; // e.g. 3.5%
  taxRatePercent?: number; // e.g. 20%
}

export interface SingleVsJointInput {
  retirementAge: number;
  retireeLifeExpectancy: number; // e.g. 77
  spouseAgeAtRetirement: number; // e.g. 62
  spouseLifeExpectancy: number; // e.g. 82
  singleLifeMonthly: number; // e.g. 5000
  jointSurvivorMonthly: number; // e.g. 3000
  survivorBenefitPercent?: number; // 50, 66, 75, 100%
  investmentReturnPercent: number; // e.g. 5%
  colaPercent: number; // e.g. 3.5%
}

export interface WorkLongerInput {
  optionAAge: number; // e.g. 60
  optionAMonthly: number; // e.g. 2500
  optionBAge: number; // e.g. 65
  optionBMonthly: number; // e.g. 3800
  investmentReturnPercent: number; // e.g. 5%
  colaPercent: number; // e.g. 3.5%
  lifeExpectancy?: number; // e.g. 85
}

export interface DbFormulaInput {
  finalSalary: number;
  yearsOfService: number;
  multiplierPercent: number;
}

export interface ScheduleRow {
  year: number;
  age: number;
  spouseAge?: number;
  lumpSumBalance?: number;
  pensionAnnualIncome: number;
  cumulativePensionIncome: number;
  cumulativeLumpSumIncome?: number;
}

export interface PensionResult {
  // Sub-Calc #1: Lump Sum vs Monthly
  lumpSumVsPension: {
    lumpSumAmount: number;
    monthlyPension: number;
    presentValueOfPension: number;
    futureValueOfLumpSum: number;
    totalLifetimePensionIncome: number;
    totalLifetimeLumpSumValue: number;
    breakevenAge: number;
    recommendedOption: "Lump Sum Payout" | "Monthly Pension";
    financialAdvantage: number;
  };

  // Sub-Calc #2: Single Life vs Joint Survivor
  singleVsJoint: {
    singleLifeTotalIncome: number;
    jointSurvivorTotalIncome: number;
    singleLifePV: number;
    jointSurvivorPV: number;
    incomeDifference: number;
    recommendedOption: "Single Life Pension" | "Joint & Survivor Pension";
    survivorProtectionScore: number; // 0-100
  };

  // Sub-Calc #3: Work Longer vs Retire Early
  workLonger: {
    additionalMonthlyPension: number;
    lostRetirementYears: number;
    foregoneEarlyPensionIncome: number;
    optionALifetimeIncome: number;
    optionBLifetimeIncome: number;
    crossoverAge: number;
    recommendedOption: "Retire Earlier (Option A)" | "Work Longer (Option B)";
    netFinancialBenefit: number;
  };

  // DB Multiplier Helper Result
  dbFormula: {
    calculatedMonthlyPension: number;
    calculatedAnnualPension: number;
    incomeReplacementRatio: number;
  };

  // Projection Schedule for Charts & Tables
  projectionSchedule: ScheduleRow[];
}

/**
 * Zero-safe number extraction
 */
function safeNum(val: number | undefined | null, fallback: number): number {
  if (val !== undefined && val !== null && !isNaN(Number(val))) {
    return Number(val);
  }
  return fallback;
}

/**
 * Present Value of Annuity with Annual COLA & Discount Rate
 * PV = Σ [PMT * 12 * (1 + COLA)^(t-1) / (1 + r)^t] for t = 1..years
 */
export function calculatePresentValueAnnuity(
  monthlyIncome: number,
  years: number,
  discountRatePercent: number,
  colaPercent: number
): number {
  const r = discountRatePercent / 100;
  const c = colaPercent / 100;
  let pv = 0;

  for (let t = 1; t <= years; t++) {
    const annualIncome = monthlyIncome * 12 * Math.pow(1 + c, t - 1);
    const discountedValue = r === 0 ? annualIncome : annualIncome / Math.pow(1 + r, t);
    pv += discountedValue;
  }

  return Number(pv.toFixed(2));
}

/**
 * Main Pension Calculation Suite Function
 */
export function calculatePensionSuite(
  lumpSumInput: LumpSumVsPensionInput,
  singleVsJointInput: SingleVsJointInput,
  workLongerInput: WorkLongerInput,
  dbInput: DbFormulaInput
): PensionResult {
  // -------------------------------------------------------------
  // 1. SUB-CALCULATOR #1: Lump Sum vs Monthly Pension Income
  // -------------------------------------------------------------
  const retAge1 = Math.max(18, Math.min(100, safeNum(lumpSumInput.retirementAge, 65)));
  const rawLifeExp1 = safeNum(lumpSumInput.lifeExpectancy, 85);
  const lifeExp1 = Math.max(retAge1, Math.min(115, rawLifeExp1));
  const pensionYears1 = Math.max(0, lifeExp1 - retAge1);

  const lumpSumAmt = Math.max(0, safeNum(lumpSumInput.lumpSumAmount, 800000));
  const monthlyPen1 = Math.max(0, safeNum(lumpSumInput.monthlyPension, 5000));
  const returnRate1 = Math.max(0, Math.min(100, safeNum(lumpSumInput.investmentReturnPercent, 5.0)));
  const cola1 = Math.max(0, Math.min(50, safeNum(lumpSumInput.colaPercent, 3.5)));

  const pvPension1 = calculatePresentValueAnnuity(monthlyPen1, pensionYears1, returnRate1, cola1);
  const fvLumpSum1 = Number((lumpSumAmt * Math.pow(1 + returnRate1 / 100, pensionYears1)).toFixed(2));

  // Lifetime Cumulative Pension Income calculation
  let totalLifetimePension = 0;
  let currentAnnualPension = monthlyPen1 * 12;
  for (let y = 0; y < pensionYears1; y++) {
    totalLifetimePension += currentAnnualPension;
    currentAnnualPension *= (1 + cola1 / 100);
  }
  totalLifetimePension = Number(totalLifetimePension.toFixed(2));

  // Breakeven Crossover Age where cumulative pension surpasses invested lump sum balance
  let breakevenAge1 = retAge1;
  let simLumpSum = lumpSumAmt;
  let cumulativePensionSim = 0;
  let simAnnualP = monthlyPen1 * 12;
  let foundBreakeven = false;

  for (let age = retAge1; age <= 115; age++) {
    simLumpSum = simLumpSum * (1 + returnRate1 / 100);
    cumulativePensionSim += simAnnualP;
    simAnnualP *= (1 + cola1 / 100);

    if (cumulativePensionSim >= simLumpSum && !foundBreakeven) {
      breakevenAge1 = age;
      foundBreakeven = true;
    }
  }

  if (!foundBreakeven) {
    breakevenAge1 = retAge1 + 22; // Fallback reference age
  }

  const rec1 = totalLifetimePension > lumpSumAmt ? "Monthly Pension" : "Lump Sum Payout";
  const advantage1 = Math.abs(totalLifetimePension - lumpSumAmt);

  // -------------------------------------------------------------
  // 2. SUB-CALCULATOR #2: Single Life vs Joint Survivor Pension Payout
  // -------------------------------------------------------------
  const retAge2 = Math.max(18, Math.min(100, safeNum(singleVsJointInput.retirementAge, 65)));
  const rawRetLifeExp2 = safeNum(singleVsJointInput.retireeLifeExpectancy, 77);
  const retireeLifeExp2 = Math.max(retAge2, Math.min(115, rawRetLifeExp2));
  const spouseAge2 = Math.max(18, Math.min(100, safeNum(singleVsJointInput.spouseAgeAtRetirement, 62)));
  const rawSpouseLifeExp2 = safeNum(singleVsJointInput.spouseLifeExpectancy, 82);
  const spouseLifeExp2 = Math.max(spouseAge2, Math.min(115, rawSpouseLifeExp2));

  const singleMonthly2 = Math.max(0, safeNum(singleVsJointInput.singleLifeMonthly, 5000));
  const jointMonthly2 = Math.max(0, safeNum(singleVsJointInput.jointSurvivorMonthly, 3000));
  const survivorPct2 = Math.max(0, Math.min(100, safeNum(singleVsJointInput.survivorBenefitPercent, 100))) / 100;
  const returnRate2 = Math.max(0, Math.min(100, safeNum(singleVsJointInput.investmentReturnPercent, 5.0)));
  const cola2 = Math.max(0, Math.min(50, safeNum(singleVsJointInput.colaPercent, 3.5)));

  const retireeYears2 = Math.max(0, retireeLifeExp2 - retAge2);
  const spouseSurvivorYears2 = Math.max(0, spouseLifeExp2 - (spouseAge2 + retireeYears2));

  // Single Life Cumulative Income (Stops at retiree death)
  let singleTotalIncome = 0;
  let currentSingleAnnual = singleMonthly2 * 12;
  for (let y = 0; y < retireeYears2; y++) {
    singleTotalIncome += currentSingleAnnual;
    currentSingleAnnual *= (1 + cola2 / 100);
  }

  // Joint Survivor Cumulative Income (Retiree lifetime + Spouse survivor lifetime)
  let jointTotalIncome = 0;
  let currentJointAnnual = jointMonthly2 * 12;

  // Retiree lifetime
  for (let y = 0; y < retireeYears2; y++) {
    jointTotalIncome += currentJointAnnual;
    currentJointAnnual *= (1 + cola2 / 100);
  }

  // Spouse survivor lifetime
  let survivorAnnual = currentJointAnnual * survivorPct2;
  for (let y = 0; y < spouseSurvivorYears2; y++) {
    jointTotalIncome += survivorAnnual;
    survivorAnnual *= (1 + cola2 / 100);
  }

  const singleLifePV = calculatePresentValueAnnuity(singleMonthly2, retireeYears2, returnRate2, cola2);
  const jointSurvivorPV = calculatePresentValueAnnuity(
    jointMonthly2,
    retireeYears2 + spouseSurvivorYears2,
    returnRate2,
    cola2
  );

  const diff2 = Number((jointTotalIncome - singleTotalIncome).toFixed(2));
  const rec2 = jointTotalIncome >= singleTotalIncome ? "Joint & Survivor Pension" : "Single Life Pension";
  const survivorProtectionScore =
    singleMonthly2 > 0 ? Math.min(100, Math.round((jointMonthly2 / singleMonthly2) * 100)) : 0;

  // -------------------------------------------------------------
  // 3. SUB-CALCULATOR #3: Work Longer vs Retire Earlier Comparison
  // -------------------------------------------------------------
  const optAAge = Math.max(18, Math.min(99, safeNum(workLongerInput.optionAAge, 60)));
  const optAMonthly = Math.max(0, safeNum(workLongerInput.optionAMonthly, 2500));
  const rawOptBAge = safeNum(workLongerInput.optionBAge, 65);
  const optBAge = Math.max(optAAge, Math.min(100, rawOptBAge));
  const optBMonthly = Math.max(0, safeNum(workLongerInput.optionBMonthly, 3800));

  const returnRate3 = Math.max(0, Math.min(100, safeNum(workLongerInput.investmentReturnPercent, 5.0)));
  const cola3 = Math.max(0, Math.min(50, safeNum(workLongerInput.colaPercent, 3.5)));
  const rawMaxLife3 = safeNum(workLongerInput.lifeExpectancy, 85);
  const maxLife3 = Math.max(optBAge, Math.min(115, rawMaxLife3));

  const additionalMonthly = Number((optBMonthly - optAMonthly).toFixed(2));
  const lostYears = optBAge - optAAge;

  // Foregone early pension income during extra working years (Option A collected while Option B works)
  let foregoneIncome = 0;
  let tempAnnualA = optAMonthly * 12;
  for (let y = 0; y < lostYears; y++) {
    foregoneIncome += tempAnnualA;
    tempAnnualA *= (1 + cola3 / 100);
  }
  foregoneIncome = Number(foregoneIncome.toFixed(2));

  // Option A total lifetime income from optAAge to maxLife3
  let optionATotal = 0;
  let annualA = optAMonthly * 12;
  for (let age = optAAge; age < maxLife3; age++) {
    optionATotal += annualA;
    annualA *= (1 + cola3 / 100);
  }

  // Option B total lifetime income from optBAge to maxLife3
  let optionBTotal = 0;
  let annualB = optBMonthly * 12;
  for (let age = optBAge; age < maxLife3; age++) {
    optionBTotal += annualB;
    annualB *= (1 + cola3 / 100);
  }

  // Find Crossover Age where Option B cumulative income exceeds Option A
  let crossoverAge = optBAge;
  let cumA = 0;
  let cumB = 0;
  let curA = optAMonthly * 12;
  let curB = optBMonthly * 12;
  let foundCrossover = false;

  for (let age = optAAge; age <= 100; age++) {
    cumA += curA;
    curA *= (1 + cola3 / 100);

    if (age >= optBAge) {
      cumB += curB;
      curB *= (1 + cola3 / 100);
    }

    if (cumB >= cumA && !foundCrossover) {
      crossoverAge = age;
      foundCrossover = true;
    }
  }

  const rec3 = optionBTotal >= optionATotal ? "Work Longer (Option B)" : "Retire Earlier (Option A)";
  const netBenefit3 = Math.abs(optionBTotal - optionATotal);

  // -------------------------------------------------------------
  // 4. DEFINED BENEFIT MULTIPLIER HELPER
  // -------------------------------------------------------------
  const fas = Math.max(0, safeNum(dbInput.finalSalary, 80000));
  const serviceYrs = Math.max(0, safeNum(dbInput.yearsOfService, 25));
  const multPct = Math.max(0, safeNum(dbInput.multiplierPercent, 2.0)) / 100;

  const dbAnnual = Number((fas * serviceYrs * multPct).toFixed(2));
  const dbMonthly = Number((dbAnnual / 12).toFixed(2));
  const replacementRatio = fas > 0 ? Number(((dbAnnual / fas) * 100).toFixed(1)) : 0;

  // -------------------------------------------------------------
  // 5. PROJECTION SCHEDULE GENERATOR (Up to Age 95)
  // -------------------------------------------------------------
  const projectionSchedule: ScheduleRow[] = [];
  let schedLumpBal = lumpSumAmt;
  let schedCumPension = 0;
  let schedAnnualP = monthlyPen1 * 12;
  const currentYear = new Date().getFullYear();

  for (let age = retAge1; age <= 95; age++) {
    const yr = currentYear + (age - retAge1);
    schedLumpBal = schedLumpBal * (1 + returnRate1 / 100);
    schedCumPension += schedAnnualP;

    projectionSchedule.push({
      year: yr,
      age: age,
      spouseAge: spouseAge2 + (age - retAge2),
      lumpSumBalance: Number(schedLumpBal.toFixed(2)),
      pensionAnnualIncome: Number(schedAnnualP.toFixed(2)),
      cumulativePensionIncome: Number(schedCumPension.toFixed(2)),
    });

    schedAnnualP *= (1 + cola1 / 100);
  }

  return {
    lumpSumVsPension: {
      lumpSumAmount: lumpSumAmt,
      monthlyPension: monthlyPen1,
      presentValueOfPension: pvPension1,
      futureValueOfLumpSum: fvLumpSum1,
      totalLifetimePensionIncome: totalLifetimePension,
      totalLifetimeLumpSumValue: fvLumpSum1,
      breakevenAge: breakevenAge1,
      recommendedOption: rec1,
      financialAdvantage: Number(advantage1.toFixed(2)),
    },
    singleVsJoint: {
      singleLifeTotalIncome: Number(singleTotalIncome.toFixed(2)),
      jointSurvivorTotalIncome: Number(jointTotalIncome.toFixed(2)),
      singleLifePV,
      jointSurvivorPV,
      incomeDifference: diff2,
      recommendedOption: rec2,
      survivorProtectionScore,
    },
    workLonger: {
      additionalMonthlyPension: additionalMonthly,
      lostRetirementYears: lostYears,
      foregoneEarlyPensionIncome: foregoneIncome,
      optionALifetimeIncome: Number(optionATotal.toFixed(2)),
      optionBLifetimeIncome: Number(optionBTotal.toFixed(2)),
      crossoverAge,
      recommendedOption: rec3,
      netFinancialBenefit: Number(netBenefit3.toFixed(2)),
    },
    dbFormula: {
      calculatedMonthlyPension: dbMonthly,
      calculatedAnnualPension: dbAnnual,
      incomeReplacementRatio: replacementRatio,
    },
    projectionSchedule,
  };
}
