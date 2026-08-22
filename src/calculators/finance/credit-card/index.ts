import { CalculatorModuleDefinition } from "../../types";
import { calculateCreditCardPayoff } from "@/lib/calculator-engine/formulas/credit-card";

export const CREDIT_CARD_CALCULATOR: CalculatorModuleDefinition = {
  id: "credit-card",
  title: "Credit Card Calculator",
  slug: "credit-card-calculator",
  category: "Finance",
  subcategory: "Credit & Debt",
  description:
    "Calculate credit card payoff time, monthly interest, minimum payment effects, 0% balance transfer savings, Debt Avalanche vs. Snowball, and credit utilization.",
  iconName: "CreditCard",
  featured: true,
  tags: [
    "credit card calculator",
    "credit card payment calculator",
    "credit card interest calculator",
    "credit card debt calculator",
    "credit card payoff calculator with interest",
    "credit card minimum payment calculator",
    "credit card repayment calculator",
    "credit card balance calculator",
    "credit card monthly payment calculator",
    "0 apr balance transfer calculator",
    "credit card amortization calculator",
  ],
  relatedCalculators: [
    "credit-card-payoff-calculator",
    "debt-payoff-calculator",
    "debt-consolidation-calculator",
    "personal-loan-calculator",
    "loan-calculator",
    "apr-calculator",
    "amortization-calculator",
  ],
  formulaDescription:
    "This calculator uses a simplified monthly periodic-rate model: Monthly Interest = Beginning Balance × (APR / 12). Actual issuer finance charges vary based on daily periodic rates, average daily balance (ADB) methods, billing-cycle day counts, and card agreement terms.",
  faqs: [
    {
      question: "How is credit card interest calculated on a daily balance?",
      answer:
        "This calculator uses a simplified monthly periodic-rate model where monthly interest equals beginning balance multiplied by (APR ÷ 12). In real-world credit card accounts, many issuers calculate interest daily using the Average Daily Balance (ADB) method: the Annual Percentage Rate is divided by 365 to establish a Daily Periodic Rate (DPR), and monthly finance charges equal ADB × DPR × Number of Days in the Billing Cycle.",
    },
    {
      question: "What is the credit card minimum payment trap and how does it work?",
      answer:
        "The minimum payment trap is an illustrative scenario that occurs when a borrower pays only the minimum amount required by the issuer. Because the required dollar amount decreases as the principal shrinks, repayment can stretch across 15 to 30+ years in typical modeling scenarios, substantially increasing total lifetime interest costs compared to fixed monthly payments.",
    },
    {
      question: "Which debt elimination strategy is better: Debt Avalanche or Debt Snowball?",
      answer:
        "Under fixed-rate, fixed-budget assumptions and the calculator's simplified model, the Debt Avalanche method mathematically minimizes total interest paid by targeting the card with the highest APR first. The Debt Snowball method prioritizes the smallest balance first to build behavioral momentum and provide psychological motivation through faster account closures.",
    },
    {
      question: "How does a 0% APR balance transfer save money on credit card debt?",
      answer:
        "A 0% balance transfer credit card temporarily waives interest charges for an introductory promotional window (commonly 12 to 21 months), allowing 100% of payments during that window to reduce principal. After accounting for the upfront transfer fee (typically 3% to 5%) and any post-promotional APR applied to remaining balances, cardholders can achieve substantial interest savings. Note that new purchases made on the card may accrue interest while a transferred balance is carried.",
    },
    {
      question: "What happens if my monthly payment is less than the monthly interest charge?",
      answer:
        "Negative amortization occurs under this simplified model: the unpaid monthly interest charge exceeds the payment amount, and the remaining debt balance expands over time rather than amortizing toward zero.",
    },
    {
      question: "How does my credit card balance affect my credit utilization score?",
      answer:
        "Credit utilization measures the percentage of your total revolving credit limit currently reported as outstanding (Total Balances ÷ Total Limits). Revolving credit utilization is an important factor in many credit-scoring models (such as FICO and VantageScore). Maintaining modest utilization (such as below 30% or 10%) is a widely recognized reference benchmark, though exact score impacts depend on the individual scoring model and overall credit profile.",
    },
    {
      question: "Why do credit card cash advances cost significantly more than purchases?",
      answer:
        "Cash advances generally do not have a purchase grace period; interest begins accruing immediately upon withdrawal from the transaction date under typical card terms. In addition, cash advances often carry higher APRs than purchases and incur upfront transaction fees (such as 3% to 5% with a minimum dollar floor) plus potential third-party ATM surcharges.",
    },
    {
      question: "How does making bi-weekly payments help pay off credit card debt faster?",
      answer:
        "Making an accelerated bi-weekly payment of half your monthly amount results in 26 half-payments per year, which equals 13 full monthly payments instead of 12. This accelerated payment model directly reduces principal faster, shortens overall payoff timelines, and reduces total interest charges.",
    },
    {
      question: "Can I lower my credit card APR by negotiating directly with my card issuer?",
      answer:
        "Some card issuers may consider APR reductions, temporary promotional rates, or hardship repayment plans for existing cardholders in good standing, but approval and the terms of any rate adjustment depend entirely on the issuer, account history, credit standing, and individual circumstances.",
    },
    {
      question: "What is a Penalty APR and how is it triggered?",
      answer:
        "A Penalty APR is an elevated, punitive interest rate that issuers may apply when an account becomes 60 or more days delinquent. For rate increases covered by Regulation Z's reevaluation rules, the issuer must review the applicable rate increase at least once every six months. A review does not necessarily restore the original APR; any required reduction depends on the applicable rule and the issuer's reasonable review policies.",
    },
    {
      question: "When should I consider a personal consolidation loan over credit cards?",
      answer:
        "A fixed-rate personal debt consolidation loan may be beneficial when a borrower can secure an interest rate substantially lower than their credit card APRs and prefers a fixed monthly payment with a defined loan term (such as 2 to 5 years), provided origination fees and total borrowing costs are carefully evaluated.",
    },
    {
      question: "What is the credit card grace period and how does it work?",
      answer:
        "Under federal rules (Regulation Z / CARD Act), card issuers must generally deliver periodic billing statements at least 21 days before the payment due date. A purchase grace period is a contractual feature offered by many card issuers. If your card provides a purchase grace period, carrying an unpaid balance can cause you to lose that grace-period benefit, depending on the card agreement. When a grace period is lost, new purchases may begin accruing interest according to the account's terms.",
    },
  ],
  inputs: [
    { name: "balance", label: "Credit Card Balance ($)", type: "currency", defaultValue: 8000, unit: "$", min: 0, max: 1000000, step: 500 },
    { name: "apr", label: "Interest Rate (% APR)", type: "percentage", defaultValue: 18, unit: "%", min: 0, max: 100, step: 0.25 },
    { name: "monthlyPayment", label: "Monthly Payment Amount ($)", type: "currency", defaultValue: 200, unit: "$", min: 1, max: 100000, step: 25 },
  ],
  outputs: [
    { name: "monthsToPayoff", label: "Months to Pay Off", format: "number", highlight: true },
    { name: "yearsToPayoff", label: "Years to Pay Off", format: "number" },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalAmountPaid", label: "Total Amount Paid", format: "currency" },
    { name: "payoffDate", label: "Estimated Payoff Date", format: "text" },
  ],
  calculate: (inputs) => {
    const res = calculateCreditCardPayoff({
      balance: Number(inputs.balance || 8000),
      apr: Number(inputs.apr || 18),
      monthlyPayment: Number(inputs.monthlyPayment || 200),
      mode: "A",
    });

    return {
      monthsToPayoff: res.monthsToPayoff,
      yearsToPayoff: res.yearsToPayoff,
      totalInterestPaid: res.totalInterestPaid,
      totalAmountPaid: res.totalAmountPaid,
      payoffDate: res.payoffDate,
    };
  },
};

export default CREDIT_CARD_CALCULATOR;
