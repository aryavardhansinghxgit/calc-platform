/**
 * Unit Test Suite for Auto Loan Calculator Formula.
 */

import { calculateAutoLoanFormula } from "../calculator-engine/formulas/auto-loan";

function assertEqual(actual: any, expected: any, testName: string) {
  if (actual !== expected) {
    throw new Error(`[FAIL] ${testName}: Expected ${expected}, but got ${actual}`);
  }
}

export function runAutoLoanTests(): { passed: boolean; count: number } {
  let count = 0;

  // Test 1: Standard Auto Loan Calculation ($35,000 car, $5,000 down, $2,000 trade-in, 7% tax, $500 fees, 5.9% APR, 60 mo)
  const result1 = calculateAutoLoanFormula({
    vehiclePrice: 35000,
    downPayment: 5000,
    tradeInValue: 2000,
    salesTaxRate: 7,
    fees: 500,
    interestRate: 5.9,
    loanTermMonths: 60,
  });

  // Net Vehicle Price: 35000 - 5000 - 2000 = 28000
  // Tax: 28000 * 0.07 = 1960
  // Financed Loan Amount: 28000 + 1960 + 500 = 30460
  assertEqual(result1.loanAmount, 30460, "Auto Loan Financed Amount");
  assertEqual(result1.totalSalesTax, 1960, "Auto Loan Sales Tax");
  assertEqual(result1.monthlyPayment, 587.46, "Auto Loan Monthly Payment");
  count++;

  // Test 2: 0% Interest Rate Financing
  const result2 = calculateAutoLoanFormula({
    vehiclePrice: 24000,
    downPayment: 4000,
    tradeInValue: 0,
    salesTaxRate: 0,
    fees: 0,
    interestRate: 0,
    loanTermMonths: 48,
  });

  assertEqual(result2.loanAmount, 20000, "0% APR Loan Amount");
  assertEqual(result2.monthlyPayment, 416.67, "0% APR Monthly Payment");
  assertEqual(result2.totalInterestPaid, 0, "0% APR Total Interest");
  count++;

  // Test 3: Fully paid upfront (Down payment + Trade-in exceeds price + tax)
  const result3 = calculateAutoLoanFormula({
    vehiclePrice: 10000,
    downPayment: 8000,
    tradeInValue: 5000,
    salesTaxRate: 5,
    fees: 100,
    interestRate: 6,
    loanTermMonths: 36,
  });

  assertEqual(result3.loanAmount, 0, "Full Down Payment zero loan amount");
  assertEqual(result3.monthlyPayment, 0, "Full Down Payment zero monthly payment");
  count++;

  return { passed: true, count };
}
