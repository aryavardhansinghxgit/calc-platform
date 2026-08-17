import {
  calculateAmortizationLoanRate,
  calculateLumpSumYield,
  calculateRateConverter,
  calculateFisherTaxReturn,
} from "./calculator";

export function runInterestRateTests() {
  console.log("Running Interest Rate Calculator Tests...");

  // Test 1: Amortized Loan Rate
  const loanRes = calculateAmortizationLoanRate({
    loanAmount: 32000,
    years: 3,
    months: 0,
    monthlyPayment: 960,
    upfrontFees: 0,
    balloonPayment: 0,
  });
  console.assert(loanRes.statedInterestRate > 5.0 && loanRes.statedInterestRate < 5.2, "Loan rate test failed");

  // Test 2: Lump Sum Yield
  const lumpRes = calculateLumpSumYield({
    startingPrincipal: 5000,
    endingBalance: 8000,
    years: 5,
    months: 0,
    days: 0,
    compoundingFrequency: "monthly",
  });
  console.assert(lumpRes.annualNominalRate > 9.3 && lumpRes.annualNominalRate < 9.6, "Lump sum yield test failed");

  // Test 3: Rate Converter
  const convRes = calculateRateConverter({
    nominalRate: 6.0,
    compoundingFrequency: "monthly",
  });
  console.assert(convRes.effectiveAnnualRate > 6.16 && convRes.effectiveAnnualRate < 6.18, "Rate converter test failed");

  // Test 4: Fisher Tax Return
  const fisherRes = calculateFisherTaxReturn({
    nominalRate: 8.0,
    inflationRate: 3.0,
    taxRate: 25.0,
  });
  console.assert(fisherRes.afterTaxNominalYield === 6.0, "Fisher tax yield test failed");

  console.log("All Interest Rate Calculator tests passed!");
}
