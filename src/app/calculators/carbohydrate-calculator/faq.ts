export interface FAQItem {
  question: string;
  answer: string;
}

export const carbohydrate_calculatorFaqs: FAQItem[] = [
  {
    question: "How many carbs should I eat per day?",
    answer:
      "There is no single carbohydrate target that applies to everyone. A useful starting point depends on your calorie requirement, activity level, fitness goal and chosen macronutrient distribution. This calculator estimates grams from those inputs.",
  },
  {
    question: "How does a carbohydrate calculator work?",
    answer:
      "The calculator first estimates energy needs, applies the selected goal and carbohydrate allocation, and converts the resulting carbohydrate calories into grams using approximately 4 kcal per gram.",
  },
  {
    question: "How many carbs should I eat to lose weight?",
    answer:
      "Weight loss generally requires a sustained calorie deficit. The carbohydrate portion of that calorie intake can vary. Some people prefer lower carbohydrate intake, while others perform better with moderate or higher carbohydrate intake. The calculator lets you model different approaches.",
  },
  {
    question: "How many carbs should I eat to gain muscle?",
    answer:
      "Muscle gain usually involves adequate energy, protein, resistance training and recovery. Carbohydrates can provide useful training fuel, particularly when training volume is high. Your carbohydrate target can therefore be increased while maintaining an appropriate overall calorie and protein plan.",
  },
  {
    question: "What is the difference between total carbs and net carbs?",
    answer:
      "Total carbohydrate is the carbohydrate quantity reported on the Nutrition Facts label. “Net carbs” is a commonly used tracking convention that often subtracts fiber and some sugar alcohols from total carbohydrate. The term does not have a legal standardized definition.",
  },
  {
    question: "Is 130 grams of carbs per day the ideal amount?",
    answer:
      "No. The 130 g/day adult carbohydrate RDA is a Dietary Reference Intake value, not a universal personalized target. Individual needs can be higher or lower depending on energy intake, activity and other factors.",
  },
  {
    question: "What is the 45–65% carbohydrate range?",
    answer:
      "The 45–65% range is the traditional adult Acceptable Macronutrient Distribution Range in the U.S. Dietary Reference Intake framework. It describes a population-level distribution range, not a requirement that every person consume carbohydrates within that exact percentage.",
  },
  {
    question: "What is the FDA Daily Value for carbohydrates?",
    answer:
      "The FDA currently lists 275 g as the Daily Value for total carbohydrate, based on a 2,000-calorie reference diet. Individual calorie and nutrient needs may be different.",
  },
  {
    question: "What is glycemic load?",
    answer:
      "Glycemic load combines a food's glycemic index with the amount of available carbohydrate in the serving. A commonly used equation is GI × available carbohydrate ÷ 100.",
  },
  {
    question: "Does glycemic load depend on serving size?",
    answer:
      "Yes. Because GL incorporates the amount of available carbohydrate consumed, changing the serving amount can change GL even when the food's GI remains the same.",
  },
  {
    question: "Does this calculator assign one glycemic load to my whole diet?",
    answer:
      "No. Glycemic load in this calculator is food- and serving-specific. When no food is selected, the calculator does not create a fictional daily GL number.",
  },
  {
    question: "What is a low-carb diet?",
    answer:
      "Low-carb describes a broad family of dietary patterns with carbohydrate intake below a person's usual intake. There is no single universally applicable threshold for every dietary purpose. Ketogenic diets are generally much lower in carbohydrate than ordinary lower-carb diets.",
  },
  {
    question: "Is a low-carb diet better for weight loss?",
    answer:
      "Not automatically. Weight loss depends substantially on sustained energy balance and adherence. Lower-carb diets can work well for some people, while other people prefer moderate or higher carbohydrate intake.",
  },
  {
    question: "What is a ketogenic diet?",
    answer:
      "A ketogenic diet is a very-low-carbohydrate dietary pattern intended to promote nutritional ketosis. Achieving ketosis is not determined solely by a carbohydrate calculator because individual physiology, activity, fasting and total food intake also matter.",
  },
  {
    question: "Should athletes eat more carbohydrates?",
    answer:
      "Athletes with greater training demands often have higher carbohydrate requirements, especially during prolonged endurance work. Sports nutrition recommendations are commonly expressed in grams per kilogram and adjusted to training load.",
  },
  {
    question: "What is carbohydrate cycling?",
    answer:
      "Carbohydrate cycling varies carbohydrate intake across different days, often according to training demand. It is a planning strategy rather than a requirement for weight loss or muscle gain.",
  },
  {
    question: "Are all carbohydrate foods equally healthy?",
    answer:
      "No. Carbohydrate quality matters. WHO guidance emphasizes whole grains, vegetables, fruits and pulses and highlights dietary fiber and overall carbohydrate quality.",
  },
  {
    question: "Does fiber count as carbohydrate?",
    answer:
      "Yes. Dietary fiber is included within total carbohydrate on the U.S. Nutrition Facts label, even though it differs physiologically from digestible carbohydrate.",
  },
  {
    question: "Should I subtract all sugar alcohols from total carbs?",
    answer:
      "Not necessarily. Sugar alcohols differ in absorption and metabolism, so completely subtracting every sugar alcohol is an approximation used in some tracking systems.",
  },
  {
    question: "Why does my carb target change when I change my BMR formula?",
    answer:
      "Different BMR equations can produce different estimates of resting energy expenditure. Because the carbohydrate target may be derived from the resulting calorie requirement, changing the BMR equation can change the final carbohydrate number.",
  },
  {
    question: "Why does my calculated carb target differ from another calculator?",
    answer:
      "Different calculators may use different BMR equations, activity multipliers, calorie assumptions, carbohydrate percentages, rounding conventions and dietary definitions. Compare the methodology, not just the final number.",
  },
  {
    question: "Should I follow my calculator result exactly?",
    answer:
      "No. Treat it as a starting estimate. Your actual response over time—body-weight trend, training performance, hunger, recovery and adherence—can help determine whether the target should be adjusted.",
  },
  {
    question: "Does eating fewer carbohydrates automatically mean eating fewer calories?",
    answer:
      "No. Reducing carbohydrate calories does not necessarily reduce total calorie intake if those calories are replaced with fat or protein.",
  },
  {
    question: "Can I use this calculator for diabetes?",
    answer:
      "The calculator can provide general carbohydrate estimates, but it should not replace individualized diabetes education or medical advice. The ADA recommends attention to total carbohydrate rather than relying on the non-standardized “net carbs” term.",
  },
];
