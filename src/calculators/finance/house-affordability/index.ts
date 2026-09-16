import { CalculatorModuleDefinition } from "../../types";
import { calculateIncomeAffordabilityFormula } from "@/lib/calculator-engine/formulas/house-affordability";
import HouseAffordabilityContentSection from "@/components/calculator/house-affordability/HouseAffordabilityContentSection";
import { houseAffordabilityFaqs } from "./faq";

export const HOUSE_AFFORDABILITY_CALCULATOR: CalculatorModuleDefinition = {
  id: "house-affordability",
  title: "House Affordability Calculator",
  slug: "house-affordability-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Estimate how much house you can afford using income, monthly debts, down payment, mortgage rate, housing costs, DTI, or a fixed monthly budget.",
  iconName: "Home",
  featured: true,
  tags: [
    "house affordability calculator",
    "how much house can I afford",
    "home affordability calculator",
    "house affordability calculator by income",
    "house affordability calculator by monthly payment",
    "mortgage affordability calculator",
    "how much mortgage can I afford",
    "home price affordability calculator",
    "DTI home affordability calculator",
    "affordable home price calculator",
    "home buying budget calculator",
  ],
  formulaDescription:
    "Calculates maximum allowable housing payment using Front-End (28%) and Back-End (36%) Debt-to-Income rules or fixed monthly budgets.",
  ContentComponent: HouseAffordabilityContentSection,
  faqs: houseAffordabilityFaqs,
  inputs: [
    { name: "annualIncome", label: "Annual Household Income", type: "currency", defaultValue: 120000, unit: "$", min: 10000, max: 2000000, step: 5000 },
    { name: "interestRate", label: "Mortgage Interest Rate", type: "percentage", defaultValue: 6.5, unit: "%", min: 0.1, max: 20, step: 0.1 },
    { name: "loanTermYears", label: "Loan Term", type: "slider", defaultValue: 30, unit: "years", min: 10, max: 30, step: 5 },
    { name: "monthlyDebt", label: "Monthly Debt Payments", type: "currency", defaultValue: 500, unit: "$", min: 0, max: 20000, step: 100 },
  ],
  outputs: [
    { name: "maxHomePrice", label: "Maximum Home Price", format: "currency", highlight: true },
    { name: "maxLoanAmount", label: "Maximum Loan Amount", format: "currency" },
    { name: "totalMonthlyHousingCost", label: "Total Monthly Housing Cost", format: "currency" },
  ],
  calculate: (inputs) => {
    return calculateIncomeAffordabilityFormula({
      annualIncome: Number(inputs.annualIncome || 120000),
      loanTermYears: Number(inputs.loanTermYears || 30),
      interestRate: Number(inputs.interestRate || 6.5),
      monthlyDebt: Number(inputs.monthlyDebt || 500),
      downPayment: 20,
      downPaymentType: "percent",
    });
  },
};

export default HOUSE_AFFORDABILITY_CALCULATOR;
