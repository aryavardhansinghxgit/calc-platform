/**
 * Social Security Formula Engine
 * Fully implementing Calculator.net's 2 reference modules:
 * 1. Determine Ideal Social Security Claim Age
 * 2. Compare Two Application Ages
 * Plus Full Retirement Age (FRA) scale, Spousal/Survivor Benefit estimator,
 * Combined Income Taxability calculator, and Lifetime Projection Schedule.
 */

export interface IdealClaimAgeInput {
  birthYear: number;
  lifeExpectancy: number; // e.g. 83
  investmentReturnPercent: number; // e.g. 5.0%
  colaPercent: number; // e.g. 3.0%
  estimatedFraMonthlyBenefit?: number; // e.g. 2200
}

export interface CompareTwoAgesInput {
  optionAAge: number; // e.g. 62
  optionAMonthly: number; // e.g. 1600
  optionBAge: number; // e.g. 70
  optionBMonthly: number; // e.g. 2810
  investmentReturnPercent: number; // e.g. 5.0%
  colaPercent: number; // e.g. 3.0%
  lifeExpectancy?: number; // e.g. 83
}

export interface SpousalTaxabilityInput {
  workerFraBenefit: number; // e.g. 2500
  spouseClaimingAge: number; // 62 to 70
  filingStatus: "single" | "married_joint";
  otherIncomeAnnual: number; // AGI + non-taxable interest
}

export interface SocialSecurityScheduleRow {
  year: number;
  age: number;
  monthlyBenefitA: number;
  annualBenefitA: number;
  cumulativeBenefitA: number;
  monthlyBenefitB?: number;
  annualBenefitB?: number;
  cumulativeBenefitB?: number;
}

export interface SocialSecurityResult {
  // Full Retirement Age Details
  fraDetails: {
    birthYear: number;
    fullRetirementAgeYears: number;
    fullRetirementAgeMonths: number;
    fraDisplay: string;
  };

  // Module 1: Ideal Claim Age
  idealClaimAge: {
    recommendedAge: number;
    recommendedMonthlyBenefit: number;
    lifetimeBenefit62: number;
    lifetimeBenefitFra: number;
    lifetimeBenefit70: number;
    lifetimeBenefitRecommended: number;
    delayedClaimingAdvantage: number;
    breakevenAgeVs62: number;
  };

  // Module 2: Compare Two Application Ages
  compareTwoAges: {
    optionAAge: number;
    optionAMonthly: number;
    optionALifetimeTotal: number;
    optionBAge: number;
    optionBMonthly: number;
    optionBLifetimeTotal: number;
    lifetimeDifference: number;
    breakevenAge: number;
    recommendedOption: string;
    financialAdvantage: number;
  };

  // Spousal & Taxability Helper Results
  spousalAndTax: {
    maxSpousalMonthly: number;
    actualSpousalMonthly: number;
    survivorMonthlyEstimate: number;
    combinedIncome: number;
    taxablePercentage: 0 | 50 | 85;
    estimatedTaxableBenefitsAnnual: number;
  };

  // Projection Schedule for Charts
  projectionSchedule: SocialSecurityScheduleRow[];
}

/**
 * Determine Full Retirement Age (FRA) based on Birth Year
 */
export function getFullRetirementAge(birthYear: number): { years: number; months: number; display: string } {
  if (birthYear <= 1937) return { years: 65, months: 0, display: "65 years" };
  if (birthYear === 1938) return { years: 65, months: 2, display: "65 yrs 2 mos" };
  if (birthYear === 1939) return { years: 65, months: 4, display: "65 yrs 4 mos" };
  if (birthYear === 1940) return { years: 65, months: 6, display: "65 yrs 6 mos" };
  if (birthYear === 1941) return { years: 65, months: 8, display: "65 yrs 8 mos" };
  if (birthYear === 1942) return { years: 65, months: 10, display: "65 yrs 10 mos" };
  if (birthYear >= 1943 && birthYear <= 1954) return { years: 66, months: 0, display: "66 years" };
  if (birthYear === 1955) return { years: 66, months: 2, display: "66 yrs 2 mos" };
  if (birthYear === 1956) return { years: 66, months: 4, display: "66 yrs 4 mos" };
  if (birthYear === 1957) return { years: 66, months: 6, display: "66 yrs 6 mos" };
  if (birthYear === 1958) return { years: 66, months: 8, display: "66 yrs 8 mos" };
  if (birthYear === 1959) return { years: 66, months: 10, display: "66 yrs 10 mos" };
  return { years: 67, months: 0, display: "67 years" };
}

/**
 * Calculate Monthly Benefit Adjustment Factor based on Claiming Age relative to FRA (Age 67 baseline)
 */
export function getBenefitAdjustmentFactor(claimAge: number, fraYears: number = 67): number {
  if (claimAge === fraYears) return 1.0;

  if (claimAge < fraYears) {
    // Early claiming reduction
    const monthsEarly = (fraYears - claimAge) * 12;
    if (monthsEarly <= 36) {
      return 1 - monthsEarly * (5 / 9 / 100);
    } else {
      const first36 = 36 * (5 / 9 / 100);
      const remaining = (monthsEarly - 36) * (5 / 12 / 100);
      return 1 - (first36 + remaining);
    }
  } else {
    // Delayed claiming credits (8% per year up to age 70)
    const yearsDelayed = Math.min(3, claimAge - fraYears);
    return 1 + yearsDelayed * 0.08;
  }
}

/**
 * Main Social Security Calculation Suite
 */
export function calculateSocialSecuritySuite(
  idealInput: IdealClaimAgeInput,
  compareInput: CompareTwoAgesInput,
  spousalInput: SpousalTaxabilityInput
): SocialSecurityResult {
  // -------------------------------------------------------------
  // 1. FULL RETIREMENT AGE (FRA) DETAILS
  // -------------------------------------------------------------
  const birthYear = Math.max(1930, Math.min(2010, Number(idealInput.birthYear || 1970)));
  const fra = getFullRetirementAge(birthYear);
  const fraDecimal = fra.years + fra.months / 12;

  const lifeExp = Math.max(65, Math.min(105, Number(idealInput.lifeExpectancy || 83)));
  const discountRate = Math.max(0, Math.min(20, Number(idealInput.investmentReturnPercent || 5.0))) / 100;
  const colaRate = Math.max(0, Math.min(15, Number(idealInput.colaPercent || 3.0))) / 100;
  const fraMonthlyBenefit = Math.max(500, Number(idealInput.estimatedFraMonthlyBenefit || 2200));

  // -------------------------------------------------------------
  // 2. MODULE 1: Ideal Social Security Claim Age Optimizer
  // -------------------------------------------------------------
  let bestAge = 62;
  let maxLifetimeValue = 0;

  const lifetimeBenefitsByAge: Record<number, number> = {};

  for (let claimAge = 62; claimAge <= 70; claimAge++) {
    const factor = getBenefitAdjustmentFactor(claimAge, fra.years);
    const startMonthly = fraMonthlyBenefit * factor;
    const claimYears = Math.max(0, lifeExp - claimAge);

    let cumulativeVal = 0;
    let annualP = startMonthly * 12;

    for (let y = 0; y < claimYears; y++) {
      // Apply discount rate and COLA rate to calculate present/future lifetime value
      const presentVal = annualP / Math.pow(1 + discountRate, y);
      cumulativeVal += presentVal;
      annualP *= (1 + colaRate);
    }

    cumulativeVal = Number(cumulativeVal.toFixed(2));
    lifetimeBenefitsByAge[claimAge] = cumulativeVal;

    if (cumulativeVal > maxLifetimeValue) {
      maxLifetimeValue = cumulativeVal;
      bestAge = claimAge;
    }
  }

  const lifetime62 = lifetimeBenefitsByAge[62] || 0;
  const lifetimeFra = lifetimeBenefitsByAge[fra.years] || 0;
  const lifetime70 = lifetimeBenefitsByAge[70] || 0;

  const recommendedFactor = getBenefitAdjustmentFactor(bestAge, fra.years);
  const recommendedMonthly = Number((fraMonthlyBenefit * recommendedFactor).toFixed(2));
  const delayedAdvantage = Number((lifetime70 - lifetime62).toFixed(2));

  // Find breakeven age between claiming at 62 vs claiming at 70
  let breakevenVs62 = 78;
  let cum62Sim = 0;
  let cum70Sim = 0;
  let p62Sim = fraMonthlyBenefit * getBenefitAdjustmentFactor(62, fra.years) * 12;
  let p70Sim = fraMonthlyBenefit * getBenefitAdjustmentFactor(70, fra.years) * 12;

  for (let age = 62; age <= 100; age++) {
    cum62Sim += p62Sim;
    p62Sim *= (1 + colaRate);

    if (age >= 70) {
      cum70Sim += p70Sim;
      p70Sim *= (1 + colaRate);
    }

    if (cum70Sim >= cum62Sim && breakevenVs62 === 78) {
      breakevenVs62 = age;
    }
  }

  // -------------------------------------------------------------
  // 3. MODULE 2: Compare Two Application Ages
  // -------------------------------------------------------------
  const optAAge = Math.max(62, Math.min(70, Number(compareInput.optionAAge || 62)));
  const optAMonthly = Math.max(0, Number(compareInput.optionAMonthly || 1600));
  const optBAge = Math.max(optAAge + 1, Math.min(70, Number(compareInput.optionBAge || 70)));
  const optBMonthly = Math.max(0, Number(compareInput.optionBMonthly || 2810));

  const compareLifeExp = Math.max(optBAge + 1, Math.min(105, Number(compareInput.lifeExpectancy || lifeExp)));
  const compareReturn = Math.max(0, Math.min(20, Number(compareInput.investmentReturnPercent || 5.0))) / 100;
  const compareCola = Math.max(0, Math.min(15, Number(compareInput.colaPercent || 3.0))) / 100;

  // Option A lifetime benefit math
  let totalOptA = 0;
  let annualA = optAMonthly * 12;
  for (let age = optAAge; age < compareLifeExp; age++) {
    totalOptA += annualA;
    annualA *= (1 + compareCola);
  }
  totalOptA = Number(totalOptA.toFixed(2));

  // Option B lifetime benefit math
  let totalOptB = 0;
  let annualB = optBMonthly * 12;
  for (let age = optBAge; age < compareLifeExp; age++) {
    totalOptB += annualB;
    annualB *= (1 + compareCola);
  }
  totalOptB = Number(totalOptB.toFixed(2));

  // Find Crossover Breakeven Age between Option A and Option B
  let breakevenAgeAB = optBAge;
  let cumA = 0;
  let cumB = 0;
  let curA = optAMonthly * 12;
  let curB = optBMonthly * 12;

  for (let age = optAAge; age <= 100; age++) {
    cumA += curA;
    curA *= (1 + compareCola);

    if (age >= optBAge) {
      cumB += curB;
      curB *= (1 + compareCola);
    }

    if (cumB >= cumA && breakevenAgeAB === optBAge) {
      breakevenAgeAB = age;
    }
  }

  const recAB = totalOptB >= totalOptA ? `Option B (Claim at Age ${optBAge})` : `Option A (Claim at Age ${optAAge})`;
  const advantageAB = Number(Math.abs(totalOptB - totalOptA).toFixed(2));

  // -------------------------------------------------------------
  // 4. SPOUSAL, SURVIVOR & TAXABILITY HELPER
  // -------------------------------------------------------------
  const workerFra = Math.max(0, Number(spousalInput.workerFraBenefit || 2500));
  const spouseAge = Math.max(62, Math.min(70, Number(spousalInput.spouseClaimingAge || 67)));
  const spouseFactor = getBenefitAdjustmentFactor(spouseAge, 67);

  const maxSpousalMonthly = Number((workerFra * 0.50).toFixed(2));
  const actualSpousalMonthly = Number((maxSpousalMonthly * Math.min(1.0, spouseFactor)).toFixed(2));
  const survivorMonthlyEstimate = Number((workerFra * 1.0).toFixed(2));

  // Taxability Combined Income calculation
  const otherInc = Math.max(0, Number(spousalInput.otherIncomeAnnual || 30000));
  const annualSsBenefit = recommendedMonthly * 12;
  const combinedIncome = Number((otherInc + annualSsBenefit * 0.50).toFixed(2));

  let taxablePercentage: 0 | 50 | 85 = 0;
  if (spousalInput.filingStatus === "single") {
    if (combinedIncome > 34000) taxablePercentage = 85;
    else if (combinedIncome > 25000) taxablePercentage = 50;
  } else {
    if (combinedIncome > 44000) taxablePercentage = 85;
    else if (combinedIncome > 32000) taxablePercentage = 50;
  }

  const estimatedTaxableBenefitsAnnual = Number((annualSsBenefit * (taxablePercentage / 100)).toFixed(2));

  // -------------------------------------------------------------
  // 5. PROJECTION SCHEDULE GENERATOR (Up to Age 100)
  // -------------------------------------------------------------
  const projectionSchedule: SocialSecurityScheduleRow[] = [];
  const currentYear = new Date().getFullYear();

  let cumSchedA = 0;
  let cumSchedB = 0;
  let curSchedA = optAMonthly * 12;
  let curSchedB = optBMonthly * 12;

  for (let age = 62; age <= 95; age++) {
    const yr = currentYear + (age - 62);
    const mBenefitA = age >= optAAge ? Number((curSchedA / 12).toFixed(2)) : 0;
    const annBenefitA = age >= optAAge ? Number(curSchedA.toFixed(2)) : 0;
    cumSchedA += annBenefitA;

    const mBenefitB = age >= optBAge ? Number((curSchedB / 12).toFixed(2)) : 0;
    const annBenefitB = age >= optBAge ? Number(curSchedB.toFixed(2)) : 0;
    cumSchedB += annBenefitB;

    projectionSchedule.push({
      year: yr,
      age,
      monthlyBenefitA: mBenefitA,
      annualBenefitA: annBenefitA,
      cumulativeBenefitA: Number(cumSchedA.toFixed(2)),
      monthlyBenefitB: mBenefitB,
      annualBenefitB: annBenefitB,
      cumulativeBenefitB: Number(cumSchedB.toFixed(2)),
    });

    if (age >= optAAge) curSchedA *= (1 + compareCola);
    if (age >= optBAge) curSchedB *= (1 + compareCola);
  }

  return {
    fraDetails: {
      birthYear,
      fullRetirementAgeYears: fra.years,
      fullRetirementAgeMonths: fra.months,
      fraDisplay: fra.display,
    },
    idealClaimAge: {
      recommendedAge: bestAge,
      recommendedMonthlyBenefit: recommendedMonthly,
      lifetimeBenefit62: lifetime62,
      lifetimeBenefitFra: lifetimeFra,
      lifetimeBenefit70: lifetime70,
      lifetimeBenefitRecommended: lifetimeBenefitsByAge[bestAge] || 0,
      delayedClaimingAdvantage: delayedAdvantage,
      breakevenAgeVs62: breakevenVs62,
    },
    compareTwoAges: {
      optionAAge: optAAge,
      optionAMonthly: optAMonthly,
      optionALifetimeTotal: totalOptA,
      optionBAge: optBAge,
      optionBMonthly: optBMonthly,
      optionBLifetimeTotal: totalOptB,
      lifetimeDifference: Math.abs(totalOptB - totalOptA),
      breakevenAge: breakevenAgeAB,
      recommendedOption: recAB,
      financialAdvantage: advantageAB,
    },
    spousalAndTax: {
      maxSpousalMonthly,
      actualSpousalMonthly,
      survivorMonthlyEstimate,
      combinedIncome,
      taxablePercentage,
      estimatedTaxableBenefitsAnnual,
    },
    projectionSchedule,
  };
}
