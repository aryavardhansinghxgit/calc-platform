import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateVAMortgageCalculator } from "./calculator";
import { va_mortgageFaqs } from "./faq";
import { VAMortgageCalculator } from "@/components/calculator/va/VAMortgageCalculator";
import { VAMortgageContent } from "@/components/calculator/va/VAMortgageContent";

export const va_mortgageConfig: CalculatorModuleDefinition = {
  id: "va-mortgage-calculator",
  title: "VA Mortgage Calculator — Funding Fee, Entitlement & Payments",
  slug: "va-mortgage-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Free VA Mortgage Calculator with 2026 Funding Fee logic & Amortization. Calculate monthly PITI payments, 0% down entitlement, VA vs Conventional vs FHA comparison, bi-weekly savings, and IRRRL refinancing.",
  iconName: "Award",
  featured: true,
  keywords: [
    "va mortgage calculator",
    "va home loan payment calculator",
    "va funding fee calculator 2026",
    "va loan amortization schedule",
    "va loan limit calculator",
    "va vs conventional loan calculator",
    "zero down va mortgage calculator"
  ],
  priority: 1,
  relatedCalculators: [
    "mortgage-calculator",
    "fha-loan-calculator",
    "dti-calculator",
    "house-affordability-calculator"
  ],
  formulaDescription:
    "Base Loan = Home Price - Down Payment. Financed Loan = Base Loan + VA Funding Fee. Monthly PITI = P&I + Property Tax + Hazard Insurance + HOA (0% Monthly Mortgage Insurance).",
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
