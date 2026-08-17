import React from "react";

export function IdealWeightContent() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Clinical Foundations of Ideal Body Weight (IBW)
        </h2>
        <p className="text-sm leading-relaxed">
          <strong>Ideal Body Weight (IBW)</strong> is an anthropometric standard representing the optimal statistical mass associated with maximal longevity, physiological homeostasis, and minimal risk of chronic cardiovascular and metabolic morbidity. Unlike general population averages, IBW models establish a baseline reference weight for a given height and biological sex.
        </p>
        <p className="text-sm leading-relaxed">
          While widely utilized in fitness and clinical nutrition for caloric target planning, IBW equations serve a critical role in <strong>clinical pharmacology and critical care medicine</strong>: calculating renal clearance (Cockcroft-Gault equation for creatinine clearance), setting protective mechanical ventilation tidal volumes (6–8 mL/kg of IBW in acute respiratory distress syndrome), and dosing hydrophilic medications (such as aminoglycosides, vancomycin, and anesthetic agents) that distribute primarily into lean tissue rather than adipose stores.
        </p>
      </section>

      {/* 2. Mathematical Concept & Historical Evolution */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. Mathematical Concept &amp; Historical Evolution of Formulas
        </h2>
        <p className="text-sm leading-relaxed">
          Standard adult IBW equations are linear piecewise functions based on a 5-foot (60-inch / 152.4 cm) baseline stature. For every inch above 5 feet, an empirical mass coefficient is added.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 space-y-1">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 text-sm">Hamwi Formula (1964)</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              Developed by Dr. George J. Hamwi as a clinical rule-of-thumb for diabetic dietary planning. It establishes an aggressive linear progression with 6.0 lbs (2.7 kg) per inch for men and 5.0 lbs (2.3 kg) per inch for women over 5 feet.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Devine Formula (1974) — Pharmacopeial Gold Standard</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              Derived by Dr. Ben J. Devine to standardize renal pharmacokinetic clearance. Devine modified Hamwi by applying an exact 2.3 kg per inch addition for both sexes, anchored at 50.0 kg for men and 45.5 kg for women.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Robinson Formula (1983)</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              Derived by Dr. J. D. Robinson via empirical regression analysis on metropolitan life insurance mortality tables, moderating the male baseline to 52.0 kg + 1.9 kg/inch and female to 49.0 kg + 1.7 kg/inch.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Miller Formula (1983)</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              Published by Dr. D. R. Miller to further refine linear slopes, setting men at 56.2 kg + 1.41 kg/inch and women at 53.1 kg + 1.36 kg/inch, resulting in higher baselines for shorter statures and gentler height scaling.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Mathematical Formula Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. Formula Section &amp; Variable Definitions
        </h2>

        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-3 text-xs font-mono">
          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">A. Devine Formula (1974)</p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Men:   IBW (kg) = 50.0 + 2.3 × (Height_in - 60)"}<br />
              {"Women: IBW (kg) = 45.5 + 2.3 × (Height_in - 60)"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">B. Robinson Formula (1983)</p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Men:   IBW (kg) = 52.0 + 1.9 × (Height_in - 60)"}<br />
              {"Women: IBW (kg) = 49.0 + 1.7 × (Height_in - 60)"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">C. Miller Formula (1983)</p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Men:   IBW (kg) = 56.2 + 1.41 × (Height_in - 60)"}<br />
              {"Women: IBW (kg) = 53.1 + 1.36 × (Height_in - 60)"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">D. Hamwi Formula (1964)</p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Men:   IBW (kg) = 48.0 + 2.7 × (Height_in - 60)   [106 lbs + 6 lbs/inch]"}<br />
              {"Women: IBW (kg) = 45.5 + 2.2 × (Height_in - 60)   [100 lbs + 5 lbs/inch]"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">E. Lemmens Formula (2005) &amp; WHO Healthy BMI Range</p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Lemmens IBW (kg) = 22.0 × Height_m²"}<br />
              {"WHO Normal Weight Bounds = 18.5 × Height_m²  to  24.99 × Height_m²"}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Bone Frame Size Impact & Mathematical Adjustment */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. Skeletal Frame Size Adjustment (±10% Multiplier)
        </h2>
        <p className="text-sm leading-relaxed">
          Bone density and joint circumference account for significant variations in non-adipose skeletal mass. Anthropometric standards adjust calculated IBW by <strong>±10%</strong> according to wrist circumference (ratio r = Height / Wrist):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-center">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Small Frame</span>
            <span className="text-blue-600 font-mono font-bold block">IBW × 0.90 (-10%)</span>
            <span className="text-[11px] text-zinc-500 block">Wrist &lt; 6.5&quot; (Men) / &lt; 6.0&quot; (Women)</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
            <span className="font-bold text-blue-950 dark:text-blue-100 block">Medium Frame</span>
            <span className="text-blue-600 font-mono font-bold block">IBW × 1.00 (Standard)</span>
            <span className="text-[11px] text-zinc-500 block">Wrist 6.5&quot;–7.5&quot; (Men) / 6.0&quot;–6.25&quot; (Women)</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Large Frame</span>
            <span className="text-blue-600 font-mono font-bold block">IBW × 1.10 (+10%)</span>
            <span className="text-[11px] text-zinc-500 block">Wrist &gt; 7.5&quot; (Men) / &gt; 6.25&quot; (Women)</span>
          </div>
        </div>
      </section>

      {/* 5. Comprehensive Height-to-Weight Lookup Table */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Height-to-Ideal-Weight Clinical Reference Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Height</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Devine (Men)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Devine (Women)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Robinson (Men)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">WHO Healthy Range (18.5–24.9)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold">5&apos;4&quot; (163 cm)</td>
                <td className="p-2 font-mono">130.5 lbs (59.2 kg)</td>
                <td className="p-2 font-mono">120.6 lbs (54.7 kg)</td>
                <td className="p-2 font-mono">131.4 lbs (59.6 kg)</td>
                <td className="p-2 font-mono">108 – 145 lbs (49 – 66 kg)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">5&apos;7&quot; (170 cm)</td>
                <td className="p-2 font-mono">145.7 lbs (66.1 kg)</td>
                <td className="p-2 font-mono">135.8 lbs (61.6 kg)</td>
                <td className="p-2 font-mono">143.9 lbs (65.3 kg)</td>
                <td className="p-2 font-mono">118 – 159 lbs (53 – 72 kg)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">5&apos;10&quot; (178 cm)</td>
                <td className="p-2 font-mono">160.9 lbs (73.0 kg)</td>
                <td className="p-2 font-mono">151.0 lbs (68.5 kg)</td>
                <td className="p-2 font-mono">156.5 lbs (71.0 kg)</td>
                <td className="p-2 font-mono">129 – 174 lbs (59 – 79 kg)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">6&apos;0&quot; (183 cm)</td>
                <td className="p-2 font-mono">171.1 lbs (77.6 kg)</td>
                <td className="p-2 font-mono">161.2 lbs (73.1 kg)</td>
                <td className="p-2 font-mono">164.9 lbs (74.8 kg)</td>
                <td className="p-2 font-mono">136 – 184 lbs (62 – 83 kg)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">6&apos;2&quot; (188 cm)</td>
                <td className="p-2 font-mono">181.2 lbs (82.2 kg)</td>
                <td className="p-2 font-mono">171.3 lbs (77.7 kg)</td>
                <td className="p-2 font-mono">173.3 lbs (78.6 kg)</td>
                <td className="p-2 font-mono">144 – 194 lbs (65 – 88 kg)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Step-by-Step Worked Clinical Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          6. Step-by-Step Worked Calculation Example
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 font-mono text-xs">
          <p className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            <strong>Clinical Scenario:</strong> A 35-year-old male with a height of 5 feet 10 inches (70 inches / 1.778 m) and large bone frame. Calculate his Ideal Body Weight via the Devine formula and determine his WHO healthy weight range.
          </p>

          <p><strong>Step 1: Determine Inches Over 5 Feet (60 Inches)</strong><br />
          {"Inches over 60 = 70 - 60 = 10 inches"}</p>

          <p><strong>Step 2: Apply Devine Formula (Male Baseline)</strong><br />
          {"IBW_base = 50.0 kg + (2.3 kg/inch × 10 inches) = 50.0 + 23.0 = 73.0 kg (160.94 lbs)"}</p>

          <p><strong>Step 3: Apply Large Bone Frame Adjustment (+10%)</strong><br />
          {"IBW_adjusted = 73.0 kg × 1.10 = 80.3 kg (177.03 lbs)"}</p>

          <p><strong>Step 4: Compute WHO Healthy BMI Range (BMI 18.5 – 24.99)</strong><br />
          {"Min Weight = 18.5 × (1.778 m)² = 18.5 × 3.1613 = 58.48 kg (128.9 lbs)"}<br />
          {"Max Weight = 24.99 × (1.778 m)² = 24.99 × 3.1613 = 79.00 kg (174.16 lbs)"}</p>
        </div>
      </section>

      {/* 7. Physiological Limitations of IBW */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          7. Critical Physiological Limitations of IBW
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>Sarcopenia vs. Muscular Hypertrophy:</strong> Standard IBW equations treat all mass equally and do not distinguish between skeletal muscle mass and adipose tissue. Resistance-trained athletes may exceed IBW while maintaining low, healthy body fat percentages (8–12%).
          </li>
          <li>
            <strong>Pediatric &amp; Geriatric Inapplicability:</strong> Linear IBW formulas are validated exclusively for skeletally mature adults (ages 18+). In elderly populations (&gt;65 years), a slightly higher BMI (23.0–26.0) is protective against osteoporotic fractures and frailty.
          </li>
          <li>
            <strong>Fluid Retention &amp; Edema:</strong> Pathological fluid shifts (such as in congestive heart failure, hepatic cirrhosis, or acute kidney injury) distort scale weight relative to true dry lean tissue.
          </li>
        </ul>
      </section>
    </div>
  );
}
