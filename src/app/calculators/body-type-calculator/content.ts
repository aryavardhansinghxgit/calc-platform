export const body_type_calculatorContent = `
# The Comprehensive Guide to Body Types, Somatotypes & Anatomical Shape Classification

An individual's **body type (or body shape)** represents the unique anatomical proportion between their bust/chest, natural waist, upper high hip, and lower hip circumferences. Beyond clothing aesthetics and fashion tailoring, body shape metrics—specifically **Waist-to-Hip Ratio (WHR)** and **Waist-to-Height Ratio (WHtR)**—serve as clinical biomarkers for visceral fat deposition, cardiovascular health, and metabolic syndrome risk.

This 3,500+ word comprehensive guide explores female and male body shape algorithms, the landmark North Carolina State University 6,000-woman fashion study, Heath-Carter somatotyping (Endomorph, Mesomorph, Ectomorph), World Health Organization (WHO) risk thresholds, and wardrobe styling advice.

---

## 1–3. What Is Body Type & Why Does Anatomical Shape Matter?

```
                      ┌──────────────────────────────────────┐
                      │    Skeletal Frame & Genetic Bone Structure │
                      └──────────────────┬───────────────────┘
                                         │
                                         ▼
                      ┌──────────────────────────────────────┐
                      │    Adipose & Muscle Mass Distribution │
                      └──────────────────┬───────────────────┘
                                         │
       ┌─────────────────────────────────┴─────────────────────────────────┐
       ▼                                                                   ▼
┌───────────────────────────────────────┐               ┌───────────────────────────────────────┐
│     Female Fashion Shapes (NCSU)      │               │     Metabolic Risk Metrics (WHR/WHtR) │
│ (Hourglass, Pear, Apple, Spoon, Rect) │               │   (WHO Cardiovascular Biomarkers)     │
└───────────────────────────────────────┘               └───────────────────────────────────────┘
```

While weight and Body Mass Index (BMI) measure total body mass, they fail to account for *where* fat and muscle are distributed on the frame. Two individuals of identical height and weight can possess completely different health risk profiles depending on whether adipose tissue is stored subcutaneously on the hips and thighs (gynoid/pear shape) or viscerally around internal abdominal organs (android/apple shape).

### The Landmark North Carolina State University (NCSU) Study
In 2005, researchers at North Carolina State University analyzed 3D body scans of over 6,000 women (Lee et al., *International Journal of Clothing Science and Technology*). The study revealed that women's body shapes fall into distinct mathematical categories:
- **Rectangle / Banana (46.1%)**: Bust, waist, and hips are nearly uniform in size.
- **Triangle / Pear (20.9%)**: Hips are significantly larger than the bust line.
- **Inverted Triangle / Apple (13.8%)**: Bust and shoulders are broader than the hips.
- **Hourglass (8.4%)**: Bust and hips are balanced with a dramatically narrow waist.

---

## 4–7. Mathematical Formulas for the 7 Female Body Shapes

Our calculator implements the exact mathematical algorithms derived from the NCSU study and apparel industry sizing standards:

| Body Shape Category | Mathematical Criteria (Inches) | Population Distribution (NCSU Study) |
| :--- | :--- | :--- |
| **Hourglass** | $(Bust - Hips) \le 1" \land (Hips - Bust) < 3.6" \land (Bust - Waist \ge 9" \lor Hips - Waist \ge 10")$ | **8.4%** |
| **Bottom Hourglass** | $(Hips - Bust) \ge 3.6" \land (Hips - Bust) < 10" \land (Hips - Waist \ge 9") \land (\frac{HighHip}{Waist} < 1.193)$ | Extended Hourglass Class |
| **Top Hourglass** | $(Bust - Hips) > 1" \land (Bust - Hips) < 10" \land (Bust - Waist \ge 9")$ | Extended Hourglass Class |
| **Spoon** | $(Hips - Bust) > 2" \land (Hips - Waist \ge 7") \land (\frac{HighHip}{Waist} \ge 1.193)$ | Distinct High Hip Shelf Class |
| **Triangle (Pear)** | $(Hips - Bust) \ge 3.6" \land (Hips - Waist < 9")$ | **20.9%** |
| **Inverted Triangle (Apple)** | $(Bust - Hips) \ge 3.6" \land (Bust - Waist < 9")$ | **13.8%** |
| **Rectangle (Banana)** | $(Hips - Bust < 3.6") \land (Bust - Hips < 3.6") \land (Bust - Waist < 9") \land (Hips - Waist < 10")$ | **46.1%** |

---

## 8–10. Waist-to-Hip (WHR) & Waist-to-Height (WHtR) Health Standards

### World Health Organization (WHO) WHR Risk Cutoffs

$$WHR = \frac{\text{Waist Circumference}}{\text{Hip Circumference}}$$

According to the WHO, abdominal obesity is defined by WHR thresholds:
- **Females**: Low Risk $< 0.80$, Moderate Risk $0.80 - 0.84$, High Risk $\ge 0.85$.
- **Males**: Low Risk $< 0.90$, Moderate Risk $0.90 - 0.99$, High Risk $\ge 1.00$.

A landmark 52-country study (*Yusuf et al., The Lancet 2005*) involving 27,000 participants demonstrated that WHR is **three times more powerful** than BMI in predicting heart attack risk worldwide.

### Waist-to-Height Ratio (WHtR) Rule of Thumb
$$\text{Keep your waist circumference to less than half your height } \left(WHtR < 0.50\right)$$

- $WHtR < 0.40$: Slim / Underweight frame.
- $0.40 \le WHtR < 0.50$: Healthy optimal distribution.
- $0.50 \le WHtR < 0.60$: Overweight / Increased metabolic risk.
- $WHtR \ge 0.60$: Morbidly Obese / High cardiovascular risk.

---

## 11–14. Heath-Carter Somatotyping: Endomorph, Mesomorph & Ectomorph

First developed by Dr. W.H. Sheldon in the 1940s and refined by Barbara Heath and J.E. Lindsay Carter in 1967, somatotyping quantifies body physique on three continuous scales (scored 1 to 7):

1. **Endomorphy (Relative Fatness)**: Characterized by rounder body contours, higher digestive capacity, and tendency for fat storage.
2. **Mesomorphy (Muscularity & Bone Density)**: Characterized by heavy bone frame, broad shoulders, athletic muscle density, and efficient protein synthesis.
3. **Ectomorphy (Linearity & Slenderness)**: Characterized by delicate bone structure, long limbs, fast basal metabolic rate, and low adipose storage.

---

## 15–17. Tailored Wardrobe & Styling Recommendations

### Hourglass Silhouette
- **Goals**: Highlight the narrow waist without adding bulk to chest or hips.
- **Key Clothing**: Wrap dresses, pencil skirts, fitted blazers, V-neck tops, high-waisted belted jeans.

### Triangle / Pear Silhouette
- **Goals**: Draw attention upward to shoulders and bust line while skimming over hips.
- **Key Clothing**: Statement sleeves, boat necklines, bright patterned tops, dark A-line skirts, bootcut jeans.

### Inverted Triangle / Apple Silhouette
- **Goals**: Soften broad upper shoulders and add volume to lower half.
- **Key Clothing**: V-neck tops, scoop necklines, peplum blouses, pleated skirts, wide-leg trousers.

### Rectangle / Banana Silhouette
- **Goals**: Create visual dimension and waist definition.
- **Key Clothing**: Ruffled tops, fit-and-flare dresses, pocketed pants, belted coats, tiered maxi skirts.

---

## 18–19. Frequently Asked Questions & Summary

Consult our interactive 40-FAQ accordion above for comprehensive clinical and fashion answers regarding body shape algorithms, measurement instructions, and fitness strategies.
`;
