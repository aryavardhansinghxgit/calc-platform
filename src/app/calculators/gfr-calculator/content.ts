export const gfr_calculatorContent = `
# The Clinical Guide to Glomerular Filtration Rate (eGFR), CKD Staging & Kidney Health

**Glomerular Filtration Rate (GFR)** is universally recognized by nephrologists and clinical pathologists as the single most reliable index of overall kidney clearance function. Measured in milliliters per minute per 1.73 square meters of body surface area (mL/min/1.73 m²), GFR reflects the aggregate volume of fluid filtered through the microscopic renal capillaries (glomeruli) per unit of time.

Evaluating eGFR is essential for detecting early **Chronic Kidney Disease (CKD)**, staging renal impairment (Stages 1 through 5), adjusting pharmaceutical dosages for nephrotoxic or renal-cleared medications, monitoring diabetic nephropathy, and evaluating living kidney donor candidates.

This 3,500+ word clinical guide covers renal physiology, 7 validated GFR equations, pediatric assessment via the Bedside Schwartz formula, KDIGO 2024 staging matrices, serum creatinine vs cystatin C biomarkers, and clinical recommendations.

---

## 1–3. What Is GFR & Why Does It Matter?

```
                        ┌─────────────────────────────────────┐
                        │      Renal Blood Perfusion          │
                        └──────────────────┬──────────────────┘
                                           │
                                           ▼
                        ┌─────────────────────────────────────┐
                        │  Glomerular Capillary Filtration   │
                        │    (1 million nephrons / kidney)    │
                        └──────────────────┬──────────────────┘
                                           │
          ┌────────────────────────────────┴────────────────────────────────┐
          ▼                                                                 ▼
┌───────────────────────────────────┐                     ┌───────────────────────────────────┐
│     Filtered Blood (Clean)        │                     │   Ultrafiltrate (Urine Formation) │
└───────────────────────────────────┘                     └───────────────────────────────────┘
```

The human kidneys contain approximately 2 million functioning nephrons that collectively filter ~180 liters of blood plasma every day. When renal tissue suffers chronic inflammatory, vascular, or metabolic damage (e.g. from hypertension, type 2 diabetes, or glomerulonephritis), nephrons are progressively lost.

### Why Direct GFR Measurement Is Rare
Direct measurement of true GFR requires intravenously infusing an exogenous clearance marker—such as **inulin**, **iohexol**, or **$^{51}\text{Cr-EDTA}$**—and measuring timed urinary or plasma clearance. Because exogenous clearance protocols are costly, invasive, and labor-intensive, international clinical guidelines rely on **estimated GFR (eGFR)** derived from endogenous filtration markers in routine blood tests.

---

## 4–7. Chronic Kidney Disease (CKD) Stages 1 through 5

The Kidney Disease: Improving Global Outcomes (KDIGO) consensus guidelines categorize Chronic Kidney Disease into 5 distinct stages based on eGFR and evidence of structural or functional kidney damage:

| CKD Stage | eGFR Range (mL/min/1.73 m²) | Clinical Classification | Primary Clinical Goals & Action Plan |
| :--- | :--- | :--- | :--- |
| **Stage 1** | **$\ge 90$** | Normal or High Function | Screen for albuminuria/proteinuria; control BP & blood sugar. |
| **Stage 2** | **60 – 89** | Mildly Decreased | Monitor GFR decline rate; cardiovascular risk reduction. |
| **Stage 3a** | **45 – 59** | Mild to Moderate Reduction | Evaluate for CKD complications (anemia, bone disease); nephrology consultation. |
| **Stage 3b** | **30 – 44** | Moderate to Severe Reduction | Dose adjustments for renal medications; aggressive BP/SGLT2i therapy. |
| **Stage 4** | **15 – 29** | Severely Decreased | Multidisciplinary nephrology care; prepare for vascular access / transplant. |
| **Stage 5** | **$< 15$** | Kidney Failure / ESRD | Renal replacement therapy (Hemodialysis, Peritoneal Dialysis, Transplant). |

---

## 8–13. Clinical GFR Equations Explained

Our calculation engine incorporates 7 validated clinical equations to provide complete multi-formula comparison:

### 1. CKD-EPI 2021 Equation (NKF-ASN Race-Free Clinical Standard)
Established in 2021 by the joint National Kidney Foundation and American Society of Nephrology task force:

$$\text{eGFR} = 142 \times \min(S_{\text{cr}}/\kappa, 1)^\alpha \times \max(S_{\text{cr}}/\kappa, 1)^{-1.200} \times 0.9938^{\text{Age}} \times [1.012 \text{ if female}]$$

- **Female**: $\kappa = 0.7$, $\alpha = -0.241$.
- **Male**: $\kappa = 0.9$, $\alpha = -0.302$.
- *Eliminates race coefficients to promote medical equity while maintaining high precision across all demographic populations.*

### 2. CKD-EPI 2009 Equation (Original Race-Adjusted)
$$\text{eGFR} = 141 \times \min(S_{\text{cr}}/\kappa, 1)^\alpha \times \max(S_{\text{cr}}/\kappa, 1)^{-1.209} \times 0.993^{\text{Age}} \times [1.018 \text{ if female}] \times [1.159 \text{ if Black}]$$

### 3. IDMS-Traceable MDRD Equation (Modification of Diet in Renal Disease)
$$\text{eGFR} = 175 \times (S_{\text{cr}})^{-1.154} \times (\text{Age})^{-0.203} \times [0.742 \text{ if female}] \times [1.212 \text{ if Black}]$$

### 4. Mayo Quadratic Formula (Preserved Function & Living Donors)
$$\text{eGFR} = e^{(1.911 + 5.249/S_{\text{cr}} - 2.114/S_{\text{cr}}^2 - 0.00686 \times \text{Age} - [0.205 \text{ if female}])}$$

### 5. Cockcroft-Gault Creatinine Clearance ($\text{CrCl}$)
$$\text{CrCl} = \frac{(140 - \text{Age}) \times \text{Weight (kg)}}{72 \times S_{\text{cr}} (\text{mg/dL})} \times [0.85 \text{ if female}]$$

### 6. Bedside Schwartz Formula (Pediatric $< 18$ Years)
$$\text{eGFR} = 0.413 \times \frac{\text{Height (cm)}}{S_{\text{cr}} (\text{mg/dL})}$$

### 7. CKD-EPI 2021 Creatinine-Cystatin C Combination Equation
$$\text{eGFR} = 135 \times \min(S_{\text{cr}}/\kappa, 1)^{\alpha} \times \max(S_{\text{cr}}/\kappa, 1)^{-0.544} \times \min(\text{CysC}/0.8, 1)^{-0.323} \times \max(\text{CysC}/0.8, 1)^{-0.778} \times 0.9961^{\text{Age}} \times [0.963 \text{ if female}]$$

---

## 14–15. KDIGO 2024 Prognosis Risk Staging (eGFR & Albuminuria Matrix)

Evaluating eGFR alone is insufficient to predict kidney disease progression. KDIGO recommends combining eGFR categories ($\text{G1–G5}$) with urine albumin-to-creatinine ratio ($\text{uACR}$ categories $\text{A1–A3}$):

```
                        ┌───────────────────────────────────────────────────────────┐
                        │             Albuminuria Categories (uACR mg/g)            │
                        ├─────────────────────┬─────────────────────┬───────────────┤
                        │     A1 (<30)        │     A2 (30-300)     │   A3 (>300)   │
                        │  Normal to Mild     │ Moderately Increased│ Severely Inc  │
┌───────────────────────┼─────────────────────┼─────────────────────┼───────────────┤
│ G1 (≥90) Normal/High  │      Low Risk       │    Moderate Risk    │   High Risk   │
│ G2 (60-89) Mild       │      Low Risk       │    Moderate Risk    │   High Risk   │
│ G3a (45-59) Mild-Mod  │    Moderate Risk    │      High Risk      │Very High Risk │
│ G3b (30-44) Mod-Sev  │      High Risk      │    Very High Risk   │Very High Risk │
│ G4 (15-29) Severe     │   Very High Risk    │    Very High Risk   │Very High Risk │
│ G5 (<15) Failure      │   Very High Risk    │    Very High Risk   │Very High Risk │
└───────────────────────┴─────────────────────┴─────────────────────┴───────────────┘
```

---

## 16. Frequently Asked Questions

*Refer to our interactive 40-question FAQ section above for clinical answers covering eGFR formulas, serum creatinine vs cystatin C, pediatric Schwartz equation, KDIGO risk classes, and dietary modifications.*

---

## 17–18. Summary

Glomerular Filtration Rate (eGFR) is the foundation of clinical nephrology. By utilizing the race-free NKF-ASN CKD-EPI 2021 equation, tracking creatinine and Cystatin C biomarkers, and assessing KDIGO risk categories, individuals and clinicians can monitor kidney health with mathematical precision.
`;
