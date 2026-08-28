import { CalculatorModuleDefinition } from "../../types";
import { calculateSingleGst } from "@/lib/calculator-engine/formulas/gst";
import { gstFaqs } from "./faq";

export const GST_CALCULATOR: CalculatorModuleDefinition = {
  id: "gst",
  title: "GST Calculator – Indian Goods & Services Tax Calculator",
  slug: "gst-calculator",
  category: "Finance",
  subcategory: "Tax and Salary",
  description:
    "Free GST Calculator India. Calculate GST inclusive and exclusive prices, reverse GST, CGST, SGST, IGST, multi-item invoices and applicable cess using the rate you enter.",
  iconName: "Receipt",
  featured: true,
  tags: [
    "gst calculator",
    "gst calculator india",
    "gst inclusive calculator",
    "gst exclusive calculator",
    "reverse gst calculator",
    "cgst sgst calculator",
    "igst calculator",
    "gst invoice calculator",
    "gst rate slabs india",
    "multi item gst invoice",
    "composition scheme gst",
  ],
  formulaDescription:
    "GST Exclusive = Base × (Rate / 100). GST Inclusive = Base = Total / (1 + Rate / 100). CGST & SGST are 50/50 intra-state split. IGST is 100% inter-state levy.",
  relatedCalculators: [
    "sales-tax",
    "vat",
    "income-tax",
    "salary",
    "take-home-pay",
    "budget",
    "currency",
    "compound-interest",
  ],
  faqs: gstFaqs,
  inputs: [
    { name: "amount", label: "Transaction Amount", type: "currency", defaultValue: 10000, unit: "₹", min: 0, max: 100000000, step: 500 },
    {
      name: "gstRate",
      label: "GST Tax Slab",
      type: "select",
      defaultValue: 18,
      options: [
        { label: "0% (Nil / Exempted)", value: 0 },
        { label: "0.25% (Concessional / Precious Stones)", value: 0.25 },
        { label: "3% (Precious Metals / Jewellery)", value: 3 },
        { label: "5% (Common Rate)", value: 5 },
        { label: "12% (Specified Supplies)", value: 12 },
        { label: "18% (General / Standard Rate)", value: 18 },
        { label: "28% (Specified Luxury / Demerit)", value: 28 },
        { label: "40% (Special Rate for Specified Goods)", value: 40 },
      ],
    },
    {
      name: "gstType",
      label: "Tax Type",
      type: "select",
      defaultValue: "exclusive",
      options: [
        { label: "GST Exclusive (Add Tax to Base)", value: "exclusive" },
        { label: "GST Inclusive (Extract Tax from Total)", value: "inclusive" },
        { label: "Reverse GST (From Known Tax Amount)", value: "reverse_tax" },
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
      amount: Number(inputs.amount !== undefined && inputs.amount !== "" ? inputs.amount : 10000),
      gstRate: Number(inputs.gstRate !== undefined && inputs.gstRate !== "" ? inputs.gstRate : 18),
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
