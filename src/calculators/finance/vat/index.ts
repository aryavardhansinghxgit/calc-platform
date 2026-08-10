import { CalculatorModuleDefinition } from "../../types";
import { solveVat } from "@/lib/calculator-engine/formulas/vat";

export const VAT_CALCULATOR: CalculatorModuleDefinition = {
  id: "vat",
  title: "VAT Calculator – Global Value-Added Tax Estimator",
  slug: "vat-calculator",
  category: "Finance",
  subcategory: "Taxes",
  description:
    "Calculate Value-Added Tax (VAT) exclusive and inclusive amounts, reverse VAT, 4-way bi-directional solving, multi-stage supply chain tax maps, and global country rate presets.",
  iconName: "Receipt",
  featured: true,
  tags: [
    "vat calculator",
    "value added tax",
    "vat inclusive",
    "vat exclusive",
    "reverse vat calculator",
    "uk vat calculator",
    "eu vat rates",
    "sales tax vs vat",
  ],
  formulaDescription:
    "VAT Exclusive: Gross = Net × (1 + Rate / 100). VAT Inclusive: Net = Gross / (1 + Rate / 100). Tax Amount = Gross - Net.",
  faqs: [
    {
      question: "What is the difference between VAT inclusive and exclusive?",
      answer:
        "VAT Inclusive means the tax is already included within the advertised gross price. VAT Exclusive means tax needs to be added on top of the net base price.",
    },
    {
      question: "How do I calculate Reverse VAT?",
      answer: "Use Net Price = Gross Price / (1 + VAT Rate / 100). For example, £120 gross at 20% VAT gives a Net Price of £100.",
    },
  ],
  inputs: [
    { name: "netPrice", label: "Net Price (Exclusive of VAT)", type: "currency", defaultValue: 100, unit: "£", min: 0, max: 100000000, step: 10 },
    { name: "vatRate", label: "VAT Rate (%)", type: "percentage", defaultValue: 20, unit: "%", min: 0, max: 100, step: 0.5 },
  ],
  outputs: [
    { name: "grossPrice", label: "Gross Total Price (Inclusive)", format: "currency", highlight: true },
    { name: "taxAmount", label: "VAT Tax Amount", format: "currency", highlight: true },
    { name: "netPrice", label: "Net Base Price", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = solveVat({
      netPrice: Number(inputs.netPrice || 100),
      vatRate: Number(inputs.vatRate || 20),
    });

    return {
      grossPrice: res.grossPrice,
      taxAmount: res.taxAmount,
      netPrice: res.netPrice,
    };
  },
};

export default VAT_CALCULATOR;
