import { calculateStandardDTI, evaluateMortgageEligibility, calculateReverseTargetIncome, calculateReverseMaxHousing } from "./calculator";

export function testDTICalculator() {
  console.log("Running DTI Calculator mathematical tests...");

  // Test 1: $6,500 Gross Monthly, $1,800 Housing, $750 Debts
  const res = calculateStandardDTI({
    incomeFreq: "monthly",
    income: { primarySalary: 6500, coBorrowerIncome: 0, bonusesCommissions: 0, dividendsAlimonyOther: 0 },
    housing: { mortgageRentPI: 1800, propertyTaxes: 0, hazardInsurance: 0, pmiMip: 0, hoaFees: 0 },
    debts: { autoLoansLeases: 350, studentLoans: 250, creditCardMinimums: 150, personalLoans: 0, alimonyChildSupportPaid: 0, otherDebts: 0 },
    currencySymbol: "$",
  });

  console.assert(res.frontEndRatio === 27.69, `Expected 27.69%, got ${res.frontEndRatio}%`);
  console.assert(res.backEndRatio === 39.23, `Expected 39.23%, got ${res.backEndRatio}%`);
  console.assert(res.riskTier === "Manageable / Good", `Expected Manageable / Good, got ${res.riskTier}`);

  // Test 2: Reverse Target Income for $1,800 housing + $600 debt at 36% target DTI
  const rev = calculateReverseTargetIncome({
    desiredHousingCost: 1800,
    existingMonthlyDebt: 600,
    targetBackEndPct: 36,
  });
  console.assert(rev.requiredMonthlyGross === 6667, `Expected 6667, got ${rev.requiredMonthlyGross}`);

  // Test 3: Reverse Max Housing Budget for $6,000 income, $500 debt at 43% target DTI
  const maxH = calculateReverseMaxHousing({
    grossMonthlyIncome: 6000,
    existingMonthlyDebt: 500,
    targetMaxDTIPct: 43,
  });
  console.assert(maxH.maxAllowableHousingPayment === 2080, `Expected 2080, got ${maxH.maxAllowableHousingPayment}`);

  console.log("All DTI Calculator math tests passed successfully!");
}
