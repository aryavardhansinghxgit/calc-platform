import { CalculatorFAQ } from "@/calculators/types";

export const dice_rollerFaqs: CalculatorFAQ[] = [
  {
    question: "How is an online digital dice roller truly random?",
    answer:
      "Our digital dice roller utilizes a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) powered by the browser-native window.crypto.getRandomValues API. Unlike standard Math.random() functions which use predictable pseudo-random algorithms (such as Linear Congruential Generators), CSPRNG algorithms draw entropy directly from operating system hardware noise (such as CPU clock jitters and thermal noise) to guarantee non-repeating, unbiased, and mathematically uniform random outcomes across every face.",
  },
  {
    question: "What is the most likely number when rolling two 6-sided dice (2d6)?",
    answer:
      "The number 7 is the single most probable outcome when rolling two 6-sided dice (2d6), with a probability of 6 in 36 or exactly 16.67%. This occurs because 7 has the highest number of unique permutations: (1+6), (2+5), (3+4), (4+3), (5+2), and (6+1). In comparison, extreme rolls like 2 (1+1) or 12 (6+6) have only a 1 in 36 chance (2.78%).",
  },
  {
    question: "What is the average result of rolling a 20-sided die (d20)?",
    answer:
      "The expected value (mathematical average) of a single fair 20-sided die (d20) is exactly 10.5. This is calculated using the uniform discrete expectation formula E[X] = (n + 1) / 2, where n is the number of sides: (1 + 20) / 2 = 10.5. Over a large sample size of d20 rolls, the arithmetic mean will converge to 10.5.",
  },
  {
    question: "How much does 'Advantage' improve your roll in Dungeons & Dragons (5e)?",
    answer:
      "In D&D 5e, Advantage (rolling 2d20 and keeping the highest result) increases the expected average roll from 10.5 up to 13.825—a massive +3.325 numerical boost. More importantly, Advantage dramatically lowers the chance of rolling a natural 1 from 5.0% down to 0.25%, while increasing the probability of hitting a natural 20 critical from 5.0% up to 9.75%. In practical gameplay against standard Armor Class (AC) targets, Advantage acts equivalent to a +3.3 to +5.0 bonus to hit.",
  },
  {
    question: "What does dice notation like '4d6kh3' mean?",
    answer:
      "Dice notation like '4d6kh3' is shorthand used in tabletop RPGs for ability score character generation. It means: roll four 6-sided dice (4d6) and Keep Highest 3 (kh3), discarding the single lowest die. This mechanic shifts the average roll from 10.5 (on standard 3d6) up to 12.24, skewing the stats toward higher, more heroic character attributes.",
  },
  {
    question: "What are polyhedral dice and what are they used for?",
    answer:
      "Polyhedral dice are geometric multi-sided dice based on regular Platonic solids and isometric shapes. The standard 7-die tabletop roleplaying set consists of d4 (tetrahedron), d6 (cube), d8 (octahedron), d10 (pentagonal trapezohedron), d12 (dodecahedron), d20 (icosahedron), and d100 (percentile tens die). They are used in tabletop systems like Dungeons & Dragons, Pathfinder, Call of Cthulhu, and Warhammer to resolve skill checks, attack rolls, and variable weapon damage.",
  },
  {
    question: "What are 'Exploding Dice' in tabletop games?",
    answer:
      "Exploding dice (notated as '!' e.g., '3d6!') is a game mechanic where rolling the maximum possible face value on a die allows the player to immediately roll an additional bonus die and add it to the running total. If the bonus die also rolls maximum, it continues to 'explode' repeatedly. This introduces high-variance dramatic moments in games like Savage Worlds, Shadowrun, and HackMaster.",
  },
  {
    question: "Why do physical dice sometimes roll certain numbers more often?",
    answer:
      "Physical dice frequently suffer from manufacturing biases. Injection-molded plastic dice often contain microscopic internal air bubbles, unrounded tumbling corners, or unevenly carved pips filled with paint that alter the die's center of gravity. Precision casino dice are translucent, cell-cast acrylic with flush-milled pips to prevent any statistical weight bias.",
  },
  {
    question: "What is the probability of rolling a 'Natural 20' on a d20?",
    answer:
      "The probability of rolling a Natural 20 on a single fair 20-sided die is exactly 1 in 20, or 5.0%. The odds of rolling two Natural 20s back-to-back on consecutive single rolls is 1 in 400 (0.25%), while rolling three consecutive Natural 20s occurs with a probability of 1 in 8,000 (0.0125%).",
  },
  {
    question: "How do percentile dice (d100) work?",
    answer:
      "Percentile rolling uses two 10-sided dice rolled together: a tens-digit die (marked 00, 10, 20, ..., 90) and a single-digit die (marked 0, 1, 2, ..., 9). Rolling '70' and '4' yields a total of 74. A roll of '00' and '0' is conventionally treated as 100%. This generates a perfectly uniform random percentage from 1% to 100%.",
  },
];
