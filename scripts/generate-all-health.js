const fs = require("fs");
const path = require("path");

const calculators = [
  // FITNESS (12)
  {
    slug: "bmi-calculator",
    id: "bmi-calculator",
    title: "BMI Calculator",
    subcategory: "Fitness",
    iconName: "HeartPulse",
    description: "Calculate Body Mass Index (BMI), WHO weight classification, and ideal body weight range.",
    keywords: ["bmi", "body mass index", "health", "weight", "fitness", "ideal weight"],
    relatedCalculators: ["calorie-calculator", "body-fat-calculator", "ideal-weight-calculator"],
    inputs: [
      { name: "weightKg", label: "Weight (kg)", type: "number", defaultValue: 70, min: 20, max: 300, step: 1 },
      { name: "heightCm", label: "Height (cm)", type: "number", defaultValue: 175, min: 50, max: 250, step: 1 }
    ],
    outputs: [
      { name: "bmi", label: "Body Mass Index (BMI)", format: "number", highlight: true },
      { name: "category", label: "Classification", format: "text" },
      { name: "healthyWeightRange", label: "Ideal Weight Range", format: "text" },
      { name: "primeIndex", label: "BMI Prime", format: "number" }
    ],
    calcLogic: `
  const weight = Math.max(0, Number(inputs.weightKg) || 0);
  const height = Math.max(0, Number(inputs.heightCm) || 0);
  if (weight <= 0 || height <= 0) {
    return { bmi: 0, category: "Invalid inputs", healthyWeightRange: "N/A", primeIndex: 0 };
  }
  const heightM = height / 100;
  const bmi = parseFloat((weight / (heightM * heightM)).toFixed(1));
  let category = "Normal weight";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obesity";
  const minW = (18.5 * heightM * heightM).toFixed(1);
  const maxW = (24.9 * heightM * heightM).toFixed(1);
  const primeIndex = parseFloat((bmi / 25).toFixed(2));
  return { bmi, category, healthyWeightRange: \`\${minW} kg – \${maxW} kg\`, primeIndex };
`,
    formulaStr: "BMI = Weight (kg) / [Height (m)]²",
    faqs: [
      { question: "What is a normal BMI range?", answer: "A BMI between 18.5 and 24.9 is considered normal/healthy for adults." },
      { question: "Is BMI accurate for athletes?", answer: "BMI does not distinguish muscle mass from fat, so muscular individuals may have a high BMI despite low body fat." }
    ]
  },
  {
    slug: "calorie-calculator",
    id: "calorie-calculator",
    title: "Calorie Calculator",
    subcategory: "Fitness",
    iconName: "Flame",
    description: "Calculate daily calorie intake for weight loss, maintenance, or muscle gain using Mifflin-St Jeor equation.",
    keywords: ["calories", "tdee", "bmr", "weight loss", "nutrition", "diet"],
    relatedCalculators: ["tdee-calculator", "bmr-calculator", "macro-calculator"],
    inputs: [
      { name: "age", label: "Age (years)", type: "number", defaultValue: 25, min: 15, max: 100, step: 1 },
      { name: "gender", label: "Gender", type: "select", defaultValue: "male", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] },
      { name: "weightKg", label: "Weight (kg)", type: "number", defaultValue: 70, min: 30, max: 250, step: 1 },
      { name: "heightCm", label: "Height (cm)", type: "number", defaultValue: 175, min: 100, max: 230, step: 1 },
      { name: "activityLevel", label: "Activity Level", type: "select", defaultValue: "1.375", options: [
        { label: "Sedentary (little or no exercise)", value: "1.2" },
        { label: "Lightly Active (1-3 days/wk)", value: "1.375" },
        { label: "Moderately Active (3-5 days/wk)", value: "1.55" },
        { label: "Very Active (6-7 days/wk)", value: "1.725" },
        { label: "Extra Active (intense job/exercise)", value: "1.9" }
      ] },
      { name: "goal", label: "Fitness Goal", type: "select", defaultValue: "maintain", options: [
        { label: "Maintain Weight", value: "maintain" },
        { label: "Mild Weight Loss (-0.25 kg/wk)", value: "mild_loss" },
        { label: "Weight Loss (-0.5 kg/wk)", value: "loss" },
        { label: "Extreme Weight Loss (-1 kg/wk)", value: "extreme_loss" },
        { label: "Weight Gain (+0.5 kg/wk)", value: "gain" }
      ] }
    ],
    outputs: [
      { name: "targetCalories", label: "Daily Target Calories", format: "number", highlight: true, unit: "kcal" },
      { name: "bmr", label: "Basal Metabolic Rate (BMR)", format: "number", unit: "kcal" },
      { name: "tdee", label: "Maintenance Calories (TDEE)", format: "number", unit: "kcal" }
    ],
    calcLogic: `
  const age = Math.max(1, Number(inputs.age) || 25);
  const w = Math.max(1, Number(inputs.weightKg) || 70);
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const act = Number(inputs.activityLevel) || 1.375;
  const isMale = inputs.gender !== "female";
  const bmrRaw = 10 * w + 6.25 * h - 5 * age + (isMale ? 5 : -161);
  const bmr = Math.round(Math.max(0, bmrRaw));
  const tdee = Math.round(bmr * act);
  let goalOffset = 0;
  if (inputs.goal === "mild_loss") goalOffset = -250;
  else if (inputs.goal === "loss") goalOffset = -500;
  else if (inputs.goal === "extreme_loss") goalOffset = -1000;
  else if (inputs.goal === "gain") goalOffset = 500;
  const targetCalories = Math.max(1200, tdee + goalOffset);
  return { targetCalories, bmr, tdee };
`,
    formulaStr: "BMR = 10W + 6.25H - 5A + S; TDEE = BMR × Activity",
    faqs: [
      { question: "How many calories should I eat to lose 1 lb per week?", answer: "A deficit of 500 kcal per day below maintenance generally results in ~1 lb (0.45 kg) weight loss per week." }
    ]
  },
  {
    slug: "body-fat-calculator",
    id: "body-fat-calculator",
    title: "Body Fat Calculator",
    subcategory: "Fitness",
    iconName: "Activity",
    description: "Estimate body fat percentage, lean body mass, and fat mass using US Navy tape measure method.",
    keywords: ["body fat", "fat mass", "lean mass", "navy body fat", "composition"],
    relatedCalculators: ["bmi-calculator", "army-body-fat-calculator", "lean-body-mass-calculator"],
    inputs: [
      { name: "gender", label: "Gender", type: "select", defaultValue: "male", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] },
      { name: "weightKg", label: "Weight (kg)", type: "number", defaultValue: 75, min: 30, max: 250, step: 0.5 },
      { name: "heightCm", label: "Height (cm)", type: "number", defaultValue: 175, min: 100, max: 230, step: 0.5 },
      { name: "neckCm", label: "Neck Circumference (cm)", type: "number", defaultValue: 38, min: 20, max: 70, step: 0.5 },
      { name: "waistCm", label: "Waist Circumference (cm)", type: "number", defaultValue: 85, min: 40, max: 200, step: 0.5 },
      { name: "hipCm", label: "Hip Circumference (cm - Female)", type: "number", defaultValue: 95, min: 40, max: 200, step: 0.5 }
    ],
    outputs: [
      { name: "bodyFatPercent", label: "Body Fat Percentage", format: "percentage", highlight: true },
      { name: "fatMassKg", label: "Total Fat Mass", format: "number", unit: "kg" },
      { name: "leanMassKg", label: "Lean Body Mass", format: "number", unit: "kg" },
      { name: "category", label: "Fitness Category", format: "text" }
    ],
    calcLogic: `
  const g = inputs.gender || "male";
  const w = Math.max(1, Number(inputs.weightKg) || 75);
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const neck = Math.max(1, Number(inputs.neckCm) || 38);
  const waist = Math.max(1, Number(inputs.waistCm) || 85);
  const hip = Math.max(1, Number(inputs.hipCm) || 95);
  let bf = 15;
  if (g === "male") {
    const val = waist - neck;
    if (val > 0) {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(val) + 0.15456 * Math.log10(h)) - 450;
    }
  } else {
    const val = waist + hip - neck;
    if (val > 0) {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(val) + 0.22100 * Math.log10(h)) - 450;
    }
  }
  bf = Math.min(60, Math.max(2, parseFloat(bf.toFixed(1))));
  const fatMass = parseFloat(((w * bf) / 100).toFixed(1));
  const leanMass = parseFloat((w - fatMass).toFixed(1));
  let category = "Fitness";
  if (g === "male") {
    if (bf < 6) category = "Essential Fat";
    else if (bf < 14) category = "Athletes";
    else if (bf < 18) category = "Fitness";
    else if (bf < 25) category = "Average";
    else category = "Obese";
  } else {
    if (bf < 14) category = "Essential Fat";
    else if (bf < 21) category = "Athletes";
    else if (bf < 25) category = "Fitness";
    else if (bf < 32) category = "Average";
    else category = "Obese";
  }
  return { bodyFatPercent: bf, fatMassKg: fatMass, leanMassKg: leanMass, category };
`,
    formulaStr: "US Navy Tape Measurement Formula using log10 waist/neck/hip ratios.",
    faqs: [
      { question: "How accurate is the US Navy Body Fat method?", answer: "It is accurate within 3-4% of DEXA scans when measurements are taken precisely." }
    ]
  },
  {
    slug: "bmr-calculator",
    id: "bmr-calculator",
    title: "BMR Calculator",
    subcategory: "Fitness",
    iconName: "Zap",
    description: "Calculate Basal Metabolic Rate (BMR) and daily energy expenditure using Mifflin-St Jeor, Harris-Benedict, or Katch-Mcardle.",
    keywords: ["bmr", "basal metabolic rate", "metabolism", "calories", "tdee"],
    relatedCalculators: ["calorie-calculator", "tdee-calculator", "bmi-calculator"],
    inputs: [
      { name: "age", label: "Age", type: "number", defaultValue: 30, min: 15, max: 100, step: 1 },
      { name: "gender", label: "Gender", type: "select", defaultValue: "male", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] },
      { name: "weightKg", label: "Weight (kg)", type: "number", defaultValue: 70, min: 30, max: 250, step: 1 },
      { name: "heightCm", label: "Height (cm)", type: "number", defaultValue: 175, min: 100, max: 230, step: 1 }
    ],
    outputs: [
      { name: "bmrMifflin", label: "BMR (Mifflin-St Jeor)", format: "number", highlight: true, unit: "kcal/day" },
      { name: "bmrHarris", label: "BMR (Harris-Benedict)", format: "number", unit: "kcal/day" },
      { name: "sedentaryCal", label: "Sedentary Maintenance", format: "number", unit: "kcal/day" }
    ],
    calcLogic: `
  const age = Math.max(1, Number(inputs.age) || 30);
  const w = Math.max(1, Number(inputs.weightKg) || 70);
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const isMale = inputs.gender !== "female";
  const mifflin = Math.round(10 * w + 6.25 * h - 5 * age + (isMale ? 5 : -161));
  const harris = Math.round(isMale ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * age : 447.593 + 9.247 * w + 3.098 * h - 4.330 * age);
  const sedentaryCal = Math.round(mifflin * 1.2);
  return { bmrMifflin: Math.max(0, mifflin), bmrHarris: Math.max(0, harris), sedentaryCal };
`,
    formulaStr: "Mifflin-St Jeor: 10W + 6.25H - 5A + S",
    faqs: [
      { question: "What is BMR?", answer: "Basal Metabolic Rate is the number of calories your body burns at rest to maintain essential life functions." }
    ]
  },
  {
    slug: "ideal-weight-calculator",
    id: "ideal-weight-calculator",
    title: "Ideal Weight Calculator",
    subcategory: "Fitness",
    iconName: "Target",
    description: "Find your ideal body weight based on height and gender using Devine, Robinson, Miller, and Hamwi formulas.",
    keywords: ["ideal weight", "healthy weight", "bmi", "target weight"],
    relatedCalculators: ["healthy-weight-calculator", "bmi-calculator", "body-fat-calculator"],
    inputs: [
      { name: "gender", label: "Gender", type: "select", defaultValue: "male", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] },
      { name: "heightCm", label: "Height (cm)", type: "number", defaultValue: 175, min: 120, max: 230, step: 1 }
    ],
    outputs: [
      { name: "devine", label: "Devine Formula", format: "number", highlight: true, unit: "kg" },
      { name: "robinson", label: "Robinson Formula", format: "number", unit: "kg" },
      { name: "miller", label: "Miller Formula", format: "number", unit: "kg" },
      { name: "hamwi", label: "Hamwi Formula", format: "number", unit: "kg" }
    ],
    calcLogic: `
  const h = Math.max(100, Number(inputs.heightCm) || 175);
  const isMale = inputs.gender !== "female";
  const inchesOver60 = Math.max(0, (h - 152.4) / 2.54);
  const devine = parseFloat((isMale ? 50 + 2.3 * inchesOver60 : 45.5 + 2.3 * inchesOver60).toFixed(1));
  const robinson = parseFloat((isMale ? 52 + 1.9 * inchesOver60 : 49 + 1.7 * inchesOver60).toFixed(1));
  const miller = parseFloat((isMale ? 56.2 + 1.41 * inchesOver60 : 53.1 + 1.36 * inchesOver60).toFixed(1));
  const hamwi = parseFloat((isMale ? 48 + 2.7 * inchesOver60 : 45.5 + 2.2 * inchesOver60).toFixed(1));
  return { devine, robinson, miller, hamwi };
`,
    formulaStr: "Devine Formula: Male = 50kg + 2.3kg per inch over 5ft.",
    faqs: [
      { question: "Which formula is most widely used?", answer: "The Devine formula is the most widely used formula in medicine for calculating medication dosages based on IBW." }
    ]
  },
  {
    slug: "pace-calculator",
    id: "pace-calculator",
    title: "Pace Calculator",
    subcategory: "Fitness",
    iconName: "Timer",
    description: "Calculate running or cycling pace per km, per mile, and total speed from distance and time.",
    keywords: ["running pace", "pace calculator", "speed", "marathon", "running"],
    relatedCalculators: ["calories-burned-calculator", "target-heart-rate-calculator"],
    inputs: [
      { name: "distanceKm", label: "Distance (km)", type: "number", defaultValue: 10, min: 0.1, max: 500, step: 0.1 },
      { name: "timeHours", label: "Time (Hours)", type: "number", defaultValue: 0, min: 0, max: 48, step: 1 },
      { name: "timeMinutes", label: "Time (Minutes)", type: "number", defaultValue: 50, min: 0, max: 59, step: 1 },
      { name: "timeSeconds", label: "Time (Seconds)", type: "number", defaultValue: 0, min: 0, max: 59, step: 1 }
    ],
    outputs: [
      { name: "paceKm", label: "Pace per Km", format: "text", highlight: true },
      { name: "paceMile", label: "Pace per Mile", format: "text" },
      { name: "speedKmh", label: "Speed (km/h)", format: "number" },
      { name: "speedMph", label: "Speed (mph)", format: "number" }
    ],
    calcLogic: `
  const dist = Math.max(0.01, Number(inputs.distanceKm) || 10);
  const hrs = Math.max(0, Number(inputs.timeHours) || 0);
  const mins = Math.max(0, Number(inputs.timeMinutes) || 0);
  const secs = Math.max(0, Number(inputs.timeSeconds) || 0);
  const totalSecs = hrs * 3600 + mins * 60 + secs;
  if (totalSecs <= 0) return { paceKm: "00:00 /km", paceMile: "00:00 /mi", speedKmh: 0, speedMph: 0 };
  const secPerKm = totalSecs / dist;
  const secPerMile = secPerKm * 1.60934;
  const formatPace = (s: number) => {
    const m = Math.floor(s / 60);
    const remainder = Math.round(s % 60);
    return \`\${m}:\${remainder < 10 ? "0" : ""}\${remainder}\`;
  };
  const speedKmh = parseFloat((dist / (totalSecs / 3600)).toFixed(2));
  const speedMph = parseFloat((speedKmh / 1.60934).toFixed(2));
  return { paceKm: \`\${formatPace(secPerKm)} /km\`, paceMile: \`\${formatPace(secPerMile)} /mi\`, speedKmh, speedMph };
`,
    formulaStr: "Pace = Total Time / Distance",
    faqs: [
      { question: "What is a good 10k running pace?", answer: "An average recreational runner finishes 10k in 50-60 minutes (5:00 - 6:00 min/km pace)." }
    ]
  },
  {
    slug: "army-body-fat-calculator",
    id: "army-body-fat-calculator",
    title: "Army Body Fat Calculator",
    subcategory: "Fitness",
    iconName: "ShieldCheck",
    description: "Determine body fat compliance according to U.S. Army Standards (AR 600-9 tape test).",
    keywords: ["army body fat", "ar 600-9", "tape test", "military fitness"],
    relatedCalculators: ["body-fat-calculator", "lean-body-mass-calculator"],
    inputs: [
      { name: "gender", label: "Gender", type: "select", defaultValue: "male", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] },
      { name: "age", label: "Age Group", type: "select", defaultValue: "21", options: [
        { label: "17 - 20", value: "18" },
        { label: "21 - 27", value: "24" },
        { label: "28 - 39", value: "33" },
        { label: "40+", value: "45" }
      ] },
      { name: "heightCm", label: "Height (cm)", type: "number", defaultValue: 175, min: 120, max: 230, step: 0.5 },
      { name: "neckCm", label: "Neck (cm)", type: "number", defaultValue: 38, min: 20, max: 60, step: 0.5 },
      { name: "waistCm", label: "Waist (cm)", type: "number", defaultValue: 82, min: 40, max: 180, step: 0.5 },
      { name: "hipCm", label: "Hip (cm - Female)", type: "number", defaultValue: 95, min: 40, max: 180, step: 0.5 }
    ],
    outputs: [
      { name: "bodyFatPercent", label: "Army Body Fat %", format: "percentage", highlight: true },
      { name: "maxAllowed", label: "Max Allowed Body Fat", format: "percentage" },
      { name: "status", label: "Compliance Status", format: "text" }
    ],
    calcLogic: `
  const g = inputs.gender || "male";
  const ageVal = Number(inputs.age) || 24;
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const neck = Math.max(1, Number(inputs.neckCm) || 38);
  const waist = Math.max(1, Number(inputs.waistCm) || 82);
  const hip = Math.max(1, Number(inputs.hipCm) || 95);
  let bf = 16;
  if (g === "male") {
    const val = waist - neck;
    if (val > 0) bf = 86.010 * Math.log10(val) - 70.041 * Math.log10(h) + 36.76;
  } else {
    const val = waist + hip - neck;
    if (val > 0) bf = 163.205 * Math.log10(val) - 97.684 * Math.log10(h) - 78.387;
  }
  bf = Math.min(60, Math.max(3, parseFloat(bf.toFixed(1))));
  let maxAllowed = 22;
  if (g === "male") {
    if (ageVal <= 20) maxAllowed = 20;
    else if (ageVal <= 27) maxAllowed = 22;
    else if (ageVal <= 39) maxAllowed = 24;
    else maxAllowed = 26;
  } else {
    if (ageVal <= 20) maxAllowed = 30;
    else if (ageVal <= 27) maxAllowed = 32;
    else if (ageVal <= 39) maxAllowed = 34;
    else maxAllowed = 36;
  }
  const status = bf <= maxAllowed ? "PASS (Compliant)" : "FAIL (Non-Compliant)";
  return { bodyFatPercent: bf, maxAllowed, status };
`,
    formulaStr: "AR 600-9 Army Body Composition Tape Measurement Standard.",
    faqs: [
      { question: "What happens if a soldier exceeds body fat standards?", answer: "Soldiers who exceed standards are enrolled in the Army Body Composition Program (ABCP)." }
    ]
  },
  {
    slug: "lean-body-mass-calculator",
    id: "lean-body-mass-calculator",
    title: "Lean Body Mass Calculator",
    subcategory: "Fitness",
    iconName: "Dumbbell",
    description: "Calculate Lean Body Mass (LBM) without fat mass using Boer, James, and Hume formulas.",
    keywords: ["lean body mass", "lbm", "fat free mass", "body mass"],
    relatedCalculators: ["body-fat-calculator", "bmi-calculator"],
    inputs: [
      { name: "gender", label: "Gender", type: "select", defaultValue: "male", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] },
      { name: "weightKg", label: "Weight (kg)", type: "number", defaultValue: 75, min: 30, max: 250, step: 0.5 },
      { name: "heightCm", label: "Height (cm)", type: "number", defaultValue: 175, min: 100, max: 230, step: 0.5 }
    ],
    outputs: [
      { name: "boerLbm", label: "Boer Formula LBM", format: "number", highlight: true, unit: "kg" },
      { name: "jamesLbm", label: "James Formula LBM", format: "number", unit: "kg" },
      { name: "humeLbm", label: "Hume Formula LBM", format: "number", unit: "kg" }
    ],
    calcLogic: `
  const isMale = inputs.gender !== "female";
  const w = Math.max(1, Number(inputs.weightKg) || 75);
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const boer = isMale ? 0.407 * w + 0.267 * h - 19.2 : 0.252 * w + 0.473 * h - 48.3;
  const james = isMale ? 1.1 * w - 128 * Math.pow(w / h, 2) : 1.07 * w - 148 * Math.pow(w / h, 2);
  const hume = isMale ? 0.32810 * w + 0.33929 * h - 29.5336 : 0.29569 * w + 0.41813 * h - 43.2933;
  return {
    boerLbm: parseFloat(Math.max(0, boer).toFixed(1)),
    jamesLbm: parseFloat(Math.max(0, james).toFixed(1)),
    humeLbm: parseFloat(Math.max(0, hume).toFixed(1))
  };
`,
    formulaStr: "Boer: Male = 0.407W + 0.267H - 19.2",
    faqs: [
      { question: "Why is Lean Body Mass important?", answer: "LBM includes muscle, bone, organ, and water mass. It determines your metabolic rate and caloric needs." }
    ]
  },
  {
    slug: "healthy-weight-calculator",
    id: "healthy-weight-calculator",
    title: "Healthy Weight Calculator",
    subcategory: "Fitness",
    iconName: "Heart",
    description: "Determine the healthy target weight range for your height based on medical BMI standards.",
    keywords: ["healthy weight", "ideal weight", "bmi range", "target weight"],
    relatedCalculators: ["bmi-calculator", "ideal-weight-calculator"],
    inputs: [
      { name: "heightCm", label: "Height (cm)", type: "number", defaultValue: 175, min: 100, max: 230, step: 1 }
    ],
    outputs: [
      { name: "minWeight", label: "Minimum Healthy Weight (BMI 18.5)", format: "number", unit: "kg" },
      { name: "targetWeight", label: "Optimal Healthy Weight (BMI 22.0)", format: "number", highlight: true, unit: "kg" },
      { name: "maxWeight", label: "Maximum Healthy Weight (BMI 24.9)", format: "number", unit: "kg" }
    ],
    calcLogic: `
  const h = Math.max(50, Number(inputs.heightCm) || 175);
  const hm = h / 100;
  const hm2 = hm * hm;
  const minW = parseFloat((18.5 * hm2).toFixed(1));
  const targetW = parseFloat((22.0 * hm2).toFixed(1));
  const maxW = parseFloat((24.9 * hm2).toFixed(1));
  return { minWeight: minW, targetWeight: targetW, maxWeight: maxW };
`,
    formulaStr: "Healthy Weight Range = 18.5 × [Height(m)]² to 24.9 × [Height(m)]²",
    faqs: [
      { question: "What is considered a medically healthy weight?", answer: "A weight that corresponds to a BMI between 18.5 and 24.9." }
    ]
  },
  {
    slug: "calories-burned-calculator",
    id: "calories-burned-calculator",
    title: "Calories Burned Calculator",
    subcategory: "Fitness",
    iconName: "TrendingUp",
    description: "Estimate calories burned during physical activities such as running, cycling, swimming, and weightlifting.",
    keywords: ["calories burned", "exercise calories", "met", "workout calories"],
    relatedCalculators: ["calorie-calculator", "pace-calculator"],
    inputs: [
      { name: "activity", label: "Activity Type", type: "select", defaultValue: "running_8kmh", options: [
        { label: "Walking (5 km/h)", value: "3.5" },
        { label: "Running (8 km/h)", value: "8.3" },
        { label: "Running (12 km/h)", value: "11.5" },
        { label: "Cycling (moderate)", value: "7.5" },
        { label: "Swimming (freestyle)", value: "8.0" },
        { label: "Weightlifting (intense)", value: "6.0" },
        { label: "Yoga", value: "3.0" }
      ] },
      { name: "weightKg", label: "Your Weight (kg)", type: "number", defaultValue: 70, min: 30, max: 250, step: 1 },
      { name: "durationMins", label: "Duration (minutes)", type: "number", defaultValue: 45, min: 1, max: 600, step: 5 }
    ],
    outputs: [
      { name: "caloriesBurned", label: "Total Calories Burned", format: "number", highlight: true, unit: "kcal" },
      { name: "metValue", label: "MET Value", format: "number" },
      { name: "calPerMin", label: "Burn Rate", format: "number", unit: "kcal/min" }
    ],
    calcLogic: `
  const met = Number(inputs.activity) || 8.3;
  const w = Math.max(1, Number(inputs.weightKg) || 70);
  const mins = Math.max(1, Number(inputs.durationMins) || 45);
  const totalCal = Math.round((met * 3.5 * w / 200) * mins);
  const calPerMin = parseFloat(((met * 3.5 * w / 200)).toFixed(1));
  return { caloriesBurned: Math.max(0, totalCal), metValue: met, calPerMin };
`,
    formulaStr: "Calories = MET × 3.5 × Weight(kg) / 200 × Duration(minutes)",
    faqs: [
      { question: "What is MET?", answer: "MET stands for Metabolic Equivalent of Task, a measure of activity intensity." }
    ]
  },
  {
    slug: "one-rep-max-calculator",
    id: "one-rep-max-calculator",
    title: "One Rep Max Calculator",
    subcategory: "Fitness",
    iconName: "BarChart",
    description: "Calculate your 1RM (One Rep Max) for weightlifting using Epley, Brzycki, and Lander formulas.",
    keywords: ["one rep max", "1rm", "bench press", "squat", "deadlift", "weightlifting"],
    relatedCalculators: ["target-heart-rate-calculator", "calories-burned-calculator"],
    inputs: [
      { name: "weightLiftedKg", label: "Weight Lifted (kg)", type: "number", defaultValue: 80, min: 1, max: 500, step: 2.5 },
      { name: "reps", label: "Repetitions Performed", type: "number", defaultValue: 5, min: 1, max: 15, step: 1 }
    ],
    outputs: [
      { name: "epley1RM", label: "Estimated 1RM (Epley)", format: "number", highlight: true, unit: "kg" },
      { name: "brzycki1RM", label: "Estimated 1RM (Brzycki)", format: "number", unit: "kg" },
      { name: "percent85", label: "85% of 1RM (~6 reps)", format: "number", unit: "kg" },
      { name: "percent75", label: "75% of 1RM (~10 reps)", format: "number", unit: "kg" }
    ],
    calcLogic: `
  const w = Math.max(0, Number(inputs.weightLiftedKg) || 80);
  const r = Math.max(1, Number(inputs.reps) || 5);
  if (w <= 0) return { epley1RM: 0, brzycki1RM: 0, percent85: 0, percent75: 0 };
  const epley = r === 1 ? w : w * (1 + r / 30);
  const brzycki = r === 1 ? w : w * (36 / (37 - r));
  const e1rm = parseFloat(epley.toFixed(1));
  const b1rm = parseFloat(brzycki.toFixed(1));
  return {
    epley1RM: e1rm,
    brzycki1RM: b1rm,
    percent85: parseFloat((e1rm * 0.85).toFixed(1)),
    percent75: parseFloat((e1rm * 0.75).toFixed(1))
  };
`,
    formulaStr: "Epley 1RM = Weight × (1 + Reps/30)",
    faqs: [
      { question: "How accurate is 1RM estimation?", answer: "1RM formulas are most accurate when reps are between 2 and 10." }
    ]
  },
  {
    slug: "target-heart-rate-calculator",
    id: "target-heart-rate-calculator",
    title: "Target Heart Rate Calculator",
    subcategory: "Fitness",
    iconName: "HeartPulse",
    description: "Determine heart rate zones (moderate, vigorous, peak) for cardio training using Karvonen formula.",
    keywords: ["target heart rate", "heart rate zones", "cardio", "max heart rate", "pulse"],
    relatedCalculators: ["pace-calculator", "calories-burned-calculator"],
    inputs: [
      { name: "age", label: "Age", type: "number", defaultValue: 30, min: 10, max: 100, step: 1 },
      { name: "restingHR", label: "Resting Heart Rate (bpm)", type: "number", defaultValue: 65, min: 30, max: 120, step: 1 }
    ],
    outputs: [
      { name: "maxHR", label: "Max Heart Rate", format: "number", highlight: true, unit: "bpm" },
      { name: "moderateZone", label: "Moderate Zone (50-70%)", format: "text" },
      { name: "vigorousZone", label: "Vigorous Zone (70-85%)", format: "text" },
      { name: "peakZone", label: "Peak Zone (85-100%)", format: "text" }
    ],
    calcLogic: `
  const age = Math.max(1, Number(inputs.age) || 30);
  const rhr = Math.max(20, Number(inputs.restingHR) || 65);
  const maxHR = Math.round(208 - 0.7 * age);
  const hrr = Math.max(10, maxHR - rhr);
  const getZone = (minP: number, maxP: number) => \`\${Math.round(rhr + hrr * minP)} - \${Math.round(rhr + hrr * maxP)} bpm\`;
  return {
    maxHR,
    moderateZone: getZone(0.5, 0.7),
    vigorousZone: getZone(0.7, 0.85),
    peakZone: getZone(0.85, 1.0)
  };
`,
    formulaStr: "Max HR = 208 - (0.7 × Age); Target HR = Resting HR + (HRR × Intensity)",
    faqs: [
      { question: "What is Karvonen formula?", answer: "The Karvonen formula takes into account your resting heart rate to calculate personalized training zones." }
    ]
  },

  // PREGNANCY (7)
  {
    slug: "pregnancy-calculator",
    id: "pregnancy-calculator",
    title: "Pregnancy Calculator",
    subcategory: "Pregnancy",
    iconName: "Baby",
    description: "Track pregnancy milestone dates, gestational age in weeks & days, trimester, and estimated due date.",
    keywords: ["pregnancy calculator", "due date", "gestational age", "trimester", "baby due"],
    relatedCalculators: ["due-date-calculator", "ovulation-calculator", "conception-calculator"],
    inputs: [
      { name: "lmpDate", label: "First Day of Last Period", type: "date", defaultValue: "2026-01-01" },
      { name: "cycleLength", label: "Average Cycle Length (days)", type: "number", defaultValue: 28, min: 20, max: 45, step: 1 }
    ],
    outputs: [
      { name: "dueDate", label: "Estimated Due Date", format: "text", highlight: true },
      { name: "gestationalAge", label: "Current Gestational Age", format: "text" },
      { name: "trimester", label: "Current Trimester", format: "text" },
      { name: "conceptionDate", label: "Estimated Conception", format: "text" }
    ],
    calcLogic: `
  const lmpStr = inputs.lmpDate || "2026-01-01";
  const cycle = Number(inputs.cycleLength) || 28;
  const lmp = new Date(lmpStr);
  if (isNaN(lmp.getTime())) return { dueDate: "Invalid Date", gestationalAge: "N/A", trimester: "N/A", conceptionDate: "N/A" };
  const due = new Date(lmp.getTime() + (280 + (cycle - 28)) * 86400000);
  const conception = new Date(due.getTime() - 266 * 86400000);
  const now = new Date();
  const diffDays = Math.max(0, Math.floor((now.getTime() - lmp.getTime()) / 86400000));
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  let trimester = "1st Trimester";
  if (weeks >= 28) trimester = "3rd Trimester";
  else if (weeks >= 13) trimester = "2nd Trimester";
  return {
    dueDate: due.toISOString().split("T")[0],
    gestationalAge: \`\${weeks} weeks, \${days} days\`,
    trimester,
    conceptionDate: conception.toISOString().split("T")[0]
  };
`,
    formulaStr: "Due Date = LMP + 280 Days + (Cycle Length - 28 Days)",
    faqs: [
      { question: "How long is a normal pregnancy?", answer: "A normal full-term pregnancy lasts approximately 40 weeks (280 days) from the first day of the last menstrual period." }
    ]
  },
  {
    slug: "pregnancy-weight-gain-calculator",
    id: "pregnancy-weight-gain-calculator",
    title: "Pregnancy Weight Gain Calculator",
    subcategory: "Pregnancy",
    iconName: "TrendingUp",
    description: "Calculate healthy weight gain targets by week of pregnancy based on Institute of Medicine (IOM) guidelines.",
    keywords: ["pregnancy weight gain", "maternal weight", "iom guidelines", "pregnancy bmi"],
    relatedCalculators: ["pregnancy-calculator", "bmi-calculator"],
    inputs: [
      { name: "preWeightKg", label: "Pre-Pregnancy Weight (kg)", type: "number", defaultValue: 62, min: 30, max: 200, step: 0.5 },
      { name: "heightCm", label: "Height (cm)", type: "number", defaultValue: 165, min: 120, max: 220, step: 1 },
      { name: "week", label: "Current Pregnancy Week", type: "number", defaultValue: 20, min: 1, max: 40, step: 1 }
    ],
    outputs: [
      { name: "preBmi", label: "Pre-Pregnancy BMI", format: "number" },
      { name: "recommendedGainTotal", label: "Recommended Total Weight Gain", format: "text", highlight: true },
      { name: "targetGainWeek", label: "Target Gain for Current Week", format: "text" }
    ],
    calcLogic: `
  const w = Math.max(1, Number(inputs.preWeightKg) || 62);
  const h = Math.max(1, Number(inputs.heightCm) || 165);
  const wk = Math.min(40, Math.max(1, Number(inputs.week) || 20));
  const bmi = parseFloat((w / Math.pow(h / 100, 2)).toFixed(1));
  let minG = 11.5, maxG = 16.0;
  if (bmi < 18.5) { minG = 12.5; maxG = 18.0; }
  else if (bmi >= 30) { minG = 5.0; maxG = 9.0; }
  else if (bmi >= 25) { minG = 7.0; maxG = 11.5; }
  const ratio = wk / 40;
  const targetMin = (minG * ratio).toFixed(1);
  const targetMax = (maxG * ratio).toFixed(1);
  return {
    preBmi: bmi,
    recommendedGainTotal: \`\${minG} kg – \${maxG} kg\`,
    targetGainWeek: \`\${targetMin} kg – \${targetMax} kg\`
  };
`,
    formulaStr: "Based on Institute of Medicine (IOM) pre-pregnancy BMI weight gain targets.",
    faqs: [
      { question: "How much weight should I gain during pregnancy?", answer: "Women with a normal pre-pregnancy BMI should gain 11.5 to 16 kg (25-35 lbs) during pregnancy." }
    ]
  },
  {
    slug: "pregnancy-conception-calculator",
    id: "pregnancy-conception-calculator",
    title: "Pregnancy Conception Calculator",
    subcategory: "Pregnancy",
    iconName: "Calendar",
    description: "Estimate the probable conception date and fertile window based on due date or last period.",
    keywords: ["conception date", "when did i conceive", "conception calculator"],
    relatedCalculators: ["pregnancy-calculator", "due-date-calculator", "ovulation-calculator"],
    inputs: [
      { name: "dueDate", label: "Estimated Due Date", type: "date", defaultValue: "2026-10-08" }
    ],
    outputs: [
      { name: "conceptionDate", label: "Estimated Conception Date", format: "text", highlight: true },
      { name: "fertileWindow", label: "Probable Conception Window", format: "text" }
    ],
    calcLogic: `
  const dueStr = inputs.dueDate || "2026-10-08";
  const due = new Date(dueStr);
  if (isNaN(due.getTime())) return { conceptionDate: "Invalid Date", fertileWindow: "N/A" };
  const conc = new Date(due.getTime() - 266 * 86400000);
  const windowStart = new Date(conc.getTime() - 3 * 86400000);
  const windowEnd = new Date(conc.getTime() + 2 * 86400000);
  return {
    conceptionDate: conc.toISOString().split("T")[0],
    fertileWindow: \`\${windowStart.toISOString().split("T")[0]} to \${windowEnd.toISOString().split("T")[0]}\`
  };
`,
    formulaStr: "Conception Date = Due Date - 266 Days",
    faqs: [
      { question: "How accurate is conception date estimation?", answer: "Conception date is usually estimated within a 3-5 day window around ovulation." }
    ]
  },
  {
    slug: "due-date-calculator",
    id: "due-date-calculator",
    title: "Due Date Calculator",
    subcategory: "Pregnancy",
    iconName: "Clock",
    description: "Calculate estimated delivery due date using Naegele's rule based on last menstrual period.",
    keywords: ["due date", "delivery date", "naegele rule", "baby date"],
    relatedCalculators: ["pregnancy-calculator", "ovulation-calculator"],
    inputs: [
      { name: "lmpDate", label: "First Day of Last Period", type: "date", defaultValue: "2026-01-01" },
      { name: "cycleLength", label: "Cycle Length (days)", type: "number", defaultValue: 28, min: 20, max: 45, step: 1 }
    ],
    outputs: [
      { name: "dueDate", label: "Estimated Due Date", format: "text", highlight: true },
      { name: "daysRemaining", label: "Days Remaining", format: "number" }
    ],
    calcLogic: `
  const lmpStr = inputs.lmpDate || "2026-01-01";
  const cycle = Number(inputs.cycleLength) || 28;
  const lmp = new Date(lmpStr);
  if (isNaN(lmp.getTime())) return { dueDate: "Invalid Date", daysRemaining: 0 };
  const due = new Date(lmp.getTime() + (280 + (cycle - 28)) * 86400000);
  const now = new Date();
  const remaining = Math.max(0, Math.ceil((due.getTime() - now.getTime()) / 86400000));
  return { dueDate: due.toISOString().split("T")[0], daysRemaining: remaining };
`,
    formulaStr: "Naegele's Rule: LMP + 1 year - 3 months + 7 days",
    faqs: [
      { question: "What percentage of babies are born on their exact due date?", answer: "Only about 4% to 5% of babies are born on their exact estimated due date." }
    ]
  },
  {
    slug: "ovulation-calculator",
    id: "ovulation-calculator",
    title: "Ovulation Calculator",
    subcategory: "Pregnancy",
    iconName: "Sparkles",
    description: "Predict fertile window, ovulation day, and next period dates to maximize chances of conception.",
    keywords: ["ovulation", "fertile window", "conception", "fertility"],
    relatedCalculators: ["period-calculator", "pregnancy-calculator"],
    inputs: [
      { name: "lastPeriod", label: "First Day of Last Period", type: "date", defaultValue: "2026-08-01" },
      { name: "cycleLength", label: "Average Cycle Length (days)", type: "number", defaultValue: 28, min: 20, max: 45, step: 1 }
    ],
    outputs: [
      { name: "ovulationDate", label: "Estimated Ovulation Date", format: "text", highlight: true },
      { name: "fertileStart", label: "Fertile Window Start", format: "text" },
      { name: "fertileEnd", label: "Fertile Window End", format: "text" }
    ],
    calcLogic: `
  const lmp = new Date(inputs.lastPeriod || "2026-08-01");
  const cycle = Number(inputs.cycleLength) || 28;
  if (isNaN(lmp.getTime())) return { ovulationDate: "N/A", fertileStart: "N/A", fertileEnd: "N/A" };
  const ov = new Date(lmp.getTime() + (cycle - 14) * 86400000);
  const fStart = new Date(ov.getTime() - 5 * 86400000);
  const fEnd = new Date(ov.getTime() + 1 * 86400000);
  return {
    ovulationDate: ov.toISOString().split("T")[0],
    fertileStart: fStart.toISOString().split("T")[0],
    fertileEnd: fEnd.toISOString().split("T")[0]
  };
`,
    formulaStr: "Ovulation Date = Last Period + Cycle Length - 14 Days",
    faqs: [
      { question: "When is the most fertile window?", answer: "The 5 days leading up to ovulation and ovulation day itself are the most fertile." }
    ]
  },
  {
    slug: "conception-calculator",
    id: "conception-calculator",
    title: "Conception Calculator",
    subcategory: "Pregnancy",
    iconName: "Heart",
    description: "Calculate estimated date of conception and last menstrual period from your estimated due date.",
    keywords: ["conception", "conception date", "pregnancy conception"],
    relatedCalculators: ["pregnancy-conception-calculator", "due-date-calculator"],
    inputs: [
      { name: "dueDate", label: "Estimated Due Date", type: "date", defaultValue: "2026-10-08" }
    ],
    outputs: [
      { name: "conceptionDate", label: "Estimated Conception Date", format: "text", highlight: true },
      { name: "lmpDate", label: "Estimated Last Period", format: "text" }
    ],
    calcLogic: `
  const due = new Date(inputs.dueDate || "2026-10-08");
  if (isNaN(due.getTime())) return { conceptionDate: "N/A", lmpDate: "N/A" };
  const conc = new Date(due.getTime() - 266 * 86400000);
  const lmp = new Date(due.getTime() - 280 * 86400000);
  return {
    conceptionDate: conc.toISOString().split("T")[0],
    lmpDate: lmp.toISOString().split("T")[0]
  };
`,
    formulaStr: "Conception = Due Date - 266 Days",
    faqs: [
      { question: "Is conception date exact?", answer: "Sperm can live in the female reproductive tract for up to 5 days, so conception can occur days after intercourse." }
    ]
  },
  {
    slug: "period-calculator",
    id: "period-calculator",
    title: "Period Calculator",
    subcategory: "Pregnancy",
    iconName: "CalendarDays",
    description: "Predict upcoming menstrual cycles, period start dates, fertile days, and ovulation timing.",
    keywords: ["period calculator", "menstrual cycle", "period tracker", "cycle"],
    relatedCalculators: ["ovulation-calculator", "pregnancy-calculator"],
    inputs: [
      { name: "lastPeriod", label: "First Day of Last Period", type: "date", defaultValue: "2026-08-01" },
      { name: "cycleLength", label: "Cycle Length (days)", type: "number", defaultValue: 28, min: 20, max: 45, step: 1 }
    ],
    outputs: [
      { name: "nextPeriod", label: "Next Period Start Date", format: "text", highlight: true },
      { name: "followingPeriod", label: "Subsequent Period Date", format: "text" }
    ],
    calcLogic: `
  const lmp = new Date(inputs.lastPeriod || "2026-08-01");
  const cycle = Number(inputs.cycleLength) || 28;
  if (isNaN(lmp.getTime())) return { nextPeriod: "N/A", followingPeriod: "N/A" };
  const p1 = new Date(lmp.getTime() + cycle * 86400000);
  const p2 = new Date(lmp.getTime() + cycle * 2 * 86400000);
  return {
    nextPeriod: p1.toISOString().split("T")[0],
    followingPeriod: p2.toISOString().split("T")[0]
  };
`,
    formulaStr: "Next Period Date = Last Period + Cycle Length",
    faqs: [
      { question: "What is an average cycle length?", answer: "A normal menstrual cycle length ranges from 21 to 35 days, with 28 days being average." }
    ]
  },

  // NUTRITION & BODY (9)
  {
    slug: "macro-calculator",
    id: "macro-calculator",
    title: "Macro Calculator",
    subcategory: "Nutrition & Body",
    iconName: "PieChart",
    description: "Calculate optimal daily macronutrient split (Protein, Carbs, Fats) based on fitness goals and diet style.",
    keywords: ["macros", "macronutrients", "protein", "carbs", "fats", "flexible dieting"],
    relatedCalculators: ["protein-calculator", "carbohydrate-calculator", "fat-intake-calculator", "tdee-calculator"],
    inputs: [
      { name: "dailyCalories", label: "Daily Calorie Target (kcal)", type: "number", defaultValue: 2000, min: 800, max: 10000, step: 50 },
      { name: "dietRatio", label: "Diet Ratio Style", type: "select", defaultValue: "balanced", options: [
        { label: "Balanced (50% C / 25% P / 25% F)", value: "balanced" },
        { label: "High Protein (35% C / 40% P / 25% F)", value: "high_protein" },
        { label: "Low Carb (20% C / 40% P / 40% F)", value: "low_carb" },
        { label: "Keto (5% C / 25% P / 70% F)", value: "keto" }
      ] }
    ],
    outputs: [
      { name: "proteinGrams", label: "Protein Target", format: "number", highlight: true, unit: "g" },
      { name: "carbsGrams", label: "Carbohydrates Target", format: "number", unit: "g" },
      { name: "fatGrams", label: "Fat Target", format: "number", unit: "g" }
    ],
    calcLogic: `
  const cal = Math.max(500, Number(inputs.dailyCalories) || 2000);
  let pPct = 0.25, cPct = 0.50, fPct = 0.25;
  if (inputs.dietRatio === "high_protein") { pPct = 0.40; cPct = 0.35; fPct = 0.25; }
  else if (inputs.dietRatio === "low_carb") { pPct = 0.40; cPct = 0.20; fPct = 0.40; }
  else if (inputs.dietRatio === "keto") { pPct = 0.25; cPct = 0.05; fPct = 0.70; }
  const proteinGrams = Math.round((cal * pPct) / 4);
  const carbsGrams = Math.round((cal * cPct) / 4);
  const fatGrams = Math.round((cal * fPct) / 9);
  return { proteinGrams, carbsGrams, fatGrams };
`,
    formulaStr: "Protein (4 kcal/g), Carbs (4 kcal/g), Fats (9 kcal/g)",
    faqs: [
      { question: "What are macronutrients?", answer: "Macronutrients are nutrients the body needs in large amounts: Protein, Carbohydrates, and Fats." }
    ]
  },
  {
    slug: "carbohydrate-calculator",
    id: "carbohydrate-calculator",
    title: "Carbohydrate Calculator",
    subcategory: "Nutrition & Body",
    iconName: "Apple",
    description: "Determine recommended daily carbohydrate intake in grams and calories based on activity level.",
    keywords: ["carbs", "carbohydrate calculator", "carbohydrates", "diet"],
    relatedCalculators: ["macro-calculator", "protein-calculator"],
    inputs: [
      { name: "dailyCalories", label: "Daily Calories (kcal)", type: "number", defaultValue: 2000, min: 800, max: 8000, step: 50 },
      { name: "activityLevel", label: "Activity Level", type: "select", defaultValue: "moderate", options: [
        { label: "Low Activity (45% carbs)", value: "0.45" },
        { label: "Moderate Activity (55% carbs)", value: "0.55" },
        { label: "High Athletic Activity (65% carbs)", value: "0.65" }
      ] }
    ],
    outputs: [
      { name: "carbGrams", label: "Daily Carbohydrates Target", format: "number", highlight: true, unit: "g" },
      { name: "carbCalories", label: "Carbohydrate Calories", format: "number", unit: "kcal" }
    ],
    calcLogic: `
  const cal = Math.max(500, Number(inputs.dailyCalories) || 2000);
  const pct = Number(inputs.activityLevel) || 0.55;
  const carbCalories = Math.round(cal * pct);
  const carbGrams = Math.round(carbCalories / 4);
  return { carbGrams, carbCalories };
`,
    formulaStr: "Carb Grams = (Daily Calories × Carb %) / 4 kcal/g",
    faqs: [
      { question: "Why do athletes need more carbs?", answer: "Carbohydrates replenish glycogen stores, providing primary fuel for intense athletic exertion." }
    ]
  },
  {
    slug: "protein-calculator",
    id: "protein-calculator",
    title: "Protein Calculator",
    subcategory: "Nutrition & Body",
    iconName: "Beef",
    description: "Calculate daily protein requirements for muscle building, fat loss, or endurance training.",
    keywords: ["protein calculator", "daily protein", "muscle building", "protein intake"],
    relatedCalculators: ["macro-calculator", "calorie-calculator"],
    inputs: [
      { name: "weightKg", label: "Body Weight (kg)", type: "number", defaultValue: 70, min: 30, max: 250, step: 1 },
      { name: "goal", label: "Training Goal", type: "select", defaultValue: "strength", options: [
        { label: "Sedentary / General Health (0.8 g/kg)", value: "0.8" },
        { label: "Endurance Athlete (1.4 g/kg)", value: "1.4" },
        { label: "Muscle Gain / Strength (1.8 g/kg)", value: "1.8" },
        { label: "Fat Loss & Preservation (2.2 g/kg)", value: "2.2" }
      ] }
    ],
    outputs: [
      { name: "proteinGrams", label: "Recommended Protein", format: "number", highlight: true, unit: "g" },
      { name: "proteinCalories", label: "Protein Calories", format: "number", unit: "kcal" }
    ],
    calcLogic: `
  const w = Math.max(1, Number(inputs.weightKg) || 70);
  const rate = Number(inputs.goal) || 1.8;
  const proteinGrams = Math.round(w * rate);
  const proteinCalories = Math.round(proteinGrams * 4);
  return { proteinGrams, proteinCalories };
`,
    formulaStr: "Daily Protein = Weight (kg) × Recommended Ratio (g/kg)",
    faqs: [
      { question: "How much protein is needed for muscle growth?", answer: "Research suggests 1.6 to 2.2 grams of protein per kg of body weight for optimal muscle hypertrophy." }
    ]
  },
  {
    slug: "fat-intake-calculator",
    id: "fat-intake-calculator",
    title: "Fat Intake Calculator",
    subcategory: "Nutrition & Body",
    iconName: "Droplet",
    description: "Calculate total daily dietary fat requirements, saturated fat limits, and healthy fat distribution.",
    keywords: ["fat intake", "dietary fat", "healthy fats", "macro fats"],
    relatedCalculators: ["macro-calculator", "tdee-calculator"],
    inputs: [
      { name: "dailyCalories", label: "Daily Calories (kcal)", type: "number", defaultValue: 2000, min: 800, max: 8000, step: 50 },
      { name: "fatPercent", label: "Fat Percentage of Diet", type: "number", defaultValue: 30, min: 10, max: 75, step: 5 }
    ],
    outputs: [
      { name: "fatGrams", label: "Daily Fat Target", format: "number", highlight: true, unit: "g" },
      { name: "satFatMaxGrams", label: "Max Saturated Fat Limit", format: "number", unit: "g" }
    ],
    calcLogic: `
  const cal = Math.max(500, Number(inputs.dailyCalories) || 2000);
  const pct = Math.min(80, Math.max(5, Number(inputs.fatPercent) || 30)) / 100;
  const fatGrams = Math.round((cal * pct) / 9);
  const satFatMaxGrams = Math.round((cal * 0.10) / 9);
  return { fatGrams, satFatMaxGrams };
`,
    formulaStr: "Fat Grams = (Daily Calories × Fat %) / 9 kcal/g",
    faqs: [
      { question: "Why is dietary fat important?", answer: "Fat is essential for hormone production, brain function, and absorption of fat-soluble vitamins (A, D, E, K)." }
    ]
  },
  {
    slug: "tdee-calculator",
    id: "tdee-calculator",
    title: "TDEE Calculator",
    subcategory: "Nutrition & Body",
    iconName: "Flame",
    description: "Calculate Total Daily Energy Expenditure (TDEE) and target calories for cutting or bulking.",
    keywords: ["tdee", "total daily energy expenditure", "calories", "bmr", "cutting", "bulking"],
    relatedCalculators: ["calorie-calculator", "bmr-calculator", "macro-calculator"],
    inputs: [
      { name: "age", label: "Age", type: "number", defaultValue: 25, min: 15, max: 100, step: 1 },
      { name: "gender", label: "Gender", type: "select", defaultValue: "male", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] },
      { name: "weightKg", label: "Weight (kg)", type: "number", defaultValue: 70, min: 30, max: 250, step: 1 },
      { name: "heightCm", label: "Height (cm)", type: "number", defaultValue: 175, min: 100, max: 230, step: 1 },
      { name: "activityLevel", label: "Activity Level", type: "select", defaultValue: "1.55", options: [
        { label: "Sedentary (1.2)", value: "1.2" },
        { label: "Lightly Active (1.375)", value: "1.375" },
        { label: "Moderately Active (1.55)", value: "1.55" },
        { label: "Very Active (1.725)", value: "1.725" }
      ] }
    ],
    outputs: [
      { name: "tdee", label: "TDEE (Maintenance)", format: "number", highlight: true, unit: "kcal/day" },
      { name: "cuttingCalories", label: "Cutting Target (-500 kcal)", format: "number", unit: "kcal/day" },
      { name: "bulkingCalories", label: "Bulking Target (+500 kcal)", format: "number", unit: "kcal/day" }
    ],
    calcLogic: `
  const age = Math.max(1, Number(inputs.age) || 25);
  const w = Math.max(1, Number(inputs.weightKg) || 70);
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const act = Number(inputs.activityLevel) || 1.55;
  const isMale = inputs.gender !== "female";
  const bmr = 10 * w + 6.25 * h - 5 * age + (isMale ? 5 : -161);
  const tdee = Math.round(Math.max(0, bmr * act));
  return {
    tdee,
    cuttingCalories: Math.max(1200, tdee - 500),
    bulkingCalories: tdee + 500
  };
`,
    formulaStr: "TDEE = BMR × Activity Multiplier",
    faqs: [
      { question: "What does TDEE stand for?", answer: "Total Daily Energy Expenditure is the total number of calories burnt per day including exercise." }
    ]
  },
  {
    slug: "gfr-calculator",
    id: "gfr-calculator",
    title: "GFR Calculator",
    subcategory: "Nutrition & Body",
    iconName: "Activity",
    description: "Estimate Glomerular Filtration Rate (eGFR) and kidney health stage using CKD-EPI 2021 formula.",
    keywords: ["gfr", "egfr", "kidney function", "creatinine", "ckd-epi"],
    relatedCalculators: ["body-surface-area-calculator", "bmi-calculator"],
    inputs: [
      { name: "serumCreatinine", label: "Serum Creatinine (mg/dL)", type: "number", defaultValue: 1.0, min: 0.2, max: 15, step: 0.1 },
      { name: "age", label: "Age", type: "number", defaultValue: 50, min: 18, max: 110, step: 1 },
      { name: "gender", label: "Gender", type: "select", defaultValue: "male", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] }
    ],
    outputs: [
      { name: "eGfr", label: "Estimated GFR (eGFR)", format: "number", highlight: true, unit: "mL/min/1.73m²" },
      { name: "stage", label: "CKD Kidney Stage", format: "text" }
    ],
    calcLogic: `
  const scr = Math.max(0.1, Number(inputs.serumCreatinine) || 1.0);
  const age = Math.max(18, Number(inputs.age) || 50);
  const isFemale = inputs.gender === "female";
  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const genderMult = isFemale ? 1.012 : 1.0;
  const scrRatio = scr / kappa;
  const minVal = Math.min(scrRatio, 1);
  const maxVal = Math.max(scrRatio, 1);
  const egfrRaw = 142 * Math.pow(minVal, alpha) * Math.pow(maxVal, -1.200) * Math.pow(0.9938, age) * genderMult;
  const egfr = Math.round(Math.max(0, egfrRaw));
  let stage = "G1 (Normal / High)";
  if (egfr < 15) stage = "G5 (Kidney Failure)";
  else if (egfr < 30) stage = "G4 (Severely Decreased)";
  else if (egfr < 45) stage = "G3b (Moderately to Severely Decreased)";
  else if (egfr < 60) stage = "G3a (Mildly to Moderately Decreased)";
  else if (egfr < 90) stage = "G2 (Mildly Decreased)";
  return { eGfr: egfr, stage };
`,
    formulaStr: "CKD-EPI 2021 Race-Free Creatinine Equation",
    faqs: [
      { question: "What is a normal eGFR value?", answer: "An eGFR of 90 or higher is considered normal in healthy adults." }
    ]
  },
  {
    slug: "body-type-calculator",
    id: "body-type-calculator",
    title: "Body Type Calculator",
    subcategory: "Nutrition & Body",
    iconName: "User",
    description: "Determine body shape classification (Hourglass, Pear, Rectangle, Inverted Triangle, Apple) & WHR health risk.",
    keywords: ["body type", "body shape", "waist to hip ratio", "whr", "body measurements"],
    relatedCalculators: ["body-fat-calculator", "bmi-calculator"],
    inputs: [
      { name: "gender", label: "Gender", type: "select", defaultValue: "female", options: [{ label: "Female", value: "female" }, { label: "Male", value: "male" }] },
      { name: "bustChest", label: "Bust / Chest (cm)", type: "number", defaultValue: 90, min: 40, max: 200, step: 1 },
      { name: "waist", label: "Waist (cm)", type: "number", defaultValue: 70, min: 40, max: 200, step: 1 },
      { name: "hip", label: "Hip (cm)", type: "number", defaultValue: 95, min: 40, max: 200, step: 1 }
    ],
    outputs: [
      { name: "bodyShape", label: "Body Shape Classification", format: "text", highlight: true },
      { name: "whr", label: "Waist-to-Hip Ratio (WHR)", format: "number" },
      { name: "whrRisk", label: "WHR Health Risk Level", format: "text" }
    ],
    calcLogic: `
  const bust = Math.max(1, Number(inputs.bustChest) || 90);
  const waist = Math.max(1, Number(inputs.waist) || 70);
  const hip = Math.max(1, Number(inputs.hip) || 95);
  const isFemale = inputs.gender !== "male";
  const whr = parseFloat((waist / hip).toFixed(2));
  let shape = "Rectangle";
  if (isFemale) {
    if ((bust - hip <= 5 && hip - bust <= 5) && (bust - waist >= 20 || hip - waist >= 20)) shape = "Hourglass";
    else if (hip - bust >= 9) shape = "Pear (Bottom Hourglass)";
    else if (bust - hip >= 9) shape = "Inverted Triangle";
    else if (waist >= bust * 0.85) shape = "Apple";
    else shape = "Banana / Rectangle";
  } else {
    if (whr > 0.95) shape = "Apple";
    else if (bust - hip > 10) shape = "V-Shape / Inverted Triangle";
    else shape = "Rectangle";
  }
  let risk = "Low Risk";
  if (isFemale) {
    if (whr >= 0.85) risk = "High Risk";
    else if (whr >= 0.80) risk = "Moderate Risk";
  } else {
    if (whr >= 1.0) risk = "High Risk";
    else if (whr >= 0.90) risk = "Moderate Risk";
  }
  return { bodyShape: shape, whr, whrRisk: risk };
`,
    formulaStr: "Waist-to-Hip Ratio (WHR) = Waist (cm) / Hip (cm)",
    faqs: [
      { question: "What does Waist-to-Hip ratio indicate?", answer: "WHR indicates body fat distribution. Higher central fat around the abdomen carries greater cardiovascular risk." }
    ]
  },
  {
    slug: "body-surface-area-calculator",
    id: "body-surface-area-calculator",
    title: "Body Surface Area Calculator",
    subcategory: "Nutrition & Body",
    iconName: "Maximize",
    description: "Calculate Body Surface Area (BSA) in square meters using Mosteller, Du Bois, and Haycock formulas.",
    keywords: ["bsa", "body surface area", "mosteller", "du bois"],
    relatedCalculators: ["bmi-calculator", "gfr-calculator"],
    inputs: [
      { name: "weightKg", label: "Weight (kg)", type: "number", defaultValue: 70, min: 10, max: 300, step: 1 },
      { name: "heightCm", label: "Height (cm)", type: "number", defaultValue: 175, min: 50, max: 250, step: 1 }
    ],
    outputs: [
      { name: "mostellerBsa", label: "Mosteller BSA", format: "number", highlight: true, unit: "m²" },
      { name: "duBoisBsa", label: "Du Bois BSA", format: "number", unit: "m²" },
      { name: "haycockBsa", label: "Haycock BSA", format: "number", unit: "m²" }
    ],
    calcLogic: `
  const w = Math.max(1, Number(inputs.weightKg) || 70);
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const mosteller = Math.sqrt((w * h) / 3600);
  const duBois = 0.007184 * Math.pow(w, 0.425) * Math.pow(h, 0.725);
  const haycock = 0.024265 * Math.pow(w, 0.5378) * Math.pow(h, 0.3964);
  return {
    mostellerBsa: parseFloat(mosteller.toFixed(2)),
    duBoisBsa: parseFloat(duBois.toFixed(2)),
    haycockBsa: parseFloat(haycock.toFixed(2))
  };
`,
    formulaStr: "Mosteller BSA = √[ Weight (kg) × Height (cm) / 3600 ]",
    faqs: [
      { question: "Why is BSA used in medicine?", answer: "BSA is used to calculate precise medical dosages (such as chemotherapy) and physiological indices." }
    ]
  },
  {
    slug: "bac-calculator",
    id: "bac-calculator",
    title: "BAC Calculator",
    subcategory: "Nutrition & Body",
    iconName: "Wine",
    description: "Estimate Blood Alcohol Concentration (BAC %) and time required to reach sobriety using Widmark formula.",
    keywords: ["bac", "blood alcohol concentration", "widmark formula", "sobriety", "alcohol level"],
    relatedCalculators: ["calorie-calculator"],
    inputs: [
      { name: "gender", label: "Gender", type: "select", defaultValue: "male", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] },
      { name: "weightKg", label: "Body Weight (kg)", type: "number", defaultValue: 75, min: 30, max: 250, step: 1 },
      { name: "drinksCount", label: "Standard Drinks Consumed", type: "number", defaultValue: 3, min: 1, max: 30, step: 1 },
      { name: "hoursSinceFirst", label: "Hours Since First Drink", type: "number", defaultValue: 2, min: 0.5, max: 24, step: 0.5 }
    ],
    outputs: [
      { name: "bac", label: "Estimated BAC", format: "percentage", highlight: true },
      { name: "sobrietyHours", label: "Hours to 0.00% Sobriety", format: "number", unit: "hours" },
      { name: "status", label: "Impairment Level", format: "text" }
    ],
    calcLogic: `
  const isMale = inputs.gender !== "female";
  const w = Math.max(1, Number(inputs.weightKg) || 75);
  const drinks = Math.max(0, Number(inputs.drinksCount) || 3);
  const hrs = Math.max(0, Number(inputs.hoursSinceFirst) || 2);
  const alcoholGrams = drinks * 14; // 14g alcohol per standard drink
  const r = isMale ? 0.68 : 0.55;
  const rawBac = (alcoholGrams / (w * 1000 * r)) * 100;
  const currentBac = Math.max(0, rawBac - 0.015 * hrs);
  const sobrietyHours = parseFloat((rawBac / 0.015).toFixed(1));
  let status = "Below Legal Limit";
  if (currentBac >= 0.08) status = "Legally Intoxicated (Driving Impaired)";
  else if (currentBac > 0.02) status = "Mildly Impaired";
  return {
    bac: parseFloat(currentBac.toFixed(3)),
    sobrietyHours,
    status
  };
`,
    formulaStr: "Widmark Formula: BAC = [Alcohol(g) / (Weight(g) × r)] × 100 - (0.015 × Hours)",
    faqs: [
      { question: "What is considered a standard drink?", answer: "In the US, one standard drink contains ~14 grams of pure alcohol (e.g., 12 oz beer at 5%, 5 oz wine at 12%)." }
    ]
  }
];

// Helper to write files
calculators.forEach((calc) => {
  const targetDir = path.join(__dirname, "..", "src", "app", "calculators", calc.slug);
  fs.mkdirSync(targetDir, { recursive: true });

  const className = calc.title.replace(/[\s\-\&\(\)]/g, "");

  // 1. types.ts
  const typesContent = `export interface ${className}Inputs {
${calc.inputs.map(i => `  ${i.name}?: ${i.type === "number" ? "number" : "string"};`).join("\n")}
}

export interface ${className}Outputs {
${calc.outputs.map(o => `  ${o.name}: ${o.format === "number" || o.format === "currency" || o.format === "percentage" ? "number" : "string"};`).join("\n")}
}
`;

  // 2. calculator.ts
  const calcContent = `import { ${className}Outputs } from "./types";

export function calculate${className}(inputs: Record<string, any>): ${className}Outputs {${calc.calcLogic}}
`;

  // 3. schema.ts
  const schemaContent = `import { z } from "zod";

export const ${calc.slug.replace(/-/g, "_")}Schema = z.object({
${calc.inputs.map(i => `  ${i.name}: z.${i.type === "number" ? "number()" : "string()"}.optional(),`).join("\n")}
});
`;

  // 4. metadata.ts
  const metaContent = `import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ${calc.slug.replace(/-/g, "_")}Metadata: Metadata = generateCalculatorMetadata({
  title: "${calc.title} — Free Online Health Calculator",
  description: "${calc.description}",
  slug: "${calc.slug}",
});
`;

  // 5. faq.ts
  const faqContent = `import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const ${calc.slug.replace(/-/g, "_")}Faqs: CalculatorFAQ[] = ${JSON.stringify(calc.faqs, null, 2)};
`;

  // 6. content.ts
  const contentContent = `export const ${calc.slug.replace(/-/g, "_")}Content = {
  title: "${calc.title}",
  formula: "${calc.formulaStr}",
  description: "${calc.description}",
  article: \`
### Overview of ${calc.title}
${calc.description}

### Formula and Calculation Method
The calculation uses standard clinical and mathematical guidelines:
**\${"${calc.formulaStr}"}**

### How to Interpret Your Results
Review the calculated metrics with your healthcare provider for clinical guidance.
  \`,
  references: [
    "World Health Organization (WHO) Health & Clinical Guidelines",
    "National Institutes of Health (NIH) Medical & Nutritional Reference Standards"
  ]
};
`;

  // 7. examples.ts
  const examplesContent = `export const ${calc.slug.replace(/-/g, "_")}Examples = [
  {
    title: "Standard ${calc.title} Example",
    inputs: ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: i.defaultValue }), {}), null, 2)},
    explanation: "Standard reference input calculation."
  }
];
`;

  // 8. config.ts
  const configContent = `import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculate${className} } from "./calculator";
import { ${calc.slug.replace(/-/g, "_")}Faqs } from "./faq";

export const ${calc.slug.replace(/-/g, "_")}Config: CalculatorModuleDefinition = {
  id: "${calc.id}",
  title: "${calc.title}",
  slug: "${calc.slug}",
  category: "Health",
  subcategory: "${calc.subcategory}",
  description: "${calc.description}",
  iconName: "${calc.iconName}",
  featured: true,
  keywords: ${JSON.stringify(calc.keywords)},
  priority: 1,
  relatedCalculators: ${JSON.stringify(calc.relatedCalculators)},
  formulaDescription: "${calc.formulaStr}",
  faqs: ${calc.slug.replace(/-/g, "_")}Faqs,
  inputs: ${JSON.stringify(calc.inputs, null, 2)},
  outputs: ${JSON.stringify(calc.outputs, null, 2)},
  calculate: calculate${className},
};

export default ${calc.slug.replace(/-/g, "_")}Config;
`;

  // 9. tests.ts
  const testsContent = `import { calculate${className} } from "./calculator";

export function run${className}Tests() {
  const defaultInputs = ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: i.defaultValue }), {}), null, 2)};
  const res1 = calculate${className}(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: 0 }), {}), null, 2)};
  const res2 = calculate${className}(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: -50 }), {}), null, 2)};
  const res3 = calculate${className}(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: NaN }), {}), null, 2)};
  const res4 = calculate${className}(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
`;

  // 10. page.tsx
  const pageContent = `import { Metadata } from "next";
import { ${calc.slug.replace(/-/g, "_")}Metadata } from "./metadata";
import { ${calc.slug.replace(/-/g, "_")}Config } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = ${calc.slug.replace(/-/g, "_")}Metadata;

export default function ${className}Page() {
  const { calculate, ...serializableDef } = ${calc.slug.replace(/-/g, "_")}Config;
  const schemas = generateJsonLdSchema({
    title: ${calc.slug.replace(/-/g, "_")}Config.title,
    description: ${calc.slug.replace(/-/g, "_")}Config.description,
    slug: ${calc.slug.replace(/-/g, "_")}Config.slug,
    category: ${calc.slug.replace(/-/g, "_")}Config.category,
    faqs: ${calc.slug.replace(/-/g, "_")}Config.faqs,
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CalculatorLayout definition={serializableDef} />
    </>
  );
}
`;

  fs.writeFileSync(path.join(targetDir, "types.ts"), typesContent);
  fs.writeFileSync(path.join(targetDir, "calculator.ts"), calcContent);
  fs.writeFileSync(path.join(targetDir, "schema.ts"), schemaContent);
  fs.writeFileSync(path.join(targetDir, "metadata.ts"), metaContent);
  fs.writeFileSync(path.join(targetDir, "faq.ts"), faqContent);
  fs.writeFileSync(path.join(targetDir, "content.ts"), contentContent);
  fs.writeFileSync(path.join(targetDir, "examples.ts"), examplesContent);
  fs.writeFileSync(path.join(targetDir, "config.ts"), configContent);
  fs.writeFileSync(path.join(targetDir, "tests.ts"), testsContent);
  fs.writeFileSync(path.join(targetDir, "page.tsx"), pageContent);

  console.log(`Generated ${calc.slug}`);
});

// Write src/calculators/health/index.ts
const healthIndexContent = `import { CalculatorModuleDefinition } from "../types";
${calculators.map(c => `import { ${c.slug.replace(/-/g, "_")}Config } from "@/app/calculators/${c.slug}/config";`).join("\n")}

export const HEALTH_CALCULATORS: CalculatorModuleDefinition[] = [
${calculators.map(c => `  ${c.slug.replace(/-/g, "_")}Config,`).join("\n")}
];

export default HEALTH_CALCULATORS;
`;

fs.writeFileSync(path.join(__dirname, "..", "src", "calculators", "health", "index.ts"), healthIndexContent);
console.log("Updated src/calculators/health/index.ts successfully!");
