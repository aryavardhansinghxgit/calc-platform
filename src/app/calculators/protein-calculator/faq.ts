export interface FAQItem {
  question: string;
  answer: string;
}

export const protein_calculatorFaqs: FAQItem[] = [
  {
    question: "How much protein do I need per day?",
    answer:
      "There is no single protein number that is ideal for everyone. The adult RDA is approximately 0.8 g/kg/day, while people who exercise regularly commonly use higher targets. Sports-nutrition guidance frequently falls around 1.2–2.0 g/kg/day, depending on the person and activity.",
  },
  {
    question: "Is 0.8 g/kg enough protein?",
    answer:
      "The 0.8 g/kg/day RDA is the established adult population reference for healthy adults. It should not be interpreted as a maximum or necessarily as the best target for athletes, people dieting, or other groups with different nutritional objectives.",
  },
  {
    question: "How much protein should I eat to build muscle?",
    answer:
      "Resistance-trained people often use protein intakes above the adult RDA. A commonly cited range for exercising individuals is roughly 1.4–2.0 g/kg/day, although the appropriate amount depends on training, energy intake, body composition and individual circumstances.",
  },
  {
    question: "Should I eat more protein when losing weight?",
    answer:
      "A higher protein intake is commonly used during calorie restriction to help support retention of lean tissue, particularly when combined with resistance training. The exact amount depends on the person's body composition, calorie deficit, training and health status.",
  },
  {
    question: "How much protein should I eat per meal?",
    answer:
      "A simple planning method is to divide the daily target by the number of meals. For example, 120 g/day divided across four meals gives 30 g per meal. The calculator performs this division automatically.",
  },
  {
    question: "What is the leucine target?",
    answer:
      "Leucine is an essential amino acid involved in signaling associated with muscle protein synthesis. The calculator provides a simplified per-meal leucine estimate based on its protein model. The displayed value should be treated as a planning estimate rather than a guarantee of a particular muscle-building response.",
  },
  {
    question: "Is more protein always better?",
    answer:
      "No. Protein is important, but increasing protein indefinitely does not automatically improve health or muscle growth. The useful target depends on total diet, energy intake, exercise, body composition and individual health.",
  },
  {
    question: "Do older adults need more protein?",
    answer:
      "Older adults may benefit from higher protein intake than the adult RDA, particularly when maintaining muscle and physical function is a priority. ESPEN guidance recommends at least 1.0 g/kg/day for older adults and notes commonly suggested ranges around 1.0–1.2 g/kg/day for healthy older people.",
  },
  {
    question: "Do athletes need more protein than sedentary adults?",
    answer:
      "Often, yes. Exercise increases the need for tissue repair and adaptation, and sports-nutrition organizations commonly recommend higher protein intakes for exercising individuals than the sedentary-adult RDA.",
  },
  {
    question: "Can I get enough protein from plant foods?",
    answer:
      "Yes. A varied plant-based diet can provide adequate protein. Soy foods, legumes, grains, nuts, seeds and other plant foods can contribute substantially to total intake. The overall amino-acid and protein quality of the dietary pattern matters more than labeling individual foods simply as 'complete' or 'incomplete.'",
  },
  {
    question: "How many calories are in protein?",
    answer:
      "Protein provides approximately 4 kcal per gram. Therefore, 100 g of protein contributes about 400 kcal.",
  },
  {
    question: "Should I use my total body weight or lean body mass?",
    answer:
      "For many general protein calculations, body weight is the simplest input. In people with substantially different body composition, a lean-mass-based approach may sometimes be more informative, but it depends on the population and the purpose of the calculation. There is no single body-weight method that is optimal for every person.",
  },
  {
    question: "Does protein timing matter?",
    answer:
      "Total daily protein intake is an important foundation. Distributing protein across the day can also be useful, especially for people trying to support muscle maintenance or growth. Meal timing should be viewed as part of an overall nutrition strategy rather than as a substitute for adequate daily intake.",
  },
  {
    question: "Should I recalculate my protein target after losing weight?",
    answer:
      "Usually, it is sensible to review the calculation after a meaningful change in body weight, training volume or goal. Because many protein formulas scale with body weight, a substantial weight change can alter the resulting target.",
  },
  {
    question: "Is this calculator a medical or clinical protein prescription?",
    answer:
      "No. It is an educational planning calculator. Its output is an estimate based on mathematical and nutritional assumptions and should not replace individualized medical or dietetic advice.",
  },
];
