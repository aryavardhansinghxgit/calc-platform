export interface FAQItem {
  question: string;
  answer: string;
}

export const gfr_calculatorFaqs: FAQItem[] = [
  {
    question: "What is the difference between GFR and eGFR?",
    answer: "GFR is the rate at which the kidneys filter fluid through the glomeruli. eGFR is an estimate of that filtration rate calculated from biomarkers and demographic variables rather than directly measuring filtration."
  },
  {
    question: "What is considered a normal eGFR?",
    answer: "KDIGO classifies G1 as ≥90 mL/min/1.73 m², described as normal or high. However, an eGFR above 90 does not by itself mean that CKD is absent or present; other evidence of kidney damage and persistence must be considered."
  },
  {
    question: "Is an eGFR of 60–89 kidney disease?",
    answer: "Not automatically. KDIGO calls 60–89 G2, mildly decreased, but G2 alone does not satisfy CKD criteria without other evidence of kidney damage or persistent abnormalities."
  },
  {
    question: "What does an eGFR below 60 mean?",
    answer: "An eGFR below 60 falls into G3 or a lower GFR category. If reduced eGFR persists for more than three months, it meets one of the major criteria used to define CKD. Clinical interpretation still depends on the full patient context."
  },
  {
    question: "Can one abnormal eGFR diagnose CKD?",
    answer: "No. CKD is a chronic condition, so persistence matters. An isolated abnormal result can occur for several reasons and should be interpreted with repeat testing and other kidney markers."
  },
  {
    question: "Which eGFR equation is preferred for adults?",
    answer: "NIDDK currently lists the 2021 CKD-EPI creatinine, 2021 CKD-EPI creatinine-cystatin C and 2012 CKD-EPI cystatin C equations as race-free adult eGFR equations. Combined creatinine-cystatin C estimation is generally more accurate when both biomarkers are available."
  },
  {
    question: "Why was race removed from the CKD-EPI equation?",
    answer: "The modern CKD-EPI 2021 equations do not use a race coefficient. The change followed the reassessment of race-based eGFR approaches and the goal of providing race-free kidney-function estimation. NIDDK's current adult equation resources therefore center on race-free CKD-EPI equations."
  },
  {
    question: "What is cystatin C?",
    answer: "Cystatin C is a blood biomarker that can be used to estimate GFR. Because its determinants differ from those of creatinine, combining both markers can provide a stronger estimate in appropriate clinical situations."
  },
  {
    question: "Why does my eGFR differ between CKD-EPI and Cockcroft-Gault?",
    answer: "They estimate different quantities and use different mathematical models. CKD-EPI produces indexed eGFR in mL/min/1.73 m², whereas Cockcroft-Gault estimates creatinine clearance in mL/min."
  },
  {
    question: "Can muscle mass affect creatinine-based eGFR?",
    answer: "Yes. Serum creatinine is influenced by factors other than filtration, including muscle-related determinants. This is one reason cystatin C and combined creatinine-cystatin C equations can be useful in selected patients."
  },
  {
    question: "What is uACR?",
    answer: "uACR, or urine albumin-to-creatinine ratio, measures the amount of albumin in urine relative to urine creatinine. It is an important marker of kidney damage and is used with eGFR for CKD risk classification."
  },
  {
    question: "What are the KDIGO albuminuria categories?",
    answer: "A1 is below 30 mg/g, A2 is 30–300 mg/g, and A3 is above 300 mg/g. These categories are combined with G1–G5 to describe CKD prognosis."
  },
  {
    question: "Why can eGFR change from one test to another?",
    answer: "Creatinine-based eGFR can change because of biological variation, laboratory variation and temporary changes affecting serum creatinine. NIDDK also emphasizes that a trend over time can be more informative than a single estimate."
  },
  {
    question: "Can children use the adult CKD-EPI equation?",
    answer: "Adult equations are intended for adults. Pediatric estimation requires an appropriate pediatric equation such as Bedside Schwartz, with clinical interpretation appropriate for the child's age and development."
  },
  {
    question: "Is this GFR calculator a medical diagnosis tool?",
    answer: "No. It is an estimation and educational tool. A calculated eGFR should be interpreted with laboratory data, kidney-damage markers, previous measurements and professional clinical assessment."
  }
];
