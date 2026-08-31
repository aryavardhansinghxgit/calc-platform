export const pregnancy_conception_calculatorContent = {
  title: "Pregnancy Conception Calculator",
  formula:
    "Estimates conception date using 7 clinical modes based on ACOG & ASRM standards: Due Date (-266 days), LMP (+CycleLength - LutealPhase), Ultrasound Scan (ScanDate - GestationalAge + (CycleLength - LutealPhase)), or IVF Embryo Transfer Date.",
  description:
    "Estimate your conception date, 6-day fertile intercourse window, ovulation timing, and embryo implantation timeline. Features 7 calculation modes (Due Date, LMP, Ultrasound, Ovulation, Reverse, IVF) with interactive probability curves and milestone timelines.",
  article: `
### Comprehensive Clinical Guide to Pregnancy Conception & Fertility Timing

Determining the probable date of conception is a central component of early obstetric care, helping clinicians establish accurate gestational age, project labor milestones, evaluate fetal growth curves, and optimize prenatal screening protocols.

#### 1. Clinical Calculation Methods

* **Due Date Method**: A full-term pregnancy spans 266 days (38 weeks) from conception. Conception Date = Estimated Due Date - 266 Days.
* **Last Menstrual Period (LMP) Method**: Based on Naegele's Rule adjusted for cycle variation. Conception = LMP + (Cycle Length - Luteal Phase Length).
* **First-Trimester Ultrasound Dating**: Crown-Rump Length (CRL) ultrasound between Weeks 7 and 12 provides a clinical dating precision of ±3 to 5 days.
* **IVF Transfer Method**: Day 5 Blastocyst Transfer: Conception = Transfer Date - 5 Days. Day 3 Transfer: Conception = Transfer Date - 3 Days.

#### 2. Fertile Window Physiology

The biological fertile window spans 6 days per menstrual cycle:
* **Sperm Lifespan**: Up to 5 days (120 hours) in cervical mucus.
* **Egg Viability**: 12 to 24 hours post-ovulation.
* **Peak Probability**: Days -2, -1, and 0 relative to ovulation (28% to 33% daily chance of conception).

#### 3. Implantation & Early hCG Detection

* **Implantation Window**: 6 to 12 days post-conception (most commonly 8–10 DPO).
* **Blood hCG Test**: Detectable 8–9 days post-conception.
* **Home Urine hCG Test**: Reliable on or after 12–14 days post-conception (Day of Missed Period).
  `,
  references: [
    "American College of Obstetricians and Gynecologists (ACOG) Committee Opinion No. 700 (Reaffirmed 2023). Method for Estimating Due Date.",
    "American Society for Reproductive Medicine (ASRM) Practice Committee (2022). Optimizing Natural Fertility.",
    "Wilcox, A. J., Dunson, D., & Baird, D. D. (2000). The timing of the fertile window in the menstrual cycle. BMJ, 321(7271), 1259-1262.",
  ],
};

export default pregnancy_conception_calculatorContent;
