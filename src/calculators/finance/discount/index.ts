import { CalculatorModuleDefinition } from "../../types";
import { calculateDiscountSolver } from "@/lib/calculator-engine/formulas/discount";

export const DISCOUNT_CALCULATOR: CalculatorModuleDefinition = {
  id: "discount",
  title: "Discount Calculator – Stacked Savings & Coupon Suite",
  slug: "discount-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Free Discount Calculator. Calculate final sale price after single or stacked percentage discounts, fixed coupons, sales tax, and reverse list price solvers.",
  iconName: "Tag",
  featured: true,
  tags: [
    "discount",
    "discount calculator",
    "sale price",
    "savings",
    "coupon",
    "stacked discount",
    "sales tax discount",
  ],
  formulaDescription:
    "Single Discount: Savings = Price × Discount %. Final Price = Price - Savings. Stacked Discount: Final Price = Price × (1 - D1) × (1 - D2).",
  faqs: [
    {
      question: "How do double or stacked discounts work?",
      answer:
        "Stacked discounts (e.g. 20% off plus an extra 10% off) apply sequentially. A 20% discount reduces a $100 item to $80, and the secondary 10% discount reduces $80 to $72, providing an effective combined discount of 28%.",
    },
    {
      question: "Is sales tax applied before or after a discount?",
      answer:
        "In most retail jurisdictions, sales tax is calculated on the net discounted price (after discount is applied). Some promotions calculate tax on the original pre-discount price.",
    },
  ],
  inputs: [
    { name: "originalPrice", label: "Original List Price ($)", type: "currency", defaultValue: 59.99, unit: "$", min: 0.1, max: 1000000, step: 5 },
    { name: "discountValue", label: "Discount Value", type: "number", defaultValue: 15, unit: "%", min: 0, max: 100, step: 1 },
  ],
  outputs: [
    { name: "finalPrice", label: "Final Sale Price", format: "currency", highlight: true },
    { name: "youSaved", label: "Total Amount Saved", format: "currency", highlight: true },
    { name: "effectiveDiscountPercent", label: "Effective Savings %", format: "percentage" },
  ],
  calculate: (inputs) => {
    const res = calculateDiscountSolver({
      originalPrice: Number(inputs.originalPrice || 59.99),
      discountValue: Number(inputs.discountValue || 15),
      discountType: "percent",
    });

    return {
      finalPrice: res.finalPrice,
      youSaved: res.youSaved,
      effectiveDiscountPercent: `${res.effectiveDiscountPercent}%`,
    };
  },
};

export default DISCOUNT_CALCULATOR;
