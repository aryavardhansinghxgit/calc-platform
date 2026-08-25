import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const inflationFaqs: CalculatorFAQ[] = [
  {
    question: "How does the inflation calculator use the Consumer Price Index (CPI) to calculate dollar purchasing power?",
    answer:
      "The calculator compares the CPI for the selected starting period with the CPI for the target period. It then multiplies the starting dollar amount by the target-to-start CPI ratio to estimate the equivalent purchasing power.",
  },
  {
    question: "What is the difference between headline CPI and Core CPI?",
    answer:
      "Headline CPI includes the broader consumer basket, including food and energy. Core CPI excludes food and energy to reduce the influence of those more volatile components when evaluating underlying inflation trends.",
  },
  {
    question: "What is the Rule of 72 and how does it calculate the halving time of purchasing power?",
    answer:
      "The Rule of 72 is a mental-math approximation for estimating how long purchasing power may take to fall by about half. At a 3% inflation rate, 72 divided by 3 suggests roughly 24 years.",
  },
  {
    question: "Why is inflation called the \"hidden tax\" on cash savings?",
    answer:
      "Inflation can reduce the purchasing power of cash even when the account balance remains unchanged. The phrase \"hidden tax\" is a metaphor for that purchasing-power erosion, not a literal tax charge.",
  },
  {
    question: "What is the difference between inflation, deflation, disinflation, and stagflation?",
    answer:
      "Inflation means the general price level is rising, deflation means it is falling, disinflation means the inflation rate is slowing while prices can still rise, and stagflation refers to elevated inflation combined with weak economic conditions and unemployment.",
  },
  {
    question: "How does the Federal Reserve control inflation through interest rate hikes?",
    answer:
      "Higher policy rates can increase borrowing costs and reduce some forms of aggregate demand, which may ease inflationary pressure. The effect is not immediate or guaranteed because supply and other economic conditions also matter.",
  },
  {
    question: "What causes hyperinflation and how is it different from normal inflation?",
    answer:
      "Hyperinflation refers to exceptionally rapid and destabilizing price increases. A commonly cited convention is inflation above 50% per month, although terminology can vary by source and context.",
  },
  {
    question: "How do I calculate if my salary raise kept pace with inflation?",
    answer:
      "Adjust the earlier salary using the CPI ratio between the earlier and current periods, then compare the resulting inflation-adjusted salary with the current salary. This shows whether nominal wage growth translated into higher purchasing power.",
  },
  {
    question: "What assets historically serve as the best hedge against high inflation?",
    answer:
      "Historical inflation-sensitive strategies can include equities, real estate and inflation-linked securities such as TIPS, but no asset category provides a guaranteed hedge across every market environment.",
  },
  {
    question: "Why do central banks target a 2% inflation rate instead of 0%?",
    answer:
      "A modest positive target can provide a buffer against deflation and give monetary policymakers more flexibility to adjust real interest rates during economic downturns. Targets differ by central bank and policy framework.",
  },
  {
    question: "What is the Fisher Equation and why does real return matter for investors?",
    answer:
      "The Fisher-style relationship estimates real return by adjusting the after-tax nominal return for inflation. Real return matters because it focuses on purchasing power rather than only the number of nominal dollars accumulated.",
  },
  {
    question: "How does inflation affect fixed-rate mortgage borrowers vs lenders?",
    answer:
      "Inflation can reduce the real burden of a fixed nominal payment over time, but the overall effect depends on wage growth, property expenses, taxes, insurance, property values and other economic conditions.",
  },
];

export default inflationFaqs;
