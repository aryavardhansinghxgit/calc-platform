import { CalculatorModuleDefinition } from "../../types";
import { calculateGstFormula } from "@/lib/calculator-engine/formulas/gst";

export const GST_CALCULATOR: CalculatorModuleDefinition = {
  id: "gst",
  title: "GST Calculator",
  slug: "gst-calculator",
  category: "Business",
  description: "Calculate Goods and Services Tax (GST) inclusive and exclusive amounts.",
  iconName: "Receipt",
  featured: false,
  tags: ["gst", "tax", "vat", "business", "invoice"],
  formulaDescription: "GST Amount = (Amount × GST Rate) / 100",
  inputs: [
    {
      name: "amount",
      label: "Amount",
      type: "currency",
      defaultValue: 1000,
      unit: "$",
      min: 1,
      max: 1000000,
      step: 10,
    },
    {
      name: "gstRate",
      label: "GST Rate",
      type: "percentage",
      defaultValue: 18,
      unit: "%",
      min: 0,
      max: 50,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "totalAmount",
      label: "Total Amount (Inc. GST)",
      format: "currency",
      highlight: true,
    },
    {
      name: "gstAmount",
      label: "GST Amount",
      format: "currency",
    },
    {
      name: "originalAmount",
      label: "Net Amount (Exc. GST)",
      format: "currency",
    },
  ],
  calculate: (inputs) => {
    const res = calculateGstFormula({
      amount: Number(inputs.amount || 1000),
      gstRate: Number(inputs.gstRate || 18),
      type: "exclusive",
    });
    return {
      totalAmount: res.totalAmount,
      gstAmount: res.gstAmount,
      originalAmount: res.originalAmount,
    };
  },
};

export default GST_CALCULATOR;
