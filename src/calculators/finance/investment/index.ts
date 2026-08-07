import { CalculatorModuleDefinition } from "../../types";

export const INVESTMENT_CALCULATOR: CalculatorModuleDefinition = {
  id: "investment",
  title: "Investment Calculator",
  slug: "investment-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate future portfolio growth with initial principal, recurring contributions, and expected rate of return.",
  iconName: "DollarSign",
  featured: true,
  tags: ["investment", "portfolio growth", "wealth building", "future value"],
  formulaDescription: "FV = Principal × (1 + r)^n + PMT × [((1 + r)^n - 1) / r]",
  faqs: [
    {
      question: "How do monthly contributions impact long-term portfolio growth?",
      answer: "Consistent monthly contributions accelerate compounding by adding fresh principal each month to earn compound returns.",
    },
  ],
  inputs: [
    { name: "startingBalance", label: "Starting Principal", type: "currency", defaultValue: 20000, unit: "$", min: 0, max: 5000000, step: 1000 },
    { name: "monthlyContribution", label: "Monthly Contribution", type: "currency", defaultValue: 500, unit: "$", min: 0, max: 50000, step: 50 },
    { name: "expectedReturn", label: "Expected Annual Return", type: "percentage", defaultValue: 8.0, unit: "%", min: 0.1, max: 25, step: 0.1 },
    { name: "timeYears", label: "Investment Duration", type: "slider", defaultValue: 20, unit: "years", min: 1, max: 40, step: 1 },
  ],
  outputs: [
    { name: "futurePortfolioValue", label: "Future Portfolio Value", format: "currency", highlight: true },
    { name: "totalContributions", label: "Total Principal Contributed", format: "currency" },
    { name: "totalInterestEarned", label: "Total Growth Earned", format: "currency", highlight: true },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.startingBalance || 20000);
    const pmt = Number(inputs.monthlyContribution || 500);
    const r = Number(inputs.expectedReturn || 8.0) / 100 / 12;
    const n = Number(inputs.timeYears || 20) * 12;

    const fvPrincipal = P * Math.pow(1 + r, n);
    const fvAnnuity = pmt * ((Math.pow(1 + r, n) - 1) / r);
    const totalFV = fvPrincipal + fvAnnuity;
    const totalContrib = P + (pmt * n);
    const totalInterest = totalFV - totalContrib;

    return {
      futurePortfolioValue: Number(totalFV.toFixed(2)),
      totalContributions: Number(totalContrib.toFixed(2)),
      totalInterestEarned: Number(totalInterest.toFixed(2)),
    };
  },
};

export default INVESTMENT_CALCULATOR;
