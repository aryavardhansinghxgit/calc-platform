import { CalculatorModuleDefinition } from "../../types";

export const CREDIT_CARD_CALCULATOR: CalculatorModuleDefinition = {
  id: "credit-card",
  title: "Credit Card Calculator",
  slug: "credit-card-calculator",
  category: "Finance",
  subcategory: "Credit & Debt",
  description: "Calculate how long it takes to pay off credit card debt making minimum vs fixed monthly payments.",
  iconName: "CreditCard",
  featured: true,
  tags: ["credit card", "minimum payment", "card interest", "debt payoff"],
  formulaDescription: "Calculates interest charges and month-by-month balance reduction based on payment schedule.",
  faqs: [
    {
      question: "Why does paying only the minimum take so long to pay off?",
      answer: "Minimum payments are usually set near interest charges plus 1-2% of principal, meaning most of your money goes toward interest rather than principal.",
    },
  ],
  inputs: [
    { name: "cardBalance", label: "Credit Card Balance", type: "currency", defaultValue: 8000, unit: "$", min: 100, max: 100000, step: 500 },
    { name: "interestRate", label: "APR (Interest Rate)", type: "percentage", defaultValue: 21.99, unit: "%", min: 1, max: 40, step: 0.1 },
    { name: "monthlyPayment", label: "Fixed Monthly Payment", type: "currency", defaultValue: 250, unit: "$", min: 25, max: 10000, step: 25 },
  ],
  outputs: [
    { name: "payoffTimeMonths", label: "Payoff Time", format: "text", highlight: true },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalAmountPaid", label: "Total Amount Paid", format: "currency" },
  ],
  calculate: (inputs) => {
    let bal = Number(inputs.cardBalance || 8000);
    const r = Number(inputs.interestRate || 21.99) / 100 / 12;
    const pmt = Number(inputs.monthlyPayment || 250);

    if (bal <= 0) return { payoffTimeMonths: "0 months", totalInterestPaid: 0, totalAmountPaid: 0 };
    if (pmt <= bal * r) return { payoffTimeMonths: "Payment too low to cover monthly interest!", totalInterestPaid: 0, totalAmountPaid: 0 };

    let months = 0;
    let totalInterest = 0;

    while (bal > 0 && months < 600) {
      months++;
      const interest = bal * r;
      let principal = pmt - interest;
      if (principal > bal) principal = bal;
      totalInterest += interest;
      bal -= principal;
    }

    const yrs = Math.floor(months / 12);
    const mos = months % 12;
    const timeStr = yrs > 0 ? `${yrs} yrs ${mos} mos` : `${mos} months`;
    const totalPaid = Number(inputs.cardBalance || 8000) + totalInterest;

    return {
      payoffTimeMonths: timeStr,
      totalInterestPaid: Number(totalInterest.toFixed(2)),
      totalAmountPaid: Number(totalPaid.toFixed(2)),
    };
  },
};

export default CREDIT_CARD_CALCULATOR;
