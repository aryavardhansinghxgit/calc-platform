import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRentVsBuyCalculator } from "./calculator";
import { rentVsBuyFaqs } from "./faq";
import { RentVsBuyCalculator } from "@/components/calculator/rent-vs-buy/RentVsBuyCalculator";
import { RentVsBuyContent } from "@/components/calculator/rent-vs-buy/RentVsBuyContent";

export const rentVsBuyConfig: CalculatorModuleDefinition = {
  id: "rent-vs-buy-calculator",
  title: "Rent vs. Buy Calculator — Should You Buy a Home or Rent?",
  slug: "rent-vs-buy-calculator",
  category: "Finance",
  subcategory: "Mortgage & House",
  description:
    "Free Rent vs. Buy Calculator. Model breakeven timeline horizons, unrecoverable costs, opportunity costs, Price-to-Rent ratios, Ben Felix 5% rule, and 30-year net worth divergence.",
  iconName: "Home",
  featured: true,
  keywords: [
    "Rent vs Buy Calculator",
    "Should I Rent or Buy a House Calculator",
    "Rent vs Buy Breakeven Calculator",
    "Is It Better to Rent or Buy a Home",
    "Price to Rent Ratio Calculator",
    "True Cost of Homeownership Calculator",
    "Opportunity Cost Rent vs Buy",
    "Rent vs Buy Comparison Table",
    "Housing Affordability Rent vs Buy"
  ],
  priority: 1,
  relatedCalculators: [
    "mortgage-calculator",
    "rent-calculator",
    "house-affordability-calculator",
    "down-payment-calculator",
    "rental-property-calculator"
  ],
  formulaDescription:
    "Breakeven occurs when Net Buying Cost (Initial Outlay + Cumulative Payments - Tax Shield - Net Sale Proceeds) < Net Renting Cost (Cumulative Rent - Stock Portfolio Growth).",
  faqs: rentVsBuyFaqs,
  inputs: [
    {
      name: "homePrice",
      label: "Target Home Purchase Price",
      type: "number",
      defaultValue: 500000,
    },
    {
      name: "monthlyRent",
      label: "Comparable Monthly Rent",
      type: "number",
      defaultValue: 3000,
    },
    {
      name: "downPaymentPct",
      label: "Down Payment Percentage (%)",
      type: "number",
      defaultValue: 20,
    },
    {
      name: "interestRate",
      label: "Mortgage Interest Rate (%)",
      type: "number",
      defaultValue: 6.632,
    },
  ],
  outputs: [
    {
      name: "breakevenMessage",
      label: "Breakeven Stay Decision",
      format: "text",
      highlight: true,
    },
    {
      name: "priceToRentRatio",
      label: "Price-to-Rent Ratio",
      format: "number",
    },
    {
      name: "buyingCumulativeNetCost30Yr",
      label: "30-Year Buying Net Cost",
      format: "currency",
    },
    {
      name: "rentingCumulativeNetCost30Yr",
      label: "30-Year Renting Net Cost",
      format: "currency",
    },
  ],
  calculate: calculateRentVsBuyCalculator,
  CustomComponent: RentVsBuyCalculator,
  ContentComponent: RentVsBuyContent,
};

export default rentVsBuyConfig;
