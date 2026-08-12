export interface FAQItem {
  question: string;
  answer: string;
}

export const gfr_calculatorFaqs: FAQItem[] = [
  {
    question: "What is Glomerular Filtration Rate (GFR)?",
    answer: "Glomerular Filtration Rate (GFR) is the best overall measure of kidney function. It describes the rate (in mL/min/1.73m²) at which the kidney's microscopic filtering units (glomeruli) clean blood and remove waste products."
  },
  {
    question: "What is eGFR?",
    answer: "eGFR stands for 'estimated Glomerular Filtration Rate'. Because measuring true GFR directly (using inulin or iohexol clearance) is invasive and complex, clinicians use mathematical formulas (like CKD-EPI 2021) based on blood markers like serum creatinine to estimate GFR."
  },
  {
    question: "What is a normal eGFR number?",
    answer: "An eGFR of 90 mL/min/1.73m² or higher is considered normal for young adults. Normal GFR naturally declines with age by approximately 0.8 to 1.0 mL/min per year after age 40."
  },
  {
    question: "What are the 5 stages of Chronic Kidney Disease (CKD)?",
    answer: "CKD is divided into 5 stages: Stage 1 (eGFR ≥ 90 with kidney damage), Stage 2 (eGFR 60-89 mildly reduced), Stage 3a (eGFR 45-59) & 3b (eGFR 30-44 moderate reduction), Stage 4 (eGFR 15-29 severe reduction), and Stage 5 (eGFR < 15 kidney failure/ESRD)."
  },
  {
    question: "Why was race removed from the CKD-EPI 2021 formula?",
    answer: "In 2021, the National Kidney Foundation (NKF) and American Society of Nephrology (ASN) established a race-free eGFR equation (CKD-EPI 2021) to eliminate racial bias in diagnosis, promote health equity, and streamline clinical care."
  },
  {
    question: "How is serum creatinine used to estimate GFR?",
    answer: "Serum creatinine is a breakdown product of creatine phosphate from muscle metabolism. Because healthy kidneys filter creatinine out of the blood at a steady rate, higher blood creatinine levels signal lower kidney filtration capacity."
  },
  {
    question: "What is the unit conversion between mg/dL and µmol/L for creatinine?",
    answer: "To convert creatinine from mg/dL to µmol/L, multiply by 88.4 (e.g., 1.0 mg/dL = 88.4 µmol/L). To convert µmol/L to mg/dL, divide by 88.4."
  },
  {
    question: "What is the difference between CKD-EPI 2021 and MDRD equations?",
    answer: "MDRD was developed in 1999 and tends to underestimate kidney function in healthy individuals with GFR > 60. CKD-EPI 2021 is more accurate across both high and low filtration rates."
  },
  {
    question: "What is the Bedside Schwartz formula for children?",
    answer: "The Bedside Schwartz equation estimates eGFR in children and adolescents (age 1-17) using body height and serum creatinine: eGFR = 0.413 × Height(cm) / Serum Creatinine(mg/dL)."
  },
  {
    question: "What is Cystatin C and why is it measured?",
    answer: "Cystatin C is a protein produced by all nucleated cells at a constant rate. Unlike creatinine, Cystatin C levels are independent of muscle mass, age, and dietary protein intake, making it ideal for confirming eGFR in muscular or frail patients."
  },
  {
    question: "How does the KDIGO risk prognosis matrix work?",
    answer: "KDIGO staging combines eGFR categories (G1-G5) with Albuminuria categories (A1 <30, A2 30-300, A3 >300 mg/g uACR) to assess overall risk of CKD progression and cardiovascular mortality."
  },
  {
    question: "What is Creatinine Clearance (Cockcroft-Gault)?",
    answer: "Cockcroft-Gault estimates creatinine clearance (mL/min) taking body weight into account. It is widely used by pharmacists to determine medication dosages for drugs excreted by the kidneys."
  },
  {
    question: "What causes a temporary drop in eGFR?",
    answer: "Dehydration, acute illness, high cooked meat consumption, strenuous exercise, urinary tract infections, or acute kidney injury (AKI) from medications like NSAIDs can temporarily lower eGFR."
  },
  {
    question: "Can eGFR be improved or restored?",
    answer: "Acute eGFR drops due to dehydration or reversible causes can improve. In chronic kidney disease, while lost nephrons cannot regenerate, progression can be significantly slowed or halted through blood pressure control, ACE inhibitors/ARBs, SGLT2 inhibitors, and diet."
  },
  {
    question: "What blood pressure target protects eGFR?",
    answer: "KDIGO guidelines recommend maintaining blood pressure < 130/80 mmHg (or < 120 mmHg systolic for high-risk patients) to protect renal blood vessels."
  },
  {
    question: "What is proteinuria or albuminuria?",
    answer: "Proteinuria is an excess of protein (specifically albumin) in the urine. It indicates damage to the glomeruli's filtering membrane and is a strong predictor of CKD progression."
  },
  {
    question: "How does diabetes affect eGFR?",
    answer: "Diabetic nephropathy causes hyperfiltration initially (high eGFR), followed by gradual thickening of the glomerular basement membrane, leading to progressive eGFR decline and kidney disease."
  },
  {
    question: "What dietary changes help protect low eGFR?",
    answer: "Patients with low eGFR (< 60) benefit from limiting dietary sodium (< 2,000 mg/day), controlling protein intake (0.6-0.8 g/kg/day for advanced CKD), and monitoring potassium and phosphorus levels."
  },
  {
    question: "What is the Mayo Quadratic GFR formula?",
    answer: "The Mayo Quadratic equation was developed to better estimate GFR in individuals with preserved or mildly decreased kidney function, such as kidney donor candidates."
  },
  {
    question: "How often should eGFR be tested?",
    answer: "Healthy individuals require annual testing. Patients with Stage 3 CKD need testing 2 times per year, while Stage 4 and 5 CKD require testing every 1 to 3 months."
  },
  {
    question: "Why do bodybuilders have elevated serum creatinine?",
    answer: "Bodybuilders have higher muscle mass and creatine phosphate turnover, leading to elevated serum creatinine that can falsely indicate low eGFR under creatinine-based formulas. Cystatin C testing is recommended."
  },
  {
    question: "What is Acute Kidney Injury (AKI)?",
    answer: "AKI is a sudden decline in kidney function occurring over hours or days, characterized by a rapid rise in serum creatinine and drop in urine output, often reversible with prompt medical care."
  },
  {
    question: "At what eGFR level is dialysis required?",
    answer: "Dialysis is typically initiated when eGFR falls below 10–15 mL/min/1.73m² (Stage 5 CKD), or earlier if severe uremic symptoms, fluid overload, or hyperkalemia occur."
  },
  {
    question: "How does aging affect GFR?",
    answer: "After age 40, GFR decreases by roughly 1 mL/min per year due to structural nephrosclerosis and loss of functioning nephrons, which is considered normal age-related decline."
  },
  {
    question: "What medications harm kidney function (nephrotoxins)?",
    answer: "Over-the-counter NSAIDs (ibuprofen, naproxen), intravenous contrast dyes, aminoglycoside antibiotics, and certain proton pump inhibitors can cause nephrotoxicity."
  },
  {
    question: "What is the uACR test?",
    answer: "uACR (Urine Albumin-to-Creatinine Ratio) measures the ratio of albumin to creatinine in a spot urine sample, detecting early kidney damage before eGFR drops."
  },
  {
    question: "What is SGLT2 inhibitor therapy for CKD?",
    answer: "SGLT2 inhibitors (e.g., dapagliflozin, empagliflozin) reduce intraglomerular pressure, significantly slowing eGFR decline in diabetic and non-diabetic chronic kidney disease."
  },
  {
    question: "Why does eGFR fluctuate between lab tests?",
    answer: "eGFR can fluctuate by 5–10 mL/min due to hydration status, recent meat consumption, laboratory assay variability, and physiological circadian variations."
  },
  {
    question: "How does blood pressure medication affect eGFR initially?",
    answer: "Starting ACE inhibitors or ARBs often causes an initial mild eGFR dip (up to 30%) due to reduced intraglomerular pressure, which is expected and protective long-term."
  },
  {
    question: "Can children use adult GFR formulas?",
    answer: "No. Children require pediatric formulas like the Bedside Schwartz or CKiD equations because muscle mass and creatinine production change dynamically with growth."
  },
  {
    question: "What is the difference between primary and secondary kidney disease?",
    answer: "Primary kidney disease originates within the kidneys (e.g., Glomerulonephritis, Polycystic Kidney Disease). Secondary kidney disease results from systemic illnesses like Diabetes or Hypertension."
  },
  {
    question: "How does water intake affect eGFR?",
    answer: "Drinking normal amounts of water keeps kidneys adequately perfused. Extreme dehydration artificially raises creatinine and lowers eGFR."
  },
  {
    question: "What is uremia?",
    answer: "Uremia is the toxic accumulation of nitrogenous waste products in the blood due to severe kidney failure, causing nausea, fatigue, confusion, and pericarditis."
  },
  {
    question: "How is eGFR adjusted for body surface area?",
    answer: "eGFR is normalized to a standard adult body surface area of 1.73 m² to allow direct comparison of kidney function across people of different body sizes."
  },
  {
    question: "What is living kidney donation eGFR threshold?",
    answer: "Living kidney donor candidates generally must have a confirmed GFR of > 80–90 mL/min/1.73m² and no significant proteinuria or hypertension."
  },
  {
    question: "How do ACE inhibitors and ARBs slow CKD?",
    answer: "They dilate the efferent arteriole in the glomerulus, lowering filtration pressure and slowing long-term scar tissue formation (glomerulosclerosis)."
  },
  {
    question: "What is the difference between acute renal failure and chronic renal failure?",
    answer: "Acute renal failure happens rapidly and is potentially reversible. Chronic renal failure is a gradual loss of kidney function over more than 3 months."
  },
  {
    question: "How does high protein diet affect creatinine and GFR?",
    answer: "Consuming heavy amounts of cooked red meat increases serum creatinine levels temporarily, which can cause a transient false drop in creatinine-based eGFR."
  },
  {
    question: "Why is Calculator.net's GFR calculator basic compared to this suite?",
    answer: "Calculator.net uses legacy 2009 equations without Cystatin C options, KDIGO risk staging, 10 calculation modes, pediatric age decline curves, or downloadable clinical PDF reports. Our suite offers complete clinical precision."
  },
  {
    question: "How do I export my clinical GFR report?",
    answer: "Click the 'Generate PDF Report' button in the toolbar to create a professional nephrology report, download CSV data, or print formatted results."
  }
];
