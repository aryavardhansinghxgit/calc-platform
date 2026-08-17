import React from "react";

export function HeightContent() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Introduction to Human Stature Genetics &amp; Growth Kinetics
        </h2>
        <p className="text-sm leading-relaxed">
          Adult height (stature) is a polygenic trait determined primarily by genetic inheritance (60% to 80% heritability) and modulated by environmental inputs including childhood nutrition, endocrine signaling (human growth hormone, thyroid hormones, sex steroids), and general health during epiphyseal plate fusion. Pediatric stature prediction assists endocrinologists and parents in tracking developmental trajectories against standardized population reference curves.
        </p>
      </section>

      {/* 2. Mathematical Formulations & Methodologies */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. Scientific Methodologies for Adult Height Prediction
        </h2>

        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-3 text-xs font-mono">
          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              A. Khamis-Roche Multi-Variable Linear Regression Method (1994)
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Predicted Adult Height (in) = β₀ + (β₁ × Child Stature) + (β₂ × Child Weight) + (β₃ × Mid-Parent Stature)"}<br />
              {"Where Mid-Parent Stature = (Father Height + Mother Height) / 2"}<br />
              {"Accuracy: 90% Confidence Interval of ±2.1 inches (5.3 cm) for boys and ±1.7 inches (4.3 cm) for girls without requiring invasive X-ray bone age scans."}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              B. Tanner Mid-Parental Target Stature Formula
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Boy Target Height = [ Father Height + (Mother Height + 13 cm) ] / 2"}<br />
              {"Girl Target Height = [ (Father Height - 13 cm) + Mother Height ] / 2"}<br />
              {"95% Target Range: Target Stature ± 8.5 cm (± 3.3 inches)"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              C. 2-Year-Old Toddler Doubling Rule
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Boy Adult Height ≈ 2 × Stature at 24 Months (2.0 Years)"}<br />
              {"Girl Adult Height ≈ 2 × Stature at 18 Months (or 2 × Stature at 24 Months - 2.5 inches)"}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Pediatric Stature Prediction Comparison Table */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. Comparative Analysis of Height Prediction Models
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Method</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Inputs Required</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Target Age</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Accuracy / Error Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold text-blue-700 dark:text-blue-300">Khamis-Roche Regression</td>
                <td className="p-2">Child Age, Height, Weight, Both Parents&apos; Heights</td>
                <td className="p-2">4 to 17 years</td>
                <td className="p-2">Highest non-invasive accuracy (±2.1 in / ±5.3 cm)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-emerald-700 dark:text-emerald-300">Tanner Mid-Parental</td>
                <td className="p-2">Father&apos;s Height, Mother&apos;s Height, Child Gender</td>
                <td className="p-2">Birth to Adult</td>
                <td className="p-2">Moderate (±3.3 in / ±8.5 cm) genetic potential</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-amber-700 dark:text-amber-300">Toddler Doubling Method</td>
                <td className="p-2">Height at 18–24 months</td>
                <td className="p-2">Toddler (1.5–2 yrs)</td>
                <td className="p-2">General heuristic estimate (±3 to 4 inches)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-purple-700 dark:text-purple-300">Bayley-Pinneau (Bone Age)</td>
                <td className="p-2">Left Hand/Wrist Radiograph X-Ray + Greulich-Pyle Atlas</td>
                <td className="p-2">6 to 18 years</td>
                <td className="p-2">Gold standard clinical (requires pediatric radiology)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. CDC & WHO Stature-for-Age Reference Percentiles */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. CDC Stature-for-Age Percentiles Reference (Median 50th Percentile)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Age (Years)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Boys 50th % (cm / ft-in)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Girls 50th % (cm / ft-in)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Annual Growth Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold">2.0 Years</td>
                <td className="p-2">86.8 cm (2&apos; 10.2&quot;)</td>
                <td className="p-2">85.5 cm (2&apos; 9.7&quot;)</td>
                <td className="p-2">~10 cm / year</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">5.0 Years</td>
                <td className="p-2">109.2 cm (3&apos; 7.0&quot;)</td>
                <td className="p-2">108.4 cm (3&apos; 6.7&quot;)</td>
                <td className="p-2">~6 to 7 cm / year</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">10.0 Years</td>
                <td className="p-2">138.4 cm (4&apos; 6.5&quot;)</td>
                <td className="p-2">138.6 cm (4&apos; 6.6&quot;)</td>
                <td className="p-2">~5 to 6 cm / year</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">14.0 Years (Pubertal Spurt)</td>
                <td className="p-2">163.8 cm (5&apos; 4.5&quot;)</td>
                <td className="p-2">160.4 cm (5&apos; 3.1&quot;)</td>
                <td className="p-2">Peak Height Velocity (7–10 cm/yr)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-blue-700 dark:text-blue-300">Adult (20 Years)</td>
                <td className="p-2 font-bold">177.0 cm (5&apos; 9.7&quot;)</td>
                <td className="p-2 font-bold">163.5 cm (5&apos; 4.4&quot;)</td>
                <td className="p-2">Final Epiphyseal Plate Fusion</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Step-by-Step Worked Calculation Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Step-by-Step Worked Calculation Example
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 font-mono text-xs">
          <p className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            <strong>Problem:</strong> Predict the adult height of a 5-year-old boy currently 44 inches tall (111.8 cm), weighing 42 lbs (19.1 kg), whose father is 5&apos;10&quot; (70 in / 177.8 cm) and mother is 5&apos;4&quot; (64 in / 162.6 cm) using both Khamis-Roche and Mid-Parental methods.
          </p>

          <p><strong>Step 1: Calculate Mid-Parent Stature (MPS)</strong><br />
          {"MPS = (70 in + 64 in) / 2 = 67.0 inches (170.2 cm)"}</p>

          <p><strong>Step 2: Apply Khamis-Roche Regression Formula (Age 5.0 Boy)</strong><br />
          {"Coefficients: β₀ = -1.248, β₁ = 1.074, β₂ = -0.059, β₃ = 0.352"}<br />
          {"Predicted Stature = -1.248 + (1.074 × 44) + (-0.059 × 42) + (0.352 × 67.0)"}<br />
          {"Predicted Stature = -1.248 + 47.256 - 2.478 + 23.584 = 67.11 inches (170.5 cm = 5' 7.1\")"}<br />
          {"90% Confidence Interval = 67.11 ± 2.4 inches = 64.7\" to 69.5\" (5' 4.7\" to 5' 9.5\")"}</p>

          <p><strong>Step 3: Calculate Tanner Mid-Parental Target Stature</strong><br />
          {"Target Height = [ 177.8 cm + (162.6 cm + 13 cm) ] / 2 = 176.7 cm (5' 9.6\")"}<br />
          {"Target Range (95% CI) = 176.7 ± 8.5 cm = 168.2 cm to 185.2 cm (5' 6.2\" to 6' 0.9\")"}</p>
        </div>
      </section>

      {/* 6. Biological Factors Governing Growth */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          6. Biological &amp; Environmental Factors Affecting Stature
        </h2>
        <ul className="list-disc list-inside text-xs space-y-1 text-zinc-700 dark:text-zinc-300">
          <li><strong>Epiphyseal Plate Closure:</strong> Long bones grow at cartilaginous growth plates (epiphyses). Estrogen signaling triggers complete epiphyseal fusion around ages 14–16 for females and 16–18 for males.</li>
          <li><strong>Slow-Wave Sleep &amp; HGH Release:</strong> Over 60% of Human Growth Hormone (HGH) is secreted in pulsatile bursts during stage 3/4 slow-wave sleep. Chronic sleep deprivation dampens somatotropic axis output.</li>
          <li><strong>Micro-Nutrient Adequacy:</strong> Zinc, calcium, vitamin D, and protein sufficiency directly support chondrocyte proliferation and osteoblast mineral deposition during pubertal growth spurts.</li>
        </ul>
      </section>
    </div>
  );
}
