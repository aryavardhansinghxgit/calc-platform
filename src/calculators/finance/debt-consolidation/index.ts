import { CalculatorModuleDefinition } from "../../types";
import { safePmt } from "@/lib/calculator-engine/formulas/safety";

export const DEBT_CONSOLIDATION_CALCULATOR: CalculatorModuleDefinition = {
  id: "debt-consolidation",
  title: "Debt Consolidation Calculator",
  slug: "debt-consolidation-calculator",
  category: "Finance",
  subcategory: "Credit & Debt",
  description: "Calculate how much money and time you can save by consolidating high-interest debts into a single lower-rate loan.",
  iconName: "TrendingDown",
  featured: false,
  tags: ["debt consolidation", "combine debt", "lower interest", "refinance debt"],
  formulaDescription: "Compares cumulative existing debt payments against a consolidated loan payment schedule.",
  faqs: [
    {
      question: "How does debt consolidation save money?",
      answer: "By replacing multiple high-interest debts (like credit cards at 22%) with a single lower-rate personal loan (like 10%), more of your monthly payment goes directly toward paying down principal.",
    },
  ],
  inputs: [
    { name: "totalDebtAmount", label: "Total Debt to Consolidate", type: "currency", defaultValue: 30000, unit: "$", min: 1000, max: 500000, step: 1000 },
    { name: "currentAvgInterestRate", label: "Current Avg Interest Rate", type: "percentage", defaultValue: 21.0, unit: "%", min: 1, max: 40, step: 0.5 },
    { name: "currentTotalMonthlyPmt", label: "Current Combined Monthly Payment", type: "currency", defaultValue: 900, unit: "$", min: 100, max: 10000, step: 50 },
    { name: "newConsolidationRate", label: "New Consolidation Loan Rate", type: "percentage", defaultValue: 11.5, unit: "%", min: 1, max: 30, step: 0.5 },
    { name: "newLoanTermYears", label: "New Loan Term", type: "slider", defaultValue: 4, unit: "years", min: 1, max: 10, step: 1 },
  ],
  outputs: [
    { name: "newMonthlyPayment", label: "New Consolidated Monthly Payment", format: "currency", highlight: true },
    { name: "monthlyPaymentSavings", label: "Monthly Payment Savings", format: "currency" },
    { name: "totalInterestSavings", label: "Total Lifetime Interest Savings", format: "currency", highlight: true },
  ],
  calculate: (inputs) => {
    const bal = Math.max(0, Number(inputs.totalDebtAmount || 30000));
    const r1 = Math.min(100, Math.max(0, Number(inputs.currentAvgInterestRate || 21.0))) / 100 / 12;
    const pmt1 = Math.max(0, Number(inputs.currentTotalMonthlyPmt || 900));
    const r2 = Math.min(100, Math.max(0, Number(inputs.newConsolidationRate || 11.5))) / 100 / 12;
    const n2 = Math.max(1, Number(inputs.newLoanTermYears || 4)) * 12;

    if (bal <= 0 || n2 <= 0) {
      return { newMonthlyPayment: 0, monthlyPaymentSavings: 0, totalInterestSavings: 0 };
    }

    let currentBal = bal;
    let currentMonths = 0;
    let currentTotalInterest = 0;

    if (pmt1 > currentBal * r1) {
      while (currentBal > 0 && currentMonths < 600) {
        currentMonths++;
        const interest = currentBal * r1;
        let principal = pmt1 - interest;
        if (principal > currentBal) principal = currentBal;
        if (principal <= 0) break;
        currentTotalInterest += interest;
        currentBal -= principal;
      }
    }

    const pmt2 = safePmt(bal, r2, n2);
    const newTotalInterest = (pmt2 * n2) - bal;

    const monthlySavings = pmt1 - pmt2;
    const interestSavings = Math.max(0, currentTotalInterest - newTotalInterest);

    return {
      newMonthlyPayment: Number(pmt2.toFixed(2)),
      monthlyPaymentSavings: Number(monthlySavings.toFixed(2)),
      totalInterestSavings: Number(interestSavings.toFixed(2)),
    };
  },
};

export default DEBT_CONSOLIDATION_CALCULATOR;
