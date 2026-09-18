import { getAllCalculatorDefinitions } from "@/calculators";

const defs = getAllCalculatorDefinitions();

// Let's test all calculators against the actual layout conditions in CalculatorLayout.tsx
// Let's write a function that simulates CalculatorLayout's is* checks:
function isBespoke(def: any): string | null {
  const idLower = (def.id || "").toLowerCase();
  const slugLower = (def.slug || "").toLowerCase();

  if (idLower.includes("mortgage") && idLower !== "mortgage-payoff-calculator" && slugLower !== "mortgage-payoff-calculator" && idLower !== "va" && slugLower !== "va-mortgage-calculator") return "mortgage";
  if (idLower.includes("amortization")) return "amortization";
  if (def.id === "loan" || def.slug === "loan-calculator") return "loan";
  if (def.id === "emi" || def.slug === "emi-calculator") return "emi";
  if (def.id === "house-affordability" || def.slug === "house-affordability-calculator") return "house-affordability";
  if (def.id === "refinance" || def.slug === "refinance-calculator") return "refinance";
  if (def.id === "auto-loan" || def.slug === "auto-loan-calculator") return "auto-loan";
  if (def.id === "auto-lease" || def.slug === "auto-lease-calculator") return "auto-lease";
  if (idLower === "lease-calculator" || slugLower === "lease-calculator" || idLower === "lease" || slugLower === "lease") return "lease";
  if (idLower === "tip-calculator" || slugLower === "tip-calculator" || idLower === "tip" || slugLower === "tip") return "tip";
  if (idLower.includes("college")) return "college";
  if (idLower.includes("depreciation")) return "depreciation";
  if (idLower.includes("boat")) return "boat";
  if (idLower.includes("credit-card")) return "credit-card";
  if (idLower === "gdp-calculator" || slugLower === "gdp-calculator") return "gdp";
  if (def.id === "compound-interest" || def.slug === "compound-interest-calculator") return "compound-interest";
  if (def.id === "simple-interest" || def.slug === "simple-interest-calculator") return "simple-interest";
  if (def.id === "interest" || def.slug === "interest-calculator") return "interest";
  if (def.id === "investment" || def.slug === "investment-calculator") return "investment";
  if (def.id === "savings" || def.slug === "savings-calculator") return "savings";
  if (def.id === "sip" || def.slug === "sip-calculator") return "sip";
  if (def.id === "fd" || def.slug === "fd-calculator") return "fd";
  if (def.id === "rd" || def.slug === "rd-calculator") return "rd";
  if (def.id === "cagr" || def.slug === "cagr-calculator") return "cagr";
  if (def.id === "roi" || def.slug === "roi-calculator") return "roi";
  if (def.id === "future-value" || def.slug === "future-value-calculator") return "future-value";
  if (def.id === "present-value" || def.slug === "present-value-calculator") return "present-value";
  if (def.id === "income-tax" || def.slug === "income-tax-calculator") return "income-tax";
  if (def.id === "gst" || def.slug === "gst-calculator") return "gst";
  if (def.id === "vat" || def.slug === "vat-calculator") return "vat";
  if (def.id === "sales-tax" || def.slug === "sales-tax-calculator") return "sales-tax";
  if (def.id === "repayment" || def.slug === "repayment-calculator") return "repayment";
  if (def.id === "debt-payoff" || def.slug === "debt-payoff-calculator") return "debt-payoff";
  if (def.id === "debt-consolidation" || def.slug === "debt-consolidation-calculator") return "debt-consolidation";
  if (def.id === "retirement" || def.slug === "retirement-calculator") return "retirement";
  if (def.id === "401k" || def.slug === "401k-calculator") return "401k";
  if (def.id === "roth-ira" || def.slug === "roth-ira-calculator") return "roth-ira";
  if (def.id === "rmd" || def.slug === "rmd-calculator") return "rmd";
  if (def.id === "pension" || def.slug === "pension-calculator") return "pension";
  if (def.id === "social-security" || def.slug === "social-security-calculator") return "social-security";
  if (def.id === "annuity" || def.slug === "annuity-calculator") return "annuity";
  if (def.id === "annuity-payout" || def.slug === "annuity-payout-calculator") return "annuity-payout";
  if (def.id === "payment" || def.id === "payment-calculator" || def.slug === "payment-calculator") return "payment";
  if (def.id === "margin" || def.slug === "margin-calculator") return "margin";
  if (def.id === "discount" || def.slug === "discount-calculator") return "discount";
  if (def.id === "commission" || def.slug === "commission-calculator") return "commission";
  if (def.id === "personal-loan" || def.slug === "personal-loan-calculator") return "personal-loan";
  if (def.id === "business-loan" || def.slug === "business-loan-calculator") return "business-loan";
  if (def.id === "student-loan" || def.slug === "student-loan-calculator") return "student-loan";
  if (def.id === "budget" || def.slug === "budget-calculator") return "budget";
  if (def.id === "bmi" || def.slug === "bmi-calculator") return "bmi";
  if (def.CustomComponent) return "CustomComponent";
  return null;
}

const genericCalcs = defs.filter(d => !isBespoke(d));
console.log('Total generic schema-driven calculators:', genericCalcs.length);
genericCalcs.forEach(c => {
  console.log(`Candidate: ${c.slug} (Category: ${c.category}, Inputs: ${c.inputs.length}, Outputs: ${c.outputs.length})`);
});
