export interface BsaFaqItem {
  question: string;
  answer: string;
  category: "Fundamentals" | "Formulas" | "Oncology & Chemotherapy" | "Pediatrics" | "Cardiology & Renal";
}

export const bsaFaqs: BsaFaqItem[] = [
  // Fundamentals (1-10)
  {
    question: "What is Body Surface Area (BSA)?",
    answer: "Body Surface Area (BSA) is the total external surface area of the human body expressed in square meters (m²). It is a vital clinical biometric that correlates better with metabolic rate, cardiac output, extracellular fluid volume, and renal clearance than total body weight.",
    category: "Fundamentals",
  },
  {
    question: "Why is BSA used instead of body weight for drug dosing?",
    answer: "Body weight includes non-metabolically active tissue such as adipose (fat) storage. BSA correlates directly with metabolic rate and blood volume, providing a more accurate indicator of drug distribution and clearance, particularly for toxic or narrow therapeutic index medications like chemotherapy.",
    category: "Fundamentals",
  },
  {
    question: "What is the average Body Surface Area for an adult male and female?",
    answer: "The average adult male BSA is approximately 1.90 m² (20.45 ft²), while the average adult female BSA is approximately 1.60 m² (17.22 ft²). Factors such as height, weight, and muscle mass influence individual values.",
    category: "Fundamentals",
  },
  {
    question: "How is Body Surface Area calculated?",
    answer: "BSA is estimated using mathematical equations based on height and weight. Direct measurement requires complex 3D laser scanning or historical coating methods. The most widely accepted clinical equation is the Mosteller formula: BSA (m²) = sqrt((Weight in kg × Height in cm) / 3600).",
    category: "Fundamentals",
  },
  {
    question: "What is the normal range for Body Surface Area?",
    answer: "There is no single 'normal' BSA because surface area scales with body height and weight. For healthy adults, typical values range between 1.5 m² and 2.3 m². In newborns, average BSA is 0.25 m², and in a 10-year-old child, it is approximately 1.14 m².",
    category: "Fundamentals",
  },
  {
    question: "What is the difference between BSA and BMI?",
    answer: "Body Mass Index (BMI) measures body fatness and relative weight to height ratio (kg/m²), categorizing individuals into underweight, normal, overweight, or obese. BSA measures total exterior surface area in m² and is used primarily for clinical dosing and physiological normalization.",
    category: "Fundamentals",
  },
  {
    question: "Can BSA be measured directly without a formula?",
    answer: "Direct measurement can be performed using modern 3D optical laser body scanners or bio-stereophotogrammetry. Historically, skin surface coating and geometric planimetry were used, but mathematical formulas derived from height and weight remain the clinical standard.",
    category: "Fundamentals",
  },
  {
    question: "Why does metabolic rate correlate with Body Surface Area?",
    answer: "Heat dissipation occurs through the skin surface. According to Bergmann's rule and Rubner's surface law, basal metabolic heat production scales proportionally with surface area to maintain constant core body temperature.",
    category: "Fundamentals",
  },
  {
    question: "How does body composition affect BSA accuracy?",
    answer: "Most formulas treat the human body as a uniform geometric volume. In cases of extreme obesity or muscular hypertrophy, formulas can over- or under-estimate true skin area, which is why clinical guidelines often recommend capping BSA for chemotherapy dosing in severe obesity.",
    category: "Fundamentals",
  },
  {
    question: "What unit systems are used for BSA?",
    answer: "In medicine, BSA is almost universally reported in square meters (m²). In the United States, square feet (ft²) is occasionally referenced for patient communication (1 m² = 10.7639 ft²).",
    category: "Fundamentals",
  },

  // Formulas (11-20)
  {
    question: "Which BSA formula is considered the clinical gold standard?",
    answer: "The Mosteller formula (1987) is the recognized clinical gold standard due to its mathematical simplicity, high precision, and ease of validation across pediatric, adult, and oncology patient cohorts.",
    category: "Formulas",
  },
  {
    question: "What is the Du Bois & Du Bois formula?",
    answer: "Published in 1916 by Du Bois and Du Bois, BSA (m²) = 0.007184 × Weight(kg)^0.425 × Height(cm)^0.725. It was derived from 9 human subjects (including an amputee and a child) and served as the primary medical standard for over 70 years.",
    category: "Formulas",
  },
  {
    question: "How does the Haycock formula differ from Du Bois?",
    answer: "Developed by Haycock et al. in 1978, BSA (m²) = 0.024265 × Weight(kg)^0.5378 × Height(cm)^0.3964. It was specifically validated for infants, children, and severely underweight patients, offering superior precision in pediatric populations.",
    category: "Formulas",
  },
  {
    question: "What is the Gehan & George formula?",
    answer: "Derived in 1970 from direct measurements of 229 subjects, Gehan & George proposed BSA (m²) = 0.0235 × Weight(kg)^0.51456 × Height(cm)^0.42246. It eliminated several mathematical biases present in the original Du Bois dataset.",
    category: "Formulas",
  },
  {
    question: "What is the Boyd formula?",
    answer: "Created by Edith Boyd in 1935, BSA (m²) = 0.03330 × Weight(kg)^(0.6157 - 0.0188 × log10(Weight)) × Height(cm)^0.3. It uses a logarithmic weight exponent to accommodate broad physiological ranges.",
    category: "Formulas",
  },
  {
    question: "What are the Fujimoto and Takahira formulas?",
    answer: "The Fujimoto (1968) and Takahira (1968) formulas were developed specifically using East Asian (Japanese) population anthropometric data to correct for skeletal and body proportion differences relative to Western cohorts.",
    category: "Formulas",
  },
  {
    question: "What is the Schlich 3D Body Scan formula?",
    answer: "Published in 2010 by Schlich et al., this formula utilizes 3D laser surface body scanning across 500+ adult subjects. It provides gender-differentiated equations: Women BSA = 0.000975482 × W^0.46 × H^1.08; Men BSA = 0.000579479 × W^0.38 × H^1.24.",
    category: "Formulas",
  },
  {
    question: "What is the Costeff formula?",
    answer: "Developed in 1966 for rapid pediatric emergency resuscitation, Costeff BSA (m²) = (4 × Weight(kg) + 7) / (Weight(kg) + 90). It requires no height input and allows fast bedside estimation without a calculator.",
    category: "Formulas",
  },
  {
    question: "How much variance exists between different BSA formulas?",
    answer: "For normal weight adults, variance between formulas is minimal (typically < 3%). However, in extreme obesity (BMI > 40) or low birth weight infants, variance between Du Bois, Mosteller, and Schlich can exceed 7-10%.",
    category: "Formulas",
  },
  {
    question: "Which formula should be used for adult medical practice?",
    answer: "Most medical institutions and clinical research protocols mandate the Mosteller formula. However, for gender-specific precision, the Schlich 3D scan formula is increasingly favored in specialized research.",
    category: "Formulas",
  },

  // Oncology & Chemotherapy (21-30)
  {
    question: "Why is chemotherapy dosed per square meter of BSA?",
    answer: "Cytotoxic anticancer drugs have narrow therapeutic indices—small differences between therapeutic efficacy and life-threatening toxicity. BSA dosing reduces inter-patient variability in hepatic metabolism, renal clearance, and volume of distribution.",
    category: "Oncology & Chemotherapy",
  },
  {
    question: "Should chemotherapy BSA be capped in obese patients?",
    answer: "Historical practice capped BSA at 2.0 m² out of concern for severe toxicity in obese patients. However, current American Society of Clinical Oncology (ASCO) guidelines recommend dosing based on actual full weight and uncapped BSA unless excessive toxicity is documented.",
    category: "Oncology & Chemotherapy",
  },
  {
    question: "What is the Calvert formula for Carboplatin dosing?",
    answer: "Carboplatin is dosed using the Calvert equation: Total Dose (mg) = Target AUC × (GFR + 25). Rather than relying solely on BSA, it incorporates renal filtration rate to avoid severe myelosuppression.",
    category: "Oncology & Chemotherapy",
  },
  {
    question: "How is chemotherapy dose calculated from BSA?",
    answer: "Total Dose (mg) = BSA (m²) × Prescribed Dose per Area (mg/m²). For example, a patient with a BSA of 1.80 m² prescribed 100 mg/m² Paclitaxel will receive a total dose of 180 mg.",
    category: "Oncology & Chemotherapy",
  },
  {
    question: "What happens if BSA is calculated incorrectly in oncology?",
    answer: "Underestimating BSA leads to sub-therapeutic dosing and disease progression. Overestimating BSA increases risk of severe neutropenia, mucositis, cardiotoxicity, and sepsis.",
    category: "Oncology & Chemotherapy",
  },
  {
    question: "Are monoclonal antibodies dosed by BSA or fixed flat dose?",
    answer: "Traditional cytotoxic agents are dosed by BSA. However, modern targeted monoclonal antibodies (e.g., Pembrolizumab, Rituximab) are frequently transitioning to flat fixed dosing (e.g., 200 mg every 3 weeks) due to saturated receptor kinetics.",
    category: "Oncology & Chemotherapy",
  },
  {
    question: "How often should patient BSA be recalculated during chemotherapy?",
    answer: "BSA should be recalculated at every treatment cycle if the patient experiences a weight change of ± 5% or more, or if there is significant fluid shifting (e.g., ascites or peripheral edema).",
    category: "Oncology & Chemotherapy",
  },
  {
    question: "What is the maximum recommended BSA limit in clinical software?",
    answer: "While ASCO discourages arbitrary capping, many electronic health record (EHR) systems trigger clinical alert warnings if calculated BSA exceeds 2.2 m² or 2.5 m² to verify height and weight entries.",
    category: "Oncology & Chemotherapy",
  },
  {
    question: "Why is BSA used in pediatric oncology?",
    answer: "Infants and children have higher surface-area-to-mass ratios than adults. Dosing per kg of body weight in pediatric patients would cause underdosing of critical chemotherapy agents.",
    category: "Oncology & Chemotherapy",
  },
  {
    question: "How does renal impairment affect BSA-based chemotherapy dosing?",
    answer: "Renally cleared chemotherapeutics (e.g., Cisplatin, Methotrexate) require dose reduction based on GFR normalized to 1.73 m² BSA to prevent toxic renal and systemic accumulation.",
    category: "Oncology & Chemotherapy",
  },

  // Pediatrics (31-40)
  {
    question: "Which BSA formula is best for infants and newborns?",
    answer: "The Haycock formula (1978) is widely recognized as the most accurate equation for infants and low birth weight neonates because it was validated down to small pediatric body dimensions.",
    category: "Pediatrics",
  },
  {
    question: "Why do children have a higher BSA-to-weight ratio than adults?",
    answer: "Children have relatively larger head sizes and higher surface area proportions relative to total body mass. A newborn weighing 3.5 kg has a BSA of ~0.25 m²—nearly double the relative ratio of an adult.",
    category: "Pediatrics",
  },
  {
    question: "When is the Costeff formula useful in emergency medicine?",
    answer: "The Costeff formula [BSA = (4W + 7) / (W + 90)] allows rapid mental calculation during pediatric resuscitation when patient height cannot be measured immediately.",
    category: "Pediatrics",
  },
  {
    question: "How is pediatric fluid resuscitation calculated using BSA?",
    answer: "Maintenance intravenous fluids in pediatric intensive care can be calculated as 1,500 mL/m²/day of BSA, serving as an alternative to the Holliday-Segar 4-2-1 body weight method.",
    category: "Pediatrics",
  },
  {
    question: "Is BSA used for pediatric steroid dosing?",
    answer: "Yes, systemic corticosteroid dosing in severe asthma or nephrotic syndrome is frequently specified as mg/m² BSA to maintain consistent anti-inflammatory tissue exposure.",
    category: "Pediatrics",
  },
  {
    question: "Can adult BSA formulas be used for children?",
    answer: "The Mosteller formula is validated across all age groups including pediatrics. However, Du Bois can underestimate BSA in young children by 5-8%.",
    category: "Pediatrics",
  },
  {
    question: "What is the average BSA of a 2-year-old child?",
    answer: "The standard population baseline BSA for a 2-year-old child is approximately 0.50 m² (5.38 ft²).",
    category: "Pediatrics",
  },
  {
    question: "What is the average BSA of a 10-year-old child?",
    answer: "The standard population baseline BSA for a 10-year-old child is approximately 1.14 m² (12.27 ft²).",
    category: "Pediatrics",
  },
  {
    question: "How does growth stunting affect pediatric BSA calculation?",
    answer: "Because BSA formulas rely on height and weight, stunting or chronic malnutrition reduces overall BSA proportionally, reflecting reduced body cell mass.",
    category: "Pediatrics",
  },
  {
    question: "Why is BSA critical in pediatric burn care?",
    answer: "Total Body Surface Area (TBSA) percentage of burn injury dictates fluid resuscitation volume via the Parkland formula (4 mL × kg × %TBSA).",
    category: "Pediatrics",
  },

  // Cardiology & Renal (41-50)
  {
    question: "What is Cardiac Index (CI)?",
    answer: "Cardiac Index is a hemodynamic parameter that relates cardiac output (CO in L/min) to body surface area: CI = Cardiac Output / BSA (L/min/m²). Normal reference range is 2.5 to 4.0 L/min/m².",
    category: "Cardiology & Renal",
  },
  {
    question: "Why is Cardiac Output normalized to BSA?",
    answer: "A cardiac output of 4.5 L/min may be completely normal for a 50 kg female (BSA 1.5 m²) but represent severe hypoperfusion in a 110 kg male (BSA 2.3 m²). Normalizing to BSA allows clinical comparison across patients of different body sizes.",
    category: "Cardiology & Renal",
  },
  {
    question: "What is Stroke Volume Index (SVI)?",
    answer: "Stroke Volume Index is the volume of blood ejected by the left ventricle per heartbeat, normalized to BSA: SVI = Stroke Volume / BSA (mL/beat/m²). Normal range is 33 to 60 mL/beat/m².",
    category: "Cardiology & Renal",
  },
  {
    question: "Why is GFR normalized to 1.73 m² BSA?",
    answer: "Glomerular Filtration Rate (GFR) is expressed as mL/min/1.73m² to standardize kidney function evaluation against a benchmark young adult body surface area of 1.73 m².",
    category: "Cardiology & Renal",
  },
  {
    question: "How do you calculate unadjusted absolute GFR from normalized eGFR?",
    answer: "Unadjusted Absolute GFR (mL/min) = Normalized eGFR (mL/min/1.73m²) × (Patient BSA / 1.73). Absolute GFR is essential when dosing renally cleared drugs in unusually small or large patients.",
    category: "Cardiology & Renal",
  },
  {
    question: "What is Left Ventricular Mass Index (LVMI)?",
    answer: "LVMI normalizes echocardiographic left ventricular muscle mass to BSA (g/m²) to diagnose left ventricular hypertrophy (LVH) in hypertension and aortic stenosis.",
    category: "Cardiology & Renal",
  },
  {
    question: "How does BSA affect aortic valve area indexing in cardiology?",
    answer: "Aortic Valve Area Index (AVAI = AVA / BSA) defines severe aortic stenosis as AVAI < 0.6 cm²/m², adjusting for body size in low-flow, low-gradient states.",
    category: "Cardiology & Renal",
  },
  {
    question: "Why is BSA used in organ transplantation matching?",
    answer: "Donor-recipient heart and lung size matching utilizes BSA ratios to ensure the donor organ fits physically within the thoracic cavity and provides adequate perfusion capacity.",
    category: "Cardiology & Renal",
  },
  {
    question: "What happens to Cardiac Index in septic shock?",
    answer: "In early warm septic shock, systemic vascular resistance drops, causing a hyperdynamic Cardiac Index (> 4.2 L/min/m²). In late uncompensated shock, CI plummets below 2.0 L/min/m².",
    category: "Cardiology & Renal",
  },
  {
    question: "How does body weight loss impact BSA and renal drug dosing?",
    answer: "Significant weight loss reduces BSA, which lowers the absolute GFR required to clear medications, necessitating dose adjustments to prevent drug toxicity.",
    category: "Cardiology & Renal",
  },
];
