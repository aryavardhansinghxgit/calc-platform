export type CouponFrequency = "annual" | "semiannual" | "quarterly" | "monthly";
export type DayCountConvention = "30/360" | "actual/actual" | "actual/360" | "actual/365";
export type BondStatus = "Premium" | "Discount" | "Par";
export type CalculationGoal = "price" | "ytm";

export interface StandardBondParams {
  goal: CalculationGoal;
  faceValue: number;
  couponRate: number; // in percent, e.g. 5 for 5%
  yearsToMaturity: number; // e.g. 10 or 3.5
  marketPrice?: number; // used when goal === 'ytm'
  ytm?: number; // used when goal === 'price'
  couponFrequency: CouponFrequency;
  dayCount: DayCountConvention;
  daysSinceLastCoupon?: number;
}

export interface StandardBondResult {
  goal: CalculationGoal;
  faceValue: number;
  couponRate: number;
  yearsToMaturity: number;
  couponFrequency: CouponFrequency;
  frequencyMultiplier: number;
  totalPeriods: number;
  periodicCoupon: number;
  annualCoupon: number;
  cleanPrice: number;
  dirtyPrice: number;
  accruedInterest: number;
  ytmPercent: number;
  effectiveAnnualYield: number; // EAY %
  currentYieldPercent: number;
  totalCouponPayments: number;
  totalCashFlow: number;
  netProfit: number;
  status: BondStatus;
  macaulayDurationYears: number;
  modifiedDuration: number;
  convexity: number;
  priceYieldCurve: Array<{ yieldRate: number; price: number }>;
  cashFlowSchedule: Array<{
    period: number;
    year: number;
    couponPayment: number;
    principalPayment: number;
    totalCashFlow: number;
    presentValue: number;
    remainingPrincipal: number;
  }>;
}

export interface DayCountPricingParams {
  faceValue: number;
  couponRate: number;
  ytm: number;
  couponFrequency: CouponFrequency;
  dayCount: DayCountConvention;
  settlementDate: string; // YYYY-MM-DD
  maturityDate: string; // YYYY-MM-DD
}

export interface DayCountPricingResult {
  faceValue: number;
  cleanPrice: number;
  dirtyPrice: number;
  accruedInterest: number;
  daysAccrued: number;
  daysInPeriod: number;
  previousCouponDate: string;
  nextCouponDate: string;
  fractionElapsed: number;
  yearsRemaining: number;
  ytm: number;
  annualCoupon: number;
  periodicCoupon: number;
}

export interface ZeroCouponParams {
  solveFor: "price" | "ytm" | "maturity";
  faceValue: number;
  price?: number;
  ytm?: number;
  yearsToMaturity?: number;
  compoundingFrequency: "annual" | "semiannual";
}

export interface ZeroCouponResult {
  solveFor: "price" | "ytm" | "maturity";
  faceValue: number;
  price: number;
  ytm: number;
  effectiveAnnualRate: number;
  yearsToMaturity: number;
  totalDiscount: number;
  totalProfit: number;
  compoundingFrequency: "annual" | "semiannual";
  accretionSchedule: Array<{
    year: number;
    beginningValue: number;
    imputedInterest: number;
    endingValue: number;
    cumulativeAccretion: number;
  }>;
}

export interface CallableBondParams {
  faceValue: number;
  couponRate: number;
  marketPrice: number;
  yearsToMaturity: number;
  yearsToCall: number;
  callPricePercent: number; // e.g. 102 for 102% of par
  couponFrequency: CouponFrequency;
  hasPutOption?: boolean;
  yearsToPut?: number;
  putPricePercent?: number;
}

export interface CallableBondResult {
  faceValue: number;
  marketPrice: number;
  couponRate: number;
  couponFrequency: CouponFrequency;
  ytmPercent: number;
  ytcPercent: number;
  ytpPercent?: number;
  ytwPercent: number;
  worstScenario: "Maturity" | "Call" | "Put";
  callPriceDollar: number;
  putPriceDollar?: number;
  yearsToCall: number;
  yearsToMaturity: number;
}

export interface DurationConvexityParams {
  faceValue: number;
  couponRate: number;
  ytm: number;
  yearsToMaturity: number;
  couponFrequency: CouponFrequency;
}

export interface RateShiftScenario {
  shiftBps: number; // e.g. -200, -100, -50, +50, +100, +200
  shiftPercent: number; // e.g. -2.0, -1.0, etc.
  newYield: number;
  exactPrice: number;
  durationEstPrice: number;
  durationConvexityEstPrice: number;
  exactChangePercent: number;
  durConvexityChangePercent: number;
  dollarChange: number;
}

export interface DurationConvexityResult {
  bondPrice: number;
  macaulayDuration: number;
  modifiedDuration: number;
  convexity: number;
  dollarDuration: number;
  dv01: number; // Dollar Value of a Basis Point
  rateShifts: RateShiftScenario[];
}

export interface TaxEquivalentYieldParams {
  municipalYield: number; // %
  federalTaxRate: number; // %
  stateTaxRate: number; // %
  corporateBondYield?: number; // %
}

export interface TaxEquivalentYieldResult {
  municipalYield: number;
  federalTaxRate: number;
  stateTaxRate: number;
  combinedTaxRate: number;
  taxEquivalentYield: number;
  afterTaxCorporateYield?: number;
  corporateAdvantagePercent?: number;
  recommendedOption: "Municipal" | "Corporate" | "Neutral";
  taxSavingsPer10k: number;
}

export interface SavedBondItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
