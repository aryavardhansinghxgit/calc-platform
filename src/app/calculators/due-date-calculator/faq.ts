import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const due_date_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How is an estimated due date (EDD) calculated?",
    answer:
      "A standard estimated due date is calculated by adding 280 days (40 weeks) to the first day of your Last Menstrual Period (LMP), assuming a 28-day cycle. If your cycle length differs, the formula adjusts by adding or subtracting days based on your actual cycle length.",
  },
  {
    question: "What percentage of babies are born on their exact due date?",
    answer:
      "Only about 4% to 5% of babies are born on their exact estimated due date. Most full-term births occur naturally anytime within a two-week window before or after the due date (between 37 Weeks 0 Days and 41 Weeks 6 Days).",
  },
  {
    question: "What is Naegele's Rule?",
    answer:
      "Naegele's Rule is a standard clinical calculation method for estimating due date: Add 1 year to the first day of your Last Menstrual Period (LMP), subtract 3 months, and add 7 days.",
  },
  {
    question: "How does ultrasound dating compare to LMP dating?",
    answer:
      "A first-trimester ultrasound measuring Crown-Rump Length (CRL) between Weeks 7 and 12 is the gold standard for pregnancy dating, with an accuracy margin of ±3 to 5 days. If early ultrasound differs from LMP by more than 5 days, clinicians usually redate the pregnancy based on ultrasound.",
  },
  {
    question: "How is due date calculated for IVF (In Vitro Fertilization)?",
    answer:
      "For a Day 5 blastocyst transfer, the due date is calculated as Transfer Date + 261 days. For a Day 3 embryo transfer, the due date is Transfer Date + 263 days. For fresh egg retrieval, EDD is Retrieval Date + 266 days.",
  },
  {
    question: "What is the difference between gestational age and fetal age?",
    answer:
      "Gestational age is measured from the first day of your Last Menstrual Period (40 weeks total). Fetal age is measured from actual conception (38 weeks total). Fetal age is approximately 2 weeks shorter than gestational age.",
  },
  {
    question: "What are the ACOG delivery term categories?",
    answer:
      "ACOG defines five precise clinical term categories: Preterm (<37w0d), Early Term (37w0d–38w6d), Full Term (39w0d–40w6d), Late Term (41w0d–41w6d), and Postterm (≥42w0d).",
  },
  {
    question: "Why is 39 weeks considered the optimal full-term threshold?",
    answer:
      "Babies born between 39 Weeks 0 Days and 40 Weeks 6 Days have significantly lower rates of respiratory distress, feeding difficulty, and neonatal intensive care (NICU) admissions compared to early term (37–38 weeks) births.",
  },
  {
    question: "Does cycle length affect due date calculation?",
    answer:
      "Yes. Ovulation occurs roughly 14 days before your next expected period (luteal phase). If your cycle is 35 days long, ovulation occurs on Day 21 rather than Day 14, moving your estimated due date 7 days later than standard Naegele's rule.",
  },
  {
    question: "What is Mittendorf-Williams Rule?",
    answer:
      "Mittendorf-Williams Rule is an empirical formula that adjusts due dates based on parity (first vs. subsequent pregnancy). First-time mothers (primiparas) carry for an average of 40 weeks 3 days, whereas multiparas average 39 weeks 6 days.",
  },
  {
    question: "Can an estimated due date change during pregnancy?",
    answer:
      "Once an accurate due date is established via a first-trimester ultrasound, clinicians generally do not change the due date later in pregnancy. Size discrepancies in late 2nd or 3rd trimester scans usually indicate fetal growth variation rather than incorrect dating.",
  },
  {
    question: "When does the second trimester begin?",
    answer:
      "The second trimester begins at Week 14 0 Days (13 weeks completed) and spans through Week 27 6 Days.",
  },
  {
    question: "When does the third trimester begin?",
    answer:
      "The third trimester begins at Week 28 0 Days and continues through delivery.",
  },
  {
    question: "When can a fetal heartbeat be detected on ultrasound?",
    answer:
      "A fetal cardiac flicker can typically be detected via transvaginal ultrasound starting at 5.5 to 6 weeks gestational age (approximately 3.5 to 4 weeks after conception).",
  },
  {
    question: "What is NIPT and when is it performed?",
    answer:
      "Non-Invasive Prenatal Testing (NIPT) is a cell-free fetal DNA blood test that screens for trisomies (such as Down syndrome) and fetal sex. It is typically performed starting at 10 weeks gestational age.",
  },
  {
    question: "When is the 20-week anomaly scan performed?",
    answer:
      "The mid-pregnancy anatomical ultrasound (anomaly scan) is routinely performed between 18 and 22 weeks gestational age to assess fetal organ anatomy and growth.",
  },
  {
    question: "What is fetal viability milestone?",
    answer:
      "Fetal viability is the gestational age at which a baby has a chance of survival outside the womb with medical support, clinically recognized at 24 weeks gestational age.",
  },
  {
    question: "What happens if pregnancy reaches 41 or 42 weeks?",
    answer:
      "Between 41 and 42 weeks (late term), doctors monitor fetal well-being using biophysical profiles and non-stress tests. Elective labor induction is typically recommended at 41w to 42w to prevent placental insufficiency.",
  },
  {
    question: "How is due date calculated if I don't know my LMP date?",
    answer:
      "If your last period date is unknown or irregular, a first-trimester ultrasound measuring Crown-Rump Length (CRL) is used as the primary method to establish your due date.",
  },
  {
    question: "Why do doctors count pregnancy as 10 lunar months (40 weeks)?",
    answer:
      "A standard full-term pregnancy of 280 days equals 40 weeks, which corresponds to 10 lunar months (28 days per month) or approximately 9 calendar months plus 1 week.",
  },
  {
    question: "Can stress or exercise induce labor early?",
    answer:
      "Normal moderate prenatal exercise does not induce labor prematurely. However, severe physical or emotional stress can trigger cortisol release, which in rare instances may influence labor onset.",
  },
  {
    question: "What is Parikh's Formula for due date?",
    answer:
      "Parikh's Formula modifies Naegele's rule for non-28-day cycles: EDD = LMP + 9 months + 7 days + (Cycle Length - 28 days).",
  },
  {
    question: "Are twin pregnancies expected to deliver on the 40-week due date?",
    answer:
      "No. Twin pregnancies are clinically considered full term at 37 to 38 weeks, and triplet pregnancies at 35 to 36 weeks due to uterine stretch and placental capacity.",
  },
  {
    question: "When should I pack my hospital bag?",
    answer:
      "Obstetricians recommend having your hospital bag packed, car seat installed, and labor logistics arranged by Week 36 of pregnancy.",
  },
  {
    question: "How accurate are online due date calculators?",
    answer:
      "Online due date calculators using ACOG-verified Naegele's and Parikh's algorithms are mathematically identical to medical clinic dating tools, providing an accurate baseline until your first ultrasound scan.",
  },
];

export default due_date_calculatorFaqs;
