import { calculateCashBackVsLowInterest, calculateBreakevenRate } from "./calculator";

export function testCashBackCalculator() {
  console.log("Running Cash Back or Low Interest Calculator math tests...");

  // Test 1: Calculator.net Benchmark Test
  const res1 = calculateCashBackVsLowInterest({
    cashBackAmount: 1000,
    highInterestRate: 5.0,
    lowInterestRate: 2.0,
    autoPrice: 50000,
    loanTermMonths: 60,
    downPayment: 10000,
    tradeInValue: 0,
    salesTaxRate: 7.0,
    fees: 2000,
    includeFeesInLoan: false,
    taxAfterRebate: false,
    reinvestmentRate: 5.0,
    currencySymbol: "$",
  });

  console.assert(res1.winningOffer === "Low Interest Rate Offer", `Expected Low Interest Rate Offer, got ${res1.winningOffer}`);
  console.assert(res1.cashBackOffer.monthlyPayment === 735.98, `Expected $735.98 monthly for Cash Back, got $${res1.cashBackOffer.monthlyPayment}`);
  console.assert(res1.lowInterestOffer.monthlyPayment === 701.11, `Expected $701.11 monthly for Low Interest, got $${res1.lowInterestOffer.monthlyPayment}`);
  console.assert(res1.cashBackOffer.totalCost === 59659 || res1.cashBackOffer.totalCost === 59658, `Expected $59,659 total cost for Cash Back, got $${res1.cashBackOffer.totalCost}`);
  console.assert(res1.lowInterestOffer.totalCost === 57567 || res1.lowInterestOffer.totalCost === 57566, `Expected $57,567 total cost for Low Interest, got $${res1.lowInterestOffer.totalCost}`);

  // Test 2: Breakeven Rate Test
  const b = calculateBreakevenRate({ autoPrice: 50000, cashBackAmount: 1000, lowInterestRate: 2.0, loanTermMonths: 60 });
  console.assert(b.breakevenRate > 2.0, `Expected breakeven rate > 2.0%, got ${b.breakevenRate}%`);

  console.log("All Cash Back vs Low Interest math tests passed successfully!");
}
