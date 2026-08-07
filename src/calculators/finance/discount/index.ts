import { CalculatorModuleDefinition } from "../../types";

export const DISCOUNT_CALCULATOR: CalculatorModuleDefinition = {
  id: "discount",
  title: "Discount Calculator",
  slug: "discount-calculator",
  category: "Finance",
  subcategory: "Business",
  description: "Calculate final sale price after percentage discounts and calculate total money saved.",
  iconName: "Tag",
  featured: false,
  tags: ["discount", "sale price", "savings", "coupon", "shopping"],
  formulaDescription: "Savings = Original Price × (Discount % / 100). Final Price = Original Price - Savings.",
  faqs: [
    {
      question: "How do double discounts work?",
      answer: "A double discount (e.g. 20% off plus an extra 10% off) is calculated sequentially: 20% off the original price, then 10% off the reduced price.",
    },
  ],
  inputs: [
    { name: "originalPrice", label: "Original Price", type: "currency", defaultValue: 120, unit: "$", min: 0.1, max: 100000, step: 5 },
    { name: "discountPercent", label: "Discount Percentage", type: "percentage", defaultValue: 25, unit: "%", min: 0, max: 99, step: 1 },
  ],
  outputs: [
    { name: "finalPrice", label: "Final Sale Price", format: "currency", highlight: true },
    { name: "amountSaved", label: "Total Amount Saved", format: "currency", highlight: true },
  ],
  calculate: (inputs) => {
    const orig = Number(inputs.originalPrice || 120);
    const discRate = Number(inputs.discountPercent || 25) / 100;

    const saved = orig * discRate;
    const finalPrice = orig - saved;

    return {
      finalPrice: Number(finalPrice.toFixed(2)),
      amountSaved: Number(saved.toFixed(2)),
    };
  },
};

export default DISCOUNT_CALCULATOR;
