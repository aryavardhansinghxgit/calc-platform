import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const calories_burned_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What does MET mean?",
    answer: "MET stands for Metabolic Equivalent of Task. It is a standardized way of expressing the energy cost of physical activity relative to the conventional resting reference of 1 MET."
  },
  {
    question: "How does this calculator estimate calories burned?",
    answer: "It combines the selected activity's MET value with body weight and activity duration using the standard MET calorie conversion: kcal/min = (MET × 3.5 × weight in kg) / 200. The result is then multiplied by duration."
  },
  {
    question: "Does a higher MET mean more calories burned?",
    answer: "Generally, yes, when body weight and exercise duration are held constant. A higher MET represents a higher standardized activity intensity, so the calculated calorie expenditure increases."
  },
  {
    question: "Does body weight affect calories burned?",
    answer: "Yes. Body weight is directly included in the calculation. With the same activity and duration, the model produces a higher calorie estimate for a higher body weight."
  },
  {
    question: "Does exercise duration affect calorie expenditure?",
    answer: "Yes. Holding MET and weight constant, estimated calorie expenditure increases linearly with duration."
  },
  {
    question: "How does the distance mode calculate exercise time?",
    answer: "The calculator derives duration from distance and speed: minutes = (distance / speed) × 60. It then applies the selected activity's MET value."
  },
  {
    question: "How accurate is a MET calorie estimate?",
    answer: "It is an estimate rather than a direct measurement. The Compendium warns that standard MET values were developed for standardized activity classification and are not intended to determine the precise energy cost for every individual."
  },
  {
    question: "Why can two calorie calculators give different results?",
    answer: "Different calculators may use different activity MET values, formulas, assumptions, unit conversions, or methods for estimating exercise intensity. A wearable may also use heart rate and proprietary algorithms rather than a standardized MET calculation."
  },
  {
    question: "Why is my fitness watch showing a different calorie number?",
    answer: "Wearable devices and MET calculators do not necessarily use the same inputs or equations. A watch may use heart rate, GPS, motion sensors and proprietary models, while this calculator uses standardized activity MET values."
  },
  {
    question: "How many calories does walking burn?",
    answer: "There is no single number for walking. Calorie expenditure depends on body weight, duration and walking intensity. The Compendium provides different MET values for different walking speeds and conditions."
  },
  {
    question: "How many calories does running burn?",
    answer: "Running calorie expenditure depends on body weight, duration, speed and the selected activity category. The Compendium contains multiple running classifications, so the appropriate MET value can vary with pace and conditions."
  },
  {
    question: "Does burning calories automatically mean losing body fat?",
    answer: "No. Exercise energy expenditure contributes to overall energy balance, but a single exercise session cannot be translated directly into a measured amount of body-fat loss."
  },
  {
    question: "What is the 3,500-calorie rule?",
    answer: "The traditional 3,500-kcal-per-pound figure is an energy-equivalence planning heuristic. It should not be interpreted as a precise biological rule for predicting individual fat loss."
  },
  {
    question: "Why does the calculator show an energy-equivalent fat value?",
    answer: "It converts the estimated exercise energy expenditure into a traditional energy-equivalence figure for context. This is a planning estimate, not a measurement of how much adipose tissue was actually oxidized."
  },
  {
    question: "Is 1 MET exactly the same for every person?",
    answer: "The standard Compendium convention defines 1 MET using a reference of 3.5 mL O₂/kg/min. Actual resting metabolic rates can differ among individuals, which is one reason standard MET-based energy estimates are not exact personal measurements."
  },
  {
    question: "How should I use a calories-burned calculator?",
    answer: "Use it as a consistent estimation and planning tool. Choose the activity that most closely matches what you did, enter accurate body weight and duration or distance, and treat the result as an estimate rather than a measured physiological value."
  }
];
