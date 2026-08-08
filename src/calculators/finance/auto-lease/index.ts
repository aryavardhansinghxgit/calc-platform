import { CalculatorModuleDefinition } from "../../types";
import { calculateAutoLeaseFormula } from "@/lib/calculator-engine/formulas/auto-lease";

export const AUTO_LEASE_CALCULATOR: CalculatorModuleDefinition = {
  id: "auto-lease",
  title: "Auto Lease Calculator",
  slug: "auto-lease-calculator",
  category: "Finance",
  subcategory: "Auto",
  description:
    "Estimate monthly lease payments, total lease cost, depreciation charges, finance charges (money factor), taxes, mileage penalties, and compare leasing vs buying.",
  iconName: "Car",
  featured: true,
  tags: [
    "auto lease",
    "car lease calculator",
    "money factor",
    "residual value",
    "lease vs buy",
    "capitalized cost",
    "mileage penalty",
  ],
  formulaDescription:
    "Monthly Lease Payment = Monthly Depreciation [(Net Cap Cost - Residual) / Term] + Monthly Rent Charge [(Net Cap Cost + Residual) × Money Factor] + Monthly Tax",
  faqs: [
    {
      question: "What is Money Factor in an auto lease and how is it converted to APR?",
      answer:
        "Money Factor (also known as the rent charge or lease factor) is the fractional interest rate applied by lessors. To convert Money Factor to an equivalent APR percentage, multiply by 2,400 (e.g., 0.0025 Money Factor × 2,400 = 6.0% APR). Conversely, divide APR by 2,400 to get Money Factor.",
    },
    {
      question: "How is a monthly auto lease payment calculated?",
      answer:
        "A monthly lease payment consists of three parts: 1) Depreciation Charge = (Net Cap Cost - Residual Value) / Lease Term; 2) Finance/Rent Charge = (Net Cap Cost + Residual Value) × Money Factor; and 3) Monthly Sales Tax = (Depreciation + Rent Charge) × Local Sales Tax Rate.",
    },
    {
      question: "What is Residual Value and how does it affect lease payments?",
      answer:
        "Residual value is the estimated wholesale market value of the vehicle at the end of the lease term (usually expressed as a percentage of MSRP). A higher residual value means you pay for less depreciation, resulting in lower monthly lease payments.",
    },
    {
      question: "What is Capitalized Cost (Cap Cost)?",
      answer:
        "Gross Capitalized Cost is the agreed-upon vehicle price plus any rolled-over fees or negative trade-in equity. Adjusted (Net) Capitalized Cost equals Gross Cap Cost minus down payments, trade-in equity, and manufacturer lease rebates.",
    },
    {
      question: "What happens if I exceed the annual lease mileage limit?",
      answer:
        "Most auto leases specify an annual mileage allowance (e.g. 10,000, 12,000, or 15,000 miles/yr). Exceeding this limit incurs an excess mileage fee at lease return, typically between $0.15 and $0.30 per excess mile.",
    },
    {
      question: "Is it better to lease or buy a car?",
      answer:
        "Leasing offers lower monthly payments and warranty coverage for new cars every 3 years, but leaves you with zero ownership equity at term end. Buying requires higher monthly payments but builds vehicle asset equity that you own free and clear once paid off.",
    },
    {
      question: "Should I make a large down payment on a car lease?",
      answer:
        "Financial experts advise making $0 or minimal down payment on a lease. If the leased vehicle is totaled or stolen shortly after driving off the lot, insurance pays the lessor, but your upfront down payment cash is lost forever.",
    },
    {
      question: "Can I buy the leased car at the end of the lease?",
      answer:
        "Yes, almost all lease contracts contain a Purchase Option Clause allowing you to purchase the vehicle at the predetermined Residual Value price plus any lease disposition or purchase option fees.",
    },
    {
      question: "Can I negotiate a car lease price (Capitalized Cost)?",
      answer:
        "Yes! The vehicle selling price (Capitalized Cost) is fully negotiable just like buying a car. Lowering the agreed-upon vehicle price directly reduces your monthly depreciation charge.",
    },
    {
      question: "What is a lease acquisition fee and disposition fee?",
      answer:
        "The acquisition fee (usually $595–$995) is charged by the financing bank to originate the lease. The disposition fee (usually $350–$495) covers bank reconditioning and auction costs when you return the vehicle at lease end.",
    },
    {
      question: "What is the difference between normal and excess wear and tear?",
      answer:
        "Normal wear and tear includes minor scuffs, light tire tread wear, and small door dings under 2 inches. Excess wear includes deep scratches, cracked glass, torn seats, bald tires, or mechanical damage, which incur penalties upon vehicle return.",
    },
    {
      question: "Can I terminate an auto lease early?",
      answer:
        "Early lease termination carries heavy penalty fees. Common alternatives include lease transfers (via services like Swapalease), dealer lease buyouts, or trading in the leased car for a new vehicle.",
    },
    {
      question: "How is sales tax calculated on a leased car?",
      answer:
        "In most US states, sales tax is applied only to the monthly lease payment. However, states like Texas, Illinois, and Virginia charge sales tax on the full vehicle purchase price upfront.",
    },
    {
      question: "What is Lease Gap Insurance and is it required?",
      answer:
        "GAP insurance covers the financial difference between what your auto insurance pays if the car is totaled and what you still owe on the lease. Most captive lease contracts (e.g. Honda Financial, Toyota Financial) automatically include GAP insurance.",
    },
    {
      question: "How do manufacturer lease cash rebates work?",
      answer:
        "Lease cash rebates are factory incentives applied directly to reduce the Capitalized Cost of the lease, lowering your monthly depreciation charge without requiring out-of-pocket cash.",
    },
  ],
  inputs: [
    {
      name: "autoPrice",
      label: "Vehicle Negotiated Price (Cap Cost)",
      type: "currency",
      defaultValue: 35000,
      unit: "$",
      min: 5000,
      max: 300000,
      step: 500,
      tooltip: "Negotiated selling price of the leased vehicle",
    },
    {
      name: "vehicleMsrp",
      label: "Vehicle MSRP Sticker Price",
      type: "currency",
      defaultValue: 36000,
      unit: "$",
      min: 5000,
      max: 300000,
      step: 500,
      tooltip: "Manufacturer Suggested Retail Price (used for residual value %)",
    },
    {
      name: "downPayment",
      label: "Down Payment / Cap Reduction",
      type: "currency",
      defaultValue: 2500,
      unit: "$",
      min: 0,
      max: 50000,
      step: 250,
      tooltip: "Upfront cash payment to reduce capitalized cost",
    },
    {
      name: "tradeInValue",
      label: "Trade-In Value",
      type: "currency",
      defaultValue: 2000,
      unit: "$",
      min: 0,
      max: 100000,
      step: 250,
      tooltip: "Allowance offered for your trade-in vehicle",
    },
    {
      name: "leaseTermMonths",
      label: "Lease Term Duration",
      type: "slider",
      defaultValue: 36,
      unit: "months",
      min: 12,
      max: 60,
      step: 6,
      tooltip: "Duration of the auto lease in months",
    },
    {
      name: "residualPercent",
      label: "Residual Value %",
      type: "percentage",
      defaultValue: 55,
      unit: "%",
      min: 10,
      max: 90,
      step: 1,
      tooltip: "Estimated vehicle value at lease end as % of MSRP",
    },
    {
      name: "aprPercent",
      label: "Interest Rate (APR %)",
      type: "percentage",
      defaultValue: 6.0,
      unit: "%",
      min: 0,
      max: 20,
      step: 0.1,
      tooltip: "Annual interest rate (automatically converts to Money Factor)",
    },
    {
      name: "moneyFactor",
      label: "Money Factor (e.g. 0.0025)",
      type: "number",
      defaultValue: 0.0025,
      min: 0.0001,
      max: 0.01,
      step: 0.0001,
      tooltip: "Lease finance charge factor (APR / 2400)",
    },
    {
      name: "salesTaxRate",
      label: "Sales Tax Rate",
      type: "percentage",
      defaultValue: 7.0,
      unit: "%",
      min: 0,
      max: 15,
      step: 0.1,
      tooltip: "Combined state and local sales tax percentage",
    },
  ],
  outputs: [
    {
      name: "monthlyLeasePayment",
      label: "Total Monthly Lease Payment",
      format: "currency",
      highlight: true,
      description: "Estimated total monthly payment including depreciation, rent fee, and tax",
    },
    {
      name: "monthlyDepreciation",
      label: "Monthly Depreciation",
      format: "currency",
      description: "Monthly vehicle value decline portion",
    },
    {
      name: "monthlyFinanceFee",
      label: "Monthly Rent Charge (Finance Fee)",
      format: "currency",
      description: "Monthly financing fee paid to the lessor",
    },
    {
      name: "totalLeaseCost",
      label: "Total Out-of-Pocket Lease Cost",
      format: "currency",
      description: "Combined total of down payment, fees, and all monthly payments",
    },
    {
      name: "residualValue",
      label: "Lease-End Purchase Price (Residual Value)",
      format: "currency",
      description: "Contracted purchase buyout price at lease end",
    },
  ],
  calculate: (inputs) => {
    const res = calculateAutoLeaseFormula({
      autoPrice: Number(inputs.autoPrice || 35000),
      vehicleMsrp: Number(inputs.vehicleMsrp || 36000),
      downPayment: Number(inputs.downPayment || 2500),
      tradeInValue: Number(inputs.tradeInValue || 2000),
      leaseTermMonths: Number(inputs.leaseTermMonths || 36),
      residualPercent: Number(inputs.residualPercent || 55),
      aprPercent: Number(inputs.aprPercent || 6.0),
      moneyFactor: Number(inputs.moneyFactor || 0.0025),
      salesTaxRate: Number(inputs.salesTaxRate || 7.0),
    });
    return {
      monthlyLeasePayment: res.monthlyLeasePayment,
      monthlyDepreciation: res.monthlyDepreciation,
      monthlyFinanceFee: res.monthlyFinanceFee,
      totalLeaseCost: res.totalLeaseCost,
      residualValue: res.residualValue,
    };
  },
};

export default AUTO_LEASE_CALCULATOR;
