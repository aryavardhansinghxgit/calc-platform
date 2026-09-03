export const pregnancy_weight_gain_calculatorContent = {
  title: "Pregnancy Weight Gain Calculator",
  formula:
    "Body Mass Index (BMI = Weight kg / Height m²) & 2009 Institute of Medicine (IOM) / ACOG gestational weight gain boundaries for singleton and twin pregnancies across Weeks 1 to 40.",
  description:
    "Calculate personalized, healthy weight gain targets by week of pregnancy based on Institute of Medicine (IOM) & ACOG clinical guidelines. Features week-by-week weight schedule, 40-week trajectory chart, physiological weight distribution breakdown, and nutritional guidelines.",
  article: `
### Complete Clinical Guide to Gestational Weight Gain

Maternal weight gain during pregnancy is a critical physiological indicator of maternal-fetal health. Managing weight gain within clinical target ranges established by the **Institute of Medicine (IOM)** and the **American College of Obstetricians and Gynecologists (ACOG)** promotes optimal fetal growth while mitigating maternal and neonatal complications.

#### 1. Institute of Medicine (IOM) Guidelines

Target weight gain is determined primarily by pre-pregnancy Body Mass Index (BMI):

* **Underweight (BMI < 18.5)**: 28 to 40 lbs (12.5 to 18.0 kg) total gain; ~1.0 to 1.3 lbs/week in T2/T3.
* **Normal Weight (BMI 18.5 – 24.9)**: 25 to 35 lbs (11.5 to 16.0 kg) total gain; ~0.8 to 1.0 lbs/week in T2/T3.
* **Overweight (BMI 25.0 – 29.9)**: 15 to 25 lbs (7.0 to 11.5 kg) total gain; ~0.5 to 0.7 lbs/week in T2/T3.
* **Obese (BMI ≥ 30.0)**: 11 to 20 lbs (5.0 to 9.0 kg) total gain; ~0.4 to 0.6 lbs/week in T2/T3.

For **Twin Gestations**:
* **Underweight**: 50 to 62 lbs (22.7 to 28.1 kg) total gain (CDC Clinical Guidance); ~1.5 to 1.8 lbs/week in T2/T3.
* **Normal Weight**: 37 to 54 lbs (16.8 to 24.5 kg) total gain; ~1.2 to 1.7 lbs/week in T2/T3.
* **Overweight**: 31 to 50 lbs (14.1 to 22.7 kg) total gain; ~1.0 to 1.5 lbs/week in T2/T3.
* **Obese**: 25 to 42 lbs (11.3 to 19.1 kg) total gain; ~0.8 to 1.2 lbs/week in T2/T3.

##### Understanding Weekly Gain Trajectories vs. Guideline Targets
The IOM guidelines establish two core reference anchors: (1) a full-term 40-week total weight gain range and (2) an average weekly rate of gain during the second and third trimesters. In clinical practice, weight gain is not strictly linear, especially during the first trimester when gain is typically modest (1.1–4.4 lbs total) or may temporarily decrease due to nausea. The weekly ranges presented in this calculator are illustrative interpolations between these official guideline milestones; they should be interpreted as educational references rather than rigid weekly clinical prescriptions.

#### 2. Where Does the Weight Go?

Gestational weight gain is distributed across maternal and fetal tissues:
1. **Fetus (Baby)**: ~7.5 lbs (3.4 kg)
2. **Placenta**: ~1.5 lbs (0.7 kg)
3. **Amniotic Fluid**: ~2.0 lbs (0.9 kg)
4. **Uterine Muscle Expansion**: ~2.0 lbs (0.9 kg)
5. **Maternal Blood Plasma Volume**: ~4.0 lbs (1.8 kg)
6. **Extracellular Fluid**: ~3.0 lbs (1.4 kg)
7. **Breast Tissue**: ~2.0 lbs (0.9 kg)
8. **Maternal Fat & Energy Stores**: ~7.0 lbs (3.2 kg)

#### 3. Caloric & Nutritional Requirements

The phrase "eating for two" is misleading. Energy requirements increase moderately by trimester:
* **Trimester 1 (Weeks 1–13)**: +0 kcal/day extra. Focus on 600 mcg Folic Acid to prevent neural tube defects.
* **Trimester 2 (Weeks 14–27)**: +340 kcal/day extra. Increase Iron (27 mg/day) and Protein (71 g/day).
* **Trimester 3 (Weeks 28–40)**: +450 kcal/day extra. Ensure Calcium (1,000 mg/day) and DHA (200 mg/day).
  `,
  references: [
    "Institute of Medicine (IOM) & National Research Council (2009). Weight Gain During Pregnancy: Reexamining the Guidelines. Washington, DC: The National Academies Press.",
    "American College of Obstetricians and Gynecologists (ACOG) Committee Opinion No. 548 (2013, Reaffirmed 2023). Weight Gain During Pregnancy.",
    "World Health Organization (WHO) Health & Clinical Guidelines on Maternal Nutrition.",
  ],
};

export default pregnancy_weight_gain_calculatorContent;
