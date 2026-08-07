import { MORTGAGE_CALCULATOR } from "../index";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[FAIL] ${message}`);
  }
}

export function runMortgageFormulaTests() {
  const result = MORTGAGE_CALCULATOR.calculate({
    homePrice: 400000,
    downPayment: 80000,
    interestRate: 6.5,
    loanTermYears: 30,
    propertyTaxRate: 1.2,
    homeInsuranceAnnual: 1200,
    hoaFeeMonthly: 0,
    extraMonthlyPayment: 0,
  });

  assert(result.loanAmount === 320000, "Mortgage Loan Amount calculation");
  assert(Number(result.monthlyPrincipalAndInterest) > 2000, "Mortgage Monthly P&I");
  assert(Number(result.totalMonthlyPayment) > 2400, "Mortgage Total Monthly Payment");

  return { passed: true };
}
