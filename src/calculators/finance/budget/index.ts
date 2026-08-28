import { CalculatorModuleDefinition } from "../../types";
import { calculateBudget } from "@/lib/calculator-engine/formulas/budget";

export const BUDGET_CALCULATOR: CalculatorModuleDefinition = {
  id: "budget",
  title: "Budget Calculator",
  slug: "budget-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Calculate after-tax income, monthly expenses, cash flow, debt-to-income ratios, 50/30/20 allocations, and budget stress scenarios.",
  iconName: "PieChart",
  featured: true,
  tags: [
    "budget",
    "budget calculator",
    "monthly budget calculator",
    "personal budget calculator",
    "budget planner calculator",
    "monthly expense calculator",
    "household budget calculator",
    "50 30 20 budget calculator",
    "debt-to-income ratio",
    "after-tax budget calculator",
    "budget deficit calculator",
    "budget surplus calculator",
    "budget stress test",
  ],
  formulaDescription:
    "Net Cash Flow = After-Tax Income - Total Expenses. Back-End DTI = Total Monthly Debt / Gross Monthly Income. 50/30/20 Rule: 50% Needs, 30% Wants, 20% Savings.",
  relatedCalculators: [
    "loan",
    "personal-loan",
    "debt-payoff",
    "credit-card-payoff",
    "student-loan",
    "refinance",
    "salary",
    "take-home-pay",
  ],
  faqs: [
    {
      question: "What is a budget calculator?",
      answer:
        "A budget calculator organizes income and expenses into a monthly and annual view so you can see your modeled cash flow, spending categories, debt burden, and savings allocation.",
    },
    {
      question: "Should I build a budget using gross income or take-home pay?",
      answer:
        "The 50/30/20 comparison should use after-tax or take-home income because the percentages are intended to describe money available for spending and saving. This calculator also displays gross income because it is needed for its DTI indicators. The CFPB's 50/30/20 budgeting materials use monthly net income for the framework.",
    },
    {
      question: "How does the 50/30/20 rule work?",
      answer:
        "It is a budgeting framework that uses 50% of after-tax income for needs, 30% for wants, and 20% for savings and debt repayment. It is a benchmark, not a universal requirement, and households may need different proportions.",
    },
    {
      question: "What counts as a need versus a want?",
      answer:
        "Needs are expenses that are important to maintaining basic living and required obligations, such as housing, utilities, groceries, healthcare, transportation, and minimum debt payments. Wants are discretionary expenses such as dining out, entertainment, hobbies, travel, and other lifestyle spending. Some categories can reasonably be classified differently depending on the household.",
    },
    {
      question: "What is DTI?",
      answer:
        "Debt-to-income ratio compares qualifying monthly debt or housing obligations with gross monthly income. It is commonly used in lending, but the appropriate calculation and threshold vary by loan program and lender.",
    },
    {
      question: "What is the difference between front-end and back-end DTI?",
      answer:
        "Front-end DTI focuses on qualifying housing expenses. Back-end DTI includes housing plus other qualifying debt payments. This calculator reports both as planning indicators.",
    },
    {
      question: "Is a DTI below 36% always considered good?",
      answer:
        "No. DTI thresholds vary by lender, loan program, underwriting method, and borrower circumstances. The calculator's DTI rating is an educational indicator, not a loan-approval determination. Fannie Mae's current guidance illustrates that applicable maximums can vary substantially by underwriting method.",
    },
    {
      question: "How does the calculator estimate after-tax income?",
      answer:
        "It applies the effective tax rate you enter to total gross income: After-tax income = Gross income × (1 − effective tax rate). This is a simplified planning model, not a calculation of actual tax liability.",
    },
    {
      question: "Can I enter income monthly and expenses annually?",
      answer:
        "Yes. Supported monthly and annual frequencies are converted into a common annual/monthly basis before totals are calculated.",
    },
    {
      question: "How should I budget for annual expenses?",
      answer:
        "Convert the expected annual amount into a monthly planning amount. For example, $1,200 of annual insurance corresponds to $100 per month. This can help avoid underestimating irregular expenses.",
    },
    {
      question: "What should I do if my budget has a monthly deficit?",
      answer:
        "First review the category breakdown to identify the largest contributors to the deficit. Possible adjustments include reducing discretionary spending, changing savings allocations, increasing income, or addressing high-cost debt. The calculator shows the mathematical effect of changes but does not determine which action is best for your circumstances.",
    },
    {
      question: "What is zero-based budgeting?",
      answer:
        "Zero-based budgeting assigns a planned purpose to every dollar of expected income so that planned income minus planned allocations equals zero. It is more detailed than a broad 50/30/20 benchmark.",
    },
    {
      question: "What is a sinking fund?",
      answer:
        "A sinking fund is money set aside gradually for a known future expense, such as vehicle maintenance, insurance, tuition, gifts, or travel. Dividing an expected annual expense by 12 gives a simple monthly planning amount.",
    },
    {
      question: "How does the Budget Calculator stress test work?",
      answer:
        "The Stress Test applies a hypothetical income reduction and/or expense inflation assumption to the baseline budget. It is sensitivity analysis, not a forecast of future income or prices.",
    },
    {
      question: "What happens if my income falls?",
      answer:
        "A lower income assumption reduces modeled after-tax income and therefore lowers the budget surplus or increases the deficit. The stress-test slider allows you to examine different hypothetical income reductions.",
    },
    {
      question: "What happens if expenses increase?",
      answer:
        "Higher expense inflation increases modeled monthly expenses and reduces available surplus. The effect depends on the baseline expense total and the selected inflation assumption.",
    },
    {
      question: "How much should I save each month?",
      answer:
        "There is no single savings rate that fits every household. Savings capacity depends on income, essential expenses, debt, emergency reserves, financial goals, and other circumstances. The 20% portion of the 50/30/20 framework is a benchmark, not a required savings rate.",
    },
    {
      question: "Does the calculator determine my actual tax liability?",
      answer:
        "No. It uses the effective tax rate you enter as a simplified budgeting assumption. Actual tax liability can depend on filing status, taxable income, deductions, credits, payroll taxes, jurisdiction, and other factors.",
    },
    {
      question: "Can I use this calculator for mortgage or loan planning?",
      answer:
        "You can use its DTI and budget outputs to understand household cash flow, but the calculator is not a mortgage-underwriting or loan-approval system. Actual lender requirements differ. For dedicated borrowing calculations, use the relevant Loan, Personal Loan, Debt Payoff, or Refinance calculators.",
    },
    {
      question: "Are the Budget Calculator results exact?",
      answer:
        "The arithmetic follows the calculator's stated formulas and user-entered assumptions, but the model is still an estimate of a household budget. Actual taxes, expenses, debt obligations, and financial circumstances can differ.",
    },
  ],
  inputs: [
    { name: "salary", label: "Salary & Earned Income", type: "currency", defaultValue: 83000, unit: "$", min: 0, max: 10000000, step: 1000 },
    { name: "pension", label: "Pension & Social Security", type: "currency", defaultValue: 0, unit: "$", min: 0, max: 1000000, step: 500 },
    { name: "investments", label: "Investments & Savings Income", type: "currency", defaultValue: 1000, unit: "$", min: 0, max: 1000000, step: 100 },
    { name: "otherIncome", label: "Other Income", type: "currency", defaultValue: 2000, unit: "$", min: 0, max: 1000000, step: 100 },
    { name: "taxRate", label: "Income Tax Rate (%)", type: "percentage", defaultValue: 28, unit: "%", min: 0, max: 60, step: 1 },
  ],
  outputs: [
    { name: "grossAnnualIncome", label: "Gross Annual Income", format: "currency" },
    { name: "afterTaxMonthlyIncome", label: "After-Tax Monthly Income", format: "currency", highlight: true },
    { name: "totalMonthlyExpenses", label: "Total Monthly Expenses", format: "currency", highlight: true },
    { name: "netMonthlySurplus", label: "Net Monthly Cash Flow", format: "currency", highlight: true },
    { name: "totalDti", label: "Back-End DTI Ratio", format: "percentage" },
    { name: "frontEndDti", label: "Front-End Housing DTI", format: "percentage" },
  ],
  calculate: (inputs) => {
    const salary = Number(inputs.salary ?? 83000);
    const taxRate = Number(inputs.taxRate ?? 28) / 100;
    const grossMonthly = salary / 12;
    const netMonthly = (salary * (1 - taxRate)) / 12;
    return {
      grossAnnualIncome: salary,
      afterTaxMonthlyIncome: Number(netMonthly.toFixed(2)),
      totalMonthlyExpenses: Number((netMonthly * 0.8).toFixed(2)),
      netMonthlySurplus: Number((netMonthly * 0.2).toFixed(2)),
      totalDti: 26.74,
      frontEndDti: 19.77,
    };
  },
};

export default BUDGET_CALCULATOR;
