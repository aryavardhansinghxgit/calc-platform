/**
 * Search Index Data Structure for instant platform search.
 */

export interface SearchIndexItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  keywords: string[];
  description: string;
  href: string;
}

export const SEARCH_INDEX: SearchIndexItem[] = [
  {
    id: "mortgage-calculator",
    title: "Mortgage Calculator",
    slug: "mortgage-calculator",
    category: "Finance",
    keywords: ["mortgage", "home loan", "down payment", "housing", "property tax", "monthly payment", "interest"],
    description: "Calculate home loan payments, monthly principal & interest breakdown, and amortization schedule.",
    href: "/calculators/mortgage-calculator",
  },
  {
    id: "loan-calculator",
    title: "Loan Calculator",
    slug: "loan-calculator",
    category: "Finance",
    keywords: ["loan", "personal loan", "auto loan", "car loan", "borrowing cost", "monthly payment"],
    description: "Estimate monthly auto and personal loan payments with custom interest rates and terms.",
    href: "/calculators/loan-calculator",
  },
  {
    id: "emi-calculator",
    title: "EMI Calculator",
    slug: "emi-calculator",
    category: "Finance",
    keywords: ["emi", "equated monthly installment", "bank loan", "interest schedule", "tenure"],
    description: "Calculate Equated Monthly Installment (EMI) and interest component schedule.",
    href: "/calculators/emi-calculator",
  },
  {
    id: "compound-interest-calculator",
    title: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    category: "Finance",
    keywords: ["compound interest", "savings", "fixed deposit", "compounding frequency", "future value"],
    description: "Calculate compounding growth for savings, fixed deposits, and long-term investments.",
    href: "/calculators/compound-interest-calculator",
  },
  {
    id: "sip-calculator",
    title: "SIP Calculator",
    slug: "sip-calculator",
    category: "Finance",
    keywords: ["sip", "systematic investment plan", "mutual fund", "wealth growth", "compounding", "returns"],
    description: "Estimate Systematic Investment Plan returns, compounding growth, and maturity value.",
    href: "/calculators/sip-calculator",
  },
  {
    id: "fd-calculator",
    title: "FD Calculator",
    slug: "fd-calculator",
    category: "Finance",
    keywords: ["fd", "fixed deposit", "bank deposit", "interest rate", "maturity amount"],
    description: "Calculate Fixed Deposit (FD) maturity amount and interest earned.",
    href: "/calculators/fd-calculator",
  },
  {
    id: "rd-calculator",
    title: "RD Calculator",
    slug: "rd-calculator",
    category: "Finance",
    keywords: ["rd", "recurring deposit", "monthly savings", "bank deposit", "maturity value"],
    description: "Calculate Recurring Deposit (RD) total investment returns and interest maturity value.",
    href: "/calculators/rd-calculator",
  },
  {
    id: "gst-calculator",
    title: "GST Calculator",
    slug: "gst-calculator",
    category: "Business",
    keywords: ["gst", "goods and services tax", "tax", "inclusive", "exclusive", "invoice"],
    description: "Calculate Goods and Services Tax (GST) inclusive and exclusive amounts.",
    href: "/calculators/gst-calculator",
  },
  {
    id: "percentage-calculator",
    title: "Percentage Calculator",
    slug: "percentage-calculator",
    category: "Math",
    keywords: ["percentage", "percent", "proportion", "increase", "decrease", "ratio"],
    description: "Calculate percentage values, percentage increase/decrease, and proportions.",
    href: "/calculators/percentage-calculator",
  },
  {
    id: "age-calculator",
    title: "Age Calculator",
    slug: "age-calculator",
    category: "Date",
    keywords: ["age", "birthday", "date of birth", "days lived", "next birthday", "chronological age"],
    description: "Calculate exact age in years, months, days, total days, and countdown to next birthday.",
    href: "/calculators/age-calculator",
  },
];

export function searchCalculators(query: string): SearchIndexItem[] {
  if (!query || query.trim() === "") return SEARCH_INDEX;
  const q = query.toLowerCase().trim();
  return SEARCH_INDEX.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q))
  );
}
