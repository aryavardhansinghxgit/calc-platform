import { CalculatorModuleDefinition } from "../../types";
import { calculatePresentValue } from "@/lib/calculator-engine/formulas/present-value";
import { present_valueFaqs } from "./faq";

export const PRESENT_VALUE_CALCULATOR: CalculatorModuleDefinition = {
  id: "present-value",
  title: "Present Value Calculator — PV, Annuity, NPV & Discounted Cash Flow",
  slug: "present-value-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate present value of future lump sums and recurring cash flows, compare annuities, evaluate NPV, test discount-rate sensitivity, and understand the time value of money.",
  iconName: "DollarSign",
  featured: true,
  tags: [
    "present value calculator",
    "pv calculator",
    "discounted cash flow",
    "dcf calculator",
    "net present value",
    "npv calculator",
    "time value of money",
    "tvm",
    "discount rate calculator",
    "annuity due",
  ],
  formulaDescription: "PV = FV / (1 + r/n)^(n×t) + PMT × [1 - (1 + r/n)^(-n×t)] / (r/n)",
  faqs: present_valueFaqs,
  inputs: [
    { name: "futureValue", label: "Future Value (FV)", type: "currency", defaultValue: 50000, unit: "$", min: 0, max: 10000000, step: 1000 },
    { name: "periodicPayment", label: "Periodic Payment (PMT)", type: "currency", defaultValue: 500, unit: "$", min: 0, max: 100000, step: 50 },
    { name: "discountRate", label: "Annual Discount Rate", type: "percentage", defaultValue: 7.0, unit: "%", min: 0.1, max: 30, step: 0.1 },
    { name: "years", label: "Timeframe (Years)", type: "slider", defaultValue: 10, unit: "years", min: 1, max: 50, step: 1 },
  ],
  outputs: [
    { name: "presentValue", label: "Present Value (PV)", format: "currency", highlight: true },
    { name: "totalFutureCashFlows", label: "Total Future Cash Flows", format: "currency" },
    { name: "totalDiscountAmount", label: "Total Discount Amount", format: "currency" },
    { name: "discountRatioPct", label: "Discount Ratio (%)", format: "percentage" },
  ],
  calculate: (inputs) => {
    const res = calculatePresentValue({
      futureValue: Number(inputs.futureValue || 50000),
      periodicPayment: Number(inputs.periodicPayment || 500),
      discountRate: Number(inputs.discountRate || 7.0),
      years: Number(inputs.years || 10),
      compoundingFrequency: "monthly",
      paymentFrequency: "monthly",
      paymentTiming: "end",
    });

    return {
      presentValue: res.presentValue,
      totalFutureCashFlows: res.totalFutureCashFlows,
      totalDiscountAmount: res.totalDiscountAmount,
      discountRatioPct: res.discountRatioPct,
    };
  },
};

export default PRESENT_VALUE_CALCULATOR;
