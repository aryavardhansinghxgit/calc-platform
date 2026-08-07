import { CalculatorModuleDefinition } from "../../types";

export const ANNUITY_CALCULATOR: CalculatorModuleDefinition = {
  id: "annuity",
  title: "Annuity Calculator",
  slug: "annuity-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description: "Calculate future annuity accumulation balance based on initial investment, recurring deposits, and growth rate.",
  iconName: "Shield",
  featured: false,
  tags: ["annuity", "fixed annuity", "annuity accumulation", "guaranteed growth"],
  formulaDescription: "FV = P × (1 + r)^n + PMT × [((1 + r)^n - 1) / r]",
  faqs: [
    {
      question: "What is an annuity accumulation phase?",
      answer: "The accumulation phase is the period when you make payments into an annuity contract to accumulate tax-deferred investment growth prior to retirement payouts.",
    },
  ],
  inputs: [
    { name: "initialDeposit", label: "Initial Premium Deposit", type: "currency", defaultValue: 50000, unit: "$", min: 1000, max: 2000000, step: 5000 },
    { name: "monthlyDeposit", label: "Monthly Contribution", type: "currency", defaultValue: 400, unit: "$", min: 0, max: 10000, step: 50 },
    { name: "interestRate", label: "Guaranteed Interest Rate", type: "percentage", defaultValue: 5.5, unit: "%", min: 0.1, max: 15, step: 0.1 },
    { name: "yearsToAccumulate", label: "Accumulation Term", type: "slider", defaultValue: 20, unit: "years", min: 1, max: 40, step: 1 },
  ],
  outputs: [
    { name: "futureAnnuityValue", label: "Future Annuity Value", format: "currency", highlight: true },
    { name: "totalInterestEarned", label: "Total Interest Growth", format: "currency", highlight: true },
    { name: "totalPremiumsPaid", label: "Total Premiums Paid", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.initialDeposit || 50000);
    const pmt = Number(inputs.monthlyDeposit || 400);
    const r = Number(inputs.interestRate || 5.5) / 100 / 12;
    const n = Number(inputs.yearsToAccumulate || 20) * 12;

    const fvPrincipal = P * Math.pow(1 + r, n);
    const fvAnnuity = r > 0 ? pmt * ((Math.pow(1 + r, n) - 1) / r) : pmt * n;
    const totalFV = fvPrincipal + fvAnnuity;
    const totalPremiums = P + (pmt * n);
    const interest = totalFV - totalPremiums;

    return {
      futureAnnuityValue: Number(totalFV.toFixed(2)),
      totalInterestEarned: Number(interest.toFixed(2)),
      totalPremiumsPaid: Number(totalPremiums.toFixed(2)),
    };
  },
};

export default ANNUITY_CALCULATOR;
