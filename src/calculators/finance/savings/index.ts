import { CalculatorModuleDefinition } from "../../types";
import { calculateSavings, CompoundFrequency } from "@/lib/calculator-engine/formulas/savings";

export const SAVINGS_CALCULATOR: CalculatorModuleDefinition = {
  id: "savings",
  title: "Savings Calculator",
  slug: "savings-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Advanced compound savings calculator with growing contributions, tax drag, inflation adjustment, APY breakdown, goal seek, FIRE retirement planning, and Monte Carlo probability simulation.",
  iconName: "Landmark",
  featured: true,
  tags: [
    "savings calculator",
    "compound interest",
    "savings growth",
    "goal planner",
    "FIRE calculator",
    "high yield savings",
    "emergency fund",
    "APY calculator",
  ],
  formulaDescription: "Calculates total accumulated future savings balance using compound interest formula A = P(1+r/n)^(nt) alongside growing monthly and annual contributions, post-tax interest yield, and inflation purchasing power adjustments.",
  faqs: [
    {
      question: "How does compound interest increase savings growth over time?",
      answer: "Compound interest generates interest on both your original deposit and accumulated interest from prior periods. Over time, compounding creates exponential growth, turning small regular contributions into substantial wealth.",
    },
    {
      question: "What is the difference between APR and APY?",
      answer: "APR (Annual Percentage Rate) is the simple annual interest rate without taking compounding into account. APY (Annual Percentage Yield) includes the effect of interest compounding throughout the year, giving a higher, true annual return rate.",
    },
    {
      question: "How do annual contribution increases help combat inflation?",
      answer: "Increasing your monthly or annual contribution by 3% to 5% each year aligns your savings with salary increases and keeps your purchasing power on track against inflation.",
    },
    {
      question: "How does tax affect interest earnings?",
      answer: "Interest earned in taxable accounts (like standard savings accounts or CDs) is taxed as income. A tax rate drag reduces your net annual yield, slowing down compound growth compared to tax-advantaged accounts like Roth IRAs.",
    },
    {
      question: "What is the Rule of 72?",
      answer: "The Rule of 72 is a quick mental math formula to estimate how long it takes to double your money. Divide 72 by your annual rate of return (e.g., 72 / 6% = 12 years to double).",
    },
  ],
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

