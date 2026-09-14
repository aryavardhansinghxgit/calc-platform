export const body_type_calculatorContent = `
# Find Your Body Shape With a Measurement-Based Body Type Calculator

Your body shape is determined by the proportions between different body measurements, not by one number on a scale.

A body type calculator can help you compare measurements such as bust or chest, natural waist, hips, height, and weight to describe broad proportional patterns such as Hourglass, Pear/Triangle, Inverted Triangle, Rectangle, Spoon, Bottom Hourglass, or Top Hourglass.

This calculator also adds two useful ratio measures:
- **Waist-to-Hip Ratio (WHR)**
- **Waist-to-Height Ratio (WHtR)**

and provides an **Estimated Anthropometric Somatotype Proxy** plus a calculator-generated **Shape Similarity Score**.

The important distinction is that these outputs describe different things. A body-shape classification is not a medical diagnosis, WHR and WHtR are not complete measures of health, and a similarity score is not a probability that your body “is” a particular type. The calculator explicitly separates these concepts.

---

## What Does a Body Type Calculator Actually Measure?

A body type calculator compares the relative proportions of your measurements.

For example, two people may both have a 36-inch bust, but their body shapes can look quite different if one has a 26-inch waist and another has a 34-inch waist.

That is why the calculator considers several measurements rather than asking only for height or weight.

A simplified view looks like this:

\`\`\`text
Bust / Chest
     │
     ├──────┐
     │      │
   Waist   Hips
     │      │
     └──┬───┘
        │
 Body Proportions
   ┌────┴────┐
   ↓         ↓
Body Shape Ratios
   │    WHR / WHtR
\`\`\`

The result is therefore a proportion-based description, not a direct measurement of body fat or overall health.

---

## How to Use the Body Type Calculator

1. **Choose the measurement system**: You can work in inches and pounds, or centimeters and kilograms.
2. **Select the appropriate body-shape framework**: The calculator separates the female body-shape model from the male frame model.
3. **Enter your measurements**: Depending on the selected mode, the calculator uses measurements such as bust/chest, natural waist, high hip, low/total hip, height, and weight.
4. **Review the results**: The calculator returns primary body-shape classification, shape similarity score, WHR, WHtR, estimated anthropometric somatotype proxy, proportion information, style guidance, and general fitness guidance.
5. **Export or save your result**: The calculator supports result sharing, CSV export, and PDF generation using the exact calculated state as the on-screen result.

---

## Why Body Measurements Matter More Than Weight Alone

Body weight tells you how much mass you have. It does not describe where that mass is distributed.

Two people with identical height and weight can have noticeably different proportions because their bust/chest, waist, hip, and other dimensions differ.

That is why body-shape analysis focuses on relationships such as:
- **Bust − Waist**
- **Hip − Waist**
- **Hip − Bust**
- **High Hip ÷ Waist**

Those proportional differences help the calculator identify the broad silhouette that best fits its classification rules.

---

## The Body Shapes Used by This Calculator

The calculator uses a seven-category female reference designed for practical self-measurement.

It is important to understand what that means.

The original NCSU Female Figure Identification Technique (FFIT) was developed for apparel applications using 3D body-scan data and identified nine female body-shape categories.

This calculator does not reproduce that complete nine-category 3D scanning system. Instead, it consolidates seven categories that can be estimated from ordinary tape measurements. The two categories omitted from the original framework are **Oval** and **Diamond**, because a basic tape-measure system cannot reliably capture the multidimensional torso and abdominal-surface information needed to distinguish those shapes.

The seven calculator categories are:

1. **Hourglass**: Bust and hip measurements are relatively balanced while the natural waist shows substantial indentation.
2. **Bottom Hourglass**: The lower body is more prominent than the bust, but the waist remains clearly defined.
3. **Top Hourglass**: The bust is somewhat more prominent than the hips while a defined waist remains present.
4. **Spoon**: The high-hip area has a pronounced shelf relative to the waist, combined with a lower-body-dominant proportion.
5. **Triangle / Pear**: Hip circumference is substantially greater than bust circumference.
6. **Inverted Triangle**: The upper body is broader relative to the hips.
7. **Rectangle / Banana**: Bust and hip measurements are relatively balanced while waist indentation is less pronounced.

These are proportion categories, not judgments about attractiveness, fitness, health, or body quality.

---

## Proportional Characteristics by Body Shape

### What Is the Hourglass Body Shape?
An hourglass classification generally describes a relatively balanced bust and hip relationship combined with a clearly smaller waist. The calculator's adapted rule looks at both bust-to-hip balance and waist indentation rather than using the word “hourglass” simply because someone's waist appears small. That distinction matters because a body can have a relatively small waist without having balanced upper- and lower-body measurements.

### What Is a Pear or Triangle Body Shape?
A Triangle, often called Pear, describes a proportional pattern in which the hips are noticeably larger than the bust. In this calculator, the classification uses the relationship between Hip − Bust and the degree of waist indentation. The result describes a silhouette pattern. It does not mean that a person has a particular type of body composition.

### What Is an Inverted Triangle Body Shape?
An Inverted Triangle describes the opposite broad proportional pattern: the upper body is more prominent relative to the hips. Depending on the model, this can reflect chest, shoulder, or upper-torso dominance. The female model and male frame model are intentionally treated as separate systems rather than assuming one classification framework applies equally to everyone.

### What Is a Rectangle or Banana Body Shape?
A Rectangle classification describes relatively balanced bust/chest and hip proportions combined with comparatively limited waist indentation. It does not mean that the person's body is literally rectangular. It is simply a convenient label for a broad proportional pattern.

### What Is the Spoon Body Shape?
The Spoon category considers a feature that many simple body-shape calculators ignore: the high-hip region. The calculator uses a high-hip-to-waist relationship in combination with the difference between hip and bust measurements. This is why it asks for a High Hip measurement instead of relying only on bust, waist, and total hip.

### What Are Bottom Hourglass and Top Hourglass?
These categories are useful when the proportions show a pronounced waist but the upper and lower body are not perfectly balanced:
- **Bottom Hourglass**: The hips are more prominent than the bust while the waist remains substantially smaller.
- **Top Hourglass**: The bust is more prominent than the hips while the waist remains substantially smaller.

These are useful descriptive distinctions because “hourglass” does not always mean that bust and hip circumferences are nearly identical.

---

## How the Calculator Determines Your Shape

The calculator uses proportion-based conditions. For example, its adapted female framework examines relationships including:
- Bust − Waist
- Hip − Waist
- Hip − Bust
- High Hip ÷ Waist
- Bust ÷ Hip

The exact rule varies by shape. The calculator marks each implementation as an adaptation where changes were made to make the original research practical for self-measurement. That distinction is important for transparency: a simplified online calculator should not pretend to be identical to a research protocol that used 3D body scanning.

### Female Shape Classification Source Mapping

| Shape | Published Source Criterion (NCSU FFIT 3D Scan) | Calculator Criterion (2D Tape Measurement) | Status |
|---|---|---|---|
| **Hourglass** | $(Bust - Hip) \\le 1'' \\land (Hip - Bust) < 3.6'' \\land ((Bust - Waist) \\ge 9'' \\lor (Hip - Waist) \\ge 10'')$ | $|Bust - Hip| \\le 1'' \\land (Bust - Waist) \\ge 9'' \\land (Hip - Waist) \\ge 9''$ | **ADAPTED** |
| **Bottom Hourglass** | $(Hip - Bust) \\ge 3.6'' \\land (Hip - Bust) < 10'' \\land (Hip - Waist) \\ge 9'' \\land (\\frac{HighHip}{Waist} < 1.193)$ | $(Hip - Bust) \\ge 2'' \\land (Hip - Bust) < 8'' \\land (Hip - Waist) \\ge 7'' \\land (\\frac{HighHip}{Waist} < 1.193)$ | **ADAPTED** |
| **Top Hourglass** | $(Bust - Hip) > 1'' \\land (Bust - Hip) < 10'' \\land (Bust - Waist) \\ge 9''$ | $(Bust - Hip) \\ge 2'' \\land (Bust - Hip) < 8'' \\land (Bust - Waist) \\ge 7''$ | **ADAPTED** |
| **Spoon** | $(Hip - Bust) \\ge 2'' \\land (\\frac{HighHip}{Waist} \\ge 1.193)$ | $(\\frac{HighHip}{Waist} \\ge 1.193) \\land (Hip - Bust) \\ge 2'' \\land (Hip - Waist) \\ge 7''$ | **ADAPTED** |
| **Triangle (Pear)** | $(Hip - Bust) \\ge 2'' \\land (Hip - Waist < 7'' \\lor \\frac{HighHip}{Waist} < 1.193)$ | $(Hip - Bust) \\ge 2''$ with waist curve not satisfying Hourglass indentation | **ADAPTED** |
| **Inverted Triangle** | $(Bust - Hip) \\ge 3.6''$ with $(Bust - Waist < 9'')$ | $(Bust - Hip) \\ge 2''$ without meeting Top Hourglass indentation | **ADAPTED** |
| **Rectangle (Banana)** | $|Bust - Hip| < 3.6'' \\land (Bust - Waist < 9'') \\land (Hip - Waist < 10'')$ | $|Bust - Hip| \\le 2'' \\land (Bust - Waist < 9'') \\land (Hip - Waist < 9'')$ | **ADAPTED** |

---

## Why Can Two Body Type Calculators Give Different Answers?

Because “body type” is not one universally defined mathematical system. Different calculators can use:
- different measurements;
- different measurement locations;
- different thresholds;
- different shape categories;
- different classification order;
- different tolerance rules.

Even research comparing body-shape systems has found that small differences in measurement definitions can change the resulting classification. A 2021 evaluation of FFIT specifically examined the effect of differences in measurement definitions on body-shape classification ([Ergonomics, Taylor & Francis](https://www.tandfonline.com/doi/full/10.1080/00140139.2021.1902572)).

So a disagreement between two calculators does not automatically mean one is “wrong.” It may mean they are using different models.

---

## What Is the Shape Similarity Score?

Your calculator provides a **Shape Similarity Score** on a 0–100-style scale.

This is not the same thing as saying “You are 98% certainly an Hourglass” or “The algorithm is 98% accurate.”

The score is generated by the calculator's own mathematical distance model using proportional features. Its scaling constants are application-defined heuristics rather than a published NCSU accuracy model.

The safest interpretation is: **A higher score means the entered proportions are mathematically closer to the criteria used for that calculator category.** It is a comparison tool, not a biological probability.

### How the Shape Similarity Score Is Calculated
The calculator first converts your measurements into a normalized feature space. Its documented features include:
- bust-to-waist difference;
- hip-to-waist difference;
- hip-to-bust difference;
- high-hip-to-waist relationship.

It then calculates a multidimensional Euclidean distance between your measurements and the target characteristics for each shape:

$$\\text{Distance } D = \\sqrt{\\sum_{i=1}^n w_i \\left(\\frac{F_{\\text{user}, i} - F_{\\text{target}, i}}{\\sigma_i}\\right)^2}$$

$$\\text{Shape Similarity Score} = \\max\\left(12, \\min\\left(98, \\text{round}\\left(\\frac{100}{1 + 1.25 \\cdot D}\\right)\\right)\\right)$$

Conceptually:
\`\`\`text
Your proportions
       ↓
Normalized features
       ↓
Distance from shape criteria
       ↓
Similarity score
       ↓
Ranked shape results
\`\`\`

The calculator intentionally caps the visible score between 12 and 98 to avoid presenting a mathematical heuristic as absolute biological certainty.

---

## What Is Waist-to-Hip Ratio (WHR)?

Waist-to-Hip Ratio (WHR) compares waist circumference with hip circumference:

$$WHR = \\frac{\\text{Waist Circumference}}{\\text{Hip Circumference}}$$

For example:
$$26 \\div 36 = 0.722$$

The calculator displays the result rounded to three decimal places.

WHR has been studied as an anthropometric indicator associated with cardiometabolic and other health risks. The World Health Organization's 2008 expert consultation specifically reviewed waist circumference and waist-hip ratio, including measurement methods, variation by sex, age, and ethnicity, and their relationship with cardiovascular disease and diabetes ([WHO Technical Report](https://www.who.int/publications/i/item/9789241501491)). However, WHR is an epidemiological risk indicator, not a diagnosis.

### What Does a WHR of 0.72 Mean?
A WHR of 0.72 simply means the waist measurement is 72% of the hip measurement when both are expressed in the same unit. It can be useful for describing relative body proportions. The health interpretation is a separate issue and depends on the population, measurement method, and reference being used. That is why this calculator labels its WHR bands as calculator reference categories rather than presenting them as universal WHO diagnostic tiers.

---

## What Is Waist-to-Height Ratio (WHtR)?

Waist-to-Height Ratio (WHtR) is:

$$WHtR = \\frac{\\text{Waist Circumference}}{\\text{Standing Height}}$$

For example:
$$26 \\div 66 = 0.394$$

The calculator displays this ratio to three decimal places.

WHtR is used as a practical measure of central adiposity in health guidance. The National Institute for Health and Care Excellence (NICE) recommends measuring WHtR alongside BMI in adults with BMI below 35 kg/m² and notes that it helps assess health risks such as type 2 diabetes, hypertension, and cardiovascular disease ([NICE Guideline NG246](https://www.nice.org.uk/guidance/ng246/chapter/Identifying-and-assessing-overweight-obesity-and-central-adiposity)).

### Understanding Common WHtR Reference Ranges

| WHtR Range | NICE Central Adiposity Classification |
|---|---|
| **< 0.40** | Below 0.40 reference point used in this calculator |
| **0.40–0.49** | Healthy central adiposity |
| **0.50–0.59** | Increased central adiposity |
| **≥ 0.60** | High central adiposity |

NICE also recommends communicating the practical public-health goal of keeping waist circumference less than half of height, equivalent to a WHtR below 0.5. The calculator presents the ratio as an anthropometric screening/reference measure, not a diagnosis.

---

## WHR and WHtR Are Not the Same Thing

These two ratios answer different questions:
- **WHR ($Waist \\div Hip$)**: Describes waist size relative to hip size (pelvic proportional silhouette).
- **WHtR ($Waist \\div Height$)**: Describes waist size relative to standing stature (central adiposity screening).

For example, with Waist = 26 in, Hip = 36 in, Height = 66 in:
- $\\text{WHR} = 26 \\div 36 = 0.722$
- $\\text{WHtR} = 26 \\div 66 = 0.394$

### Is WHtR Better Than BMI?
That question needs context. [BMI Calculator](/calculators/bmi-calculator) measures total body mass relative to height squared and is widely used as a practical measure of overall adiposity. WHtR provides additional information about central/abdominal adiposity, which BMI does not directly measure. NICE recommends using WHtR alongside BMI in adults with BMI below 35 kg/m², rather than treating one metric as a universal replacement for the other.

---

## Does Your Body Shape Tell You Whether You Are Healthy?

No. This distinction is central to interpreting the calculator:

> **BODY SHAPE ≠ BODY COMPOSITION ≠ HEALTH-RISK INDICATOR ≠ MEDICAL DIAGNOSIS**

- Someone can have an Hourglass classification and still have underlying health conditions.
- Someone can have a Rectangle classification and have optimal cardiovascular markers.
- Someone can have the same WHR as another person but very different body composition.

The calculator deliberately treats shape, ratios, and health-related screening measures as separate concepts.

---

## What Is Somatotype?

A somatotype is a framework for describing physique using three components (Carter & Heath, 1990):
1. **Endomorphy**: Relative adiposity and digestive fullness.
2. **Mesomorphy**: Musculoskeletal development and bone robustness.
3. **Ectomorphy**: Relative linearity, slenderness, and limb length.

The original Heath-Carter approach requires considerably more anthropometric data than a basic body-shape calculator, including multi-site skinfold calipers, bone breadths, and limb girths ([PLOS ONE Somatotype Protocols](https://journals.plos.org)).

Your calculator therefore does not claim to perform a laboratory Heath-Carter assessment. It reports an **Estimated Anthropometric Somatotype Proxy**, explicitly clarifying that this is a simplified calculation based on height-weight and circumference relationships.

### What Does the Somatotype Proxy Mean?
Think of the proxy as an additional physique descriptor to help organize measurements into broad patterns. It should not be interpreted as a clinical diagnosis, a direct measurement of muscle mass, a laboratory somatotype, or a determinant of athletic ability.

---

## Can Body Shape Change Over Time?

Yes. Your proportions can change with:
- age and maturation;
- pregnancy and postpartum endocrine shifts;
- progressive resistance training;
- changes in total body weight;
- changes in muscle mass;
- changes in fat distribution;
- posture;
- measurement technique.

A body-shape result is a snapshot of your current measurements, not a permanent biological identity.

### Does Losing Weight Automatically Change Your Body Shape?
Not necessarily. Weight loss changes circumferences, but proportions may not change in the same way. For example, someone may lose several kilograms while retaining a similar ratio between waist and hips. Another person may see a larger relative change in the waist than the hips. Body shape depends on where dimensions change relative to one another, not simply on total weight loss.

### Does Gaining Muscle Change Your Body Shape?
It can. Progressive resistance training may increase the circumference of particular muscle groups—such as the shoulders, latissimus dorsi, gluteals, and quadriceps. These localized changes can alter the proportional relationships used by a body-shape calculator.

---

## Does Body Shape Tell You Where Your Fat Is Stored?

Not precisely. Central fat distribution has been associated with cardiometabolic risk at the population level, but simple tape measurements do not directly distinguish visceral fat from subcutaneous fat.

The calculator therefore does not claim:
- *“Apple shape = visceral fat.”*
- *“Pear shape = only subcutaneous fat.”*

All individuals have both subcutaneous and visceral adipose depots, and clinical imaging (such as DEXA, CT, or MRI) is necessary for anatomical fat-depot quantification.

---

## Can Body Shape Predict Fertility?

No. Some historical observational studies have reported correlations between waist-to-hip ratio and reproductive hormone markers, but those findings do not make body shape a fertility test.

The calculator does not claim that an individual body shape guarantees fertility, causes fertility, or predicts the ability to conceive. Reproductive health is multifactorial and requires clinical medical assessment.

---

## Can You Change Only Belly Fat With a Specific Exercise?

Do not interpret body-shape or fitness guidance as a promise of spot fat loss.

The evidence is more nuanced than the simple statement that spot reduction is either completely impossible or universally guaranteed. A 2011 randomized controlled trial found no significant reduction in abdominal fat from abdominal exercise alone ([Vispute et al., PubMed](https://pubmed.ncbi.nlm.nih.gov/21804427/)), while a 2023 randomized trial reported localized trunk-fat changes under a specific combined abdominal-exercise and endurance protocol ([Broch-Lips et al., PubMed](https://pubmed.ncbi.nlm.nih.gov/38010201/)).

**Conclusion:** Spot-reduction evidence is mixed, and a particular exercise should not be assumed to remove fat only from the body area being trained. Total energy balance, genetics, and hormonal factors remain the primary drivers of body composition changes.

---

## Why Measurement Technique Matters

A body-shape calculator can only be as consistent as the measurements entered into it. Small differences in tape placement can change the resulting ratios and classification:
- **Natural Waist**: Measure at the narrowest point of the torso, typically midway between the lowest rib and the iliac crest. Do not measure over thick clothing.
- **High Hip**: Measure at the upper prominence of the pelvic iliac crest.
- **Low Hip**: Measure around the widest horizontal circumference of the buttocks.

### High Hip and Low Hip Are Separate Inputs
Many simple calculators ask for only one hip measurement. This calculator asks for both because the high-hip region provides information about pelvic shelf contours (critical for distinguishing Spoon shapes from gradual hip flares), while WHR uses the widest low-hip girth:
$$\\text{High Hip} \\ne \\text{Low Hip}$$

---

## Body Type Calculator vs Body Fat Calculator

These tools evaluate distinct aspects of human morphology:

| Tool | Primary Purpose | Evaluated Metrics | Complementary Application |
|---|---|---|---|
| **Body Type Calculator** | Proportional shape classification | Bust, Waist, High Hip, Low Hip | Garment styling & silhouette analysis |
| **[Body Fat Calculator](/calculators/body-fat-calculator)** | Adipose percentage estimation | Circumferences, Height, Weight | Body composition tracking |
| **[BMI Calculator](/calculators/bmi-calculator)** | General demographic weight status | Height, Total Weight | Population mass screening |
| **[Lean Body Mass Calculator](/calculators/lean-body-mass-calculator)** | Non-adipose tissue estimation | Weight, Body Fat % | Nutrition & strength targeting |
| **[Body Surface Area Calculator](/calculators/body-surface-area-calculator)** | Total external surface area | Height, Weight | Physiological & metabolic baseline |
| **[Ideal Weight Calculator](/calculators/ideal-weight-calculator)** | Reference body weight formulas | Height, Gender | Broad weight reference ranges |

A body type result should never be treated as a replacement for a body-fat measurement.

---

## Body Type and Clothing: Practical Styling Guidance

One of the strongest practical applications of body-shape classification is clothing and styling—consistent with the historical origins of the NCSU FFIT apparel research:
- **Hourglass**: Wrap dresses, belted coats, and tailored garments that accentuate natural waist indentation without adding bulk.
- **Bottom Hourglass**: A-line silhouettes, boat necklines, and structured shoulders to balance hip prominence.
- **Top Hourglass**: V-necklines, open collars, and A-line skirts to complement bust proportions.
- **Spoon**: High-waisted trousers, empire waists, and skirts that skim smoothly over the high-hip shelf.
- **Triangle / Pear**: Statement necklines, structured jackets, and wide-leg trousers to visually balance lower-body dominance.
- **Inverted Triangle**: Peplum tops, flare skirts, and wide-leg pants that add volume below the waist.
- **Rectangle**: Belted garments, pleated skirts, and layered pieces that create visual waist definition.

Wardrobe recommendations are styling suggestions, not prescriptive rules.

---

## How Accurate Is a Body Type Calculator?

There are two distinct questions:
1. **Is the arithmetic accurate?** Yes; calculations are deterministic and consistent with defined mathematical operations.
2. **Is the body-shape classification biologically exact?** No classification based on 2D circumference measurements can fully capture a 3D human body.

Original FFIT research utilized 3D surface scanning to analyze body volumes ([U.S. Patent 9251591B2](https://patents.google.com/patent/US9251591B2/en)). The calculator is deterministic within its defined model, while the underlying classification remains a simplified anthropometric estimate.

---

## Final Thoughts

A body type calculator is most useful when treated as a measurement and proportion tool, not as a verdict on your health, appearance, or worth.

Understand what each output represents:
- **Body Shape** describes proportional silhouette for garment fit.
- **WHR** describes waist size relative to hip circumference.
- **WHtR** describes waist size relative to standing stature.
- **Shape Similarity Score** indicates mathematical proximity to archetype boundaries.
- **Estimated Anthropometric Somatotype Proxy** offers a general physique description.

---

## Methodology & Sources

- **Female Body Shape Classification**: Simmons, K. P., Istook, C. L., & Devarajan, P. (2004), *Female Figure Identification Technique (FFIT) for Apparel*, JTATM. Consolidated into 7 self-measurement archetypes.
- **Waist-to-Hip Ratio (WHR)**: World Health Organization (2008), *Waist Circumference and Waist-Hip Ratio: Report of a WHO Expert Consultation*. Epidemiological risk indicator.
- **Waist-to-Height Ratio (WHtR)**: National Institute for Health and Care Excellence (NICE 2022/2023), *Guideline NG246: Identifying and assessing overweight, obesity and central adiposity*.
- **Somatotype**: Carter, J. E. L., & Heath, B. H. (1990), *Somatotyping: Development and Applications*. Calculator provides a non-clinical anthropometric proxy.
- **Shape Similarity Score**: Application-defined Euclidean feature-space distance heuristic; not an externally validated classification accuracy rate.
`;
