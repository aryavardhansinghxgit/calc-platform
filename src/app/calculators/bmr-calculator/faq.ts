import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const bmr_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is BMR?",
    answer: "BMR, or Basal Metabolic Rate, is an estimate of the energy required to support essential physiological functions at rest."
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer: "BMR estimates resting energy expenditure. TDEE estimates total daily energy expenditure after accounting for activity and other components."
  },
  {
    question: "What formula does this BMR calculator use?",
    answer: "The calculator supports Mifflin-St Jeor, Revised Harris-Benedict and Katch-McArdle, allowing you to compare different predictive approaches."
  },
  {
    question: "Which BMR formula is best?",
    answer: "There is no formula that is guaranteed to be best for every person. Mifflin-St Jeor is a widely used general predictive equation, while Katch-McArdle can be useful when a reliable lean-body-mass estimate is available."
  },
  {
    question: "How accurate is a BMR calculator?",
    answer: "A BMR calculator provides an estimate, not a direct metabolic measurement. Individual prediction error varies with equation, population and personal characteristics."
  },
  {
    question: "Why does my BMR change when I switch from pounds to kilograms?",
    answer: "If the converted values are rounded differently, the mathematical inputs are no longer identical. For example, 160 lb is approximately 72.5748 kg, while manually entering 72.6 kg produces a slightly different result."
  },
  {
    question: "Why is my BMR different from another website?",
    answer: "Different websites may use different equations, rounding rules, unit conversions or definitions such as BMR versus RMR."
  },
  {
    question: "What is the Mifflin-St Jeor formula for men?",
    answer: "BMR = 10W + 6.25H - 5A + 5, where W is kilograms, H is centimeters and A is age."
  },
  {
    question: "What is the Mifflin-St Jeor formula for women?",
    answer: "BMR = 10W + 6.25H - 5A - 161, where W is kilograms, H is centimeters and A is age."
  },
  {
    question: "What is the Harris-Benedict equation?",
    answer: "It is a predictive equation for estimating basal or resting energy expenditure. The revised version was published by Roza and Shizgal in 1984."
  },
  {
    question: "What is the Katch-McArdle equation?",
    answer: "Katch-McArdle estimates BMR from lean body mass: BMR = 370 + 21.6 × LBM_kg."
  },
  {
    question: "Does muscle increase BMR?",
    answer: "Increasing lean mass can increase resting energy expenditure, but the size of the effect should not be exaggerated. Total resting energy expenditure also depends on organs, body size, age and other characteristics."
  },
  {
    question: "Is BMR the number of calories I should eat?",
    answer: "No. BMR is a resting estimate. Your daily calorie requirement is generally higher because you also expend energy through activity and other processes."
  },
  {
    question: "How do I calculate maintenance calories from BMR?",
    answer: "A common estimation approach is: TDEE = BMR × Activity Factor. The calculator provides several activity multipliers for this purpose."
  },
  {
    question: "Should I eat below my BMR to lose weight?",
    answer: "BMR should not simply be treated as a dietary floor. Weight-loss planning should consider your total energy expenditure, nutritional adequacy, health status and individual circumstances."
  },
  {
    question: "Can my BMR change?",
    answer: "Yes. Changes in body weight and body composition can alter estimated resting energy expenditure. Other physiological and lifestyle factors can also affect actual energy expenditure."
  },
  {
    question: "Can a BMR calculator measure my metabolism?",
    answer: "No. It calculates a prediction from input variables. Direct measurement of resting energy expenditure requires specialized testing such as indirect calorimetry."
  },
  {
    question: "Should I use Katch-McArdle if I know my body fat?",
    answer: "It can be useful for comparison because it uses lean body mass. However, the quality of the result depends heavily on the reliability of the body-fat estimate."
  },
  {
    question: "Why should I recalculate my BMR after losing weight?",
    answer: "Because the equation uses body weight and other personal variables. A substantial weight change can therefore produce a different predicted resting energy expenditure."
  },
  {
    question: "Can I use BMR for bodybuilding or athletic nutrition?",
    answer: "Yes, as a starting estimate. Athletes have highly variable training loads and energy requirements, so calculated values should be combined with real-world monitoring rather than treated as exact prescriptions."
  }
];
