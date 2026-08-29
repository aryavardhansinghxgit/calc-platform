export interface FAQItem {
  question: string;
  answer: string;
}

export const macro_calculatorFaqs: FAQItem[] = [
  {
    question: "What is a macro calculator?",
    answer: "A macro calculator estimates daily calorie needs and divides those calories among protein, carbohydrates and fat according to a selected macro ratio."
  },
  {
    question: "How accurate is a macro calculator?",
    answer: "It provides an estimate, not a direct measurement. Its accuracy depends on the BMR equation, activity assumptions, quality of the inputs and individual differences in energy expenditure."
  },
  {
    question: "What does BMR mean?",
    answer: "BMR stands for Basal Metabolic Rate. It is an estimate of the energy required to maintain essential physiological functions at rest."
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer: "BMR estimates resting energy requirements. TDEE represents total daily energy expenditure after accounting for physical activity and other sources of daily energy use."
  },
  {
    question: "Which BMR formula should I use?",
    answer: "Mifflin-St Jeor is a widely used starting point for adults when body-fat information is unavailable. Equations using lean body mass can be useful when reliable body-composition data are available."
  },
  {
    question: "How many calories are in a gram of protein?",
    answer: "Protein provides approximately 4 kcal per gram under the standard Atwater general-factor system."
  },
  {
    question: "How many calories are in a gram of carbohydrates?",
    answer: "Carbohydrates provide approximately 4 kcal per gram."
  },
  {
    question: "How many calories are in a gram of fat?",
    answer: "Fat provides approximately 9 kcal per gram."
  },
  {
    question: "What macro ratio is best for weight loss?",
    answer: "There is no universal best ratio. A sustainable calorie deficit is central to weight loss, while protein, carbohydrate and fat can be distributed according to individual preference, training and nutritional needs."
  },
  {
    question: "How much protein should I eat per day?",
    answer: "The general adult protein RDA is approximately 0.8 g/kg/day, while established adult protein intake ranges span 10–35% of total energy. Individual training and dietary requirements may justify different targets."
  },
  {
    question: "Should I use a high-protein macro split?",
    answer: "A high-protein split can be useful in some situations, particularly when dieting or resistance training, but a very high percentage is not automatically better. Total calories and overall nutritional adequacy still matter."
  },
  {
    question: "What are keto macros?",
    answer: "Keto macros generally use very low carbohydrate intake with a higher proportion of calories from fat. Exact ratios vary depending on the ketogenic diet and its purpose."
  },
  {
    question: "What is a calorie deficit?",
    answer: "A calorie deficit occurs when energy intake is lower than energy expenditure over time."
  },
  {
    question: "What is a calorie surplus?",
    answer: "A calorie surplus occurs when energy intake exceeds energy expenditure over time."
  },
  {
    question: "Can I use this calculator for bodybuilding?",
    answer: "Yes, as a planning tool. Bodybuilding nutrition often requires individualized adjustments based on training frequency, body weight, body composition, performance and the current phase of dieting."
  },
  {
    question: "Why are my results different from another calculator?",
    answer: "Different calculators may use different BMR equations, activity multipliers, goal adjustments and macro ratios. Different assumptions naturally produce different outputs."
  },
  {
    question: "Why am I not losing weight at my calculated calorie target?",
    answer: "The calculated target may differ from your actual maintenance intake. Activity estimates, food-tracking errors, changes in expenditure and normal scale fluctuations can all contribute."
  },
  {
    question: "Should I recalculate macros when my weight changes?",
    answer: "Yes, a substantial change in body weight or activity can change estimated energy requirements. Recalculating after meaningful changes is generally more useful than changing targets every few days."
  },
  {
    question: "What is lean body mass?",
    answer: "Lean body mass is the portion of body weight that is not body fat. It includes muscle, bone, organs, water and other non-fat tissues."
  },
  {
    question: "Is body-fat percentage necessary for calculating macros?",
    answer: "No. Many macro calculations can use body weight without body-fat information. Body-fat percentage becomes particularly relevant when using formulas based on lean body mass."
  },
  {
    question: "Are the calorie projections exact?",
    answer: "No. They are modeled scenarios. Real-world body weight does not follow a perfectly linear trajectory because energy expenditure changes over time."
  },
  {
    question: "How often should I change my macros?",
    answer: "Change them when your body weight, activity, training demands or goal changes materially. Avoid reacting to short-term fluctuations in body weight."
  },
  {
    question: "Does eating more protein automatically build more muscle?",
    answer: "No. Protein supports muscle protein synthesis, but muscle gain also depends on appropriate resistance training, energy availability, recovery and other factors."
  },
  {
    question: "Can vegetarians and vegans use a macro calculator?",
    answer: "Yes. The mathematical macro calculation is independent of whether protein comes from animal or plant foods. The important consideration is meeting overall nutrient requirements with appropriate food choices."
  },
  {
    question: "What is the 3,500-calorie rule?",
    answer: "It is a traditional approximation linking a cumulative 3,500 kcal deficit with roughly one pound of body weight. Modern dynamic models show that human weight change is more complicated than this simple rule suggests."
  },
  {
    question: "Is a macro calculator medical advice?",
    answer: "No. It is an educational planning tool. Individual nutritional needs can be affected by medical conditions, medications, pregnancy, eating disorders and specialized athletic requirements."
  }
];
