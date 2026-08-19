import { CalculatorModuleDefinition } from "../../types";
import { calculateSimpleCommission } from "@/lib/calculator-engine/formulas/commission";

export const COMMISSION_CALCULATOR: CalculatorModuleDefinition = {
  id: "commission",
  title: "Commission Calculator – Tiered & Sales Compensation Suite",
  slug: "commission-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Free Commission Calculator. Calculate sales commission payout, 3-way missing solvers, base salary plus commission, graduated tiered brackets, real estate splits, and target sales goal planners.",
  iconName: "Briefcase",
  featured: true,
  tags: [
    "commission",
    "commission calculator",
    "sales commission",
    "tiered commission",
    "real estate commission split",
    "sales compensation",
  ],
  formulaDescription:
    "Simple Commission = Sales Price × (Commission Rate / 100). Tiered Commission = ∑ [ (Tier Upper - Tier Lower) × Tier Rate ]. Total Earnings = Base Salary + Total Commission.",
  faqs: [
    {
      question: "How is a tiered commission calculated?",
      answer:
        "In a graduated tiered commission structure, sales revenue is divided into bracket ranges. A specific percentage rate applies only to the portion of sales falling within each bracket range. For example, $27,000 in sales with 3% on $0–$20k, 5% on $20k–$25k, and 10% on $25k+ yields ($20,000 × 3%) + ($5,000 × 5%) + ($2,000 × 10%) = $1,050 total commission.",
    },
    {
      question: "How do real estate agent commission splits work?",
      answer:
        "In real estate, a total commission (e.g. 6%) is typically divided 50/50 between the listing broker and buyer's broker (3% each). Each agent then splits their share with their sponsoring brokerage based on their agreed split (e.g. 80% to agent, 20% to broker).",
    },
  ],
  inputs: [
    { name: "salesPrice", label: "Total Sales Revenue ($)", type: "currency", defaultValue: 200000, unit: "$", min: 100, max: 100000000, step: 1000 },
    { name: "commissionRate", label: "Commission Rate (%)", type: "percentage", defaultValue: 3.0, unit: "%", min: 0.1, max: 100, step: 0.25 },
  ],
  outputs: [
    { name: "commissionAmount", label: "Commission Earned", format: "currency", highlight: true },
    { name: "companyNetRevenue", label: "Company Net Revenue", format: "currency", highlight: true },
  ],
  calculate: (inputs) => {
    const res = calculateSimpleCommission({
      salesPrice: Number(inputs.salesPrice || 200000),
      commissionRate: Number(inputs.commissionRate || 3.0),
    });

    return {
      commissionAmount: res.commissionAmount,
      companyNetRevenue: res.companyNetRevenue,
    };
  },
};

export default COMMISSION_CALCULATOR;
