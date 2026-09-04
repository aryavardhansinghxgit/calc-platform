import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const permutation_combination_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the fundamental difference between a permutation and a combination?",
    answer:
      "The fundamental difference is order. In a permutation, the sequence or arrangement order matters (e.g., a 4-digit PIN where 1-2-3-4 is distinct from 4-3-2-1, or 1st, 2nd, and 3rd place in a race). In a combination, order is completely irrelevant and only membership matters (e.g., a 5-card poker hand or selecting a 3-person subcommittee where Alice, Bob, and Charlie is identical to Charlie, Alice, and Bob). Mathematically, because every subset of r items can be arranged in r! ways, the number of permutations is always r! times greater than the number of combinations: P(n, r) = r! × C(n, r)."
  },
  {
    question: "Why is 0! (zero factorial) mathematically defined as 1?",
    answer:
      "There are two primary mathematical reasons why 0! = 1. First, combinatorially, 0! represents the number of distinct ways to arrange an empty set of zero objects; there is exactly one way to arrange nothing. Second, algebraically, the recursive identity for factorials is n! = (n + 1)! / (n + 1). Setting n = 0 gives 0! = 1! / 1 = 1 / 1 = 1. This definition ensures that fundamental combinatoric formulas remain unified: for example, choosing all n items from n gives C(n, n) = n! / [n! × (n - n)!] = n! / [n! × 0!] = 1 / 1 = 1."
  },
  {
    question: "When should I use combinations with repetition (Stars and Bars)?",
    answer:
      "Use combinations with repetition when you are selecting r items from n distinct categories, but each category has an unlimited supply or can be chosen multiple times, and the selection order does not matter. Classic examples include buying a dozen donuts when 5 varieties are available, distributing 10 identical coins among 3 children, or rolling 4 identical dice. The formula is C(n + r - 1, r) = (n + r - 1)! / [r! × (n - 1)!], which mathematically maps to arranging r identical items ('stars') and n - 1 dividers ('bars')."
  },
  {
    question: "How do permutations with replacement (n^r) apply to passwords and PINs?",
    answer:
      "When order matters and identical elements can be reused repeatedly across positions, each of the r positions has n independent choices. By the Fundamental Counting Principle, total arrangements equal n × n × ... × n = n^r. For instance, a 4-digit PIN made of digits 0–9 has 10^4 = 10,000 possibilities. An 8-character alphanumeric password (26 lowercase + 26 uppercase + 10 digits = 62 character space) has 62^8 ≈ 218.34 trillion combinations, illustrating how exponentially password entropy scales."
  },
  {
    question: "How do circular permutations differ from linear permutations, and when do you divide by 2?",
    answer:
      "In a linear row, shifting everyone one position to the right creates a new arrangement because ends exist. In a circle, rotating all seats maintains the exact same relative neighbors. Because an n-seat circular arrangement has n rotational equivalents, we divide the linear arrangements by n: n! / n = (n - 1)!. However, if the circular object can be flipped over in three-dimensional space—such as beads on a necklace or keys on a key ring—clockwise and counterclockwise arrangements become physically indistinguishable (reflective symmetry). In that case, we divide by an additional factor of 2: (n - 1)! / 2."
  },
  {
    question: "What is a derangement (!n), and why does the probability approach 1/e ≈ 36.79%?",
    answer:
      "A derangement (denoted !n or subfactorial) is a permutation of n elements where no single element appears in its original position (zero fixed points). A famous example is the 'Secret Santa' hat-draw where nobody is allowed to draw their own name. Calculated via the inclusion-exclusion principle as !n = n! × Σ [(-1)^k / k!] from k=0 to n, the ratio !n / n! rapidly converges as n grows to the Taylor series expansion of e^(-1) = 1/e ≈ 0.367879 (36.79%). Even for modest n like 5 or 7, the probability that a random shuffle leaves nobody in their original spot is nearly 36.8%."
  },
  {
    question: "How does Pascal's Triangle relate to combinations and binomial expansion?",
    answer:
      "Every entry in Pascal's Triangle is an exact binomial coefficient C(n, k), where n is the row number (starting at 0) and k is the column position. The famous triangular addition rule—that each interior number equals the sum of the two numbers directly above it—is Pascal's Identity: C(n, k) = C(n - 1, k - 1) + C(n - 1, k). Furthermore, the row sum of the n-th row equals Σ C(n, k) = 2^n, which represents the total number of subsets (the power set) of a set with n elements."
  },
  {
    question: "How does the Hypergeometric Distribution use combinations to model card hands and lotteries?",
    answer:
      "The hypergeometric distribution calculates the exact probability of obtaining exactly k successes in n draws from a finite population of size N containing K total successes, without replacement. It uses combinations to evaluate the ratio of favorable hands to total hands: P(X = k) = [C(K, k) × C(N - K, n - k)] / C(N, n). For example, finding the probability of being dealt exactly 2 hearts (k = 2) in a 5-card poker hand (n = 5) from a standard 52-card deck (N = 52, K = 13 hearts) yields [C(13, 2) × C(39, 3)] / C(52, 5) = [78 × 9,139] / 2,598,960 ≈ 27.43%."
  },
  {
    question: "What are multiset permutations, and how do duplicate items reduce total arrangements?",
    answer:
      "When a collection contains indistinguishable identical items, swapping identical items produces no visible difference in arrangement. To avoid overcounting, we divide the total factorial n! by the product of the factorials of each character's frequency: n! / (n1! × n2! × ... × nk!). In the classic 11-letter word 'MISSISSIPPI' (1 M, 4 I, 4 S, 2 P), the total arrangements are not 11! = 39,916,800, but rather 11! / [1! × 4! × 4! × 2!] = 39,916,800 / [1 × 24 × 24 × 2] = 34,650."
  },
  {
    question: "How do permutations and combinations apply to lottery games like Powerball and Mega Millions?",
    answer:
      "Lotteries are pure combinations because the order in which white balls are drawn from the hopper does not matter on your ticket. In Powerball, choosing 5 white balls from 69 requires C(69, 5) = 11,238,513 combinations. Choosing 1 red Powerball from 26 gives 26 independent options. Multiplying them together using the Fundamental Counting Principle gives 11,238,513 × 26 = 292,201,338 possible tickets. Because every ticket is equally likely, the exact jackpot probability is 1 in 292,201,338."
  },
  {
    question: "Why does C(n, r) = C(n, n - r) always hold true?",
    answer:
      "This symmetry identity holds both algebraically and intuitively. Algebraically, C(n, n - r) = n! / [(n - r)! × (n - (n - r))!] = n! / [(n - r)! × r!], which is identical to C(n, r). Intuitively, whenever you select r items to include in a committee from a pool of n candidates, you are simultaneously selecting n - r candidates to leave behind. Choosing 2 people out of 10 to participate is mathematically identical to choosing the 8 people who will not: C(10, 2) = C(10, 8) = 45."
  },
  {
    question: "Why do large combinatorial calculations require BigInt arithmetic?",
    answer:
      "Standard JavaScript numbers follow IEEE-754 64-bit floating-point format, which only supports exact integers up to 2^53 - 1 (9,007,199,254,740,991, or roughly 15-16 decimal digits). Because factorials grow extraordinarily fast—for instance, 20! is roughly 2.43 × 10^18, and 100! has 158 digits—standard floating-point operations immediately lose precision, rounding least-significant digits to zero. Arbitrary-precision BigInt arithmetic computes factorials and combinatoric products with 100% exact integer integrity, regardless of digit length."
  }
];
