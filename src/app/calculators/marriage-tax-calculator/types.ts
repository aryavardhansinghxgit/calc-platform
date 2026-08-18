export interface SpouseIncomeInputs {
  salaryW2: number; // Wage / Salary
  selfEmployment: number; // 1099 / Business
  investmentIncome: number; // Interest, dividends, short term gain
  longTermCapGains: number; // Preferential rate income
  otherTaxableIncome: number; // Rental, passive, alimony
  preTaxRetirement: number; // 401k, IRA
  hsaFsa: number; // HSA / FSA
  studentLoanInterest: number; // Max $2,500
  otherAdjustments: number; // Educator expenses etc
  // Itemized deduction items
  useItemizedDeduction: boolean;
  mortgageInterest: number;
  saltPaid: number; // State & Local Taxes (SALT)
  charitableGifts: number;
  medicalExpenses: number; // Subject to 7.5% AGI floor
  // Credits & Others
  numChildrenCTC: number; // Child Tax Credit
  childCareExpenses: number;
  isSelfEmployed: boolean;
}

export interface MarriageTaxInputs {
  taxYear: "2025" | "2026";
  spouse1: SpouseIncomeInputs;
  spouse2: SpouseIncomeInputs;
  stateTaxRatePercent: number; // e.g. 5.0%
}

export interface SingleTaxProfile {
  grossIncome: number;
  agi: number;
  deductions: number; // Standard or Itemized
  taxableOrdinaryIncome: number;
  taxableCapGainsIncome: number;
  federalIncomeTax: number;
  ficaAndSeTax: number;
  niitTax: number; // 3.8% Net Investment Income Tax
  additionalMedicareTax: number; // 0.9%
  totalCredits: number;
  totalTax: number;
  effectiveTaxRate: number;
}

export interface ThreeWayTaxComparison {
  twoSinglesCombined: SingleTaxProfile & { spouse1Tax: number; spouse2Tax: number };
  mfj: SingleTaxProfile;
  mfsCombined: SingleTaxProfile & { spouse1Tax: number; spouse2Tax: number };
  differenceMFJvsSingles: number; // Positive = Marriage Penalty, Negative = Marriage Bonus
  isMarriageBonus: boolean;
  isMarriagePenalty: boolean;
  isNeutral: boolean;
  saltCapLostDeduction: number; // $20k singles vs $10k MFJ
  niitPenaltyAmount: number;
  medicareSurtaxPenaltyAmount: number;
}

export interface IncomeRatioSimulationPoint {
  spouse1Percent: number; // e.g. 100%, 80%, 60%, 50%
  spouse2Percent: number;
  spouse1Income: number;
  spouse2Income: number;
  twoSinglesTax: number;
  mfjTax: number;
  bonusOrPenalty: number; // Positive = Bonus, Negative = Penalty
}

export interface PreTaxOptimizationResult {
  currentBonusOrPenalty: number;
  optimizedBonusOrPenalty: number;
  recommendedAdditionalPreTaxSpouse1: number;
  recommendedAdditionalPreTaxSpouse2: number;
  estimatedTaxSavings: number;
}

export interface SavedMarriageTaxItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
