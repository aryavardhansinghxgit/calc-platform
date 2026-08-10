import { CalculatorModuleDefinition } from "../../types";
import { calculateRetirementMode1 } from "@/lib/calculator-engine/formulas/retirement";

export const RETIREMENT_CALCULATOR: CalculatorModuleDefinition = {
  id: "retirement",
  title: "Retirement Calculator – Financial Independence Suite",
  slug: "retirement-calculator",
  category: "Finance",
  subcategory: "Retirement & Investing",
  description:
    "Free Retirement Calculator. Calculate your target retirement nest egg, annual savings shortfall, post-retirement monthly withdrawal capacity, nest egg longevity, and test the 4% Trinity Rule.",
  iconName: "TrendingUp",
  featured: true,
  tags: [
    "retirement calculator",
    "401k calculator",
    "nest egg calculator",
    "4 percent rule calculator",
    "retirement savings gap",
    "how much to retire",
    "retirement income solver",
    "fire calculator",
  ],
  formulaDescription:
    "Projects pre-tax income to retirement age, applies replacement ratio (e.g. 75%), subtracts Social Security/pensions, and calculates required nest egg using real investment returns and inflation adjustments.",
  faqs: [
    {
      question: "What is the 4% Rule for retirement withdrawals?",
      answer:
        "Originating from the Trinity Study, the 4% Rule suggests withdrawing 4% of your total retirement nest egg in your first year of retirement, then adjusting that dollar amount annually for inflation, allowing your nest egg to last at least 30 years.",
    },
    {
      question: "What is the 80% Rule of pre-retirement income replacement?",
      answer:
        "The 80% Rule estimates that retirees need approximately 70% to 80% of their pre-retirement annual income to maintain their standard of living, accounting for eliminated work-related expenses.",
    },
  ],
  inputs: [
    { name: "currentAge", label: "Current Age", type: "number", defaultValue: 35, unit: "yrs", min: 18, max: 100, step: 1 },
    { name: "retirementAge", label: "Planned Retirement Age", type: "number", defaultValue: 67, unit: "yrs", min: 19, max: 100, step: 1 },
    { name: "currentIncome", label: "Current Pre-Tax Income ($/yr)", type: "currency", defaultValue: 70000, unit: "$", min: 0, max: 10000000, step: 5000 },
    { name: "investmentReturn", label: "Average Investment Return (%/yr)", type: "percentage", defaultValue: 6, unit: "%", min: 0, max: 20, step: 0.5 },
    { name: "inflationRate", label: "Inflation Rate (%/yr)", type: "percentage", defaultValue: 3, unit: "%", min: 0, max: 20, step: 0.5 },
  ],
  outputs: [
    { name: "targetNestEggAtRetirement", label: "Target Nest Egg Needed", format: "currency", highlight: true },
    { name: "projectedSavingsAtRetirement", label: "Projected Savings", format: "currency" },
    { name: "savingsGapOrSurplus", label: "Savings Gap / Surplus", format: "currency", highlight: true },
    { name: "monthlyIncomeNeededAtRetirement", label: "Monthly Income Needed", format: "currency" },
    { name: "fourPercentRuleAnnualIncome", label: "4% Trinity Rule Annual Payout", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = calculateRetirementMode1({
      currentAge: Number(inputs.currentAge || 35),
      retirementAge: Number(inputs.retirementAge || 67),
      lifeExpectancy: 85,
      currentIncome: Number(inputs.currentIncome || 70000),
      incomeIncreaseRate: 3,
      incomeReplacementPercent: 75,
      investmentReturn: Number(inputs.investmentReturn || 6),
      inflationRate: Number(inputs.inflationRate || 3),
      currentSavings: 30000,
      futureSavingsPercent: 10,
    });

    return {
      targetNestEggAtRetirement: res.targetNestEggAtRetirement,
      projectedSavingsAtRetirement: res.projectedSavingsAtRetirement,
      savingsGapOrSurplus: res.savingsGapOrSurplus,
      monthlyIncomeNeededAtRetirement: res.monthlyIncomeNeededAtRetirement,
      fourPercentRuleAnnualIncome: res.fourPercentRuleAnnualIncome,
    };
  },
};

export default RETIREMENT_CALCULATOR;
