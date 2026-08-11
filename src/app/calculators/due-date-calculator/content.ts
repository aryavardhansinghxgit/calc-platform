export const due_date_calculatorContent = {
  title: "Pregnancy Due Date Calculator",
  formula:
    "Estimates EDD using ACOG guidelines & 5 clinical methods: LMP (+280d + cycle adjustment), Ultrasound Scan (ScanDate + 280d - ScanAge), Conception (+266d), or IVF Transfer Date (+261d to +263d).",
  description:
    "Calculate your estimated delivery due date (EDD), gestational age, delivery probability, and 40-week milestone schedule. Features 5 clinical modes (LMP, Ultrasound, Conception Date, IVF Transfer, Reverse Target Date).",
  article: `
### Complete Medical Guide to Pregnancy Due Date Calculation

Determining an accurate Estimated Due Date (EDD) is a foundational step in obstetric care, establishing gestational age milestones, timing fetal screening scans, monitoring growth velocity, and avoiding unnecessary postterm interventions.

#### 1. Clinical Dating Methods & Formulas

* **Naegele's Rule (LMP)**: Standard 40-week (280-day) calculation from first day of Last Menstrual Period. Formula: EDD = LMP + 1 Year - 3 Months + 7 Days.
* **Parikh's Formula (Cycle Adjustment)**: EDD = LMP + 280 Days + (Cycle Length - 28 Days).
* **Ultrasound Crown-Rump Length (CRL)**: First-trimester ultrasound (Weeks 7–12) measuring fetal length provides the clinical gold standard precision of ±3 to 5 days.
* **IVF Embryo Transfer Dating**: Day 5 Blastocyst: EDD = Transfer Date + 261 Days. Day 3 Embryo: EDD = Transfer Date + 263 Days.

#### 2. ACOG Delivery Term Categories

* **Preterm**: &lt;37 Weeks 0 Days (~10% of deliveries)
* **Early Term**: 37 Weeks 0 Days – 38 Weeks 6 Days (~26% of deliveries)
* **Full Term**: 39 Weeks 0 Days – 40 Weeks 6 Days (~57% of deliveries; optimal neonatal outcomes)
* **Late Term**: 41 Weeks 0 Days – 41 Weeks 6 Days (~6% of deliveries)
* **Postterm**: ≥42 Weeks 0 Days (~1% of deliveries)
  `,
  references: [
    "American College of Obstetricians and Gynecologists (ACOG) Committee Opinion No. 700 (Reaffirmed 2023). Method for Estimating Due Date.",
    "American Society for Reproductive Medicine (ASRM) Practice Committee (2022). Guidelines for IVF Dating.",
    "Mittendorf, R., Williams, M. A., Berkey, C. S., & Cotter, P. F. (1990). The length of uncomplicated human gestation. Obstetrics and Gynecology, 75(6), 922-932.",
  ],
};

export default due_date_calculatorContent;
