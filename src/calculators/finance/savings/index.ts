import { CalculatorModuleDefinition } from "../../types";
import { calculateSavings, CompoundFrequency } from "@/lib/calculator-engine/formulas/savings";
import { savingsFaqs } from "./faq";

export const SAVINGS_CALCULATOR: CalculatorModuleDefinition = {
  id: "savings",
  title: "Savings Calculator",
  slug: "savings-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate savings growth, compound interest, recurring contributions, goal amounts, inflation-adjusted value, and retirement/FIRE projections.",
  iconName: "Landmark",
  featured: true,
  tags: [
    "savings calculator",
    "savings account calculator",
    "savings interest calculator",
    "compound savings calculator",
    "savings goal calculator",
    "monthly savings calculator",
    "future value savings calculator",
    "savings calculator with contributions",
    "savings calculator with inflation",
    "savings calculator with tax",
    "savings growth calculator",
    "retirement savings calculator",
    "emergency savings calculator",
  ],
  formulaDescription:
    "Calculates total accumulated future savings balance using compound interest formula A = P(1+r/n)^(nt) alongside growing monthly and annual contributions, post-tax interest yield, and inflation purchasing power adjustments.",
  faqs: savingsFaqs,
  inputs: [
    { name: "initialDeposit", label: "Initial Deposit", type: "currency", defaultValue: 20000, unit: "$", min: 0, max: 5000000, step: 500 },
    { name: "annualContribution", label: "Annual Contribution", type: "currency", defaultValue: 5000, unit: "$", min: 0, max: 500000, step: 250 },
    { name: "annualContributionIncrease", label: "Annual Contribution Increase", type: "percentage", defaultValue: 3, unit: "%", min: 0, max: 20, step: 0.5 },
    { name: "monthlyContribution", label: "Monthly Contribution", type: "currency", defaultValue: 0, unit: "$", min: 0, max: 50000, step: 50 },
    { name: "monthlyContributionIncrease", label: "Monthly Contribution Increase", type: "percentage", defaultValue: 0, unit: "%", min: 0, max: 20, step: 0.5 },
    { name: "interestRate", label: "Interest Rate (APY/APR)", type: "percentage", defaultValue: 3, unit: "%", min: 0, max: 30, step: 0.1 },
    {
      name: "compoundFrequency",
      label: "Compound Frequency",
      type: "select",
      defaultValue: "annually",
      options: [
        { label: "Daily (365/yr)", value: "daily" },
        { label: "Weekly (52/yr)", value: "weekly" },
        { label: "Monthly (12/yr)", value: "monthly" },
        { label: "Quarterly (4/yr)", value: "quarterly" },
        { label: "Semi-Annually (2/yr)", value: "semi-annually" },
        { label: "Annually (1/yr)", value: "annually" },
      ],
    },
    { name: "yearsToSave", label: "Years to Save", type: "slider", defaultValue: 10, unit: "years", min: 1, max: 50, step: 1 },
    { name: "taxRate", label: "Tax Rate on Interest", type: "percentage", defaultValue: 0, unit: "%", min: 0, max: 50, step: 1 },
    { name: "inflationRate", label: "Expected Inflation Rate", type: "percentage", defaultValue: 2.5, unit: "%", min: 0, max: 15, step: 0.1 },
    { name: "targetGoalAmount", label: "Target Goal Amount", type: "currency", defaultValue: 100000, unit: "$", min: 1000, max: 10000000, step: 5000 },
  ],
  outputs: [
    { name: "endBalance", label: "End Balance", format: "currency", highlight: true },
    { name: "initialDeposit", label: "Initial Deposit", format: "currency" },
    { name: "totalContributions", label: "Total Contributions", format: "currency" },
    { name: "totalInterestEarned", label: "Total Interest Earned", format: "currency" },
    { name: "totalTaxPaid", label: "Total Tax Paid", format: "currency" },
    { name: "inflationAdjustedBalance", label: "Inflation Adjusted Balance", format: "currency" },
    { name: "apy", label: "Annual Percentage Yield (APY)", format: "percentage" },
    { name: "effectiveRate", label: "Effective Real Return Rate", format: "percentage" },
  ],
  calculate: (inputs) => {
    const rawResults = calculateSavings({
      initialDeposit: Number(inputs.initialDeposit || 0),
      annualContribution: Number(inputs.annualContribution || 0),
      annualContributionIncrease: Number(inputs.annualContributionIncrease || 0),
      monthlyContribution: Number(inputs.monthlyContribution || 0),
      monthlyContributionIncrease: Number(inputs.monthlyContributionIncrease || 0),
      interestRate: Number(inputs.interestRate || 0),
      compoundFrequency: (inputs.compoundFrequency as CompoundFrequency) || "annually",
      yearsToSave: Number(inputs.yearsToSave || 10),
      taxRate: Number(inputs.taxRate || 0),
      inflationRate: Number(inputs.inflationRate ?? 2.5),
      targetGoalAmount: Number(inputs.targetGoalAmount || 100000),
    });

    return rawResults as unknown as Record<string, any>;
  },
};

export default SAVINGS_CALCULATOR;
