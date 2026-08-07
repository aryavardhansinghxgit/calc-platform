import { CalculatorModuleDefinition } from "../../types";

export const TRADITIONAL_IRA_CALCULATOR: CalculatorModuleDefinition = {
  id: "traditional-ira",
  title: "Traditional IRA Calculator",
  slug: "traditional-ira-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description: "Calculate pre-tax Traditional IRA growth and estimated post-tax retirement distributions.",
  iconName: "Shield",
  featured: false,
  tags: ["traditional ira", "ira growth", "pre tax retirement", "tax deferred"],
  formulaDescription: "FV = P × (1 + r)^n + Annual Contribution × [((1 + r)^n - 1) / r]. Taxes applied at withdrawal.",
  faqs: [
    {
      question: "How are Traditional IRA withdrawals taxed?",
      answer: "Traditional IRA contributions are tax-deductible when made, and withdrawals in retirement are taxed as ordinary income.",
    },
  ],
  inputs: [
    { name: "currentBalance", label: "Current IRA Balance", type: "currency", defaultValue: 10000, unit: "$", min: 0, max: 1000000, step: 1000 },
    { name: "annualContribution", label: "Annual IRA Contribution", type: "currency", defaultValue: 7000, unit: "$", min: 0, max: 8000, step: 250 },
    { name: "yearsToRetirement", label: "Years Until Retirement", type: "slider", defaultValue: 25, unit: "years", min: 1, max: 45, step: 1 },
    { name: "expectedReturn", label: "Expected Annual Return", type: "percentage", defaultValue: 7.0, unit: "%", min: 1, max: 15, step: 0.5 },
    { name: "retirementTaxRate", label: "Estimated Retirement Tax Rate", type: "percentage", defaultValue: 20, unit: "%", min: 0, max: 40, step: 1 },
  ],
  outputs: [
    { name: "preTaxBalance", label: "Pre-Tax IRA Nest Egg", format: "currency", highlight: true },
    { name: "afterTaxBalance", label: "Estimated After-Tax Value", format: "currency", highlight: true },
    { name: "totalContributions", label: "Total Contributions", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.currentBalance || 10000);
    const pmt = Number(inputs.annualContribution || 7000);
    const years = Number(inputs.yearsToRetirement || 25);
    const r = Number(inputs.expectedReturn || 7.0) / 100;
    const taxRate = Number(inputs.retirementTaxRate || 20) / 100;

    const fvPrincipal = P * Math.pow(1 + r, years);
    const fvAnnuity = pmt * ((Math.pow(1 + r, years) - 1) / r);
    const preTax = fvPrincipal + fvAnnuity;
    const afterTax = preTax * (1 - taxRate);
    const totalContrib = P + (pmt * years);

    return {
      preTaxBalance: Number(preTax.toFixed(2)),
      afterTaxBalance: Number(afterTax.toFixed(2)),
      totalContributions: Number(totalContrib.toFixed(2)),
    };
  },
};

export default TRADITIONAL_IRA_CALCULATOR;
