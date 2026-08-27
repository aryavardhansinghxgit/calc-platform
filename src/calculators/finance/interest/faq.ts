export const INTEREST_FAQS = [
  {
    question: "What is an interest calculator?",
    answer: "An interest calculator is a tool that determines how money changes over time under a specified interest or growth rate. Depending on the calculator, it can model simple interest, compound interest, recurring contributions, different compounding frequencies, taxes, inflation, and other assumptions.",
  },
  {
    question: "What is the difference between simple and compound interest?",
    answer: "Simple interest is calculated from the original principal, while compound interest allows previously earned interest to become part of the balance used to calculate future interest. Compound interest therefore generally produces more growth than simple interest when the rate, principal, and period are otherwise identical.",
  },
  {
    question: "How does compound interest work?",
    answer: "Compound interest works by adding earned interest to the balance so that subsequent interest can be earned on both the original principal and earlier interest. The compounding process can be repeated annually, monthly, daily, or at another specified frequency.",
  },
  {
    question: "Does monthly compounding earn more than annual compounding?",
    answer: "For the same positive nominal annual rate and otherwise identical assumptions, more frequent compounding generally produces a slightly higher ending balance because interest is incorporated into the balance more frequently. The size of the difference depends on the rate and time period.",
  },
  {
    question: "Does adding money regularly increase compound growth?",
    answer: "Yes. Regular contributions add additional principal that can itself earn interest. The effect depends on how much is contributed, how frequently contributions are made, when they are made, the interest rate, and the length of time the money remains invested.",
  },
  {
    question: "Does contributing at the beginning of the period make a difference?",
    answer: "Yes. A beginning-of-period contribution receives one additional period of growth compared with an otherwise identical end-of-period contribution. Over a long period, repeatedly making contributions earlier can produce a meaningful difference.",
  },
  {
    question: "What is the Rule of 72?",
    answer: "The Rule of 72 is a shortcut for estimating how many years it may take an investment to double. The approximate formula is 72 divided by the annual rate expressed as a percentage. At 5%, the estimate is about 14.4 years.",
  },
  {
    question: "Is the Rule of 72 exact?",
    answer: "No. It is a heuristic approximation. The exact compound-growth doubling period can be calculated using logarithms: t = ln(2) / ln(1+r).",
  },
  {
    question: "What is the difference between nominal and inflation-adjusted value?",
    answer: "Nominal value is the future dollar amount produced by the model. Inflation-adjusted value attempts to express that future amount in today's purchasing-power terms using an assumed inflation rate. Because inflation reduces purchasing power, a future nominal balance can be much larger while representing less additional purchasing power than the raw dollar increase suggests.",
  },
  {
    question: "Does the tax input calculate my actual tax liability?",
    answer: "No. A calculator tax input is generally a modeling assumption unless the tool specifically implements the tax rules applicable to the exact product, jurisdiction, taxpayer, and transaction. U.S. tax treatment can vary by type of interest and investment, and the IRS provides specific rules for different forms of investment income.",
  },
  {
    question: "Why can two investments with the same interest rate have different ending balances?",
    answer: "Differences can arise from compounding frequency, contribution timing, fees, taxes, the number of periods, and whether additional money is added during the investment period. A 5% rate by itself does not uniquely determine the final balance.",
  },
  {
    question: "Can I use an interest calculator to predict investment returns?",
    answer: "You can use it to model scenarios based on an assumed rate, but a calculated projection is not a guarantee of future performance. Actual investment returns can vary, and investments can lose value.",
  },
];
