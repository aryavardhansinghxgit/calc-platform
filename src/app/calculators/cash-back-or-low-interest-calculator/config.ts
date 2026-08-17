import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateCashBackOrLowInterestCalculator } from "./calculator";
import { cashBackFaqs } from "./faq";
import { CashBackCalculator } from "@/components/calculator/cash-back/CashBackCalculator";
import { CashBackContent } from "@/components/calculator/cash-back/CashBackContent";

export const cashBackConfig: CalculatorModuleDefinition = {
  id: "cash-back-or-low-interest-calculator",
  title: "Cash Back or Low Interest Calculator — Auto Loan Incentive Comparison",
  slug: "cash-back-or-low-interest-calculator",
  category: "Finance",
  subcategory: "Auto Loan",
  description:
    "Free Cash Back or Low Interest Calculator. Compare auto manufacturer cash rebates vs 0% APR low-interest dealer financing, calculate breakeven APRs, and evaluate 60-month amortization schedules.",
  iconName: "Car",
  featured: true,
  keywords: [
    "Cash Back or Low Interest Calculator",
    "Car Rebate vs Low APR Calculator",
    "0 APR vs Cash Back Calculator",
    "Auto Loan Rebate Calculator",
    "Car Financing Cash Back vs Low Interest",
    "Rebate or 0 Percent Financing Calculator",
    "Car Loan Breakeven Interest Rate",
    "Dealer Incentive Comparison Calculator"
  ],
  priority: 1,
  relatedCalculators: [
    "auto-loan-calculator",
    "loan-calculator",
    "auto-lease-calculator",
    "down-payment-calculator"
  ],
  formulaDescription:
    "Total Cost = Upfront Payment (Down Payment + Trade-In + Tax + Fees) + Total Monthly Amortized Loan Payments.",
  faqs: cashBackFaqs,
  inputs: [
    {
      name: "autoPrice",
      label: "Vehicle Purchase Price ($)",
      type: "number",
      defaultValue: 50000,
    },
    {
      name: "cashBackAmount",
      label: "Cash Back Rebate ($)",
      type: "number",
      defaultValue: 1000,
    },
    {
      name: "highInterestRate",
      label: "Interest Rate (High) %",
      type: "number",
      defaultValue: 5.0,
    },
    {
      name: "lowInterestRate",
      label: "Interest Rate (Low) %",
      type: "number",
      defaultValue: 2.0,
    },
  ],
  outputs: [
    {
      name: "winningMessage",
      label: "Recommendation",
      format: "text",
      highlight: true,
    },
    {
      name: "savingsAmount",
      label: "Net Savings ($)",
      format: "currency",
    },
    {
      name: "cashBackMonthly",
      label: "Cash Back Monthly Payment",
      format: "currency",
    },
    {
      name: "lowInterestMonthly",
      label: "Low Interest Monthly Payment",
      format: "currency",
    },
  ],
  calculate: calculateCashBackOrLowInterestCalculator,
  CustomComponent: CashBackCalculator,
  ContentComponent: CashBackContent,
};

export default cashBackConfig;
