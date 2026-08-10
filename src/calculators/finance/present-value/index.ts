import { CalculatorModuleDefinition } from "../../types";
import { calculatePresentValue } from "@/lib/calculator-engine/formulas/present-value";

export const PRESENT_VALUE_CALCULATOR: CalculatorModuleDefinition = {
  id: "present-value",
  title: "Present Value Calculator – Discounted Cash Flow & NPV Model",
  slug: "present-value-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate the Present Value (PV) of future lump sums, periodic annuities, growing cash flows, and Net Present Value (NPV) with discount rate sensitivity analysis.",
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
  faqs: [
    {
      question: "What is Present Value (PV)?",
      answer:
        "Present Value (PV) is the current worth of a future sum of money or stream of cash flows, given a specified discount rate of return.",
    },
    {
      question: "How is Present Value calculated?",
      answer:
        "For a lump sum, PV = FV / (1 + r/n)^(n×t). For periodic deposits, annuity formulas account for recurring cash flows discounted over time.",
    },
    {
      question: "What is the difference between Present Value and Future Value?",
      answer:
        "Future Value (FV) calculates what today's money will compound into in the future. Present Value (PV) discounts future money back to today's purchasing power.",
    },
    {
      question: "What is Net Present Value (NPV)?",
      answer:
        "Net Present Value (NPV) is the sum of discounted future cash inflows minus initial capital outlays. A positive NPV indicates a profitable investment.",
    },
  ],
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
