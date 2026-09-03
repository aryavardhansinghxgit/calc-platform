import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const pregnancy_weight_gain_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How much weight should I gain during pregnancy?",
    answer:
      "Recommended pregnancy weight gain depends mainly on your pre-pregnancy BMI and whether you are carrying one baby or twins. For a singleton pregnancy, IOM ranges are 28–40 lb for underweight, 25–35 lb for normal weight, 15–25 lb for overweight, and 11–20 lb for obesity. Twin recommendations are higher.",
  },
  {
    question: "How does a pregnancy weight gain calculator work?",
    answer:
      "It uses your pre-pregnancy height and weight to calculate BMI, identifies your BMI category, considers pregnancy type and gestational week, and compares your current weight gain with the calculator's reference trajectory.",
  },
  {
    question: "How is pregnancy weight gain calculated from BMI?",
    answer:
      "Pregnancy weight-gain recommendations are based on BMI before pregnancy. The calculator uses the unrounded BMI to classify you as underweight, normal weight, overweight or having obesity, then applies the corresponding pregnancy reference range.",
  },
  {
    question: "How much weight should I gain in the first trimester?",
    answer:
      "ACOG notes that during the first 12 weeks, some people gain only 1–5 pounds or may gain no weight. First-trimester gain varies considerably, particularly when nausea and vomiting affect eating.",
  },
  {
    question: "How much weight should I gain in the second trimester?",
    answer:
      "The appropriate amount depends on your pre-pregnancy BMI. For someone who began pregnancy at a healthy weight, ACOG describes an average gain of about 0.5–1 pound per week during the second and third trimesters.",
  },
  {
    question: "How much weight should I gain in the third trimester?",
    answer:
      "Third-trimester weight gain depends on your pre-pregnancy BMI and pregnancy type. The IOM framework provides average second- and third-trimester weekly rates rather than requiring exactly the same gain every week.",
  },
  {
    question: "How much weight should I gain if I am pregnant with twins?",
    answer:
      "CDC lists total twin-pregnancy ranges of 50–62 lb for people who began underweight, 37–54 lb for normal BMI, 31–50 lb for overweight and 25–42 lb for obesity. Individual twin pregnancies require clinical interpretation.",
  },
  {
    question: "Is pregnancy weight gain different if I was overweight before pregnancy?",
    answer:
      "Yes. The IOM framework recommends a lower total gain for a singleton pregnancy when pre-pregnancy BMI is 25.0–29.9: 15–25 pounds.",
  },
  {
    question: "Is pregnancy weight gain different if I had obesity before pregnancy?",
    answer:
      "Yes. For a singleton pregnancy, the IOM total reference is 11–20 pounds when pre-pregnancy BMI is 30 or higher. Your clinician may also consider fetal growth and other pregnancy factors.",
  },
  {
    question: "What if I am gaining weight faster than the calculator recommends?",
    answer:
      "One measurement above the calculator's reference range does not diagnose a problem. Look at the trend and discuss unexpected or rapid changes with your prenatal care provider, especially if other symptoms are present.",
  },
  {
    question: "What if I am not gaining enough weight during pregnancy?",
    answer:
      "Being below a calculator's reference range does not automatically mean that something is wrong. Persistent inadequate gain, significant weight loss, severe vomiting or concerns about fetal growth should be discussed with your healthcare provider.",
  },
  {
    question: "Is it normal to lose weight during early pregnancy?",
    answer:
      "Some people lose weight early in pregnancy because nausea, vomiting or reduced appetite make eating difficult. Significant or persistent weight loss should be discussed with a healthcare professional.",
  },
  {
    question: "Does the calculator predict my baby's weight?",
    answer:
      "No. The calculator provides pregnancy weight-gain reference information and, where shown, educational fetal or physiological reference material. It does not predict an individual baby's actual weight.",
  },
  {
    question: "How accurate is a pregnancy weight gain calculator?",
    answer:
      "It can accurately apply the mathematical rules and published population reference ranges on which it is based, but it cannot predict exactly how one individual pregnancy will progress. Clinical assessment is needed to interpret your actual weight trajectory.",
  },
  {
    question: "Should I follow the calculator or my doctor's recommendation?",
    answer:
      "Your prenatal clinician's assessment takes priority. The calculator is an educational tracking tool and should be used to support conversations with your obstetric care team, not replace them.",
  },
];

export default pregnancy_weight_gain_calculatorFaqs;
