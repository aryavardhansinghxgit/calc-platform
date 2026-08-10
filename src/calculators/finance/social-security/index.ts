import { CalculatorModuleDefinition } from "../../types";
import { calculateSocialSecuritySuite } from "@/lib/calculator-engine/formulas/social-security";

export const SOCIAL_SECURITY_CALCULATOR: CalculatorModuleDefinition = {
  id: "social-security",
  title: "Social Security Calculator – Ideal Claiming Age & Benefits Suite",
  slug: "social-security-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description:
    "Free Social Security Benefits Calculator. Determine your ideal claiming age (62 vs FRA vs 70), compare two application ages, calculate Full Retirement Age (FRA) credits, estimate spousal/survivor benefits, and optimize taxation.",
  iconName: "Shield",
  featured: true,
  tags: [
    "social security",
    "social security calculator",
    "claiming age calculator",
    "fra calculator",
    "spousal benefits",
    "survivor benefits",
    "social security taxability",
  ],
  formulaDescription:
    "Calculates Primary Insurance Amount (PIA) reductions for early claiming at age 62 (up to 30%) or delayed credits up to age 70 (+8%/yr), incorporating compounding COLA and combined income tax thresholds.",
  faqs: [
    {
      question: "What is my Full Retirement Age (FRA)?",
      answer:
        "Full Retirement Age (FRA) is the age at which you are entitled to 100% of your unreduced Social Security primary insurance amount. For anyone born in 1960 or later, your FRA is 67. For those born between 1943 and 1954, FRA is 66.",
    },
    {
      question: "How much does claiming early at age 62 reduce my monthly check?",
      answer:
        "Claiming benefits at the earliest age of 62 permanently reduces your monthly check by 25% to 30% compared to your Full Retirement Age benefit, depending on your birth year.",
    },
  ],
  inputs: [
    { name: "birthYear", label: "Your Year of Birth", type: "number", defaultValue: 1970, min: 1930, max: 2010, step: 1 },
    { name: "lifeExpectancy", label: "Your Life Expectancy", type: "number", defaultValue: 83, min: 65, max: 105, step: 1 },
    { name: "estimatedFraMonthlyBenefit", label: "Est. Monthly Benefit at FRA ($)", type: "currency", defaultValue: 2200, unit: "$", min: 500, max: 4873, step: 50 },
    { name: "investmentReturnPercent", label: "Expected Return (%)", type: "number", defaultValue: 5.0, min: 0, max: 20, step: 0.25 },
    { name: "colaPercent", label: "COLA Adjustment (%/yr)", type: "number", defaultValue: 3.0, min: 0, max: 15, step: 0.25 },
  ],
  outputs: [
    { name: "recommendedAge", label: "Recommended Claim Age", format: "number", highlight: true },
    { name: "recommendedMonthlyBenefit", label: "Recommended Monthly Benefit", format: "currency", highlight: true },
    { name: "delayedClaimingAdvantage", label: "Delayed Claiming Advantage", format: "currency" },
    { name: "breakevenAgeVs62", label: "Breakeven Crossover Age", format: "number" },
  ],
  calculate: (inputs) => {
    const res = calculateSocialSecuritySuite(
      {
        birthYear: Number(inputs.birthYear || 1970),
        lifeExpectancy: Number(inputs.lifeExpectancy || 83),
        estimatedFraMonthlyBenefit: Number(inputs.estimatedFraMonthlyBenefit || 2200),
        investmentReturnPercent: Number(inputs.investmentReturnPercent || 5.0),
        colaPercent: Number(inputs.colaPercent || 3.0),
      },
      {
        optionAAge: 62,
        optionAMonthly: 1600,
        optionBAge: 70,
        optionBMonthly: 2810,
        investmentReturnPercent: Number(inputs.investmentReturnPercent || 5.0),
        colaPercent: Number(inputs.colaPercent || 3.0),
      },
      {
        workerFraBenefit: Number(inputs.estimatedFraMonthlyBenefit || 2200),
        spouseClaimingAge: 67,
        filingStatus: "single",
        otherIncomeAnnual: 30000,
      }
    );

    return {
      recommendedAge: res.idealClaimAge.recommendedAge,
      recommendedMonthlyBenefit: res.idealClaimAge.recommendedMonthlyBenefit,
      delayedClaimingAdvantage: res.idealClaimAge.delayedClaimingAdvantage,
      breakevenAgeVs62: res.idealClaimAge.breakevenAgeVs62,
    };
  },
};

export default SOCIAL_SECURITY_CALCULATOR;
