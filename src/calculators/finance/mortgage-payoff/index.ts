import { CalculatorModuleDefinition } from "../../types";
import { safePmt } from "@/lib/calculator-engine/formulas/safety";

export const MORTGAGE_PAYOFF_CALCULATOR: CalculatorModuleDefinition = {
  id: "mortgage-payoff",
  title: "Mortgage Payoff Calculator",
  slug: "mortgage-payoff-calculator",
  category: "Finance",
  subcategory: "Mortgage & Home",
  description: "Calculate how much time and interest you save by making extra monthly mortgage payments.",
  iconName: "TrendingDown",
  featured: false,
  tags: ["mortgage payoff", "extra payment", "interest savings", "early payoff"],
  formulaDescription: "Calculates interest saved and months reduced by applying extra principal payments each month.",
  faqs: [
    {
      question: "How do extra payments reduce my mortgage payoff time?",
      answer: "Extra payments reduce your principal balance faster, which means less interest accrues each month, compounding your savings.",
    },
  ],
  inputs: [
    { name: "currentBalance", label: "Current Mortgage Balance", type: "currency", defaultValue: 300000, unit: "$", min: 1000, max: 10000000, step: 5000 },
    { name: "interestRate", label: "Interest Rate (p.a.)", type: "percentage", defaultValue: 6.5, unit: "%", min: 0.1, max: 25, step: 0.1 },
    { name: "remainingYears", label: "Remaining Term", type: "slider", defaultValue: 25, unit: "years", min: 1, max: 30, step: 1 },
    { name: "extraMonthly", label: "Extra Monthly Payment", type: "currency", defaultValue: 200, unit: "$", min: 0, max: 10000, step: 50 },
  ],
  outputs: [
    { name: "newPayoffYears", label: "New Payoff Time", format: "text", highlight: true },
    { name: "timeSavedMonths", label: "Time Saved", format: "text" },
    { name: "interestSaved", label: "Total Interest Saved", format: "currency", highlight: true },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, Number(inputs.currentBalance || 300000));
    const rate = Math.min(100, Math.max(0, Number(inputs.interestRate || 6.5))) / 100 / 12;
    const origMonths = Math.max(1, Number(inputs.remainingYears || 25)) * 12;
    const extra = Math.max(0, Number(inputs.extraMonthly || 200));

    if (P <= 0 || origMonths <= 0) {
      return { newPayoffYears: "0 yrs", timeSavedMonths: "0 mos", interestSaved: 0 };
    }

    const stdPmt = safePmt(P, rate, origMonths);
    const stdTotalInterest = (stdPmt * origMonths) - P;

    let bal = P;
    let months = 0;
    let newTotalInterest = 0;
    const newPmt = stdPmt + extra;

    while (bal > 0 && months < 600) {
      months++;
      const interest = bal * rate;
      let principal = newPmt - interest;
      if (principal > bal) principal = bal;
      if (principal <= 0) break;
      newTotalInterest += interest;
      bal -= principal;
    }

    const interestSaved = Math.max(0, stdTotalInterest - newTotalInterest);
    const timeSaved = Math.max(0, origMonths - months);
    const years = Math.floor(months / 12);
    const remainingMos = months % 12;

    return {
      newPayoffYears: `${years} yrs ${remainingMos} mos`,
      timeSavedMonths: `${Math.floor(timeSaved / 12)} yrs ${timeSaved % 12} mos`,
      interestSaved: Number((isNaN(interestSaved) ? 0 : interestSaved).toFixed(2)),
    };
  },
};

export default MORTGAGE_PAYOFF_CALCULATOR;
