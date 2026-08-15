"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Activity, Dumbbell, ShieldCheck, Zap } from "lucide-react";

export function OneRepMaxContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is a One Rep Max (1RM)?",
      a: "One Rep Max (1RM) is the maximum amount of weight an individual can lift for a single repetition of a given exercise through a full range of motion with proper form. It represents peak neuromuscular force production."
    },
    {
      q: "Which 1RM formula is most accurate?",
      a: "The Epley formula (1985) and Brzycki formula (1993) are widely accepted as the gold standards for sub-maximal estimation. The Brzycki formula is exceptionally accurate for 1 to 6 reps, while Epley is preferred for 6 to 10 reps."
    },
    {
      q: "Why shouldn't beginners directly test their 1RM with heavy weights?",
      a: "Directly testing 1RM with maximum weight places extreme stress on connective tissue, tendons, and the central nervous system. Without mastered movement mechanics, beginners face a high risk of acute muscular injury. Mathematical estimation is far safer."
    },
    {
      q: "How many repetitions should I use to estimate my 1RM accurately?",
      a: "Sub-maximal estimation is most accurate when using a weight you can lift for 2 to 6 repetitions to failure. As repetitions exceed 10 reps, muscle endurance becomes a confounding factor, slightly lowering estimation precision."
    },
    {
      q: "What is the formula for the Epley equation?",
      a: "The Epley formula is: 1RM = Weight Lifted × (1 + Reps / 30). For example, lifting 200 lbs for 5 reps yields: 200 × (1 + 5/30) = 200 × 1.1667 = 233.3 lbs 1RM."
    },
    {
      q: "What is the formula for the Brzycki equation?",
      a: "The Brzycki formula is: 1RM = Weight Lifted × (36 / (37 - Reps)). For example, lifting 200 lbs for 5 reps yields: 200 × (36 / 32) = 200 × 1.125 = 225 lbs 1RM."
    },
    {
      q: "How does 1RM percentages correlate with repetition ranges?",
      a: "According to NSCA guidelines: 100% = 1 rep, 95% = 2 reps, 93% = 3 reps, 90% = 4 reps, 87% = 5 reps, 85% = 6 reps, 80% = 8 reps, 75% = 10 reps, 70% = 12 reps."
    },
    {
      q: "What percentage of 1RM is best for muscle hypertrophy (growth)?",
      a: "Muscle hypertrophy is optimized by training with loads between 70% and 80% of your 1RM, corresponding to 6 to 12 repetitions per set for 3 to 5 sets with 60–90 seconds rest."
    },
    {
      q: "What percentage of 1RM is best for maximal strength?",
      a: "Maximal strength development requires lifting loads at 85% to 100% of 1RM for 1 to 5 repetitions per set with 2 to 5 minutes of rest between sets to allow full ATP-CP recovery."
    },
    {
      q: "What percentage of 1RM is best for explosive power?",
      a: "Explosive power and velocity are optimized using loads between 50% and 60% of 1RM moved at maximum concentric speed for 3 to 5 reps per set."
    },
    {
      q: "How does RPE (Rate of Perceived Exertion) integrate with 1RM?",
      a: "RPE rates set intensity on a 1-to-10 scale. RPE 10 means 0 reps left in reserve (true failure). RPE 9 means 1 rep left in reserve (RIR 1). Combining RPE with 1RM percentages auto-regulates daily training based on fatigue."
    },
    {
      q: "Is 1RM the same for all exercises (Bench, Squat, Deadlift)?",
      a: "No. Each exercise utilizes different muscle group mass, mechanical leverage, and moment arms. Deadlifts and squats typically yield higher numerical 1RMs than upper-body bench press or overhead press."
    },
    {
      q: "How often should I recalculate or retest my 1RM?",
      a: "Recalculate your 1RM every 4 to 8 weeks upon completing a structured training block (e.g., strength or hypertrophy cycle) to update your working weights."
    },
    {
      q: "What warm-up protocol should be used before testing a 1RM?",
      a: "Perform 5-10 mins dynamic warm-up, followed by specific sets: 50% 1RM × 5 reps, 70% 1RM × 3 reps, 85% 1RM × 1 rep, 93% 1RM × 1 rep, then attempt the 1RM."
    },
    {
      q: "What role does a spotter play during heavy 1RM attempts?",
      a: "A qualified spotter provides immediate mechanical assistance if a lift fails, preventing bar drop, joint entrapment, or acute injury during maximal attempts."
    },
    {
      q: "Can I use 1RM for dumbbell exercises?",
      a: "Yes, but dumbbell 1RMs are lower than barbell equivalents due to the additional muscular energy required to stabilize two independent weights in space."
    },
    {
      q: "What is progressive overload and how does 1RM track it?",
      a: "Progressive overload is the gradual increase of stress placed upon the musculoskeletal system. Tracking your calculated 1RM over time provides objective proof of strength gains."
    },
    {
      q: "Why do 1RM formulas become less accurate above 10 repetitions?",
      a: "Above 10 reps, slow-twitch oxidative muscle fiber endurance and lactic acid tolerance heavily influence performance, distorting pure maximal force estimates."
    },
    {
      q: "How does nutrition and protein intake support 1RM progress?",
      a: "Consuming 1.6 to 2.2 grams of protein per kilogram of body weight daily supports muscle protein synthesis (MPS) and myofibrillar hypertrophy required for neural force output."
    },
    {
      q: "What is the difference between linear periodization and DUP?",
      a: "Linear periodization gradually decreases volume while increasing intensity (% 1RM) over months. Daily Undulating Periodization (DUP) alters intensity daily (e.g., Hypertrophy Monday at 75%, Strength Wednesday at 85%, Power Friday at 60%)."
    },
    {
      q: "How does sleep deprivation affect 1RM strength?",
      a: "Sleep restriction (<7 hours) impairs central nervous system motor unit recruitment, reduces glycogen resynthesis, and lowers maximal force output by 5% to 15%."
    },
    {
      q: "What is the Lombardi formula equation?",
      a: "The Lombardi formula is: 1RM = Weight Lifted × Reps^0.10. It uses an exponential scaling factor that models heavy multi-joint power movements."
    },
    {
      q: "Can females use the same 1RM formulas as males?",
      a: "Yes. Peer-reviewed studies confirm that sub-maximal estimation formulas (Epley, Brzycki, Mayhew) maintain high accuracy across both male and female lifting populations."
    },
    {
      q: "What are supersets and how do they impact 1RM training?",
      a: "Supersets involve performing two exercises back-to-back with minimal rest. While effective for hypertrophy and conditioning, supersets induce fatigue that temporarily reduces peak 1RM force."
    },
    {
      q: "What should I do if my calculated 1RM feels too heavy during workouts?",
      a: "If prescribed percentages feel unsustainable, decrease working weights by 5% to 10% or re-evaluate your 1RM using a conservative sub-maximal test (e.g., 3-5 reps at RPE 8)."
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-zinc-800 dark:text-zinc-200">
      {/* 1. Introduction */}
      <section className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
          <Dumbbell className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Comprehensive Clinical &amp; Exercise Science Guide to One Rep Max (1RM)
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-zinc-300">
          One Rep Max (1RM) represents the absolute ceiling of maximal dynamic muscle strength. Defined as the maximum weight an athlete can lift for a single repetition through a full range of motion with sound biomechanical form, 1RM is the fundamental metric used by strength and conditioning coaches, powerlifters, and sports scientists worldwide to prescribe exercise intensity.
        </p>
      </section>

      {/* 2. Clinical Formulas */}
      <section className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          1. Mathematical Equations for 1RM Estimation
        </h3>
        <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">A. Epley Equation (1985)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 dark:text-blue-400">
              1RM = Weight Lifted × (1 + Repetitions / 30)
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">B. Brzycki Equation (1993)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-700 dark:text-blue-400">
              1RM = Weight Lifted × [ 36 / (37 - Repetitions) ]
            </code>
          </div>
        </div>
      </section>

      {/* 3. 25 Clinical FAQs Accordion */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
          <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                  <ChevronDown className={`w-4 h-4 transition-transform text-slate-900 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-900 dark:text-zinc-300 leading-relaxed  dark:border-zinc-800">
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
