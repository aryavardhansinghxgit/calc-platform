import { AUTO_LOAN_FAQS } from "./faq";

export const AUTO_LOAN_CONFIG = {
  id: "auto-loan",
  title: "Auto Loan Calculator",
  slug: "auto-loan-calculator",
  category: "Finance",
  subcategory: "Auto",
  description:
    "Calculate monthly car payments, total loan cost, interest expenses, trade-in equity, negative equity rollover, state taxes, and vehicle affordability.",
  iconName: "Car",
  featured: true,
  tags: [
    "auto loan",
    "car payment calculator",
    "vehicle financing",
    "trade-in value",
    "negative equity",
    "sales tax",
    "car affordability",
  ],
  formulaDescription:
    "Loan Amount = Vehicle Price - Down Payment - Net Trade-In Equity + Negative Equity Rollover + Financed Taxes & Fees; Monthly Payment = Loan Amount × [r(1 + r)^n] / [(1 + r)^n - 1]",
  relatedCalculators: [
    "loan-calculator",
    "apr-calculator",
    "amortization-calculator",
    "personal-loan-calculator",
    "refinance-calculator",
    "credit-card-calculator",
    "debt-payoff-calculator",
  ],
  faqs: AUTO_LOAN_FAQS,
};
