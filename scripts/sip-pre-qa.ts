import { calculateSipFormula } from "../src/lib/calculator-engine/formulas/sip";

console.log("=== STEP-UP NUMERICAL AUDIT ===");
const base = calculateSipFormula({
  investmentType: "sip",
  monthlyInvestment: 500,
  expectedReturnRate: 12,
  timePeriodYears: 10,
});
const stepUp = calculateSipFormula({
  investmentType: "stepup",
  monthlyInvestment: 500,
  expectedReturnRate: 12,
  timePeriodYears: 10,
  stepUpRate: 10,
});

console.log(`Base: Invested=$${base.totalInvested.toFixed(2)}, Maturity=$${base.totalMaturityValue.toFixed(2)}, Returns=$${base.estimatedReturns.toFixed(2)}`);
console.log(`StepUp: Invested=$${stepUp.totalInvested.toFixed(2)}, Maturity=$${stepUp.totalMaturityValue.toFixed(2)}, Returns=$${stepUp.estimatedReturns.toFixed(2)}`);
console.log(`Additional Invested: $${(stepUp.totalInvested - base.totalInvested).toFixed(2)}`);
console.log(`Additional Returns: $${(stepUp.estimatedReturns - base.estimatedReturns).toFixed(2)}`);
console.log(`Total Increase in Projected Maturity: $${(stepUp.totalMaturityValue - base.totalMaturityValue).toFixed(2)}`);

console.log("\n=== GOAL SEEKER NUMERICAL AUDIT ===");
const goal = calculateSipFormula({
  targetGoalAmount: 250000,
  expectedReturnRate: 9,
  timePeriodYears: 15,
});
console.log(`Target: $250,000 in 15Y @ 9%`);
console.log(`Required Monthly SIP: $${goal.goalSeek.requiredMonthlySip.toFixed(2)}`);
const goalCheck = calculateSipFormula({
  monthlyInvestment: goal.goalSeek.requiredMonthlySip,
  expectedReturnRate: 9,
  timePeriodYears: 15,
});
console.log(`Check Maturity with $${goal.goalSeek.requiredMonthlySip}: $${goalCheck.totalMaturityValue.toFixed(2)}`);
console.log(`Check Invested: $${goalCheck.totalInvested.toFixed(2)} | Check Returns: $${goalCheck.estimatedReturns.toFixed(2)}`);
