import { CalculatorModuleDefinition } from "../../types";
import { calculateRothIra } from "@/lib/calculator-engine/formulas/roth-ira";
import { roth_ira_faqs } from "./faq";
import { RothIraCalculator } from "@/components/calculator/roth-ira/RothIraCalculator";
import { RothIraContent } from "@/components/calculator/roth-ira/RothIraContent";

export const ROTH_IRA_CALCULATOR: CalculatorModuleDefinition = {
  id: "roth-ira",
  title: "Roth IRA Calculator - Growth, Contribution Limits & Taxable Account Comparison",
  slug: "roth-ira-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description:
    "Estimate Roth IRA growth, compare Roth vs taxable savings, check 2026 contribution limits and MAGI rules, model Backdoor Roth conversions, and view an annual retirement schedule.",
  iconName: "TrendingUp",
  featured: true,
  CustomComponent: RothIraCalculator,
  ContentComponent: RothIraContent,
  tags: [
    "Roth IRA calculator",
    "Roth IRA contribution calculator",
    "Roth IRA growth calculator",
    "Roth IRA retirement calculator",
    "Roth IRA vs taxable account calculator",
    "Backdoor Roth calculator",
    "Roth IRA income limits",
    "Roth IRA contribution limits",
    "Roth IRA catch-up calculator",
    "Saver's Credit calculator",
    "Roth IRA withdrawal calculator",
    "Roth IRA compound interest calculator",
  ],
  formulaDescription:
    "Compares after-tax Roth IRA contributions compounding under qualified rules against taxable savings accounts subjected to annual modeled tax drag.",
  relatedCalculators: [
    "401k-calculator",
    "retirement-calculator",
    "investment-calculator",
    "savings-calculator",
    "future-value-calculator",
    "compound-interest-calculator",
    "inflation-calculator",
  ],
  faqs: roth_ira_faqs,
  inputs: [
    { name: "currentBalance", label: "Current Roth Balance ($)", type: "currency", defaultValue: 30000, unit: "$", min: 0, max: 10000000, step: 5000 },
    { name: "annualContribution", label: "Annual Contribution ($)", type: "currency", defaultValue: 7500, unit: "$", min: 0, max: 1000000, step: 500 },
    { name: "investmentReturn", label: "Expected Return (%/yr)", type: "percentage", defaultValue: 6, unit: "%", min: 0, max: 20, step: 0.5 },
    { name: "currentAge", label: "Current Age", type: "number", defaultValue: 30, unit: "yrs", min: 18, max: 100, step: 1 },
    { name: "retirementAge", label: "Retirement Age", type: "number", defaultValue: 65, unit: "yrs", min: 19, max: 100, step: 1 },
    { name: "marginalTaxRate", label: "Marginal Tax Rate (%)", type: "percentage", defaultValue: 25, unit: "%", min: 0, max: 50, step: 1 },
  ],
  outputs: [
    { name: "rothBalanceAtRetirement", label: "Roth IRA Balance", format: "currency", highlight: true },
    { name: "taxableBalanceAtRetirement", label: "Taxable Account Balance", format: "currency" },
    { name: "totalPrincipalContributed", label: "Total Principal Contributed", format: "currency" },
    { name: "rothAdvantageOverTaxable", label: "Modeled Roth Ending Advantage", format: "currency", highlight: true },
  ],
  calculate: (inputs) => {
    const res = calculateRothIra({
      currentBalance: inputs.currentBalance !== undefined && inputs.currentBalance !== null ? Number(inputs.currentBalance) : 30000,
      annualContribution: inputs.annualContribution !== undefined && inputs.annualContribution !== null ? Number(inputs.annualContribution) : 7500,
      investmentReturn: inputs.investmentReturn !== undefined && inputs.investmentReturn !== null ? Number(inputs.investmentReturn) : 6,
      currentAge: inputs.currentAge !== undefined && inputs.currentAge !== null ? Number(inputs.currentAge) : 30,
      retirementAge: inputs.retirementAge !== undefined && inputs.retirementAge !== null ? Number(inputs.retirementAge) : 65,
      marginalTaxRate: inputs.marginalTaxRate !== undefined && inputs.marginalTaxRate !== null ? Number(inputs.marginalTaxRate) : 25,
    });

    return {
      rothBalanceAtRetirement: res.rothBalanceAtRetirement,
      taxableBalanceAtRetirement: res.taxableBalanceAtRetirement,
      totalPrincipalContributed: res.totalPrincipalContributed,
      rothAdvantageOverTaxable: res.rothAdvantageOverTaxable,
    };
  },
};

export default ROTH_IRA_CALCULATOR;
