"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, HeartPulse, Activity, ShieldCheck, Zap } from "lucide-react";

export function TargetHeartRateContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is a Target Heart Rate (THR)?",
      a: "Target Heart Rate (THR) is a desired range of heart rate beats per minute (BPM) reached during aerobic exercise to optimize cardiovascular conditioning, fat loss, or athletic performance safely."
    },
    {
      q: "What is Maximum Heart Rate (MHR) and how is it calculated?",
      a: "Maximum Heart Rate (MHR) is the highest number of contractions your heart can physically perform in one minute during all-out effort. The most common baseline formula is Haskell & Fox (MHR = 220 - Age)."
    },
    {
      q: "What is Resting Heart Rate (RHR) and why does it matter?",
      a: "Resting Heart Rate (RHR) is the number of heart beats per minute when at complete rest in a neutral environment (typically 60-100 BPM for adults, 40-60 BPM for well-trained endurance athletes). A lower RHR reflects superior stroke volume and parasympathetic cardiac efficiency."
    },
    {
      q: "What is Heart Rate Reserve (HRR)?",
      a: "Heart Rate Reserve (HRR) is the numerical difference between your Maximum Heart Rate and Resting Heart Rate (HRR = MHR - RHR). It forms the mathematical foundation of the Karvonen method."
    },
    {
      q: "Why is the Karvonen Method more accurate than standard percentage of MHR?",
      a: "Standard percentage formulas only consider age. The Karvonen Method incorporates your resting heart rate (RHR), which accounts for individual aerobic fitness, age, and cardiac efficiency, producing highly personalized target zones."
    },
    {
      q: "What are the 5 standard heart rate training zones?",
      a: "Zone 1 (50-60%): Recovery/Warm-up; Zone 2 (60-70%): Fat Burning/Aerobic Base; Zone 3 (70-80%): Aerobic Endurance; Zone 4 (80-90%): Anaerobic Threshold; Zone 5 (90-100%): VO2 Max/Max Effort."
    },
    {
      q: "Is Zone 2 really the best zone for burning fat?",
      a: "In Zone 2 (60-70% MHR), fat supplies a higher percentage (~60-70%) of total calories burned as energy. However, higher intensity zones burn more total calories per minute."
    },
    {
      q: "What is the Borg Rating of Perceived Exertion (RPE) scale?",
      a: "Developed by Gunnar Borg, the Borg RPE scale rates subjective physical effort on a scale from 6 (no exertion) to 20 (maximal effort). Multiplying the RPE rating by 10 correlates closely with actual heart rate in BPM."
    },
    {
      q: "What is the Borg CR10 scale?",
      a: "The Borg CR10 (Category-Ratio) scale is a simplified 0-to-10 rating scale commonly used in modern sports science, where 0 is rest, 3 is moderate, 5 is hard, and 10 is absolute maximal exertion."
    },
    {
      q: "How does the Tanaka formula differ from Haskell & Fox?",
      a: "The Tanaka formula (MHR = 208 - 0.7 × Age) was developed via a meta-analysis of over 18,000 subjects and is more accurate for adults over age 40 than the traditional 220 - Age formula."
    },
    {
      q: "What is the Nes formula for Maximum Heart Rate?",
      a: "Derived from the Norwegian HUNT Fitness Study, the Nes formula is MHR = 211 - 0.64 × Age. It provides exceptional precision for active individuals."
    },
    {
      q: "How does heart rate change with cardiovascular training?",
      a: "As aerobic fitness improves, heart muscle hypertrophy increases stroke volume (blood pumped per beat). Consequently, your Resting Heart Rate decreases, expanding your Heart Rate Reserve."
    },
    {
      q: "What heart rate zone should I train in for a marathon?",
      a: "Marathon runners spend 80% to 85% of their training volume in Zone 2 (60-70% MHR) to build capillary density and mitochondrial density without excessive fatigue."
    },
    {
      q: "What heart rate zone is targeted during High-Intensity Interval Training (HIIT)?",
      a: "HIIT targets Zone 4 (80-90% MHR) and Zone 5 (90-100% MHR) during high-intensity intervals, followed by Zone 1 active recovery periods."
    },
    {
      q: "What is bradycardia and tachycardia?",
      a: "Bradycardia is a resting heart rate below 60 BPM (normal in trained endurance athletes, but clinical if symptomatic in sedentary individuals). Tachycardia is a resting heart rate exceeding 100 BPM."
    },
    {
      q: "Can heart rate monitors (chest straps vs wrist sensors) be trusted?",
      a: "Electrocardiogram (ECG) chest straps (e.g., Polar, Garmin) measure electrical heart impulses with >99% accuracy. Wrist-based optical heart rate sensors use photoplethysmography (PPG), which is accurate during steady cardio but less precise during intense arm movement or wrist flexion."
    },
    {
      q: "Why does my heart rate drift upwards during a long run (Cardiac Drift)?",
      a: "Cardiac drift occurs during prolonged exercise due to body temperature rise and sweating (dehydration). As plasma blood volume decreases, stroke volume drops, requiring the heart to beat faster to maintain cardiac output."
    },
    {
      q: "How does heat and humidity affect target heart rate?",
      a: "Elevated ambient heat and humidity increase heart rate by 10 to 20 BPM at the same pace because the body shunts more blood to the skin for evaporative cooling."
    },
    {
      q: "How does caffeine impact heart rate during exercise?",
      a: "Caffeine stimulates central nervous system beta-adrenergic receptors, elevating resting and exercise heart rates by 5 to 15 BPM."
    },
    {
      q: "What medications lower maximum and target heart rates?",
      a: "Beta-blockers (e.g., atenolol, metoprolol) prescribed for hypertension slow heart rate significantly. Patients taking beta-blockers should use Borg RPE scales rather than age-based heart rate formulas."
    },
    {
      q: "What is VO2 Max and how does it relate to Zone 5?",
      a: "VO2 Max is the maximum rate of oxygen consumption during incremental exercise. Zone 5 (90-100% MHR) forces the body to operate near or at VO2 Max."
    },
    {
      q: "How much time should I spend in Zone 5 per week?",
      a: "For most athletes, Zone 5 work should comprise no more than 5% to 10% of total weekly training time to prevent overtraining and central nervous system burnout."
    },
    {
      q: "What is the 80/20 training rule in endurance sports?",
      a: "The 80/20 rule (polarized training) dictates spending 80% of total training volume in Zone 1 and Zone 2 (easy effort) and 20% in Zone 4 and Zone 5 (hard effort), minimizing middle-intensity burnout."
    },
    {
      q: "How long does it take for resting heart rate to decrease with exercise?",
      a: "With consistent aerobic training (3-5 sessions per week), noticeable drops in resting heart rate (1-2 BPM per month) usually occur within 4 to 8 weeks."
    },
    {
      q: "When should I consult a doctor before target heart rate training?",
      a: "Consult a physician before starting target heart rate training if you are over 45, have known cardiovascular disease, chest pain, dizziness, hypertension, or take prescription heart medications."
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-zinc-800 dark:text-zinc-200">
      {/* 1. Introduction */}
      <section className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
          <HeartPulse className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Comprehensive Clinical &amp; Sports Physiology Guide to Target Heart Rate
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Target Heart Rate (THR) training is the cornerstone of modern exercise prescription, cardiovascular rehabilitation, and sports endurance science. By monitoring beats per minute (BPM) during physical activity, athletes and fitness enthusiasts can align workout intensity with specific metabolic adaptation targets—ranging from active recovery and fat oxidation to lactate threshold expansion and peak VO2 Max velocity.
        </p>
      </section>

      {/* 2. Clinical Formulas */}
      <section className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          1. Mathematical Formulas for Maximum &amp; Target Heart Rate
        </h3>
        <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">A. Haskell &amp; Fox Formula (1971)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-emerald-700 dark:text-emerald-400">
              MHR = 220 - Age
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">B. Tanaka, Monahan &amp; Seals Formula (2001)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-blue-700 dark:text-blue-400">
              MHR = 208 - (0.7 × Age)
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">C. Karvonen Method (Heart Rate Reserve)</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-purple-700 dark:text-purple-400">
              THR = RHR + Intensity × (MHR - RHR)
            </code>
          </div>
        </div>
      </section>

      {/* 3. 25 Clinical FAQs Accordion */}
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
