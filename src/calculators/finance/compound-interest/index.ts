import { CalculatorModuleDefinition } from "../../types";
import { calculateCompoundInterestFormula } from "@/lib/calculator-engine/formulas/compound-interest";
import { CompoundInterestContent } from "@/components/calculator/compound-interest/CompoundInterestContent";

export const COMPOUND_INTEREST_CALCULATOR: CalculatorModuleDefinition = {
  id: "compound-interest",
  title: "Compound Interest Calculator – Daily, Monthly & Continuous Compounding",
  slug: "compound-interest-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate compound interest across 8 frequencies (Daily, Monthly, Continuous). Convert APR to APY, compare simple vs compound growth, and solve the Rule of 72.",
  iconName: "TrendingUp",
  featured: true,
  tags: [
    "compound interest calculator",
    "compound interest formula",
    "daily compound interest calculator",
    "monthly compound interest calculator",
    "APY calculator",
    "APR vs APY calculator",
    "effective annual rate calculator",
    "continuous compounding calculator",
    "Rule of 72 calculator",
    "simple vs compound interest",
  ],
  formulaDescription: "A = P × (1 + r/n)^(n×t)",
  ContentComponent: CompoundInterestContent,
  inputs: [
    {
      name: "principal",
      label: "Initial Principal",
      type: "currency",
      defaultValue: 10000,
      unit: "$",
      min: 100,
      max: 1000000,
      step: 100,
    },
    {
      name: "annualInterestRate",
      label: "Annual Interest Rate",
      type: "percentage",
      defaultValue: 8,
      unit: "%",
      min: 0.1,
      max: 25,
      step: 0.1,
    },
    {
      name: "years",
      label: "Length of Time",
      type: "slider",
      defaultValue: 20,
      unit: "years",
      min: 1,
      max: 40,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "futureValue",
      label: "Future Investment Value",
      format: "currency",
      highlight: true,
    },
    {
      name: "principal",
      label: "Initial Principal",
      format: "currency",
    },
    {
      name: "totalInterestEarned",
      label: "Total Interest Earned",
      format: "currency",
      highlight: true,
    },
  ],
  faqs: [
    {
      question: "What is compound interest?",
      answer:
        "Compound interest is the interest calculated on the initial principal plus all accumulated interest from prior periods, allowing savings and investments to grow exponentially over time.",
    },
    {
      question: "What is the mathematical compound interest formula?",
      answer:
        "The standard formula is A = P × (1 + r/n)^(n×t), where A is future value, P is principal, r is nominal annual interest rate as a decimal, n is compounding frequency per year, and t is years.",
    },
    {
      question: "What is the difference between APR and APY?",
      answer:
        "In this calculator, APR is treated as the stated nominal annual rate before intra-year compounding, while APY (Annual Percentage Yield) reflects the effective annual return earned when intra-year compounding is included. Official consumer APR disclosures on loans may incorporate additional upfront fees and finance charges.",
    },
    {
      question: "How does compounding frequency affect investment returns?",
      answer:
        "More frequent compounding (such as daily or monthly) reinvests earnings earlier, producing higher effective annual yields and larger final balances compared to annual compounding under the same nominal rate.",
    },
    {
      question: "What is Effective Annual Rate (EAR)?",
      answer:
        "Effective Annual Rate (EAR) is the standardized annualized rate that accounts for compounding within the year (EAR = (1 + r/n)^n - 1), allowing direct comparisons between financial products with differing compounding schedules.",
    },
    {
      question: "What is continuous compounding?",
      answer:
        "Continuous compounding represents the mathematical upper bound of compounding where interest is calculated and added constantly at every infinitely small instant using the formula A = P × e^(rt).",
    },
    {
      question: "What is the Rule of 72 and how accurate is it?",
      answer:
        "The Rule of 72 is a mental shortcut to estimate doubling time by dividing 72 by the annual interest rate (72 / r). It is accurate within 1% error for interest rates between 5% and 10%.",
    },
    {
      question: "How does simple interest differ from compound interest?",
      answer:
        "Simple interest calculates returns strictly on original principal (A = P × (1 + rt)), resulting in linear growth, whereas compound interest generates accelerating exponential growth.",
    },
    {
      question: "Can compound interest work against borrowers on debt?",
      answer:
        "Yes. When unpaid interest on revolving credit lines or loans is added back to the principal or calculated on a daily periodic basis, finance charges expand if balances are not paid off promptly.",
    },
    {
      question: "Is my calculation data private?",
      answer:
        "Yes. All computations execute 100% client-side in your web browser. No financial data, interest rates, or balances are transmitted to external servers.",
    },
  ],
  calculate: (inputs) => {
    const res = calculateCompoundInterestFormula({
      principal: Number(inputs.principal || 10000),
      annualInterestRate: Number(inputs.annualInterestRate || 8),
      years: Number(inputs.years || 20),
    });
    return {
      futureValue: res.futureValue,
      principal: res.principal,
      totalInterestEarned: res.totalInterestEarned,
    };
  },
};

export default COMPOUND_INTEREST_CALCULATOR;
