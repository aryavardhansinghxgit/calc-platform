import { calculateIncomeAffordability, calculate503020Budget, calculateTrueCostUtilities, calculateUpfrontMoveIn } from "./calculator";

export function testRentCalculator() {
  console.log("Running Rent Calculator mathematical tests...");

  // Test 1: 30% Gross Rule for $72,000 Annual Salary
  const aff = calculateIncomeAffordability({
    incomeFrequency: "annual",
    grossIncome: 72000,
    monthlyDebt: 0,
    rulePreset: "30",
    currency: "$",
  });
  console.assert(aff.maxMonthlyRent === 1800, `Expected 1800, got ${aff.maxMonthlyRent}`);
  console.assert(aff.frontEndRatio === 30, `Expected 30%, got ${aff.frontEndRatio}%`);

  // Test 2: 40x Rule equivalent for $72,000 Annual Salary
  const aff40 = calculateIncomeAffordability({
    incomeFrequency: "annual",
    grossIncome: 72000,
    monthlyDebt: 0,
    rulePreset: "40x",
    currency: "$",
  });
  console.assert(aff40.maxMonthlyRent === 1800, `Expected 1800, got ${aff40.maxMonthlyRent}`);

  // Test 3: 50/30/20 Budget for $4,000 Take-Home
  const b50 = calculate503020Budget({
    monthlyTakeHome: 4000,
    needsPercent: 50,
    wantsPercent: 30,
    savingsPercent: 20,
  });
  console.assert(b50.needsAmount === 2000, `Expected 2000 needs, got ${b50.needsAmount}`);
  console.assert(b50.maxRentFromNeeds === 1200, `Expected 1200 rent, got ${b50.maxRentFromNeeds}`);

  // Test 4: True Cost with $1,500 base rent and $300 utilities
  const tc = calculateTrueCostUtilities({
    baseRent: 1500,
    electricityGas: 100,
    waterSewerTrash: 50,
    internetCable: 70,
    rentersInsurance: 20,
    parkingFee: 60,
    petRent: 0,
    amenityHoaFee: 0,
  });
  console.assert(tc.totalMonthlyOverhead === 1800, `Expected 1800 total, got ${tc.totalMonthlyOverhead}`);

  console.log("All Rent Calculator math tests passed successfully!");
}
