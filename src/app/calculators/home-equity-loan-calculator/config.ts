import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHomeEquityLoanCalculator } from "./calculator";
import { home_equityFaqs } from "./faq";
import { HomeEquityCalculator } from "@/components/calculator/home-equity/HomeEquityCalculator";
import { HomeEquityContent } from "@/components/calculator/home-equity/HomeEquityContent";

export const home_equityConfig: CalculatorModuleDefinition = {
  id: "home-equity-loan-calculator",
  title: "Home Equity Loan Calculator - Payment, CLTV, APR & Borrowing Power",
  slug: "home-equity-loan-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Calculate home equity loan payments, maximum borrowing power, CLTV, true APR, amortization, extra-payment savings, DTI, tax estimates and home-renovation equity.",
  iconName: "Home",
  featured: true,
  keywords: [
    "home equity loan calculator",
    "home equity loan payment calculator",
    "home equity loan calculator with CLTV",
    "second mortgage calculator",
    "home equity borrowing calculator",
    "home equity loan amortization calculator",
    "home equity loan vs HELOC calculator",
    "home equity loan vs cash-out refinance",
    "home equity payment calculator",
    "second mortgage payment calculator",
    "home equity loan APR calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "mortgage-calculator",
    "fha-loan-calculator",
    "va-mortgage-calculator",
    "dti-calculator",
    "house-affordability-calculator",
    "refinance-calculator",
    "amortization-calculator",
  ],
  formulaDescription:
    "Max Debt = Home Value × CLTV Limit. Max Borrowable Equity = Max Debt - Existing Mortgage Balance. Monthly Payment = Fixed Amortization P&I.",
  faqs: home_equityFaqs,
  inputs: [
    {
      name: "homeValue",
      label: "Estimated Home Market Value",
      type: "number",
      defaultValue: 500000,
    },
    {
      name: "currentMortgageBalance",
      label: "Existing 1st Mortgage Balance",
      type: "number",
      defaultValue: 275000,
    },
    {
      name: "loanAmount",
      label: "Desired Home Equity Loan Amount",
      type: "number",
      defaultValue: 125000,
    },
    {
      name: "interestRate",
      label: "Fixed Interest Rate (%)",
      type: "number",
      defaultValue: 8.0,
    },
    {
      name: "loanTermYears",
      label: "Loan Term (Years)",
      type: "number",
      defaultValue: 15,
    },
  ],
  outputs: [
    {
      name: "monthlyPayment",
      label: "Fixed Monthly Payment",
      format: "currency",
      highlight: true,
    },
    {
      name: "maxBorrowableEquity",
      label: "Maximum Borrowable Equity",
      format: "currency",
    },
    {
      name: "newCltvPct",
      label: "New Post-Loan CLTV",
      format: "text",
    },
    {
      name: "totalInterestPaid",
      label: "Total Interest Paid",
      format: "currency",
    },
    {
      name: "trueApr",
      label: "True APR (Factoring Fees)",
      format: "text",
    },
  ],
  calculate: calculateHomeEquityLoanCalculator,
  CustomComponent: HomeEquityCalculator,
  ContentComponent: HomeEquityContent,
};

export default home_equityConfig;
