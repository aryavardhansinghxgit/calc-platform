"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, ExternalLink, Info } from "lucide-react";
import { height_calculatorFaqs } from "@/app/calculators/height-calculator/faq";

export function HeightContent() {
  // All 15 FAQs open by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 15 }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-xs sm:text-sm space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* ─── 1. ABOVE-CONTENT RELATED CALCULATORS ─── */}
      <nav aria-label="Related Calculators" className="pb-2">
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
            RELATED CALCULATORS:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <Link
              href="/calculators/conversion-calculator"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Conversion Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link
              href="/calculators/weight-calculator"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Weight Calculator
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── 2. MEDICAL & EDUCATIONAL DISCLAIMER ─── */}
      <div className="pt-4">
        <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
          <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            Pediatric Growth &amp; Medical Disclaimer
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            This calculator provides educational, model-based estimates and is <strong>not a medical diagnosis</strong> or a substitute for evaluation by a pediatrician or other qualified healthcare professional. Actual adult stature is modulated by complex endocrine, nutritional, genetic, and epiphyseal maturation dynamics.
          </p>
        </div>
      </div>

      {/* ─── 3. CORE EDUCATIONAL ARTICLE (SECTIONS 1–30) ─── */}
      <div className="pt-6 space-y-8">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Height Calculator: Adult Height Prediction, Stature &amp; Height Conversion
          </h2>
          <p>
            The Height Calculator is a multi-method stature tool for estimating adult height, comparing child and parent heights, and converting measurements between feet, inches, centimeters, and millimeters.
          </p>
          <p>The calculator combines four practical functions:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Khamis-Roche child adult height prediction</li>
            <li>Tanner mid-parental target height</li>
            <li>Toddler doubling estimate</li>
            <li>Height and stature unit conversion</li>
          </ul>
          <p>
            The first prediction method uses a model based on a child&apos;s age, current height, weight, sex, and parents&apos; heights. The second uses the parents&apos; heights to estimate a genetic target stature. The toddler method provides a simple age-specific heuristic estimate. The converter handles common imperial and metric height formats.
          </p>
          <p>
            These methods do not produce a guaranteed future height. Adult stature is influenced by genetics, growth pattern, pubertal timing, health, nutrition, and other biological factors. Different prediction methods can therefore produce different estimates for the same child.
          </p>
          <p>
            For children whose growth is being medically evaluated, a pediatric growth history and appropriate growth chart interpretation are more informative than treating one predicted number as a certainty.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. What Does a Height Calculator Actually Calculate?
          </h2>
          <p>&ldquo;Height calculator&rdquo; can mean several different things.</p>
          <p>Some calculators only convert units:</p>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 font-mono text-xs">
            5 ft 9 in &rarr; 175.26 cm
          </div>
          <p>Others estimate adult height from parental stature:</p>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 font-mono text-xs">
            [ Mother&apos;s height + Father&apos;s height &plusmn; sex-specific adjustment ] &divide; 2
          </div>
          <p>More detailed prediction methods can also use:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>chronological age</li>
            <li>current height</li>
            <li>body weight</li>
            <li>sex</li>
            <li>parental height</li>
          </ul>
          <p>
            This calculator brings those different use cases together instead of treating them as the same mathematical problem. A unit conversion is exact once the input is known. An adult-height prediction is different: it is an estimate generated by a statistical model or heuristic rule and therefore contains uncertainty.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How Adult Height Is Determined
          </h2>
          <p>
            Adult height, or stature, is influenced strongly by genetic factors, but genes are not the only influence on growth.
          </p>
          <p>A child&apos;s observed height develops through the interaction of:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>inherited stature</li>
            <li>growth pattern</li>
            <li>nutritional status</li>
            <li>general health</li>
            <li>endocrine function</li>
            <li>pubertal development</li>
            <li>chronic illness where present</li>
            <li>other biological and environmental factors</li>
          </ul>
          <p>
            This is why two children with similar parental heights can still finish at different adult heights. A height prediction calculator can estimate a likely range or target based on measurable inputs, but it cannot determine with certainty exactly how tall a child will be.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Khamis-Roche Adult Height Prediction
          </h2>
          <p>
            The Khamis-Roche method is a published statistical approach for predicting adult stature without requiring skeletal age.
          </p>
          <p>
            The original study was published by Harry Khamis and Alex Roche in <em>Pediatrics</em> in 1994. It was developed using longitudinal data from the Fels Longitudinal Study and used childhood stature, weight, age, sex, and mid-parental stature as predictors.
          </p>
          <p>
            The method is useful because it estimates adult stature without requiring a bone-age X-ray. However, its original study population was specific (predominantly healthy Caucasian children in the United States), and the authors noted limitations to applicability. Therefore, the result should be interpreted as a model-based estimate rather than a universal prediction that applies equally to every population.
          </p>
          <p>
            This calculator restricts the Khamis-Roche calculation to its implemented age range (4.0 to 17.0 years) rather than silently extrapolating beyond the model&apos;s supported domain.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. What Inputs Does the Khamis-Roche Method Use?
          </h2>
          <p>The calculator&apos;s Khamis-Roche module uses:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>child&apos;s sex</li>
            <li>chronological age</li>
            <li>current height</li>
            <li>current weight</li>
            <li>mother&apos;s height</li>
            <li>father&apos;s height</li>
          </ul>
          <p>
            The implementation internally normalizes the measurements before applying the model. For example, if a child is entered as 5.2 years old, 40 lb, 3 ft 8 in, mother: 5 ft 5 in, and father: 5 ft 10 in, the calculator converts the measurements into a consistent internal representation before generating the adult-height estimate. The resulting prediction is then displayed in both customary and metric units.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Khamis-Roche Example
          </h2>
          <p>Consider a child entered with:</p>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1 font-mono text-xs">
            <p>Age: 5.2 years</p>
            <p>Weight: 40 lb</p>
            <p>Current height: 3 ft 8 in</p>
            <p>Mother: 5 ft 5 in</p>
            <p>Father: 5 ft 10 in</p>
          </div>
          <p>The calculator&apos;s model-based output for this example is approximately:</p>
          <div className="p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 text-xs">
            <p className="font-bold text-blue-900 dark:text-blue-200">
              Predicted adult height: 5 ft 7.4 in (&asymp;171.3 cm)
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">
              90% Prediction Interval: 5 ft 5.0 in to 5 ft 9.8 in (165.2 – 177.4 cm)
            </p>
          </div>
          <p>
            The result is an estimate, not a guaranteed adult height. The calculator also presents a prediction interval based on the implemented model uncertainty. This is useful because displaying only one number can create a false impression of precision.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Why an Adult Height Prediction Has Uncertainty
          </h2>
          <p>
            A prediction model estimates what is statistically expected from a set of inputs. It does not know future:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>pubertal timing</li>
            <li>illness</li>
            <li>nutritional changes</li>
            <li>endocrine changes</li>
            <li>treatment</li>
            <li>growth velocity</li>
            <li>genetic variation not captured by the model</li>
          </ul>
          <p>
            For that reason, predicted adult height should be interpreted as an estimate with uncertainty. Two different validated or commonly used prediction methods can also produce different answers. Research comparing adult-height prediction algorithms has found meaningful disagreement between methods, showing why a single prediction should not be treated as a definitive clinical measurement.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. What Is Mid-Parental Height?
          </h2>
          <p>
            Mid-parental height, also called target height, is a simple way of estimating a child&apos;s expected adult stature from the heights of the parents.
          </p>
          <p>A commonly used clinical formulation is:</p>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono text-xs">
            <p><strong>For a boy:</strong> Target Height = (Mother&apos;s Height + Father&apos;s Height + 13 cm) / 2</p>
            <p><strong>For a girl:</strong> Target Height = (Mother&apos;s Height + Father&apos;s Height &minus; 13 cm) / 2</p>
          </div>
          <p>
            Equivalent versions can be written using inches (adjusting by &plusmn;5 inches). These are established clinical estimation formulas used when considering a child&apos;s genetic height potential. The result represents a target or central estimate, not a promise of final adult height.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Mid-Parental Height Example
          </h2>
          <p>Suppose:</p>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 font-mono text-xs">
            Mother: 5 ft 2 in (62 in)<br />
            Father: 5 ft 10 in (70 in)
          </div>
          <p>For a boy, converting first into inches:</p>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 font-mono text-xs">
            Target = (62 + 70 + 5) / 2 = 137 / 2 = 68.5 in &approx; 5 ft 8.5 in (174.2 cm)
          </div>
          <p>
            The calculator&apos;s displayed value is rounded according to its configured presentation rules. For a girl, the sex-specific adjustment changes the target in the opposite direction.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Target Height Is Not the Same as Predicted Adult Height
          </h2>
          <p>
            These two concepts are related but not interchangeable. Mid-parental height primarily uses parental stature. A more detailed prediction model can additionally use the child&apos;s current height, age, weight, sex, and parental stature.
          </p>
          <p>
            Therefore, the two methods can produce different estimates. That difference does not automatically mean one calculation is &ldquo;wrong.&rdquo; They are answering related questions using different information and different assumptions.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. What Is the Toddler Doubling Method?
          </h2>
          <p>
            The toddler doubling method is a simple heuristic that estimates adult stature from height measured at a young age. The calculator provides sex-specific toddler settings, including the commonly used doubling ages represented in the interface (24 months for boys and 18 months for girls).
          </p>
          <p>For the implemented example with height 2 ft 10 in:</p>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 font-mono text-xs">
            2 ft 10 in &times; 2 = 5 ft 8 in (&asymp;172.8 cm)
          </div>
          <p>
            This method is much simpler than a multi-variable regression model. It should therefore be interpreted as a rough heuristic rather than as an individualized clinical forecast.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Toddler Doubling vs Statistical Prediction
          </h2>
          <p>
            The toddler doubling rule and Khamis-Roche method should not be interpreted as equally precise. The doubling rule uses a simple relationship between early height and estimated adult height. Khamis-Roche uses multiple variables in a statistical prediction model. The Tanner method uses parental stature to estimate a target height.
          </p>
          <p>Because the inputs and assumptions differ, the results may differ. A useful way to interpret the calculator is therefore:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li><strong>Khamis-Roche:</strong> model-based individual estimate</li>
            <li><strong>Mid-parental:</strong> parent-height genetic target estimate</li>
            <li><strong>Toddler doubling:</strong> simple heuristic estimate</li>
            <li><strong>Height converter:</strong> exact unit conversion</li>
          </ul>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Height Percentiles and Growth Charts
          </h2>
          <p>
            A height percentile compares a child&apos;s stature with the stature distribution of a reference population of the same age and sex. For example, a child at the 25th percentile is taller than approximately 25% of children in the reference population and shorter than approximately 75%.
          </p>
          <p>
            Percentile does not mean 25% of adult height has been achieved; it is a position within a reference distribution. CDC growth charts include stature-for-age references for U.S. children and adolescents ages 2 through 20 years. CDC also emphasizes that growth charts are tools that contribute to the overall clinical assessment and should not be used as the sole diagnostic instrument. WHO provides separate child growth standards and references, including height-for-age references for ages 5–19 years.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Why Percentile Is Different From Predicted Height
          </h2>
          <p>
            A percentile answers: <em>&ldquo;Where does this height fall within a reference population?&rdquo;</em> A prediction answers: <em>&ldquo;What adult height does this model estimate from the supplied inputs?&rdquo;</em>
          </p>
          <p>
            These are different questions. For example, a predicted adult height of 171 cm does not by itself tell you whether that is the 20th, 40th, or 70th percentile without a reference population and a defined percentile calculation. For transparency, this calculator&apos;s percentile output should be interpreted according to the specific reference distribution implemented by the tool.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Understanding a Prediction Interval
          </h2>
          <p>
            A prediction interval communicates uncertainty around an estimated future value. Instead of displaying only 171.3 cm, a calculator may also show an interval around the estimate. That makes the uncertainty visible.
          </p>
          <p>
            An interval should not be interpreted as a guarantee that the child will finish inside these exact limits. Its interpretation depends on the underlying statistical model and how the interval was constructed. The calculator therefore presents the interval as an estimate associated with the selected prediction method.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Child Growth and Growth Velocity
          </h2>
          <p>
            Height at one point in time is only part of the growth picture. Growth velocity measures how quickly stature changes over time:
          </p>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 font-mono text-xs">
            Growth velocity = change in height / elapsed time
          </div>
          <p>
            A child who is consistently following a similar percentile trajectory may be growing differently from a child whose percentile is crossing substantially over time, even if their current heights happen to be similar. Clinical growth assessment therefore considers repeated measurements rather than relying on one height reading.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Growth During Childhood and Puberty
          </h2>
          <p>
            Growth does not occur at a constant rate from birth to adulthood. Children generally grow rapidly during infancy and early childhood, experience slower growth during parts of later childhood, and then may experience a pubertal growth spurt.
          </p>
          <p>
            The timing and size of the pubertal growth spurt vary substantially between individuals. This variation is one reason a current height cannot be converted into an exact adult height simply by multiplying it by a fixed number. When growth timing is unusual, clinicians may consider growth velocity, pubertal development, family history, and sometimes bone-age assessment.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. What Can Affect Final Adult Height?
          </h2>
          <p>Important influences can include:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-1">
            <li><strong>Genetics:</strong> Parent and family stature provide a substantial component of expected height.</li>
            <li><strong>Nutrition:</strong> Adequate energy and nutrients support normal growth. When height needs to be considered alongside body mass or material measurements, the <Link href="/calculators/weight-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">Weight Calculator</Link> provides the corresponding mass and weight calculations.</li>
            <li><strong>Hormonal function:</strong> Growth hormone, thyroid function, and sex hormones influence growth and maturation.</li>
            <li><strong>Chronic health conditions:</strong> Some illnesses can affect growth rate or pubertal development.</li>
            <li><strong>Puberty:</strong> The timing of puberty affects both growth velocity and the remaining time available for linear growth.</li>
            <li><strong>Sleep and general health:</strong> Overall health supports normal development, although no single lifestyle factor can guarantee a particular adult height.</li>
          </ul>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Feet and Inches to Centimeters
          </h2>
          <p>
            Height is commonly recorded in feet and inches in the United States and several other countries, while centimeters are common internationally. For general unit conversions across length, temperature, mass, volume and other categories, use the <Link href="/calculators/conversion-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">Conversion Calculator</Link>.
          </p>
          <p>The fundamental relationships are:</p>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 font-mono text-xs">
            1 foot = 12 inches<br />
            1 inch = 2.54 centimeters<br />
            5 ft 9 in = 69 inches &times; 2.54 = 175.26 cm
          </div>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Centimeters to Feet and Inches
          </h2>
          <p>To convert centimeters into total inches:</p>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 font-mono text-xs">
            total inches = centimeters / 2.54
          </div>
          <p>Then split total inches into whole feet and remaining inches:</p>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 font-mono text-xs">
            175.26 cm / 2.54 = 69 inches = 5 ft 9 in
          </div>
          <p>The converter can also display the equivalent millimeter value (1,752.6 mm).</p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            21. Height Conversion Examples
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums">
              <thead className="bg-slate-50 dark:bg-zinc-800/60 font-semibold">
                <tr>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-800">Feet &amp; Inches</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-800">Total Inches</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-800">Centimeters (cm)</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-800">Meters (m)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr><td className="p-2">5 ft 0 in</td><td className="p-2">60 in</td><td className="p-2">152.40 cm</td><td className="p-2">1.524 m</td></tr>
                <tr><td className="p-2">5 ft 6 in</td><td className="p-2">66 in</td><td className="p-2">167.64 cm</td><td className="p-2">1.676 m</td></tr>
                <tr><td className="p-2">5 ft 7 in</td><td className="p-2">67 in</td><td className="p-2">170.18 cm</td><td className="p-2">1.702 m</td></tr>
                <tr><td className="p-2">5 ft 8 in</td><td className="p-2">68 in</td><td className="p-2">172.72 cm</td><td className="p-2">1.727 m</td></tr>
                <tr><td className="p-2">5 ft 9 in</td><td className="p-2">69 in</td><td className="p-2">175.26 cm</td><td className="p-2">1.753 m</td></tr>
                <tr><td className="p-2">5 ft 10 in</td><td className="p-2">70 in</td><td className="p-2">177.80 cm</td><td className="p-2">1.778 m</td></tr>
                <tr><td className="p-2">6 ft 0 in</td><td className="p-2">72 in</td><td className="p-2">182.88 cm</td><td className="p-2">1.829 m</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500 italic mt-1">
            Because one inch equals exactly 2.54 cm, these conversions are deterministic rather than estimates.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            22. How to Use the Height Calculator
          </h2>
          <div className="space-y-2">
            <h3 className="font-semibold text-xs text-zinc-800 dark:text-zinc-200">Step 1: Choose a prediction method</h3>
            <p>
              Use the Khamis-Roche module when you have the child&apos;s age, height, weight, sex, and parents&apos; heights. Use the Tanner mid-parental module when you want a parent-height target estimate. Use the toddler doubling module for the age-specific heuristic supported by the calculator. Use the converter when you already know the height and only need a unit conversion.
            </p>
            <h3 className="font-semibold text-xs text-zinc-800 dark:text-zinc-200">Step 2: Enter measurements carefully</h3>
            <p>
              Use the same physical measurement throughout the calculation. For example, if a child&apos;s height is 4 ft 7 in, do not enter 4 ft 7 cm. Use the appropriate unit controls.
            </p>
            <h3 className="font-semibold text-xs text-zinc-800 dark:text-zinc-200">Step 3: Review the estimate and its context</h3>
            <p>
              Look at predicted adult height, estimated range, growth remaining, percentile estimate where available, parent heights, and the comparison visualization.
            </p>
            <h3 className="font-semibold text-xs text-zinc-800 dark:text-zinc-200">Step 4: Compare methods when useful</h3>
            <p>
              If both parental-height data and detailed child measurements are available, comparing the Khamis-Roche and mid-parental estimates can help illustrate how different models interpret the same child. Do not treat the method with the larger number as automatically more accurate.
            </p>
          </div>
        </section>

        {/* Section 23 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            23. How the Stature Comparison Visualization Works
          </h2>
          <p>
            The calculator includes a custom stature comparison visualization rather than a conventional statistical chart. It compares NOW, ADULT, MOM, and DAD statures side-by-side against a shared baseline.
          </p>
          <p>
            For example, the calculator may show child current stature at 111.8 cm, predicted adult stature at 171.3 cm, mother at 165.1 cm, and father at 177.8 cm. Changing the inputs updates the graphic dynamically in real time. The purpose of the visualizer is to make relative family statures intuitive to inspect; it is an illustrative comparison rather than a formal statistical confidence graphic.
          </p>
        </section>

        {/* Section 24 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            24. Why the Prediction May Change When Weight Changes
          </h2>
          <p>
            The Khamis-Roche model uses childhood weight as one of its predictor variables. Therefore, changing the child&apos;s weight can change the model output even if height and parental stature stay the same.
          </p>
          <p>
            This does not mean weight alone determines adult height. It means weight is one variable used by the regression model. The output should therefore be interpreted as the prediction produced by that specific model.
          </p>
        </section>

        {/* Section 25 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            25. Why Parent Height Matters
          </h2>
          <p>
            Parental height provides information about inherited stature potential. A common mid-parental calculation combines maternal and paternal stature with a sex-specific adjustment. For example, a taller pair of parents will generally produce a higher target height estimate than a shorter pair, all else equal.
          </p>
          <p>
            However, siblings with the same parents do not necessarily finish at exactly the same height. Genetics involves many variants, and individual development varies.
          </p>
        </section>

        {/* Section 26 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            26. Common Height Calculator Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1.5 pl-1">
            <li><strong>Mistake 1: Treating the output as guaranteed.</strong> A prediction is not a promise.</li>
            <li><strong>Mistake 2: Confusing target height with final height.</strong> Mid-parental height is a target estimate, not a guaranteed endpoint.</li>
            <li><strong>Mistake 3: Treating percentile as probability.</strong> A 25th percentile height does not mean a child has a 25% chance of reaching that height.</li>
            <li><strong>Mistake 4: Mixing units.</strong> 5 ft 9 in and 5.9 ft do not mean the same thing (5 ft 9 in equals 5.75 ft).</li>
            <li><strong>Mistake 5: Comparing different prediction methods as if they were identical.</strong> Different models use different variables and assumptions.</li>
            <li><strong>Mistake 6: Ignoring growth over time.</strong> A single measurement is less informative than a properly measured growth trajectory.</li>
          </ul>
        </section>

        {/* Section 27 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            27. Is This a Medical or Diagnostic Tool?
          </h2>
          <p>
            No. This calculator provides mathematical and model-based estimates for educational and informational use. It cannot diagnose growth hormone deficiency, endocrine disorders, delayed puberty, precocious puberty, skeletal disorders, nutritional deficiency, or chronic disease.
          </p>
          <p>
            CDC explicitly states that growth charts should not be used as the sole diagnostic instrument. A pediatrician or other qualified healthcare professional can interpret a child&apos;s measurements in the context of growth history, physical development, family history, and other clinical information.
          </p>
        </section>

        {/* Section 28 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            28. When a Professional Growth Assessment Matters
          </h2>
          <p>A clinician may want to investigate growth more closely when there is:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>unexpectedly slow growth</li>
            <li>unexpectedly rapid growth</li>
            <li>a substantial change in growth trajectory</li>
            <li>delayed or unusually early puberty</li>
            <li>a major difference between projected and expected stature</li>
            <li>other symptoms or health concerns</li>
          </ul>
          <p>
            A medical growth assessment can involve repeated height measurements, growth velocity, growth charts, physical examination, and, when appropriate, additional investigations such as bone-age assessment. The calculator should be used as an informational aid, not as a replacement for that assessment.
          </p>
        </section>

        {/* Section 29 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            29. Height Calculator Accuracy: What Does &ldquo;Accurate&rdquo; Mean?
          </h2>
          <p>There are several different meanings of accuracy:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li><strong>Numerical accuracy:</strong> Does the calculator correctly perform the formula?</li>
            <li><strong>Model accuracy:</strong> How closely does the prediction model estimate actual adult stature in the population for which it was developed?</li>
            <li><strong>Clinical usefulness:</strong> Does the result provide enough information to support a real clinical decision?</li>
          </ul>
          <p>
            These are not the same thing. This calculator has been mathematically verified against its implemented equations and reference cases, but that does not mean every prediction for every child will match their eventual adult height. The Khamis-Roche paper itself describes its study population and applicability limitations.
          </p>
        </section>

        {/* Section 30 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            30. Formula Reference
          </h2>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 space-y-2 font-mono text-xs">
            <div>
              <p className="font-bold text-blue-700 dark:text-blue-300 font-sans">Khamis-Roche Multi-Variable Regression:</p>
              <p>Predicted Height (in) = &beta;&#8320; + (&beta;&#8321; &times; Stature) + (&beta;&#8322; &times; Weight) + (&beta;&#8323; &times; Mid-Parent Stature)</p>
            </div>
            <div>
              <p className="font-bold text-blue-700 dark:text-blue-300 font-sans">Mid-Parental Target Height:</p>
              <p>Boy Target = (Mother + Father + 13 cm) / 2</p>
              <p>Girl Target = (Mother + Father &minus; 13 cm) / 2</p>
            </div>
            <div>
              <p className="font-bold text-blue-700 dark:text-blue-300 font-sans">Height Conversion:</p>
              <p>1 in = 2.54 cm | 1 ft = 12 in</p>
            </div>
            <div>
              <p className="font-bold text-blue-700 dark:text-blue-300 font-sans">Growth Remaining:</p>
              <p>Estimated Growth Remaining = Predicted Adult Height &minus; Current Height</p>
            </div>
          </div>
        </section>
      </div>

      {/* ─── 4. SECTION 31: FREQUENTLY ASKED QUESTIONS (UNFOLDED BY DEFAULT) ─── */}
      <div className="pt-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            31. Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {height_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-800/40 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-800/20 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 5. SECTION 32 & 33: INTERPRETATION NOTE & SUMMARY ─── */}
      <div className="pt-6 space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            32. Important Interpretation Note
          </h2>
          <p>
            Adult-height prediction is inherently uncertain. A model-generated result should be used as an estimate and interpreted in context rather than treated as a guaranteed final height.
          </p>
          <p>
            For a child with an unusual growth pattern, a rapidly changing percentile, suspected endocrine problem, or other health concern, professional pediatric assessment is more appropriate than relying on an online prediction alone.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            33. Summary
          </h2>
          <p>The Height Calculator combines several different height-related calculations:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li><strong>Khamis-Roche:</strong> A multi-variable model-based adult stature estimate.</li>
            <li><strong>Tanner mid-parental:</strong> A parent-height target estimate.</li>
            <li><strong>Toddler doubling:</strong> A simple heuristic adult-height estimate.</li>
            <li><strong>Height converter:</strong> An exact conversion between common height units.</li>
          </ul>
          <p>
            The most important distinction is between <strong>measurement conversion</strong> and <strong>biological prediction</strong>. Converting 175.26 cm to 5 ft 9 in is a deterministic mathematical calculation. Predicting a child&apos;s adult height is an estimate subject to biological and statistical uncertainty.
          </p>
          <p>
            Use the calculator to understand the relationships between current height, parental stature, model estimates, ranges, and measurement units—but do not treat one numerical prediction as a guaranteed description of the future adult.
          </p>
        </section>
      </div>

      {/* ─── 6. SOURCES AND METHODOLOGY ─── */}
      <div className="pt-6 space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Sources and Methodology
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The adult-height prediction discussion is based on published research and established pediatric growth references:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-1 text-xs text-slate-700 dark:text-slate-300">
          <li>
            <strong>Khamis-Roche Method:</strong> Khamis HJ, Roche AF. <em>Predicting Adult Stature Without Using Skeletal Age: The Khamis-Roche Method</em>. <em>Pediatrics</em>. 1994;94(4 Pt 1):504–507.
          </li>
          <li>
            <strong>Mid-Parental Height:</strong> Tanner JM, Goldstein H, Whitehouse RH. <em>Standards for children&apos;s height at ages 2–9 years allowing for height of parents</em>. <em>Arch Dis Child</em>. 1970;45(244):755–762.
          </li>
          <li>
            <strong>CDC Growth References:</strong> Centers for Disease Control and Prevention (CDC). <em>Clinical Growth Charts: Stature-for-age 2 to 20 years</em>. National Center for Health Statistics (NCHS).
          </li>
          <li>
            <strong>WHO Growth Standards:</strong> World Health Organization (WHO). <em>Child Growth Standards and Growth Reference 5–19 years</em>.
          </li>
        </ul>
        <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-1">
          Important: The presence of a published method does not make an individual prediction certain. Different prediction methods can produce different results, and the original Khamis-Roche research had population-specific applicability limitations.
        </p>
      </div>

      {/* ─── 7. AFTER-CONTENT RELATED CALCULATORS ─── */}
      <nav aria-label="Additional Related Calculators" className="pt-6">
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
            RELATED CALCULATORS:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <Link
              href="/calculators/conversion-calculator"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Conversion Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link
              href="/calculators/weight-calculator"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Weight Calculator
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}
