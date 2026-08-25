import { CalculatorModuleDefinition } from "../../types";
import { calculateLeaseFixedRate } from "@/lib/calculator-engine/formulas/lease";
import { leaseFaqs } from "./faq";

export const LEASE_CALCULATOR: CalculatorModuleDefinition = {
  id: "lease",
  title: "Lease Calculator",
  slug: "lease-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Calculate monthly lease payments, total lease cost, effective interest rate, depreciation charges, money factor, and compare leasing vs buying for vehicles, equipment, and property.",
  iconName: "Car",
  featured: true,
  tags: [
    "lease calculator",
    "auto lease calculator",
    "equipment lease calculator",
    "money factor to apr",
    "residual value",
    "lease vs buy",
    "fixed rate lease",
    "fixed pay solver",
  ],
  formulaDescription:
    "Monthly Lease Payment = Monthly Depreciation [(Asset Value - Residual) / Term] + Monthly Rent Charge [(Asset Value + Residual) × Money Factor] + Monthly Sales Tax",
  faqs: leaseFaqs,
  inputs: [
    {
      name: "assetValue",
      label: "Asset Value ($)",
      type: "currency",
      defaultValue: 20000,
      min: 0,
      max: 10000000,
      step: 100,
    },
    {
      name: "residualValue",
      label: "Residual Value ($)",
      type: "currency",
      defaultValue: 8000,
      min: 0,
      max: 10000000,
      step: 100,
    },
    {
      name: "leaseTermMonths",
      label: "Lease Term (Months)",
      type: "number",
      defaultValue: 36,
      min: 1,
      max: 360,
      step: 1,
    },
    {
      name: "interestRatePct",
      label: "Interest Rate / APR (%)",
      type: "percentage",
      defaultValue: 6.0,
      min: 0,
      max: 50,
      step: 0.1,
    },
  ],
  outputs: [
    {
      name: "monthlyTotalPayment",
      label: "Monthly Payment",
      format: "currency",
    },
    {
      name: "totalMonthlyPayments",
      label: "Total of Monthly Payments",
      format: "currency",
    },
    {
      name: "totalDepreciation",
      label: "Total Depreciation",
      format: "currency",
    },
    {
      name: "totalFinanceCharges",
      label: "Total Interest / Rent Charges",
      format: "currency",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const res = calculateLeaseFixedRate({
      assetValue: Number(inputs.assetValue) || 20000,
      residualValue: Number(inputs.residualValue) || 8000,
      leaseTermMonths: Number(inputs.leaseTermMonths) || 36,
      interestRatePct: Number(inputs.interestRatePct) || 6.0,
      downPayment: Number(inputs.downPayment) || 0,
      salesTaxRatePct: Number(inputs.salesTaxRatePct) || 0,
    });

    return {
      monthlyTotalPayment: res.monthlyTotalPayment,
      totalMonthlyPayments: res.totalMonthlyPayments,
      totalDepreciation: res.totalDepreciation,
      totalFinanceCharges: res.totalFinanceCharges,
    };
  },
};
