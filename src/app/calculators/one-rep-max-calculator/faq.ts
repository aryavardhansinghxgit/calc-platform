import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const one_rep_max_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a one-rep max?",
    answer: "A one-rep max (1RM) is the maximum load you can successfully lift for one repetition of a specific exercise with the required technique."
  },
  {
    question: "How do I calculate my 1RM without lifting the maximum?",
    answer: "You can estimate your 1RM from a submaximal set using a prediction equation such as Epley or Brzycki. This calculator compares seven equations and produces a composite estimate."
  },
  {
    question: "What is the Epley formula?",
    answer: "1RM = Weight × (1 + Reps / 30). It estimates the maximum from the weight lifted and number of repetitions completed."
  },
  {
    question: "What is the Brzycki formula?",
    answer: "1RM = Weight × 36 / (37 − Reps). It is another widely used repetition-based 1RM equation."
  },
  {
    question: "Which 1RM formula is most accurate?",
    answer: "There is no single equation that is guaranteed to be most accurate for every lifter, exercise and repetition range. Research has found useful validity for multiple prediction equations while also finding differences in their prediction behavior."
  },
  {
    question: "Why does my 1RM change when I choose a different formula?",
    answer: "Each equation uses a different mathematical relationship between repetitions and maximum strength. Therefore the same input can legitimately generate different estimates."
  },
  {
    question: "What is a good rep range for estimating 1RM?",
    answer: "Lower-to-moderate repetition sets are commonly used for 1RM estimation because extremely high repetitions introduce more muscular-endurance effects. The reliability of an estimate also depends on technique and how close the set is to failure."
  },
  {
    question: "Is a 1RM calculator accurate?",
    answer: "It can provide a useful estimate, but it cannot guarantee your actual one-repetition maximum. Individual differences, fatigue, exercise selection and repetition count all influence prediction accuracy."
  },
  {
    question: "What does 80% of 1RM mean?",
    answer: "It means the training load is approximately 80% of your one-repetition maximum. If your 1RM is 200 lb, 80% is 160 lb."
  },
  {
    question: "How much should I lift for 5 reps?",
    answer: "A common percentage chart places 5RM around 87% of 1RM, but actual repetition capacity varies between lifters and exercises. The percentage should be treated as a starting reference, not a guarantee."
  },
  {
    question: "What is 90% of my 1RM?",
    answer: "Multiply your 1RM by 0.90. For example, if 1RM = 200 lb, 200 × 0.90 = 180 lb."
  },
  {
    question: "What is a training max?",
    answer: "A training max is a deliberately conservative number used for programming instead of the absolute maximum you could potentially lift. It can help leave room for daily performance variation."
  },
  {
    question: "Can I use the same 1RM for bench press and squat?",
    answer: "No. Each exercise has its own 1RM because movement mechanics and muscle demands differ."
  },
  {
    question: "Does 1RM determine muscle growth?",
    answer: "No. A 1RM can help set training loads, but hypertrophy depends on the broader resistance-training program, including volume, effort, exercise selection and progression. ACSM's current guidance emphasizes individualized programming rather than a single universal loading prescription."
  },
  {
    question: "Should I test my 1RM every workout?",
    answer: "No. Frequent maximal testing is not necessary for most training programs. An estimated 1RM from a submaximal set can be used to monitor progress without repeatedly attempting maximal loads."
  },
  {
    question: "Does fatigue affect estimated 1RM?",
    answer: "Yes. If a set is performed while fatigued, the relationship between repetitions and maximum strength can change. NSCA notes that fatigue can substantially affect 1RM and that training loads should account for performance fluctuations."
  },
  {
    question: "Why did my calculator estimate a higher 1RM than I can actually lift?",
    answer: "A prediction equation may overestimate your maximum because the relationship between your repetition performance and maximal strength differs from the model. This is normal and is one reason an estimated 1RM should not be treated as a guaranteed result."
  },
  {
    question: "What happens if I enter one repetition?",
    answer: "If you actually completed one repetition with the stated weight, the calculator treats that as a directly measured 1RM rather than requiring an estimated repetition equation."
  },
  {
    question: "Can I use a 1RM estimate for power training?",
    answer: "Yes, as a loading reference. ACSM's 2026 guidance identifies moderate percentages of 1RM combined with fast concentric movement as a useful framework for power training."
  },
  {
    question: "Should I use the highest formula result for training?",
    answer: "Not automatically. Choosing the highest estimate simply because it allows more weight can make training unnecessarily aggressive. Comparing the spread and using a conservative, practical training load is often more sensible."
  },
  {
    question: "Why does my estimated 1RM differ from another website?",
    answer: "Different sites may use different equations, rounding methods, repetition assumptions, or a single formula instead of several formulas. Always compare the methodology as well as the final number."
  },
  {
    question: "Can I use the calculator in kilograms?",
    answer: "Yes. The calculator supports both pounds and kilograms and converts between the two unit systems."
  },
  {
    question: "How often should I recalculate my 1RM?",
    answer: "Recalculate when your strength changes materially, when your normal working weights have changed, or when your previous estimate is no longer representative of current performance. Beginners may need more frequent adjustment because strength can change quickly."
  },
  {
    question: "Is 1RM the same as strength?",
    answer: "1RM is one practical measurement of maximal strength for a specific lift. It is not a complete measurement of every aspect of strength, athletic performance or physical ability."
  }
];

export default one_rep_max_calculatorFaqs;
