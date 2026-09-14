"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ShieldCheck, Dumbbell, Activity, Flame } from "lucide-react";
import { one_rep_max_calculatorFaqs } from "@/app/calculators/one-rep-max-calculator/faq";

export function OneRepMaxContent() {
  // All 24 FAQs open/unfolded by default matching 401(k) format
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: one_rep_max_calculatorFaqs.length }, (_, i) => i))
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Calculate Your One Rep Max (1RM)
          </h2>
          <p>
            Your one-rep max, or 1RM, is the heaviest weight you can successfully lift for one repetition of a specific exercise under a defined technique standard. It is one of the most useful reference points in strength training because loads can then be expressed as percentages of that maximum.
          </p>
          <p>
            You do not always need to perform a true maximum attempt to estimate your 1RM. When you complete a submaximal set—such as 185 lb for 5 repetitions—an estimated 1RM (e1RM) formula can use the weight and repetitions to predict what your one-repetition maximum might be.
          </p>
          <p>
            This One Rep Max Calculator compares seven commonly used 1RM equations:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Epley (1985)</strong></li>
            <li><strong>Brzycki (1993)</strong></li>
            <li><strong>Lombardi (1989)</strong></li>
            <li><strong>Mayhew et al. (1992)</strong></li>
            <li><strong>O'Conner et al. (1989)</strong></li>
            <li><strong>Wathan (1994)</strong></li>
            <li><strong>Lander (1985)</strong></li>
          </ul>
          <p>
            It then calculates a composite estimate from those seven results and converts that estimate into useful percentage-based training weights. You can easily use our{" "}
            <Link href="/calculators/percentage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline hover:text-blue-800 dark:hover:text-blue-300">
              Percentage Calculator
            </Link>{" "}
            to compute any customized fractional target weights.
          </p>
          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/20 rounded-xl border border-amber-200/80 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 space-y-1.5 mt-2">
            <div className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-xs text-amber-800 dark:text-amber-300">
              <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
              Important Safety &amp; Training Notice
            </div>
            <p className="text-xs leading-relaxed text-amber-900/90 dark:text-amber-200/90">
              An estimated 1RM is not the same thing as a directly tested maximum. Prediction error varies with the lifter, exercise, repetition count, technique, fatigue, and how close the set was to failure. The National Strength and Conditioning Association (NSCA) notes that the number of repetitions someone can perform at a particular percentage of 1RM can vary substantially across different exercises and individual lifters.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is 1RM?
          </h2>
          <p>
            1RM means one-repetition maximum. It is the maximum load you can lift for one successful repetition of a particular exercise while maintaining the required technique.
          </p>
          <p>
            For example, if your best technically valid bench press is 200 lb for one repetition, your tested bench-press 1RM is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            Tested 1RM = <strong>200 lb</strong>
          </div>
          <p>
            A 1RM is exercise-specific. Your bench press 1RM, squat 1RM, and deadlift 1RM are different numbers because each movement has different biomechanics, moment arms, and muscle recruitment demands. That is why this calculator asks you to select the exercise being evaluated.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Tested 1RM vs Estimated 1RM
          </h2>
          <p>
            There are two different ideas that are often confused:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Tested 1RM
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You actually perform a successful single repetition with the weight.
              </p>
              <div className="font-mono text-xs pt-1">
                200 lb × 1 rep = <strong>200 lb tested 1RM</strong>
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Estimated 1RM
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You perform several repetitions with a submaximal weight and use an equation to estimate your one-repetition maximum.
              </p>
              <div className="font-mono text-xs pt-1">
                185 lb × 5 reps &rarr; <strong>estimated 1RM</strong>
              </div>
            </div>
          </div>
          <p>
            Submaximal estimation is useful because repeatedly testing a true maximum can be more physically demanding and stressful on the central nervous system than using a controlled submaximal set. NSCA describes both RM-based loading and percentage-of-1RM loading as standard approaches to resistance-training programming.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How the One Rep Max Calculator Works
          </h2>
          <p>
            The calculation workflow follows a structured sequence:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-center space-y-1 text-slate-700 dark:text-slate-300 my-2">
            <div>Weight Lifted (W) + Repetitions Completed (R)</div>
            <div>&darr;</div>
            <div>Seven Validated 1RM Equations</div>
            <div>&darr;</div>
            <div>Formula-by-Formula Estimates</div>
            <div>&darr;</div>
            <div>Composite 1RM (Arithmetic Mean)</div>
            <div>&darr;</div>
            <div>Percentage-Based Training Loads</div>
            <div>&darr;</div>
            <div>Training Zones</div>
          </div>
          <p>
            This approach is valuable because one equation does not necessarily produce the exact same answer as another. Instead of hiding that variance behind an opaque black box, this calculator displays the individual formula estimates alongside the resulting composite consensus.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Calculate 1RM
          </h2>
          <p>
            The calculator starts with:
          </p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li><strong>Weight lifted = W</strong></li>
            <li><strong>Repetitions = R</strong></li>
          </ul>
          <p>
            Each equation then estimates the weight you might be capable of lifting for one repetition. For example, suppose you lifted:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            Input: <strong>185 lb × 5 reps</strong>
          </div>
          <p>
            The calculator produces these estimates:
          </p>
          <div className="overflow-x-auto my-2">
            <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold">
                <tr>
                  <th className="p-2.5 border-b border-slate-200 dark:border-slate-700/60">Formula</th>
                  <th className="p-2.5 border-b border-slate-200 dark:border-slate-700/60">Estimated 1RM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
                <tr><td className="p-2.5 font-medium">Epley</td><td className="p-2.5 font-mono">215.8 lb</td></tr>
                <tr><td className="p-2.5 font-medium">Brzycki</td><td className="p-2.5 font-mono">208.1 lb</td></tr>
                <tr><td className="p-2.5 font-medium">Lombardi</td><td className="p-2.5 font-mono">217.3 lb</td></tr>
                <tr><td className="p-2.5 font-medium">Mayhew et al.</td><td className="p-2.5 font-mono">220.2 lb</td></tr>
                <tr><td className="p-2.5 font-medium">O'Conner et al.</td><td className="p-2.5 font-mono">208.1 lb</td></tr>
                <tr><td className="p-2.5 font-medium">Wathan</td><td className="p-2.5 font-mono">215.7 lb</td></tr>
                <tr><td className="p-2.5 font-medium">Lander</td><td className="p-2.5 font-mono">210.4 lb</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The implementation then calculates the unweighted arithmetic mean of those seven outputs: <strong>213.7 lb</strong>. Those values and the averaging methodology are part of the calculator's validated implementation.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Epley 1RM Formula
          </h2>
          <p>The Epley equation (1985) is:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM = W × (1 + R / 30)
          </div>
          <p>For 185 lb × 5 reps:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM = 185 × (1 + 5/30) = 185 × 1.1667 &approx; <strong>215.8 lb</strong>
          </div>
          <p>The calculator uses this equation as one of its primary baseline estimates.</p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Brzycki 1RM Formula
          </h2>
          <p>The Brzycki equation (1993) is:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM = W × 36 / (37 − R)
          </div>
          <p>For 185 lb × 5 reps:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM = 185 × 36 / 32 = 185 × 1.125 &approx; <strong>208.1 lb</strong>
          </div>
          <p>
            This provides a lower, more conservative estimate than Epley in the example. A useful reminder is that different equations can diverge even when starting with the exact same input performance. Published comparisons of repetition-based equations confirm high validity across formulas while noting that equation performance diverges as repetitions increase.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Lombardi 1RM Formula
          </h2>
          <p>The Lombardi equation (1989) is:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM = W × R^0.10
          </div>
          <p>For 185 lb × 5 reps:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM = 185 × 5^0.10 &approx; <strong>217.3 lb</strong>
          </div>
          <p>Unlike Epley and O'Conner, Lombardi models an exponential, nonlinear relationship between repetitions and estimated maximum strength.</p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Mayhew 1RM Formula
          </h2>
          <p>The Mayhew et al. equation (1992) is:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM = 100W / [52.2 + 41.9 × e^(-0.055R)]
          </div>
          <p>For 185 lb × 5 reps:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM &approx; <strong>220.2 lb</strong>
          </div>
          <p>
            This produces the highest estimate among the seven formulas in this particular example. That does not make it automatically &ldquo;more accurate&rdquo;; it simply illustrates that different empirical models capture different curve trajectories.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            O'Conner 1RM Formula
          </h2>
          <p>The O'Conner et al. equation (1989) is:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM = W × (1 + 0.025R)
          </div>
          <p>For 185 lb × 5 reps:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM = 185 × (1 + 0.125) &approx; <strong>208.1 lb</strong>
          </div>
          <p>This closely aligns with the Brzycki estimate for the same submaximal performance.</p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Wathan 1RM Formula
          </h2>
          <p>The Wathan equation (1994) is:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM = 100W / [48.8 + 53.8 × e^(-0.075R)]
          </div>
          <p>For 185 lb × 5 reps:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM &approx; <strong>215.7 lb</strong>
          </div>
        </section>

        {/* Section 12 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Lander 1RM Formula
          </h2>
          <p>The Lander equation (1985) is:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM = 100W / (101.3 − 2.67123R)
          </div>
          <p>For 185 lb × 5 reps:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1RM &approx; <strong>210.4 lb</strong>
          </div>
        </section>

        {/* Section 13 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Does Each 1RM Formula Give a Different Answer?
          </h2>
          <p>
            Because each formula represents a distinct mathematical and empirical model developed from specific research cohorts. Using 185 lb × 5 reps, this calculator produces a range from <strong>208.1 lb to 220.2 lb</strong>, creating a spread of approximately <strong>12.1 lb</strong>.
          </p>
          <p>
            That spread is valuable information. It serves as an objective reminder that an estimated 1RM is a probabilistic forecast, not a physical measurement. NSCA reviews emphasize that percentage-of-1RM programming is straightforward and practical, but repetitions completed at identical relative intensities differ among lifters and movement patterns.
          </p>
          <p>
            Rather than asking &ldquo;Which formula is the single true answer?&rdquo;, a more practical question is: <em>How tightly do the reliable estimates cluster, and how should that consensus guide training loads?</em>
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is the Composite 1RM?
          </h2>
          <p>
            This calculator combines the seven formula outputs using an unweighted arithmetic mean:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm space-y-1">
            <div>215.8 + 208.1 + 217.3 + 220.2 + 208.1 + 215.7 + 210.4 = 1495.6</div>
            <div>1495.6 ÷ 7 = 213.657... &approx; <strong>213.7 lb</strong></div>
          </div>
          <p>
            This number is best understood as a composite consensus estimate, dampening the positive and negative outliers of any individual formula.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Accurate Is a 1RM Calculator?
          </h2>
          <p>
            A 1RM calculator is an informative programming aid, but it cannot know your actual physiological limit with laboratory precision. Accuracy is influenced by:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Repetition count and fatigue accumulation;</li>
            <li>Proximity to concentric failure (reps in reserve);</li>
            <li>Execution technique and range of motion;</li>
            <li>Exercise selection (multi-joint vs single-joint);</li>
            <li>Lifting experience and neurological adaptation;</li>
            <li>Individual muscle fiber distribution and strength-endurance characteristics.</li>
          </ul>
          <p>
            When monitoring conditioning, you can pair strength work with our{" "}
            <Link href="/calculators/target-heart-rate-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline hover:text-blue-800 dark:hover:text-blue-300">
              Target Heart Rate Calculator
            </Link>{" "}
            and{" "}
            <Link href="/calculators/calories-burned-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline hover:text-blue-800 dark:hover:text-blue-300">
              Calories Burned Calculator
            </Link>{" "}
            to ensure recovery aligns with energy expenditure.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Fewer Repetitions Usually Make a Better 1RM Estimate
          </h2>
          <p>
            Most 1RM equations are designed around submaximal performance in lower-repetition sets. As the repetition count rises (especially past 10 repetitions), muscular endurance, anaerobic glycolysis, and cardiovascular fatigue become increasingly dominant factors.
          </p>
          <p>
            For example, a lifter who can perform 20 repetitions with a given weight may have exceptional local muscular endurance. That endurance capacity does not guarantee an equation will predict their single-rep neuromuscular maximum with the same precision as a 3-to-5 repetition set.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Rep Range Should I Use for 1RM Estimation?
          </h2>
          <p>
            A practical starting point is a submaximal set in the <strong>2 to 6 repetition range</strong> performed with technical consistency near concentric failure.
          </p>
          <p>Key guidelines include:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The weight should be heavy enough to require high motor-unit recruitment;</li>
            <li>Technique and range of motion must remain strict throughout every repetition;</li>
            <li>The set should represent genuine near-maximal effort (1 to 2 reps in reserve);</li>
            <li>Avoid treating any resulting mathematical output as an absolute guarantee.</li>
          </ul>
        </section>

        {/* Section 18 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Happens When You Enter 1 Rep?
          </h2>
          <p>
            When the input is <strong>Weight = 185 lb</strong> and <strong>Reps = 1</strong>, the calculator recognizes that you have directly tested your maximum:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            Directly Measured 1RM = <strong>185.0 lb</strong>
          </div>
          <p>
            The calculator preserves the full seven-formula layout, reporting 185.0 lb across all models with an explicit note that this represents a direct test rather than a submaximal estimate.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use Your 1RM to Set Training Weight
          </h2>
          <p>
            Once you have an estimated 1RM, you can express daily training loads as a percentage of that reference point. For example, with a composite 1RM of <strong>213.7 lb</strong>:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-2 text-center text-xs font-mono">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 block text-[10px]">90% 1RM</span>
              <strong>192.3 lb</strong>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 block text-[10px]">87% 1RM</span>
              <strong>185.9 lb</strong>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 block text-[10px]">80% 1RM</span>
              <strong>171.0 lb</strong>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 block text-[10px]">75% 1RM</span>
              <strong>160.3 lb</strong>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 block text-[10px]">70% 1RM</span>
              <strong>149.6 lb</strong>
            </div>
          </div>
          <p>
            NSCA outlines percentage-of-1RM loading as a standard method to define relative intensity: the training load is calculated simply by multiplying 1RM by the target percentage.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1RM Percentage Chart
          </h2>
          <p>
            Using the composite 1RM benchmark of <strong>213.7 lb</strong>, the standard progression from 1RM through 12RM is:
          </p>
          <div className="overflow-x-auto my-2">
            <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold">
                <tr>
                  <th className="p-2.5 border-b border-slate-200 dark:border-slate-700/60">Repetition Maximum</th>
                  <th className="p-2.5 border-b border-slate-200 dark:border-slate-700/60">Approx. % 1RM</th>
                  <th className="p-2.5 border-b border-slate-200 dark:border-slate-700/60">Estimated Load</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 font-mono">
                <tr><td className="p-2.5 font-sans font-medium">1RM</td><td className="p-2.5">100%</td><td className="p-2.5">213.7 lb</td></tr>
                <tr><td className="p-2.5 font-sans font-medium">2RM</td><td className="p-2.5">95%</td><td className="p-2.5">203.0 lb</td></tr>
                <tr><td className="p-2.5 font-sans font-medium">3RM</td><td className="p-2.5">93%</td><td className="p-2.5">198.7 lb</td></tr>
                <tr><td className="p-2.5 font-sans font-medium">4RM</td><td className="p-2.5">90%</td><td className="p-2.5">192.3 lb</td></tr>
                <tr><td className="p-2.5 font-sans font-medium">5RM</td><td className="p-2.5">87%</td><td className="p-2.5">185.9 lb</td></tr>
                <tr><td className="p-2.5 font-sans font-medium">6RM</td><td className="p-2.5">85%</td><td className="p-2.5">181.6 lb</td></tr>
                <tr><td className="p-2.5 font-sans font-medium">7RM</td><td className="p-2.5">83%</td><td className="p-2.5">177.4 lb</td></tr>
                <tr><td className="p-2.5 font-sans font-medium">8RM</td><td className="p-2.5">80%</td><td className="p-2.5">171.0 lb</td></tr>
                <tr><td className="p-2.5 font-sans font-medium">9RM</td><td className="p-2.5">77%</td><td className="p-2.5">164.5 lb</td></tr>
                <tr><td className="p-2.5 font-sans font-medium">10RM</td><td className="p-2.5">75%</td><td className="p-2.5">160.3 lb</td></tr>
                <tr><td className="p-2.5 font-sans font-medium">11RM</td><td className="p-2.5">73%</td><td className="p-2.5">156.0 lb</td></tr>
                <tr><td className="p-2.5 font-sans font-medium">12RM</td><td className="p-2.5">70%</td><td className="p-2.5">149.6 lb</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 21 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Does 80% of 1RM Mean?
          </h2>
          <p>
            If your 1RM is 200 lb, calculating 80% yields:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            80% × 200 lb = <strong>160 lb</strong>
          </div>
          <p>
            While 80% of 1RM is conventionally associated with approximately 8 repetitions, it does not guarantee an exact repetition count. NSCA emphasizes that repetitions achieved at any given percentage can vary across athletes, exercises, and conditioning states.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1RM Training Zones
          </h2>
          <p>
            Training intensities are structured into specialized neuromuscular zones:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Explosive Power (50%–70% 1RM)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Aims to develop maximal rate of force development (RFD). ACSM's 2026 guidelines recommend 30%–70% 1RM with rapid concentric intent.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Hypertrophy (67%–85% 1RM)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Focuses on muscle growth across 6 to 12 repetitions. ACSM highlights total volume and progression rather than a single fixed percentage.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Maximal Strength (85%–100% 1RM)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Focuses on heavy neural drive and motor unit recruitment (1 to 5 repetitions). ACSM highlights loads around 80%+ for pure strength.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Muscular Endurance (&lt;67% 1RM)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Higher-repetition sets (12+ repetitions) improving glycolytic buffering and metabolic work capacity.
              </p>
            </div>
          </div>
        </section>

        {/* Section 23 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Your 5RM May Not Be Exactly 87% of Your 1RM
          </h2>
          <p>
            A formula table offers a validated benchmark, but individual fatigue resistance varies. Two lifters with the exact same 1RM may possess different fiber-type ratios: one lifter might perform 5 repetitions smoothly with 87%, while another fatigues on the fourth rep. Percentage charts should serve as flexible planning baselines rather than rigid universal laws.
          </p>
        </section>

        {/* Section 24 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Choose the Right 1RM for Training
          </h2>
          <p>
            Many structured strength systems deliberately program from a <em>Training Max (TM)</em>—typically 90% of a true tested or estimated 1RM. This buffer accommodates normal day-to-day variations in sleep, nutrition, recovery, and psychological stress, preventing overreaching while ensuring consistent progress.
          </p>
        </section>

        {/* Section 25 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Exercise Selection Matters
          </h2>
          <p>
            A 1RM is meaningful only for the specific movement pattern tested:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-center">
            Bench Press 1RM &ne; Squat 1RM &ne; Deadlift 1RM
          </div>
          <p>
            Large lower-body compound movements recruit significantly more muscle mass and produce different fatigue curves than upper-body pressing movements. Tracking body composition alongside your lifts using our{" "}
            <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline hover:text-blue-800 dark:hover:text-blue-300">
              Body Fat Calculator
            </Link>{" "}
            helps quantify relative strength (strength-to-bodyweight ratio).
          </p>
        </section>

        {/* Section 26 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Pounds vs Kilograms
          </h2>
          <p>
            The calculator supports both US Pounds (lb) and Metric Kilograms (kg) using the international avoirdupois standard:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            1 lb = 0.45359237 kg &nbsp;|&nbsp; 185.0 lb &approx; 83.9 kg &nbsp;|&nbsp; 83.9 kg &approx; 185.0 lb
          </div>
          <p>
            Conversion logic is strictly stabilized to prevent iterative rounding drift when toggling between measurement systems.
          </p>
        </section>

        {/* Section 27 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Example: Estimating 1RM from 185 lb × 5
          </h2>
          <p>
            Suppose you complete 185 lb for 5 reps on the Bench Press:
          </p>
          <ul className="list-disc pl-5 space-y-0.5 font-mono text-xs">
            <li>Epley: 215.8 lb</li>
            <li>Brzycki: 208.1 lb</li>
            <li>Lombardi: 217.3 lb</li>
            <li>Mayhew et al.: 220.2 lb</li>
            <li>O'Conner et al.: 208.1 lb</li>
            <li>Wathan: 215.7 lb</li>
            <li>Lander: 210.4 lb</li>
          </ul>
          <p>
            The composite average is <strong>213.7 lb</strong>, providing working loads of <strong>192.3 lb (90%)</strong>, <strong>185.9 lb (87%)</strong>, <strong>171.0 lb (80%)</strong>, and <strong>160.3 lb (75%)</strong>.
          </p>
        </section>

        {/* Section 28 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Example: Why Formula Spread Matters
          </h2>
          <p>
            Comparing the dispersion of estimates provides critical training insight:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Case A (Tight Cluster):</strong> Estimates range between 200 lb and 203 lb. High confidence in the baseline.</li>
            <li><strong>Case B (Wide Spread):</strong> Estimates range between 180 lb and 230 lb. Indicates high repetition counts or formula divergence; caution is warranted when programming heavy singles.</li>
          </ul>
        </section>

        {/* Section 29 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Should You Actually Test Your 1RM?
          </h2>
          <p>
            A true 1RM test provides definitive verification, but requires structured peaking, technical mastery, extensive warm-ups, and qualified spotters. For intermediate lifters and fitness enthusiasts, estimating 1RM from a submaximal set offers high programming utility with substantially lower orthopedic and neurological risk.
          </p>
        </section>

        {/* Section 30 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How the 1RM Calculator Can Help With Programming
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-center space-y-1 text-slate-700 dark:text-slate-300 my-2">
            <div>Estimated 1RM &rarr; Choose Relative Intensity &rarr; Calculate Working Load</div>
            <div>&darr;</div>
            <div>Execute Sets + Reps &rarr; Track Performance &rarr; Auto-Regulate</div>
          </div>
          <p>
            This closed-loop feedback mechanism enables lifters to systematically implement progressive overload without guessing bar weight.
          </p>
        </section>

        {/* Section 31 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common 1RM Calculation Mistakes
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Using high-rep sets:</strong> Estimating 1RM from a 15-to-20 rep set introduces substantial muscular endurance distortion.</li>
            <li><strong>Treating one formula as gospel:</strong> Relying on a single formula risks accepting an outlier prediction.</li>
            <li><strong>Compromising technique:</strong> Half-reps or bouncing weights falsely inflates repetition counts.</li>
            <li><strong>Confusing estimated 5RM with tested 5RM:</strong> A calculated 87% is an estimation, not an empirical guarantee.</li>
            <li><strong>Ignoring fatigue &amp; recovery:</strong> Calculating numbers in isolation without adjusting for sleep, hydration, and central fatigue.</li>
          </ul>
        </section>

        {/* Section 32 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Is the 1RM Calculator Suitable for Beginners?
          </h2>
          <p>
            Yes, as an educational tool. However, beginners experience rapid motor unit recruitment gains from session to session. Focusing on movement consistency, bar path, and progressive volume is far more valuable in the initial months than chasing single-rep maximums.
          </p>
        </section>

        {/* Section 33 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Is 1RM Useful for Hypertrophy?
          </h2>
          <p>
            Yes. 1RM percentages allow lifters to calibrate loading within the effective hypertrophy threshold (typically 65%–85% of 1RM). ACSM's 2026 position stand reinforces that muscle growth occurs across a spectrum of loads when sets are taken sufficiently close to failure.
          </p>
        </section>

        {/* Section 34 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Is 1RM Useful for Strength Training?
          </h2>
          <p>
            Extremely so. Strength adaptations depend heavily on high-threshold motor unit recruitment and neural synchronization. Structuring primary compound work at 80% to 95% of 1RM provides the specific stimulus required for absolute force expression.
          </p>
        </section>

        {/* Section 35 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1RM Calculator vs Direct 1RM Testing
          </h2>
          <div className="overflow-x-auto my-2">
            <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold">
                <tr>
                  <th className="p-2.5 border-b border-slate-200 dark:border-slate-700/60">Method</th>
                  <th className="p-2.5 border-b border-slate-200 dark:border-slate-700/60">Primary Advantage</th>
                  <th className="p-2.5 border-b border-slate-200 dark:border-slate-700/60">Key Limitation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-xs">
                <tr><td className="p-2.5 font-medium">Direct 1RM Test</td><td className="p-2.5">Measures actual physical single</td><td className="p-2.5">High fatigue &amp; injury risk</td></tr>
                <tr><td className="p-2.5 font-medium">Epley Formula</td><td className="p-2.5">Simple, standard benchmark</td><td className="p-2.5">Submaximal mathematical estimate</td></tr>
                <tr><td className="p-2.5 font-medium">Brzycki Formula</td><td className="p-2.5">Conservative, accurate 2-6 reps</td><td className="p-2.5">Submaximal mathematical estimate</td></tr>
                <tr><td className="p-2.5 font-medium">Lombardi Formula</td><td className="p-2.5">Nonlinear exponential curve</td><td className="p-2.5">Submaximal mathematical estimate</td></tr>
                <tr><td className="p-2.5 font-medium">Mayhew Formula</td><td className="p-2.5">Accounts for high-rep curvature</td><td className="p-2.5">Submaximal mathematical estimate</td></tr>
                <tr><td className="p-2.5 font-medium">O'Conner Formula</td><td className="p-2.5">Direct linear extrapolation</td><td className="p-2.5">Submaximal mathematical estimate</td></tr>
                <tr><td className="p-2.5 font-medium">Wathan Formula</td><td className="p-2.5">Sigmoidal athletic population fit</td><td className="p-2.5">Submaximal mathematical estimate</td></tr>
                <tr><td className="p-2.5 font-medium">Lander Formula</td><td className="p-2.5">Empirical powerlifting match</td><td className="p-2.5">Submaximal mathematical estimate</td></tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50 font-semibold"><td className="p-2.5">Seven-Formula Composite</td><td className="p-2.5">Eliminates single-equation bias</td><td className="p-2.5">Still an empirical prediction</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 36 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            A Better Way to Use Your 1RM Estimate
          </h2>
          <p>
            Think of your estimated 1RM as a calibrated intensity beacon:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-center space-y-1 text-slate-700 dark:text-slate-300 my-2">
            <div>Estimated 1RM Reference Point</div>
            <div>&darr;</div>
            <div className="grid grid-cols-3 gap-2 pt-1 font-sans">
              <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-900">
                <strong>90% 1RM</strong>
                <span className="block text-[10px] text-slate-500">Heavy Neural Strength</span>
              </div>
              <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-900">
                <strong>80% 1RM</strong>
                <span className="block text-[10px] text-slate-500">Myofibrillar Hypertrophy</span>
              </div>
              <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-900">
                <strong>70% 1RM</strong>
                <span className="block text-[10px] text-slate-500">Work Capacity &amp; Volume</span>
              </div>
            </div>
          </div>
          <p>
            The goal is not to force every workout to match an arbitrary number, but to establish a standardized method for describing and adjusting training volume and intensity over time.
          </p>
        </section>

        {/* Section 37 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Final Takeaway
          </h2>
          <p>
            A One Rep Max Calculator is most valuable when you understand what its numbers represent. A direct 1RM is an actual physical test; an estimated 1RM is a submaximal projection. By calculating a 7-formula consensus mean (Epley + Brzycki + Lombardi + Mayhew + O'Conner + Wathan + Lander), this platform offers complete mathematical transparency rather than hiding behind an unexplained single formula.
          </p>
          <p>
            Use the resulting percentage loads as training references, auto-regulating based on technical execution, sleep, recovery, and your specific athletic goals.
          </p>
        </section>
      </div>

      {/* 2. DEDICATED FREQUENTLY ASKED QUESTIONS SECTION (UNFOLDED BY DEFAULT) */}
      <div className="pt-8 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
            Frequently Asked Questions
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {one_rep_max_calculatorFaqs.length} Questions
          </span>
        </div>

        <div className="space-y-3">
          {one_rep_max_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-slate-700/70 overflow-hidden bg-slate-50/50 dark:bg-slate-800/30 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-4 flex items-center justify-between gap-3 text-slate-900 dark:text-slate-100 font-bold text-xs sm:text-sm hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default OneRepMaxContent;
