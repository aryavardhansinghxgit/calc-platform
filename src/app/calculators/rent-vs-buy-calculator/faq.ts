import { CalculatorFAQ } from "@/calculators/types";

export const rentVsBuyFaqs: CalculatorFAQ[] = [
  {
    question: "How does a rent vs. buy calculator work?",
    answer:
      "It compares modeled ownership and renting economics over time, including the configured mortgage, principal buildup, taxes, insurance, maintenance, transaction costs, rent growth, appreciation, opportunity cost and tax assumptions.",
  },
  {
    question: "How many years should I plan to stay before buying a home?",
    answer:
      "The calculator estimates a breakeven horizon under your assumptions. The result is scenario-specific and should not be treated as a universal minimum ownership period.",
  },
  {
    question: "What costs are included when comparing renting and buying?",
    answer:
      "The model includes the configured mortgage, property taxes, insurance, maintenance, HOA, purchase and selling costs, rent, rent growth, renter-side costs and the selected investment and tax assumptions.",
  },
  {
    question: "What is the price-to-rent ratio?",
    answer:
      "It is the home price divided by annual rent. It is a quick screening heuristic, not a complete buy-or-rent decision rule.",
  },
  {
    question: "What is the 5% rule for renting vs. buying?",
    answer:
      "It is an unrecoverable-cost heuristic. This calculator uses a dynamic implementation based on selected ownership-cost assumptions, so the result should be treated as a model-specific screening measure.",
  },
  {
    question: "How do mortgage interest and principal affect the comparison?",
    answer:
      "Interest is generally a financing cost, while principal repayment reduces the outstanding mortgage and builds modeled home equity. The amortization schedule separates the two.",
  },
  {
    question: "How does home appreciation affect the rent-vs-buy decision?",
    answer:
      "Higher modeled appreciation generally increases the future value of the owned property and can improve modeled buying-side net worth. Actual appreciation is uncertain.",
  },
  {
    question: "How does rent inflation affect the comparison?",
    answer:
      "The calculator escalates rent according to the selected annual growth assumption. Higher rent growth increases the modeled long-term cost of renting.",
  },
  {
    question: "How does the opportunity cost of a down payment affect the result?",
    answer:
      "Money used as a down payment cannot also remain invested under the same scenario. The calculator models that alternative investment growth using the selected return assumption.",
  },
  {
    question: "How do closing costs and selling costs affect the breakeven point?",
    answer:
      "Transaction costs create friction. Higher purchase or selling costs generally make shorter holding periods less attractive under the model.",
  },
  {
    question: "Does the calculator include mortgage-interest or property-tax benefits?",
    answer:
      "Yes, the current model contains a simplified illustrative tax-benefit calculation. Tax rules and eligibility can vary, so the result is not a personalized tax determination.",
  },
  {
    question: "Why can the calculator say buying wins in one scenario and renting wins in another?",
    answer:
      "Because the result depends on the assumptions. Changing appreciation, rent growth, rates, transaction costs, investment return or holding period can materially change the modeled outcome.",
  },
];
