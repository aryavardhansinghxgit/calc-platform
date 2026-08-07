import { CalculatorModuleDefinition } from "../../types";

export const SOCIAL_SECURITY_CALCULATOR: CalculatorModuleDefinition = {
  id: "social-security",
  title: "Social Security Calculator",
  slug: "social-security-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description: "Estimate Social Security retirement benefits based on Primary Insurance Amount (PIA) and retirement age.",
  iconName: "Shield",
  featured: true,
  tags: ["social security", "ssi", "retirement benefits", "claiming age"],
  formulaDescription: "Adjusts Full Retirement Age (FRA) baseline benefit down for early claim (age 62) or up for delayed credits (age 70).",
  faqs: [
    {
      question: "How does claiming Social Security early or late impact my monthly check?",
      answer: "Claiming early at age 62 permanently reduces your monthly check by up to 30%. Delaying past Full Retirement Age until age 70 increases your monthly check by 8% per year.",
    },
  ],
  inputs: [
    { name: "monthlyFraBenefit", label: "Estimated Benefit at Full Retirement Age (67)", type: "currency", defaultValue: 2200, unit: "$", min: 500, max: 4873, step: 50 },
    {
      name: "claimingAge",
      label: "Claiming Age",
      type: "select",
      defaultValue: 67,
      options: [
        { label: "Age 62 (Early - 30% reduction)", value: 62 },
        { label: "Age 65 (Early - 13.3% reduction)", value: 65 },
        { label: "Age 67 (Full Retirement Age)", value: 67 },
        { label: "Age 70 (Delayed - 24% boost)", value: 70 },
      ],
    },
  ],
  outputs: [
    { name: "monthlyBenefit", label: "Estimated Monthly Benefit", format: "currency", highlight: true },
    { name: "annualBenefit", label: "Estimated Annual Benefit", format: "currency", highlight: true },
    { name: "benefitMultiplier", label: "Adjustment Factor", format: "percentage" },
  ],
  calculate: (inputs) => {
    const baseline = Number(inputs.monthlyFraBenefit || 2200);
    const age = Number(inputs.claimingAge || 67);

    let factor = 1.0;
    if (age === 62) factor = 0.70;
    else if (age === 65) factor = 0.867;
    else if (age === 67) factor = 1.0;
    else if (age === 70) factor = 1.24;

    const monthly = baseline * factor;
    const annual = monthly * 12;

    return {
      monthlyBenefit: Number(monthly.toFixed(2)),
      annualBenefit: Number(annual.toFixed(2)),
      benefitMultiplier: `${(factor * 100).toFixed(1)}%`,
    };
  },
};

export default SOCIAL_SECURITY_CALCULATOR;
