export const calories_burned_calculatorContent = {
  title: "Calories Burned Calculator",
  formula: "kcal/min = (MET × 3.5 × Weight in kg) / 200; Total Calories = kcal/min × Duration (minutes)",
  description: "Estimate calories burned from physical activities using activity MET values, body weight, and duration or distance.",
  article: `
### Overview of Calories Burned Calculator
Estimate calories burned during physical activities such as walking, running, cycling, swimming, and strength training using standardized MET values from the 2024 Compendium of Physical Activities.

### Formula and Calculation Method
The calculation implements the standard physiological Compendium MET energy expenditure equation:
**kcal/min = (MET × 3.5 × Weight in kg) / 200**
**Total Calories = kcal/min × Duration (minutes)**

Where:
- **MET (Metabolic Equivalent of Task):** Dimensionless ratio of the work metabolic rate to a standard resting metabolic rate.
- **3.5 mL O₂/kg/min:** The standardized oxygen cost of 1 MET at rest.
- **Denominator (200):** Bioenergetic conversion factor derived from oxygen caloric equivalence (5 kcal per liter of O₂; 5 / 1000 = 1 / 200).

Burn rate and hourly rate are derived directly from the unrounded raw energy calculation to prevent cascading rounding errors:
**Burn Rate (kcal/min) = (MET × 3.5 × Weight in kg) / 200**
**Hourly Rate (kcal/hour) = Burn Rate × 60**

### Distance Mode Mechanics
When calculating by distance, workout duration is computed from velocity:
**Duration (minutes) = [ Distance / Speed ] × 60**
The activity's MET value is mapped to documented Compendium speed categories before applying the core expenditure formula.

### How to Interpret Your Results
The calculated energy expenditure provides a population-level metabolic estimate based on standardized laboratory calorimetry. It does not directly measure an individual's metabolic rate, heart rate, or guarantee exact fat loss. Actual energy burned varies with individual body composition, movement economy, and environmental conditions.
  `,
  references: [
    "Ainsworth BE, et al. 2024 Compendium of Physical Activities: An update of activity codes and MET intensities. Med Sci Sports Exerc.",
    "U.S. Centers for Disease Control and Prevention (CDC) - General Physical Activities Defined by Level of Intensity."
  ]
};
