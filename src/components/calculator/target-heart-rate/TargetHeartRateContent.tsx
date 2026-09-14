"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ShieldCheck } from "lucide-react";
import { target_heart_rate_calculatorFaqs } from "@/app/calculators/target-heart-rate-calculator/faq";

export function TargetHeartRateContent() {
  // All 19 FAQs open/unfolded by default matching 401(k) format
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 19 }, (_, i) => i))
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
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT (25 COMPLETE SECTIONS) */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Target Heart Rate Calculator: Calculate Your Training Heart Rate &amp; Zones
          </h2>
          <p>
            Knowing your heart rate during exercise can help you understand how hard you are working. A target heart rate is a practical range of beats per minute (BPM) associated with a chosen exercise intensity. The American Heart Association commonly uses about 50%–70% of maximum heart rate for moderate-intensity exercise and 70%–85% for vigorous activity, while emphasizing that these figures are averages and should be treated as general guidance rather than exact personal limits.
          </p>
          <p>
            This Target Heart Rate Calculator estimates your maximum heart rate, heart rate reserve, target heart rate, and five training zones. It supports the traditional percentage-of-MHR method, the Karvonen heart-rate-reserve method, multiple published maximum-heart-rate equations, and a Borg RPE reference.
          </p>
          <p>
            Enter your age and resting heart rate, or enter a known maximum heart rate, to see your target BPM and training-zone ranges.
          </p>

          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/20 rounded-xl border border-amber-200/80 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 space-y-1.5 mt-2">
            <div className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-xs text-amber-800 dark:text-amber-300">
              <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
              Important Health Information
            </div>
            <p className="text-xs leading-relaxed text-amber-900/90 dark:text-amber-200/90">
              This calculator provides estimates for exercise planning and education. It is not a medical diagnostic tool and does not determine a medically appropriate exercise prescription. Heart-rate response varies between people and can be affected by medications, fitness, health conditions, temperature, hydration, stress, sleep, and exercise type. If you have a cardiovascular condition, experience concerning symptoms during exercise, or take medication that affects heart rate, consult an appropriate healthcare professional before relying on calculated target zones. The American Heart Association specifically notes that medications can change maximum and target heart rates.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. What Is Target Heart Rate?
          </h2>
          <p>
            Target heart rate is the heart-rate range you use as a guide for a particular level of exercise intensity. Heart rate is measured in beats per minute (BPM).
          </p>
          <p>
            A target-heart-rate calculation generally starts with an estimate of your maximum heart rate (MHR) and then applies a percentage representing exercise intensity.
          </p>
          <p>
            For example, using the common 220-minus-age estimate, a 30-year-old has an estimated maximum heart rate of:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            220 − 30 = <strong>190 BPM</strong>
          </div>
          <p>
            At 50% of MHR:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            190 × 0.50 = <strong>95 BPM</strong>
          </div>
          <p>
            At 70% of MHR:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            190 × 0.70 = <strong>133 BPM</strong>
          </div>
          <p>
            That produces a general 50%–70% range of approximately <strong>95–133 BPM</strong>. The American Heart Association uses this general framework for moderate activity and notes that target values are averages rather than precise individual limits.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How This Target Heart Rate Calculator Works
          </h2>
          <p>
            The calculator can follow either a percentage-of-maximum-heart-rate approach or a heart-rate-reserve approach:
          </p>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-center space-y-1.5 text-slate-700 dark:text-slate-300 my-3">
            <div className="font-bold text-blue-600 dark:text-blue-400">Age or Measured MHR</div>
            <div className="text-slate-400">↓</div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400">Maximum Heart Rate (MHR)</div>
            <div className="text-slate-400">↓</div>
            <div className="font-bold text-purple-600 dark:text-purple-400">Resting Heart Rate (RHR)</div>
            <div className="text-slate-400">↓</div>
            <div className="font-bold text-amber-600 dark:text-amber-400">Heart Rate Reserve (HRR = MHR − RHR)</div>
            <div className="text-slate-400">↓</div>
            <div className="font-bold text-indigo-600 dark:text-indigo-400">Selected Intensity</div>
            <div className="text-slate-400">↓</div>
            <div className="font-bold text-rose-600 dark:text-rose-400">Target Heart Rate (THR)</div>
            <div className="text-slate-400">↓</div>
            <div className="font-bold text-cyan-600 dark:text-cyan-400">5 Training Zones</div>
          </div>

          <p>
            This distinction is important because 65% of maximum heart rate is not the same calculation as 65% of heart-rate reserve.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Maximum Heart Rate (MHR)
          </h2>
          <p>
            Maximum heart rate, commonly called MHR or HRmax, is the highest heart rate used as the upper reference point in a target-zone calculation. Your true maximum heart rate is individual. Age-based equations estimate it statistically rather than directly measuring it. This calculator provides several commonly cited equations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Haskell &amp; Fox (1971)</h3>
              <p className="font-mono text-xs text-blue-600 dark:text-blue-400">MHR = 220 − age</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                For age 30: 220 − 30 = <strong>190 BPM</strong>. The American Heart Association still uses approximately 220 minus age in its general public target-heart-rate guidance.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Tanaka, Monahan &amp; Seals (2001)</h3>
              <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400">MHR = 208 − (0.7 × age)</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                For age 30: 208 − (0.7 × 30) = <strong>187 BPM</strong>. Tanaka and colleagues developed this equation from a meta-analysis of studies involving healthy adults.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Nes et al. (2013)</h3>
              <p className="font-mono text-xs text-purple-600 dark:text-purple-400">MHR = 211 − (0.64 × age)</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                For age 30: 211 − (0.64 × 30) = 191.8 ≈ <strong>192 BPM</strong>. The published HUNT Fitness Study equation illustrates why different prediction equations can produce different values for the same age.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Gellish et al. (2007)</h3>
              <p className="font-mono text-xs text-amber-600 dark:text-amber-400">MHR = 207 − (0.7 × age)</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                For age 30: 207 − (0.7 × 30) = <strong>186 BPM</strong>. Developed from longitudinal exercise-testing records.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Why Maximum Heart Rate Formulas Disagree
          </h2>
          <p>
            There is no reason to expect every maximum-heart-rate equation to produce the same number. For age 30, the formulas give:
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 my-3">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Formula</th>
                  <th className="py-2.5 px-4 font-sans tabular-nums text-blue-600 dark:text-blue-400">Estimated MHR (Age 30)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-2.5 px-4 font-semibold">Haskell &amp; Fox</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">190 BPM</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">Tanaka</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">187 BPM</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">Nes</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">192 BPM</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">Gellish</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">186 BPM</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            These differences are expected because the equations were developed from different datasets, populations, and statistical models. More importantly, an estimated MHR is not the same thing as a measured MHR. Research comparing prediction equations with measured maximum heart rate has demonstrated meaningful individual variation. For that reason, treat an age-based MHR as a starting estimate rather than a guaranteed physiological maximum.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Resting Heart Rate (RHR)
          </h2>
          <p>
            Your resting heart rate (RHR) is the number of times your heart beats per minute while you are resting. For many adults, the American Heart Association describes a resting heart rate of 60–100 BPM as typical, while noting that physically active people and athletes can have lower resting rates.
          </p>
          <p>
            Resting heart rate is affected by many factors, including fitness level, stress, anxiety, hormones, medication, illness, recovery, and recent physical activity. The AHA recommends checking your resting pulse when you are calm and rested, such as in the morning before getting out of bed or having caffeine.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Heart Rate Reserve (HRR)
          </h2>
          <p>
            The heart rate reserve method uses both your maximum and resting heart rates. The formula is:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            <strong>HRR = MHR − RHR</strong>
          </div>
          <p>
            For example:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm space-y-1">
            <div>MHR = 190 BPM</div>
            <div>RHR = 70 BPM</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold">HRR = 190 − 70 = 120 BPM</div>
          </div>
          <p>
            This 120-BPM difference is the heart-rate reserve used by the Karvonen calculation.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Karvonen Formula
          </h2>
          <p>
            The Karvonen method calculates target heart rate using heart-rate reserve:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm">
            <strong>THR = RHR + (Intensity × HRR)</strong>
          </div>
          <p>
            Suppose:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm space-y-1">
            <div>MHR = 190 BPM, RHR = 70 BPM, HRR = 120 BPM, Intensity = 65%</div>
            <div>THR = 70 + (0.65 × 120)</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold">THR = 148 BPM</div>
          </div>
          <p>
            So the 65% HRR target in this example is <strong>148 BPM</strong>. This differs from simply taking 65% of MHR.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. %MHR vs Karvonen: What Is the Difference?
          </h2>
          <p>
            This is one of the most important things to understand when using an online target-heart-rate calculator:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Standard % of Maximum Heart Rate</h3>
              <p className="font-mono text-xs text-blue-600 dark:text-blue-400">THR = MHR × intensity</p>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300">
                With MHR = 190 and intensity = 65%:<br />
                190 × 0.65 = 123.5 ≈ <strong>124 BPM</strong>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Karvonen / Heart-Rate Reserve</h3>
              <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400">THR = RHR + intensity × (MHR − RHR)</p>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300">
                With MHR = 190 and RHR = 70:<br />
                70 + 0.65 × 120 = <strong>148 BPM</strong>
              </div>
            </div>
          </div>

          <p>
            Therefore, <strong>65% MHR = 124 BPM</strong>, while <strong>65% HRR = 148 BPM</strong>. The numbers are different because the percentage is being applied to a different physiological reference. When comparing target heart rates from different calculators, always check whether the percentage refers to MHR or HRR.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Five Heart Rate Training Zones
          </h2>
          <p>
            The calculator provides five training zones based on the selected calculation method. For the example (MHR = 190 BPM, RHR = 70 BPM, HRR = 120 BPM), the Karvonen-based ranges are:
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 my-3">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Training Zone</th>
                  <th className="py-2.5 px-4 font-sans tabular-nums text-emerald-600 dark:text-emerald-400">Intensity</th>
                  <th className="py-2.5 px-4 font-sans tabular-nums text-blue-600 dark:text-blue-400">Example Target Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">Zone 1</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">50%–60%</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">130–142 BPM</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">Zone 2</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">60%–70%</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">142–154 BPM</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">Zone 3</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">70%–80%</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">154–166 BPM</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">Zone 4</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">80%–90%</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">166–178 BPM</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">Zone 5</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">90%–100%</td>
                  <td className="py-2.5 px-4 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">178–190 BPM</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500">
            These ranges are mathematical training-zone estimates. They should not be interpreted as universal physiological boundaries.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Zone 1: Very Light / Recovery</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Zone 1 represents easier cardiovascular work. It can be appropriate for warm-ups, cool-downs, recovery sessions, easy walking, and very easy cycling. The primary objective is generally to keep activity comfortable while limiting cardiovascular strain. For beginners, starting at the lower end of an appropriate target range can be a practical approach. The American Heart Association also recommends beginning at the lower end of a target zone when starting exercise and building gradually.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Zone 2: Light to Moderate Aerobic Work</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Zone 2 is commonly used for sustained aerobic exercise. Examples may include brisk walking, easy running, steady cycling, and low-to-moderate continuous cardio. Heart rate is useful here, but it is not the only way to judge intensity. The CDC&apos;s talk test provides a simple real-world check: during moderate-intensity activity, you can generally talk but not sing. For running and walking sessions, combining heart-rate information with pace can provide useful context. You can compare the result with a{" "}
                <Link href="/calculators/pace-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                  Pace Calculator
                </Link>{" "}
                when planning steady aerobic workouts.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Zone 3: Moderate / Aerobic</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Zone 3 represents a stronger aerobic effort. Breathing should be noticeably harder than during easy exercise, and holding a conversation becomes more difficult. This type of intensity may be useful during sustained aerobic conditioning, depending on training goals and fitness level. Because individual responses vary, do not treat a calculated percentage as a guarantee that a workout will feel identical for every person.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Zone 4: Hard / High-Intensity Training</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Zone 4 represents a substantially harder training intensity. This type of work places greater stress on the cardiovascular and muscular systems and is generally used more selectively than easy aerobic exercise. Target-heart-rate calculations can help structure intervals or harder efforts, but the appropriate amount depends on the person, the activity, and the training program.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Zone 5: Very High Intensity</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Zone 5 sits near the top of the calculated heart-rate range. It represents very demanding exercise and should not be interpreted as a zone that everyone should try to reach during every workout. For many people, most exercise does not need to occur near maximum intensity. The CDC&apos;s physical-activity guidance distinguishes moderate and vigorous effort and notes that intensity is relative to the individual.
              </p>
            </div>
          </div>
        </section>

        {/* Section 11 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. How to Tell Whether You Are Exercising Moderately or Vigorously
          </h2>
          <p>
            Heart rate can be combined with breathing and perceived effort. The CDC describes these practical indicators:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>
              <strong>Moderate intensity:</strong> You can talk, but not sing.
            </li>
            <li>
              <strong>Vigorous intensity:</strong> You can generally say only a few words before needing to breathe.
            </li>
          </ul>
          <p>
            This is particularly useful when your wearable or heart-rate monitor does not perfectly match a calculated target.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Borg Rating of Perceived Exertion (RPE)
          </h2>
          <p>
            The calculator also provides a Borg RPE reference. The traditional Borg scale runs from 6 to 20 and describes how hard exercise feels:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs my-2 font-sans tabular-nums">
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60"><strong>6:</strong> No exertion</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60"><strong>9:</strong> Very light</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60"><strong>11:</strong> Light</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60"><strong>13:</strong> Somewhat hard</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60"><strong>15:</strong> Hard</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60"><strong>17:</strong> Very hard</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60"><strong>20:</strong> Maximal effort</div>
          </div>
          <p>
            Perceived exertion is useful because heart rate does not always tell the whole story. For example, heat, dehydration, illness, stress, stimulants, or medication can influence heart-rate response. The CDC recognizes perceived exertion as another approach for assessing exercise intensity alongside heart-rate methods.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Why Your Smartwatch May Show a Different Target Heart Rate
          </h2>
          <p>
            Do not assume that your smartwatch and this calculator are using the same formula. A wearable may use:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>A different maximum-heart-rate equation;</li>
            <li>A measured maximum heart rate;</li>
            <li>A heart-rate-reserve calculation;</li>
            <li>Personalized zones;</li>
            <li>Proprietary algorithms;</li>
            <li>User-specific physiological thresholds.</li>
          </ul>
          <p>
            If your watch says one target and an online calculator gives another, first determine which methodology each one uses.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Can I Use a Measured Maximum Heart Rate?
          </h2>
          <p>
            Yes. This calculator provides an option to enter a known maximum heart rate rather than relying entirely on an age-based formula. That can be useful when an appropriately obtained measured value is available from a graded exercise stress test or reliable protocol.
          </p>
          <p>
            However, the quality and context of the measurement matter. A number obtained under one exercise condition may not automatically represent the same physiological response under another.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Why Your Heart Rate Can Change from Workout to Workout
          </h2>
          <p>
            Heart rate is dynamic. The same person can see different readings on different days because of:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>Temperature and humidity;</li>
            <li>Hydration level;</li>
            <li>Sleep quality and quantity;</li>
            <li>Stress;</li>
            <li>Caffeine and stimulants;</li>
            <li>Illness or immune response;</li>
            <li>Cumulative muscular fatigue;</li>
            <li>Medications;</li>
            <li>Exercise modality (e.g., running vs cycling);</li>
            <li>Training status.</li>
          </ul>
          <p>
            This means a small difference from a calculated target does not automatically indicate that your workout was ineffective. Use the calculator as a guide, not as a command to force your heart rate to a precise number.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Target Heart Rate for Weight Loss
          </h2>
          <p>
            A common misconception is that one particular heart-rate zone automatically produces maximum fat loss. The relationship between exercise intensity and fuel use is more complicated than a single “fat-burning zone” number.
          </p>
          <p>
            For body-weight management, overall physical activity and eating patterns matter far more than chasing one exact BPM target. The CDC notes that the amount of physical activity needed for weight management varies substantially between people and that healthy eating patterns also play an important role.
          </p>
          <p>
            For users tracking overall fitness, a{" "}
            <Link href="/calculators/calories-burned-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calories Burned Calculator
            </Link>{" "}
            can complement heart-rate information by estimating energy expenditure from an activity.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Target Heart Rate for Beginners
          </h2>
          <p>
            If you are new to exercise, you do not need to begin at the highest training zone. A sensible progression is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-center space-y-1 text-slate-700 dark:text-slate-300 my-2">
            <div>Light activity</div>
            <div className="text-slate-400">↓</div>
            <div>Regular moderate activity</div>
            <div className="text-slate-400">↓</div>
            <div>Longer aerobic sessions</div>
            <div className="text-slate-400">↓</div>
            <div>Higher-intensity training</div>
          </div>
          <p>
            The American Heart Association recommends starting toward the lower end of a target zone when beginning exercise and gradually progressing. Consistency is usually more useful than repeatedly attempting maximal intensity.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. What If My Resting Heart Rate Is Very Low?
          </h2>
          <p>
            A relatively low resting heart rate can occur in well-trained people. The American Heart Association notes that some active adults and athletes can have resting heart rates around 40 BPM.
          </p>
          <p>
            But a low resting heart rate should not automatically be interpreted as either healthy or unhealthy without context. Symptoms, medications, fitness level, and medical history all matter. In broader fitness-assessment context, athletes frequently pair resting pulse trends with body composition tracking via our{" "}
            <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Body Fat Calculator
            </Link>{" "}
            to monitor holistic cardiovascular and metabolic adaptation.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. What If My Heart Rate Is Higher Than the Calculator Says?
          </h2>
          <p>
            A calculated target is an estimate. Do not treat it as permission to continue exercising through concerning symptoms.
          </p>
          <p>
            If exercise produces unusual chest pain, fainting, severe shortness of breath, or other significant symptoms, stop the activity and seek appropriate medical care immediately.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Medications Can Change Heart Rate
          </h2>
          <p>
            Some medications affect heart-rate response. The American Heart Association specifically notes that medication can lower maximum heart rate and therefore change the target range that is appropriate for an individual.
          </p>
          <p>
            This is especially important for people using medications that intentionally alter cardiovascular response, such as beta-blockers or calcium channel blockers. A generic calculator cannot account for every clinical circumstance.
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            21. Heart Rate Is Only One Measure of Exercise Intensity
          </h2>
          <p>
            Heart rate works best when interpreted with other signals. You can combine:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-semibold text-center text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            Heart rate + breathing + perceived exertion + workout type
          </div>
          <p>
            For example, the CDC&apos;s talk test offers a simple way to distinguish moderate and vigorous effort even when your heart-rate reading is unavailable or unusually variable. That makes target heart rate one useful tool within a larger approach to exercise monitoring.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            22. Target Heart Rate Worked Examples
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Example 1: Age 30, RHR 70</h3>
              <p className="text-xs text-slate-500">Using Haskell &amp; Fox:</p>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div>MHR = 220 − 30 = 190 BPM</div>
                <div>HRR = 190 − 70 = 120 BPM</div>
                <div>Karvonen 65%: 70 + (0.65 × 120)</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold">= 148 BPM</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Example 2: Age 40, RHR 60</h3>
              <p className="text-xs text-slate-500">Using Tanaka:</p>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div>MHR = 208 − (0.7 × 40) = 180 BPM</div>
                <div>HRR = 180 − 60 = 120 BPM</div>
                <div>Karvonen 65%: 60 + (0.65 × 120)</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold">= 138 BPM</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Example 3: Manual MHR 195, RHR 65</h3>
              <p className="text-xs text-slate-500">Using Test Result MHR:</p>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div>HRR = 195 − 65 = 130 BPM</div>
                <div>Karvonen 60%: 65 + (0.60 × 130)</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold">= 143 BPM</div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            This illustrates why entering a measured or otherwise established MHR can produce a different target than an age-based estimate.
          </p>
        </section>

        {/* Section 23 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            23. Quick Reference: Which Method Should You Use?
          </h2>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 my-3">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Your Situation</th>
                  <th className="py-2.5 px-4 text-blue-600 dark:text-blue-400">Useful Approach</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-2.5 px-4 font-semibold">You want a simple general estimate</td>
                  <td className="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">% of MHR</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">You know your resting heart rate</td>
                  <td className="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">Karvonen / HRR</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">You want to compare published MHR equations</td>
                  <td className="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">Formula comparison</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">You have a suitable measured MHR</td>
                  <td className="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">Enter measured MHR</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">You want a perceived-effort reference</td>
                  <td className="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">Borg RPE</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">You want a simple real-world intensity check</td>
                  <td className="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">Talk test</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500">
            There is no single method that is perfect for every person or every workout.
          </p>
        </section>

        {/* Section 24 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            24. How to Use This Calculator Responsibly
          </h2>
          <p>
            Use your calculated target as a reference point, not an absolute command. A useful approach is to compare:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Calculated heart rate</li>
            <li>How hard the exercise feels</li>
            <li>Breathing / talk test</li>
            <li>Workout objective</li>
          </ul>
          <p>
            The CDC emphasizes that relative exercise intensity differs between people: an activity that feels vigorous to one person may feel moderate to a fitter person. That is why no target-heart-rate formula should be interpreted in isolation.
          </p>
        </section>

        {/* Section 25 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            25. Summary &amp; Final Takeaway
          </h2>
          <p>
            A Target Heart Rate Calculator can make exercise-intensity numbers easier to understand, but the most important question is not simply “What number should I hit?” It is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-semibold text-center text-xs sm:text-sm text-blue-600 dark:text-blue-400">
            “What does this number mean, and which calculation method produced it?”
          </div>
          <p>
            The key concepts are:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li><strong>MHR:</strong> estimated or measured maximum heart rate;</li>
            <li><strong>RHR:</strong> resting heart rate;</li>
            <li><strong>HRR:</strong> MHR minus RHR;</li>
            <li><strong>%MHR:</strong> target based directly on maximum heart rate;</li>
            <li><strong>Karvonen:</strong> target based on heart-rate reserve;</li>
            <li><strong>Training zones:</strong> ranges used to organize exercise intensity;</li>
            <li><strong>Borg RPE:</strong> a perceived-exertion alternative or complement.</li>
          </ul>
          <p>
            For general public guidance, the American Heart Association&apos;s age-based target zones and the CDC&apos;s talk test provide useful context alongside calculated BPM values. Use this calculator to understand and organize your training numbers—not to replace medical evaluation or individualized exercise advice.
          </p>
        </section>

      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (All 19 Approved FAQs, Unfolded by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {target_heart_rate_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/30 font-normal whitespace-pre-line">
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

export default TargetHeartRateContent;
