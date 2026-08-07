import { CalculatorModuleDefinition } from "../../types";

export const AUTO_LEASE_CALCULATOR: CalculatorModuleDefinition = {
  id: "auto-lease",
  title: "Auto Lease Calculator",
  slug: "auto-lease-calculator",
  category: "Finance",
  subcategory: "Auto",
  description: "Calculate monthly car lease payments based on MSRP, negotiated price, residual value, and money factor.",
  iconName: "Car",
  featured: false,
  tags: ["auto lease", "car lease", "lease payment", "money factor"],
  formulaDescription: "Monthly Lease Payment = Monthly Depreciation + Monthly Finance Charge + Monthly Tax.",
  faqs: [
    {
      question: "What is Money Factor in a car lease?",
      answer: "Money factor is the interest rate representation in a lease. Multiply money factor by 2,400 to convert it to an equivalent APR.",
    },
  ],
  inputs: [
    { name: "vehicleMsrp", label: "Vehicle MSRP", type: "currency", defaultValue: 35000, unit: "$", min: 5000, max: 200000, step: 1000 },
    { name: "negotiatedPrice", label: "Negotiated Price (Cap Cost)", type: "currency", defaultValue: 33000, unit: "$", min: 5000, max: 200000, step: 1000 },
    { name: "downPayment", label: "Down Payment / Trade-in", type: "currency", defaultValue: 3000, unit: "$", min: 0, max: 50000, step: 500 },
    { name: "leaseTermMonths", label: "Lease Term", type: "slider", defaultValue: 36, unit: "months", min: 12, max: 60, step: 6 },
    { name: "residualPercent", label: "Residual Value %", type: "percentage", defaultValue: 55, unit: "%", min: 10, max: 90, step: 1 },
    { name: "moneyFactor", label: "Money Factor (e.g. 0.0025)", type: "number", defaultValue: 0.0025, min: 0.0001, max: 0.01, step: 0.0001 },
    { name: "salesTaxRate", label: "Sales Tax Rate", type: "percentage", defaultValue: 7.0, unit: "%", min: 0, max: 15, step: 0.1 },
  ],
  outputs: [
    { name: "monthlyLeasePayment", label: "Total Monthly Lease", format: "currency", highlight: true },
    { name: "monthlyDepreciation", label: "Monthly Depreciation", format: "currency" },
    { name: "monthlyFinanceFee", label: "Monthly Finance Charge", format: "currency" },
    { name: "totalLeaseCost", label: "Total Cost of Lease", format: "currency" },
  ],
  calculate: (inputs) => {
    const capCost = Number(inputs.negotiatedPrice || 33000) - Number(inputs.downPayment || 3000);
    const msrp = Number(inputs.vehicleMsrp || 35000);
    const residual = msrp * (Number(inputs.residualPercent || 55) / 100);
    const months = Number(inputs.leaseTermMonths || 36);
    const mf = Number(inputs.moneyFactor || 0.0025);
    const taxRate = Number(inputs.salesTaxRate || 7.0) / 100;

    const monthlyDep = (capCost - residual) / months;
    const monthlyFin = (capCost + residual) * mf;
    const subtotal = monthlyDep + monthlyFin;
    const monthlyTax = subtotal * taxRate;
    const totalMonthly = subtotal + monthlyTax;
    const totalCost = (totalMonthly * months) + Number(inputs.downPayment || 3000);

    return {
      monthlyLeasePayment: Number(totalMonthly.toFixed(2)),
      monthlyDepreciation: Number(monthlyDep.toFixed(2)),
      monthlyFinanceFee: Number(monthlyFin.toFixed(2)),
      totalLeaseCost: Number(totalCost.toFixed(2)),
    };
  },
};

export default AUTO_LEASE_CALCULATOR;
