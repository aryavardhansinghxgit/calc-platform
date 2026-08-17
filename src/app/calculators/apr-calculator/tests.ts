import { calculateStandardAPR, calculateMortgageAPR, calculateReverseAPR } from "./calculator";

export function testAPRCalculator() {
  console.log("Running APR Calculator mathematical tests...");

  // Test 1: Calculator.net Benchmark Test ($100,000 Loan, 10 Years, 6% Interest Rate, $2,500 Fees)
  const res = calculateStandardAPR({
    loanAmount: 100000,
    interestRate: 6.0,
    loanTermYears: 10,
    loanTermMonths: 0,
    upfrontFees: 2500,
    compounding: "monthly",
    payback: "monthly",
    currencySymbol: "$",
  });

  console.assert(res.realAPR >= 6.55 && res.realAPR <= 6.57, `Expected APR ~6.563%, got ${res.realAPR}%`);
  console.assert(res.periodicPayment === 1110.21, `Expected payment $1110.21, got $${res.periodicPayment}`);

  // Test 2: Mortgage Benchmark Test ($350,000 house, $70,000 down, 6.2% rate, 30 years, $3,500 fees, 0.5 points)
  const mRes = calculateMortgageAPR({
    houseValue: 350000,
    downPayment: 70000,
    loanTermYears: 30,
    interestRate: 6.2,
    loanFees: 3500,
    pointsPct: 0.5,
    pmiPerYear: 0,
  });

  console.assert(mRes.loanAmount === 280000, `Expected $280,000 loan, got $${mRes.loanAmount}`);
  console.assert(mRes.totalUpfrontFees === 4900, `Expected $4,900 fees, got $${mRes.totalUpfrontFees}`);
  console.assert(mRes.realAPR >= 6.35 && mRes.realAPR <= 6.38, `Expected APR ~6.367%, got ${mRes.realAPR}%`);

  // Test 3: Reverse Target APR Solver Test ($500/mo payment over 5 years at 7.5% APR)
  const rev = calculateReverseAPR({
    desiredMonthlyPayment: 500,
    loanTermYears: 5,
    upfrontFees: 1000,
    targetAPR: 7.5,
  });

  console.assert(rev.maxBorrowingCapacity > 25000, `Expected capacity > $25,000, got $${rev.maxBorrowingCapacity}`);

  console.log("All APR Calculator math tests passed successfully!");
}
