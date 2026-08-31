import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const pregnancy_weight_gain_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How much weight should I gain during pregnancy?",
    answer:
      "The recommended total gain depends mainly on your pre-pregnancy BMI and whether you are carrying one baby or twins. For a singleton pregnancy, the IOM ranges are 28–40 lb for underweight, 25–35 lb for normal BMI, 15–25 lb for overweight, and 11–20 lb for obesity.",
  },
  {
    question: "How is pregnancy weight gain calculated?",
    answer:
      "The calculator first determines your pre-pregnancy BMI from height and weight. It then uses your pregnancy type and gestational week to estimate a target weight-gain range and compares your current pregnancy gain with that range.",
  },
  {
    question: "How much weight should I gain by week 20?",
    answer:
      "There is no single week-20 target that applies to everyone. The expected amount depends on pre-pregnancy BMI, pregnancy type and the guideline model used by the calculator. The calculator therefore provides a week-specific range rather than applying the total 40-week target at every stage.",
  },
  {
    question: "Is 25 pounds of weight gain during pregnancy normal?",
    answer:
      "It depends on the starting BMI, pregnancy type and gestational stage. For a singleton pregnancy beginning at a normal BMI, 25–35 lb is the standard total IOM range. Twenty-five pounds is therefore at the lower end of the full pregnancy range, but its meaning at an earlier week depends on the pregnancy trajectory.",
  },
  {
    question: "How much weight should I gain with twins?",
    answer:
      "The commonly used twin-pregnancy ranges are approximately 37–54 lb for normal pre-pregnancy BMI, 31–50 lb for overweight BMI, and 25–42 lb for obesity. CDC guidance lists 50–62 lb for women who began a twin pregnancy underweight.",
  },
  {
    question: "What is the recommended weight gain in the first trimester?",
    answer:
      "ACOG notes that someone who began pregnancy at a healthy weight may gain only about 1–5 lb during the first 12 weeks, and some people may gain no weight. Individual patterns vary, especially when nausea or vomiting affects food intake.",
  },
  {
    question: "Does pregnancy weight gain happen at the same rate every week?",
    answer:
      "No. Weight gain often varies from week to week. The commonly used guidelines provide average rates for the second and third trimesters rather than requiring the exact same increase every week.",
  },
  {
    question: "What happens if I gain less weight than recommended?",
    answer:
      "A calculator result below the guideline range does not by itself diagnose a problem. Your clinician may consider fetal growth, nutritional intake, symptoms, pre-pregnancy BMI and the overall trend before deciding whether any action is needed.",
  },
  {
    question: "What happens if I gain more weight than recommended?",
    answer:
      "Being above a guideline range does not automatically mean that your pregnancy is unhealthy. However, sustained excess gain or sudden rapid weight gain should be discussed with your prenatal care provider because the overall clinical context matters.",
  },
  {
    question: "Does BMI affect how much weight I should gain during pregnancy?",
    answer:
      "Yes. The IOM framework uses pre-pregnancy BMI categories to determine different recommended weight-gain ranges. That is why the same amount of gain can be appropriate for one person but above or below the recommended range for another.",
  },
  {
    question: "How many extra calories do I need during pregnancy?",
    answer:
      "Energy needs increase as pregnancy progresses, but the exact amount varies by individual circumstances. ACOG states that people with a healthy pre-pregnancy weight generally need no additional calories in the first trimester, about 340 additional calories per day in the second trimester, and about 450 in the third trimester. These are general figures, not individualized prescriptions.",
  },
  {
    question: "Can I use this calculator for triplets?",
    answer:
      "The calculator is designed around singleton and twin/multiple pregnancy guidance. Evidence is much less established for triplets and higher-order multiples, so those pregnancies should be managed using individualized guidance from the obstetric team.",
  },
  {
    question: "Is the weight-composition breakdown exact?",
    answer:
      "No. The weight-composition section is an educational model showing approximate components of pregnancy-related weight. It should not be interpreted as a measurement of the exact weight of your fetus, placenta, fluid, blood volume, or maternal fat stores.",
  },
  {
    question: "Should I try to hit the exact number shown by the calculator?",
    answer:
      "No. The displayed result is a guideline-based reference range rather than a required daily or weekly number. Your healthcare provider may interpret your weight trajectory differently depending on fetal growth and your individual health.",
  },
];

export default pregnancy_weight_gain_calculatorFaqs;
