import { Metadata } from "next";
import { AUTO_LOAN_METADATA } from "./metadata";
import { AUTO_LOAN_CONFIG } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = AUTO_LOAN_METADATA;

export default function AutoLoanCalculatorPage() {
  const serializableDef = {
    ...AUTO_LOAN_CONFIG,
    inputs: [
      { name: "vehiclePrice", label: "Vehicle Price", type: "currency" as const, defaultValue: 35000 },
      { name: "downPayment", label: "Cash Down Payment", type: "currency" as const, defaultValue: 5000 },
      { name: "tradeInValue", label: "Trade-In Value", type: "currency" as const, defaultValue: 3000 },
      { name: "amountOwedOnTradeIn", label: "Amount Owed on Trade", type: "currency" as const, defaultValue: 0 },
      { name: "interestRate", label: "Interest Rate (APR)", type: "percentage" as const, defaultValue: 5.9 },
      { name: "loanTermMonths", label: "Loan Term (Months)", type: "number" as const, defaultValue: 60 },
      { name: "salesTaxRate", label: "Sales Tax Rate (%)", type: "percentage" as const, defaultValue: 3.0 },
      { name: "registrationFees", label: "Registration & Title", type: "currency" as const, defaultValue: 300 },
      { name: "dealerFees", label: "Dealer Fees", type: "currency" as const, defaultValue: 250 },
      { name: "docFees", label: "Doc Fees", type: "currency" as const, defaultValue: 150 },
      { name: "extendedWarranty", label: "Extended Warranty", type: "currency" as const, defaultValue: 0 },
      { name: "includeFeesInLoan", label: "Finance Taxes & Fees", type: "select" as const, defaultValue: "true" },
    ],
    outputs: [
      { name: "monthlyPayment", label: "Estimated Monthly Payment", type: "currency" as const },
      { name: "loanAmount", label: "Total Loan Financed", type: "currency" as const },
      { name: "totalInterestPaid", label: "Total Interest Paid", type: "currency" as const },
      { name: "totalSalesTax", label: "Total Sales Tax", type: "currency" as const },
      { name: "totalFees", label: "Total Dealer & Reg Fees", type: "currency" as const },
      { name: "totalPayment", label: "Total Loan Repayments", type: "currency" as const },
      { name: "totalOutofPocketCost", label: "Total Vehicle Purchase Cost", type: "currency" as const },
    ],
  };

  const schemas = generateJsonLdSchema({
    title: AUTO_LOAN_CONFIG.title,
    description: AUTO_LOAN_CONFIG.description,
    slug: AUTO_LOAN_CONFIG.slug,
    category: AUTO_LOAN_CONFIG.category,
    faqs: AUTO_LOAN_CONFIG.faqs,
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CalculatorLayout definition={serializableDef} />
    </>
  );
}
