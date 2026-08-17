export type CompoundingFrequency =
  | "daily"
  | "monthly"
  | "quarterly"
  | "semiannually"
  | "annually";

export interface StandardCdInput {
  startingDeposit: number;
  termMonths: number;
  rateValue: number; // %
  rateType: "apy" | "apr";
  compoundingFrequency: CompoundingFrequency;
  marginalTaxRate: number; // %
  inflationRate: number; // %
}

export interface CdScheduleRow {
  month: number;
  deposit: number;
  interestEarned: number;
  cumulativeInterest: number;
  endingBalance: number;
  taxPaidCumulative: number;
  afterTaxBalance: number;
  realPurchasingPowerBalance: number;
}

export interface StandardCdResult {
  startingDeposit: number;
  finalBalance: number;
  totalInterestPreTax: number;
  taxDragAmount: number;
  totalInterestAfterTax: number;
  effectiveApy: number; // %
  nominalApr: number; // %
  realBalance: number;
  realPurchasingPowerGain: number;
  totalPercentageRoi: number; // %
  schedule: CdScheduleRow[];
}

export interface CdLadderInput {
  totalCapital: number;
  stagesCount: number; // e.g. 4 or 5 stages
  baseShortRate: number; // % APY
  topLongRate: number; // % APY
}

export interface CdLadderStage {
  stage: number;
  termYears: number;
  allocationAmount: number;
  apy: number;
  maturityBalance: number;
}

export interface CdLadderResult {
  totalCapital: number;
  blendedApy: number;
  annualLiquidityCash: number;
  total5YearLadderValue: number;
  singleCd5YearValue: number;
  ladderAdvantage: number;
  stages: CdLadderStage[];
}

export interface CdVsHysaInput {
  depositAmount: number;
  cdRateApy: number; // %
  cdTermMonths: number;
  currentHysaRateApy: number; // %
  expectedAnnualHysaRateDrop: number; // % per year
}

export interface CdVsHysaResult {
  totalCdReturn: number;
  totalHysaReturn: number;
  rateLockBenefit: number;
  cdAdvantagePercentage: number;
}

export interface EarlyWithdrawalInput {
  originalPrincipal: number;
  cdRateApy: number;
  cdTermMonths: number;
  penaltyDays: number; // e.g. 90, 180, 270, 360 days
  monthsElapsedBeforeExit: number;
  newReinvestmentRateApy: number;
}

export interface EarlyWithdrawalResult {
  grossInterestEarned: number;
  penaltyAmount: number;
  netInterestReceived: number;
  netPayoutAmount: number;
  principalEroded: boolean;
  breakEvenMonthsForNewRate: number;
}

export interface CdGoalSolverInput {
  targetBalance: number;
  rateApy: number;
  years: number;
  months: number;
  compoundingFrequency: CompoundingFrequency;
}

export interface CdGoalSolverResult {
  requiredInitialDeposit: number;
  totalInterestToEarn: number;
  percentageYieldGrowth: number;
}

export interface SpecialtyCdInput {
  deposit: number;
  initialApy: number;
  termMonths: number;
  cdType: "no_penalty" | "bump_up";
  bumpUpRateIncrease: number; // % increase
}

export interface SpecialtyCdResult {
  standardCdBalance: number;
  specialtyCdBalance: number;
  difference: number;
  description: string;
}

export interface SavedCdItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
