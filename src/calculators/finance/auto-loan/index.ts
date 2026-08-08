import { CalculatorModuleDefinition } from "../../types";
import { calculateAutoLoanFormula } from "@/lib/calculator-engine/formulas/auto-loan";

export const AUTO_LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "auto-loan",
  title: "Auto Loan Calculator",
  slug: "auto-loan-calculator",
  category: "Finance",
  subcategory: "Auto",
  description:
    "Calculate monthly payments, net loan cost, interest, trade-in equity, negative equity rollover, state taxes, dealer fees, and vehicle affordability.",
  iconName: "Car",
  featured: true,
  tags: [
    "auto loan",
    "car payment calculator",
    "vehicle financing",
    "trade-in value",
    "negative equity",
    "sales tax",
    "car affordability",
  ],
  formulaDescription:
    "Loan Amount = Vehicle Price - Down Payment - Trade-In Equity + Negative Equity Rollover + Taxes & Fees; Monthly Payment = Loan Amount × [r(1 + r)^n] / [(1 + r)^n - 1]",
  faqs: [
    {
      question: "How is an auto loan monthly payment calculated?",
      answer:
        "Monthly auto loan payments are calculated using the principal loan amount (vehicle price minus down payment and net trade-in equity, plus taxes and fees), the annual interest rate (APR divided by 12), and the total loan term in months.",
    },
    {
      question: "Does trade-in value reduce sales tax on a car purchase?",
      answer:
        "In 42 US states, trade-in value is deducted from the vehicle price before calculating sales tax. However, states like California, Hawaii, Kentucky, Maryland, Michigan, Montana, Virginia, and Washington D.C. do not allow trade-in tax credits.",
    },
    {
      question: "What happens if I owe more on my trade-in than it is worth?",
      answer:
        "If your remaining loan balance exceeds your trade-in allowance, you have negative equity (being 'underwater'). Dealers often allow you to roll over this negative balance into your new auto loan, which increases your new loan amount and monthly payment.",
    },
    {
      question: "What is a good down payment percentage for an auto loan?",
      answer:
        "Financial advisors recommend putting down at least 20% on new cars and 10% on used cars. A healthy down payment prevents you from going underwater due to initial vehicle depreciation.",
    },
    {
      question: "What auto loan term length should I choose?",
      answer:
        "Standard terms are 36, 48, 60, 72, or 84 months. 60 months (5 years) is the optimal balance between affordable monthly payments and total interest paid. Terms of 72 or 84 months carry higher interest costs and increase underwater risk.",
    },
    {
      question: "Should I include taxes and fees in my auto loan?",
      answer:
        "Paying taxes, documentation fees, and registration fees upfront with cash avoids paying monthly interest on them over your loan term, saving you money.",
    },
    {
      question: "How much of my income should go toward a car payment?",
      answer:
        "The 20/4/10 rule suggests spending no more than 10% of your gross monthly income on your vehicle payment, making a 20% down payment, and capping the loan term at 4 years (48 months).",
    },
    {
      question: "What fees are included in car financing?",
      answer:
        "Common fees include state title & registration fees, dealer documentation fees, destination charges, local sales taxes, and optional extended warranty charges.",
    },
    {
      question: "How does an extra monthly payment help my car loan?",
      answer:
        "Making extra principal payments shortens your loan payoff duration and directly reduces total interest expense without any prepayment penalty on standard auto loans.",
    },
    {
      question: "What credit score is needed for a 0% APR auto loan?",
      answer:
        "0% APR promotional financing from captive auto lenders usually requires top-tier credit scores (740+ FICO) and applies only to specific new vehicle models.",
    },
    {
      question: "Can I refinance my auto loan later?",
      answer:
        "Yes, if interest rates drop or your credit score improves, refinancing your auto loan can lower your APR and monthly payment.",
    },
    {
      question: "What is Loan-to-Value (LTV) ratio in car loans?",
      answer:
        "LTV is the ratio of your loan amount to the vehicle's market value. Lenders prefer LTVs under 100%. LTVs over 120% increase interest rates or require GAP insurance.",
    },
    {
      question: "What is GAP insurance and do I need it?",
      answer:
        "Guaranteed Asset Protection (GAP) insurance covers the financial gap between what your insurance pays if your vehicle is totaled and what you owe on your loan.",
    },
    {
      question: "Is dealer financing better than bank or credit union financing?",
      answer:
        "Credit unions often offer lower baseline auto loan interest rates. Obtaining a pre-approval from a credit union gives you leverage when negotiating dealer financing.",
    },
    {
      question: "How does vehicle price affect total loan interest?",
      answer:
        "Higher purchase prices lead to larger loan balances, which compounds total interest exponentially, especially on 72-month or 84-month loan terms.",
    },
  ],
  inputs: [
    {
      name: "vehiclePrice",
      label: "Vehicle Price",
      type: "currency",
      defaultValue: 35000,
      unit: "$",
      min: 1000,
      max: 500000,
      step: 500,
      tooltip: "Sticker price or negotiated price of the vehicle",
    },
    {
      name: "downPayment",
      label: "Down Payment",
      type: "currency",
      defaultValue: 5000,
      unit: "$",
      min: 0,
      max: 200000,
      step: 250,
      tooltip: "Upfront cash paid towards the purchase",
    },
    {
      name: "tradeInValue",
      label: "Trade-In Value",
      type: "currency",
      defaultValue: 3000,
      unit: "$",
      min: 0,
      max: 100000,
      step: 250,
      tooltip: "Allowance value offered for your trade-in vehicle",
    },
    {
      name: "amountOwedOnTradeIn",
      label: "Amount Owed On Trade-In",
      type: "currency",
      defaultValue: 0,
      unit: "$",
      min: 0,
      max: 100000,
      step: 250,
      tooltip: "Remaining loan balance on your trade-in vehicle",
    },
    {
      name: "interestRate",
      label: "Interest Rate (APR)",
      type: "percentage",
      defaultValue: 5.9,
      unit: "%",
      min: 0,
      max: 30,
      step: 0.1,
      tooltip: "Annual interest rate on the auto loan",
    },
    {
      name: "loanTermMonths",
      label: "Loan Term",
      type: "slider",
      defaultValue: 60,
      unit: "months",
      min: 12,
      max: 96,
      step: 6,
      tooltip: "Duration of the auto loan in months",
    },
    {
      name: "salesTaxRate",
      label: "Sales Tax Rate",
      type: "percentage",
      defaultValue: 6.0,
      unit: "%",
      min: 0,
      max: 15,
      step: 0.1,
      tooltip: "Combined state and local sales tax rate percentage",
    },
    {
      name: "registrationFees",
      label: "Registration & Title Fees",
      type: "currency",
      defaultValue: 300,
      unit: "$",
      min: 0,
      max: 5000,
      step: 50,
      tooltip: "State motor vehicle registration and title transfer fees",
    },
    {
      name: "dealerFees",
      label: "Dealer Documentation Fees",
      type: "currency",
      defaultValue: 250,
      unit: "$",
      min: 0,
      max: 3000,
      step: 25,
      tooltip: "Dealer processing and documentation fee",
    },
  ],
  outputs: [
    {
      name: "monthlyPayment",
      label: "Monthly Payment",
      format: "currency",
      highlight: true,
      description: "Estimated monthly principal and interest loan payment",
    },
    {
      name: "loanAmount",
      label: "Total Loan Financed",
      format: "currency",
      description: "Net financed loan principal",
    },
    {
      name: "totalInterestPaid",
      label: "Total Interest Paid",
      format: "currency",
      description: "Total interest paid over the life of the loan",
    },
    {
      name: "totalSalesTax",
      label: "Total Sales Tax",
      format: "currency",
      description: "Calculated vehicle sales tax",
    },
    {
      name: "totalOutofPocketCost",
      label: "Total Out-of-Pocket Cost",
      format: "currency",
      description: "Combined total of down payment, fees, trade-in equity, and all loan payments",
    },
  ],
  calculate: (inputs) => {
    const res = calculateAutoLoanFormula({
      vehiclePrice: Number(inputs.vehiclePrice || 35000),
      downPayment: Number(inputs.downPayment || 5000),
      tradeInValue: Number(inputs.tradeInValue || 3000),
      amountOwedOnTradeIn: Number(inputs.amountOwedOnTradeIn || 0),
      salesTaxRate: Number(inputs.salesTaxRate || 6),
      registrationFees: Number(inputs.registrationFees || 300),
      dealerFees: Number(inputs.dealerFees || 250),
      interestRate: Number(inputs.interestRate || 5.9),
      loanTermMonths: Number(inputs.loanTermMonths || 60),
    });
    return {
      monthlyPayment: res.monthlyPayment,
      loanAmount: res.loanAmount,
      totalInterestPaid: res.totalInterestPaid,
      totalSalesTax: res.totalSalesTax,
      totalFees: res.totalFees,
      totalPayment: res.totalPayment,
      totalOutofPocketCost: res.totalOutofPocketCost,
    };
  },
};

export default AUTO_LOAN_CALCULATOR;
