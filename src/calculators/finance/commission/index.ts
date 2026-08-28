import { CalculatorModuleDefinition } from "../../types";
import { calculateSimpleCommission } from "@/lib/calculator-engine/formulas/commission";
import { commissionFaqs } from "./faq";

export const COMMISSION_CALCULATOR: CalculatorModuleDefinition = {
  id: "commission",
  title: "Commission Calculator – Sales Commission, Tiered Pay & Real Estate Split Guide",
  slug: "commission-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Calculate sales commission, commission rates, tiered payouts, real estate agent splits, base salary plus commission, and the sales needed to reach an earnings goal.",
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
  faqs: commissionFaqs,
  relatedCalculators: [
    "salary",
    "take-home-pay",
    "margin",
    "discount",
    "sales-tax",
    "income-tax",
    "roi",
    "payback-period",
  ],
  inputs: [
    { name: "salesPrice", label: "Total Sales Revenue ($)", type: "currency", defaultValue: 200000, unit: "$", min: 0, max: 100000000, step: 1000 },
    { name: "commissionRate", label: "Commission Rate (%)", type: "percentage", defaultValue: 3.0, unit: "%", min: 0, max: 100, step: 0.25 },
  ],
  outputs: [
    { name: "commissionAmount", label: "Commission Earned", format: "currency", highlight: true },
    { name: "companyNetRevenue", label: "Company Net Revenue", format: "currency", highlight: true },
  ],
  calculate: (inputs) => {
    const res = calculateSimpleCommission({
      salesPrice: Number(inputs.salesPrice !== undefined && inputs.salesPrice !== "" ? inputs.salesPrice : 200000),
      commissionRate: Number(inputs.commissionRate !== undefined && inputs.commissionRate !== "" ? inputs.commissionRate : 3.0),
    });

    return {
      commissionAmount: res.commissionAmount,
      companyNetRevenue: res.companyNetRevenue,
    };
  },
};

export default COMMISSION_CALCULATOR;
