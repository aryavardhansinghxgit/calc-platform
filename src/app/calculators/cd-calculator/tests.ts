import {
  calculateStandardCd,
  calculateCdLadder,
  calculateCdVsHysa,
  calculateEarlyWithdrawalPenalty,
  calculateCdGoalSolver,
} from "./calculator";

export function runCdTests() {
  console.log("Running CD Calculator Tests...");

  // Test 1: Standard CD
  const stdRes = calculateStandardCd({
    startingDeposit: 10000,
    termMonths: 12,
    rateValue: 5.0,
    rateType: "apy",
    compoundingFrequency: "daily",
    marginalTaxRate: 24,
    inflationRate: 2.5,
  });
  console.assert(stdRes.finalBalance === 10500, `Expected 10500, got ${stdRes.finalBalance}`);
  console.assert(stdRes.totalInterestPreTax === 500, `Expected 500, got ${stdRes.totalInterestPreTax}`);

  // Test 2: CD Ladder
  const ladderRes = calculateCdLadder({
    totalCapital: 25000,
    stagesCount: 5,
    baseShortRate: 4.0,
    topLongRate: 5.0,
  });
  console.assert(ladderRes.stages.length === 5, "Ladder stages count mismatch");
  console.assert(ladderRes.blendedApy === 4.5, `Expected 4.5 blended APY, got ${ladderRes.blendedApy}`);

  // Test 3: Early Exit Penalty
  const exitRes = calculateEarlyWithdrawalPenalty({
    originalPrincipal: 10000,
    cdRateApy: 5.0,
    cdTermMonths: 12,
    penaltyDays: 90,
    monthsElapsedBeforeExit: 6,
    newReinvestmentRateApy: 6.0,
  });
  console.assert(exitRes.penaltyAmount > 120 && exitRes.penaltyAmount < 130, "Penalty math failed");

  // Test 4: Goal Solver
  const goalRes = calculateCdGoalSolver({
    targetBalance: 10500,
    rateApy: 5.0,
    years: 1,
    months: 0,
    compoundingFrequency: "daily",
  });
  console.assert(goalRes.requiredInitialDeposit === 10000, `Expected 10000 required deposit, got ${goalRes.requiredInitialDeposit}`);

  console.log("All CD Calculator tests passed!");
}
