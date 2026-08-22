"use client";

import React from "react";
import Link from "next/link";

export function BmiContent() {
  return (
    <article className="space-y-12 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
      {/* SECTION 1: WHAT IS BODY MASS INDEX (BMI)? */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          1. What Is Body Mass Index (BMI)?
        </h2>
        <p>
          Body Mass Index (BMI) is a standardized anthropometric screening metric used by public health organizations and healthcare professionals to evaluate an individual&apos;s body mass relative to their height. First formulated in the 19th century by Belgian mathematician Lambert Adolphe Jacques Quetelet, BMI provides an accessible, non-invasive method for identifying weight-status categories across broad populations.
        </p>
        <p>
          BMI serves as a screening measure, not a diagnostic tool. In clinical practice, healthcare providers use BMI as an initial assessment framework alongside family medical history, blood pressure, lipid panels, blood glucose levels, dietary patterns, and physical activity evaluations. While BMI correlates moderately with direct measures of body fatness, it does not directly measure body composition or diagnose health conditions on its own.
        </p>
      </section>

      {/* SECTION 2: HOW BMI IS CALCULATED: FORMULAS & DERIVATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2. How BMI Is Calculated: Formulas &amp; Derivations
        </h2>
        <p>
          BMI expresses the mathematical relationship between body weight and stature. Because human body mass scales with height, dividing weight by height squared (m²) normalizes mass across different statures.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-5 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2.5 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Standard Metric Equation</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">The international standard adopted by the CDC and WHO:</p>
            <div className="p-3 bg-white dark:bg-zinc-950 rounded-lg text-center font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold text-sm border border-zinc-200 dark:border-zinc-800">
              BMI = Weight (kg) / [Height (m)]²
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
              <p><strong>Example:</strong> Stature = 1.78 m (178 cm), Weight = 75 kg</p>
              <p className="font-mono">BMI = 75 / (1.78)² = 75 / 3.1684 = 23.67 kg/m²</p>
              <p className="text-emerald-700 dark:text-emerald-400 font-semibold">Classification: Healthy Weight (Display: 23.7)</p>
            </div>
          </div>

          <div className="p-5 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2.5 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">US Customary Equation</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Utilizes pounds and inches with conversion factor 703:</p>
            <div className="p-3 bg-white dark:bg-zinc-950 rounded-lg text-center font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold text-sm border border-zinc-200 dark:border-zinc-800">
              BMI = 703 × Weight (lbs) / [Height (in)]²
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
              <p><strong>Example:</strong> Stature = 5&apos;10&quot; (70 in), Weight = 165 lbs</p>
              <p className="font-mono">BMI = (703 × 165) / (70)² = 115,995 / 4900 = 23.67 kg/m²</p>
              <p className="text-emerald-700 dark:text-emerald-400 font-semibold">Classification: Healthy Weight (Display: 23.7)</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          <em>Note on Numerical Precision:</em> The calculator computes values using full floating-point precision. Category determinations evaluate unrounded raw BMI, while output values are rounded to one decimal place for clean visual display.
        </p>
      </section>

      {/* SECTION 3: ADULT BMI CATEGORIES (CDC STANDARD) */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          3. Adult BMI Categories (CDC Standard)
        </h2>
        <p>
          For adults aged 20 and older, the Centers for Disease Control and Prevention (CDC) utilizes six primary weight-status screening categories. These standardized intervals enable uniform population monitoring:
        </p>

        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-sm my-3">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold text-[11px] border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">CDC Weight Status Category</th>
                <th className="py-3 px-4">Adult BMI Range (kg/m²)</th>
                <th className="py-3 px-4">BMI Prime Range</th>
                <th className="py-3 px-4">Public Health Screening Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-sky-700 dark:text-sky-400">Underweight</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">&lt; 18.5</td>
                <td className="py-3 px-4 font-sans tabular-nums">&lt; 0.74</td>
                <td className="py-3 px-4 text-sky-900 dark:text-sky-300">Screening indicator for potential nutritional or medical assessment.</td>
              </tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-950/20 font-medium">
                <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">Healthy Weight</td>
                <td className="py-3 px-4 font-sans tabular-nums font-bold text-emerald-800 dark:text-emerald-300">18.5 to &lt; 25.0</td>
                <td className="py-3 px-4 font-sans tabular-nums font-bold text-emerald-800 dark:text-emerald-300">0.74 to &lt; 1.00</td>
                <td className="py-3 px-4 text-emerald-800 dark:text-emerald-300">Standard reference baseline for adult weight status.</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-yellow-700 dark:text-yellow-400">Overweight</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">25.0 to &lt; 30.0</td>
                <td className="py-3 px-4 font-sans tabular-nums">1.00 to &lt; 1.20</td>
                <td className="py-3 px-4 text-yellow-800 dark:text-yellow-300">Screening indicator for elevated weight relative to stature.</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-orange-700 dark:text-orange-400">Obesity (Class 1)</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">30.0 to &lt; 35.0</td>
                <td className="py-3 px-4 font-sans tabular-nums">1.20 to &lt; 1.40</td>
                <td className="py-3 px-4 text-orange-800 dark:text-orange-300">Lower-tier obesity classification for health monitoring.</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-rose-700 dark:text-rose-400">Obesity (Class 2)</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">35.0 to &lt; 40.0</td>
                <td className="py-3 px-4 font-sans tabular-nums">1.40 to &lt; 1.60</td>
                <td className="py-3 px-4 text-rose-800 dark:text-rose-300">Mid-tier obesity classification associated with increased risk profile.</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-rose-900 dark:text-rose-300">Obesity (Class 3)</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">&ge; 40.0</td>
                <td className="py-3 px-4 font-sans tabular-nums">&ge; 1.60</td>
                <td className="py-3 px-4 text-rose-900 dark:text-rose-300 font-semibold">Severe obesity classification warranting comprehensive clinical evaluation.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          CDC uses BMI categories as a screening framework for adult weight status. BMI should be considered alongside other health measures and individual clinical factors, rather than as a definitive guarantee of individual health or disease risk.
        </p>
      </section>

      {/* SECTION 4: BMI-FOR-AGE FOR CHILDREN AND TEENS (AGES 2–19) */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          4. BMI-for-Age for Children and Teens (Ages 2–19)
        </h2>
        <p>
          In pediatric medicine, body composition changes dynamically with physical growth, and typical adiposity patterns differ markedly between boys and girls during childhood and puberty. Consequently, raw BMI numbers cannot be evaluated against adult fixed thresholds. Instead, the CDC provides <strong>sex- and age-specific BMI-for-age percentiles</strong> for children and adolescents aged 2 through 19.
        </p>

        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-sm my-3">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold text-[11px] border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">Pediatric Weight Category</th>
                <th className="py-3 px-4">CDC Growth Percentile Range</th>
                <th className="py-3 px-4">Developmental Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              <tr>
                <td className="py-3 px-4 font-semibold text-sky-700 dark:text-sky-400">Underweight</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">&lt; 5th percentile</td>
                <td className="py-3 px-4">Weight trajectory is below expected peer developmental benchmarks.</td>
              </tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-950/20">
                <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">Healthy Weight</td>
                <td className="py-3 px-4 font-sans tabular-nums font-bold text-emerald-800 dark:text-emerald-300">5th to &lt; 85th percentile</td>
                <td className="py-3 px-4">Weight is aligned with typical developmental growth benchmarks.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-yellow-700 dark:text-yellow-400">Overweight</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">85th to &lt; 95th percentile</td>
                <td className="py-3 px-4">Weight is above the median growth trajectory for age and sex.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-rose-700 dark:text-rose-400">Obesity</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">&ge; 95th percentile</td>
                <td className="py-3 px-4">Weight-for-age exceeds standard pediatric growth percentiles.</td>
              </tr>
              <tr className="bg-rose-50/40 dark:bg-rose-950/20">
                <td className="py-3 px-4 font-semibold text-rose-900 dark:text-rose-300">Severe Obesity</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">&ge; 120% of 95th % OR BMI &ge; 35 kg/m²</td>
                <td className="py-3 px-4">Extended CDC growth reference definition for severe pediatric obesity.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Percentiles express where a child&apos;s BMI falls relative to a national reference population of peers of the same age and sex. For example, a 10-year-old boy whose BMI ranks at the 65th percentile has a BMI greater than 65% of 10-year-old boys in the CDC reference dataset.
        </p>
      </section>

      {/* SECTION 5: HEALTHY WEIGHT RANGE FOR STATURE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          5. Healthy Weight Range for Stature
        </h2>
        <p>
          For any adult height, a corresponding healthy weight screening span can be mathematically computed from the CDC Healthy Weight category interval (18.5 to &lt; 25.0 kg/m²):
        </p>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg text-center font-sans tabular-nums text-emerald-700 dark:text-emerald-400 font-bold text-sm max-w-lg mx-auto border border-zinc-200 dark:border-zinc-800">
          Minimum Weight = 18.5 × [Height (m)]² &nbsp;|&nbsp; Maximum Weight = 24.99 × [Height (m)]²
        </div>
        <p>
          For example, an adult with a height of 5 feet 10 inches (1.78 meters) has a derived healthy screening weight span of approximately <strong>129 to 174 pounds</strong> (58.6 to 79.2 kg). You can evaluate detailed stature spans and frame sizes using our dedicated{" "}
          <Link href="/calculators/healthy-weight-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            healthy weight calculator
          </Link>.
        </p>
      </section>

      {/* SECTION 6: ANTHROPOMETRIC NORMALIZATION INDICES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          6. Anthropometric Normalization Indices
        </h2>
        <p>
          To enhance physical assessment across atypical body proportions, researchers have introduced complementary mathematical indices:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">BMI Prime</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              BMI Prime normalizes calculated BMI against the 25.0 kg/m² upper healthy reference point:
            </p>
            <div className="p-2.5 bg-white dark:bg-zinc-950 rounded-lg text-center font-mono font-bold text-sky-700 dark:text-sky-400 text-xs border border-zinc-200 dark:border-zinc-800">
              BMI Prime = BMI / 25.0
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              A value between 0.74 and 0.99 represents a healthy weight ratio, while values &ge; 1.0 indicate excess mass relative to the screening upper limit.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Ponderal Index (Corpulence Index)</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Divides body mass by height cubed ($m^3$) to reflect 3D volumetric scaling:
            </p>
            <div className="p-2.5 bg-white dark:bg-zinc-950 rounded-lg text-center font-mono font-bold text-indigo-700 dark:text-indigo-400 text-xs border border-zinc-200 dark:border-zinc-800">
              Ponderal Index = Weight (kg) / [Height (m)]³
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Because cubic scaling accommodates three-dimensional volume, Ponderal Index behaves differently from standard BMI for individuals at extreme heights (under 5 feet or over 6 feet 2 inches).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: FORMULA-BASED REFERENCE WEIGHT ESTIMATES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          7. Formula-Based Reference Weight Estimates
        </h2>
        <p>
          In clinical pharmacokinetics and medical research, four historical formulas were developed to estimate baseline reference weights for medication dosing in adults:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
          <li><strong>Devine Formula (1974):</strong> Men = 50.0 kg + 2.3 kg per inch over 5 feet; Women = 45.5 kg + 2.3 kg per inch over 5 feet.</li>
          <li><strong>Robinson Formula (1983):</strong> Men = 52.0 kg + 1.9 kg per inch over 5 feet; Women = 49.0 kg + 1.7 kg per inch over 5 feet.</li>
          <li><strong>Miller Formula (1983):</strong> Men = 56.2 kg + 1.41 kg per inch over 5 feet; Women = 53.1 kg + 1.36 kg per inch over 5 feet.</li>
          <li><strong>Hamwi Formula (1964):</strong> Men = 48.0 kg + 2.7 kg per inch over 5 feet; Women = 45.5 kg + 2.2 kg per inch over 5 feet.</li>
        </ul>
        <p>
          These equations represent <em>historical formula-based reference estimates</em> rather than universally ideal or guaranteed healthy weights. To explore individualized calculations across all four formulas, visit our dedicated{" "}
          <Link href="/calculators/ideal-weight-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            ideal body weight calculator
          </Link>.
        </p>
      </section>

      {/* SECTION 8: ESTIMATED BODY FAT %, BMR & ENERGY EXPENDITURE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          8. Estimated Body Fat %, BMR &amp; Energy Expenditure
        </h2>
        <p>
          To provide broader physical context, the calculator integrates secondary physiological estimates:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3 text-xs">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <strong className="text-sky-700 dark:text-sky-400 block font-bold text-sm">Estimated Body Fat %</strong>
            <p className="text-zinc-600 dark:text-zinc-400">
              Derived from the Deurenberg statistical regression equation using BMI, age, and sex. This is a statistical estimate, not a direct measurement.
            </p>
            <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline block pt-1">
              Body fat percentage calculator →
            </Link>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <strong className="text-emerald-700 dark:text-emerald-400 block font-bold text-sm">Basal Metabolic Rate (BMR)</strong>
            <p className="text-zinc-600 dark:text-zinc-400">
              Estimated resting energy expenditure calculated via the Mifflin-St Jeor equation, representing baseline daily calories needed at complete rest.
            </p>
            <Link href="/calculators/bmr-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline block pt-1">
              Basal metabolic rate calculator →
            </Link>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <strong className="text-purple-700 dark:text-purple-400 block font-bold text-sm">TDEE &amp; Calories</strong>
            <p className="text-zinc-600 dark:text-zinc-400">
              Total Daily Energy Expenditure factors physical activity into BMR. For detailed caloric deficit and surplus modeling, use our specialized tools:
            </p>
            <div className="space-y-0.5 pt-1">
              <Link href="/calculators/tdee-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline block">
                TDEE calculator →
              </Link>
              <Link href="/calculators/calorie-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline block">
                Calorie deficit calculator →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: HEALTH CONTEXT & BIOLOGICAL SEX CONSIDERATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          9. Health Context &amp; Biological Sex Considerations
        </h2>
        <p>
          The fundamental mathematical formula for BMI ($kg/m^2$) is identical for men and women. Stature and total weight determine the BMI score regardless of sex.
        </p>
        <p>
          However, biological sex plays a significant role in secondary body composition calculations:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
          <li><strong>Essential Fat Requirements:</strong> Women naturally require a higher proportion of essential fat (approximately 10%–13%) for endocrine and reproductive health compared to men (2%–5%).</li>
          <li><strong>Adipose Distribution:</strong> Men more frequently store excess adipose tissue in visceral abdominal compartments (android pattern), while women more frequently store subcutaneous fat in the hips and thighs (gynoid pattern).</li>
          <li><strong>Secondary Metric Inputs:</strong> Biological sex is utilized in this calculator to compute estimated body fat percentage, BMR, pharmacokinetic reference weights, and pediatric growth percentiles.</li>
        </ul>
      </section>

      {/* SECTION 10: BMI LIMITATIONS & POPULATION CONTEXT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          10. BMI Limitations &amp; Population Context
        </h2>
        <p>
          While BMI is an established screening instrument for populations, it has notable limitations when evaluating individuals:
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">A. Muscular Athletes and High Lean Mass</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              BMI does not distinguish lean muscle mass from adipose tissue, so muscular individuals may have elevated BMI without having excess body fat. Active military personnel and strength athletes often benefit from circumference assessments like the{" "}
              <Link href="/calculators/army-body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Army body fat calculator
              </Link>.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">B. Older Adults (Age 65+)</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Research in older adults has found that the relationship between BMI and health outcomes can differ from that seen in younger adults. Moderate weight reserves can offer protection against frailty, sarcopenia, and bone loss during acute illnesses. However, this represents observational epidemiological context and does not create a separate official CDC BMI classification for older adults.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">C. Pregnancy Context</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              BMI can be calculated from height and weight during pregnancy, but standard adult BMI categories are not a stand-alone guide to recommended pregnancy weight gain. Pregnancy care commonly considers prepregnancy BMI together with pregnancy-specific weight-gain guidance established by the American College of Obstetricians and Gynecologists (ACOG) and the Institute of Medicine (IOM).
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">D. Population-Specific and Ethnic Risk Considerations</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Some clinical organizations and research frameworks utilize lower BMI action thresholds (e.g., &ge; 23.0 kg/m² for elevated risk, &ge; 27.5 kg/m² for high risk) in some Asian populations due to observed differences in body fat percentage and visceral fat accumulation at lower BMIs. These research considerations provide clinical context but do not alter the universal mathematical BMI formula.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 11: FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          11. Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          Below are 20 clinical and educational questions regarding BMI calculation, pediatric percentiles, adult reference ranges, and anthropometric methodologies:
        </p>
      </section>
    </article>
  );
}

export default BmiContent;
