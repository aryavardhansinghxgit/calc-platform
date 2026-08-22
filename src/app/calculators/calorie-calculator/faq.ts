export interface FAQItem {
  question: string;
  answer: string;
}

export const calorie_calculatorFaqs: FAQItem[] = [
  {
    question: "What is a dietary calorie and how is it measured?",
    answer:
      "A dietary calorie (kcal or kilocalorie) represents the amount of thermal energy required to raise the temperature of 1 kilogram of water by 1 degree Celsius. In human nutrition, calories measure the chemical energy provided by carbohydrates, proteins, fats, and alcohol that the body metabolizes for cellular work, respiration, circulation, and physical activity.",
  },
  {
    question: "What is Basal Metabolic Rate (BMR)?",
    answer:
      "Basal Metabolic Rate (BMR) is the baseline energy expenditure required to sustain vital involuntary physiological functions—such as cellular repair, brain activity, cardiac function, respiration, and thermoregulation—at complete physical rest. BMR is often the largest component of Total Daily Energy Expenditure (TDEE), but its share varies with activity level and individual circumstances.",
  },
  {
    question: "What is Total Daily Energy Expenditure (TDEE)?",
    answer:
      "Total Daily Energy Expenditure (TDEE) is the estimated total number of calories burned in a 24-hour day. It combines your Basal Metabolic Rate (BMR) with physical activity levels, the Thermic Effect of Food (TEF), and Non-Exercise Activity Thermogenesis (NEAT).",
  },
  {
    question: "Which BMR formula is used by the calculator?",
    answer:
      "The calculator defaults to the Mifflin-St Jeor Equation, which is widely recognized as a reliable predictor of resting metabolic rate in adults when body fat percentage is not measured. It also supports the Revised Harris-Benedict (1984) and Katch-McArdle equations (which calculate energy expenditure directly from Lean Body Mass).",
  },
  {
    question: "How is the 3,500 kcal per pound model used in weight planning?",
    answer:
      "The weight-change rates shown use a simplified linear planning model based on approximately 3,500 kcal per pound of body tissue. Actual weight change is not perfectly linear and can vary due to metabolic adaptation, fluctuations in body water, body composition changes, and activity levels.",
  },
  {
    question: "What is Zigzag Calorie Cycling and how does it work?",
    answer:
      "Zigzag calorie cycling is a dietary scheduling strategy that alternates higher-calorie days with lower-calorie days while maintaining the same cumulative weekly calorie budget. This approach provides dietary flexibility across training and rest days without altering overall net weekly energy balance.",
  },
  {
    question: "Why can very-low-calorie diets require medical supervision?",
    answer:
      "Public health guidelines generally caution that consuming very low calorie intakes can carry increased risks of lean muscle loss, micronutrient deficiencies, fatigue, and gallstone formation, and should be conducted under clinical supervision depending on individual circumstances and medical context.",
  },
  {
    question: "What is the Thermic Effect of Food (TEF)?",
    answer:
      "The Thermic Effect of Food (TEF) is the metabolic energy required to digest, absorb, and process dietary nutrients. Dietary protein exhibits the highest thermic cost (~20% to 30% of ingested energy), followed by carbohydrates (~5% to 10%) and dietary fats (~0% to 3%).",
  },
  {
    question: "How does biological sex affect baseline calorie requirements?",
    answer:
      "Biological males generally display higher baseline caloric requirements than females of comparable age and weight, primarily due to a greater average proportion of lean muscle mass, larger skeletal dimensions, and endocrine differences.",
  },
  {
    question: "Why might weight loss plateau during a calorie deficit?",
    answer:
      "Common factors influencing weight plateaus include non-linear fluid retention from exercise or sodium intake, changes in spontaneous non-exercise activity (NEAT), portion size estimation errors, or adaptive metabolic responses to prolonged energy restriction.",
  },
  {
    question: "What macronutrient ratios are available in the calculator?",
    answer:
      "The calculator provides four standard preset macronutrient models: Balanced (50% Carbs / 20% Protein / 30% Fat), Higher Protein (40/30/30), Lower Carb (25/35/40), and Ketogenic-style (5/25/70). These presets represent common calculation scenarios rather than universal dietary prescriptions.",
  },
  {
    question: "How does physical activity scaling impact TDEE?",
    answer:
      "Physical activity multipliers scale baseline BMR by 20% for sedentary routines up to 100% for intense daily athletic training or strenuous labor. Increasing daily non-exercise movement (NEAT) and structured exercise elevates total daily energy expenditure.",
  },
  {
    question: "What is Non-Exercise Activity Thermogenesis (NEAT)?",
    answer:
      "NEAT comprises the energy expended for all physical movement outside of structured exercise and sleeping—such as walking, typing, household chores, and postural changes. NEAT represents a highly variable component of daily energy expenditure among individuals.",
  },
  {
    question: "How can aging affect daily caloric expenditure?",
    answer:
      "Resting metabolic rate gradually decreases with age, largely due to age-related reductions in lean muscle mass (sarcopenia) and decreased physical activity levels. Maintaining regular resistance training helps preserve metabolically active muscle tissue over time.",
  },
  {
    question: "What is the difference between dietary Calories (kcal) and Kilojoules (kJ)?",
    answer:
      "Both units measure nutritional energy. One dietary Calorie (1 kcal) equals approximately 4.1868 Kilojoules (kJ). Kilocalories are standard on nutrition labels in the United States and Canada, whereas Kilojoules are standard in Australia and New Zealand.",
  },
  {
    question: "When should calorie targets be recalculated?",
    answer:
      "Recalculate your TDEE and calorie targets when your weight, physical activity routine, athletic goals, or other major inputs change enough to materially affect the modeled estimate.",
  },
  {
    question: "How can sleep duration affect energy balance and appetite?",
    answer:
      "Insufficient sleep can influence appetite-regulating hormones (increasing ghrelin and decreasing leptin), which may increase hunger cues and cravings while reducing spontaneous daytime physical activity.",
  },
  {
    question: "How does lean muscle mass influence resting energy expenditure?",
    answer:
      "Lean muscle tissue is more metabolically active at rest than adipose tissue, so variations in body composition directly influence resting energy expenditure.",
  },
  {
    question: "What is a gradual rate of weight loss?",
    answer:
      "A weight-change rate of approximately 0.5 to 2.0 pounds (0.25 to 0.9 kg) per week is a commonly cited gradual reference range in public health guidelines to support sustainability and preserve lean body mass.",
  },
  {
    question: "How accurate are mathematical calorie calculations?",
    answer:
      "The calculator produces mathematical estimates from validated population equations and user-entered inputs. Because individual metabolic rates vary based on genetics, body composition, medical conditions, and medications, outputs should serve as reference baselines rather than clinical diagnoses.",
  },
];
