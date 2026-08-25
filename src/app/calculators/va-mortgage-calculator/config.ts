import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateVAMortgageCalculator } from "./calculator";
import { va_mortgageFaqs } from "./faq";
import { VAMortgageCalculator } from "@/components/calculator/va/VAMortgageCalculator";
import { VAMortgageContent } from "@/components/calculator/va/VAMortgageContent";

export const va_mortgageConfig: CalculatorModuleDefinition = {
  id: "va-mortgage-calculator",
  title: "VA Mortgage Calculator - Payment, Funding Fee, Entitlement & Refinance",
  slug: "va-mortgage-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Estimate VA mortgage payments, funding fees, PITI, entitlement, bi-weekly savings, extra-payment payoff, IRRRL refinance savings and VA vs FHA/Conventional scenarios.",
  iconName: "Award",
  featured: true,
  keywords: [
    "VA mortgage calculator",
    "VA loan calculator",
    "VA mortgage payment calculator",
    "VA funding fee calculator",
    "VA home loan calculator",
    "VA PITI calculator",
    "VA entitlement calculator",
    "VA funding fee 2026",
    "VA vs FHA vs conventional calculator",
    "VA biweekly mortgage calculator",
    "VA extra payment calculator",
    "VA IRRRL calculator",
    "VA refinance calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "mortgage-calculator",
    "fha-loan-calculator",
    "dti-calculator",
    "house-affordability-calculator",
    "down-payment-calculator",
    "refinance-calculator",
    "amortization-calculator",
  ],
  formulaDescription:
    "Base Loan = Home Price - Down Payment. Financed Loan = Base Loan + VA Funding Fee (when financed). Monthly P&I = P × [r(1+r)^n] / [(1+r)^n - 1]. Total Monthly PITI = P&I + Property Taxes/12 + Insurance/12 + HOA ($0 Monthly PMI).",
  faqs: va_mortgageFaqs,
  inputs: [
    {
      name: "homePrice",
      label: "Home Purchase Price",
      type: "number",
      defaultValue: 500000,
    },
    {
      name: "downPaymentPct",
      label: "Down Payment (%)",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "interestRate",
      label: "Fixed Interest Rate (%)",
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
      name: "totalMonthlyPiti",
      label: "Total Monthly PITI Payment",
      format: "currency",
      highlight: true,
    },
    {
      name: "monthlyPrincipalAndInterest",
      label: "Principal & Interest",
      format: "currency",
    },
    {
      name: "fundingFeeAmount",
      label: "VA Funding Fee",
      format: "currency",
    },
    {
      name: "totalFinancedLoanAmount",
      label: "Total Financed Loan Amount",
      format: "currency",
    },
    {
      name: "totalUpfrontCashRequired",
      label: "Total Cash Required at Closing",
      format: "currency",
    },
  ],
  calculate: calculateVAMortgageCalculator,
  CustomComponent: VAMortgageCalculator,
  ContentComponent: VAMortgageContent,
};

export default va_mortgageConfig;
