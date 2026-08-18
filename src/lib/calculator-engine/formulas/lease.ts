/**
 * Universal Lease Calculator & Auto/Equipment Lease Suite Mathematical Engine
 */

export interface LeaseScheduleRow {
  month: number;
  startingBalance: number;
  payment: number;
  principalDepreciation: number;
  interestFinanceCharge: number;
  salesTax: number;
  endingBalance: number;
  cumulativeInterest: number;
  cumulativeDepreciation: number;
}

export interface UniversalLeaseParams {
  assetValue: number;
  residualValue: number;
  leaseTermMonths: number;
  interestRatePct: number; // Annual nominal interest rate (e.g. 6%)
  downPayment?: number;
  salesTaxRatePct?: number; // e.g. 7 for 7%
  paymentTiming?: "beginning" | "end"; // In advance vs in arrears
  tradeInValue?: number;
  acquisitionFee?: number;
  dealerDocFee?: number;
}

export interface UniversalLeaseResult {
  monthlyPaymentBase: number;
  monthlySalesTax: number;
  monthlyTotalPayment: number;
  totalMonthlyPayments: number;
  totalDepreciation: number;
  totalFinanceCharges: number;
  totalSalesTax: number;
  totalLeaseCost: number; // Down payment + fees + total monthly payments
  equivalentMoneyFactor: number;
  schedule: LeaseScheduleRow[];
}

/**
 * 1. Fixed Rate Lease Calculation
 */
export function calculateLeaseFixedRate(params: UniversalLeaseParams): UniversalLeaseResult {
  const grossValue = Math.max(0, params.assetValue);
  const downPmt = Math.max(0, params.downPayment || 0);
  const tradeIn = Math.max(0, params.tradeInValue || 0);
  const acqFee = Math.max(0, params.acquisitionFee || 0);
  const docFee = Math.max(0, params.dealerDocFee || 0);

  // Net Capitalized Cost
  const netCapCost = Math.max(0, grossValue + acqFee + docFee - downPmt - tradeIn);
  const residual = Math.max(0, params.residualValue);
  const n = Math.max(1, Math.round(params.leaseTermMonths));
  const rAnnual = Math.max(0, params.interestRatePct) / 100;
  const iMonthly = rAnnual / 12;
  const taxRate = Math.max(0, params.salesTaxRatePct || 0) / 100;
  const isAdvance = params.paymentTiming === "beginning";

  const moneyFactor = rAnnual / 24;

  let monthlyDepreciation = 0;
  let monthlyFinanceCharge = 0;
  let monthlyBasePayment = 0;

  if (iMonthly === 0) {
    monthlyDepreciation = (netCapCost - residual) / n;
    monthlyFinanceCharge = 0;
    monthlyBasePayment = monthlyDepreciation;
  } else {
    // Actuarial standard with residual value:
    // PV = PMT * [ (1 - (1+i)^-n) / i ] * (1 + i * advance) + Residual * (1+i)^-n
    // PMT = [ NetCapCost - Residual * (1+i)^-n ] / [ ((1 - (1+i)^-n) / i) * (1 + i * advance) ]
    const discountFactor = Math.pow(1 + iMonthly, -n);
    const annuityFactor = ((1 - discountFactor) / iMonthly) * (isAdvance ? 1 + iMonthly : 1);
    
    monthlyBasePayment = (netCapCost - residual * discountFactor) / annuityFactor;
    
    // Average monthly breakdown
    monthlyDepreciation = Math.max(0, (netCapCost - residual) / n);
    monthlyFinanceCharge = Math.max(0, monthlyBasePayment - monthlyDepreciation);
  }

  const monthlyTax = monthlyBasePayment * taxRate;
  const monthlyTotal = monthlyBasePayment + monthlyTax;

  // Generate Amortization Schedule
  let currentLiability = netCapCost;
  let cumulativeInterest = 0;
  let cumulativeDepreciation = 0;
  const schedule: LeaseScheduleRow[] = [];

  for (let m = 1; m <= n; m++) {
    const startBal = currentLiability;
    let interestFee = 0;
    let principalPaid = 0;

    if (isAdvance) {
      // Beginning of period: payment made first, remaining accrues interest
      const balAfterPmt = Math.max(0, startBal - monthlyBasePayment);
      interestFee = balAfterPmt * iMonthly;
      principalPaid = monthlyBasePayment - (startBal * iMonthly);
      currentLiability = Math.max(residual, startBal - principalPaid);
    } else {
      // End of period
      interestFee = startBal * iMonthly;
      principalPaid = monthlyBasePayment - interestFee;
      currentLiability = Math.max(residual, startBal - principalPaid);
    }

    cumulativeInterest += Math.max(0, interestFee);
    cumulativeDepreciation += Math.max(0, principalPaid);

    schedule.push({
      month: m,
      startingBalance: startBal,
      payment: monthlyTotal,
      principalDepreciation: Math.max(0, principalPaid),
      interestFinanceCharge: Math.max(0, interestFee),
      salesTax: monthlyTax,
      endingBalance: Math.max(residual, currentLiability),
      cumulativeInterest,
      cumulativeDepreciation,
    });
  }

  const totalMonthlyPayments = monthlyTotal * n;
  const totalDepr = monthlyDepreciation * n;
  const totalFinance = monthlyFinanceCharge * n;
  const totalTax = monthlyTax * n;
  const totalLeaseCost = downPmt + tradeIn + acqFee + docFee + totalMonthlyPayments;

  return {
    monthlyPaymentBase: monthlyBasePayment,
    monthlySalesTax: monthlyTax,
    monthlyTotalPayment: monthlyTotal,
    totalMonthlyPayments,
    totalDepreciation: totalDepr,
    totalFinanceCharges: totalFinance,
    totalSalesTax: totalTax,
    totalLeaseCost,
    equivalentMoneyFactor: moneyFactor,
    schedule,
  };
}

/**
 * 2. Fixed Pay Lease Solver (Solves for Interest Rate / APR given fixed Monthly Payment)
 */
export interface FixedPaySolverResult {
  solvedAnnualRatePct: number;
  solvedMoneyFactor: number;
  monthlyPayment: number;
  totalPaid: number;
  totalInterestPaid: number;
  isSolvable: boolean;
  errorMessage?: string;
}

export function solveLeaseInterestRate(
  assetValue: number,
  residualValue: number,
  leaseTermMonths: number,
  targetMonthlyPayment: number,
  isAdvance: boolean = false
): FixedPaySolverResult {
  const P = Math.max(0, assetValue);
  const R = Math.max(0, residualValue);
  const n = Math.max(1, leaseTermMonths);
  const PMT = Math.max(0, targetMonthlyPayment);

  // If payment is strictly less than straight-line depreciation, interest is negative
  const minZeroInterestPMT = (P - R) / n;
  if (PMT < minZeroInterestPMT - 0.01) {
    return {
      solvedAnnualRatePct: 0,
      solvedMoneyFactor: 0,
      monthlyPayment: PMT,
      totalPaid: PMT * n,
      totalInterestPaid: 0,
      isSolvable: false,
      errorMessage: `Monthly payment (${PMT.toFixed(2)}) is less than straight-line depreciation (${minZeroInterestPMT.toFixed(2)}). Rate would be negative.`,
    };
  }

  // Bisection Solver for Monthly Interest Rate i
  let low = 0;
  let high = 1.0; // 100% per month = 1200% APR ceiling
  let solved_i = 0;

  for (let iter = 0; iter < 100; iter++) {
    const mid = (low + high) / 2;
    const discount = Math.pow(1 + mid, -n);
    const annuity = ((1 - discount) / mid) * (isAdvance ? 1 + mid : 1);
    const calcPMT = (P - R * discount) / annuity;

    if (Math.abs(calcPMT - PMT) < 0.0001) {
      solved_i = mid;
      break;
    }

    if (calcPMT < PMT) {
      low = mid;
    } else {
      high = mid;
    }
    solved_i = mid;
  }

  const solvedAnnualAPR = solved_i * 12 * 100;
  const solvedMF = solvedAnnualAPR / 2400;
  const totalPaid = PMT * n;
  const totalInterest = Math.max(0, totalPaid - (P - R));

  return {
    solvedAnnualRatePct: solvedAnnualAPR,
    solvedMoneyFactor: solvedMF,
    monthlyPayment: PMT,
    totalPaid,
    totalInterestPaid: totalInterest,
    isSolvable: true,
  };
}

/**
 * 3. Auto Lease Money Factor Converter
 */
export function convertMoneyFactorToApr(moneyFactor: number): number {
  return moneyFactor * 2400;
}

export function convertAprToMoneyFactor(aprPct: number): number {
  return aprPct / 2400;
}

/**
 * 4. Lease vs. Buy Comparison Engine
 */
export interface LeaseVsBuyResult {
  leaseTotalCost: number;
  leaseMonthlyPayment: number;
  loanTotalCost: number;
  loanMonthlyPayment: number;
  cashTotalCost: number;
  recommendation: "lease" | "loan" | "cash";
  costDifference: number;
  summary: string;
}

export function calculateLeaseVsBuy(
  vehiclePrice: number,
  downPayment: number,
  leaseTermMonths: number,
  leaseAprPct: number,
  residualValue: number,
  loanTermMonths: number,
  loanAprPct: number,
  expectedResaleValueAtTerm: number,
  salesTaxPct: number
): LeaseVsBuyResult {
  // 1. Lease Cost
  const leaseRes = calculateLeaseFixedRate({
    assetValue: vehiclePrice,
    residualValue,
    leaseTermMonths,
    interestRatePct: leaseAprPct,
    downPayment,
    salesTaxRatePct: salesTaxPct,
  });

  const leaseTotalOut = leaseRes.totalLeaseCost;

  // 2. Loan Cost
  const loanPrincipal = Math.max(0, vehiclePrice * (1 + salesTaxPct / 100) - downPayment);
  const iLoan = loanAprPct / 100 / 12;
  const nLoan = Math.max(1, loanTermMonths);
  let loanPMT = 0;
  if (iLoan === 0) {
    loanPMT = loanPrincipal / nLoan;
  } else {
    const f = Math.pow(1 + iLoan, nLoan);
    loanPMT = (loanPrincipal * (iLoan * f)) / (f - 1);
  }

  // Net cost of buying with loan = Total Loan Payments + Down Payment - Future Resale Equity
  const loanTotalPayments = loanPMT * nLoan + downPayment;
  const loanNetCost = Math.max(0, loanTotalPayments - expectedResaleValueAtTerm);

  // 3. Cash Cost = Price + Tax - Future Resale Value
  const cashOutlay = vehiclePrice * (1 + salesTaxPct / 100);
  const cashNetCost = Math.max(0, cashOutlay - expectedResaleValueAtTerm);

  let rec: "lease" | "loan" | "cash" = "loan";
  let minCost = loanNetCost;

  if (leaseTotalOut < minCost && leaseTotalOut < cashNetCost) {
    rec = "lease";
    minCost = leaseTotalOut;
  } else if (cashNetCost < minCost) {
    rec = "cash";
    minCost = cashNetCost;
  }

  const costDiff = Math.abs(leaseTotalOut - loanNetCost);

  return {
    leaseTotalCost: leaseTotalOut,
    leaseMonthlyPayment: leaseRes.monthlyTotalPayment,
    loanTotalCost: loanNetCost,
    loanMonthlyPayment: loanPMT,
    cashTotalCost: cashNetCost,
    recommendation: rec,
    costDifference: costDiff,
    summary:
      rec === "lease"
        ? `Leasing is cheaper by $${costDiff.toFixed(2)} over ${leaseTermMonths} months due to high residual value and warranty coverage.`
        : `Buying with a loan is more cost effective by $${costDiff.toFixed(2)} because you build asset equity and keep the vehicle past the loan term.`,
  };
}

/**
 * 5. Equipment & Commercial Lease Classification (ASC 842 / IFRS 16)
 */
export interface CommercialLeaseClassification {
  isFinanceLease: boolean;
  classificationName: "Finance / Capital Lease" | "Operating Lease";
  criteriaMet: {
    transferOwnership: boolean;
    purchaseOption: boolean;
    leaseTermTest: boolean; // >= 75% economic life
    presentValueTest: boolean; // PV payments >= 90% fair value
    specializedAsset: boolean;
  };
  pvPayments: number;
  pvToFairValueRatio: number;
}

export function classifyCommercialLease(
  fairMarketValue: number,
  leaseTermYears: number,
  assetEconomicLifeYears: number,
  annualLeasePayment: number,
  discountRatePct: number,
  transferOwnership: boolean = false,
  bargainPurchaseOption: boolean = false,
  isSpecializedAsset: boolean = false
): CommercialLeaseClassification {
  const r = Math.max(0, discountRatePct) / 100;
  const n = Math.max(1, leaseTermYears);

  // Present value of lease payments
  let pv = 0;
  for (let t = 1; t <= n; t++) {
    pv += annualLeasePayment / Math.pow(1 + r, t);
  }

  const pvRatio = fairMarketValue > 0 ? (pv / fairMarketValue) * 100 : 0;
  const termRatio = assetEconomicLifeYears > 0 ? (leaseTermYears / assetEconomicLifeYears) * 100 : 0;

  const termTest = termRatio >= 75;
  const pvTest = pvRatio >= 90;

  const isFinance = transferOwnership || bargainPurchaseOption || termTest || pvTest || isSpecializedAsset;

  return {
    isFinanceLease: isFinance,
    classificationName: isFinance ? "Finance / Capital Lease" : "Operating Lease",
    criteriaMet: {
      transferOwnership,
      purchaseOption: bargainPurchaseOption,
      leaseTermTest: termTest,
      presentValueTest: pvTest,
      specializedAsset: isSpecializedAsset,
    },
    pvPayments: pv,
    pvToFairValueRatio: pvRatio,
  };
}

/**
 * 6. Asset Depreciation & Residual Value Estimator
 */
export interface ResidualEstimatorResult {
  estimatedResidualValue: number;
  residualPercentage: number;
  totalDepreciation: number;
}

export function estimateAssetResidual(
  initialValue: number,
  termYears: number,
  annualDepreciationRatePct: number = 15
): ResidualEstimatorResult {
  const P = Math.max(0, initialValue);
  const d = Math.max(0, annualDepreciationRatePct) / 100;
  const t = Math.max(0, termYears);

  // Exponential decaying residual: R = P * (1 - d)^t
  const residual = P * Math.pow(1 - d, t);
  const pct = P > 0 ? (residual / P) * 100 : 0;
  const totalDepr = P - residual;

  return {
    estimatedResidualValue: residual,
    residualPercentage: pct,
    totalDepreciation: totalDepr,
  };
}
