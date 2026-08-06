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
    id: "sip-calculator",
    title: "SIP Calculator",
    slug: "sip-calculator",
    category: "Finance",
    keywords: ["sip", "systematic investment plan", "mutual fund", "wealth growth", "compounding", "returns"],
    description: "Estimate Systematic Investment Plan returns, compounding growth, and maturity value.",
    href: "/calculators/sip-calculator",
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
