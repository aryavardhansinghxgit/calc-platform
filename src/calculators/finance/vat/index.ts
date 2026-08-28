import { CalculatorModuleDefinition } from "../../types";
import { solveVat } from "@/lib/calculator-engine/formulas/vat";
import { vatFaqs } from "./faq";

export const VAT_CALCULATOR: CalculatorModuleDefinition = {
  id: "vat",
  title: "VAT Calculator – Global Value-Added Tax Estimator",
  slug: "vat-calculator",
  category: "Finance",
  subcategory: "Tax and Salary",
  description:
    "Calculate VAT inclusive and exclusive prices, reverse VAT, tax amounts, supply-chain VAT and compare VAT with sales tax using our free global VAT calculator.",
  iconName: "Receipt",
  featured: true,
  tags: [
    "vat calculator",
    "vat calculation",
    "vat inclusive calculator",
    "vat exclusive calculator",
    "reverse vat calculator",
    "vat percentage calculator",
    "calculate vat",
    "remove vat",
    "vat tax calculator",
    "gst calculator",
    "vat inclusive price",
    "vat exclusive price",
    "vat fraction",
    "vat vs sales tax",
    "vat rates",
    "global vat calculator",
  ],
  relatedCalculators: [
    "sales-tax",
    "gst",
    "income-tax",
    "salary",
    "take-home-pay",
    "budget",
    "currency",
    "compound-interest",
  ],
  formulaDescription:
    "VAT Exclusive: Gross = Net × (1 + Rate / 100). VAT Inclusive: Net = Gross / (1 + Rate / 100). Tax Amount = Gross - Net.",
  faqs: vatFaqs,
  inputs: [
    { name: "netPrice", label: "Net Price (Exclusive of VAT)", type: "currency", defaultValue: 1200, unit: "£", min: 0, max: 100000000, step: 10 },
    { name: "vatRate", label: "VAT Rate (%)", type: "percentage", defaultValue: 20, unit: "%", min: 0, max: 100, step: 0.5 },
  ],
  outputs: [
    { name: "grossPrice", label: "Gross Total Price (Inclusive)", format: "currency", highlight: true },
    { name: "taxAmount", label: "VAT Tax Amount", format: "currency", highlight: true },
    { name: "netPrice", label: "Net Base Price", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = solveVat({
      netPrice: Number(inputs.netPrice || 1200),
      vatRate: Number(inputs.vatRate !== undefined ? inputs.vatRate : 20),
    });

    return {
      grossPrice: res.grossPrice,
      taxAmount: res.taxAmount,
      netPrice: res.netPrice,
    };
  },
};

export default VAT_CALCULATOR;
