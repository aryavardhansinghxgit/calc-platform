import { CalculatorModuleDefinition } from "../../types";

export const VAT_CALCULATOR: CalculatorModuleDefinition = {
  id: "vat",
  title: "VAT Calculator",
  slug: "vat-calculator",
  category: "Finance",
  subcategory: "Taxes",
  description: "Calculate Value Added Tax (VAT) amounts, net prices, and gross prices.",
  iconName: "Receipt",
  featured: false,
  tags: ["vat", "value added tax", "sales tax", "gross price"],
  formulaDescription: "VAT Amount = Net Price × (VAT Rate / 100). Gross Price = Net Price + VAT Amount.",
  faqs: [
    {
      question: "What is Value Added Tax (VAT)?",
      answer: "VAT is a consumption tax added to goods and services at each stage of the supply chain where value is added.",
    },
  ],
  inputs: [
    { name: "amount", label: "Amount", type: "currency", defaultValue: 100, unit: "$", min: 1, max: 1000000, step: 10 },
    { name: "vatRate", label: "VAT Rate", type: "percentage", defaultValue: 20, unit: "%", min: 0.1, max: 50, step: 0.5 },
    {
      name: "calculationType",
      label: "Calculation Type",
      type: "select",
      defaultValue: "add",
      options: [
        { label: "Add VAT (Exclusive)", value: "add" },
        { label: "Remove VAT (Inclusive)", value: "remove" },
      ],
    },
  ],
  outputs: [
    { name: "vatAmount", label: "VAT Amount", format: "currency", highlight: true },
    { name: "grossAmount", label: "Gross Amount (Total)", format: "currency", highlight: true },
    { name: "netAmount", label: "Net Amount (Pre-tax)", format: "currency" },
  ],
  calculate: (inputs) => {
    const amt = Number(inputs.amount || 100);
    const rate = Number(inputs.vatRate || 20) / 100;
    const type = String(inputs.calculationType || "add");

    let vat = 0;
    let net = 0;
    let gross = 0;

    if (type === "remove") {
      gross = amt;
      net = gross / (1 + rate);
      vat = gross - net;
    } else {
      net = amt;
      vat = net * rate;
      gross = net + vat;
    }

    return {
      vatAmount: Number(vat.toFixed(2)),
      grossAmount: Number(gross.toFixed(2)),
      netAmount: Number(net.toFixed(2)),
    };
  },
};

export default VAT_CALCULATOR;
