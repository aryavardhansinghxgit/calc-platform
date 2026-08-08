/**
 * Unit Test Suite for Expanded Auto Loan Calculator Formula.
 */

import { calculateAutoLoanFormula } from "../calculator-engine/formulas/auto-loan";

function assertEqual(actual: any, expected: any, testName: string) {
  if (actual !== expected) {
    throw new Error(`[FAIL] ${testName}: Expected ${expected}, but got ${actual}`);
  }
}

export function runAutoLoanTests(): { passed: boolean; count: number } {
  let count = 0;

  // Test 1: Standard Auto Loan Calculation
  const result1 = calculateAutoLoanFormula({
    vehiclePrice: 35000,
    downPayment: 5000,
    tradeInValue: 3000,
    amountOwedOnTradeIn: 0,
    salesTaxRate: 6,
    registrationFees: 300,
    dealerFees: 250,
    interestRate: 5.9,
    loanTermMonths: 60,
    includeFeesInLoan: true,
  });

  // Taxable: 35000 - 3000 = 32000; Tax: 32000 * 0.06 = 1920
  // Fees: 300 + 250 = 550
  // Financed Loan: 35000 - 5000 - 3000 + 1920 + 550 = 29470
  assertEqual(result1.loanAmount, 29470, "Auto Loan Financed Amount");
  assertEqual(result1.totalSalesTax, 1920, "Auto Loan Sales Tax");
  assertEqual(result1.monthlyPayment, 568.37, "Auto Loan Monthly Payment");
  count++;

  // Test 2: Negative Equity Trade-In Rollover
  const result2 = calculateAutoLoanFormula({
    vehiclePrice: 25000,
    downPayment: 2000,
    tradeInValue: 8000,
    amountOwedOnTradeIn: 11000, // Negative equity of $3,000
    salesTaxRate: 5,
    registrationFees: 200,
    interestRate: 6.0,
    loanTermMonths: 48,
    includeFeesInLoan: true,
  });

  // Net equity: 8000 - 11000 = -3000 -> Rollover = 3000
  assertEqual(result2.isNegativeEquity, true, "Negative Equity Flag");
  assertEqual(result2.negativeEquityRollover, 3000, "Negative Equity Rollover");
  count++;

  // Test 3: 0% Interest Rate Financing
  const result3 = calculateAutoLoanFormula({
    vehiclePrice: 24000,
    downPayment: 4000,
    tradeInValue: 0,
    salesTaxRate: 0,
    registrationFees: 0,
    interestRate: 0,
    loanTermMonths: 48,
    includeFeesInLoan: true,
  });

  assertEqual(result3.loanAmount, 20000, "0% APR Loan Amount");
  assertEqual(result3.monthlyPayment, 416.67, "0% APR Monthly Payment");
  assertEqual(result3.totalInterestPaid, 0, "0% APR Total Interest");
  count++;

  // Test 4: Term Comparison & Health Score
  const result4 = calculateAutoLoanFormula({
    vehiclePrice: 40000,
    downPayment: 8000, // 20% down
    interestRate: 4.5,
    loanTermMonths: 60,
  });

  assertEqual(result4.termComparison.length, 5, "5 Term Options Matrix");
  assertEqual(result4.healthScore.category, "Excellent", "Health Score Excellent Category");
  count++;

  return { passed: true, count };
}

// Auto-run tests on import in non-prod
if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
  runAutoLoanTests();
}
