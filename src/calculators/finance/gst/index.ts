import { CalculatorModuleDefinition } from "../../types";
import { calculateSingleGst } from "@/lib/calculator-engine/formulas/gst";

export const GST_CALCULATOR: CalculatorModuleDefinition = {
  id: "gst",
  title: "GST Calculator – Indian Goods & Services Tax Estimator",
  slug: "gst-calculator",
  category: "Finance",
  subcategory: "Tax and Salary",
  description:
    "Calculate Indian GST inclusive & exclusive amounts, reverse GST, CGST/SGST/IGST inter-state splits, multi-item tax invoices, and composition scheme tax savings.",
  iconName: "Receipt",
  featured: true,
  tags: [
    "gst calculator",
    "online gst calculator",
    "gst inclusive calculator",
    "gst exclusive calculator",
    "reverse gst calculator",
    "cgst sgst igst calculator",
    "gst rate slabs india",
    "multi item gst invoice",
    "composition scheme gst",
  ],
  formulaDescription:
    "GST Exclusive = Base × (Rate / 100). GST Inclusive = Base = Total / (1 + Rate / 100). CGST & SGST are 50/50 intra-state split.",
  faqs: [
    {
      question: "What is the difference between GST inclusive and exclusive?",
      answer:
        "GST Inclusive means tax is already included in the advertised price. GST Exclusive means tax is added on top of the net base price.",
    },
    {
      question: "How are CGST, SGST, and IGST calculated?",
      answer:
        "For intra-state sales (within same state), GST is split 50/50 between CGST and SGST. For inter-state sales, full tax is collected as IGST.",
    },
  ],
  inputs: [
    { name: "amount", label: "Transaction Amount", type: "currency", defaultValue: 10000, unit: "₹", min: 1, max: 100000000, step: 500 },
    {
      name: "gstRate",
      label: "GST Tax Slab",
      type: "select",
      defaultValue: 18,
      options: [
        { label: "0% (NIL)", value: 0 },
        { label: "0.25% (Diamonds)", value: 0.25 },
        { label: "3% (Gold)", value: 3 },
        { label: "5% (Basic)", value: 5 },
        { label: "12% (Electronics)", value: 12 },
        { label: "18% (Standard)", value: 18 },
        { label: "28% (Luxury)", value: 28 },
      ],
    },
    {
      name: "gstType",
      label: "Tax Type",
      type: "select",
      defaultValue: "exclusive",
      options: [
        { label: "GST Exclusive (Add Tax)", value: "exclusive" },
        { label: "GST Inclusive (Extract Tax)", value: "inclusive" },
        { label: "Reverse GST (From Tax Amount)", value: "reverse_tax" },
      ],
    },
  ],
  outputs: [
    { name: "totalAmount", label: "Final Total Amount", format: "currency", highlight: true },
    { name: "netAmount", label: "Net Taxable Base Amount", format: "currency", highlight: true },
    { name: "gstAmount", label: "Total GST Amount", format: "currency" },
    { name: "cgstAmount", label: "CGST Portion (50%)", format: "currency" },
    { name: "sgstAmount", label: "SGST Portion (50%)", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = calculateSingleGst({
      amount: Number(inputs.amount || 10000),
      gstRate: Number(inputs.gstRate || 18),
      calculationType: (inputs.gstType as any) || "exclusive",
      supplyType: "intra_state",
    });

    return {
      totalAmount: res.grandTotalWithCess,
      netAmount: res.netAmount,
      gstAmount: res.gstAmount,
      cgstAmount: res.cgstAmount,
      sgstAmount: res.sgstAmount,
    };
  },
};

export default GST_CALCULATOR;
