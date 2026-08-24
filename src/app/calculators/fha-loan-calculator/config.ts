import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateFHALoanCalculator } from "./calculator";
import { fha_loanFaqs } from "./faq";
import { FHACalculator } from "@/components/calculator/fha/FHACalculator";
import { FHAContent } from "@/components/calculator/fha/FHAContent";

export const fha_loanConfig: CalculatorModuleDefinition = {
  id: "fha-loan-calculator",
  title: "FHA Loan Calculator",
  slug: "fha-loan-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Estimate FHA mortgage P&I, property taxes, insurance, monthly MIP, UFMIP, total PITI, amortization, DTI, 203(k) financing and FHA vs. Conventional scenarios.",
  iconName: "ShieldCheck",
  featured: true,
  keywords: [
    "FHA loan calculator",
    "FHA mortgage calculator",
    "FHA payment calculator",
    "FHA loan payment calculator",
    "FHA MIP calculator",
    "FHA PITI calculator",
    "FHA mortgage insurance calculator",
    "FHA UFMIP calculator",
    "FHA monthly payment calculator",
    "FHA loan qualification calculator",
    "FHA 203(k) calculator",
    "FHA vs conventional calculator",
    "FHA DTI calculator"
  ],
  priority: 1,
  relatedCalculators: [
    "mortgage-calculator",
    "dti-calculator",
    "house-affordability-calculator",
    "rent-calculator",
    "down-payment-calculator",
    "amortization-calculator",
    "loan-calculator"
  ],
  formulaDescription:
    "Base Loan = Home Price - Down Payment. Financed Loan = Base Loan + 1.75% UFMIP. Monthly MIP = (Base Loan × Annual MIP Rate) / 12. Total PITI = P&I + Taxes/12 + Insurance/12 + Monthly MIP + HOA.",
  faqs: fha_loanFaqs,
  inputs: [
    {
      name: "homePrice",
      label: "Home Purchase Price",
      type: "number",
      defaultValue: 350000,
    },
    {
      name: "downPaymentPct",
      label: "Down Payment (%)",
      type: "number",
      defaultValue: 3.5,
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
      name: "monthlyMipAmount",
      label: "Monthly FHA MIP",
      format: "currency",
    },
    {
      name: "totalUpfrontCashRequired",
      label: "Total Cash Required at Closing",
      format: "currency",
    },
    {
      name: "baseLoanAmount",
      label: "Base Loan Amount",
      format: "currency",
    },
    {
      name: "totalFinancedLoanAmount",
      label: "Total Loan Amount with Financed UFMIP",
      format: "currency",
    },
  ],
  calculate: calculateFHALoanCalculator,
  CustomComponent: FHACalculator,
  ContentComponent: FHAContent,
};

export default fha_loanConfig;
