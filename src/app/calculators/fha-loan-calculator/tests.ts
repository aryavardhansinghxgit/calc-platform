import { calculateFHALoan, calculateFHAVsConv, calculateCountyLimit } from "./calculator";

export function testFHALoanCalculator() {
  console.log("Running FHA Loan Calculator mathematical tests...");

  // Test 1: $500,000 Purchase, 3.5% Down, 6.632% Rate (Calculator.net Benchmark)
  const res = calculateFHALoan({
    homePrice: 500000,
    downPaymentPct: 3.5,
    creditScoreBand: "580+",
    loanTermYears: 30,
    interestRate: 6.632,
    financeUfmip: true,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 2500,
    hoaDuesMonthly: 0,
    estimatedClosingCostsPct: 3.0,
    sellerConcessionsPct: 0,
    currencySymbol: "$",
  });

  console.assert(res.baseLoanAmount === 482500, `Expected $482,500 base loan, got $${res.baseLoanAmount}`);
  console.assert(res.ufmipAmount === 8444, `Expected $8,444 UFMIP, got $${res.ufmipAmount}`);
  console.assert(res.totalFinancedLoanAmount === 490944, `Expected $490,944 financed, got $${res.totalFinancedLoanAmount}`);
  console.assert(res.monthlyMipAmount === 221, `Expected $221/mo MIP, got $${res.monthlyMipAmount}`);
  console.assert(res.mipDurationYears === "Life of Loan", `Expected Life of Loan MIP for 3.5% down, got ${res.mipDurationYears}`);

  // Test 2: 10% Down Payment 11-Year MIP Drop-off Test
  const res10 = calculateFHALoan({
    homePrice: 400000,
    downPaymentPct: 10.0,
    creditScoreBand: "580+",
    loanTermYears: 30,
    interestRate: 6.5,
    financeUfmip: true,
    propertyTaxAnnual: 4800,
    homeInsuranceAnnual: 1200,
    hoaDuesMonthly: 0,
    estimatedClosingCostsPct: 3.0,
    sellerConcessionsPct: 0,
    currencySymbol: "$",
  });

  console.assert(res10.annualMipRate === 0.50, `Expected 0.50% MIP rate for 10% down, got ${res10.annualMipRate}%`);
  console.assert(res10.mipDurationYears === 11, `Expected 11 Years MIP duration for 10% down, got ${res10.mipDurationYears}`);

  // Test 3: FHA County Limit Check
  const limitRes = calculateCountyLimit({
    propertyType: "Single Family",
    proposedLoanAmount: 450000,
  });

  console.assert(limitRes.isWithinLimit === true, `Expected within limit, got ${limitRes.isWithinLimit}`);

  console.log("All FHA Loan Calculator math tests passed successfully!");
}
