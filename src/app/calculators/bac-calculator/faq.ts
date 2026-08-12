export interface BacFaqItem {
  question: string;
  answer: string;
  category: "BAC Fundamentals" | "Widmark Math & Science" | "DUI Legal Limits" | "Metabolism & Sobriety" | "Health & Safety";
}

export const bacFaqs: BacFaqItem[] = [
  // BAC Fundamentals (1-10)
  {
    question: "What is Blood Alcohol Concentration (BAC)?",
    answer: "Blood Alcohol Concentration (BAC) measures the mass of pure alcohol in a person's bloodstream, expressed as a percentage of alcohol per volume of blood (g/dL). For example, a BAC of 0.08% means there is 0.08 grams of alcohol for every 100 mL of blood.",
    category: "BAC Fundamentals",
  },
  {
    question: "What is considered a 'standard drink'?",
    answer: "In the United States, a standard drink contains approximately 14 grams (0.6 fluid ounces) of pure alcohol. This equals roughly 12 oz of 5% ABV beer, 5 oz of 12% ABV wine, or 1.5 oz of 40% (80 proof) distilled spirits.",
    category: "BAC Fundamentals",
  },
  {
    question: "What BAC level is illegal for driving?",
    answer: "In the United States, United Kingdom, and Canada, the legal limit for non-commercial drivers aged 21 and older is 0.08% BAC. In the European Union, Australia, and South Africa, the limit is stricter at 0.05% BAC. Commercial drivers and drivers under 21 face zero-tolerance limits (0.00% to 0.02%).",
    category: "BAC Fundamentals",
  },
  {
    question: "How long does it take for alcohol to reach peak BAC?",
    answer: "Alcohol peak concentration typically occurs 30 to 60 minutes after drinking on an empty stomach. If alcohol is consumed with a heavy meal, peak absorption may be delayed up to 90 minutes.",
    category: "BAC Fundamentals",
  },
  {
    question: "Why does gender affect Blood Alcohol Concentration?",
    answer: "Females generally reach higher peak BAC levels than males of identical body weight. Females naturally possess a higher body fat percentage and lower total body water ratio (water distribution factor r ≈ 0.55 vs 0.68 in males), and lower levels of stomach gastric alcohol dehydrogenase enzymes.",
    category: "BAC Fundamentals",
  },
  {
    question: "What is the average rate of alcohol elimination?",
    answer: "The human liver metabolizes alcohol at a average constant rate of approximately 0.015% BAC per hour (or about 1 standard drink per hour). This clearance rate remains fixed regardless of coffee, exercise, or cold showers.",
    category: "BAC Fundamentals",
  },
  {
    question: "How many calories are in alcohol?",
    answer: "Pure alcohol provides 7 calories per gram (7 kcal/g), making it almost as energy-dense as fat (9 kcal/g) and significantly higher than carbohydrates or protein (4 kcal/g).",
    category: "BAC Fundamentals",
  },
  {
    question: "Can you feel completely sober even if your BAC is over 0.08%?",
    answer: "Yes. Regular drinkers can develop functional tolerance, appearing and feeling un-impaired at 0.08% BAC or higher. However, motor reflexes, depth perception, and reaction times remain biologically impaired, and driving remains 100% illegal.",
    category: "BAC Fundamentals",
  },
  {
    question: "What is the difference between BAC percentage and g/L?",
    answer: "BAC percentage (%) measures grams per 100 mL of blood, while g/L (grams per liter) measures grams per 1,000 mL. To convert BAC % to g/L, multiply by 10 (e.g., 0.08% BAC = 0.80 g/L).",
    category: "BAC Fundamentals",
  },
  {
    question: "What is breath alcohol concentration (BrAC)?",
    answer: "BrAC measures alcohol expelled in breath. Police breathalyzers use a blood-to-breath partition ratio of 2,100:1 to calculate BAC from breath samples (2,100 mL of breath contains the same alcohol mass as 1 mL of blood).",
    category: "BAC Fundamentals",
  },

  // Widmark Math & Science (11-20)
  {
    question: "What is the Widmark Formula?",
    answer: "Created by Swedish chemist Erik Widmark in 1932, the formula estimates BAC: BAC (%) = [ Alcohol (g) / (Weight (g) × r) ] × 100 - (Beta × Hours). 'r' is the body water distribution factor, and 'Beta' is the metabolism elimination rate (~0.015%/hr).",
    category: "Widmark Math & Science",
  },
  {
    question: "What is the Seidl Anthropometric equation?",
    answer: "Published by Seidl et al. in 1990, it refined Widmark's gender factor 'r' by incorporating both height and weight to account for lean body mass and precise total body water distribution.",
    category: "Widmark Math & Science",
  },
  {
    question: "What is the Watson Total Body Water (TBW) formula?",
    answer: "The Watson formula (1980) estimates Total Body Water in liters using age, height, and weight. It allows clinical toxicologists to calculate individual alcohol distribution volume with high precision.",
    category: "Widmark Math & Science",
  },
  {
    question: "How does body weight impact alcohol concentration?",
    answer: "Larger body mass provides a larger volume of blood and body water to dilute consumed alcohol. A 200 lb person will have roughly half the BAC of a 100 lb person after consuming the exact same drink.",
    category: "Widmark Math & Science",
  },
  {
    question: "Why is alcohol metabolism linear (zero-order kinetics)?",
    answer: "Hepatic alcohol dehydrogenase (ADH) enzymes become fully saturated at very low alcohol levels. As a result, the liver metabolizes alcohol at a constant linear rate (zero-order elimination) rather than a percentage-based exponential curve.",
    category: "Widmark Math & Science",
  },
  {
    question: "How does age affect BAC calculations?",
    answer: "As adults age, total body water decreases and metabolic efficiency slows. Consequently, older adults experience higher peak BAC levels and slower elimination rates compared to younger individuals of identical weight.",
    category: "Widmark Math & Science",
  },
  {
    question: "What is the specific gravity of pure alcohol?",
    answer: "The specific gravity (density) of pure ethanol is 0.7891 g/mL. This density factor is essential when converting liquid drink volume (mL or oz) into pure alcohol mass in grams.",
    category: "Widmark Math & Science",
  },
  {
    question: "How do carbonated mixers affect alcohol absorption?",
    answer: "Carbonated mixers (like soda or tonic water) increase stomach pressure and speed up gastric emptying, causing alcohol to enter the small intestine faster and raising peak BAC levels more rapidly.",
    category: "Widmark Math & Science",
  },
  {
    question: "Does altitude affect Blood Alcohol Concentration?",
    answer: "Altitude does not change blood alcohol concentration math. However, hypoxia at high altitudes causes lightheadedness and impaired coordination that compounds the cognitive effects of alcohol.",
    category: "Widmark Math & Science",
  },
  {
    question: "What is retrograde extrapolation in forensic toxicology?",
    answer: "Retrograde extrapolation is a mathematical technique used by forensic toxicologists to estimate a driver's BAC at the time of an accident by calculating back from a breathalyzer test taken hours later.",
    category: "Widmark Math & Science",
  },

  // DUI Legal Limits (21-30)
  {
    question: "Can you be arrested for DUI with a BAC below 0.08%?",
    answer: "Yes. In almost all US states, law enforcement can arrest drivers for DUI/OWI if officers observe dangerous driving, physical impairment, or failed field sobriety tests, even if the BAC is below 0.08%.",
    category: "DUI Legal Limits",
  },
  {
    question: "What are the penalties for a first-time DUI conviction?",
    answer: "Penalties for a first-time DUI typically include driver's license suspension (3 to 12 months), mandatory fines ($500 to $2,000), DUI education classes, probation, increased auto insurance rates, and potential jail time.",
    category: "DUI Legal Limits",
  },
  {
    question: "What is the legal BAC limit for commercial truck drivers?",
    answer: "In the US, the Federal Motor Carrier Safety Administration (FMCSA) sets a strict legal BAC limit of 0.04% for commercial driver's license (CDL) holders operating commercial vehicles.",
    category: "DUI Legal Limits",
  },
  {
    question: "What is Zero Tolerance for underage drivers?",
    answer: "Underage drinking laws prohibit drivers under age 21 from operating a vehicle with any measurable alcohol level (typically 0.00% to 0.02% BAC, depending on state regulations).",
    category: "DUI Legal Limits",
  },
  {
    question: "What is an Ignition Interlock Device (IID)?",
    answer: "An Ignition Interlock Device is a breathalyzer wired into a vehicle's ignition system. The driver must blow into the mouthpiece and test below a preset BAC threshold (usually 0.02%) before the engine will start.",
    category: "DUI Legal Limits",
  },
  {
    question: "Which countries have 0.00% absolute zero-tolerance driving laws?",
    answer: "Countries including Brazil, Czech Republic, Hungary, Paraguay, Romania, Qatar, and the UAE enforce absolute 0.00% zero-tolerance BAC driving laws with severe criminal penalties.",
    category: "DUI Legal Limits",
  },
  {
    question: "How accurate are portable police breathalyzers?",
    answer: "Evidentiary station breathalyzers are highly accurate when calibrated properly. Portable roadside preliminary breath test (PBT) units are used to establish probable cause and may have a margin of error of ±0.005% to ±0.010%.",
    category: "DUI Legal Limits",
  },
  {
    question: "Does refusing a breathalyzer test prevent a DUI conviction?",
    answer: "No. All 50 US states enforce 'Implied Consent' laws. Refusing a test results in immediate mandatory license suspension (typically 1 year) and prosecutors can still use officer testimony and field sobriety video in court.",
    category: "DUI Legal Limits",
  },
  {
    question: "What is an Enhanced Penalty BAC threshold?",
    answer: "Most jurisdictions enforce harsher mandatory penalties, higher fines, and mandatory jail time if a driver's BAC tests at or above an extreme threshold—typically 0.15% or 0.20% BAC.",
    category: "DUI Legal Limits",
  },
  {
    question: "How long does a DUI conviction stay on your driving record?",
    answer: "Depending on state law, a DUI conviction remains on a driving record for 5 to 10 years, and in states like California, Florida, and Texas, it may permanently remain on your criminal record.",
    category: "DUI Legal Limits",
  },

  // Metabolism & Sobriety (31-40)
  {
    question: "Can drinking coffee or taking a cold shower sober you up faster?",
    answer: "No. Coffee (caffeine) makes you a more alert intoxicated person, and cold showers shock your nervous system, but NEITHER speeds up liver alcohol breakdown. Only TIME clears alcohol from your system.",
    category: "Metabolism & Sobriety",
  },
  {
    question: "Does eating food after drinking lower your BAC?",
    answer: "Eating food AFTER drinking does not lower existing alcohol already in your blood. However, eating food BEFORE drinking coats the stomach lining, delaying gastric emptying and lowering peak BAC.",
    category: "Metabolism & Sobriety",
  },
  {
    question: "Why do hangovers occur the morning after drinking?",
    answer: "Hangovers are caused by dehydration, toxic acetaldehyde buildup, electrolyte imbalance, stomach lining inflammation, disrupted sleep architecture, and low blood sugar (hypoglycemia).",
    category: "Metabolism & Sobriety",
  },
  {
    question: "Can you still test positive for BAC the morning after drinking?",
    answer: "Yes. If a person goes to bed at 2:00 AM with a high BAC of 0.20%, after 6 hours of sleep (at 8:00 AM), their BAC will still be approximately 0.11%—well above the legal driving limit.",
    category: "Metabolism & Sobriety",
  },
  {
    question: "What organ metabolizes the majority of ingested alcohol?",
    answer: "The liver metabolizes over 90% to 95% of consumed alcohol via the enzymes Alcohol Dehydrogenase (ADH) and Acetaldehyde Dehydrogenase (ALDH). The remaining 5% is excreted unchanged in breath, sweat, and urine.",
    category: "Metabolism & Sobriety",
  },
  {
    question: "Why do some people experience 'Asian Flush' facial redness?",
    answer: "Facial flushing is caused by a genetic variant in the ALDH2 gene, leading to deficient acetaldehyde dehydrogenase. Acetaldehyde builds up rapidly in tissues, causing facial redness, nausea, and rapid heart rate.",
    category: "Metabolism & Sobriety",
  },
  {
    question: "How does hydration affect alcohol recovery?",
    answer: "Alcohol inhibits Antidiuretic Hormone (ADH/Vasopressin), causing excessive kidney urination and fluid loss. Drinking water restores plasma volume and mitigates hangover headaches.",
    category: "Metabolism & Sobriety",
  },
  {
    question: "What is the difference between alcohol tolerance and BAC?",
    answer: "Tolerance is your brain's adaptation to functional impairment. BAC is the physical percentage of alcohol in your blood. High tolerance does NOT lower your BAC or change liver metabolism speed.",
    category: "Metabolism & Sobriety",
  },
  {
    question: "Can medications interact with alcohol metabolism?",
    answer: "Yes. Medications like H2-blockers (Zantac, Pepcid), aspirin, and sedatives can inhibit stomach ADH enzymes or interact dangerously with central nervous system depression.",
    category: "Metabolism & Sobriety",
  },
  {
    question: "How long can alcohol be detected in urine and hair tests?",
    answer: "Standard urine tests detect alcohol for 10-12 hours. Advanced Ethyl Glucuronide (EtG) urine metabolite tests detect alcohol up to 72-80 hours, and hair tests detect heavy drinking up to 90 days.",
    category: "Metabolism & Sobriety",
  },

  // Health & Safety (41-50)
  {
    question: "What BAC level causes alcohol poisoning and coma?",
    answer: "A BAC of 0.30% to 0.39% causes severe central nervous system depression, loss of consciousness, and stupor. A BAC of 0.40% or higher is life-threatening, frequently causing coma and fatal respiratory arrest.",
    category: "Health & Safety",
  },
  {
    question: "What are the signs of acute alcohol poisoning?",
    answer: "Signs include un-reactivity or coma, slow breathing (fewer than 8 breaths per minute), irregular breathing (gap > 10 seconds), pale or bluish skin, vomiting while unconscious, and seizures.",
    category: "Health & Safety",
  },
  {
    question: "What should you do if someone has alcohol poisoning?",
    answer: "Call 911 emergency services immediately. Roll the person onto their side into the recovery position to prevent choking on vomit, and never leave them unattended.",
    category: "Health & Safety",
  },
  {
    question: "How does heavy drinking damage the liver long term?",
    answer: "Chronic excessive alcohol use causes fatty liver disease (steatosis), alcoholic hepatitis inflammation, and progressive irreversible liver scarring (cirrhosis), leading to liver failure.",
    category: "Health & Safety",
  },
  {
    question: "What is the Mayo Clinic definition of heavy drinking?",
    answer: "The Mayo Clinic defines heavy drinking as more than 3 drinks a day or 14 drinks a week for men under 65, and more than 2 drinks a day or 7 drinks a week for women and men over 65.",
    category: "Health & Safety",
  },
  {
    question: "Does moderate drinking have health benefits?",
    answer: "Recent global health consensus (WHO & Lancet studies) indicates that any potential cardiovascular benefit of light drinking is offset by increased risks of hypertension, cardiac arrhythmia, and cancer.",
    category: "Health & Safety",
  },
  {
    question: "How does alcohol affect sleep quality?",
    answer: "While alcohol may help you fall asleep faster, it severely suppresses Rapid Eye Movement (REM) sleep, causes frequent nighttime awakenings, and worsens sleep apnea and snoring.",
    category: "Health & Safety",
  },
  {
    question: "Is it safe to drink alcohol during pregnancy?",
    answer: "No. There is no known safe amount or safe time to consume alcohol during pregnancy. Alcohol crosses the placenta, causing Fetal Alcohol Spectrum Disorders (FASD) and permanent neurological harm.",
    category: "Health & Safety",
  },
  {
    question: "How does alcohol increase cancer risk?",
    answer: "Acetaldehyde (the primary breakdown metabolite of ethanol) is a classified Class 1 carcinogen that damages cellular DNA, significantly increasing risks for breast, liver, esophageal, and colorectal cancers.",
    category: "Health & Safety",
  },
  {
    question: "What is the recovery position for an intoxicated person?",
    answer: "Place the person on their side, bend their top leg at a 90-degree angle to anchor them, and tilt their head back slightly to keep their airway open and prevent choking on vomit.",
    category: "Health & Safety",
  },
];
