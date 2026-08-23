import { CalculatorFAQ } from "@/calculators/types";

export const future_valueFaqs: CalculatorFAQ[] = [
  {
    question: "What is a future value calculator?",
    answer:
      "A future value calculator estimates what a current investment and any recurring contributions could become at a future date under the selected rate, compounding, contribution timing and time-horizon assumptions.",
  },
  {
    question: "How is future value calculated?",
    answer:
      "For a lump sum, the calculator uses compound growth. When recurring contributions are included, it also applies an annuity-style future-value calculation based on contribution frequency and timing.",
  },
  {
    question: "What is the difference between an ordinary annuity and an annuity due?",
    answer:
      "An ordinary annuity assumes contributions occur at the end of each period. An annuity due assumes contributions occur at the beginning, giving each recurring contribution an additional modeled period of growth.",
  },
  {
    question: "How do monthly contributions affect future value?",
    answer:
      "Each contribution has its own time in the model. Earlier deposits receive more periods of growth, while later deposits receive fewer, so recurring contributions cannot simply be treated as one lump sum.",
  },
  {
    question: "Does more frequent compounding increase future value?",
    answer:
      "For a positive nominal rate and otherwise comparable assumptions, more frequent compounding generally produces a higher modeled future value. The exact effect also depends on how contribution frequency aligns with compounding periods.",
  },
  {
    question: "How does inflation affect future value?",
    answer:
      "Inflation reduces the purchasing power of a future nominal balance. The calculator can divide a future amount by (1 + inflation)^years to show an illustrative inflation-adjusted value in today's dollars.",
  },
  {
    question: "How does the goal planner calculate required savings?",
    answer:
      "It works backward from the target future value. Depending on the selected solve-for variable, the calculator analytically or numerically determines the required contribution, initial balance, rate or time period under the selected assumptions.",
  },
  {
    question: "What does the Monte Carlo probability mean?",
    answer:
      "It is the percentage of simulated paths that reach the selected target under the calculator's chosen simulation assumptions. It is a model output, not a guarantee or personalized probability of actual investment success.",
  },
  {
    question: "How do taxes affect the future value calculation?",
    answer:
      "The calculator applies its defined simplified tax-drag model. Actual investment taxes depend on account type, jurisdiction, income classification, realization timing and other rules, so the modeled tax result may differ from a real tax outcome.",
  },
  {
    question: "What is the difference between future value and present value?",
    answer:
      "Future value asks what money may become at a future date. Present value asks what a future amount is worth today under a stated discount or growth assumption.",
  },
  {
    question: "Why do different return assumptions produce very different future values?",
    answer:
      "Compounding magnifies the effect of the assumed rate over time, and recurring contributions add another source of growth. The calculator shows scenarios so you can compare assumptions rather than treating one rate as certain.",
  },
  {
    question: "Why can the calculator result differ from my actual investment result?",
    answer:
      "The calculator is based on entered assumptions such as rate, timing, inflation, tax and contributions. Actual investments experience changing returns, fees, taxes, contribution changes and product-specific rules that may not match the model.",
  },
];
