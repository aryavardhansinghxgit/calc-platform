import { CalculatorModuleDefinition } from "../../types";

export const GST_CALCULATOR: CalculatorModuleDefinition = {
  id: "gst",
  title: "GST Calculator",
  slug: "gst-calculator",
  category: "Finance",
  subcategory: "Taxes",
  description: "Calculate Goods and Services Tax (GST) inclusive and exclusive amounts for Indian business transactions.",
  iconName: "Receipt",
  featured: true,
  tags: ["gst", "gst calculator", "tax inclusive", "tax exclusive", "india tax"],
  formulaDescription: "GST Exclusive = Amount × GST%. GST Inclusive = Amount - [Amount / (1 + GST%)].",
  faqs: [
    {
      question: "What is the difference between GST inclusive and exclusive?",
      answer: "GST Inclusive means the tax is already added into the product price. GST Exclusive means tax needs to be added on top of the net base price.",
    },
  ],
  inputs: [
    { name: "amount", label: "Transaction Amount", type: "currency", defaultValue: 10000, unit: "₹", min: 1, max: 100000000, step: 100 },
    {
      name: "gstRate",
      label: "GST Tax Slab",
      type: "select",
      defaultValue: 18,
      options: [
        { label: "5%", value: 5 },
        { label: "12%", value: 12 },
        { label: "18%", value: 18 },
        { label: "28%", value: 28 },
      ],
    },
    {
      name: "gstType",
      label: "Tax Type",
      type: "select",
      defaultValue: "exclusive",
      options: [
        { label: "GST Exclusive (Add GST)", value: "exclusive" },
        { label: "GST Inclusive (Extract GST)", value: "inclusive" },
      ],
    },
  ],
  outputs: [
    { name: "gstAmount", label: "GST Amount", format: "currency", highlight: true },
    { name: "totalAmount", label: "Final Total Amount", format: "currency", highlight: true },
    { name: "netAmount", label: "Net Base Amount", format: "currency" },
    { name: "cgstAmount", label: "CGST Portion (50%)", format: "currency" },
    { name: "sgstAmount", label: "SGST Portion (50%)", format: "currency" },
  ],
  calculate: (inputs) => {
    const amt = Number(inputs.amount || 10000);
    const rate = Number(inputs.gstRate || 18) / 100;
    const type = String(inputs.gstType || "exclusive");

    let gst = 0;
    let net = 0;
    let total = 0;

    if (type === "inclusive") {
      total = amt;
      net = amt / (1 + rate);
      gst = total - net;
    } else {
      net = amt;
      gst = amt * rate;
      total = net + gst;
    }

    const halfGst = gst / 2;

    return {
      gstAmount: Number(gst.toFixed(2)),
      totalAmount: Number(total.toFixed(2)),
      netAmount: Number(net.toFixed(2)),
      cgstAmount: Number(halfGst.toFixed(2)),
      sgstAmount: Number(halfGst.toFixed(2)),
    };
  },
};

export default GST_CALCULATOR;
