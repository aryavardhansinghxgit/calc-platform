import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const healthy_weight_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a healthy weight for my height?",
    answer: "For adults, one common reference is the BMI range of 18.5–24.9. Your height can be used to convert those BMI boundaries into a corresponding weight range. This is a population-based screening reference, not a guarantee that every individual within that range has the same health profile."
  },
  {
    question: "How do I calculate a healthy weight range from BMI?",
    answer: "For a height H in meters, multiply H² by 18.5 for the lower boundary and by 24.9 for the upper boundary (18.5 × H² to 24.9 × H²). The calculator performs that conversion automatically into pounds and kilograms."
  },
  {
    question: "What is the difference between healthy weight and ideal body weight?",
    answer: "A BMI-based healthy-weight range is derived from adult BMI thresholds, while ideal body weight is a historical family of height-based equations. They can produce different values because they are based on different definitions and mathematical assumptions."
  },
  {
    question: "What is the Devine ideal body weight formula?",
    answer: "For men, the Devine equation is 50 + 2.3 × (H - 60) kg, and for women it is 45.5 + 2.3 × (H - 60) kg, where H is height in inches. It is a historical reference equation published in 1974."
  },
  {
    question: "What is the Peterson ideal body weight formula?",
    answer: "Peterson's 2016 universal equation estimates body weight from height and a selected BMI. In US units: Weight (lb) = 5 × BMI + (BMI / 5) × (H - 60). In metric: Weight (kg) = 2.2 × BMI + 3.5 × BMI × (H - 1.5). It differs from older IBW equations because the target BMI is an explicit part of the calculation."
  },
  {
    question: "Why do Devine, Hamwi, Robinson, Miller and Peterson give different answers?",
    answer: "They were developed using different equations and assumptions. Peterson also explicitly links weight to a chosen BMI, whereas several older formulas use fixed coefficients based on height. Research shows meaningful variation between IBW equations."
  },
  {
    question: "Does body frame change the healthy BMI range?",
    answer: "No. A frame-size adjustment in the calculator changes the reference IBW/target scenario, but it does not change the BMI calculation or the adult BMI thresholds. The underlying BMI range remains based on height and the selected BMI boundaries."
  },
  {
    question: "What is the BMI range considered normal for adults?",
    answer: "WHO lists BMI 18.5–24.9 as the normal-weight range for adults. BMI below 18.5 is underweight, while 25.0–29.9 is pre-obesity and 30 or above falls into the obesity categories."
  },
  {
    question: "Is BMI the same as body fat percentage?",
    answer: "No. BMI is a weight-to-height index. It does not directly measure body fat percentage or distinguish muscle from fat. It is best understood as a screening and classification measure rather than a complete body-composition assessment."
  },
  {
    question: "Can a muscular person have a weight above their ideal weight?",
    answer: "Yes. Height-based IBW equations and BMI do not directly measure muscle mass. A person with substantial lean mass may weigh more than a historical IBW estimate while having a very different body-composition profile from someone at the same weight."
  },
  {
    question: "What is the 21.7 BMI target in this calculator?",
    answer: "The calculator uses BMI 21.7 as a reference target for converting height into a single target-weight estimate. It should not be interpreted as a WHO requirement that every adult should have a BMI of exactly 21.7. The broader WHO adult normal-weight reference is 18.5–24.9."
  },
  {
    question: "Should I try to reach my exact calculated ideal weight?",
    answer: "Not necessarily. An IBW estimate is a reference value, not a mandatory health target. Different equations can produce different results, and a person's appropriate weight depends on more than height alone."
  },
  {
    question: "Can I use this calculator for children?",
    answer: "Adult BMI thresholds should not simply be applied to children and adolescents. WHO uses age- and sex-specific growth references for people aged 0–19."
  },
  {
    question: "Can ideal body weight be used to calculate a medication dose?",
    answer: "Not by itself. Some medications use IBW or another weight measure, but the correct dosing convention depends on the specific medication and clinical protocol. Medication dosing should be determined by an appropriately qualified clinician or pharmacist."
  },
  {
    question: "Why is my current weight different from the calculator's target?",
    answer: "That is normal. The calculator's target and IBW values are mathematical reference estimates. Your actual appropriate weight may differ because of muscle mass, body composition, health status, age, activity level and other individual factors."
  },
  {
    question: "Is the average of several IBW formulas more accurate?",
    answer: "Not necessarily. The average is a transparent mathematical summary of the selected equations, but there is no general rule that averaging historical formulas creates a medically superior individualized target. The individual formulas themselves were developed using different methodologies."
  },
  {
    question: "Why does my BMI say normal weight while one IBW formula says I am above target?",
    answer: "Because BMI and IBW are different reference systems. BMI evaluates your weight relative to height using a BMI range, while an IBW equation produces a particular reference number. Both can therefore produce different comparisons without either calculation being mathematically inconsistent."
  }
];
