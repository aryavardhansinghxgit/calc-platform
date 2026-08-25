import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateAmortizationLoanRate } from "./calculator";
import { interestRateFaqs } from "./faq";
import { InterestRateCalculator } from "@/components/calculator/interest-rate/InterestRateCalculator";
import { InterestRateContent } from "@/components/calculator/interest-rate/InterestRateContent";

export const interestRateConfig: CalculatorModuleDefinition = {
  id: "interest-rate-calculator",
  title: "Interest Rate Calculator — Find Loan Rates, Investment Returns, APY & Real Yield",
  slug: "interest-rate-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate implied loan interest rates, investment returns, periodic contribution rates, APY/EAR, inflation-adjusted real returns, and after-tax purchasing-power yields.",
  iconName: "Percent",
  featured: true,
  keywords: [
    "interest rate calculator",
    "interest rate calculator for loans",
    "loan interest rate calculator",
    "find interest rate from payment",
    "mortgage interest rate calculator",
    "investment rate of return calculator",
    "annual interest rate calculator",
    "APY calculator",
    "APR vs APY calculator",
    "real return calculator",
    "inflation-adjusted return calculator",
    "compound interest rate calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "loan-calculator",
    "mortgage-calculator",
    "apr-calculator",
    "roi-calculator",
    "future-value-calculator",
    "inflation-calculator",
    "amortization-calculator",
  ],
  formulaDescription:
    "Amortized Loan: f(r) = P - M * [(1 - (1+r/12)^-n)/(r/12)] = 0. Discrete: r = m*[(A/P)^(1/(m*t)) - 1]. Continuous: r = ln(A/P)/t.",
  faqs: interestRateFaqs,
  inputs: [
    {
      name: "loanAmount",
      label: "Loan Amount ($)",
      type: "number",
      defaultValue: 32000,
    },
    {
      name: "years",
      label: "Loan Term (Years)",
      type: "number",
      defaultValue: 3,
    },
    {
      name: "monthlyPayment",
      label: "Monthly Payment ($)",
      type: "number",
      defaultValue: 960,
    },
    {
      name: "upfrontFees",
      label: "Upfront Fees / Closing Costs ($)",
      type: "number",
      defaultValue: 0,
    },
  ],
  outputs: [
    {
      name: "statedInterestRate",
      label: "Stated Interest Rate (%)",
      format: "number",
      highlight: true,
    },
    {
      name: "trueApr",
      label: "True APR (%)",
      format: "number",
      highlight: true,
    },
    {
      name: "totalInterest",
      label: "Total Interest Paid",
      format: "currency",
    },
  ],
  calculate: calculateAmortizationLoanRate as any,
  CustomComponent: InterestRateCalculator,
  ContentComponent: InterestRateContent,
};

export default interestRateConfig;
