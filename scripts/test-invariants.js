// Test script for Amortization Invariants, Extra Payments, Biweekly, Dates, and Inconsistencies

const { runCurrentAppLogic, independentMortgageCalc } = require('./test-mortgage-qa-utils.js');

console.log("=== CHECKING AMORTIZATION INVARIANTS ===");

const testRuns = [
  { name: "1 Year Loan", P: 10000, rate: 5, term: 1 },
  { name: "15 Year Loan", P: 200000, rate: 6.5, term: 15 },
  { name: "30 Year Loan", P: 400000, rate: 7.0, term: 30 },
  { name: "0% Interest Loan", P: 120000, rate: 0, term: 10 },
  { name: "High Interest Loan (18%)", P: 50000, rate: 18, term: 5 },
  { name: "Extra Monthly ($200)", P: 300000, rate: 6.5, term: 30, extraM: 200 },
  { name: "One-time Payment ($20,000 at month 12)", P: 300000, rate: 6.5, term: 30, otps: [{ amount: 20000, month: 8, year: 2027 }] },
];

testRuns.forEach((tr, idx) => {
  const res = runCurrentAppLogic({
    homePrice: tr.P,
    downPayment: 0,
    interestRate: tr.rate,
    loanTermYears: tr.term,
    extraMonthlyPayment: tr.extraM || 0,
    extraOneTimePayments: tr.otps || []
  });

  const sched = res.schedule;
  let sumPrincipal = 0;
  let sumInterest = 0;
  let prevBal = tr.P;
  let invariantPass = true;

  for (let i = 0; i < sched.length; i++) {
    const row = sched[i];
    sumPrincipal += (row.principalPaid + row.extraPaid);
    sumInterest += row.interestPaid;

    // Invariant 1: Beginning balance = prevBal
    const calcBal = prevBal - (row.principalPaid + row.extraPaid);
    if (Math.abs(calcBal - row.remainingBalance) > 0.001) {
      invariantPass = false;
      console.log(`Mismatch at month ${row.month}: prev=${prevBal}, paid=${row.principalPaid+row.extraPaid}, calcBal=${calcBal}, actual=${row.remainingBalance}`);
    }
    prevBal = row.remainingBalance;
  }

  const finalBal = sched[sched.length - 1].remainingBalance;
  const principalDiff = Math.abs(sumPrincipal - tr.P);
  const interestDiff = Math.abs(sumInterest - res.totalInterestPaid);

  console.log(`[Invariant Run ${idx+1}] ${tr.name}:`);
  console.log(`  Final Balance: ${finalBal.toFixed(4)} (Expected ~0)`);
  console.log(`  Sum Principal: ${sumPrincipal.toFixed(2)} vs Loan ${tr.P.toFixed(2)} (Diff: ${principalDiff.toFixed(4)})`);
  console.log(`  Sum Interest: ${sumInterest.toFixed(2)} vs Total Interest ${res.totalInterestPaid.toFixed(2)} (Diff: ${interestDiff.toFixed(4)})`);
  console.log(`  All Invariants Hold: ${invariantPass && finalBal < 0.01 && principalDiff < 0.01 && interestDiff < 0.01 ? "PASS" : "FAIL"}`);
});

console.log("\n=== TESTING THE PART 4 ANOMALY ===");
const part4Res = runCurrentAppLogic({
  homePrice: 400000,
  downPayment: 80000,
  downPaymentType: "amount",
  interestRate: 6.706,
  loanTermYears: 30,
  startMonth: 8,
  startYear: 2026,
  propertyTax: 1.2,
  propertyTaxType: "percent",
  homeInsurance: 1500,
  pmiRate: 0,
  hoaFee: 333.33,
  otherCosts: 4000,
  propertyTaxIncrease: 0,
  insuranceIncrease: 0,
  hoaIncrease: 0,
  otherCostsIncrease: 0,
});

console.log("Inputs: Home=$400k, DP=$80k, Loan=$320k, Rate=6.706%, 30Y");
console.log("  P&I Base:", part4Res.monthlyPrincipalAndInterest.toFixed(2));
console.log("  Monthly Property Tax:", part4Res.monthlyPropertyTax.toFixed(2));
console.log("  Monthly Home Insurance:", part4Res.monthlyInsurance.toFixed(2));
console.log("  Monthly HOA:", part4Res.monthlyHoa.toFixed(2));
console.log("  Input otherCosts (labeled $/yr in UI):", part4Res.monthlyOtherCosts);
console.log("  Displayed Total Monthly Payment in Hero Card:", part4Res.totalInitialMonthlyPayment.toFixed(2));
console.log("  Displayed Lifetime Total Other Costs:", part4Res.totalOtherCostsPaid.toFixed(2));
console.log("  Total Cost of Loan:", part4Res.totalCost.toFixed(2));
console.log("  Sum of P&I + Tax + Ins + HOA + (OtherCosts/12) =", (part4Res.monthlyPrincipalAndInterest + part4Res.monthlyPropertyTax + part4Res.monthlyInsurance + 333.33 + 4000/12).toFixed(2));
console.log("  Sum of P&I + Tax + Ins + HOA + OtherCosts =", (part4Res.monthlyPrincipalAndInterest + part4Res.monthlyPropertyTax + part4Res.monthlyInsurance + 333.33 + 4000).toFixed(2));
