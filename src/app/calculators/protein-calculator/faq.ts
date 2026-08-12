export interface FAQItem {
  question: string;
  answer: string;
}

export const protein_calculatorFaqs: FAQItem[] = [
  {
    question: "What is a protein calculator?",
    answer: "A protein calculator is an advanced nutrition tool that estimates your total daily energy expenditure (TDEE) and determines your optimal daily protein intake in grams, grams per pound/kg of body weight, and per-meal targets based on your age, gender, activity level, and fitness goals."
  },
  {
    question: "How much protein do I need per day?",
    answer: "Protein requirements depend on physical activity and fitness goals. The RDA baseline is 0.8 grams per kg of body weight (0.36g/lb). For active individuals and lifters, evidence-based recommendations range from 1.6 to 2.4 grams per kg (0.8 to 1.1g/lb) per day."
  },
  {
    question: "What is the difference between RDA and optimal protein intake?",
    answer: "The Recommended Dietary Allowance (RDA) of 0.8g/kg is the minimum intake required to prevent nutritional deficiency in sedentary adults. Optimal protein intake for muscle building, athletic performance, and fat loss is 1.6 to 2.4g/kg."
  },
  {
    question: "What is the Leucine Trigger for Muscle Protein Synthesis (MPS)?",
    answer: "Leucine is the key essential amino acid that initiates the mTOR signaling pathway for Muscle Protein Synthesis. Consuming 2.5 to 3.5 grams of Leucine per meal (typically ~30–40g of high-quality protein) triggers maximal anabolic muscle building."
  },
  {
    question: "What are complete vs incomplete proteins?",
    answer: "Complete proteins contain all 9 essential amino acids (EAAs) in adequate proportions (animal meats, poultry, fish, eggs, dairy, soy, quinoa). Incomplete proteins lack one or more essential amino acids (nuts, grains, vegetables)."
  },
  {
    question: "What are the 9 Essential Amino Acids (EAAs)?",
    answer: "The 9 EAAs that the human body cannot synthesize internally are Leucine, Isoleucine, Valine, Lysine, Methionine, Phenylalanine, Threonine, Tryptophan, and Histidine."
  },
  {
    question: "How much extra protein is needed during pregnancy?",
    answer: "Dietary guidelines recommend an additional +1g/day in Trimester 1, +10g/day in Trimester 2, and +31g/day in Trimester 3 to support maternal tissue expansion and fetal growth."
  },
  {
    question: "How much extra protein is needed during lactation?",
    answer: "Lactating mothers require an additional +19g of protein per day during the first 6 months of breastfeeding, and +13g of protein per day after 6 months to maintain milk production and lean tissue."
  },
  {
    question: "Why do seniors and older adults need more protein?",
    answer: "Older adults experience anabolic resistance and age-related muscle loss (sarcopenia). Consuming 1.2 to 1.5g/kg of protein per day helps maintain muscle mass, bone density, and functional mobility."
  },
  {
    question: "Do vegans need to eat more protein?",
    answer: "Yes. Plant proteins generally have lower digestibility (DIAAS scores) and lower essential amino acid concentrations. Increasing plant protein intake by ~10% to 15% compensates for lower bioavailability."
  },
  {
    question: "How much protein should I eat per meal?",
    answer: "Spacing protein intake into 3 to 5 meals of 30 to 45 grams per meal (or 0.4g/kg per meal) optimizes Muscle Protein Synthesis throughout the day."
  },
  {
    question: "Can eating too much protein damage healthy kidneys?",
    answer: "In healthy individuals with normal renal function, high-protein diets up to 2.8g/kg (1.3g/lb) show no adverse effects on kidney function. Individuals with pre-existing kidney disease must follow clinical protein restriction."
  },
  {
    question: "What is the Thermic Effect of Protein (TEF)?",
    answer: "Protein has a high Thermic Effect of Food (TEF ~20% to 30%), meaning 20-30% of the calories in protein are consumed during digestion and metabolization, aiding fat loss."
  },
  {
    question: "What are the best high-protein foods?",
    answer: "Top sources include chicken breast (26g per 3oz), lean beef (22g per 3oz), salmon (22g per 3oz), Greek yogurt (23g per cup), cottage cheese (28g per cup), eggs (6.3g per egg), tofu (11g per 4oz), and seitan."
  },
  {
    question: "Is whey protein better than plant protein?",
    answer: "Whey protein is a fast-digesting complete protein with high Leucine content (~11%). Plant protein blends (e.g. pea + rice) match whey's anabolic effect when consumed in equivalent Leucine doses."
  },
  {
    question: "How much protein do I need for fat loss (cutting)?",
    answer: "During a calorie deficit, protein requirements increase to 2.2–2.6g/kg (1.0–1.2g/lb) of body weight to preserve lean muscle tissue and maintain satiety."
  },
  {
    question: "How much protein do I need for muscle building (hypertrophy)?",
    answer: "For muscle hypertrophy in resistance-trained lifters, 1.6 to 2.2g/kg (0.8 to 1.0g/lb) of body weight per day is optimal."
  },
  {
    question: "What is nitrogen balance?",
    answer: "Nitrogen balance measures protein metabolism by comparing dietary nitrogen intake against nitrogen excretion. Positive nitrogen balance indicates muscle growth, while negative balance indicates muscle catabolism."
  },
  {
    question: "Should I drink a protein shake immediately after working out?",
    answer: "While the 'anabolic window' is wider than previously thought (1–2 hours post-workout), consuming 30–40g of fast-digesting protein post-workout supports rapid recovery."
  },
  {
    question: "How does protein help with weight loss?",
    answer: "Protein boosts satiety hormones (PYY, GLP-1), reduces hunger hormones (ghrelin), increases daily calorie burning via TEF, and preserves metabolic muscle mass during a deficit."
  },
  {
    question: "What is BCAA and do I need to supplement it?",
    answer: "BCAAs (Branch-Chain Amino Acids: Leucine, Isoleucine, Valine) trigger MPS. If you consume sufficient whole complete protein, BCAA supplementation is unnecessary."
  },
  {
    question: "How many calories are in 1 gram of protein?",
    answer: "1 gram of protein yields 4 calories (kcal) of energy."
  },
  {
    question: "What happens if I don't eat enough protein?",
    answer: "Inadequate protein intake leads to muscle atrophy, slower recovery, weakened immunity, hair/skin degradation, and reduced metabolic rate."
  },
  {
    question: "How much protein do endurance runners need?",
    answer: "Endurance runners require 1.4 to 1.8g/kg (0.6 to 0.8g/lb) per day to repair oxidative muscle damage and replenish mitochondrial enzymes."
  },
  {
    question: "How much protein do strength lifters need?",
    answer: "Powerlifters and bodybuilders require 1.8 to 2.4g/kg (0.8 to 1.1g/lb) of body weight per day for maximal strength gains."
  },
  {
    question: "Can excess protein be stored as body fat?",
    answer: "Excess protein calories can theoretically be converted to fatty acids via de novo lipogenesis, but this process is metabolically inefficient compared to excess carbs or fats."
  },
  {
    question: "How do I combine incomplete plant proteins?",
    answer: "Combine grains (low in Lysine, high in Methionine) with legumes (high in Lysine, low in Methionine)—for example, rice and beans, or peanut butter on whole wheat toast."
  },
  {
    question: "Is protein intake calculated on total body weight or lean body mass?",
    answer: "For individuals with average body fat, total body weight is standard. For individuals with obesity (BMI > 30), protein should be calculated based on target or lean body mass (LBM)."
  },
  {
    question: "What is casein protein?",
    answer: "Casein is a slow-digesting dairy protein that forms a gel in the stomach, releasing amino acids slowly over 6 to 8 hours (ideal for pre-bedtime consumption)."
  },
  {
    question: "What is DIAAS (Digestible Indispensable Amino Acid Score)?",
    answer: "DIAAS is the modern gold-standard method for evaluating protein quality based on ileal amino acid digestibility."
  },
  {
    question: "Does drinking water help digest protein?",
    answer: "Yes. Water supports liver urea synthesis and renal filtration of nitrogenous waste produced during amino acid breakdown."
  },
  {
    question: "How does age affect protein absorption?",
    answer: "Aging reduces digestive enzyme secretion and muscle anabolic sensitivity, requiring higher per-meal protein doses (35-45g) to trigger MPS."
  },
  {
    question: "Can I get all my protein from food without supplements?",
    answer: "Absolutely! Whole foods provide complete amino acid profiles along with vitamins, minerals, and healthy fats."
  },
  {
    question: "What is the protein content of eggs?",
    answer: "One large egg contains approximately 6.3 grams of high-bioavailability complete protein (3.6g in the white, 2.7g in the yolk)."
  },
  {
    question: "What is the protein content of chicken breast?",
    answer: "A 3-ounce (85g) cooked chicken breast contains approximately 26 grams of complete protein and 2.3 grams of Leucine."
  },
  {
    question: "How does sleep affect muscle protein synthesis?",
    answer: "Growth hormone peak secretion occurs during deep stage-3 sleep, facilitating muscle repair when amino acids are present in the bloodstream."
  },
  {
    question: "How do I track raw vs cooked meat protein?",
    answer: "3 ounces of cooked meat equals roughly 4 ounces of raw meat due to water loss during cooking."
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer: "BMR is your baseline calories burned at rest. TDEE includes BMR plus calories burned through physical exercise and daily movement."
  },
  {
    question: "How often should I recalculate my protein targets?",
    answer: "Recalculate protein targets every time your body weight changes by 5 to 10 lbs or when your workout training volume changes."
  },
  {
    question: "Why is Calculator.net's protein calculator less comprehensive than this platform?",
    answer: "Calculator.net provides static formulas with basic outputs. Our suite offers 10 modes, 5 BMR formulas, Leucine & EAA profiling, pregnancy trimester additions, senior sarcopenia guidelines, searchable 40+ food database, and downloadable PDF reports."
  }
];
