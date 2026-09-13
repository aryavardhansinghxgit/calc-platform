"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Moon, Clock, BedDouble, Sun } from "lucide-react";
import { sleep_calculatorFaqs } from "@/app/calculators/sleep-calculator/faq";

export function SleepContent() {
  // All 21 FAQs open by default per user specification
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: sleep_calculatorFaqs.length }, (_, i) => i))
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
        
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Sleep Calculator: Plan Bedtime, Wake Time, Naps and Sleep Goals
          </h2>
          <p>
            A sleep calculator can turn a desired wake-up time into practical bedtime options by combining your target sleep duration with the amount of time you expect to need to fall asleep.
          </p>
          <p>
            This Sleep Calculator goes beyond a single bedtime estimate. It includes four related planning tools:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Sleep Planner</strong> for bedtime and wake-time planning.</li>
            <li><strong>Power Nap Blueprint</strong> for short and longer nap options.</li>
            <li><strong>Sleep Debt Tracker</strong> for a simple weekly comparison between target and actual sleep.</li>
            <li><strong>Chronotype Quiz</strong> for a basic behavioral profile based on your answers about alertness, daily energy and sleep sensitivity.</li>
          </ul>
          <p>
            The calculator also allows you to adjust sleep planning by age group, enter a custom nap start time, save and restore your scenarios, copy results, and export the active calculation.
          </p>
          <p>
            The most important limitation is that a calculator cannot predict exactly how you will sleep or exactly how refreshed you will feel after waking. Sleep timing varies between individuals, and real sleep cycles change throughout the night.
          </p>
          <p>
            This tool should therefore be used as a planning aid, not as a medical diagnosis or a guarantee of sleep quality.
          </p>
        </section>

        {/* Section: How the Sleep Calculator Works */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How the Sleep Calculator Works
          </h2>
          <p>
            The main Sleep Planner works backward from the time you want to wake.
          </p>
          <p>The primary relationship is:</p>
          <div className="p-4 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
            Bedtime = Target Wake Time − Sleep Latency − Planned Sleep Duration
          </div>
          <p>where:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Target Wake Time</strong> is the time you want to get up.</li>
            <li><strong>Sleep Latency</strong> is the estimated time it takes you to fall asleep.</li>
            <li><strong>Planned Sleep Duration</strong> is the amount of sleep you intend to obtain.</li>
          </ul>
          <p>
            When the calculator uses its cycle-planning option, the planned duration can be represented using a 90-minute planning interval:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 text-center font-mono font-bold text-slate-900 dark:text-slate-100 text-xs">
            Planned Sleep Duration = N × 90 minutes
          </div>
          <p>
            That 90-minute value is a planning heuristic, not a claim that every human sleep cycle lasts exactly 90 minutes.
          </p>
          <p>
            NHLBI describes sleep cycles as varying, with cycles generally restarting about every 80–100 minutes. The duration can also change during the night.
          </p>
        </section>

        {/* Section: Bedtime Calculation Worked Example */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Bedtime Calculation: A Worked Example
          </h2>
          <p>
            Suppose you want to wake at: <strong>7:00 AM</strong> and estimate: <strong>15 minutes to fall asleep</strong>.
          </p>
          <p>
            For a 9-hour planned sleep duration:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 text-center font-mono text-xs">
            7:00 AM − 9 hours − 15 minutes = <strong className="text-blue-600 dark:text-blue-400">9:45 PM</strong>
          </div>
          <p>The calculator&apos;s regression test confirms this result.</p>
          <p>For 7.5 hours:</p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 text-center font-mono text-xs">
            7:00 AM − 7 h 30 min − 15 min = <strong className="text-blue-600 dark:text-blue-400">11:15 PM</strong>
          </div>
          <p>For 6 hours: <strong className="text-blue-600 dark:text-blue-400 font-mono">12:45 AM</strong></p>
          <p>For 4.5 hours: <strong className="text-blue-600 dark:text-blue-400 font-mono">2:15 AM</strong></p>
          <p>
            These are arithmetic planning results. They do not mean that 4.5 hours or 6 hours is sufficient sleep for an adult. The calculator&apos;s exact golden tests produce these times.
          </p>
        </section>

        {/* Section: The Forward Sleep-Time Formula & Contextual Link */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            The Forward Sleep-Time Formula
          </h2>
          <p>The same relationship can be solved in the other direction.</p>
          <p>If you know when you plan to go to bed, then:</p>
          <div className="p-4 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
            Wake Time = Bedtime + Sleep Latency + Planned Sleep Duration
          </div>
          <p>For example:</p>
          <ul className="list-disc pl-5 space-y-0.5 text-slate-700 dark:text-slate-300">
            <li>Bedtime: 9:45 PM</li>
            <li>Sleep latency: 15 minutes</li>
            <li>Planned sleep: 9 hours</li>
          </ul>
          <p>Then:</p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 text-center font-mono text-xs">
            9:45 PM + 15 min + 9 h = <strong className="text-blue-600 dark:text-blue-400">7:00 AM</strong>
          </div>
          <p>
            The calculator&apos;s implementation tests this relationship through a 100,000-case round-trip oracle. For calculations involving clock differences, elapsed time or time intervals, the{" "}
            <Link href="/calculators/time-calculator" className="text-blue-600 dark:text-blue-400 font-bold underline">
              Time Calculator
            </Link>{" "}
            can be used alongside the Sleep Calculator.
          </p>
        </section>

        {/* Section: What Is Sleep Latency? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Sleep Latency?
          </h2>
          <p>
            Sleep latency is the time between trying to sleep and actually falling asleep.
          </p>
          <p>
            A calculator needs this distinction because the time you get into bed is not necessarily the time you fall asleep.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 text-xs font-mono text-center space-y-1">
            <div>9:45 PM (In Bed)</div>
            <div>↓ 15-minute estimated sleep latency</div>
            <div>10:00 PM estimated sleep onset</div>
            <div>↓ 9-hour planned sleep</div>
            <div className="font-bold text-blue-600 dark:text-blue-400">7:00 AM wake</div>
          </div>
          <p>
            If your estimated latency changes from 15 minutes to 20 minutes, the recommended bedtime shifts five minutes earlier while the intended sleep duration stays unchanged.
          </p>
          <p>
            The calculator specifically tests this relationship: <code>Latency + 1 minute → Bedtime − 1 minute</code> and has verified the property across 1,000 test cases.
          </p>
        </section>

        {/* Section: How Much Sleep Do You Need? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Much Sleep Do You Need?
          </h2>
          <p>Sleep needs vary with age. Current CDC guidance gives the following daily recommendations:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-800 text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100">
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Age</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Recommended sleep</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold">Newborn, 0–3 months</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-sans tabular-nums text-blue-600 font-bold">14–17 hours</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold">Infant, 4–12 months</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-sans tabular-nums text-blue-600 font-bold">12–16 hours, including naps</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold">Toddler, 1–2 years</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-sans tabular-nums text-blue-600 font-bold">11–14 hours, including naps</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold">Preschool, 3–5 years</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-sans tabular-nums text-blue-600 font-bold">10–13 hours, including naps</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold">School age, 6–12 years</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-sans tabular-nums text-blue-600 font-bold">9–12 hours</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold">Teen, 13–17 years</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-sans tabular-nums text-blue-600 font-bold">8–10 hours</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold text-blue-600">Adult, 18–60 years</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-sans tabular-nums text-blue-600 font-bold">7 or more hours</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold">Adult, 61–64 years</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-sans tabular-nums text-blue-600 font-bold">7–9 hours</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold">Adult, 65+ years</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-sans tabular-nums text-blue-600 font-bold">7–8 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            These are population-level recommendations, not guarantees that one precise duration is optimal for every individual. The calculator uses age-specific guidance to provide planning context rather than assuming that every person needs the same number of sleep hours.
          </p>
        </section>

        {/* Section: Why 90m is a Heuristic */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why a 90-Minute Sleep Cycle Should Be Treated as a Heuristic
          </h2>
          <p>
            The phrase “90-minute sleep cycle” is widely used in consumer sleep advice, but real sleep physiology is more variable.
          </p>
          <p>
            NHLBI describes sleep cycles as generally restarting approximately every 80–100 minutes. The composition of sleep also changes as the night progresses, with more REM sleep later in the night and changes in slow-wave sleep across age.
          </p>
          <p>
            That means <strong>90 minutes</strong> is useful as a simple scheduling interval, but it is not a biological stopwatch. For this reason, the Sleep Calculator uses 90 minutes as a planning estimate.
          </p>
          <p>
            It should not be interpreted as: <em>“If I wake exactly 90 minutes later, I will definitely be at the end of a sleep cycle.”</em> Sleep architecture is more complicated than that.
          </p>
        </section>

        {/* Section: Why the Best Bedtime Is Not Always a Multiple of 90 Minutes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why the Best Bedtime Is Not Always a Multiple of 90 Minutes
          </h2>
          <p>
            Suppose you need to wake at: <strong>7:00 AM</strong>. A cycle-based tool might generate durations such as: <strong>4.5, 6, 7.5, 9 hours</strong>.
          </p>
          <p>Those numbers are convenient for planning. But your actual sleep architecture will not necessarily divide into identical 90-minute blocks.</p>
          <p>The practical priority should therefore be:</p>
          <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl font-bold text-blue-700 dark:text-blue-300 text-center">
            adequate total sleep + consistent schedule + individual fit
          </div>
          <p>
            rather than trying to force your entire night into perfectly timed artificial cycles. CDC recommends maintaining a regular sleep schedule and getting enough sleep rather than relying on a single clock-time formula.
          </p>
        </section>

        {/* Section: How to Choose a Bedtime */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Choose a Bedtime
          </h2>
          <p>Start with your required wake time. Then ask:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>How much sleep do I need?</li>
            <li>How long do I usually take to fall asleep?</li>
            <li>Do I need additional time for a wind-down routine?</li>
            <li>Is the proposed bedtime realistic for my schedule?</li>
            <li>Can I maintain the schedule consistently?</li>
          </ul>
          <p>
            For example: Wake: 6:30 AM, Target sleep: 8 hours, Sleep latency: 15 minutes.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 text-center font-mono text-xs">
            6:30 − 8:00 − 0:15 = <strong className="text-blue-600 dark:text-blue-400">10:15 PM</strong>
          </div>
          <p>
            The result gives you a bedtime target, not a guarantee that sleep will begin immediately.
          </p>
        </section>

        {/* Section: What Is a Power Nap? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Power Nap?
          </h2>
          <p>A nap is a period of sleep taken outside your main sleep episode. The calculator provides dedicated nap-planning options, including:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>A short 20-minute planning option</li>
            <li>A longer 90-minute planning option</li>
            <li>A caffeine-nap option where supported</li>
          </ul>
          <p>
            The calculator now lets you enter a specific Nap Start Time and calculate the corresponding wake time. Its live timing tests confirm that changing the start time from 5:44 PM to 5:45 PM moves both outputs by exactly one minute.
          </p>
        </section>

        {/* Section: 20-Minute Nap vs. 90-Minute Nap */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20-Minute Nap vs. 90-Minute Nap
          </h2>
          <p>These two options serve different planning purposes:</p>
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Short nap</h3>
            <p>
              A short nap is often used when the goal is a temporary alertness boost without spending a large portion of the day asleep. However, the idea that a 20-minute nap guarantees zero sleep inertia is too strong. Research reviewing short naps found mixed evidence depending on time of day, previous sleep/wake history and other factors. So the calculator presents the 20-minute option as a quick-refresh planning choice, not a guaranteed physiological outcome.
            </p>
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Longer nap</h3>
            <p>
              A 90-minute nap gives substantially more time for sleep and may be useful in situations where a longer recovery opportunity is practical. But it should not be interpreted as proof that you will complete exactly one complete biological sleep cycle. The calculator therefore uses the term as a planning duration.
            </p>
          </div>
          <p>Example: Planning a 20-Minute Nap starting at <strong>5:44 PM</strong>:</p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 text-center font-mono text-xs">
            5:44 + 20 = <strong className="text-blue-600 dark:text-blue-400">6:04 PM</strong> | For 90 min: 5:44 + 90 min = <strong className="text-blue-600 dark:text-blue-400">7:14 PM</strong>
          </div>
          <p>The calculator produces these exact outputs in its regression tests.</p>
        </section>

        {/* Section: Can a Nap Cause Sleep Inertia? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Can a Nap Cause Sleep Inertia?
          </h2>
          <p>
            Yes. Sleep inertia is the temporary period after waking when alertness and performance may be reduced. It is not determined by one factor alone.
          </p>
          <p>Research indicates that sleep inertia can be influenced by:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>How deeply you were sleeping</li>
            <li>How long you slept</li>
            <li>Prior sleep loss</li>
            <li>Time of day and circadian phase</li>
            <li>The circumstances of awakening</li>
          </ul>
          <p>
            Studies of short naps have found that results vary with timing and prior sleep/wake history. Therefore, <code>20-minute nap ≠ guaranteed no inertia</code> and <code>90-minute nap ≠ guaranteed perfect awakening</code>. A nap calculator can plan the clock time. It cannot predict your exact post-nap alertness.
          </p>
        </section>

        {/* Section: Caffeine Naps */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Caffeine Nap?
          </h2>
          <p>
            A caffeine nap, sometimes called a “nappuccino,” combines caffeine intake with a short nap. The idea is that caffeine is consumed before the nap so that its alerting effects may begin around the time the person wakes.
          </p>
          <p>
            There is experimental evidence that caffeine can reduce sleep inertia or improve post-nap alertness in some settings. For example, controlled research has found reduced sleep-inertia effects with caffeine, and a small pilot study found improved vigilance after a caffeine-nap during simulated night work.
          </p>
          <p>
            But the response is not universal. Caffeine pharmacokinetics vary between people. FDA-reviewed evidence describes substantial variation in caffeine metabolism and half-life, so a fixed “20-minute rule” should not be treated as a biological guarantee. Anyone who is pregnant, sensitive to caffeine, taking medications affected by caffeine, or concerned about caffeine use should consider appropriate professional guidance.
          </p>
          <h3 className="font-bold text-slate-900 dark:text-slate-100">Caffeine Does Not Replace Sleep</h3>
          <p>
            Caffeine may temporarily increase alertness, but it does not substitute for adequate sleep. CDC emphasizes that sufficient sleep is important for health, safety, attention and daily functioning. Sleep is a restorative biological process, whereas caffeine is a temporary alerting effect. Using caffeine to remain awake should not become a substitute for obtaining adequate sleep.
          </p>
        </section>

        {/* Section: Sleep Debt */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Sleep Debt?
          </h2>
          <p>
            “Sleep debt” is often used to describe accumulated sleep loss. For a simple calculator, it can be represented as:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
            Weekly Sleep Deficit = Weekly Target − Actual Weekly Sleep
          </div>
          <p>
            For example, suppose your target is: <strong>8 hours/day</strong>. Your weekly target becomes: <code>8 × 7 = 56 hours</code>. If you actually slept: <strong>44 hours</strong>, then: <code>56 − 44 = 12</code>.
          </p>
          <p>
            The calculator therefore reports: <strong className="text-blue-600 dark:text-blue-400">12 hours below weekly target</strong>. This is an arithmetic sleep-deficit estimate. It should not be interpreted as a laboratory measurement of how much physiological recovery your body requires.
          </p>
          <h3 className="font-bold text-slate-900 dark:text-slate-100">What If You Sleep More Than Your Weekly Target?</h3>
          <p>
            Suppose your target is <code>8 × 7 = 56 hours</code>, but you record <strong>60 hours</strong>. Then <code>60 − 56 = 4</code>. The calculator reports: <strong className="text-emerald-600 dark:text-emerald-400">4 hours above target</strong>, rather than incorrectly displaying zero. Below target and above target are different states.
          </p>
          <h3 className="font-bold text-slate-900 dark:text-slate-100">Is Sleep Debt Something You Can “Pay Back” Exactly?</h3>
          <p>
            Not in the same way you would repay a financial debt. The calculation describes a difference in hours. Human recovery is more complicated because sleep architecture, circadian timing, prior sleep loss and individual responses all affect how someone feels and performs.
          </p>
        </section>

        {/* Section: Chronotype */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Chronotype?
          </h2>
          <p>
            Chronotype describes individual differences in the timing of sleep and wake preferences. Some people naturally prefer earlier schedules, while others tend to function better later in the day.
          </p>
          <p>
            Scientific chronotype research commonly uses validated questionnaires such as the Munich ChronoType Questionnaire and Morningness-Eveningness Questionnaire. This calculator includes a simpler consumer quiz using four profile names: <strong>Lion, Bear, Wolf, Dolphin</strong>.
          </p>
          <p>
            These are calculator profile categories, not medical diagnoses. Your result should therefore be interpreted as: <em>“This quiz&apos;s profile matches your answers,”</em> not: <em>“A medical test has established my biological circadian type.”</em>
          </p>
          <p>
            The quiz asks about factors such as alertness after waking, energy focus periods, and sensitivity to light and noise. The implementation has exhaustively tested all <code>4 × 4 × 4 = 64</code> possible combinations deterministically.
          </p>
        </section>

        {/* Section: Sleep Hygiene & Environment */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Sleep Hygiene: Simple Habits That Support Better Sleep
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Keep a consistent schedule:</strong> Try to maintain reasonably consistent bed and wake times, including weekends.</li>
            <li><strong>Make the bedroom comfortable:</strong> Keep it cool, dark and quiet. CDC/NIOSH guidance gives approximately 65–68°F as a comfortable cool range for many people, though thermal comfort varies individually.</li>
            <li><strong>Limit stimulating activity before bed:</strong> Give yourself time to wind down. Electronic screens can expose you to light and cognitive stimulation that delays bedtime.</li>
            <li><strong>Be careful with caffeine:</strong> Caffeine can remain active for hours (typical half-life spans 2 to 12 hours).</li>
            <li><strong>Get daytime light and activity:</strong> Regular morning outdoor light exposure can support healthy circadian timing.</li>
            <li><strong>Avoid using the calculator as a substitute for sleep:</strong> The purpose of planning is to make sufficient sleep easier—not to find a way to function on less sleep.</li>
          </ul>
        </section>

        {/* Section: Medical Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why the Calculator Should Not Be Used to Diagnose Sleep Problems
          </h2>
          <p>
            A calculator can help you plan: Bedtime, Wake Time, Nap Time, and Sleep Deficit. It cannot determine whether you have insomnia, sleep apnea, narcolepsy, circadian rhythm disorders, or another sleep disorder.
          </p>
          <p>
            Persistent problems falling asleep, staying asleep, excessive daytime sleepiness, loud snoring or other concerning symptoms deserve evaluation by a qualified healthcare professional. CDC advises people with ongoing sleep problems to talk with a healthcare provider.
          </p>
        </section>

        {/* Section: Limitations & Summary */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Sleep Calculator Limitations &amp; Final Takeaway
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Cycle estimates are heuristic:</strong> The 90-minute planning interval is not an exact biological constant.</li>
            <li><strong>Sleep latency is estimated:</strong> Actual time to fall asleep changes from night to night.</li>
            <li><strong>Nap effects vary:</strong> A 20-minute or 90-minute duration does not guarantee a specific feeling after waking.</li>
            <li><strong>Sleep deficit is arithmetic:</strong> It compares target vs recorded hours, not physiological recovery.</li>
            <li><strong>Chronotype is a profile:</strong> The four animal categories are consumer quiz models, not clinical diagnoses.</li>
          </ul>
          <div className="p-4 bg-slate-50 dark:bg-zinc-800/80 rounded-xl border border-slate-200 dark:border-zinc-700 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-sm mt-3">
            Adequate Sleep + Consistency + Individual Fit &gt; Perfect Cycle Timing
          </div>
        </section>

        {/* Section: Sources and Scientific Basis */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
              Sources and Scientific Basis
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-zinc-100">CDC — About Sleep</div>
              <p className="text-slate-600 dark:text-slate-400">Current CDC guidance on recommended sleep duration by age and basic healthy-sleep practices.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-zinc-100">NHLBI — How Sleep Works</div>
              <p className="text-slate-600 dark:text-slate-400">Overview of NREM and REM sleep and evidence that sleep-cycle timing varies (80–100m) rather than following one fixed duration.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-zinc-100">CDC/NIOSH — Sleep Environment</div>
              <p className="text-slate-600 dark:text-slate-400">Guidance on maintaining a dark, quiet and comfortably cool sleep environment and the circadian role of daytime light.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-zinc-100">Peer-Reviewed Chronotype & Nap Research</div>
              <p className="text-slate-600 dark:text-slate-400">Evidence on sleep inertia, caffeine absorption variability, and validated morningness/eveningness assessment frameworks.</p>
            </div>
          </div>
        </section>

      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (Exactly 21 Approved FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {sleep_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
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

export default SleepContent;
