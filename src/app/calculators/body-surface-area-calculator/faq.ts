export interface BsaFaqItem {
  question: string;
  answer: string;
  category?: string;
}

export const bsaFaqs: BsaFaqItem[] = [
  {
    question: "What is body surface area (BSA)?",
    answer:
      "Body surface area is an estimated measure of body size expressed in square meters. It is calculated from variables such as height and weight using mathematical equations such as Mosteller, Du Bois, and Haycock.",
    category: "Fundamentals",
  },
  {
    question: "What is the Mosteller BSA formula?",
    answer:
      "The Mosteller equation is: BSA = √[(height in cm × weight in kg) / 3600]. It was published by R. D. Mosteller in 1987 as a simplified method for calculating body surface area.",
    category: "Formulas",
  },
  {
    question: "How do I calculate BSA from height and weight?",
    answer:
      "Convert height to centimeters and weight to kilograms, then apply the selected BSA equation. For Mosteller, multiply height by weight, divide by 3600, and take the square root.",
    category: "Fundamentals",
  },
  {
    question: "What is a normal BSA?",
    answer:
      "There is no single normal BSA value that applies to everyone. BSA varies with body size, age and population. A BSA value should therefore be interpreted in context rather than classified as inherently \"normal\" or \"abnormal.\"",
    category: "Fundamentals",
  },
  {
    question: "What is the difference between BSA and BMI?",
    answer:
      "BMI is a weight-for-height screening measure calculated as kg/m². BSA is an estimated body-size measure usually expressed in m². They use related inputs but serve different purposes and should not be substituted for one another.",
    category: "Fundamentals",
  },
  {
    question: "Why do different BSA calculators give different answers?",
    answer:
      "Different calculators may use different equations, rounding conventions, unit conversions, or population models. Small differences are therefore expected when different formulas are used.",
    category: "Formulas",
  },
  {
    question: "Is Mosteller the most accurate BSA formula?",
    answer:
      "Mosteller is a widely used simplified equation, but it is not appropriate to describe one BSA equation as universally \"most accurate\" for every population and clinical application. The appropriate model depends on the intended use and reference standard.",
    category: "Formulas",
  },
  {
    question: "What BSA formula is commonly used in chemotherapy?",
    answer:
      "Some chemotherapy regimens specify drug doses in mg/m², making BSA relevant to the calculation. The actual equation and dosing convention should follow the applicable treatment protocol or drug information rather than assuming a single formula applies to every regimen.",
    category: "Oncology & Chemotherapy",
  },
  {
    question: "Does ASCO recommend a 2.0 m² BSA cap for obese patients?",
    answer:
      "No. The ASCO guideline update does not establish a universal 2.0 m² BSA cap. For obese adults, ASCO recommends full weight-based cytotoxic chemotherapy dosing when appropriate rather than routine arbitrary BSA capping. Individual drugs and regimens can still have specific dosing instructions or modifications.",
    category: "Oncology & Chemotherapy",
  },
  {
    question: "How is a chemotherapy dose calculated from BSA?",
    answer:
      "When a regimen specifies a dose in mg/m²: Dose (mg) = prescribed dose (mg/m²) × BSA (m²). This is an arithmetic relationship; the appropriate prescribed dose must come from the applicable treatment protocol.",
    category: "Oncology & Chemotherapy",
  },
  {
    question: "Is carboplatin dosed using BSA?",
    answer:
      "Carboplatin is commonly dosed using the Calvert approach, which is based on target AUC and renal function rather than a simple BSA multiplication: Dose = Target AUC × (GFR + 25). The U.S. prescribing information describes this as a dose in mg rather than mg/m².",
    category: "Oncology & Chemotherapy",
  },
  {
    question: "What does BSA in m² mean?",
    answer:
      "The m² unit represents square meters. For example, a BSA of 1.92 m² is an estimated body-surface-area value expressed using square meters.",
    category: "Fundamentals",
  },
  {
    question: "How do I convert BSA from m² to ft²?",
    answer:
      "Multiply the value in square meters by approximately 10.7639. For example: 1.92 m² × 10.7639 ≈ 20.69 ft².",
    category: "Fundamentals",
  },
  {
    question: "Can BSA be used for children?",
    answer:
      "Yes, BSA equations have pediatric applications, but the appropriate equation can depend on age and the intended clinical use. Pediatric calculations should follow the relevant clinical reference or institutional protocol. The Haycock equation, for example, was developed using infants, children, and adults.",
    category: "Pediatrics",
  },
  {
    question: "What is GFR normalization to 1.73 m²?",
    answer:
      "Indexed GFR expresses kidney filtration relative to a standardized BSA of 1.73 m². A normalization calculation can be represented as: Indexed GFR = absolute GFR × 1.73 / BSA. Absolute and indexed GFR are different quantities and should not be confused.",
    category: "Cardiology & Renal",
  },
  {
    question: "How is cardiac index calculated using BSA?",
    answer:
      "Cardiac index is: Cardiac Index = Cardiac Output / BSA. It expresses cardiac output relative to body surface area and is reported in L/min/m².",
    category: "Cardiology & Renal",
  },
  {
    question: "Can I calculate BSA in pounds and feet?",
    answer:
      "Yes. The calculator converts feet/inches and pounds to centimeters and kilograms internally before applying formulas that require metric units.",
    category: "Fundamentals",
  },
  {
    question: "Why can my BSA change when I change formulas but keep the same height and weight?",
    answer:
      "Each formula applies a different mathematical model. Because the models were derived from different populations and datasets, they can produce different BSA estimates from the same height and weight.",
    category: "Formulas",
  },
  {
    question: "Is a BSA calculator a medical diagnostic tool?",
    answer:
      "No. BSA is an estimated mathematical body-size metric. A calculated value does not diagnose a disease or independently determine treatment.",
    category: "Fundamentals",
  },
  {
    question: "Can this calculator determine my chemotherapy dose?",
    answer:
      "It can perform the mathematical calculation associated with a user-entered protocol dose or Calvert-type carboplatin calculation, but it cannot determine whether that dose is clinically appropriate. Actual treatment decisions must be verified against drug labeling, the applicable regimen, patient-specific clinical factors, and qualified oncology/pharmacy review.",
    category: "Oncology & Chemotherapy",
  },
];
