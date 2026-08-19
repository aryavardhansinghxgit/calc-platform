import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDownPaymentCalculator } from "./calculator";
import { downPaymentFaqs } from "./faq";
import { DownPaymentCalculator } from "@/components/calculator/down-payment/DownPaymentCalculator";
import { DownPaymentContent } from "@/components/calculator/down-payment/DownPaymentContent";

export const downPaymentConfig: CalculatorModuleDefinition = {
  id: "down-payment-calculator",
  title: "Down Payment Calculator — Mortgage Down Payment & PMI Payoff Suite",
  slug: "down-payment-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Free Down Payment Calculator. Dual mode calculation (by home price or max cash available), 0% to 30% tier comparisons, PMI cancellation date milestone, opportunity cost index fund simulator, and upfront cash-to-close.",
  iconName: "DollarSign",
  featured: true,
  keywords: [
    "Down Payment Calculator",
    "House Down Payment Calculator",
    "Mortgage Down Payment Calculator",
    "How much down payment for house",
    "20% down payment calculator",
    "PMI calculator down payment",
    "FHA vs conventional down payment",
    "minimum down payment for first-time home buyer",
    "cash to close calculator",
    "cost of waiting to buy a home"
  ],
  priority: 1,
  relatedCalculators: [
    "mortgage-calculator",
    "house-affordability-calculator",
    "fha-loan-calculator",
    "va-mortgage-calculator",
    "home-equity-loan-calculator"
  ],
  formulaDescription:
    "Down Payment = Home Price × Down %. Loan Amount = Home Price - Down Payment. Monthly P&I = P × [r(1+r)^n / ((1+r)^n - 1)]. PMI cancels at 78% LTV.",
  faqs: downPaymentFaqs,
  inputs: [
    {
      name: "homePrice",
      label: "Home Purchase Price",
      type: "number",
      defaultValue: 500000,
    },
    {
      name: "downPaymentPct",
      label: "Down Payment Percentage (%)",
      type: "number",
      defaultValue: 20,
    },
    {
      name: "interestRate",
      label: "Interest Rate (%)",
      type: "number",
      defaultValue: 6.5,
    },
    {
      name: "loanTermYears",
      label: "Loan Term (Years)",
      type: "number",
      defaultValue: 30,
    },
  ],
  outputs: [
    {
      name: "downPaymentAmount",
      label: "Down Payment Amount",
      format: "currency",
      highlight: true,
    },
    {
      name: "totalMonthlyPayment",
      label: "Total Monthly Payment (PITI)",
      format: "currency",
    },
    {
      name: "totalCashToClose",
      label: "Total Cash Required at Closing",
      format: "currency",
    },
    {
      name: "pmiCancellationDateLabel",
      label: "PMI Removal Milestone",
      format: "text",
    },
  ],
  calculate: calculateDownPaymentCalculator,
  CustomComponent: DownPaymentCalculator,
  ContentComponent: DownPaymentContent,
};

export default downPaymentConfig;
