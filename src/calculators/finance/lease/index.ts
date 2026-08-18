import { CalculatorModuleDefinition } from "../../types";
import { calculateLeaseFixedRate } from "@/lib/calculator-engine/formulas/lease";

export const LEASE_CALCULATOR: CalculatorModuleDefinition = {
  id: "lease",
  title: "Lease Calculator",
  slug: "lease-calculator",
  category: "Finance",
  subcategory: "Auto & Equipment",
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
  faqs: [
    {
      question: "What is a lease and how does it work?",
      answer:
        "A lease is a contract where the asset owner (lessor) grants a lessee the right to use an asset for a set term in exchange for periodic payments. Rather than buying the whole asset, you finance only the asset's depreciation plus finance rent charges.",
    },
    {
      question: "How is a monthly lease payment calculated?",
      answer:
        "Monthly payment = Monthly Depreciation [(Net Cap Cost - Residual) / Term] + Monthly Rent Charge [(Net Cap Cost + Residual) × Money Factor] + Monthly Sales Tax.",
    },
    {
      question: "What is Money Factor and how do I convert it to APR?",
      answer:
        "Money Factor (or lease factor) is the fractional interest rate used on leases. Multiply Money Factor by 2,400 to get the equivalent APR (e.g., 0.0025 × 2,400 = 6.0% APR).",
    },
    {
      question: "What is Residual Value?",
      answer:
        "Residual value is the predetermined wholesale value of the asset at the end of the lease. A higher residual value means lower monthly depreciation and lower monthly lease payments.",
    },
  ],
  inputs: [
    {
      id: "assetValue",
      label: "Asset Value ($)",
      type: "currency",
      defaultValue: 20000,
      min: 0,
      max: 10000000,
      step: 100,
    },
    {
      id: "residualValue",
      label: "Residual Value ($)",
      type: "currency",
      defaultValue: 8000,
      min: 0,
      max: 10000000,
      step: 100,
    },
    {
      id: "leaseTermMonths",
      label: "Lease Term (Months)",
      type: "number",
      defaultValue: 36,
      min: 1,
      max: 360,
      step: 1,
    },
    {
      id: "interestRatePct",
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
      id: "monthlyTotalPayment",
      label: "Monthly Payment",
      type: "currency",
    },
    {
      id: "totalMonthlyPayments",
      label: "Total of Monthly Payments",
      type: "currency",
    },
    {
      id: "totalDepreciation",
      label: "Total Depreciation",
      type: "currency",
    },
    {
      id: "totalFinanceCharges",
      label: "Total Interest / Rent Charges",
      type: "currency",
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
