import { calculateHomeEquityLoan, calculateCLTVSolver } from "./calculator";

export function testHomeEquityLoanCalculator() {
  console.log("Running Home Equity Loan Calculator mathematical tests...");

  // Test 1: Calculator.net Benchmark Test ($600,000 Home Value, $250,000 1st Mortgage, 80% CLTV Cap)
  const cltvRes = calculateCLTVSolver({
    homeValue: 600000,
    currentMortgageBalance: 250000,
    cltvCapPct: 80,
  });

  console.assert(cltvRes.maxAllowableTotalDebt === 480000, `Expected $480,000 max total debt, got $${cltvRes.maxAllowableTotalDebt}`);
  console.assert(cltvRes.maxBorrowableEquity === 230000, `Expected $230,000 max borrowable, got $${cltvRes.maxBorrowableEquity}`);
  console.assert(cltvRes.currentLtv === 41.7, `Expected 41.7% current LTV, got ${cltvRes.currentLtv}%`);

  // Test 2: $150,000 Loan @ 8.0% for 15 Years (Calculator.net Benchmark)
  const res = calculateHomeEquityLoan({
    calcMode: "amount",
    homeValue: 600000,
    currentMortgageBalance: 250000,
    cltvLimitPct: 80,
    loanAmount: 150000,
    loanTermYears: 15,
    interestRate: 8.0,
    closingCostsAmount: 7500,
    closingCostTreatment: "upfront",
    currencySymbol: "$",
  });

  console.assert(res.monthlyPayment === 1433, `Expected $1,433/mo payment, got $${res.monthlyPayment}`);
  console.assert(res.totalRepayment === 258026, `Expected $258,026 total repayment, got $${res.totalRepayment}`);
  console.assert(res.totalInterestPaid === 108026, `Expected $108,026 total interest, got $${res.totalInterestPaid}`);

  console.log("All Home Equity Loan Calculator math tests passed successfully!");
}
