"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Apple,
  Calculator,
  Scale,
  Flame,
  Activity,
  Dumbbell,
  PieChart,
  Layers,
  Heart,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { fat_intake_calculatorFaqs } from "@/app/calculators/fat-intake-calculator/faq";

export function FatIntakeContent() {
  // All 40 approved FAQs open by default for maximum accessibility & SEO indexing
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 40 }, (_, i) => i))
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

  const relatedCalculators = [
    {
      name: "TDEE Calculator",
      slug: "/calculators/tdee-calculator",
      desc: "Determine total daily energy expenditure based on baseline physical activity.",
      icon: Activity,
    },
    {
      name: "Calorie Calculator",
      slug: "/calculators/calorie-calculator",
      desc: "Estimate daily caloric requirements for weight loss, maintenance, or mass gain.",
      icon: Flame,
    },
    {
      name: "Macro Calculator",
      slug: "/calculators/macro-calculator",
      desc: "Calculate balanced protein, carbohydrate, and fat grams for your daily TDEE.",
      icon: PieChart,
    },
    {
      name: "Protein Calculator",
      slug: "/calculators/protein-calculator",
      desc: "Calculate personalized daily protein targets for muscle preservation and growth.",
      icon: Dumbbell,
    },
    {
      name: "Carbohydrate Calculator",
      slug: "/calculators/carbohydrate-calculator",
      desc: "Model total carbs, net carbs, glycemic load, and 7-day carb cycling schedules.",
      icon: Apple,
    },
    {
      name: "BMR Calculator",
      slug: "/calculators/bmr-calculator",
      desc: "Compare resting basal metabolic rate across 5 clinical predictive formulas.",
      icon: Calculator,
    },
    {
      name: "Body Fat Calculator",
      slug: "/calculators/body-fat-calculator",
      desc: "Estimate body fat percentage and lean tissue mass from body measurements.",
      icon: Layers,
    },
    {
      name: "BMI Calculator",
      slug: "/calculators/bmi-calculator",
      desc: "Evaluate adult weight-for-height clinical category and health metrics.",
      icon: Scale,
    },
  ];

  return (
    <article className="mt-6 bg-white rounded-xl border border-slate-200 p-5 sm:p-7 text-slate-800 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 print:border-none print:p-0 print:m-0 print:space-y-4 print:divide-y-0 font-sans">
      {/* 1. MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800">
        {/* Overview Header */}
        <section className="space-y-3 print:break-inside-avoid">
          <div className="flex items-center gap-2 pb-1">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Evidence-Informed Nutrition &amp; Lipid Guide
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600">
            Fat Intake Calculator: Determine Your Daily Dietary Fat &amp; Fatty Acid Targets
          </h2>
          <p className="font-semibold text-slate-900 text-sm sm:text-base">
            How much dietary fat should you eat each day?
          </p>
          <p>
            Dietary fat is an essential macronutrient that serves as a dense source of biological energy, providing 9 calories per gram—more than twice the caloric density of protein or carbohydrate (4 kcal/g). However, determining your ideal daily fat intake is not simply a matter of picking a generic percentage. Your optimal intake depends on your total caloric expenditure, physical training volume, body composition goals, and cardiovascular lipid markers.
          </p>
          <p>
            This <strong>Fat Intake Calculator</strong> models your personalized daily dietary fat requirements based on validated metabolic formulas. It translates total energy needs from your{" "}
            <Link href="/calculators/tdee-calculator" className="text-blue-600 font-semibold hover:underline">
              TDEE
            </Link>{" "}
            into precise gram targets across 10 specialized dietary protocols—including weight loss, muscle gain, endurance athletics, ketogenic dieting, and cardiovascular heart health.
          </p>
          <p>
            Beyond simple fat grams, this calculator separates independent fatty acid sub-types: establishing targets for heart-healthy monounsaturated fatty acids (MUFAs) and polyunsaturated fatty acids (PUFAs), setting essential marine Omega-3 targets, and calculating an independent upper safety ceiling for saturated fat in accordance with current American Heart Association (AHA) and Dietary Guidelines for Americans (DGA) standards.
          </p>
        </section>

        {/* Section 1: What This Calculator Calculates */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            1. What This Fat Intake Calculator Calculates
          </h2>
          <p>
            The calculator combines physiological inputs (age, biological sex, height, weight, activity level, body fat percentage) with clinical formulas to generate a comprehensive lipid profile:
          </p>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-blue-900 font-semibold">
            Energy Requirement (TDEE) → Calorie Goal → Fat Macro Allocation → Grams of Fat → Fatty Acid Sub-Types &amp; Ceilings
          </div>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>
              <strong>Total Daily Fat Target (g/day &amp; kcal/day):</strong> Calculated from energy balance and your chosen macro distribution.
            </li>
            <li>
              <strong>Acceptable Macronutrient Distribution Range (AMDR):</strong> Evaluates your intake against the standard 20% to 35% calorie baseline established by the Institute of Medicine (IOM).
            </li>
            <li>
              <strong>General Saturated Fat Reference Ceiling (&lt;10%):</strong> An independent upper threshold based on DGA and World Health Organization (WHO) recommendations to prevent LDL elevation.
            </li>
            <li>
              <strong>AHA Heart Health Saturated Fat Ceiling (&lt;6%):</strong> The stricter clinical threshold recommended by the American Heart Association for cardiovascular risk reduction.
            </li>
            <li>
              <strong>Monounsaturated Fatty Acid Target (MUFA ~55% of fat):</strong> Targets oleic acid from extra virgin olive oil, avocados, and nuts.
            </li>
            <li>
              <strong>Polyunsaturated Fatty Acid Target (PUFA ~25% of fat):</strong> Balances essential Omega-3 and Omega-6 fatty acids.
            </li>
            <li>
              <strong>Evidence-Informed Fat Intake Planning Floor (~0.3 g/lb):</strong> Prevents excessive fat restriction that can suppress steroid hormone production or impair fat-soluble vitamin absorption.
            </li>
          </ul>
        </section>

        {/* Section 2: Mathematical Concept & Underlying Theory */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            2. Mathematical Concept: Energy Density, AMDR &amp; Lipid Metabolism
          </h2>
          <p>
            Dietary fats consist of triglycerides—molecules composed of a three-carbon glycerol backbone esterified with three fatty acid chains. Because fatty acid hydrocarbons are chemically reduced with minimal oxygen atoms, their complete oxidation yields approximately <strong>9.0 kilocalories per gram</strong> (37.7 kJ/g), compared to 4.0 kcal/g (16.7 kJ/g) for carbohydrate and amino acids.
          </p>
          <p>
            To establish a daily fat target, the calculator first determines your resting metabolic rate using your chosen clinical equation, such as the Mifflin-St Jeor formula or the lean-mass-adjusted Katch-McArdle formula from your{" "}
            <Link href="/calculators/bmr-calculator" className="text-blue-600 font-semibold hover:underline">
              BMR Calculator
            </Link>{" "}
            parameters:
          </p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 font-mono text-xs text-slate-800">
            <div className="font-bold text-blue-900">Mifflin-St Jeor Equation:</div>
            <div>Men:   BMR = (10 × weight_kg) + (6.25 × height_cm) − (5 × age) + 5</div>
            <div>Women: BMR = (10 × weight_kg) + (6.25 × height_cm) − (5 × age) − 161</div>
            <div className="pt-1 font-bold text-blue-900">Katch-McArdle Equation (Lean Mass):</div>
            <div>BMR = 370 + (21.6 × Lean Body Mass in kg)</div>
          </div>

          <p>
            Total Daily Energy Expenditure (TDEE) is then computed by multiplying BMR by the physical activity coefficient ($1.20$ to $1.90$). The user&apos;s net calorie target is calculated by applying the selected caloric surplus or deficit:
          </p>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-blue-900 font-semibold">
            Target Calories = TDEE + Calorie Adjustment (−500 kcal for fat loss, +500 kcal for bulking)
          </div>
        </section>

        {/* Section 3: Formulas & Variable Definitions */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            3. Formulas: Calculating Fat Grams, Ceilings &amp; Sub-Types
          </h2>
          <p>
            Once total daily calories are established, fat calories and fat grams are derived through the following fundamental relationships:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Calculation</th>
                  <th className="p-3">Mathematical Formula</th>
                  <th className="p-3">Variables &amp; Units</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Daily Fat Target (Grams)</td>
                  <td className="p-3 font-mono text-blue-700">Fat (g) = (Target Calories × Fat %) / 9</td>
                  <td className="p-3">Target Calories in kcal; Fat % as decimal (e.g. 0.25)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Fat Energy Share (kcal)</td>
                  <td className="p-3 font-mono text-blue-700">Fat Calories = Fat (g) × 9</td>
                  <td className="p-3">9 kcal per gram conversion factor</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">General Saturated Ceiling</td>
                  <td className="p-3 font-mono text-blue-700">Sat Fat Max (g) = (Target Calories × 0.10) / 9</td>
                  <td className="p-3">DGA/WHO upper limit (&lt;10% of total calories)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">AHA Heart Health Ceiling</td>
                  <td className="p-3 font-mono text-blue-700">AHA Sat Fat Max (g) = (Target Calories × 0.06) / 9</td>
                  <td className="p-3">American Heart Association cardiac guideline (&lt;6%)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">MUFA Planning Target</td>
                  <td className="p-3 font-mono text-blue-700">MUFA (g) = Fat Target (g) × 0.55</td>
                  <td className="p-3">Approximately 55% of dietary fat intake</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">PUFA Planning Target</td>
                  <td className="p-3 font-mono text-blue-700">PUFA (g) = Fat Target (g) × 0.25</td>
                  <td className="p-3">Approximately 25% of dietary fat intake</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Planning Floor Target</td>
                  <td className="p-3 font-mono text-blue-700">Floor (g) = Body Weight (lbs) × 0.30</td>
                  <td className="p-3">Endocrine safety reference (~0.66 g/kg)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Bodybuilder Planning Target</td>
                  <td className="p-3 font-mono text-blue-700">Target (g) = Body Weight (lbs) × 0.35</td>
                  <td className="p-3">Sports nutrition contest prep target (~0.77 g/kg)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-600 italic">
            Note: The saturated fat ceiling is an independent upper boundary calculated from total caloric intake. It is not an additive component that sums into or displaces your MUFA and PUFA targets.
          </p>
        </section>

        {/* Section 4: Fatty Acid Classification & Clinical Biochemistry */}
        <section className="space-y-4 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            4. The Fatty Acid Spectrum: Structure, Function &amp; Cardiovascular Impact
          </h2>
          <p>
            Dietary fats are categorized by the presence and configuration of double bonds along their hydrocarbon chain. Each class exerts distinct biological effects on cell membrane fluidity, receptor sensitivity, and blood lipid biomarkers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Monounsaturated Fatty Acids (MUFAs)
              </div>
              <p className="text-xs text-slate-700">
                <strong>Biochemistry:</strong> Possess a single double bond in the cis orientation (predominantly oleic acid, 18:1 n-9). Found abundantly in extra virgin olive oil, avocados, macadamia nuts, and almonds.
              </p>
              <p className="text-xs text-slate-700">
                <strong>Clinical Effect:</strong> When substituted for saturated fats, MUFAs lower apolipoprotein B (ApoB) and low-density lipoprotein cholesterol (LDL-C) without diminishing anti-atherogenic high-density lipoprotein cholesterol (HDL-C) or promoting triglyceride accumulation.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                Polyunsaturated Fatty Acids (PUFAs)
              </div>
              <p className="text-xs text-slate-700">
                <strong>Biochemistry:</strong> Contain two or more double bonds. Divided into Omega-6 (linoleic acid, arachidonic acid) and Omega-3 (alpha-linolenic acid, EPA, DHA).
              </p>
              <p className="text-xs text-slate-700">
                <strong>Clinical Effect:</strong> Marine-derived EPA and DHA from cold-water fish incorporate directly into myocardial and endothelial cell membranes, reducing hepatic VLDL production, lowering serum triglycerides, and producing pro-resolving lipid mediators.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                Saturated Fatty Acids (SFAs)
              </div>
              <p className="text-xs text-slate-700">
                <strong>Biochemistry:</strong> Fully saturated with hydrogen; contains zero double bonds. Linear chains pack tightly together, making them solid at room temperature.
              </p>
              <p className="text-xs text-slate-700">
                <strong>Clinical Effect:</strong> High intakes of specific SFAs (palmitic 16:0, myristic 14:0, lauric 12:0) downregulate hepatic LDL receptor expression, decreasing LDL clearance from the blood and raising circulating LDL particle concentration.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                Industrial Trans Fatty Acids (TFAs)
              </div>
              <p className="text-xs text-slate-700">
                <strong>Biochemistry:</strong> Formed industrially through partial hydrogenation of vegetable seed oils, creating unnatural trans double bond geometries.
              </p>
              <p className="text-xs text-slate-700">
                <strong>Clinical Effect:</strong> Highly atherogenic. Trans fats simultaneously elevate LDL-C, lower HDL-C, and increase systemic vascular inflammation. Clinical guidelines establish an absolute intake target of <strong>0 grams per day</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Step-by-Step Worked Examples */}
        <section className="space-y-4 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            5. Step-by-Step Worked Calculation Examples
          </h2>
          <p>
            The following worked examples demonstrate how the calculation engine evaluates different metabolic scenarios:
          </p>

          {/* Example 1 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">
              Example 1: Canonical Baseline Adult (Maintenance)
            </h3>
            <p className="text-xs text-slate-600">
              Profile: 25-year-old male, 5&apos;10&quot; (177.8 cm), 160 lbs (72.57 kg), Light Active (1.375), Goal: Maintain Weight, Baseline AMDR 25% fat allocation.
            </p>
            <div className="font-mono text-xs text-slate-800 space-y-1 bg-white p-3 rounded-lg border border-slate-200">
              <div>1. BMR (Mifflin-St Jeor) = (10 × 72.57) + (6.25 × 177.8) − (5 × 25) + 5 = 1,717 kcal</div>
              <div>2. TDEE = 1,717 × 1.375 = 2,360.88 ≈ 2,361 kcal/day</div>
              <div>3. Target Calories = 2,361 kcal/day (Maintenance)</div>
              <div>4. Fat Allocation (25%) = 2,361 × 0.25 = 590.25 kcal from fat</div>
              <div>5. Daily Fat Target = 590.25 / 9 = 65.58 g → <span className="text-blue-700 font-bold">66 g/day</span></div>
              <div>6. General Sat Fat Ceiling (&lt;10%) = (2,361 × 0.10) / 9 = 26.23 g → <span className="text-amber-700 font-bold">&lt;26 g/day</span></div>
              <div>7. AHA Heart Health Ceiling (&lt;6%) = (2,361 × 0.06) / 9 = 15.74 g → <span className="text-rose-700 font-bold">&lt;16 g/day</span></div>
              <div>8. Planning Floor Reference = 160 lbs × 0.30 = <span className="text-emerald-700 font-bold">48 g/day</span> (66g &gt; 48g floor ✓)</div>
              <div>9. MUFA Target (~55%) = 66 × 0.55 = 36.3 g → <span className="text-emerald-700 font-bold">36 g/day</span></div>
              <div>10. PUFA Target (~25%) = 66 × 0.25 = 16.5 g → <span className="text-cyan-700 font-bold">17 g/day</span></div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">
              Example 2: Heart Health Reference Mode (Cardiovascular Focus)
            </h3>
            <p className="text-xs text-slate-600">
              Profile: 52-year-old female, 5&apos;4&quot; (162.6 cm), 145 lbs (65.77 kg), Moderate Active (1.55), Target: 1,800 kcal/day, Heart Health Reference mode.
            </p>
            <div className="font-mono text-xs text-slate-800 space-y-1 bg-white p-3 rounded-lg border border-slate-200">
              <div>1. Target Calories = 1,800 kcal/day</div>
              <div>2. Total Fat Allocation (25%) = 1,800 × 0.25 = 450 kcal → <span className="text-blue-700 font-bold">50 g/day</span></div>
              <div>3. AHA Saturated Fat Ceiling (&lt;6%) = (1,800 × 0.06) / 9 = 12.00 g → <span className="text-rose-700 font-bold">&lt;12 g/day</span></div>
              <div>4. General Saturated Fat Limit (&lt;10%) = (1,800 × 0.10) / 9 = 20.00 g → <span className="text-amber-700 font-bold">&lt;20 g/day</span></div>
              <div>5. Dietary Cholesterol Reference = <span className="text-slate-900 font-bold">&lt;200 mg/day</span> (Strict cardiac guidance)</div>
              <div>6. MUFA Target = 50 × 0.55 = <span className="text-emerald-700 font-bold">28 g/day</span> (Extra virgin olive oil / avocado focus)</div>
              <div>7. Marine Omega-3 Target = <span className="text-cyan-700 font-bold">1.1 g/day</span> (Minimum AI for adult females)</div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">
              Example 3: Competitive Bodybuilder (0.35 g/lb Planning Target)
            </h3>
            <p className="text-xs text-slate-600">
              Profile: 200 lb (90.7 kg) male athlete in contest prep deficit (2,400 kcal/day).
            </p>
            <div className="font-mono text-xs text-slate-800 space-y-1 bg-white p-3 rounded-lg border border-slate-200">
              <div>1. Bodybuilder Planning Formula = Body Weight (lbs) × 0.35 g/lb</div>
              <div>2. Fat Target = 200 × 0.35 = <span className="text-blue-700 font-bold">70 g/day</span> (630 kcal from fat)</div>
              <div>3. Resulting Fat Percentage = (630 / 2,400) × 100 = 26.25% of calories</div>
              <div>4. High-Protein Priority = Protein set to 220 g (880 kcal, 36.6%)</div>
              <div>5. Remaining Calories to Carbohydrate = 2,400 − 630 − 880 = 890 kcal → 222 g carbs</div>
            </div>
          </div>

          {/* Example 4 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">
              Example 4: Standard Ketogenic Diet (SKD 75% Fat Protocol)
            </h3>
            <p className="text-xs text-slate-600">
              Profile: 170 lb adult adhering to a 2,000 kcal ketogenic protocol.
            </p>
            <div className="font-mono text-xs text-slate-800 space-y-1 bg-white p-3 rounded-lg border border-slate-200">
              <div>1. Keto Fat Allocation (75%) = 2,000 × 0.75 = 1,500 kcal from fat</div>
              <div>2. Daily Fat Target = 1,500 / 9 = 166.67 g → <span className="text-blue-700 font-bold">167 g/day</span></div>
              <div>3. Protein Allocation (20%) = (2,000 × 0.20) / 4 = <span className="text-emerald-700 font-bold">100 g protein</span></div>
              <div>4. Net Carbohydrate Cap (5%) = (2,000 × 0.05) / 4 = <span className="text-cyan-700 font-bold">25 g net carbs</span></div>
            </div>
          </div>
        </section>

        {/* Section 6: Visual Understanding & Structural Energy Breakdown */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            6. Visual Understanding: Caloric Energy Architecture &amp; Fatty Acid Partitioning
          </h2>
          <p>
            The following diagram visualizes how daily energy partitions into macronutrients and how dietary fat subdivides into functional fatty acids:
          </p>

          <pre className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 overflow-x-auto">
{`Total Daily Energy Expenditure (TDEE: 2,361 kcal)
├── Carbohydrates (50% | 1,181 kcal | 295 g)
├── Protein       (25% |   590 kcal | 148 g)
└── Dietary Fat   (25% |   590 kcal |  66 g)
     ├── Monounsaturated Fat (MUFA Target ~55% of fat: ~36 g)
     │    └── Oleic acid (EVOO, avocados, almonds) → Lowers LDL-C, preserves HDL-C
     ├── Polyunsaturated Fat (PUFA Target ~25% of fat: ~17 g)
     │    ├── Omega-6 Linoleic Acid (Walnuts, seeds, plant oils)
     │    └── Omega-3 EPA & DHA (Wild salmon, sardines, algae) → Anti-inflammatory
     └── Other Lipids / Dietary Saturated Fats
          ├── General Ceiling:  <10% Total Calories (<26 g/day)
          └── AHA Cardiac Limit: <6% Total Calories (<16 g/day)`}
          </pre>
        </section>

        {/* Section 7: Common Mistakes & Edge Cases */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            7. Common Mistakes &amp; Clinical Edge Cases
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs sm:text-sm">
                  Mistake 1: Severe Fat Restriction Below 15% of Calories
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Chronic dietary fat restriction below 15% of total calories (or below 0.3g per pound of body weight) can impair the absorption of fat-soluble vitamins (A, D, E, K), compromise cellular membrane turnover, and lead to significant reductions in circulating testosterone and estrogen concentrations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs sm:text-sm">
                  Mistake 2: Confusing Saturated Fat Limits with an Additive Pie Slice
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  A common graphical error is plotting saturated fat as an additive slice alongside MUFA and PUFA within a 100% fat donut chart. Because the saturated fat ceiling is computed from <em>total calories</em> (not total fat), in lower-fat diets the sum of MUFA + PUFA + Sat Limit mathematically exceeds 100% of fat intake. Saturated fat must always be evaluated as an independent safety ceiling.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs sm:text-sm">
                  Mistake 3: Relying Exclusively on Plant ALA for Marine Omega-3 Needs
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  While flaxseeds and walnuts provide abundant alpha-linolenic acid (ALA), the human enzymatic conversion of ALA into active eicosapentaenoic acid (EPA) and docosahexaenoic acid (DHA) is notoriously inefficient—typically less than 5% to 8% for EPA and under 1% to 4% for DHA. Direct marine sources (wild salmon, sardines, mackerel) or algae-based DHA/EPA supplements are essential for cardioprotective benefits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs sm:text-sm">
                  Mistake 4: Equating All Dietary Fats with Body Fat Gain
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Adipose tissue accumulation is dictated by long-term positive energy balance (consuming more calories than you burn via your{" "}
                  <Link href="/calculators/calorie-calculator" className="text-blue-600 font-semibold hover:underline">
                    Calorie Calculator
                  </Link>{" "}
                  energy expenditure), not by dietary fat alone. Consuming healthy fats enhances gastric satiety via CCK and peptide YY secretion, often preventing passive overeating.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Practical Applications & Food Sources */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            8. Practical Applications: Healthy Fat Food Reference Values
          </h2>
          <p>
            Achieving your daily fat target requires selecting nutrient-dense whole foods rich in monounsaturated and polyunsaturated fats while keeping saturated fat below your personal ceiling. The following reference values are drawn from the USDA FoodData Central database:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Food Item</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Serving Size</th>
                  <th className="p-3">Total Fat</th>
                  <th className="p-3">Saturated Fat</th>
                  <th className="p-3">MUFA</th>
                  <th className="p-3">PUFA</th>
                  <th className="p-3">Calories</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Extra Virgin Olive Oil</td>
                  <td className="p-3 text-slate-500">Oils &amp; Fats</td>
                  <td className="p-3">1 tbsp (14g)</td>
                  <td className="p-3 font-bold text-blue-600">14.0 g</td>
                  <td className="p-3 text-slate-600">1.9 g</td>
                  <td className="p-3 text-emerald-700 font-medium">9.9 g</td>
                  <td className="p-3 text-cyan-700">1.4 g</td>
                  <td className="p-3">119 kcal</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Hass Avocado</td>
                  <td className="p-3 text-slate-500">Avocados &amp; Fruits</td>
                  <td className="p-3">1 medium (150g)</td>
                  <td className="p-3 font-bold text-blue-600">22.0 g</td>
                  <td className="p-3 text-slate-600">3.2 g</td>
                  <td className="p-3 text-emerald-700 font-medium">14.7 g</td>
                  <td className="p-3 text-cyan-700">2.7 g</td>
                  <td className="p-3">240 kcal</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Wild Atlantic Salmon</td>
                  <td className="p-3 text-slate-500">Seafood &amp; Fish</td>
                  <td className="p-3">3 oz (85g)</td>
                  <td className="p-3 font-bold text-blue-600">10.5 g</td>
                  <td className="p-3 text-slate-600">1.9 g</td>
                  <td className="p-3 text-emerald-700 font-medium">3.8 g</td>
                  <td className="p-3 text-cyan-700">3.9 g (1.8g Ω3)</td>
                  <td className="p-3">175 kcal</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">English Walnuts</td>
                  <td className="p-3 text-slate-500">Nuts &amp; Seeds</td>
                  <td className="p-3">1 oz (28g)</td>
                  <td className="p-3 font-bold text-blue-600">18.5 g</td>
                  <td className="p-3 text-slate-600">1.7 g</td>
                  <td className="p-3 text-emerald-700 font-medium">2.5 g</td>
                  <td className="p-3 text-cyan-700">13.4 g (2.5g Ω3)</td>
                  <td className="p-3">185 kcal</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Raw Almonds</td>
                  <td className="p-3 text-slate-500">Nuts &amp; Seeds</td>
                  <td className="p-3">1 oz (28g)</td>
                  <td className="p-3 font-bold text-blue-600">14.2 g</td>
                  <td className="p-3 text-slate-600">1.1 g</td>
                  <td className="p-3 text-emerald-700 font-medium">8.9 g</td>
                  <td className="p-3 text-cyan-700">3.5 g</td>
                  <td className="p-3">164 kcal</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Chia Seeds</td>
                  <td className="p-3 text-slate-500">Nuts &amp; Seeds</td>
                  <td className="p-3">1 oz (28g)</td>
                  <td className="p-3 font-bold text-blue-600">8.7 g</td>
                  <td className="p-3 text-slate-600">0.9 g</td>
                  <td className="p-3 text-emerald-700 font-medium">0.6 g</td>
                  <td className="p-3 text-cyan-700">6.8 g (5.0g Ω3)</td>
                  <td className="p-3">138 kcal</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Large Whole Egg</td>
                  <td className="p-3 text-slate-500">Dairy &amp; Eggs</td>
                  <td className="p-3">1 large (50g)</td>
                  <td className="p-3 font-bold text-blue-600">5.0 g</td>
                  <td className="p-3 text-slate-600">1.6 g</td>
                  <td className="p-3 text-emerald-700 font-medium">2.0 g</td>
                  <td className="p-3 text-cyan-700">0.7 g</td>
                  <td className="p-3">72 kcal</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Dark Chocolate (85%)</td>
                  <td className="p-3 text-slate-500">Processed &amp; Snacks</td>
                  <td className="p-3">1 oz (28g)</td>
                  <td className="p-3 font-bold text-blue-600">12.1 g</td>
                  <td className="p-3 text-slate-600">7.0 g</td>
                  <td className="p-3 text-emerald-700 font-medium">3.6 g</td>
                  <td className="p-3 text-cyan-700">0.4 g</td>
                  <td className="p-3">170 kcal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 9: Age-Specific Guidelines Table */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            9. Dietary Fat Requirements Across the Lifespan
          </h2>
          <p>
            Dietary fat requirements change dramatically from infancy through older adulthood, reflecting developmental milestones and metabolic alterations:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Age Bracket</th>
                  <th className="p-3">AMDR Fat Range (% Calories)</th>
                  <th className="p-3">Primary Physiological Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Toddlers (Age 2–3)</td>
                  <td className="p-3 font-bold text-blue-600">30% to 40% of Total Calories</td>
                  <td className="p-3">Rapid neurological myelination; whole milk and healthy fats support brain volume expansion.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Children &amp; Teens (Age 4–18)</td>
                  <td className="p-3 font-bold text-blue-600">25% to 35% of Total Calories</td>
                  <td className="p-3">Somatic growth, pubertal endocrine maturation, and sustained energy for physical activity.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Adults (Age 19+)</td>
                  <td className="p-3 font-bold text-blue-600">20% to 35% of Total Calories</td>
                  <td className="p-3">Cardiovascular lipid balance, fat-soluble vitamin transport, joint lubrication, and satiety.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 10: Summary */}
        <section className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200 print:break-inside-avoid">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Educational Summary
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Dietary fat is an indispensable macronutrient that provides cellular structure, drives steroidogenesis, and facilitates fat-soluble vitamin absorption. By utilizing your personal energy expenditure, establishing an AMDR target of 20% to 35% of calories, maintaining an evidence-informed planning floor (~0.3 g/lb), capping saturated fat under 10% (or &lt;6% for American Heart Association cardiovascular guidance), and prioritizing monounsaturated fats and marine Omega-3s, you build a sustainable, evidence-based nutrition protocol.
          </p>
        </section>
      </div>

      {/* 2. RELATED CALCULATORS MODULE */}
      <div className="pt-6 print:hidden">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Related Health &amp; Nutrition Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {relatedCalculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.slug}
                href={calc.slug}
                className="p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-white border border-slate-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                      {calc.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {calc.desc}
                  </p>
                </div>
                <div className="text-[10px] font-bold text-blue-600 group-hover:underline pt-2">
                  Launch Tool →
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. FREQUENTLY ASKED QUESTIONS (EXACT 40 FAQS) */}
      <div className="pt-6 print:pt-3 print:break-inside-auto">
        <div className="flex items-center gap-2 mb-4 print:mb-2 print:break-after-avoid">
          <HelpCircle className="h-5 w-5 text-blue-600 print:hidden" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Frequently Asked Questions (40 Authoritative Clinical Answers)
          </h2>
        </div>

        <div className="space-y-2.5 print:space-y-2">
          {fat_intake_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs print:border-slate-300 print:shadow-none print:break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 text-left text-xs sm:text-sm font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer print:p-2"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 print:hidden ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`${
                    isOpen ? "block" : "hidden"
                  } print:block p-3.5 pt-0 print:pt-1 text-xs text-slate-700 leading-relaxed bg-slate-50/50 font-normal print:bg-white`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. MEDICAL & NUTRITION DISCLAIMER */}
      <div className="pt-6 print:pt-3 print:break-inside-avoid">
        <section className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-bold text-slate-900 uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" />
            Nutritional &amp; Cardiovascular Disclaimer
          </div>
          <p className="leading-relaxed">
            This fat intake calculator and educational reference guide provide planning estimates based on standard mathematical formulas, dietary reference intakes, and published clinical cardiovascular guidelines. They do not constitute formal medical diagnosis, individualized lipidology management, or clinical nutrition therapy. Individuals with familial hypercholesterolemia, advanced coronary artery disease, elevated ApoB, or chronic metabolic conditions should consult a board-certified cardiologist or registered dietitian (RD) regarding personalized lipid targets.
          </p>
        </section>
      </div>
    </article>
  );
}

export default FatIntakeContent;
