import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRentalPropertyCalculator } from "./calculator";
import { rental_propertyFaqs } from "./faq";
import { RentalPropertyCalculator } from "@/components/calculator/rental-property/RentalPropertyCalculator";
import { RentalPropertyContent } from "@/components/calculator/rental-property/RentalPropertyContent";

export const rental_propertyConfig: CalculatorModuleDefinition = {
  id: "rental-property-calculator",
  title: "Rental Property Calculator — Cash Flow, Cap Rate, ROI & IRR Analysis",
  slug: "rental-property-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Free Rental Property Calculator & Real Estate Investment Analysis Suite. Calculate multi-year cash flow, Cap Rate, Cash-on-Cash Return, IRR, DSCR, BRRRR strategy, 27.5-year tax depreciation, and rules-of-thumb (1%, 50%, 70% rules).",
  iconName: "Home",
  featured: true,
  keywords: [
    "rental property calculator",
    "real estate investment calculator",
    "cap rate calculator",
    "cash on cash return calculator",
    "rental cash flow calculator",
    "brrrr calculator",
    "internal rate of return real estate",
    "noi calculator"
  ],
  priority: 1,
  relatedCalculators: [
    "house-affordability-calculator",
    "mortgage-calculator",
    "rent-calculator",
    "roi-calculator"
  ],
  formulaDescription:
    "NOI = Effective Gross Income - Operating Expenses. Cap Rate = (Annual NOI / Purchase Price) × 100%. Cash-on-Cash = (Annual Net Cash Flow / Total Cash Invested) × 100%.",
  faqs: rental_propertyFaqs,
  inputs: [
    {
      name: "purchasePrice",
      label: "Purchase Price",
      type: "number",
      defaultValue: 200000,
    },
    {
      name: "monthlyRent",
      label: "Gross Monthly Rent",
      type: "number",
      defaultValue: 2000,
    },
    {
      name: "downPaymentPct",
      label: "Down Payment (%)",
      type: "number",
      defaultValue: 20,
    },
    {
      name: "interestRate",
      label: "Interest Rate (%)",
      type: "number",
      defaultValue: 6.5,
    },
  ],
  outputs: [
    {
      name: "irr",
      label: "Internal Rate of Return (IRR)",
      format: "text",
      highlight: true,
    },
    {
      name: "cashOnCashReturn",
      label: "Cash-on-Cash Return",
      format: "text",
    },
    {
      name: "capRate",
      label: "Capitalization Rate (Cap Rate)",
      format: "text",
    },
    {
      name: "monthlyNetCashFlow",
      label: "Monthly Net Cash Flow",
      format: "currency",
    },
    {
      name: "annualNOI",
      label: "Annual Net Operating Income (NOI)",
      format: "currency",
    },
    {
      name: "totalNetProfitAtSale",
      label: "Total Profit upon Sale",
      format: "currency",
    },
  ],
  calculate: calculateRentalPropertyCalculator,
  CustomComponent: RentalPropertyCalculator,
  ContentComponent: RentalPropertyContent,
};

export default rental_propertyConfig;
