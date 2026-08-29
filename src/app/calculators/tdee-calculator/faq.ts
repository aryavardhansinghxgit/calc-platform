export interface FAQItem {
  question: string;
  answer: string;
}

export const tdee_calculatorFaqs: FAQItem[] = [
  {
    question: "What is TDEE?",
    answer:
      "TDEE stands for Total Daily Energy Expenditure. It is an estimate of the energy your body uses over a full day, including resting expenditure, activity and the thermic effect of food.",
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer:
      "BMR estimates resting energy expenditure, while TDEE includes resting expenditure plus activity and food-related energy expenditure.",
  },
  {
    question: "How does this TDEE calculator calculate calories?",
    answer:
      "It estimates resting energy expenditure using the selected BMR equation, applies the calculator's activity model, incorporates step and workout assumptions, and models TEF. The displayed NEAT value is derived as a residual from those components.",
  },
  {
    question: "Which BMR formula is most accurate?",
    answer:
      "No BMR equation is guaranteed to be most accurate for every person. Different equations were developed from different populations and inputs. Mifflin-St Jeor is widely used, while equations based on fat-free mass can be useful when reliable body-composition information is available.",
  },
  {
    question: "What is NEAT?",
    answer:
      "NEAT is non-exercise activity thermogenesis. It includes everyday movement outside formal exercise, such as walking, standing, occupational movement and household activity. NEAT can vary substantially between individuals.",
  },
  {
    question: "What is EAT?",
    answer:
      "EAT means exercise activity thermogenesis. It represents energy expenditure from planned exercise and structured physical activity.",
  },
  {
    question: "What is TEF?",
    answer:
      "TEF is the thermic effect of food—the energy required to process food after eating. TEF varies with dietary and individual characteristics, so it is best treated as an estimate rather than a fixed biological constant.",
  },
  {
    question: "How many calories should I eat to lose weight?",
    answer:
      "A common approach is to begin with calorie intake below estimated TDEE and monitor your multi-week weight trend. There is no single deficit that is ideal for everyone, and long-term weight change is not perfectly linear.",
  },
  {
    question: "How many calories should I eat to gain weight?",
    answer:
      "A calorie surplus means eating more energy than you expend over time. The size of an appropriate surplus depends on the individual's goal, activity, body composition and response.",
  },
  {
    question: "Is 3,500 calories really equal to one pound of fat?",
    answer:
      "The 3,500-calorie rule is a traditional planning heuristic. It is useful for understanding energy balance but does not perfectly predict long-term weight change because energy expenditure changes as body weight and other factors change.",
  },
  {
    question: "Can TDEE change without changing my diet?",
    answer:
      "Yes. Changes in body weight, exercise, daily movement, occupation, training and body composition can all affect total energy expenditure.",
  },
  {
    question: "Should I recalculate TDEE after losing weight?",
    answer:
      "Usually, recalculating after a meaningful change in body weight or activity is reasonable because the assumptions used in the previous estimate may no longer describe your current situation.",
  },
  {
    question: "Why is my real maintenance calorie intake different from my calculated TDEE?",
    answer:
      "A calculator uses predictive equations and activity assumptions. Your real expenditure may differ because of body composition, daily movement, exercise, food intake, adaptation and ordinary prediction error.",
  },
  {
    question: "Does exercise automatically increase TDEE by exactly the calories shown on my watch?",
    answer:
      "No. Wearable devices provide estimates, and adding their exercise calories to an existing TDEE estimate can double count activity depending on how both calculations were constructed.",
  },
  {
    question: "Can I use TDEE for athletic nutrition?",
    answer:
      "Yes, as a starting estimate. Athletes often have high and highly variable training demands, so more individualized nutrition planning may be appropriate for serious training or competition.",
  },
  {
    question: "What is adaptive thermogenesis?",
    answer:
      "Adaptive thermogenesis describes changes in energy expenditure that can occur during sustained changes in energy balance, particularly weight loss. The size of the response varies among individuals and studies.",
  },
  {
    question: "Is TDEE an exact measurement of metabolism?",
    answer:
      "No. TDEE calculated by this tool is an estimate produced from predictive equations and activity assumptions. Direct physiological measurement requires more specialized methods.",
  },
  {
    question: "How should I use a TDEE calculator responsibly?",
    answer:
      "Use the result as a starting estimate, keep your assumptions reasonably consistent, observe trends over time, and recalibrate when your body weight or activity changes. Do not treat the result as medical advice or an exact measurement.",
  },
];
