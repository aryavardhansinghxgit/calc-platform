"use client";

import React from "react";

export function SleepContent() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: THE BIOLOGY OF HUMAN SLEEP ARCHITECTURE */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. The Biology of Human Sleep Architecture
        </h2>
        <p>
          Human sleep is not a uniform state of unconsciousness. Instead, the brain moves through a series of repeating <strong>90 to 110-minute ultradian cycles</strong> during the night. Each complete cycle consists of non-rapid eye movement (NREM) sleep followed by rapid eye movement (REM) sleep:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-50/20 border border-indigo-200 dark:border-indigo-900 rounded-xl space-y-1">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-200">NREM Stage 1 (N1): Light Sleep</h3>
            <p className="text-slate-900 dark:text-slate-100">
              The transition phase from wakefulness to sleep lasting 1 to 7 minutes. Brain waves shift from alpha waves (8–13 Hz) to theta waves (4–7 Hz). Muscle tone relaxes and eye movement slows.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-50/20 border border-indigo-200 dark:border-indigo-900 rounded-xl space-y-1">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-200">NREM Stage 2 (N2): True Sleep</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Accounts for approximately 50% of total sleep time. Characterized by <em>sleep spindles</em> (brief bursts of 12–14 Hz activity) and <em>K-complexes</em> on EEG readings, which protect the brain from external noise disruptions.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-50/20 border border-indigo-200 dark:border-indigo-900 rounded-xl space-y-1">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-200">NREM Stage 3 (N3): Deep Slow-Wave Sleep</h3>
            <p className="text-slate-900 dark:text-slate-100">
              High-amplitude delta waves (&lt;2 Hz). This is the most physically restorative stage of sleep. Heart rate and blood pressure drop to their lowest points, and the pituitary gland secretes <strong>Human Growth Hormone (HGH)</strong> for cellular repair.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-50/20 border border-indigo-200 dark:border-indigo-900 rounded-xl space-y-1">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-200">REM Sleep: Dreaming & Cognitive Reset</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Brain activity accelerates to near-waking levels while somatic muscles experience temporary paralysis (atonia). REM sleep consolidates procedural and emotional memories and synthesizes learning.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY WAKING UP MID-CYCLE CAUSES "SLEEP INERTIA" */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Why Waking Up Mid-Cycle Causes "Sleep Inertia"
        </h2>
        <p>
          Have you ever slept for 9 full hours yet woken up feeling groggy, disoriented, and heavy-headed? This physiological phenomenon is known as <strong>sleep inertia</strong>.
        </p>
        <p>
          Sleep inertia occurs when an alarm interrupts your sleep during <strong>NREM Stage 3 deep slow-wave sleep</strong>. During N3 sleep, high levels of delta waves predominate in the cerebral cortex. Waking up suddenly forces your prefrontal cortex to transition from slow delta waves to fast beta waves instantaneously, leaving high levels of residual <strong>adenosine</strong> bound to neural receptors.
        </p>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-blue-600 dark:text-blue-400 font-bold">
          Optimal Wake Time = Target Bedtime + Sleep Latency Buffer (15m) + (N × 90m Cycles)
        </div>
      </section>

      {/* SECTION 3: SLEEP REQUIREMENT BENCHMARKS BY AGE TABLE */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Sleep Requirement Benchmarks by Age Table
        </h2>
        <p>
          The CDC and National Sleep Foundation (NSF) establish recommended sleep duration ranges across all 9 human life stages:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Age Bracket</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Recommended Daily Sleep</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Equivalent 90-Min Cycles</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Biological Notes</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800">
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Newborns (0–3 months)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 font-bold">14 – 17 Hours</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums">9 – 11 Cycles</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Polyphasic sleep pattern without established circadian rhythm.</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Infants (4–11 months)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 font-bold">12 – 15 Hours</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums">8 – 10 Cycles</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Circadian melatonin rhythms begin establishing around 4 months.</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Toddlers (1–2 years)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 font-bold">11 – 14 Hours</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums">7 – 9 Cycles</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Includes 1 to 2 daytime naps.</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Preschoolers (3–5 years)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 font-bold">10 – 13 Hours</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums">7 – 8.5 Cycles</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Growth hormone release during deep N3 sleep supports bone growth.</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">School Age (6–13 years)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 font-bold">9 – 11 Hours</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums">6 – 7.5 Cycles</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Critical for memory consolidation and academic performance.</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Teens (14–17 years)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 font-bold">8 – 10 Hours</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums">5.5 – 6.5 Cycles</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Pubertal circadian phase delay pushes natural bedtime 2 hours later.</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold text-blue-600">Adults (18–64 years)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 font-bold">7 – 9 Hours</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums font-bold">5 – 6 Cycles</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Optimal baseline for cardiovascular health and cognitive clarity.</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Older Adults (65+ years)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 font-bold">7 – 8 Hours</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums">4.5 – 5.5 Cycles</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">N3 deep sleep duration naturally decreases with age.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: CIRCADIAN RHYTHMS & CHRONOBIOLOGY */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Circadian Rhythms & Chronobiology
        </h2>
        <p>
          Your body's 24-hour master biological clock resides in the <strong>Suprachiasmatic Nucleus (SCN)</strong> within the hypothalamus. The SCN regulates body temperature, cortisol secretion, and the release of <strong>melatonin</strong> from the pineal gland.
        </p>
        
        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">The 4 Primary Chronotypes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Lion (Early Lark)</h4>
            <p className="text-slate-900 dark:text-slate-100">Wakes up naturally at 5:30–6:00 AM energized. Peak focus: 8:00 AM – 12:00 PM. Ideal bedtime: 9:00–10:00 PM.</p>
          </div>
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Bear (Solar Rhythm)</h4>
            <p className="text-slate-900 dark:text-slate-100">Represents 55% of people. Tracks the sun smoothly. Peak focus: 10:00 AM – 2:00 PM. Ideal bedtime: 10:00–11:00 PM.</p>
          </div>
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Wolf (Night Owl)</h4>
            <p className="text-slate-900 dark:text-slate-100">Sluggish in the morning. Peak mental performance: 5:00 PM – 9:00 PM. Ideal bedtime: 12:00–1:00 AM.</p>
          </div>
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Dolphin (Light Sleeper)</h4>
            <p className="text-slate-900 dark:text-slate-100">High intelligence, prone to anxiety and insomnia. Peak focus: 3:00 PM – 7:00 PM. Ideal bedtime: 11:30 PM.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE SCIENCE OF NAPPING */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. The Science of Napping (The Power Nap Blueprint)
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>The 20-Minute Power Nap:</strong> Keeps you in N1/N2 light sleep. Clears accumulated adenosine for an instant energy boost without sleep inertia.</li>
          <li><strong>The 90-Minute Full-Cycle Nap:</strong> Completes a full NREM/REM cycle for physical and cognitive recovery.</li>
          <li><strong>The Nappuccino (Caffeine Nap):</strong> Drink a cup of black coffee immediately before taking a 20-minute nap. Caffeine takes 20 minutes to clear adenosine receptors right as you wake up.</li>
        </ul>
      </section>

      {/* SECTION 6: EVIDENCE-BASED SLEEP HYGIENE */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Evidence-Based Sleep Hygiene Optimization Guide
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Cool Temperature Rule:</strong> Keep your bedroom at <strong>65°F (18.3°C)</strong>. Core body temperature must drop 2°F to initiate sleep.</li>
          <li><strong>Morning Sunlight Viewing:</strong> Get 10–15 minutes of outdoor sunlight within 30 minutes of waking to trigger cortisol awakening and set your 16-hour melatonin countdown clock.</li>
          <li><strong>Caffeine Half-Life Cutoff:</strong> Caffeine has a 5 to 7-hour half-life. Cut off coffee at least 8 to 10 hours before your planned bedtime.</li>
        </ul>
      </section>
    </article>
  );
}
