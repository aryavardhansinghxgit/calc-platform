import { CalculatorModuleDefinition } from "../../types";

export const ROTH_IRA_CALCULATOR: CalculatorModuleDefinition = {
  id: "roth-ira",
  title: "Roth IRA Calculator",
  slug: "roth-ira-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description: "Calculate tax-free compound growth and retirement income from a Roth IRA account.",
  iconName: "Shield",
  featured: true,
  tags: ["roth ira", "tax free growth", "roth retirement", "tax free income"],
  formulaDescription: "FV = P × (1 + r)^n + Annual Contribution × [((1 + r)^n - 1) / r]. All earnings are 100% tax-free in retirement.",
  faqs: [
    {
      question: "Why choose a Roth IRA over a Traditional IRA?",
      answer: "Roth IRA contributions are made with after-tax dollars, meaning 100% of your investment growth and future qualified withdrawals are tax-free.",
    },
  ],
  inputs: [
    { name: "currentBalance", label: "Current Roth IRA Balance", type: "currency", defaultValue: 15000, unit: "$", min: 0, max: 1000000, step: 1000 },
    { name: "annualContribution", label: "Annual Roth Contribution", type: "currency", defaultValue: 7000, unit: "$", min: 0, max: 8000, step: 250 },
    { name: "yearsToRetirement", label: "Years Until Retirement", type: "slider", defaultValue: 25, unit: "years", min: 1, max: 45, step: 1 },
    { name: "expectedReturn", label: "Expected Annual Return", type: "percentage", defaultValue: 8.0, unit: "%", min: 1, max: 15, step: 0.5 },
  ],
  outputs: [
    { name: "taxFreeBalance", label: "100% Tax-Free Retirement Balance", format: "currency", highlight: true },
    { name: "totalEarningsTaxFree", label: "Total Tax-Free Growth", format: "currency", highlight: true },
    { name: "totalContributions", label: "Total Contributions", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.currentBalance || 15000);
    const pmt = Number(inputs.annualContribution || 7000);
    const years = Number(inputs.yearsToRetirement || 25);
    const r = Number(inputs.expectedReturn || 8.0) / 100;

    const fvPrincipal = P * Math.pow(1 + r, years);
    const fvAnnuity = pmt * ((Math.pow(1 + r, years) - 1) / r);
    const totalFV = fvPrincipal + fvAnnuity;
    const totalContrib = P + (pmt * years);
    const totalEarnings = totalFV - totalContrib;

    return {
      taxFreeBalance: Number(totalFV.toFixed(2)),
      totalEarningsTaxFree: Number(totalEarnings.toFixed(2)),
      totalContributions: Number(totalContrib.toFixed(2)),
    };
  },
};

export default ROTH_IRA_CALCULATOR;
