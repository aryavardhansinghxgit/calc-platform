import { CalculatorModuleDefinition } from "../../types";
import { calculateIncomeTax } from "@/lib/calculator-engine/formulas/income-tax";

export const INCOME_TAX_CALCULATOR: CalculatorModuleDefinition = {
  id: "income-tax",
  title: "Income Tax Calculator – U.S. Federal Tax & Refund Estimator",
  slug: "income-tax-calculator",
  category: "Finance",
  subcategory: "Tax and Salary",
  description:
    "Calculate your 2026 & 2025 US federal income tax liability, refund check, tax brackets, Child Tax Credit, standard vs. itemized deductions, and Form 1040 lines.",
  iconName: "FileText",
  featured: true,
  tags: [
    "income tax calculator",
    "2026 income tax calculator",
    "2025 income tax calculator",
    "federal income tax calculator",
    "tax refund calculator",
    "federal tax brackets 2026",
    "standard deduction 2026",
    "child tax credit 2026",
    "marginal vs effective tax rate",
    "form 1040 tax estimator",
  ],
  formulaDescription:
    "Calculates progressive federal income tax liability based on 2026 & 2025 IRS bracket thresholds, standard vs. itemized deductions, and refundable tax credits.",
  faqs: [
    {
      question: "How does the U.S. progressive income tax bracket system work?",
      answer:
        "The federal income tax system divides your taxable income into tiers (brackets), taxing each portion at progressively higher statutory rates (10%, 12%, 22%, 24%, 32%, 35%, 37%). Entering a higher bracket does not tax your entire income at that higher rate; only the specific dollars falling within that higher bracket range are taxed at the higher marginal rate.",
    },
    {
      question: "What is the Standard Deduction for 2026?",
      answer:
        "Under IRS Revenue Procedure 2025-32, the standard deduction for Tax Year 2026 is $16,100 for Single filers and Married Filing Separately, $32,200 for Married Filing Jointly and Qualifying Surviving Spouses, and $24,150 for Head of Household.",
    },
    {
      question: "What is the Standard Deduction for 2025?",
      answer:
        "Under IRS Revenue Procedure 2024-40 and current enacted statutes, the standard deduction for Tax Year 2025 is $15,750 for Single filers and Married Filing Separately, $31,500 for Married Filing Jointly and Qualifying Surviving Spouses, and $23,625 for Head of Household.",
    },
    {
      question: "What is the difference between Marginal Tax Rate and Effective Tax Rate?",
      answer:
        "Your Marginal Tax Rate is the tax percentage applied to your highest dollar of taxable income (your top tax bracket). Your Effective Tax Rate is the actual percentage of your total gross income paid in federal income tax, calculated by this tool as Total Federal Tax Liability divided by Total Gross Income. Because of progressive lower brackets and standard deductions, your effective rate is almost always significantly lower than your marginal rate.",
    },
    {
      question: "Should I claim the Standard Deduction or Itemize Deductions on Schedule A?",
      answer:
        "Taxpayers should claim whichever deduction amount is larger. If the sum of your itemized deductions—including mortgage interest on qualifying debt, State and Local Taxes (SALT capped at $40,400 for 2026 and $40,000 for 2025), charitable donations, and unreimbursed medical expenses exceeding 7.5% of AGI—is greater than your statutory standard deduction, itemizing on Schedule A will lower your taxable income more.",
    },
    {
      question: "How does the Child Tax Credit (CTC) work for 2026?",
      answer:
        "The Child Tax Credit provides up to $2,200 per qualifying child under age 17 at the close of the tax year. Up to $1,700 of the credit is refundable as the Additional Child Tax Credit (ACTC) if earned income exceeds $2,500. The credit phases out at a rate of $50 for each $1,000 of Modified AGI exceeding $400,000 for Married Filing Jointly and $200,000 for all other filing statuses.",
    },
    {
      question: "What is the Credit for Other Dependents (ODC)?",
      answer:
        "The Credit for Other Dependents is a $500 nonrefundable federal tax credit for qualifying dependents age 17 and older, college students, or elderly relatives who do not qualify for the Child Tax Credit. It is subject to the same $200,000 / $400,000 MAGI phaseout thresholds.",
    },
    {
      question: "What is the SALT deduction cap for 2026 and 2025?",
      answer:
        "The State and Local Tax (SALT) deduction limitation allows itemizers to deduct combined state income/sales taxes plus real estate and property taxes up to $40,400 for Tax Year 2026 ($20,200 for Married Filing Separately) and $40,000 for Tax Year 2025 ($20,000 for Married Filing Separately).",
    },
    {
      question: "What additional tax deductions are available to seniors age 65 and older?",
      answer:
        "Taxpayers age 65 and older qualify for both the traditional additional standard deduction ($2,050 for unmarried filers / $1,650 per spouse for married filers in 2026; $2,000 / $1,600 in 2025) and the enacted $6,000 Enhanced Senior Deduction, which phases out at $50 per $1,000 of MAGI above $75,000 for unmarried filers and $150,000 for Married Filing Jointly.",
    },
    {
      question: "What is an Above-the-Line (ATL) deduction?",
      answer:
        "Above-the-line deductions (reported on Form 1040 Schedule 1, Part II) are subtracted directly from gross income to determine Adjusted Gross Income (AGI). Examples include traditional IRA contributions, HSA contributions, 50% of self-employment tax, student loan interest (up to $2,500), and qualified tip and overtime deductions.",
    },
    {
      question: "How is Self-Employment Tax (Schedule SE) calculated?",
      answer:
        "Self-employment tax is assessed at 15.3% (12.4% Social Security up to the wage base of $184,500 for 2026 / $176,100 for 2025, plus 2.9% Medicare with no ceiling) on 92.35% of net profit reported on Schedule C. Taxpayers deduct 50% of their total SE tax as an above-the-line adjustment on Form 1040.",
    },
    {
      question: "How are Long-Term Capital Gains and Qualified Dividends taxed?",
      answer:
        "Net long-term capital gains (assets held longer than one year) and qualified dividends receive preferential federal rates of 0%, 15%, or 20%. Preferential income is stacked on top of ordinary taxable income to determine which rate threshold applies ($49,450 / $545,500 for 2026 Single; $98,900 / $613,700 for 2026 MFJ).",
    },
    {
      question: "How are Short-Term Capital Gains taxed?",
      answer:
        "Short-term capital gains (from assets held one year or less) and non-qualified ordinary dividends do not receive preferential tax treatment and are taxed as ordinary income at standard progressive tax bracket rates (10% to 37%).",
    },
    {
      question: "Why do I owe taxes instead of receiving a tax refund?",
      answer:
        "You owe taxes if the federal income tax withheld from your paychecks (W-2 Box 2) or quarterly estimated tax payments was less than your total calculated federal tax liability on Form 1040 Line 24.",
    },
    {
      question: "Does this calculator include state and local income taxes?",
      answer:
        "The core calculation engine models federal income tax liability. While state and local withholding can be entered as an itemized deduction or prepayment offset, state-specific tax returns require separate calculations based on individual state tax codes.",
    },
    {
      question: "Does this calculator file or submit my tax return to the IRS?",
      answer:
        "No. This calculator is an independent computational model for educational and planning purposes. It does not file, prepare, or submit tax returns to the Internal Revenue Service or state tax departments.",
    },
  ],
  inputs: [
    { name: "wagesW2", label: "W-2 Wages & Salary (Box 1)", type: "currency", defaultValue: 85000, unit: "$", min: 0, max: 5000000, step: 2500 },
    { name: "fedTaxWithheld", label: "Federal Tax Withheld (Box 2)", type: "currency", defaultValue: 9500, unit: "$", min: 0, max: 1000000, step: 500 },
    {
      name: "filingStatus",
      label: "Filing Status",
      type: "select",
      defaultValue: "single",
      options: [
        { label: "Single", value: "single" },
        { label: "Married Filing Jointly", value: "joint" },
        { label: "Married Filing Separately", value: "separately" },
        { label: "Head of Household", value: "head" },
      ],
    },
    { name: "youngDependents", label: "Child Dependents (Age 0-16)", type: "slider", defaultValue: 0, unit: "", min: 0, max: 10, step: 1 },
  ],
  outputs: [
    { name: "netTaxRefundOrOwed", label: "Estimated Tax Refund / Owed", format: "currency", highlight: true },
    { name: "totalTaxLiability", label: "Total Tax Liability", format: "currency", highlight: true },
    { name: "effectiveTaxRate", label: "Effective Tax Rate", format: "percentage" },
    { name: "marginalTaxBracketLabel", label: "Top Marginal Bracket", format: "text" },
  ],
  calculate: (inputs) => {
    const res = calculateIncomeTax({
      taxYear: "2026",
      filingStatus: (inputs.filingStatus as any) || "single",
      wagesW2: Number(inputs.wagesW2 || 85000),
      fedTaxWithheld: Number(inputs.fedTaxWithheld || 9500),
      youngDependents: Number(inputs.youngDependents || 0),
    });

    return {
      netTaxRefundOrOwed: res.netTaxRefundOrOwed,
      totalTaxLiability: res.totalTaxLiability,
      effectiveTaxRate: `${res.effectiveTaxRate}%`,
      marginalTaxBracketLabel: res.marginalTaxBracketLabel,
    };
  },
};

export default INCOME_TAX_CALCULATOR;
