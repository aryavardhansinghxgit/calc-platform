import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateAmortizationLoanRate } from "./calculator";
import { interestRateFaqs } from "./faq";
import { InterestRateCalculator } from "@/components/calculator/interest-rate/InterestRateCalculator";
import { InterestRateContent } from "@/components/calculator/interest-rate/InterestRateContent";

export const interestRateConfig: CalculatorModuleDefinition = {
  id: "interest-rate-calculator",
  title: "Interest Rate Calculator — Find Loan APR, Investment Returns & APY",
  slug: "interest-rate-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Free Interest Rate Calculator. Solve for loan interest rates, true APR with fees, lump-sum investment returns, periodic annuity growth rates, APR to APY conversions, and inflation/tax-adjusted real yields.",
  iconName: "Percent",
  featured: true,
  keywords: [
    "interest rate calculator",
    "calculate interest rate on loan",
    "investment interest rate calculator",
    "find interest rate from monthly payment",
    "APR to APY calculator",
    "effective annual rate calculator",
    "calculate rate of return on investment",
    "compound interest rate formula",
    "nominal vs real interest rate calculator",
    "car loan interest rate calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "interest-calculator",
    "compound-interest-calculator",
    "simple-interest-calculator",
    "apr-calculator",
    "roi-calculator",
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
