/**
 * Boat Loan & Marine Financing Mathematical Engine
 */

export interface BoatAmortizationRow {
  month: number;
  year: number;
  startingBalance: number;
  payment: number;
  principal: number;
  interest: number;
  endingBalance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

export interface BoatLoanParams {
  boatPrice: number;
  downPayment: number;
  tradeInValue?: number;
  loanTermYears: number;
  interestRatePct: number;
  salesTaxRatePct?: number;
  dealerFees?: number;
  includeFeesInLoan?: boolean;
  extraMonthlyPayment?: number;
}

export interface BoatLoanResult {
  totalLoanAmount: number;
  salesTaxAmount: number;
  totalUpfrontPayment: number;
  monthlyPayment: number;
  totalOfPayments: number;
  totalInterestPaid: number;
  totalCostOfBoat: number; // Price + Interest + Tax + Fees
  payoffMonths: number;
  interestSavedWithExtra: number;
  schedule: BoatAmortizationRow[];
  annualSchedule: {
    year: number;
    interest: number;
    principal: number;
    endingBalance: number;
  }[];
}

/**
 * 1. Standard Boat Loan Calculation
 */
export function calculateBoatLoan(params: BoatLoanParams): BoatLoanResult {
  const price = Math.max(0, params.boatPrice);
  const down = Math.max(0, params.downPayment);
  const tradeIn = Math.max(0, params.tradeInValue || 0);
  const years = Math.max(1, params.loanTermYears);
  const rAnnual = Math.max(0, params.interestRatePct) / 100;
  const taxRate = Math.max(0, params.salesTaxRatePct || 0) / 100;
  const fees = Math.max(0, params.dealerFees || 0);
  const includeFees = !!params.includeFeesInLoan;
  const extraPmt = Math.max(0, params.extraMonthlyPayment || 0);

  // Net taxable price: some states tax (Price - TradeIn)
  const taxableAmount = Math.max(0, price - tradeIn);
  const salesTax = taxableAmount * taxRate;

  let loanAmount = 0;
  let upfrontPayment = 0;

  if (includeFees) {
    loanAmount = Math.max(0, price + salesTax + fees - down - tradeIn);
    upfrontPayment = down;
  } else {
    loanAmount = Math.max(0, price - down - tradeIn);
    upfrontPayment = down + salesTax + fees;
  }

  const nMonths = years * 12;
  const iMonthly = rAnnual / 12;

  let baseMonthlyPmt = 0;
  if (loanAmount === 0) {
    baseMonthlyPmt = 0;
  } else if (iMonthly === 0) {
    baseMonthlyPmt = loanAmount / nMonths;
  } else {
    const f = Math.pow(1 + iMonthly, nMonths);
    baseMonthlyPmt = (loanAmount * (iMonthly * f)) / (f - 1);
  }

  // Calculate schedule without extra payment (baseline for interest saved)
  let baseTotalInterest = baseMonthlyPmt * nMonths - loanAmount;

  // Generate Amortization Schedule with Extra Payments
  const schedule: BoatAmortizationRow[] = [];
  let currentBalance = loanAmount;
  let cumulativeInterest = 0;
  let cumulativePrincipal = 0;
  let actualPayoffMonths = 0;

  for (let m = 1; m <= nMonths; m++) {
    if (currentBalance <= 0) break;

    const startBal = currentBalance;
    const interestCharge = startBal * iMonthly;
    let actualPmt = baseMonthlyPmt + extraPmt;

    if (startBal + interestCharge < actualPmt) {
      actualPmt = startBal + interestCharge;
    }

    const principalPaid = Math.max(0, actualPmt - interestCharge);
    currentBalance = Math.max(0, startBal - principalPaid);
    cumulativeInterest += interestCharge;
    cumulativePrincipal += principalPaid;
    actualPayoffMonths = m;

    schedule.push({
      month: m,
      year: Math.ceil(m / 12),
      startingBalance: startBal,
      payment: actualPmt,
      principal: principalPaid,
      interest: interestCharge,
      endingBalance: currentBalance,
      cumulativeInterest,
      cumulativePrincipal,
    });
  }

  // Aggregate Annual Schedule
  const annualMap = new Map<number, { interest: number; principal: number; endingBalance: number }>();
  schedule.forEach((row) => {
    const yr = row.year;
    const prev = annualMap.get(yr) || { interest: 0, principal: 0, endingBalance: 0 };
    annualMap.set(yr, {
      interest: prev.interest + row.interest,
      principal: prev.principal + row.principal,
      endingBalance: row.endingBalance,
    });
  });

  const annualSchedule = Array.from(annualMap.entries()).map(([year, data]) => ({
    year,
    interest: data.interest,
    principal: data.principal,
    endingBalance: data.endingBalance,
  }));

  const totalPaymentsMade = cumulativePrincipal + cumulativeInterest;
  const interestSaved = Math.max(0, baseTotalInterest - cumulativeInterest);
  const totalCost = price + cumulativeInterest + salesTax + fees;

  return {
    totalLoanAmount: loanAmount,
    salesTaxAmount: salesTax,
    totalUpfrontPayment: upfrontPayment,
    monthlyPayment: baseMonthlyPmt,
    totalOfPayments: totalPaymentsMade,
    totalInterestPaid: cumulativeInterest,
    totalCostOfBoat: totalCost,
    payoffMonths: actualPayoffMonths,
    interestSavedWithExtra: interestSaved,
    schedule,
    annualSchedule,
  };
}

/**
 * 2. Total Cost of Boat Ownership (TCO) Solver
 */
export interface BoatTcoResult {
  monthlyLoanPmt: number;
  monthlyMarinaMooring: number;
  monthlyInsurance: number;
  monthlyFuelMaintenance: number;
  totalMonthlyOwnershipCost: number;
  annualOwnershipCost: number;
  fiveYearTotalOwnershipCost: number;
}

export function calculateBoatTco(
  monthlyLoanPayment: number,
  annualInsurance: number,
  monthlyMarina: number,
  annualFuelMaintenance: number,
  annualWinterizationRegistration: number
): BoatTcoResult {
  const mLoan = Math.max(0, monthlyLoanPayment);
  const mMarina = Math.max(0, monthlyMarina);
  const mIns = Math.max(0, annualInsurance) / 12;
  const mFuelMaint = (Math.max(0, annualFuelMaintenance) + Math.max(0, annualWinterizationRegistration)) / 12;

  const totalMonthly = mLoan + mMarina + mIns + mFuelMaint;
  const annualTotal = totalMonthly * 12;

  return {
    monthlyLoanPmt: mLoan,
    monthlyMarinaMooring: mMarina,
    monthlyInsurance: mIns,
    monthlyFuelMaintenance: mFuelMaint,
    totalMonthlyOwnershipCost: totalMonthly,
    annualOwnershipCost: annualTotal,
    fiveYearTotalOwnershipCost: annualTotal * 5,
  };
}

/**
 * 3. Reverse Boat Loan Affordability Solver (Max Boat Price from Monthly Budget)
 */
export function solveMaxBoatPrice(
  targetMonthlyPayment: number,
  interestRatePct: number,
  loanTermYears: number,
  downPaymentCash: number = 0,
  salesTaxPct: number = 0
): { maxLoanAmount: number; maxAffordableBoatPrice: number } {
  const PMT = Math.max(0, targetMonthlyPayment);
  const r = (Number(interestRatePct) || 0) / 100 / 12;
  const n = Math.max(1, loanTermYears * 12);
  const down = Math.max(0, downPaymentCash);
  const tax = (Number(salesTaxPct) || 0) / 100;

  let maxLoan = 0;
  if (r === 0) {
    maxLoan = PMT * n;
  } else {
    const f = Math.pow(1 + r, n);
    maxLoan = (PMT * (f - 1)) / (r * f);
  }

  // Price * (1 + Tax) = Loan + Down
  const maxPrice = (maxLoan + down) / (1 + tax);

  return {
    maxLoanAmount: maxLoan,
    maxAffordableBoatPrice: maxPrice,
  };
}

/**
 * 4. Marine Refinance Estimator
 */
export function calculateMarineRefinance(
  currentBalance: number,
  currentRatePct: number,
  currentRemainingMonths: number,
  newRatePct: number,
  newTermMonths: number,
  refinanceFees: number = 0
): {
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  totalInterestOld: number;
  totalInterestNew: number;
  netLifetimeSavings: number;
} {
  const bal = Math.max(0, currentBalance);
  const rOld = currentRatePct / 100 / 12;
  const nOld = Math.max(1, currentRemainingMonths);
  const rNew = newRatePct / 100 / 12;
  const nNew = Math.max(1, newTermMonths);
  const fees = Math.max(0, refinanceFees);

  const calcPmt = (p: number, r: number, n: number) => {
    if (r === 0) return p / n;
    const f = Math.pow(1 + r, n);
    return (p * (r * f)) / (f - 1);
  };

  const oldPmt = calcPmt(bal, rOld, nOld);
  const newPmt = calcPmt(bal + fees, rNew, nNew);

  const totalOldCost = oldPmt * nOld;
  const totalNewCost = newPmt * nNew;

  const totalIntOld = totalOldCost - bal;
  const totalIntNew = totalNewCost - bal;
  const netSavings = totalOldCost - totalNewCost;

  return {
    currentMonthlyPayment: oldPmt,
    newMonthlyPayment: newPmt,
    monthlySavings: oldPmt - newPmt,
    totalInterestOld: totalIntOld,
    totalInterestNew: totalIntNew,
    netLifetimeSavings: netSavings,
  };
}
