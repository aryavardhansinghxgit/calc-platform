import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const body_fat_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is body fat percentage?",
    answer:
      "Body fat percentage is the estimated percentage of total body weight made up of fat tissue. It provides different information from body weight or BMI because it attempts to separate fat mass from fat-free mass.",
  },
  {
    question: "How does the U.S. Navy body fat calculator work?",
    answer:
      "The Navy circumference method uses height and circumference measurements to estimate body density and then converts that estimate into body-fat percentage. Men and women use different equations, and hip circumference is included in the female equation.",
  },
  {
    question: "What measurements do I need for the Navy method?",
    answer:
      "You need age, sex, height, neck circumference, and waist circumference. Women also need hip circumference. Weight is needed when calculating fat mass and lean mass.",
  },
  {
    question: "Is the U.S. Navy body-fat method accurate?",
    answer:
      "It can provide a useful field estimate, but it is not a direct measurement. Prediction equations have inherent error, and results can differ from DEXA or other body-composition methods.",
  },
  {
    question: "Why does my Navy body-fat percentage differ from the BMI estimate?",
    answer:
      "The Navy method uses circumference measurements, while the Deurenberg method uses BMI, age, and sex. Since they model body composition differently, their estimates can legitimately differ.",
  },
  {
    question: "Is BMI the same as body fat percentage?",
    answer:
      "No. BMI measures body weight relative to height and does not directly measure body fat. It also cannot distinguish muscle from fat.",
  },
  {
    question: "How do I calculate fat mass from body fat percentage?",
    answer:
      "Multiply body weight by body-fat percentage expressed as a decimal: Fat Mass = Weight × (BF% / 100).",
  },
  {
    question: "How do I calculate lean body mass?",
    answer:
      "Subtract estimated fat mass from total body weight: Lean Mass = Weight - Fat Mass.",
  },
  {
    question: "What is FFMI?",
    answer:
      "FFMI is the Fat-Free Mass Index. It relates fat-free mass to height and is commonly used as a body-composition metric in fitness settings.",
  },
  {
    question: "Why does the calculator ask for hip circumference for women?",
    answer:
      "The female Navy equation incorporates hip circumference, whereas the male equation does not. This difference is part of the underlying prediction model.",
  },
  {
    question: "Can body-fat percentage be calculated from BMI alone?",
    answer:
      "It can be estimated using equations such as Deurenberg's formula, which incorporates BMI, age, and sex. That does not mean BMI directly measures body fat.",
  },
  {
    question: "What is a healthy body-fat percentage?",
    answer:
      "There is no single universal percentage appropriate for every person. Interpretation depends on age, sex, athletic status, body composition, and the measurement method.",
  },
  {
    question: "Why can my body-fat percentage change even if my weight does not?",
    answer:
      "Body weight does not reveal the precise ratio of fat mass to lean mass. Changes in muscle, glycogen, water, and fat can alter body composition without producing a large change in scale weight.",
  },
  {
    question: "How often should I measure body fat?",
    answer:
      "For personal tracking, measuring periodically under similar conditions is usually more useful than checking repeatedly throughout the day. Consistency is important because circumference measurements and hydration can affect estimates.",
  },
  {
    question: "Is the body-fat calculator suitable for athletes?",
    answer:
      "It can be useful for tracking trends in athletes, but very lean or unusually muscular individuals may not fit population assumptions particularly well. A professional assessment may be more appropriate when precision matters.",
  },
  {
    question: "Does body fat percentage tell me how healthy I am?",
    answer:
      "Not by itself. Body-fat percentage is only one body-composition indicator. Health assessment may also consider waist circumference, BMI, blood pressure, metabolic markers, activity level, medical history, and other factors.",
  },
  {
    question: "Is a DEXA scan better than a body-fat calculator?",
    answer:
      "DEXA is a direct body-composition assessment method and can provide substantially more detailed information. A tape-based calculator is much more convenient and inexpensive but is still an estimate.",
  },
  {
    question: "Why is my result different from another online body-fat calculator?",
    answer:
      "Different websites may use different formulas, measurement sites, unit conversions, rounding methods, or population assumptions. Always check which method a calculator uses before comparing results.",
  },
  {
    question: "Does losing weight always mean losing body fat?",
    answer:
      "No. Weight loss can include changes in fat, lean tissue, glycogen, and body water. That is why body composition and body-weight trends are useful when considered together.",
  },
  {
    question: "Can I use this calculator for medical diagnosis?",
    answer:
      "No. This calculator is an educational body-composition estimator. It should not be used to diagnose disease or replace an assessment by a qualified healthcare professional.",
  },
];
