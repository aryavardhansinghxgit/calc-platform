"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, Info, Activity, AlertTriangle, ShieldCheck, Heart, Scale } from "lucide-react";

export function BmiContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is Body Mass Index (BMI)?",
      a: "Body Mass Index (BMI) is a standardized screening metric that compares an individual's total body mass against their height. It is calculated by dividing body weight in kilograms by height in meters squared (kg/m²), or in imperial units by multiplying weight in pounds by 703 and dividing by height in inches squared."
    },
    {
      q: "What is a healthy BMI for adults?",
      a: "According to the World Health Organization (WHO) and Centers for Disease Control and Prevention (CDC), a healthy adult BMI ranges from 18.5 to 24.9 kg/m². Within this interval, statistical risks of mortality, metabolic syndrome, and cardiovascular events are at their baseline lowest."
    },
    {
      q: "Is BMI calculated differently for men and women?",
      a: "The standard mathematical formula for BMI is identical for adult men and women. However, biological body fat distribution differs significantly between sexes; adult women naturally possess a higher percentage of essential adipose tissue (20–25%) compared to men (10–15%) at the exact same BMI score."
    },
    {
      q: "How does BMI work for children and teenagers?",
      a: "For children and adolescents aged 2 to 19, raw BMI numbers are translated into gender- and age-specific percentiles using CDC growth curves. A percentile below 5% represents underweight, 5% to 85% is healthy weight, 85% to 95% is at risk of overweight, and above 95% is classified as overweight/obese."
    },
    {
      q: "What is BMI Prime?",
      a: "BMI Prime is a normalized ratio calculated by dividing an individual's measured BMI by the upper threshold of healthy BMI (25.0 kg/m²). A BMI Prime of less than 0.74 represents underweight, 0.74 to 1.0 represents normal weight, 1.0 to 1.2 indicates overweight, and greater than 1.2 denotes obesity."
    },
    {
      q: "What is the Ponderal Index and how is it different from BMI?",
      a: "The Ponderal Index (PI), also known as the Corpulence Index, measures weight relative to height cubed (kg/m³). Because human body volume is three-dimensional, Ponderal Index provides greater anthropometric accuracy for unusually tall or short individuals where standard 2D scaling (height squared) distorts results."
    },
    {
      q: "Why can BMI classify muscular athletes as overweight or obese?",
      a: "BMI cannot distinguish between lean skeletal muscle tissue, bone mass, organ mass, and adipose (fat) tissue. Because dense skeletal muscle weighs significantly more per cubic centimeter than adipose tissue, elite athletes, bodybuilders, and powerlifters often register a high BMI despite having minimal body fat."
    },
    {
      q: "What health risks are associated with a low BMI (Underweight < 18.5)?",
      a: "Being chronically underweight increases susceptibility to nutritional deficiencies, anemia, osteopenia/osteoporosis, depressed cell-mediated immunity, impaired wound healing, hormonal dysregulation, and elevated surgical complication rates."
    },
    {
      q: "What health risks are linked to an elevated BMI (Overweight & Obese)?",
      a: "Elevated BMI (≥ 25.0) strongly correlates with an increased risk of hypertension, dyslipidemia, Type-2 diabetes, coronary artery disease, ischemic stroke, gallbladder disease, osteoarthritis, obstructive sleep apnea, and clinical depression."
    },
    {
      q: "What is the difference between BMI and Body Fat Percentage?",
      a: "BMI measures total body mass relative to height, while Body Fat Percentage measures the exact proportion of total mass comprised of adipose tissue. While BMI is a low-cost population screening tool, DEXA scans or hydrostatic weighing measure true body composition."
    },
    {
      q: "Should seniors aim for a higher BMI range?",
      a: "Yes. Clinical studies in geriatric epidemiology indicate that older adults (age 65+) benefit from a slightly higher optimal BMI range of 23.0 to 29.0 kg/m². This modest reserve helps protect against sarcopenia, fragility fractures, and involuntary weight loss during illness."
    },
    {
      q: "How fast should someone try to lower their BMI?",
      a: "Clinical guidelines recommend a gradual, sustainable weight reduction rate of 1 to 2 pounds (0.5 to 1.0 kg) per week. This rate corresponds to a daily net caloric deficit of 500 to 1,000 kcal and minimizes muscle tissue catabolism."
    },
    {
      q: "What is Waist-to-Height Ratio (WHtR) and why use it with BMI?",
      a: "Waist-to-Height Ratio evaluates abdominal adiposity by dividing waist circumference by height. Keeping your waist measurement under half your height (ratio < 0.50) serves as an excellent adjunct to BMI for assessing visceral fat risk."
    },
    {
      q: "What are the four ideal body weight formulas?",
      a: "The four classic clinical formulas—Devine (1974), Robinson (1983), Miller (1983), and Hamwi (1964)—estimate ideal weight based on height over 5 feet. Our calculator computes all four and provides their combined average."
    },
    {
      q: "What is the Deurenberg formula for body fat estimation?",
      a: "The Deurenberg equation estimates body fat percentage from BMI, age, and gender: BFP = 1.20 × BMI + 0.23 × Age - 10.8 × Gender - 5.4 (with Gender = 1 for male, 0 for female)."
    },
    {
      q: "Does BMI change based on ethnic background?",
      a: "Yes. The World Health Organization recognizes modified BMI cutoffs for South Asian, East Asian, and Pacific Islander populations, where visceral fat accumulation occurs at lower overall BMIs. For these populations, overweight begins at 23.0 and obesity at 27.5."
    },
    {
      q: "What is Basal Metabolic Rate (BMR)?",
      a: "BMR represents the baseline number of calories your body burns at complete physical rest to maintain essential physiological processes like respiration, cardiac activity, and cellular repair."
    },
    {
      q: "How does TDEE relate to BMI weight management?",
      a: "Total Daily Energy Expenditure (TDEE) accounts for your BMR plus physical activity. Consuming fewer calories than your TDEE creates a energy deficit, reducing weight and lowering your BMI."
    },
    {
      q: "Can pregnant women use standard BMI calculators?",
      a: "No. Standard BMI charts do not apply during pregnancy due to rapid fetal growth, amniotic fluid accumulation, and expanded plasma volume. Specialized gestational weight gain charts should be consulted instead."
    },
    {
      q: "How often should I check my BMI?",
      a: "Checking your BMI every 2 to 4 weeks provides meaningful feedback on long-term weight trends without causing undue distraction from daily fluid and glycogen fluctuations."
    }
  ];

  return (
    <article className="mt-10 space-y-12 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base border-t border-zinc-200 dark:border-zinc-800 pt-10">
      {/* 1. What Is BMI & Overview */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <BookOpen className="w-6 h-6" />
          <h2>1. What Is Body Mass Index (BMI)?</h2>
        </div>
        <p className="text-zinc-700 dark:text-zinc-300">
          Body Mass Index (BMI) is a universally recognized epidemiological and clinical screening metric used to classify an individual&apos;s body weight relative to their height. Developed in the 19th century by Belgian mathematician Lambert Adolphe Jacques Quetelet, BMI provides a straightforward, non-invasive method to evaluate whether a person has an optimal weight, is underweight, overweight, or obese.
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          In clinical medicine, public health policy, and exercise physiology, BMI serves as a primary surrogate indicator of total body fatness. Because body mass scales proportionally with height, expressing weight relative to height squared (kg/m²) normalizes measurements across human statures.
        </p>
      </section>

      {/* 2. History of BMI */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-lg sm:text-xl">
          <Info className="w-6 h-6" />
          <h2>2. History &amp; Evolution of BMI</h2>
        </div>
        <p>
          Between 1830 and 1850, Adolphe Quetelet introduced the concept of &quot;social physics&quot; and formulated what was originally termed the <strong>Quetelet Index of Corpulence</strong>. Quetelet observed that, outside of early childhood growth spikes, total body mass increases proportionally to the square of human height.
        </p>
        <p>
          In July 1972, key physiology researcher Ancel Keys published a seminal comparative study in the <em>Journal of Chronic Diseases</em> evaluating corpulence indices. Keys confirmed that Quetelet&apos;s height-squared formula was the best proxy for body fat percentage among competing measures. Keys formally renamed the metric the <strong>Body Mass Index</strong>, and it was subsequently adopted by the World Health Organization (WHO) and National Institutes of Health (NIH) as the international gold standard for mass screening.
        </p>
      </section>

      {/* 3 & 4. How BMI Is Calculated & Formulas */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-lg sm:text-xl">
          <Scale className="w-6 h-6" />
          <h2>3 &amp; 4. How BMI Is Calculated: Formulas &amp; Derivations</h2>
        </div>
        <p>
          The mathematical calculation of BMI relies on two primary unit systems: the International System of Units (SI Metric) and the United States Customary System (US Imperial).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-5 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-base">SI Metric Formula</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Used internationally in medical and clinical settings:</p>
            <div className="p-3 bg-white dark:bg-zinc-950 rounded-lg text-center font-sans tabular-nums text-emerald-700 dark:text-emerald-300 font-bold text-sm border border-zinc-200 dark:border-zinc-800">
              BMI = Weight (kg) / [Height (m)]²
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Example: Weight = 70 kg, Height = 1.75 m</p>
            <p className="text-xs font-sans tabular-nums text-zinc-800 dark:text-zinc-200">BMI = 70 / (1.75)² = 70 / 3.0625 = 22.86 kg/m²</p>
          </div>

          <div className="p-5 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-blue-700 dark:text-sky-400 text-base">US Imperial Formula</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Used primarily in the United States and territories:</p>
            <div className="p-3 bg-white dark:bg-zinc-950 rounded-lg text-center font-sans tabular-nums text-blue-700 dark:text-sky-300 font-bold text-sm border border-zinc-200 dark:border-zinc-800">
              BMI = 703 × Weight (lbs) / [Height (inches)]²
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Example: Weight = 160 lbs, Height = 5&apos;10&quot; (70 in)</p>
            <p className="text-xs font-sans tabular-nums text-zinc-800 dark:text-zinc-200">BMI = 703 × 160 / (70)² = 703 × 160 / 4900 = 22.95 kg/m²</p>
          </div>
        </div>
      </section>

      {/* 5. BMI Categories & WHO Table */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-lg sm:text-xl">
          <Activity className="w-6 h-6" />
          <h2>5. Adult BMI Classification Table (WHO Standards)</h2>
        </div>
        <p>
          The World Health Organization categorizes adult body weight into eight discrete sub-categories. This classification applies universally to adult men and women aged 20 and older.
        </p>

        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold text-[11px] border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">Classification Category</th>
                <th className="py-3 px-4">BMI Range (kg/m²)</th>
                <th className="py-3 px-4">BMI Prime Range</th>
                <th className="py-3 px-4">Health Risk Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-sky-700 dark:text-blue-400">Severe Thinness</td>
                <td className="py-3 px-4 font-sans tabular-nums">&lt; 16.0</td>
                <td className="py-3 px-4 font-sans tabular-nums">&lt; 0.64</td>
                <td className="py-3 px-4 text-sky-800 dark:text-blue-300">Extremely High (Underweight Risk)</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-cyan-700 dark:text-cyan-400">Moderate Thinness</td>
                <td className="py-3 px-4 font-sans tabular-nums">16.0 – 16.9</td>
                <td className="py-3 px-4 font-sans tabular-nums">0.64 – 0.68</td>
                <td className="py-3 px-4 text-cyan-800 dark:text-cyan-300">High Risk (Nutritional Deficits)</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-sky-600 dark:text-sky-400">Mild Thinness</td>
                <td className="py-3 px-4 font-sans tabular-nums">17.0 – 18.4</td>
                <td className="py-3 px-4 font-sans tabular-nums">0.68 – 0.74</td>
                <td className="py-3 px-4 text-sky-700 dark:text-sky-300">Moderate Risk</td>
              </tr>
              <tr className="bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 font-medium">
                <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">Normal Weight</td>
                <td className="py-3 px-4 font-sans tabular-nums font-bold text-emerald-800 dark:text-emerald-300">18.5 – 24.9</td>
                <td className="py-3 px-4 font-sans tabular-nums font-bold text-emerald-800 dark:text-emerald-300">0.74 – 1.00</td>
                <td className="py-3 px-4 text-emerald-800 dark:text-emerald-400 font-bold">Lowest Health Risk (Baseline)</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-yellow-700 dark:text-yellow-400">Overweight</td>
                <td className="py-3 px-4 font-sans tabular-nums">25.0 – 29.9</td>
                <td className="py-3 px-4 font-sans tabular-nums">1.00 – 1.20</td>
                <td className="py-3 px-4 text-yellow-800 dark:text-yellow-300">Increased Risk</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-orange-700 dark:text-orange-400">Obese Class I</td>
                <td className="py-3 px-4 font-sans tabular-nums">30.0 – 34.9</td>
                <td className="py-3 px-4 font-sans tabular-nums">1.20 – 1.40</td>
                <td className="py-3 px-4 text-orange-800 dark:text-orange-300">High Risk (Metabolic Strain)</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-rose-700 dark:text-rose-400">Obese Class II</td>
                <td className="py-3 px-4 font-sans tabular-nums">35.0 – 39.9</td>
                <td className="py-3 px-4 font-sans tabular-nums">1.40 – 1.60</td>
                <td className="py-3 px-4 text-rose-800 dark:text-rose-300">Very High Risk</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-rose-800 dark:text-rose-300">Obese Class III</td>
                <td className="py-3 px-4 font-sans tabular-nums">&ge; 40.0</td>
                <td className="py-3 px-4 font-sans tabular-nums">&gt; 1.60</td>
                <td className="py-3 px-4 text-rose-900 dark:text-rose-400 font-bold">Extremely High Risk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6, 7, 8. BMI for Men, Women, Healthy Range */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-sky-400 font-bold text-lg sm:text-xl">
          <Heart className="w-6 h-6" />
          <h2>6, 7 &amp; 8. BMI Nuances for Men vs Women</h2>
        </div>
        <p>
          While standard BMI equations use identical mathematical cutoffs regardless of sex, sexual dimorphism plays a substantial role in body fat distribution and physiological risk:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>
            <strong>Essential Fat Content:</strong> Women naturally possess an essential fat mass of approximately 10%–13% required for reproductive function, endocrine regulation, and mammary tissue, whereas men possess 2%–5% essential fat.
          </li>
          <li>
            <strong>Fat Distribution Patterns:</strong> Men tend to deposit excess adipose tissue viscerally (android/apple distribution around abdominal organs), which carries higher cardiovascular risk. Women more frequently store subcutaneous fat gynoidally (hips and thighs).
          </li>
          <li>
            <strong>Lean Mass Scaling:</strong> Men generally have higher musculoskeletal density, meaning a man and a woman with identical height, weight, and BMI of 24.5 will typically differ in body fat percentage by 8% to 12%.
          </li>
        </ul>
      </section>

      {/* 9 & 10. Children & Teen BMI */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-lg sm:text-xl">
          <ShieldCheck className="w-6 h-6" />
          <h2>9 &amp; 10. Children &amp; Teen BMI Percentiles (CDC Growth Charts)</h2>
        </div>
        <p>
          In pediatric medicine, body mass changes rapidly with age and differs significantly between boys and girls during growth spurts. Consequently, raw BMI numbers cannot be evaluated against adult fixed thresholds. Instead, the CDC provides <strong>BMI-for-Age Growth Percentiles</strong> for children aged 2 through 19.
        </p>

        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-sm my-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold text-[11px] border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">Pediatric Category</th>
                <th className="py-3 px-4">CDC Percentile Range</th>
                <th className="py-3 px-4">Clinical Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              <tr>
                <td className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">Underweight</td>
                <td className="py-3 px-4 font-sans tabular-nums">&lt; 5th percentile</td>
                <td className="py-3 px-4">Evaluate for nutrient absorption or inadequate caloric intake.</td>
              </tr>
              <tr className="bg-emerald-50 dark:bg-emerald-950/20">
                <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">Healthy Weight</td>
                <td className="py-3 px-4 font-sans tabular-nums font-bold text-emerald-800 dark:text-emerald-300">5th to 85th percentile</td>
                <td className="py-3 px-4">Optimal pediatric development trajectory.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-yellow-700 dark:text-yellow-400">At Risk of Overweight</td>
                <td className="py-3 px-4 font-sans tabular-nums">85th to 95th percentile</td>
                <td className="py-3 px-4">Promote active play and balanced whole food dietary patterns.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-rose-700 dark:text-rose-400">Overweight / Obese</td>
                <td className="py-3 px-4 font-sans tabular-nums">&gt; 95th percentile</td>
                <td className="py-3 px-4">Comprehensive clinical lifestyle and metabolic evaluation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 11, 12, 13. Seniors, BMI Prime, Ponderal Index */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-lg sm:text-xl">
          <Activity className="w-6 h-6" />
          <h2>11, 12 &amp; 13. BMI for Seniors, BMI Prime &amp; Ponderal Index</h2>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-200 text-base">Optimal BMI Range for Seniors (Age 65+)</h3>
          <p>
            Epidemiological research reveals a phenomenon known as the <em>obesity paradox</em> in elderly cohorts. For adults aged 65 and older, a slightly higher BMI of <strong>23.0 to 29.0 kg/m²</strong> is associated with lower overall mortality rates. This moderate metabolic cushion protects against sarcopenia (age-related muscle loss), osteoporosis, and involuntary weight decline during acute medical events.
          </p>

          <h3 className="font-bold text-zinc-900 dark:text-zinc-200 text-base">BMI Prime Explained</h3>
          <p>
            BMI Prime normalizes an individual&apos;s calculated BMI against the upper WHO healthy limit of 25.0 kg/m²:
          </p>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg text-center font-sans tabular-nums text-purple-700 dark:text-purple-300 font-bold text-sm max-w-md mx-auto border border-zinc-200 dark:border-zinc-800">
            BMI Prime = BMI / 25
          </div>
          <p>
            A BMI Prime of 1.0 represents the exact upper boundary of normal weight. Values below 0.74 indicate underweight, while values above 1.0 indicate excess mass.
          </p>

          <h3 className="font-bold text-zinc-900 dark:text-zinc-200 text-base">Ponderal Index (Corpulence Index) Explained</h3>
          <p>
            While BMI divides weight by height squared (m²), the Ponderal Index (PI) divides weight by height cubed (m³):
          </p>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg text-center font-sans tabular-nums text-indigo-700 dark:text-indigo-300 font-bold text-sm max-w-md mx-auto border border-zinc-200 dark:border-zinc-800">
            Ponderal Index = Weight (kg) / [Height (m)]³
          </div>
          <p>
            Because human volume expands in three dimensions, Ponderal Index provides greater accuracy for individuals at extreme heights (under 5 feet or over 6 feet 2 inches). Normal adult PI ranges from <strong>11 to 14 kg/m³</strong>.
          </p>
        </div>
      </section>

      {/* 15, 16, 17. Health Risks */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-lg sm:text-xl">
          <AlertTriangle className="w-6 h-6" />
          <h2>15, 16 &amp; 17. Comprehensive Health Risk Assessments</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-base">Risks of Low BMI (&lt; 18.5)</h3>
            <ul className="list-disc list-inside text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5">
              <li>Micronutrient deficiencies and anemia</li>
              <li>Compromised immune response &amp; infection risk</li>
              <li>Bone density loss (osteopenia and osteoporosis)</li>
              <li>Hormonal imbalances and reproductive dysfunction</li>
              <li>Muscle wasting and post-surgical complications</li>
            </ul>
          </div>

          <div className="p-5 bg-white dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
            <h3 className="font-bold text-rose-700 dark:text-rose-400 text-base">Risks of High BMI (&ge; 25.0)</h3>
            <ul className="list-disc list-inside text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5">
              <li>Hypertension and endothelial vascular stiffness</li>
              <li>Type-2 Diabetes &amp; systemic insulin resistance</li>
              <li>Coronary artery disease and myocardial infarction</li>
              <li>Obstructive sleep apnea and pulmonary restriction</li>
              <li>Osteoarthritis and degenerative joint stress</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 18 to 22. Limitations & Alternatives */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-lg sm:text-xl">
          <Info className="w-6 h-6" />
          <h2>18 – 22. BMI Limitations &amp; Alternative Assessments</h2>
        </div>
        <p>
          Although BMI is an invaluable population screening metric, it possesses distinct limitations when evaluating individual body composition:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <strong className="text-amber-700 dark:text-amber-400 block mb-1">Body Composition</strong>
            Cannot distinguish lean muscle mass from subcutaneous or visceral fat.
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <strong className="text-blue-700 dark:text-sky-400 block mb-1">Waist-to-Height Ratio</strong>
            Visceral abdominal fat (waist circumference) is a stronger predictor of metabolic disease.
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">Athletic Overestimation</strong>
            Bodybuilders and athletes often register as &quot;Obese&quot; due to high skeletal muscle density.
          </div>
        </div>
      </section>

      {/* 23. FAQ Accordion */}
      <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg sm:text-xl">
          <BookOpen className="w-6 h-6 text-blue-600 dark:text-sky-400" />
          <h2>23. Frequently Asked Questions (20 Clinical Q&amp;As)</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-colors shadow-sm"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full py-3.5 px-4 text-left flex items-center justify-between font-semibold text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-sky-400 text-sm sm:text-base focus:outline-none"
              >
                <span>{faq.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
