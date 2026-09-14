import { CalculatorFAQ } from "@/calculators/types";

export const dice_rollerFaqs: CalculatorFAQ[] = [
  {
    question: "What does 2d6 mean?",
    answer:
      "2d6 means rolling two six-sided dice and adding their results. The total can range from 2 through 12.",
  },
  {
    question: "What is the probability of rolling a 7 on 2d6?",
    answer:
      "There are 6 successful combinations out of 36 equally likely ordered outcomes: 6 / 36 = 16.67%. So the probability is 16.67%.",
  },
  {
    question: "What is the average roll of a d20?",
    answer:
      "The expected value of a fair d20 is: (20 + 1) / 2 = 10.5. This is a long-run average, not a possible single result.",
  },
  {
    question: "What is Advantage in D&D?",
    answer:
      "In the current D&D Basic Rules, Advantage means rolling two d20s and using the higher result.",
  },
  {
    question: "What is Disadvantage?",
    answer:
      "Disadvantage means rolling two d20s and using the lower result. Current D&D rules also state that Advantage and Disadvantage cancel when both apply to the same D20 Test.",
  },
  {
    question: "How much does Advantage change the chance of a natural 20?",
    answer:
      "A normal d20 has a 5% chance of a 20. With two d20s and the higher result kept: 1 - (19 / 20)² = 39 / 400 = 9.75%. The calculator verifies the 9.75% value.",
  },
  {
    question: "What does 4d6kh3 mean?",
    answer:
      "It means rolling four d6s and keeping the highest three. This is the random-ability-score method in the current D&D Basic Rules.",
  },
  {
    question: "What is the average 4d6 drop-lowest score?",
    answer:
      "The exact mean of 4d6kh3 is approximately 12.2446. The calculator's exact PMF confirms that result.",
  },
  {
    question: "What is the chance of getting 13 or higher with 4d6 drop lowest?",
    answer:
      "There are 632 successful ordered outcomes among 1,296 total outcomes: 632 / 1296 ≈ 48.765%. So the probability is approximately 48.8%.",
  },
  {
    question: "What is an exploding die?",
    answer:
      "An exploding die adds another roll whenever the die produces its maximum face, according to the specific exploding-dice rule being used.",
  },
  {
    question: "Is the exploding-dice probability exact?",
    answer:
      "For the calculator's exploding-dice visualization, the distribution is explicitly labeled as simulated rather than exact, using a 50,000-trial simulation.",
  },
  {
    question: "What is a d100?",
    answer:
      "A d100 is a percentile result with values from 1 through 100. The calculator models it as a discrete uniform distribution over that range.",
  },
  {
    question: "Why does 2d6 have a bell-shaped curve?",
    answer:
      "Middle totals have more possible dice combinations than extreme totals. Seven has six combinations, while two and twelve each have only one, creating the familiar triangular/central peak.",
  },
  {
    question: "What is a PMF?",
    answer:
      "PMF means Probability Mass Function. It gives the probability associated with each possible outcome of a discrete random variable.",
  },
  {
    question: "What is the variance of a d6?",
    answer:
      "For a fair d6: Var(X) = (6² - 1) / 12 = 35 / 12 ≈ 2.9167. The calculator verifies this value.",
  },
  {
    question: "Does a high recent roll mean a low roll is “due”?",
    answer:
      "No. Independent fair rolls do not compensate for previous outcomes. A sequence such as several 20s in a row does not mathematically force the next roll to be low.",
  },
  {
    question: "Is this calculator using cryptographically secure randomness?",
    answer:
      "When the browser's Web Crypto random source is available, the calculator uses it with rejection sampling. The current UI describes this as Cryptographically Secure Randomness rather than 'Hardware Random.' MDN describes getRandomValues() as producing cryptographically strong random values.",
  },
  {
    question: "Does CSPRNG mean the dice are physically random?",
    answer:
      "No. Web Crypto provides cryptographically strong pseudorandom generation; it is not the same statement as saying the browser is sourcing every bit directly from a physical hardware random-number generator.",
  },
  {
    question: "Can a saltwater test prove a physical die is fair?",
    answer:
      "No. A saltwater test may provide information about density or mass asymmetry, but it cannot certify overall fairness because geometry, edges, pips and rolling dynamics can also matter.",
  },
  {
    question: "Can I use this roller for any TTRPG?",
    answer:
      "It supports the dice expressions implemented by the calculator, but game systems can interpret mechanics differently. Always compare an advanced mechanic with the specific ruleset you are playing.",
  },
  {
    question: "Why does my PMF change when I add +5?",
    answer:
      "A constant modifier shifts every possible result upward by five. It changes the support and mean but does not change the underlying variance or probability shape. The calculator verifies this for 4d6kh3+5.",
  },
  {
    question: "Why can the expected value be a decimal?",
    answer:
      "Expected value is a theoretical long-run average. A d20 can only produce integers, but its expected value is 10.5 because the average of its equally likely faces is 10.5.",
  },
  {
    question: "Why does the calculator reject malformed formulas instead of guessing?",
    answer:
      "Because silently converting invalid notation into another formula can produce a mathematically valid answer to the wrong question. The parser therefore rejects malformed inputs such as 2d, 2.5d6, 0d6 and 2d6++.",
  },
];
