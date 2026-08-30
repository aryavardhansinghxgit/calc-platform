import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const lean_body_mass_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is lean body mass?",
    answer: "Lean body mass is a commonly used term for the non-fat portion of body weight. In modern body-composition terminology, fat-free mass (FFM) is generally the more precise term. It includes much more than skeletal muscle, including water and other non-fat tissues."
  },
  {
    question: "How is lean body mass calculated?",
    answer: "This calculator estimates LBM using established anthropometric equations based primarily on height and body weight, with sex-specific coefficients where required. Adults can be evaluated with Boer, James, Hume and Janmahasatian equations, while eligible children use the Peters pediatric model."
  },
  {
    question: "What is the Boer formula?",
    answer: "The Boer equation estimates lean body mass from body weight and height. For men it is 0.407 × weight + 0.267 × height − 19.2, using kilograms and centimeters. For women it uses different published coefficients. The equation was published by P. Boer in 1984."
  },
  {
    question: "What is the James formula?",
    answer: "The James equation estimates lean body mass using body weight and a squared weight-to-height relationship. It differs mathematically from the linear Boer and Hume models, so it can produce a different result for the same person."
  },
  {
    question: "What is the Hume formula?",
    answer: "The Hume equation was published in 1966 and estimates lean body mass from height and weight using separate male and female equations. The original study developed these relationships from body-water-related measurements."
  },
  {
    question: "What is the Janmahasatian formula?",
    answer: "The Janmahasatian model was published in 2005 as a semi-mechanistic method of estimating fat-free mass. Its equation incorporates body weight and BMI and was designed to improve estimation across a wider range of body sizes."
  },
  {
    question: "What is the Peters pediatric LBM formula?",
    answer: "The Peters model was developed specifically to estimate lean body mass in children. It first estimates extracellular fluid volume from height and weight and then converts that value to estimated lean body mass using a factor of approximately 3.8."
  },
  {
    question: "Why do LBM formulas give different answers?",
    answer: "They were derived from different research populations and use different mathematical relationships. Differences are therefore expected. A formula comparison can be more informative than assuming one equation is universally correct."
  },
  {
    question: "Is lean body mass the same as muscle mass?",
    answer: "No. LBM or FFM includes non-fat components beyond skeletal muscle. A calculator based on height and weight cannot directly determine how much of your estimated lean mass is skeletal muscle."
  },
  {
    question: "Is lean body mass the same as fat-free mass?",
    answer: "They are often treated as equivalent in everyday calculator usage, but modern scientific terminology favors fat-free mass because “lean body mass” can be ambiguous. The exact definition depends on the body-composition model being used."
  },
  {
    question: "How accurate are LBM equations?",
    answer: "They are useful prediction equations, but they are not direct measurements. Accuracy varies between individuals and populations. The formulas should therefore be treated as estimates rather than exact measurements of body composition."
  },
  {
    question: "Does height affect lean body mass?",
    answer: "Yes. Height appears directly in the Boer, James and Hume equations and indirectly through BMI in the Janmahasatian model."
  },
  {
    question: "Does body weight affect lean body mass?",
    answer: "Yes. Body weight is a core input in all of the adult equations used by this calculator. However, an increase in body weight does not automatically mean an equivalent increase in muscle."
  },
  {
    question: "Can adult LBM formulas be used for children?",
    answer: "Adult equations should not simply be assumed to apply to children. This calculator uses a separate Peters pediatric pathway for eligible children and switches to adult equations after the defined pediatric age boundary. The Peters study specifically investigated lean-body-mass estimation in children."
  },
  {
    question: "Why does my LBM differ from another calculator?",
    answer: "The other calculator may use a different equation, different coefficients, different age rules, different definitions or different rounding. Compare the underlying methodology before concluding that one result is wrong."
  },
  {
    question: "Is a higher LBM always better?",
    answer: "Not necessarily. LBM is a body-composition estimate, not a health score. Interpretation depends on overall body composition, physical function, health status, age and context."
  },
  {
    question: "Can I use LBM to track muscle gain?",
    answer: "It can be used as a rough reference when the same method and conditions are used consistently. However, changes in estimated LBM do not prove that skeletal muscle has changed by the same amount."
  },
  {
    question: "What is fat-free mass?",
    answer: "Fat-free mass is the body mass excluding fat. Modern body-composition standards recommend FFM as the preferred precise term for this body compartment."
  },
  {
    question: "Should I use one LBM formula or several?",
    answer: "For educational comparison, several can be useful because they show how sensitive the estimate is to the chosen equation. This calculator displays multiple adult equations specifically to make that difference visible."
  },
  {
    question: "What should I do when formulas disagree substantially?",
    answer: "Treat the disagreement as uncertainty rather than choosing whichever result you prefer. A larger spread indicates that equation-based estimates should be interpreted cautiously, especially if accurate body-composition measurement matters."
  }
];
