import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTakeHomePay } from "./calculator";
import { TakeHomePayCalculator } from "@/components/calculator/take-home-pay/TakeHomePayCalculator";
import { TakeHomePayContent } from "@/components/calculator/take-home-pay/TakeHomePayContent";

export const take_home_pay_calculatorConfig: CalculatorModuleDefinition = {
  id: "take-home-pay-calculator",
  title: "Take-Home Paycheck Calculator — Estimate Your Net Pay After Taxes",
  slug: "take-home-pay-calculator",
  category: "Finance",
  subcategory: "Tax and Salary",
  description:
    "Calculate your estimated take-home pay from salary or hourly wages after federal tax, Social Security, Medicare, state and local taxes, benefits, retirement contributions, overtime, bonuses, and other deductions.",
  iconName: "Briefcase",
  featured: true,
  keywords: [
    "take home paycheck calculator",
    "paycheck calculator",
    "net pay calculator",
    "salary take home calculator",
    "hourly paycheck calculator",
    "tax withholding calculator",
    "biweekly paycheck calculator",
    "gross to net paycheck calculator",
    "how to calculate take home pay",
    "w4 paycheck calculator",
    "state paycheck tax calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "salary-calculator",
    "income-tax-calculator",
    "marriage-tax-calculator",
    "budget-calculator",
    "401k-calculator",
    "estate-tax-calculator",
  ],
  formulaDescription:
    "Net Paycheck = Gross Pay - Pre-Tax Deductions - Federal Tax - FICA Taxes - State/Local Taxes - Post-Tax Deductions",
  faqs: [
    {
      question: "How is take-home pay calculated?",
      answer:
        "Take-home pay is the amount remaining after the payroll model subtracts applicable pre-tax deductions, federal income-tax withholding, Social Security, Medicare, state and local taxes, and post-tax deductions from gross pay. The exact order and tax treatment can vary by deduction and payroll arrangement. A paycheck calculator estimates these components using the assumptions entered, while an employer's payroll system remains the authority for an actual paycheck.",
    },
    {
      question: "What is the difference between gross pay and net pay?",
      answer:
        "Gross pay is the amount earned before payroll deductions and withholding. Net pay, or take-home pay, is the amount left after the modeled deductions and taxes. For example, a $3,076.92 biweekly gross paycheck can produce a materially smaller net paycheck once taxes and benefits are applied.",
    },
    {
      question: "Why is my paycheck lower than my salary?",
      answer:
        "Annual salary is not the same thing as annual take-home pay. Salary is gross compensation. Your paycheck can be lower because of federal withholding, Social Security, Medicare, state or local taxes, retirement contributions, health insurance, HSA/FSA contributions, and other deductions.",
    },
    {
      question: "How do federal taxes affect take-home pay?",
      answer:
        "Federal income-tax withholding reduces each paycheck based on the employee's wages, payroll period, filing status, and relevant Form W-4 information. Federal withholding is a payroll collection mechanism and is not necessarily equal to your final annual federal tax liability.",
    },
    {
      question: "What is FICA?",
      answer:
        "FICA refers to the Federal Insurance Contributions Act taxes for Social Security and Medicare. For 2026, the employee Social Security rate is 6.2% on covered wages up to the $184,500 wage base, while Medicare is 1.45% with no wage-base limit under the standard employee rules. Additional Medicare withholding can apply at higher wages.",
    },
    {
      question: "What is the difference between pre-tax and post-tax deductions?",
      answer:
        "A pre-tax deduction may reduce the wage base used for certain payroll taxes depending on the specific benefit. A post-tax deduction generally comes out after the relevant taxes have been calculated. The actual treatment depends on the benefit and payroll arrangement, so the calculator should be used according to the assumptions that apply to the employer's plan.",
    },
    {
      question: "How does a 401(k) affect take-home pay?",
      answer:
        "A traditional pre-tax 401(k) contribution can reduce current taxable wages for applicable federal income-tax purposes, so a $500 contribution does not necessarily reduce take-home pay by exactly $500. A Roth contribution generally has different tax treatment because it is funded with after-tax dollars. The calculator estimates the current-pay effect based on the selected deduction assumptions.",
    },
    {
      question: "How does overtime affect take-home pay?",
      answer:
        "Overtime increases gross pay, which can also increase payroll withholding. The calculator's overtime mode can model regular hours, overtime hours, and the selected overtime multiplier. Actual overtime rights and premium requirements depend on the applicable employment and jurisdictional rules.",
    },
    {
      question: "Why can bonus take-home pay be different from regular pay?",
      answer:
        "Bonuses may be treated as supplemental wages for federal withholding purposes. For 2026, the IRS continues to provide a 22% federal withholding rate for supplemental wages under the applicable flat-rate method, with special rules for supplemental wages exceeding $1 million. The amount withheld from a bonus is not necessarily the same as the bonus's final tax liability.",
    },
    {
      question: "How does state tax affect take-home pay?",
      answer:
        "State and local taxes can reduce the amount of a paycheck after federal payroll taxes are considered. Some states do not impose a broad individual wage income tax, while others use flat or progressive systems. Local taxes can add another layer. Exact rules should be evaluated using the relevant state or local authority and the tax year being modeled.",
    },
    {
      question: "How does the reverse salary calculator work?",
      answer:
        "The reverse salary solver starts with a desired take-home amount and works backward through the same payroll assumptions to estimate the gross salary needed to reach that net target. Because taxes and deductions depend on factors such as filing status, state, benefits, and withholding settings, changing those assumptions changes the required salary.",
    },
    {
      question: "Why can my paycheck differ from an online calculator?",
      answer:
        "Online calculators use mathematical models and assumptions. Your employer's payroll system may use current payroll tables, your actual W-4, benefit-plan rules, year-to-date wages, local taxes, garnishments, employer-specific deductions, and other payroll details. The calculator is useful for planning and comparison, but your pay stub remains the authoritative record of what was actually withheld.",
    },
  ],
  inputs: [
    {
      name: "grossSalary",
      label: "Gross Annual Salary ($)",
      type: "currency",
      defaultValue: 80000,
      min: 0,
      max: 100000000,
    },
    {
      name: "frequency",
      label: "Pay Frequency",
      type: "select",
      defaultValue: "biweekly",
      options: [
        { label: "Bi-Weekly (26/yr)", value: "biweekly" },
        { label: "Semi-Monthly (24/yr)", value: "semimonthly" },
        { label: "Monthly (12/yr)", value: "monthly" },
        { label: "Weekly (52/yr)", value: "weekly" },
        { label: "Annually", value: "annually" },
      ],
    },
  ],
  outputs: [
    {
      name: "netPaycheck",
      label: "Net Take-Home Paycheck",
      type: "currency",
    },
    {
      name: "takeHomePercentage",
      label: "Take-Home Percentage (%)",
      type: "percentage",
    },
    {
      name: "annualNetPay",
      label: "Annual Net Take-Home Pay",
      type: "currency",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const gross = Number(inputs.grossSalary) || 80000;
    const freq = inputs.frequency || "biweekly";

    const res = calculateTakeHomePay({
      grossPay: gross,
      isGrossAnnual: true,
      frequency: freq,
      filingStatus: "single",
      stateCode: "US",
      stateTaxRatePercent: 0,
      localTaxRatePercent: 0,
      isFicaExempt: false,
      preTaxDeductions: {
        retirement401k: 230.77,
        healthDentalVision: 0,
        hsaFsa: 0,
        transitCommuter: 0,
        otherPreTax: 0,
      },
      postTaxDeductions: {
        roth401k: 0,
        garnishmentsChildSupport: 0,
        unionDuesCharity: 0,
        otherPostTax: 0,
      },
      w4Adjustments: {
        multipleJobsStep2c: false,
        claimDependentsStep3: 0,
        otherIncomeStep4a: 0,
        extraDeductionsStep4b: 0,
        extraWithholdingStep4c: 0,
      },
    });

    return {
      netPaycheck: `$${res.netTakeHomePayPerPeriod.toLocaleString()}`,
      takeHomePercentage: `${res.takeHomePercentage}%`,
      annualNetPay: `$${res.netTakeHomePayAnnual.toLocaleString()}`,
    };
  },
  CustomComponent: TakeHomePayCalculator,
  ContentComponent: TakeHomePayContent,
};

export default take_home_pay_calculatorConfig;
