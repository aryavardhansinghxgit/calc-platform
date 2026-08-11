"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Activity, Zap, HeartPulse, Award, BookOpen, ShieldCheck } from "lucide-react";

export function PaceContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is running pace and how is it calculated?",
      a: "Running pace is the rate of motion expressed as the total time required to travel a specific unit of distance (e.g. minutes per mile or minutes per kilometer). It is calculated by dividing total elapsed time by total distance: Pace = Time / Distance."
    },
    {
      q: "What is the difference between Pace and Speed?",
      a: "Pace measures time per distance (e.g., 8 minutes per mile), whereas Speed measures distance per time (e.g., 7.5 miles per hour). Pace is the standard metric used by distance runners because it directly reflects lap split management."
    },
    {
      q: "What is Riegel's Race Prediction Formula?",
      a: "Formulated by Peter Riegel in 1977, Riegel's formula predicts race finish times across different distances: T2 = T1 × (D2 / D1)^1.06. The 1.06 exponent accounts for natural physiological fatigue over longer distances."
    },
    {
      q: "What is a negative split strategy?",
      a: "A negative split means running the second half of a race faster than the first half. It optimizes glycogen conservation and reduces early lactate accumulation, making it the pacing strategy behind nearly all world-record marathon performances."
    },
    {
      q: "How do I calculate my Maximum Heart Rate (MHR)?",
      a: "The most common baseline formula is Fox & Haskell: MHR = 220 - Age. For a more accurate clinical estimate across older or trained athletes, the Tanaka formula is used: MHR = 208 - (0.7 × Age)."
    },
    {
      q: "What is Zone 2 Heart Rate training and why is it essential?",
      a: "Zone 2 training occurs at 60% to 70% of maximum heart rate. It maximizes mitochondrial density, enhances capillary density in skeletal muscle, and trains the body to burn fatty acids for energy rather than depleting muscle glycogen."
    },
    {
      q: "What is Lactate Threshold (Zone 4)?",
      a: "Lactate threshold is the exercise intensity at which blood lactate accumulates faster than it can be cleared by the liver and kidneys (typically 80% to 90% MHR). Training at threshold improves the body's ability to buffer acid and sustain faster race paces."
    },
    {
      q: "How does temperature and humidity affect running pace?",
      a: "Hot and humid weather increases cardiac strain because blood is diverted to the skin surface for evaporative cooling. As a general rule, running pace slows by 1.5% to 3% for every 10°F rise in temperature above 55°F (13°C)."
    },
    {
      q: "How does altitude impact running pace?",
      a: "High altitude reduces oxygen availability due to lower barometric pressure. Above 3,000 feet (900 meters), VO2 max decreases by approximately 1% for every 1,000 feet of elevation gain, slowing pace accordingly."
    },
    {
      q: "What is the 400-meter track lap time for an 8:00 min/mile pace?",
      a: "An 8:00 min/mile pace equals approximately 4:58 min/km, which translates to 1 minute and 59 seconds (1:59) per 400-meter track lap."
    },
    {
      q: "How do I convert min/km to min/mile?",
      a: "Multiply your min/km decimal pace by 1.609344. For example, a 5:00 min/km pace equals 5 × 1.609344 = 8.04 minutes per mile (8 minutes and 2 seconds per mile)."
    },
    {
      q: "What is VO2 Max?",
      a: "VO2 Max is the maximum volume of oxygen (in milliliters per kilogram per minute) that your body can absorb and utilize during maximal effort. It sets the physiological ceiling for aerobic endurance pacing."
    },
    {
      q: "What is the difference between aerobic and anaerobic pacing?",
      a: "Aerobic pacing relies on oxygen to break down fats and carbohydrates for continuous energy (Zones 1-3). Anaerobic pacing operates without sufficient oxygen, relying strictly on rapid glycogen glycolysis which generates lactate (Zones 4-5)."
    },
    {
      q: "Why do beginner runners start races too fast?",
      a: "Adrenaline and fresh muscle glycogen make early race speeds feel effortless. However, going out too fast burns precious glycogen stores prematurely and elevates lactate levels, leading to dramatic slowdowns ('hitting the wall') in the final miles."
    },
    {
      q: "How many miles per hour (mph) is a 6:00 min/mile pace?",
      a: "A 6:00 min/mile pace is exactly 10.0 miles per hour (mph) or 16.09 kilometers per hour (km/h)."
    },
    {
      q: "What is Non-Exercise Activity Thermogenesis (NEAT)?",
      a: "NEAT refers to all non-workout movement (walking, standing, chores). High NEAT supports cardiovascular recovery and calorie burn alongside structured pacing sessions."
    },
    {
      q: "Can this calculator be used for cycling and swimming?",
      a: "Yes. The Pace / Time / Distance mode applies to any distance activity. Preset speed conversions (mph, km/h, m/s) support cycling splits, while 100m split calculations support swimming."
    },
    {
      q: "What is the cadence (steps per minute) recommendation for runners?",
      a: "Optimal running cadence generally falls between 170 and 180 steps per minute (spm), which minimizes braking forces on the knees and improves overall stride efficiency."
    },
    {
      q: "How often should heart rate zones be re-evaluated?",
      a: "Re-evaluate heart rate zones every 8 to 12 weeks or after completing a dedicated race training cycle, as cardiovascular adaptation lowers resting heart rate and elevates threshold capacity."
    },
    {
      q: "How does GPS watch pace accuracy compare to manual lap timing?",
      a: "GPS watches track location via satellite triangulation, which can drift in high-rise cities or dense forests. Manual lap timing at certified mile markers or track ovals provides 100% exact split precision."
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-zinc-800 dark:text-zinc-200">
      {/* 1. Introduction */}
      <section className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
          <Activity className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Comprehensive Athletic Guide to Pacing, Race Predictions &amp; Heart Rate Training
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Pace management is the definitive discipline distinguishing recreational joggers from elite endurance athletes. Whether training for a 5K personal record, executing a negative-split marathon strategy, or optimizing Zone 2 aerobic base conditioning, understanding the mathematical relationships between time, distance, speed, and cardiovascular heart rate zones is critical to achieving peak athletic performance.
        </p>
      </section>

      {/* 2. Physics & Mathematics */}
      <section className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          1. Mathematical Equations: Pacing, Speed &amp; Riegel's Race Predictor
        </h3>
        <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">A. Pace and Speed Core Formulas</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-blue-700 dark:text-blue-400">
              Pace (min/mi) = Total Time in Minutes / Total Distance in Miles<br/>
              Speed (mph) = 60 / Pace (min/mi)<br/>
              Speed (km/h) = Speed (mph) × 1.609344
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">B. Peter Riegel Race Prediction Equation (1977)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-emerald-700 dark:text-emerald-400">
              T2 = T1 × (D2 / D1)^1.06<br/>
              (Where T1 = current race time, D1 = current distance, D2 = target race distance, 1.06 = fatigue exponent)
            </code>
          </div>
        </div>
      </section>

      {/* 3. 20 Clinical FAQs Accordion */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
          <HelpCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <h3>Frequently Asked Questions</h3>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left font-semibold text-sm text-zinc-900 dark:text-zinc-100 flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform text-zinc-500 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}
