export const bacEducationalContent = `
## BAC Calculator: Estimate Blood Alcohol Concentration From Drinks and Time

A BAC calculator estimates blood alcohol concentration from information such as the amount of alcohol consumed, beverage strength, body weight, sex, elapsed time, and selected model assumptions.

This calculator is designed to show the mathematics behind an estimated BAC rather than provide a guarantee of sobriety, impairment level, or legal permission to drive.

You can enter individual drinks using their volume and alcohol by volume (ABV), choose an estimation method, and see:

- Current modeled BAC
- Modeled peak BAC
- Estimated future elimination
- Time until the model reaches a chosen reference threshold
- Modeled time until the calculated BAC reaches 0.00%
- Total pure alcohol consumed
- Estimated standard drinks
- Alcohol calories
- Weight-based comparisons

The calculator supports several mathematical approaches, including Widmark, Seidl, and Watson total-body-water modeling. The different methods can produce different estimates because they use different assumptions about alcohol distribution in the body.

> **Safety Notice:** A BAC calculator is an estimate, not a breathalyzer or blood test. It cannot determine whether someone is sober, unimpaired, or legally permitted to drive. Alcohol affects people differently, and driving after drinking should never be decided from a calculator result.

---

### What Is BAC?

Blood alcohol concentration (BAC) is the concentration of ethanol in the blood.

It is commonly expressed as **% BAC** or **g/dL**. For example:

$$\\text{0.08\\% BAC} = 0.08\\text{ g/dL} = 0.80\\text{ g/L}$$

BAC depends on several interacting factors, including how much alcohol was consumed, how quickly it was consumed, absorption, distribution through body water, and metabolism. The National Institute on Alcohol Abuse and Alcoholism (NIAAA) notes that BAC is influenced by how much and how quickly someone drinks as well as individual differences in absorption, distribution, and metabolism.

A calculator simplifies those processes into mathematical assumptions. A real person's BAC can therefore differ from the calculator estimate.

---

### How a BAC Calculator Works

A simplified BAC calculation follows this general sequence:

$$\\text{Drink volume + ABV} \\longrightarrow \\text{Pure ethanol} \\longrightarrow \\text{Body distribution} \\longrightarrow \\text{Peak BAC} \\longrightarrow \\text{Elimination over time} \\longrightarrow \\text{Current estimated BAC}$$

The first step is especially important because two drinks are not necessarily equal. A 12-ounce beer at 5% ABV contains considerably less alcohol than a 12-ounce beverage at 10% ABV.

NIAAA gives a useful U.S. reference: a 12-ounce beer at about 5% ABV, a 5-ounce glass of wine at about 12% ABV, and a 1.5-ounce shot of distilled spirits at about 40% ABV each contain about 14 grams of pure alcohol and therefore represent one U.S. standard drink.

---

### What Is a Standard Drink?

In the United States, one standard drink contains approximately 14 grams of pure ethanol, or about 0.6 fluid ounces of pure alcohol.

| Beverage | Approximate Serving | Approx. ABV | U.S. Standard Drinks |
| :--- | :--- | :--- | :--- |
| **Regular beer** | 12 oz (355 mL) | 5% | 1.0 |
| **Table wine** | 5 oz (148 mL) | 12% | 1.0 |
| **Distilled spirits** | 1.5 oz (44 mL) | 40% | 1.0 |

The important variable is pure alcohol, not simply the number of glasses. A 12-ounce beer at 10% ABV contains approximately twice the alcohol of a 12-ounce beer at 5% ABV. NIAAA specifically warns that beverage size alone does not tell you how much alcohol a drink contains.

---

### Why Drink Size and ABV Both Matter

Pure alcohol can be estimated from:

$$\\text{Alcohol volume} = \\text{Drink volume} \\times \\text{ABV}$$
$$\\text{Ethanol mass} = \\text{Alcohol volume} \\times \\text{ethanol density}$$

This calculator uses an ethanol density constant of approximately **0.7891 g/mL**.

For example, two 355 mL beers at 5% ABV contain:
$$2 \\times 355 \\times 0.05 = 35.5\\text{ mL of pure ethanol}$$

Using the calculator's density constant:
$$35.5 \\times 0.7891 \\approx 28.01\\text{ g ethanol}$$

That is approximately **2 U.S. standard drinks**. The exact displayed result may vary slightly because of rounding.

---

### How the Widmark BAC Formula Works

The Widmark equation is one of the best-known mathematical approaches for estimating BAC from alcohol consumed and body mass.

The conceptual form is:
$$\\text{BAC} = \\frac{\\text{Alcohol (g)}}{\\text{Body mass (g)} \\times \\text{distribution factor } r} \\times 100$$

The calculator then applies its selected time and stomach-state assumptions to model the current value.

For the calculator's benchmark:
- Male, 165 lb (74.8 kg)
- 2 × 12-ounce beers at 5% ABV (28.01 g pure alcohol)
- 2 hours elapsed since first drink
- Light meal (normal absorption)

The implementation calculates approximately:
- **Peak modeled BAC**: 0.055%
- **Current modeled BAC**: 0.025%

That result is a mathematical estimate, not a measured BAC.

---

### What Is the Widmark Distribution Factor?

The Widmark approach uses a distribution factor, commonly represented by $r$, to approximate how alcohol distributes within the body's water-containing tissues.

This calculator uses:
- **$r = 0.68$** for male
- **$r = 0.55$** for female

These are population model parameters, not personalized measurements of an individual's exact body-water composition. That distinction matters because people with the same body weight can have different body composition—such as differences explored by a [Body Fat Calculator](/calculators/body-fat-calculator) or [Lean Body Mass Calculator](/calculators/lean-body-mass-calculator)—and therefore different alcohol distribution spaces.

---

### Why Two People Can Have Different BAC After Drinking the Same Amount

BAC is not determined by drink count alone. Important variables include:
- Body mass and weight (such as your baseline on an [Ideal Weight Calculator](/calculators/ideal-weight-calculator))
- Body composition and water percentage
- Biological sex and hormonal factors
- Rate of drinking and gastric motility
- Total pure alcohol consumed
- Food intake and stomach contents
- Rate of gastrointestinal absorption
- Hepatic enzyme metabolism

NIAAA notes that alcohol metabolism varies among individuals and is influenced by factors including body mass, liver characteristics, genetics, nutrition, and medications. Therefore, two people who each consume two identical drinks can have different BAC values.

---

### How Body Weight Affects Estimated BAC

For the same alcohol dose, a larger distribution mass generally produces a lower modeled BAC in a Widmark-style calculation.

The calculator demonstrates this relationship in its weight matrix. For two standard drinks at two hours under the benchmark conditions, the modeled peak BAC falls as body weight increases:
- **Lower body mass** $\\longrightarrow$ higher modeled concentration
- **Higher body mass** $\\longrightarrow$ lower modeled concentration

This does not mean weight alone determines actual intoxication or impairment.

---

### How Sex Enters the Widmark Model

Traditional Widmark calculations use different distribution assumptions for males and females. The reason is that alcohol distributes primarily through body water, and average body-water composition differs between population groups.

NIAAA notes that, pound for pound, women typically have less body water than men and therefore can reach a higher BAC after consuming the same amount of alcohol at the same body weight. The calculator incorporates sex-specific distribution factors ($r = 0.68$ vs $0.55$) as part of its model. This is a model simplification, not a statement about every individual.

---

### Why BAC Can Rise Before It Falls

The body begins absorbing alcohol before it has finished metabolizing the alcohol already consumed. NIAAA explains that alcohol is absorbed faster than it is metabolized, so BAC can continue to rise when additional drinks are consumed before previous alcohol has been cleared.

The highest BAC is therefore not necessarily reached immediately after the last sip; peak concentrations typically occur 20 to 60 minutes after drinking ceases.

---

### What Is Peak BAC?

Peak BAC is the highest modeled blood alcohol concentration within the calculator's absorption model. For the benchmark case, the calculator reports approximately **Peak BAC = 0.055%** with an estimated peak around **30 minutes** under light-meal assumptions.

The precise timing of a real person's peak can differ substantially. NIAAA notes that an empty stomach increases the rate of absorption and leads to a higher blood alcohol level compared with drinking on a full stomach.

---

### Does Eating Food Lower BAC?

Food can affect alcohol absorption. NIAAA explains that drinking on an empty stomach increases the rate of absorption and produces a higher blood alcohol level than drinking on a full stomach.

Food influences how quickly alcohol enters the bloodstream and the resulting peak concentration by delaying gastric emptying and increasing first-pass gastric metabolism. It does not mean that eating turns alcohol into harmless material or instantly removes alcohol from the body.

The calculator models stomach state as an assumption:
- **Empty stomach**: rapid absorption (peak ~20 min), factor 1.00
- **Light meal**: normal absorption baseline (peak ~30 min), factor 1.00
- **Full meal**: delayed absorption (peak ~60 min), factor 0.85

The implementation separates the total ingested alcohol amount from the stomach-state timing assumptions and caps modeled bioavailability at 100%.

---

### How Fast Does the Body Eliminate Alcohol?

The calculator uses a default elimination coefficient of:

$$\\beta = 0.015\\%\\text{ BAC per hour} = 0.15\\text{ g/L per hour}$$

The important word is **model**. Individual alcohol elimination varies. NIAAA explains that metabolism is steady within an individual under ordinary circumstances but varies substantially between people because of factors including body mass, liver-related characteristics, genetics, and other influences.

The calculator therefore should not be interpreted as saying that your personal body always clears alcohol at exactly 0.015% BAC per hour.

---

### Can Coffee, Cold Showers or Exercise Make Alcohol Leave Your Body Faster?

No reliable method should be used as a shortcut to “sober up.”

NIAAA explicitly notes that alcohol metabolism proceeds at a steady rate and is not accelerated by caffeine or similar attempts to sober up. Coffee may make a person feel more alert, but feeling more alert is not equivalent to clearing alcohol faster. A person can feel less sleepy while alcohol remains fully active in the bloodstream.

---

### Why the Calculator Uses a Modeled BAC Curve

A BAC curve makes the time dimension easier to understand. Instead of seeing one isolated number, you can see how the model projects concentration into the future:
- **Now (+0 hr)**: 0.025%
- **+1 hr**: 0.010%
- **+2 hr**: 0.000% modeled BAC

The implementation explicitly anchors the projection at the current modeled BAC, rather than incorrectly labeling the historical peak as the present.

---

### What Does "Time Until 0.00% Modeled BAC" Mean?

If the calculator reports **1.7 hours until 0.00% modeled BAC**, it means that the mathematical elimination model reaches zero after approximately 1.7 hours under its chosen assumptions:

$$\\text{Time} = \\frac{0.025\\%}{0.015\\%/\\text{hr}} \\approx 1.67\\text{ hours} \\approx 1.7\\text{ hrs}$$

It does **not** mean:
- Guaranteed physiological sobriety
- Guaranteed absence of cognitive or motor impairment
- Guaranteed legal permission to drive
- Proof that alcohol has completely disappeared from every tissue

The application deliberately labels this as modeled BAC, not “complete sobriety.”

---

### Why a BAC Calculator Cannot Tell You Whether It Is Safe to Drive

This is the most important limitation of any online BAC calculator. A model does not know your exact:
- Blood alcohol concentration
- Absorption curve and gastric transit
- Metabolism rate and enzyme activity
- Medication interactions
- Health status and fatigue
- Individual physiology and tolerance
- Functional impairment level

More importantly, driving laws and enforcement rules vary. The National Highway Traffic Safety Administration (NHTSA) states that even a small amount of alcohol can affect driving ability and that impairment can occur below 0.08 g/dL.

> **Critical Driving Notice:** A calculator result below a reference threshold is not a declaration that driving is safe or legal. The safest choice after drinking is not to drive.

---

### Is 0.08% BAC Always the Legal Limit?

No. In the United States, NHTSA states that a BAC of 0.08 g/dL is the general illegal-per-se threshold in all states, the District of Columbia, and Puerto Rico, with Utah using 0.05.

There are also lower limits or zero-tolerance rules for particular driver categories:
- **Under-21 drivers**: Subject to zero-tolerance laws in every state at levels of 0.00% to 0.02%.
- **Commercial drivers**: Federal regulations establish a 0.04% limit.
- **International jurisdictions**: Limits are commonly 0.05% (EU, Australia, Scotland) or 0.02% (Norway, Sweden, Poland).

This calculator uses 0.08% as an illustrative reference threshold, not as a universal legal permission line.

---

### Comparing Widmark, Seidl and Watson BAC Models

This calculator does not rely on one mathematical approach. It includes:
1. **Widmark Standard**: Uses alcohol dose, body weight, and fixed sex distribution factors ($r = 0.68$ / $0.55$).
2. **Seidl Formula**: Uses an anthropometric distribution factor influenced by body weight and height.
3. **Watson Total Body Water**: Uses age, height, and weight to estimate total body water before deriving a distribution factor.

For the benchmark conditions (165 lb male, 2 standard beers, 2 hrs elapsed), the calculator reports:
- **Widmark Standard**: 0.025% Current BAC
- **Seidl Formula**: 0.018% Current BAC
- **Watson TBW**: 0.021% Current BAC

These are different model outputs based on different mathematical assumptions, not three different measurements of an individual's actual biological blood.

---

### Alcohol Calories

Pure ethanol provides approximately **7 kcal per gram**:

$$\\text{Alcohol calories} = \\text{Pure ethanol grams} \\times 7$$

For the benchmark:
$$28.013\\text{ g ethanol} \\times 7\\text{ kcal/g} \\approx 196\\text{ kcal}$$

This represents energy from ethanol itself and does not include carbohydrates, sugars, or mixers present in the beverage. If you are tracking energy expenditure alongside diet, tools like a [Calories Burned Calculator](/calculators/calories-burned-calculator) examine metabolic calorie expenditure.

---

### What Happens With Zero Drinks?

A well-designed BAC calculator must handle zero alcohol correctly. If the drink list is empty, the calculator returns:
- **0.000% modeled BAC**
- **0 g pure alcohol**
- **0 modeled time to zero**

The elimination curve remains strictly at zero. An empty drink list never silently defaults to an alcoholic session.

---

### What Should You Do If Someone Has Drunk Too Much?

A calculator is not an alcohol-poisoning diagnostic tool.

If someone is difficult to wake, unconscious, having a seizure, having trouble breathing, repeatedly vomiting, or showing other signs of a possible alcohol overdose, seek emergency medical help immediately.

NIAAA advises calling 911 when alcohol overdose is suspected and emphasizes that a person who has passed out can die. Do not attempt to use coffee, cold showers, or walking as a substitute for emergency medical care.

---

### Methodology & Sources

- **Standard Drink**: The calculator uses 14 g of pure ethanol as the U.S. standard-drink reference (NIAAA standard drink definition: ~14 grams or 0.6 fl oz pure alcohol).
- **Widmark Equation**: Widmark, E. M. P. (1932). *Die theoretischen Grundlagen und die praktische Verwendbarkeit der gerichtlich-medizinischen Alkoholbestimmung*.
- **Seidl Formula**: Seidl, S., Jensen, U., & Alt, A. (1990). *The calculation of blood alcohol concentration in females and males using anthropometric data*.
- **Watson TBW Formula**: Watson, P. E., Watson, I. D., & Batt, R. D. (1980). *Total body water volumes for adult males and females estimated from simple anthropometric measurements*.
- **Metabolic Elimination Rate**: Standard forensic toxicology population median of 0.015% BAC/hour (Jones, A. W., 2010).
- **Public Safety & Driving Guidance**: National Highway Traffic Safety Administration (NHTSA) impaired driving statistics and legal threshold compendium.
`;
