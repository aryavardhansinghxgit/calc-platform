export interface FAQItem {
  question: string;
  answer: string;
}

export const tdee_calculatorFaqs: FAQItem[] = [
  {
    question: "What is TDEE (Total Daily Energy Expenditure)?",
    answer: "TDEE is the total number of calories (or kilojoules) your body burns in a 24-hour period. It includes your Basal Metabolic Rate (BMR), Exercise Activity Thermogenesis (EAT), Non-Exercise Activity Thermogenesis (NEAT), and the Thermic Effect of Food (TEF)."
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer: "BMR (Basal Metabolic Rate) is the baseline energy your body burns at complete rest to keep organs functioning (heart, lungs, brain). TDEE includes your BMR plus all calories burned through movement, exercise, daily steps, and digestion."
  },
  {
    question: "How is TDEE calculated?",
    answer: "TDEE is calculated by estimating your BMR using validated clinical formulas (such as Mifflin-St Jeor or Katch-McArdle) and multiplying it by an activity factor (1.2 to 2.1) plus step count and workout adjustments."
  },
  {
    question: "Which BMR formula is the most accurate?",
    answer: "Mifflin-St Jeor is the standard clinical default for individuals with average body composition. For athletic individuals who know their body fat percentage, the Katch-McArdle and Cunningham formulas (based on Lean Body Mass) are the most accurate."
  },
  {
    question: "What are the 4 main components of TDEE?",
    answer: "The 4 components are: 1. BMR (~60-70% of TDEE), 2. NEAT (Non-Exercise Activity ~15-20%), 3. EAT (Exercise Activity ~10-15%), and 4. TEF (Thermic Effect of Food ~10%)."
  },
  {
    question: "What is NEAT (Non-Exercise Activity Thermogenesis)?",
    answer: "NEAT refers to calories burned through non-exercise physical movement, such as walking, fidgeting, climbing stairs, standing at a desk, and performing daily household tasks."
  },
  {
    question: "What is TEF (Thermic Effect of Food)?",
    answer: "TEF is the energy required to digest, absorb, and process nutrients. Dietary protein has the highest TEF (~20-30%), compared to carbohydrates (~5-10%) and fats (~0-3%)."
  },
  {
    question: "How many calories are in 1 pound of body fat?",
    answer: "1 pound of human adipose (fat) tissue stores approximately 3,500 calories. A daily calorie deficit of 500 kcal results in 1 pound of fat loss per week."
  },
  {
    question: "What is the best calorie deficit for weight loss?",
    answer: "A moderate deficit of 20% below TDEE (or -500 kcal/day) is sustainable and preserves lean muscle mass while promoting steady fat loss of ~1 lb/week."
  },
  {
    question: "What is a lean bulk calorie surplus?",
    answer: "A lean bulk involves consuming a small calorie surplus of 200 to 300 kcal above TDEE (+0.5 lb/week gain) to maximize muscle hypertrophy while minimizing body fat gain."
  },
  {
    question: "How does daily step count affect TDEE?",
    answer: "Walking 10,000 steps per day adds approximately 250 to 350 calories to your TDEE compared to a sedentary baseline (< 5,000 steps)."
  },
  {
    question: "How do I convert calories to kilojoules?",
    answer: "Multiply calories (kcal) by 4.184 to get kilojoules (kJ). For example, 2,000 kcal = 8,368 kJ."
  },
  {
    question: "Can TDEE change over time?",
    answer: "Yes. TDEE changes as your body weight, lean muscle mass, daily activity levels, age, and metabolic adaptation shift."
  },
  {
    question: "What is body recomposition?",
    answer: "Body recomposition is the process of simultaneously losing body fat and building lean muscle mass, achieved by eating near maintenance calories (or a mild -200 kcal deficit) with high protein and progressive strength training."
  },
  {
    question: "Why do males have a higher TDEE than females of the same weight?",
    answer: "Males generally possess higher lean muscle mass and lower average body fat percentage, resulting in a higher baseline BMR and energy expenditure."
  },
  {
    question: "How does aging affect TDEE?",
    answer: "Aging reduces BMR by ~1-2% per decade after age 30, primarily due to sarcopenia (loss of muscle tissue) and reduced daily NEAT movement."
  },
  {
    question: "What is metabolic adaptation or 'starvation mode'?",
    answer: "During prolonged severe calorie restriction, the body reduces NEAT, thyroid hormone output, and mitochondrial efficiency to slow weight loss. This is managed by taking periodic refeeds or diet breaks."
  },
  {
    question: "How often should I recalculate my TDEE?",
    answer: "Recalculate your TDEE whenever your body weight shifts by 5 to 10 pounds or when your exercise routine changes significantly."
  },
  {
    question: "How does strength training affect TDEE?",
    answer: "Strength training burns calories during workouts (EAT) and elevates Excess Post-Exercise Oxygen Consumption (EPOC) while building lean muscle that increases long-term resting BMR."
  },
  {
    question: "What is the Harris-Benedict formula?",
    answer: "The Harris-Benedict equation (created in 1919 and revised in 1984) is a widely recognized formula estimating BMR using age, gender, height, and weight."
  },
  {
    question: "What is the Katch-McArdle formula?",
    answer: "Katch-McArdle calculates BMR specifically from Lean Body Mass (LBM = Weight × [1 - Body Fat %]), making it highly accurate for lean athletes."
  },
  {
    question: "What is the Cunningham formula?",
    answer: "The Cunningham equation is an athletic formula: BMR = 500 + 22 × Lean Mass (kg), optimized for competitive strength and endurance athletes."
  },
  {
    question: "What is the Schofield formula?",
    answer: "The Schofield equation is used by the World Health Organization (WHO) to estimate metabolic rate across specific age brackets."
  },
  {
    question: "How many calories should an athlete eat?",
    answer: "Athletes with high training volumes (2+ hours/day) often require activity multipliers of 1.9 to 2.1, needing 3,000 to 4,500+ calories daily depending on body size."
  },
  {
    question: "Does drinking cold water increase TDEE?",
    answer: "Drinking 500ml of cold water temporarily increases metabolic expenditure by 24-30% for about 60 minutes as the body warms the fluid to body temperature."
  },
  {
    question: "What is EPOC (Excess Post-Exercise Oxygen Consumption)?",
    answer: "EPOC (afterburn effect) is the elevated calorie burn that occurs for hours after intense anaerobic exercise (HIIT or heavy weightlifting) as the body restores oxygen stores and repairs tissue."
  },
  {
    question: "How does sleep affect TDEE?",
    answer: "Sleep deprivation impairs glucose tolerance, lowers leptin (satiety hormone), increases ghrelin (hunger hormone), and reduces voluntary NEAT movement, decreasing total expenditure."
  },
  {
    question: "What is the difference between EAT and NEAT?",
    answer: "EAT is deliberate structured exercise (gym workouts, running, swimming). NEAT is spontaneous daily movement (walking, standing, cleaning, fidgeting)."
  },
  {
    question: "Why is Calculator.net's TDEE calculator less detailed than this suite?",
    answer: "Calculator.net provides static formulas with basic outputs. Our suite offers 10 modes, 7 BMR formulas, full BMR/NEAT/EAT/TEF component breakdowns, 12-week weight projections, activity burn tables, and downloadable PDF reports."
  },
  {
    question: "How do I calculate weekly calorie deficit?",
    answer: "Multiply your daily calorie deficit by 7. A 500 kcal daily deficit equals a 3,500 kcal weekly deficit (1 lb fat loss)."
  },
  {
    question: "Should I eat back calories burned during exercise?",
    answer: "If your activity multiplier already accounts for exercise, do not add workout calories again to avoid double-counting and overeating."
  },
  {
    question: "What is the minimum safe daily calorie intake?",
    answer: "Dietary guidelines recommend not dropping below 1,200 kcal/day for females or 1,500 kcal/day for males without medical supervision."
  },
  {
    question: "How does caffeine affect metabolic rate?",
    answer: "Caffeine stimulates the central nervous system and can temporarily elevate metabolic rate by 3-11% for 2 to 3 hours."
  },
  {
    question: "What is RMR (Resting Metabolic Rate)?",
    answer: "RMR is closely related to BMR but measured under less restrictive conditions (includes slight energy cost of digestive rest), typically 3-5% higher than true BMR."
  },
  {
    question: "Can standing at a desk increase TDEE?",
    answer: "Yes. Standing at a desk burns ~30-50 more calories per hour than sitting, adding 200-400 calories per day to your NEAT."
  },
  {
    question: "What is the best macro split for maintenance?",
    answer: "A balanced macro split for maintenance is 30% Protein, 40% Carbohydrates, and 30% Healthy Fats."
  },
  {
    question: "How does thyroid hormone affect TDEE?",
    answer: "Thyroid hormones (T3 and T4) regulate cellular respiration. Hypothyroidism reduces BMR, while hyperthyroidism increases BMR."
  },
  {
    question: "How do I track my calorie intake accurately?",
    answer: "Weigh food raw on a digital kitchen scale and log all items in a nutrition tracking app including cooking oils, sauces, and beverages."
  },
  {
    question: "What is the difference between net calories and gross calories?",
    answer: "Gross calories is total food consumed. Net calories is gross calories minus exercise calories burned."
  },
  {
    question: "How do I export my TDEE report?",
    answer: "Use our toolbar buttons to generate a professional PDF report, export CSV data, copy a summary to your clipboard, or print a formatted document."
  }
];
