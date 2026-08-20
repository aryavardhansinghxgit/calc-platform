import { calculateEmiModule } from "../src/modules/emi/formula";

console.log("=== 1. VERIFYING EXAMPLE 1: $20,000 @ 9% for 60 months ===");
const ex1 = calculateEmiModule({
  loanAmount: 20000,
  interestRate: 9.0,
  loanTermYears: 5,
  loanTermMonths: 0,
});
console.log(`Monthly Payment: $${ex1.monthlyEmi.toFixed(2)} (Draft: $415.17)`);
console.log(`Total Scheduled Outflow: $${(ex1.monthlyEmi * 60).toFixed(2)} (Draft: $24,910.20)`);
console.log(`Total Lifetime Interest: $${ex1.totalInterestPayable.toFixed(2)} (Draft: $4,910.20)`);

console.log("\n=== 2. VERIFYING EXAMPLE 2: $100,000 @ 10% Flat vs Reducing for 60 months ===");
const ex2 = calculateEmiModule({
  loanAmount: 100000,
  interestRate: 10.0,
  loanTermYears: 5,
  loanTermMonths: 0,
  flatInterestRate: 10.0,
});
console.log(`Reducing Total Interest: $${ex2.totalInterestPayable.toFixed(2)} (Draft: $27,482.26 / Monthly: $${ex2.monthlyEmi.toFixed(2)} vs Draft $2,124.70)`);
console.log(`Flat Rate Total Interest: $${ex2.flatRateTotalInterest.toFixed(2)} (Draft: $50,000.00 / Monthly: $${ex2.flatRateMonthlyPayment.toFixed(2)} vs Draft $2,500.00)`);
console.log(`Difference: $${ex2.flatVsReducingDifference.toFixed(2)} (Draft: $22,517.74)`);

console.log("\n=== 3. VERIFYING EXAMPLE 3: $100,000 @ 8% over 10Y with $10k Prepayment at Month 12 ===");
const ex3_base = calculateEmiModule({
  loanAmount: 100000,
  interestRate: 8.0,
  loanTermYears: 10,
  loanTermMonths: 0,
});
const ex3_tenure = calculateEmiModule({
  loanAmount: 100000,
  interestRate: 8.0,
  loanTermYears: 10,
  loanTermMonths: 0,
  oneTimePrepayment: 10000,
  oneTimePrepaymentMonth: 12,
  oneTimePrepaymentYear: new Date().getFullYear(),
  startMonth: 1,
  startYear: new Date().getFullYear(),
  prepaymentStrategy: "reduce-tenure",
});
const ex3_emi = calculateEmiModule({
  loanAmount: 100000,
  interestRate: 8.0,
  loanTermYears: 10,
  loanTermMonths: 0,
  oneTimePrepayment: 10000,
  oneTimePrepaymentMonth: 12,
  oneTimePrepaymentYear: new Date().getFullYear(),
  startMonth: 1,
  startYear: new Date().getFullYear(),
  prepaymentStrategy: "reduce-emi",
});

console.log(`Baseline: Int=$${ex3_base.totalInterestPayable.toFixed(2)} (Draft: $45,593.15), Monthly=$${ex3_base.monthlyEmi.toFixed(2)} (Draft: $1,213.28), Months=${ex3_base.totalPaymentsCount}`);
console.log(`Reduce Term: Int=$${ex3_tenure.totalInterestPayable.toFixed(2)} (Draft: $35,178.60), Saved=$${ex3_tenure.interestSaved.toFixed(2)} (Draft: $10,414.55), Months=${ex3_tenure.totalPaymentsCount} (Draft: 104 mo, Saved 16 mo)`);
console.log(`Reduce EMI: Int=$${ex3_emi.totalInterestPayable.toFixed(2)} (Draft: $39,942.25), Saved=$${ex3_emi.interestSaved.toFixed(2)} (Draft: $5,650.90), New EMI=$${ex3_emi.monthlySchedule[12].emiAmount.toFixed(2)} (Draft: $1,077.58, Saved $135.70/mo)`);

console.log("\n=== 4. VERIFYING EXAMPLE 4: $30,000 @ 7.5% for 3Y, 5Y, 7Y ===");
[3, 5, 7].forEach((y) => {
  const ex4 = calculateEmiModule({
    loanAmount: 30000,
    interestRate: 7.5,
    loanTermYears: y,
    loanTermMonths: 0,
  });
  console.log(`${y} Years (${y*12} mo): Monthly=$${ex4.monthlyEmi.toFixed(2)}, TotalInt=$${ex4.totalInterestPayable.toFixed(2)}, TotalCost=$${ex4.totalCostOfLoan.toFixed(2)}`);
});
