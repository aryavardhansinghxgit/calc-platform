/**
 * Pure Mathematical Logic for Compound Interest & Rate Conversion Engine.
 */

export type CompoundingFrequency =
  | "daily"
  | "weekly"
  | "biweekly"
  | "monthly"
  | "quarterly"
  | "semiannual"
  | "annual"
  | "continuous";

export interface RateConversionInput {
  inputRatePercent: number;
  sourceFrequency: CompoundingFrequency;
  targetFrequency: CompoundingFrequency;
}

export interface EquivalentRateRow {
  frequency: string;
  frequencyKey: CompoundingFrequency;
  periodsPerYear: number | "Continuous";
  equivalentRatePercent: number;
  effectiveYieldPercent: number;
  differenceVsAnnualPercent: number;
}

export interface FormulaDerivationStep {
  title: string;
  formula: string;
  substitution: string;
  result: string;
}

export interface RateConversionResult {
  inputRatePercent: number;
  sourceFrequency: CompoundingFrequency;
  targetFrequency: CompoundingFrequency;
  convertedRatePercent: number;
  equivalentAprPercent: number;
  equivalentApyPercent: number;
  earPercent: number; // Effective Annual Rate
  continuousEquivalentPercent: number;
  rateDifferencePercent: number;
  insight: string;
  formulaDerivation: FormulaDerivationStep[];
  equivalentRatesTable: EquivalentRateRow[];
}

export interface AprVsApyResult {
  aprPercent: number;
  compoundingFrequency: CompoundingFrequency;
  apyPercent: number;
  effectiveYieldPercent: number;
  interestGainPer10k: number;
  comparisonChart: { label: string; apr: number; apy: number }[];
}

export interface FrequencyGrowthRow {
  frequency: string;
  frequencyKey: CompoundingFrequency;
  periodsPerYear: number | "Continuous";
  futureValue: number;
  totalInterest: number;
  effectiveYieldPercent: number;
}

export interface ContinuousCompoundingResult {
  principal: number;
  annualRatePercent: number;
  years: number;
  futureValue: number;
  totalInterestEarned: number;
  growthMultiplier: number; // e.g. 1.1275x
  annualizedYieldPercent: number;
  growthCurve: { year: number; discreteMonthlyValue: number; continuousValue: number }[];
}

export interface RuleOf72Result {
  annualReturnPercent: number;
  ruleOf72Years: number;
  ruleOf693Years: number;
  exactYears: number;
  errorPercent: number;
  note: string;
}

export interface SimpleVsCompoundMilestone {
  year: number;
  simpleValue: number;
  simpleInterest: number;
  compoundValue: number;
  compoundInterest: number;
  interestDifference: number;
}

export interface SimpleVsCompoundResult {
  principal: number;
  annualRatePercent: number;
  years: number;
  milestones: SimpleVsCompoundMilestone[];
  growthCurve: { year: number; simple: number; compound: number }[];
}

export interface AdvancedInsightsResult {
  dailyVsAnnualDiffPercent: number;
  dailyVsAnnualDollarPer10k: number;
  continuousVsDailyDiffPercent: number;
  keyTakeaways: string[];
}

// Backwards compatibility interface & function
export interface CompoundInterestFormulaInput {
  principal: number;
  annualInterestRate: number;
  years: number;
  compoundingFrequency?: number;
}

export interface CompoundInterestFormulaResult {
  principal: number;
  totalInterestEarned: number;
  futureValue: number;
}

export function calculateCompoundInterestFormula({
  principal,
  annualInterestRate,
  years,
  compoundingFrequency = 12,
}: CompoundInterestFormulaInput): CompoundInterestFormulaResult {
  const rate = annualInterestRate / 100;
  const n = compoundingFrequency;
  const t = years;
  const futureValue = principal * Math.pow(1 + rate / n, n * t);
  const totalInterestEarned = Math.max(0, futureValue - principal);
  return { principal, totalInterestEarned, futureValue };
}

// ==========================================
// FREQUENCY HELPER FUNCTIONS
// ==========================================

export function getPeriodsPerYear(freq: CompoundingFrequency): number | "Continuous" {
  switch (freq) {
    case "daily":
      return 365;
    case "weekly":
      return 52;
    case "biweekly":
      return 26;
    case "monthly":
      return 12;
    case "quarterly":
      return 4;
    case "semiannual":
      return 2;
    case "annual":
      return 1;
    case "continuous":
      return "Continuous";
    default:
      return 12;
  }
}

export function getFrequencyLabel(freq: CompoundingFrequency): string {
  switch (freq) {
    case "daily":
      return "Daily (365/yr)";
    case "weekly":
      return "Weekly (52/yr)";
    case "biweekly":
      return "Bi-Weekly (26/yr)";
    case "monthly":
      return "Monthly (12/yr)";
    case "quarterly":
      return "Quarterly (4/yr)";
    case "semiannual":
      return "Semi-Annual (2/yr)";
    case "annual":
      return "Annual (1/yr)";
    case "continuous":
      return "Continuous";
    default:
      return freq;
  }
}

// Convert nominal rate of given frequency to EAR (decimal)
export function rateToEAR(ratePercent: number, freq: CompoundingFrequency): number {
  const r = ratePercent / 100;
  if (freq === "continuous") {
    return Math.exp(r) - 1;
  }
  const n = getPeriodsPerYear(freq) as number;
  return Math.pow(1 + r / n, n) - 1;
}

// Convert EAR (decimal) to nominal rate of given frequency (percent)
export function earToRate(earDecimal: number, freq: CompoundingFrequency): number {
  if (freq === "continuous") {
    return Math.log(1 + earDecimal) * 100;
  }
  const n = getPeriodsPerYear(freq) as number;
  return n * (Math.pow(1 + earDecimal, 1 / n) - 1) * 100;
}

// ==========================================
// MAIN RATE CONVERSION ENGINE
// ==========================================

export function convertInterestRate({
  inputRatePercent,
  sourceFrequency,
  targetFrequency,
}: RateConversionInput): RateConversionResult {
  const safeInputRate = Math.max(0, inputRatePercent);

  // 1. Calculate EAR from Source Rate
  const earDecimal = rateToEAR(safeInputRate, sourceFrequency);
  const earPercent = earDecimal * 100;

  // 2. Convert EAR to Target Frequency Nominal Rate
  const convertedRatePercent = earToRate(earDecimal, targetFrequency);

  // 3. Equivalent APR (Monthly compounding nominal rate) & APY (Annual EAR)
  const equivalentAprPercent = earToRate(earDecimal, "monthly");
  const equivalentApyPercent = earPercent;
  const continuousEquivalentPercent = earToRate(earDecimal, "continuous");

  // 4. Rate Difference
  const rateDifferencePercent = convertedRatePercent - safeInputRate;

  // 5. Build Derivation Steps for Live Formula Panel
  const srcPeriods = getPeriodsPerYear(sourceFrequency);
  const tgtPeriods = getPeriodsPerYear(targetFrequency);

  const formulaDerivation: FormulaDerivationStep[] = [];

  // Step 1: Source to EAR
  if (sourceFrequency === "continuous") {
    formulaDerivation.push({
      title: "Step 1: Convert Source Continuous Rate to EAR",
      formula: "EAR = e^r - 1",
      substitution: `EAR = e^(${(safeInputRate / 100).toFixed(6)}) - 1`,
      result: `EAR = ${(earPercent).toFixed(5)}%`,
    });
  } else {
    formulaDerivation.push({
      title: `Step 1: Convert Source (${getFrequencyLabel(sourceFrequency)}) Rate to EAR`,
      formula: "EAR = (1 + r / n)^n - 1",
      substitution: `EAR = (1 + ${(safeInputRate / 100).toFixed(6)} / ${srcPeriods})^${srcPeriods} - 1`,
      result: `EAR = ${(earPercent).toFixed(5)}%`,
    });
  }

  // Step 2: EAR to Target Rate
  if (targetFrequency === "continuous") {
    formulaDerivation.push({
      title: "Step 2: Convert EAR to Target Continuous Rate",
      formula: "r_target = ln(1 + EAR)",
      substitution: `r_target = ln(1 + ${(earDecimal).toFixed(6)})`,
      result: `Target Rate = ${(convertedRatePercent).toFixed(5)}%`,
    });
  } else {
    formulaDerivation.push({
      title: `Step 2: Convert EAR to Target (${getFrequencyLabel(targetFrequency)}) Rate`,
      formula: "r_target = n * ((1 + EAR)^(1/n) - 1)",
      substitution: `r_target = ${tgtPeriods} * ((1 + ${(earDecimal).toFixed(6)})^(1/${tgtPeriods}) - 1)`,
      result: `Target Rate = ${(convertedRatePercent).toFixed(5)}%`,
    });
  }

  // 6. Generate Equivalent Rates Table for All 8 Frequencies
  const allFrequencies: CompoundingFrequency[] = [
    "daily",
    "weekly",
    "biweekly",
    "monthly",
    "quarterly",
    "semiannual",
    "annual",
    "continuous",
  ];

  const annualRate = earToRate(earDecimal, "annual");

  const equivalentRatesTable: EquivalentRateRow[] = allFrequencies.map((freq) => {
    const eqRate = earToRate(earDecimal, freq);
    const effYield = rateToEAR(eqRate, freq) * 100;
    const diff = eqRate - annualRate;
    return {
      frequency: getFrequencyLabel(freq),
      frequencyKey: freq,
      periodsPerYear: getPeriodsPerYear(freq),
      equivalentRatePercent: Math.round(eqRate * 100000) / 100000,
      effectiveYieldPercent: Math.round(effYield * 100000) / 100000,
      differenceVsAnnualPercent: Math.round(diff * 100000) / 100000,
    };
  });

  // 7. Dynamic Insight Statement
  let insight = "";
  if (sourceFrequency === targetFrequency) {
    insight = `Source and target compounding frequencies are identical. The nominal rate remains ${safeInputRate.toFixed(4)}%.`;
  } else if (convertedRatePercent > safeInputRate) {
    insight = `To achieve the same yield as a ${safeInputRate.toFixed(2)}% ${getFrequencyLabel(sourceFrequency)} rate, a ${getFrequencyLabel(targetFrequency)} rate requires ${convertedRatePercent.toFixed(4)}% (${(convertedRatePercent - safeInputRate).toFixed(4)}% higher).`;
  } else {
    insight = `A ${safeInputRate.toFixed(2)}% ${getFrequencyLabel(sourceFrequency)} rate compounds into an equivalent ${convertedRatePercent.toFixed(4)}% ${getFrequencyLabel(targetFrequency)} rate due to compounding frequency differences.`;
  }

  return {
    inputRatePercent: safeInputRate,
    sourceFrequency,
    targetFrequency,
    convertedRatePercent: Math.round(convertedRatePercent * 100000) / 100000,
    equivalentAprPercent: Math.round(equivalentAprPercent * 100000) / 100000,
    equivalentApyPercent: Math.round(equivalentApyPercent * 100000) / 100000,
    earPercent: Math.round(earPercent * 100000) / 100000,
    continuousEquivalentPercent: Math.round(continuousEquivalentPercent * 100000) / 100000,
    rateDifferencePercent: Math.round(rateDifferencePercent * 100000) / 100000,
    insight,
    formulaDerivation,
    equivalentRatesTable,
  };
}

// ==========================================
// MODULE 2: APR VS APY ANALYZER
// ==========================================

export function calculateAprVsApy(
  aprPercent: number,
  compoundingFrequency: CompoundingFrequency
): AprVsApyResult {
  const safeApr = Math.max(0, aprPercent);
  const earDecimal = rateToEAR(safeApr, compoundingFrequency);
  const apyPercent = earDecimal * 100;
  const effectiveYieldPercent = apyPercent;

  const simple10k = 10000 * (safeApr / 100);
  const compound10k = 10000 * earDecimal;
  const interestGainPer10k = Math.max(0, compound10k - simple10k);

  const comparisonChart = [
    { label: "Stated APR", apr: safeApr, apy: safeApr },
    { label: `Effective APY (${getFrequencyLabel(compoundingFrequency)})`, apr: safeApr, apy: Math.round(apyPercent * 1000) / 1000 },
  ];

  return {
    aprPercent: safeApr,
    compoundingFrequency,
    apyPercent: Math.round(apyPercent * 100000) / 100000,
    effectiveYieldPercent: Math.round(effectiveYieldPercent * 100000) / 100000,
    interestGainPer10k: Math.round(interestGainPer10k * 100) / 100,
    comparisonChart,
  };
}

// ==========================================
// MODULE 3: COMPOUNDING FREQUENCY COMPARISON
// ==========================================

export function calculateCompoundingFrequencyComparison(
  principal: number,
  annualRatePercent: number,
  years: number
): { frequenciesData: FrequencyGrowthRow[]; bestFrequency: FrequencyGrowthRow } {
  const P = Math.max(0, principal);
  const r = Math.max(0, annualRatePercent) / 100;
  const t = Math.max(0, years);

  const allFrequencies: CompoundingFrequency[] = [
    "annual",
    "semiannual",
    "quarterly",
    "monthly",
    "biweekly",
    "weekly",
    "daily",
    "continuous",
  ];

  const frequenciesData: FrequencyGrowthRow[] = allFrequencies.map((freq) => {
    let futureValue = 0;
    if (freq === "continuous") {
      futureValue = P * Math.exp(r * t);
    } else {
      const n = getPeriodsPerYear(freq) as number;
      futureValue = P * Math.pow(1 + r / n, n * t);
    }
    const totalInterest = Math.max(0, futureValue - P);
    const ear = rateToEAR(annualRatePercent, freq);

    return {
      frequency: getFrequencyLabel(freq),
      frequencyKey: freq,
      periodsPerYear: getPeriodsPerYear(freq),
      futureValue: Math.round(futureValue * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      effectiveYieldPercent: Math.round(ear * 10000) / 100,
    };
  });

  const bestFrequency = frequenciesData[frequenciesData.length - 1];

  return {
    frequenciesData,
    bestFrequency,
  };
}

// ==========================================
// MODULE 4: CONTINUOUS COMPOUNDING CALCULATOR
// ==========================================

export function calculateContinuousCompounding(
  principal: number,
  annualRatePercent: number,
  years: number
): ContinuousCompoundingResult {
  const P = Math.max(0, principal);
  const r = Math.max(0, annualRatePercent) / 100;
  const t = Math.max(0, years);

  const futureValue = P * Math.exp(r * t);
  const totalInterestEarned = Math.max(0, futureValue - P);
  const growthMultiplier = P > 0 ? futureValue / P : 0;
  const annualizedYieldPercent = (Math.exp(r) - 1) * 100;

  const growthCurve = [];
  const steps = Math.min(Math.max(Math.ceil(t), 1), 30);
  for (let yr = 0; yr <= steps; yr++) {
    const discreteMonthly = P * Math.pow(1 + r / 12, 12 * yr);
    const continuousVal = P * Math.exp(r * yr);
    growthCurve.push({
      year: yr,
      discreteMonthlyValue: Math.round(discreteMonthly * 100) / 100,
      continuousValue: Math.round(continuousVal * 100) / 100,
    });
  }

  return {
    principal: P,
    annualRatePercent,
    years: t,
    futureValue: Math.round(futureValue * 100) / 100,
    totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
    growthMultiplier: Math.round(growthMultiplier * 10000) / 10000,
    annualizedYieldPercent: Math.round(annualizedYieldPercent * 100000) / 100000,
    growthCurve,
  };
}

// ==========================================
// MODULE 5: RULE OF 72 CALCULATOR
// ==========================================

export function calculateRuleOf72(annualReturnPercent: number): RuleOf72Result {
  const r = Math.max(0.01, annualReturnPercent);

  const ruleOf72Years = 72 / r;
  const ruleOf693Years = 69.3 / r;
  const exactYears = Math.log(2) / Math.log(1 + r / 100);
  const errorPercent = Math.abs((ruleOf72Years - exactYears) / exactYears) * 100;

  let note = "";
  if (r >= 5 && r <= 10) {
    note = `The Rule of 72 is exceptionally accurate for interest rates between 5% and 10% (error is under 1%).`;
  } else if (r < 5) {
    note = `For rates under 5%, the Rule of 69.3 or exact logarithmic formula is more precise than 72.`;
  } else {
    note = `For rates over 15%, the Rule of 72 slightly underestimates the exact time required to double your money.`;
  }

  return {
    annualReturnPercent: r,
    ruleOf72Years: Math.round(ruleOf72Years * 100) / 100,
    ruleOf693Years: Math.round(ruleOf693Years * 100) / 100,
    exactYears: Math.round(exactYears * 100) / 100,
    errorPercent: Math.round(errorPercent * 100) / 100,
    note,
  };
}

// ==========================================
// MODULE 6: SIMPLE VS COMPOUND INTEREST GROWTH
// ==========================================

export function calculateSimpleVsCompoundGrowth(
  principal: number,
  annualRatePercent: number,
  years: number
): SimpleVsCompoundResult {
  const P = Math.max(0, principal);
  const r = Math.max(0, annualRatePercent) / 100;
  const t = Math.max(1, years);

  const milestoneYears = [1, 5, 10, 20, 30].filter((y) => y <= Math.max(t, 30));
  if (!milestoneYears.includes(t)) {
    milestoneYears.push(t);
    milestoneYears.sort((a, b) => a - b);
  }

  const milestones: SimpleVsCompoundMilestone[] = milestoneYears.map((yr) => {
    const simpleVal = P * (1 + r * yr);
    const simpleInt = simpleVal - P;
    const compoundVal = P * Math.pow(1 + r / 12, 12 * yr);
    const compoundInt = compoundVal - P;
    const diff = compoundInt - simpleInt;

    return {
      year: yr,
      simpleValue: Math.round(simpleVal * 100) / 100,
      simpleInterest: Math.round(simpleInt * 100) / 100,
      compoundValue: Math.round(compoundVal * 100) / 100,
      compoundInterest: Math.round(compoundInt * 100) / 100,
      interestDifference: Math.round(diff * 100) / 100,
    };
  });

  const maxYear = Math.max(t, 30);
  const growthCurve = [];
  for (let yr = 0; yr <= maxYear; yr += Math.max(1, Math.floor(maxYear / 20))) {
    const simple = P * (1 + r * yr);
    const compound = P * Math.pow(1 + r / 12, 12 * yr);
    growthCurve.push({
      year: yr,
      simple: Math.round(simple * 100) / 100,
      compound: Math.round(compound * 100) / 100,
    });
  }

  return {
    principal: P,
    annualRatePercent,
    years: t,
    milestones,
    growthCurve,
  };
}

// ==========================================
// MODULE 7: ADVANCED INSIGHTS GENERATOR
// ==========================================

export function generateAdvancedInsights(
  principal: number,
  ratePercent: number
): AdvancedInsightsResult {
  const P = Math.max(10000, principal);
  const r = Math.max(0, ratePercent);

  const dailyEar = rateToEAR(r, "daily");
  const annualEar = rateToEAR(r, "annual");
  const contEar = rateToEAR(r, "continuous");

  const dailyYield = dailyEar * 100;
  const annualYield = annualEar * 100;
  const contYield = contEar * 100;

  const dailyVsAnnualDiffPercent = dailyYield - annualYield;
  const dailyVsAnnualDollarPer10k = (P / 10000) * 10000 * (dailyEar - annualEar);

  const continuousVsDailyDiffPercent = contYield - dailyYield;

  const keyTakeaways = [
    `Daily compounding yields ${(dailyVsAnnualDiffPercent).toFixed(4)}% higher effective interest than annual compounding.`,
    `On a $${P.toLocaleString()} deposit at ${r}%, daily compounding earns $${Math.round(dailyVsAnnualDollarPer10k).toLocaleString()} more in year one than annual compounding.`,
    `Continuous compounding represents the mathematical upper bound, adding only ${(continuousVsDailyDiffPercent).toFixed(4)}% extra yield beyond daily compounding.`,
    `When comparing loan offers or savings yields, always inspect the Effective Annual Rate (EAR / APY) rather than the nominal APR to reveal hidden compounding costs.`,
  ];

  return {
    dailyVsAnnualDiffPercent: Math.round(dailyVsAnnualDiffPercent * 10000) / 10000,
    dailyVsAnnualDollarPer10k: Math.round(dailyVsAnnualDollarPer10k * 100) / 100,
    continuousVsDailyDiffPercent: Math.round(continuousVsDailyDiffPercent * 10000) / 10000,
    keyTakeaways,
  };
}
