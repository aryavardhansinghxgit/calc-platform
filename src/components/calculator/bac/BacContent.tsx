"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  ShieldAlert,
  AlertTriangle,
  Activity,
  Layers,
  Scale,
  Clock,
  Droplet,
  Flame,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { bacFaqs } from "@/app/calculators/bac-calculator/faq";

export function BacContent() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 text-slate-800 dark:text-slate-200 font-sans">
      {/* Educational Article Section */}
      <article className="space-y-8">
        {/* Article Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-100 dark:border-blue-900/50">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
              BAC Calculator: Estimate Blood Alcohol Concentration From Drinks and Time
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              An evidence-based guide to Widmark distribution factors, elimination kinetics, standard drinks, model comparisons, and legal limits.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            A Blood Alcohol Concentration (BAC) calculator estimates the percentage of ethanol circulating in the bloodstream from information such as the volume and strength of alcoholic beverages consumed, body weight, biological sex, elapsed time, and selected pharmacokinetic assumptions.
          </p>
          <p>
            This calculator is designed to illustrate the underlying toxicology mathematics rather than provide a legal guarantee of sobriety, cognitive clarity, or fitness to operate motor vehicles.
          </p>
          <p>
            You can enter individual drinks by volume and alcohol by volume (ABV), select different mathematical estimation frameworks, and inspect:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-medium text-slate-900 dark:text-slate-100">
            <li><strong>Current modeled BAC:</strong> The estimated remaining blood alcohol level at the current elapsed time.</li>
            <li><strong>Modeled peak BAC:</strong> The highest projected blood alcohol concentration during the drinking session.</li>
            <li><strong>Elimination timeline:</strong> The projected hourly decline of blood alcohol over time.</li>
            <li><strong>Time to reference thresholds:</strong> Modeled hours until BAC drops below reference lines such as 0.08% or 0.05%.</li>
            <li><strong>Time until 0.00% modeled BAC:</strong> Theoretical duration until calculated circulating ethanol reaches zero.</li>
            <li><strong>Pure ethanol dose:</strong> Total alcohol mass in grams and equivalent U.S. standard drinks.</li>
            <li><strong>Alcohol calories:</strong> Direct caloric energy derived from pure ethanol (7 kcal/g).</li>
          </ul>

          {/* Safety Notice Callout */}
          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 text-xs text-slate-800 dark:text-slate-200 space-y-1.5">
            <div className="font-black text-amber-900 dark:text-amber-300 flex items-center gap-2 uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              Essential Safety &amp; Diagnostic Boundary
            </div>
            <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              MATHEMATICAL ESTIMATE ≠ BREATHALYZER TEST ≠ PROOF OF SOBRIETY ≠ LEGAL PERMISSION TO DRIVE
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              A mathematical model cannot account for individual variations in gastrointestinal absorption, hepatic enzyme genetics, gastric motility, medication interactions, fatigue, or tolerance. Driving or operating heavy machinery after drinking should never be decided from an online calculator estimate.
            </p>
          </div>
        </div>

        {/* What Is BAC? */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            What Is Blood Alcohol Concentration (BAC)?
          </h3>
          <p>
            Blood Alcohol Concentration (BAC) represents the concentration of ethanol in the bloodstream, universally reported in forensic toxicology and public safety as grams of alcohol per 100 milliliters of blood (g/dL) or as a percentage:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-slate-100 text-center font-bold">
            0.08% BAC = 0.08 g / 100 mL of blood = 0.08 g/dL = 0.80 g/L (Permille ‰)
          </div>
          <p>
            The National Institute on Alcohol Abuse and Alcoholism (NIAAA) emphasizes that BAC is determined by the balance between the rate of alcohol intake, gastrointestinal absorption into the bloodstream, dilution across total body water, and the rate of metabolic clearance primarily in the liver.
          </p>
        </div>

        {/* How a BAC Calculator Works */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            How a BAC Calculator Works
          </h3>
          <p>
            The calculator translates beverage consumption into an estimated blood alcohol curve through a deterministic mathematical sequence:
          </p>
          <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
            <pre>{`Beverage Volume + ABV
         │
         ▼
Pure Ethanol Mass (grams)  = Volume (mL) × ABV × 0.7891 g/mL
         │
         ▼
Total Body Water Distribution  (Widmark r, Seidl, or Watson TBW)
         │
         ▼
Theoretical Peak BAC  = [ Alcohol Mass (g) / (Body Weight (g) × r) ] × 100
         │
         ▼
Absorption & Gastric Factor  (Stomach state delay and bioavailability)
         │
         ▼
Hepatic Elimination Over Time  (Forensic β = 0.015% per hour)
         │
         ▼
Current Modeled BAC  (Anchored to elapsed time; clamped at 0.00%)`}</pre>
          </div>
        </div>

        {/* What Is a Standard Drink? */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            What Is a Standard Drink?
          </h3>
          <p>
            In the United States, a &ldquo;standard drink&rdquo; is defined by the NIAAA and CDC as containing approximately <strong>14.0 grams (0.6 fluid ounces) of pure ethanol</strong>.
          </p>
          <p>
            Different beverage categories achieve this 14-gram alcohol threshold through different serving volumes because their alcohol concentrations vary:
          </p>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Beverage Type</th>
                  <th className="p-3">Serving Size</th>
                  <th className="p-3">Approx. ABV</th>
                  <th className="p-3">Pure Ethanol</th>
                  <th className="p-3">U.S. Standard Drinks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">Regular Beer</td>
                  <td className="p-3">12 oz (355 mL)</td>
                  <td className="p-3">5.0%</td>
                  <td className="p-3">14.0 g</td>
                  <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1.0</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">Table Wine</td>
                  <td className="p-3">5 oz (148 mL)</td>
                  <td className="p-3">12.0%</td>
                  <td className="p-3">14.0 g</td>
                  <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1.0</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">Distilled Spirits (80 Proof)</td>
                  <td className="p-3">1.5 oz (44 mL)</td>
                  <td className="p-3">40.0%</td>
                  <td className="p-3">14.0 g</td>
                  <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1.0</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">Craft IPA / Double Beer</td>
                  <td className="p-3">12 oz (355 mL)</td>
                  <td className="p-3">7.5%</td>
                  <td className="p-3">21.0 g</td>
                  <td className="p-3 font-bold text-amber-600 dark:text-amber-400">1.5</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">Strong Mixed Cocktail</td>
                  <td className="p-3">3 oz liquor (88 mL)</td>
                  <td className="p-3">40.0%</td>
                  <td className="p-3">28.0 g</td>
                  <td className="p-3 font-bold text-rose-600 dark:text-rose-400">2.0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xs">
            As highlighted by the CDC, counting &ldquo;glasses&rdquo; without accounting for volume and ABV leads to severe underestimations of alcohol intake.
          </p>
        </div>

        {/* Why Drink Size and ABV Both Matter */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Why Drink Size and ABV Both Matter
          </h3>
          <p>
            Pure alcohol mass in grams is computed directly using the physical density of pure ethanol at room temperature, which is <strong>0.7891 g/mL</strong>:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1 font-mono text-xs">
            <div>Alcohol Volume (mL) = Drink Volume (mL) &times; (ABV% &divide; 100)</div>
            <div className="font-bold text-blue-600 dark:text-blue-400">
              Pure Ethanol Mass (g) = Alcohol Volume (mL) &times; 0.7891 g/mL
            </div>
          </div>
          <p>
            For example, consuming two 12 oz (355 mL) beers at 5% ABV delivers:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
            2 &times; 355 mL &times; 0.05 = 35.5 mL pure ethanol &times; 0.7891 g/mL &asymp; <strong>28.01 grams of pure alcohol</strong> (&asymp; 2.0 standard drinks)
          </div>
        </div>

        {/* How the Widmark BAC Formula Works */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            How the Widmark BAC Formula Works
          </h3>
          <p>
            Originally formulated by Swedish physician Erik Widmark in 1932, the Widmark equation remains the cornerstone of forensic alcohol modeling. The general formula calculates theoretical peak concentration and subtracts zero-order metabolic elimination:
          </p>

          <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
            <pre>{`BAC (%) = [ Alcohol Dose (grams) / (Body Weight (grams) × r) ] × 100 - (β × Elapsed Time (hours))`}</pre>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Distribution Ratio (r)</strong>
              <p className="text-slate-600 dark:text-slate-400">
                Widmark assigned <strong>0.68 for biological males</strong> and <strong>0.55 for biological females</strong>, representing the proportion of body weight across which alcohol dissolves.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Elimination Rate (&beta;)</strong>
              <p className="text-slate-600 dark:text-slate-400">
                The forensic population median rate of hepatic alcohol elimination is <strong>0.015% BAC per hour</strong> (ranging from 0.012% to 0.020% in healthy adults).
              </p>
            </div>
          </div>

          {/* Benchmark Worked Example */}
          <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50 space-y-2">
            <div className="font-bold text-blue-900 dark:text-blue-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Benchmark Case Worked Example
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              For a <strong>165 lb (74.84 kg) male</strong> who consumed <strong>2 standard 5% beers (28.01 g pure ethanol)</strong> over <strong>2.0 hours</strong> with a light meal:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
              <li>Body mass in grams: 74,842 g</li>
              <li>Effective water distribution volume: 74,842 g &times; 0.68 = 50,893 g</li>
              <li>Theoretical Peak BAC: (28.01 g &divide; 50,893 g) &times; 100 &asymp; <strong>0.055% BAC</strong></li>
              <li>Elimination in 2.0 hours: 2.0 hrs &times; 0.015%/hr = 0.030% eliminated</li>
              <li>Current Estimated BAC: 0.055% &minus; 0.030% = <strong>0.025% BAC</strong></li>
            </ul>
          </div>
        </div>

        {/* Distribution Factors & Body Composition */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            What Is the Widmark Distribution Factor &amp; Why Does Body Composition Matter?
          </h3>
          <p>
            Ethanol is completely water-soluble and virtually insoluble in lipid (fat) tissue. Consequently, alcohol distributes almost exclusively into total body water.
          </p>
          <p>
            Two individuals with identical scale weights can have markedly different alcohol distribution volumes if their body composition differs:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              A person with higher lean muscle mass carries more intracellular water, resulting in greater alcohol dilution and a lower peak BAC. Explore your body composition benchmarks with our{" "}
              <Link href="/calculators/lean-body-mass-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
                Lean Body Mass Calculator
              </Link>{" "}
              and{" "}
              <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
                Body Fat Calculator
              </Link>
              .
            </li>
            <li>
              A person with higher body fat percentage has less total body water per pound of body weight, resulting in a higher peak blood alcohol concentration from the same alcohol dose. Compare baseline values using the{" "}
              <Link href="/calculators/ideal-weight-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
                Ideal Weight Calculator
              </Link>
              .
            </li>
          </ul>
        </div>

        {/* Biological Sex Differences in Alcohol Kinetics */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Biological Sex Differences in Alcohol Kinetics
          </h3>
          <p>
            On average, biological females have a higher proportion of body fat and a lower percentage of total body water (typically ~50% to 55%) compared to biological males (~60% to 68%).
          </p>
          <p>
            Additionally, females generally exhibit lower levels of gastric Alcohol Dehydrogenase (ADH) enzymes in the stomach lining, allowing a higher percentage of ingested alcohol to enter the bloodstream unmetabolized. This is why Widmark assigned distinct distribution factors ($r = 0.55$ vs $r = 0.68$).
          </p>
        </div>

        {/* Stomach State, Food & Absorption Timing */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Does Food Lower BAC? Gastric Emptying &amp; Peak Timing
          </h3>
          <p>
            Approximately 20% of alcohol is absorbed through the stomach wall, while 80% is absorbed in the small intestine. Because the small intestine has an immense mucosal surface area, alcohol absorption accelerates dramatically once gastric contents pass through the pyloric sphincter.
          </p>
          <p>
            Consuming a meal delays gastric emptying, keeping alcohol in the stomach longer where gastric ADH enzymes can metabolize a fraction of it before systemic entry:
          </p>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Stomach State</th>
                  <th className="p-3">Absorption Velocity</th>
                  <th className="p-3">Typical Time to Peak BAC</th>
                  <th className="p-3">Bioavailability Factor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">Empty Stomach</td>
                  <td className="p-3 text-rose-600 dark:text-rose-400 font-semibold">Rapid / Unimpeded</td>
                  <td className="p-3">15 &ndash; 30 minutes</td>
                  <td className="p-3 font-mono">1.00 (100%)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">Light Meal / Snack</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">Moderate Baseline</td>
                  <td className="p-3">30 &ndash; 45 minutes</td>
                  <td className="p-3 font-mono">1.00 (100%)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">Full / High-Fat Meal</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Substantially Delayed</td>
                  <td className="p-3">60 &ndash; 90 minutes</td>
                  <td className="p-3 font-mono">0.85 (85%)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xs italic">
            Important distinction: Eating food does not neutralize alcohol already in the bloodstream. It flattens and delays the absorption curve, moderating the peak BAC.
          </p>
        </div>

        {/* Alcohol Elimination Kinetics & Myths */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            How Fast Does the Body Eliminate Alcohol? (Can You Speed It Up?)
          </h3>
          <p>
            More than 90% of circulating ethanol is metabolized in the liver by the enzyme <strong>Alcohol Dehydrogenase (ADH)</strong> into acetaldehyde, which is then rapidly oxidized into acetate by <strong>Aldehyde Dehydrogenase (ALDH)</strong>.
          </p>
          <p>
            Because liver ADH enzymes become fully saturated at very low alcohol concentrations (around 0.01% BAC), alcohol elimination follows <strong>zero-order kinetics</strong>: the liver clears a constant amount of alcohol per hour, regardless of how much alcohol is in the blood:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-center font-bold text-slate-900 dark:text-slate-100">
            Constant Elimination Rate: &beta; = 0.015% BAC per hour (0.15 g/L per hour)
          </div>
          <p>
            The NIAAA explicitly warns that common home remedies&mdash;such as drinking strong coffee, taking cold showers, exercising, or inducing vomiting&mdash;<strong>have zero effect on hepatic enzyme oxidation</strong>. Caffeine may stimulate alertness, but it creates an alert drunk state without improving motor reaction time or lowering blood alcohol.
          </p>
        </div>

        {/* Model Comparisons: Widmark vs Seidl vs Watson */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Comparing Widmark, Seidl, and Watson BAC Models
          </h3>
          <p>
            To avoid reliance on a single historic equation, this calculator implements three respected clinical models:
          </p>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Model</th>
                  <th className="p-3">Key Anthropometric Variables</th>
                  <th className="p-3">Underlying Principle</th>
                  <th className="p-3">Benchmark Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">Widmark Standard (1932)</td>
                  <td className="p-3">Weight, Sex</td>
                  <td className="p-3">Fixed sex ratio (0.68 male / 0.55 female)</td>
                  <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">0.025% BAC</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">Seidl Formula (1990)</td>
                  <td className="p-3">Height, Weight, Sex</td>
                  <td className="p-3">Height-weight adjusted anthropometric factor</td>
                  <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">0.018% BAC</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">Watson TBW (1980)</td>
                  <td className="p-3">Age, Height, Weight, Sex</td>
                  <td className="p-3">Clinical total body water regression equations</td>
                  <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">0.021% BAC</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xs">
            Benchmark scenario: 165 lb male, 5&prime;10&Prime;, age 30, 2 standard beers, 2.0 hours elapsed. The models produce slightly different values because each models total body water distribution using different mathematical regressions.
          </p>
        </div>

        {/* Legal BAC Limits & Driving Safety */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Legal BAC Limits and Impairment Thresholds
          </h3>
          <p>
            The National Highway Traffic Safety Administration (NHTSA) documents that critical driving faculties&mdash;including divided attention, visual tracking, and emergency reaction time&mdash;begin degrading at BAC levels as low as <strong>0.02%</strong>.
          </p>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Jurisdiction / Category</th>
                  <th className="p-3">Per Se Legal Limit</th>
                  <th className="p-3">Notes &amp; Enforcement Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">U.S. General Drivers (49 States &amp; DC)</td>
                  <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">0.08% BAC</td>
                  <td className="p-3">Per se illegal driving limit across virtually all U.S. states.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">State of Utah</td>
                  <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">0.05% BAC</td>
                  <td className="p-3">Enacted strict 0.05% per se threshold in December 2018.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">Commercial Drivers (CDL)</td>
                  <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">0.04% BAC</td>
                  <td className="p-3">Federal Motor Carrier Safety Administration (FMCSA) limit.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">Under 21 (Zero Tolerance)</td>
                  <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">0.00% &ndash; 0.02%</td>
                  <td className="p-3">Zero tolerance laws active across all 50 U.S. states.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">International (EU, Australia, UK)</td>
                  <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">0.02% &ndash; 0.05%</td>
                  <td className="p-3">0.05% in EU/Australia; 0.02% in Norway, Sweden, and Poland.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Critical Driving Notice */}
          <div className="p-4 bg-rose-50/70 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/50 text-xs text-slate-800 dark:text-slate-200 space-y-1.5">
            <div className="font-black text-rose-900 dark:text-rose-300 flex items-center gap-2 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              Critical Driving &amp; Sobriety Notice
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              A calculator output below 0.08% or 0.05% does <strong>NOT</strong> prove that you are safe or legal to drive. In most jurisdictions, a driver can be charged with DUI/DWI at any detectable alcohol level if observable impairment is present. The safest choice after consuming alcohol is to designate a sober driver or use rideshare services.
            </p>
          </div>
        </div>

        {/* Alcohol Calories & Energy Expenditure */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Alcohol Calories and Metabolic Impact
          </h3>
          <p>
            Pure ethanol is calorie-dense, yielding <strong>7 kcal per gram</strong>&mdash;nearly twice as much energy as carbohydrates or proteins (4 kcal/g) and close to dietary fats (9 kcal/g):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
            Alcohol Calories = Pure Ethanol Mass (g) &times; 7 kcal/g
          </div>
          <p>
            In our two-beer benchmark (28.01 g ethanol), pure alcohol contributes approximately <strong>196 kcal</strong>, excluding residual unfermented sugars, starches, and mixers in the beverage. If you are balancing calorie intake against daily expenditure, consult our{" "}
            <Link href="/calculators/calories-burned-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Calories Burned Calculator
            </Link>{" "}
            and{" "}
            <Link href="/calculators/calorie-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Calorie Calculator
            </Link>
            .
          </p>
        </div>

        {/* Alcohol Overdose & Emergency Warning */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <div className="p-4 bg-red-50/80 dark:bg-red-950/40 rounded-xl border border-red-300 dark:border-red-900/60 text-xs text-slate-800 dark:text-slate-200 space-y-2">
            <div className="font-black text-red-900 dark:text-red-300 flex items-center gap-2 uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
              Medical Emergency: Suspected Alcohol Overdose
            </div>
            <p className="font-bold text-slate-900 dark:text-slate-100">
              A BAC calculator is not an emergency clinical diagnostic tool.
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              If someone is difficult to awaken, unconscious, breathing fewer than 8 breaths per minute or irregularly, exhibiting pale, clammy, or bluish skin, vomiting while semi-conscious, or experiencing seizures, <strong>call 911 (or local emergency services) immediately</strong>. Never leave an unconscious person to &ldquo;sleep it off.&rdquo;
            </p>
          </div>
        </div>

        {/* Methodology & Sources */}
        <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Methodology &amp; Scientific Sources
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Widmark Equation (1932)</strong>
              <p className="text-slate-600 dark:text-slate-400">
                Widmark, E. M. P. (1932). <em>Die theoretischen Grundlagen und die praktische Verwendbarkeit der gerichtlich-medizinischen Alkoholbestimmung</em>. Berlin: Urban &amp; Schwarzenberg.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Seidl Anthropometric Formula (1990)</strong>
              <p className="text-slate-600 dark:text-slate-400">
                Seidl, S., Jensen, U., &amp; Alt, A. (1990). The calculation of blood alcohol concentration in females and males using anthropometric data. <em>Blutalkohol</em>, 27(6), 381&ndash;392.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Watson Total Body Water (1980)</strong>
              <p className="text-slate-600 dark:text-slate-400">
                Watson, P. E., Watson, I. D., &amp; Batt, R. D. (1980). Total body water volumes for adult males and females estimated from simple anthropometric measurements. <em>Am J Clin Nutr</em>, 33(1), 27&ndash;39.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Forensic Elimination Kinetics (2010)</strong>
              <p className="text-slate-600 dark:text-slate-400">
                Jones, A. W. (2010). Evidence-based survey of the elimination rates of ethanol from blood with applications in forensic casework and alcohol toxicology. <em>Forensic Sci Int</em>, 200(1-3), 1&ndash;20.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">NIAAA &amp; CDC Standard Drink Definitions</strong>
              <p className="text-slate-600 dark:text-slate-400">
                National Institute on Alcohol Abuse and Alcoholism (NIAAA). <em>What Is A Standard Drink?</em> U.S. Department of Health and Human Services.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">NHTSA Impaired Driving Thresholds</strong>
              <p className="text-slate-600 dark:text-slate-400">
                National Highway Traffic Safety Administration (NHTSA). <em>The ABCs of BAC: A Guide to Impaired Driving and Blood Alcohol Concentration</em>.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Frequently Asked Questions (Unfolded by Default) */}
      <section className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-100 dark:border-blue-900/50">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Evidence-based answers on blood alcohol concentration, Widmark formula, alcohol elimination, and legal limits.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-2">
          {bacFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl p-4 sm:p-5 space-y-2.5 transition-all"
            >
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 flex items-start gap-2.5">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-950/60 px-2 py-0.5 rounded shrink-0 mt-0.5">
                  Q{idx + 1}
                </span>
                <span>{faq.question}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-7 sm:pl-8">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BacContent;
