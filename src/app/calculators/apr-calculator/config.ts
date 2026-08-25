import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateAPRCalculator } from "./calculator";
import { apr_calculatorFaqs } from "./faq";
import { APRCalculator } from "@/components/calculator/apr/APRCalculator";
import { APRContent } from "@/components/calculator/apr/APRContent";

export const apr_calculatorConfig: CalculatorModuleDefinition = {
  id: "apr-calculator",
  title: "APR Calculator — Real APR, Loan Fees, Mortgage Points & Loan Comparison",
  slug: "apr-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Calculate real APR from loan rates and upfront fees, compare mortgage offers, model credit-card payoff, solve borrowing capacity, and analyze early-payoff APR.",
  iconName: "Percent",
  featured: true,
  keywords: [
    "APR calculator",
    "annual percentage rate calculator",
    "APR calculator with fees",
    "real APR calculator",
    "loan APR calculator",
    "mortgage APR calculator",
    "APR vs interest rate calculator",
    "APR comparison calculator",
    "credit card APR calculator",
    "APR payment calculator",
    "true APR calculator",
    "APR with closing costs",
    "loan comparison APR calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "loan-calculator",
    "mortgage-calculator",
    "credit-card-payoff-calculator",
    "auto-loan-calculator",
    "refinance-calculator",
    "amortization-calculator",
    "interest-rate-calculator",
  ],
  formulaDescription:
    "Amount Financed = Loan Amount - Upfront Fees. APR is solved via Newton-Raphson where Amount Financed = Σ (Payment_t / (1 + r)^t).",
  faqs: apr_calculatorFaqs,
  inputs: [
    {
      name: "loanAmount",
      label: "Loan Amount",
      type: "number",
      defaultValue: 100000,
    },
    {
      name: "interestRate",
      label: "Nominal Interest Rate (%)",
      type: "number",
      defaultValue: 6.0,
    },
    {
      name: "loanTermYears",
      label: "Loan Term (Years)",
      type: "number",
      defaultValue: 10,
    },
    {
      name: "upfrontFees",
      label: "Upfront Fees & Charges",
      type: "number",
      defaultValue: 2500,
    },
  ],
  outputs: [
    {
      name: "realAPR",
      label: "Real Annual Percentage Rate (APR)",
      format: "text",
      highlight: true,
    },
    {
      name: "nominalRate",
      label: "Nominal Interest Rate",
      format: "text",
    },
    {
      name: "periodicPayment",
      label: "Monthly Payment",
      format: "currency",
    },
    {
      name: "totalInterest",
      label: "Total Interest Paid",
      format: "currency",
    },
    {
      name: "totalFees",
      label: "Total Upfront Fees",
      format: "currency",
    },
    {
      name: "totalPayments",
      label: "Total Cost of Loan",
      format: "currency",
    },
  ],
  calculate: calculateAPRCalculator,
  CustomComponent: APRCalculator,
  ContentComponent: APRContent,
};

export default apr_calculatorConfig;
