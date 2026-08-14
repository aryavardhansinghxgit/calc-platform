import { CalculatorModuleDefinition } from "../../types";
import { calculateRefinanceFormula } from "@/lib/calculator-engine/formulas/refinance";
import RefinanceContentSection from "@/components/calculator/refinance/RefinanceContentSection";

export const REFINANCE_CALCULATOR: CalculatorModuleDefinition = {
  id: "refinance",
  title: "Refinance Calculator",
  slug: "refinance-calculator",
  category: "Finance",
  subcategory: "Mortgage & House",
  description: "Compare your current loan with a new refinanced loan to estimate payment changes, interest savings, refinancing costs, and break-even period.",
  iconName: "RefreshCw",
  featured: true,
  tags: ["refinance", "mortgage refinance", "break even", "interest savings", "cash out refinance"],
  formulaDescription: "Compares current mortgage monthly payment and remaining interest against a new refinanced loan, accounting for closing costs and discount points to determine break-even months.",
  ContentComponent: RefinanceContentSection,
  faqs: [
    {
      question: "What is a mortgage break-even period?",
      answer: "The break-even period is the number of months required for your cumulative monthly payment savings to offset upfront closing costs and discount points.",
    },
    {
      question: "What is the difference between Rate-and-Term and Cash-Out refinancing?",
      answer: "Rate-and-Term refinancing adjusts your interest rate or loan duration without changing principal. Cash-Out refinancing converts home equity into lump-sum cash by borrowing a larger loan balance.",
    },
    {
      question: "When is refinancing a loan beneficial?",
      answer: "Refinancing is beneficial when interest rate reductions or shorter terms yield net lifetime savings that exceed closing costs, and when you intend to keep the loan past the break-even month.",
    },
  ],
  inputs: [
    { name: "remainingBalance", label: "Current Loan Balance", type: "currency", defaultValue: 250000, unit: "$", min: 10000, max: 5000000, step: 5000 },
    { name: "currentMonthlyPayment", label: "Current Monthly Payment", type: "currency", defaultValue: 1800, unit: "$", min: 100, max: 50000, step: 50 },
    { name: "currentInterestRate", label: "Current Interest Rate", type: "percentage", defaultValue: 7.0, unit: "%", min: 0.1, max: 20, step: 0.1 },
    { name: "newLoanTermYears", label: "New Loan Term", type: "slider", defaultValue: 20, unit: "years", min: 5, max: 30, step: 5 },
    { name: "newInterestRate", label: "New Interest Rate", type: "percentage", defaultValue: 6.0, unit: "%", min: 0.1, max: 20, step: 0.1 },
    { name: "closingCosts", label: "Refinancing Closing Costs", type: "currency", defaultValue: 1500, unit: "$", min: 0, max: 50000, step: 250 },
  ],
  outputs: [
    { name: "monthlySavings", label: "Monthly Savings", format: "currency", highlight: true },
    { name: "breakEvenMonths", label: "Break-Even Time", format: "text", highlight: true },
    { name: "interestSaved", label: "Total Interest Saved", format: "currency" },
  ],
  calculate: (inputs) => {
    return calculateRefinanceFormula({
      remainingBalance: Number(inputs.remainingBalance || 250000),
      currentMonthlyPayment: Number(inputs.currentMonthlyPayment || 1800),
      currentInterestRate: Number(inputs.currentInterestRate || 7.0),
      newLoanTermYears: Number(inputs.newLoanTermYears || 20),
      newInterestRate: Number(inputs.newInterestRate || 6.0),
      closingCosts: Number(inputs.closingCosts || 1500),
    });
  },
};

export default REFINANCE_CALCULATOR;
