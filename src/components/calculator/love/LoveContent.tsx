"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  Heart,
  Compass,
  Flame,
  Calendar,
  ShieldCheck,
  Brain,
  Scale,
  Users,
  CheckCircle2,
} from "lucide-react";
import { love_calculatorFaqs } from "@/app/calculators/love-calculator/faq";

export function LoveContent() {
  // All FAQs unfolded (open by default), adhering strictly to the 401(k) calculator standard
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: love_calculatorFaqs.length }, (_, i) => i))
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
        
        {/* Featured Snippet Target Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-blue-50/70 dark:bg-blue-950/25 border border-blue-200 dark:border-blue-900/50 space-y-2">
          <h3 className="font-bold text-sm sm:text-base text-blue-900 dark:text-blue-300 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            What is a Love Calculator?
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            A <strong>Love Calculator</strong> is an interactive compatibility tool that estimates relationship compatibility using names, zodiac signs, birth dates, numerology patterns, or other matching systems. It is primarily used for entertainment and self-reflection rather than prediction. Modern multi-engine tools function as a <strong>love percentage calculator</strong>, <strong>crush calculator</strong>, and <strong>relationship compatibility test</strong>, allowing partners to explore communication, emotional chemistry, and personality dynamics in a fun, structured way.
          </p>
        </div>

        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Discover Your Compatibility with Our Love Calculator
          </h2>
          <p>
            Relationships are complex. Attraction, communication, emotional understanding, shared goals, and long-term compatibility all play a role in determining how two people connect. While no online tool can predict the future of a relationship, a well-designed <strong>compatibility calculator</strong> can offer an entertaining and insightful way to explore different aspects of a connection.
          </p>
          <p>
            Our <strong>Love Calculator &amp; Relationship Matcher</strong> combines multiple compatibility methods into a single unified experience. Instead of relying on one simple percentage, it evaluates compatibility through several popular approaches, including name numerology, zodiac astrology, life path analysis, classic FLAMES matching, and a combined Ultimate Chemistry score.
          </p>
          <p>
            Whether you&apos;re curious about a new crush, comparing relationship dynamics with a long-term partner, or simply looking for a playful <strong>soulmate calculator</strong> to share with friends, this tool provides a richer compatibility experience than traditional single-algorithm love percentage tools.
          </p>
        </section>

        {/* Section 2: What Makes This Love Calculator Different */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Makes This Love Calculator Different?
          </h2>
          <p>
            Many online love calculators generate a random number and present it as a compatibility score. This calculator takes a different approach by running multiple independent compatibility engines completely client-side:
          </p>

          <div className="space-y-4">
            {/* Engine 1 */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                1. Name Numerology Compatibility
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Numerology examines phonetic and alphabetical patterns found within names and converts letters into numerical frequencies from 1 to 9 based on ancient Pythagorean mathematics. Summing vowels determines the Soul Urge number (inner desires), while summing consonants yields the Personality number (external expression). The goal is not supernatural fortune-telling but pattern analysis. For individuals exploring core name vibrations, our{" "}
                <Link
                  href="/calculators/love-calculator"
                  className="text-blue-600 dark:text-blue-400 font-medium underline"
                >
                  Numerology Calculator
                </Link>{" "}
                evaluates natural harmonic resonance between two name profiles.
              </p>
            </div>

            {/* Engine 2 */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <Compass className="h-4 w-4 text-purple-500" />
                2. Zodiac Compatibility &amp; Synastry
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Astrology has long explored how different sun signs interact. Our <strong>zodiac love calculator</strong> evaluates compatibility using elemental relationships across Western astrological triplicities:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">🔥 Fire Signs</span>
                  <span className="text-slate-600 dark:text-slate-400">Aries • Leo • Sagittarius (Passionate, dynamic, spontaneous)</span>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">🌿 Earth Signs</span>
                  <span className="text-slate-600 dark:text-slate-400">Taurus • Virgo • Capricorn (Grounded, practical, dependable)</span>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-sky-600 dark:text-sky-400 block mb-1">💨 Air Signs</span>
                  <span className="text-slate-600 dark:text-slate-400">Gemini • Libra • Aquarius (Intellectual, social, communicative)</span>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">🌊 Water Signs</span>
                  <span className="text-slate-600 dark:text-slate-400">Cancer • Scorpio • Pisces (Intuitive, empathetic, deep-feeling)</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                Each element exhibits natural strengths when paired with complementary elements. To explore astrological synastry in detail, test your signs directly in the{" "}
                <Link
                  href="/calculators/love-calculator"
                  className="text-blue-600 dark:text-blue-400 font-medium underline"
                >
                  Zodiac Compatibility Calculator
                </Link>{" "}
                module.
              </p>
            </div>

            {/* Engine 3 */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                3. Life Path Compatibility
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Life Path Numbers are calculated from complete birth dates (YYYY-MM-DD). By reducing birth dates to a single digit (1–9) or Master Numbers (11, 22, 33), a{" "}
                <Link
                  href="/calculators/love-calculator"
                  className="text-blue-600 dark:text-blue-400 font-medium underline"
                >
                  Life Path Number Calculator
                </Link>{" "}
                sheds light on core motivations, lifestyle preferences, and long-term evolutionary compatibility factors between partners.
              </p>
            </div>

            {/* Engine 4 */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <Flame className="h-4 w-4 text-amber-500" />
                4. Authentic 90s FLAMES Relationship Matching
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                FLAMES is the classic schoolyard pencil-and-paper relationship game that defined a generation. FLAMES stands for:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold">
                <span className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <strong>F</strong> = Friends
                </span>
                <span className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <strong>L</strong> = Lovers
                </span>
                <span className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <strong>A</strong> = Affection
                </span>
                <span className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <strong>M</strong> = Marriage
                </span>
                <span className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <strong>E</strong> = Enemies
                </span>
                <span className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <strong>S</strong> = Siblings
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Unlike shallow apps that use a modulo shortcut, our engine performs true circular iterative elimination across the 6 letters, matching authentic schoolyard gameplay down to the exact cancellation step.
              </p>
            </div>

            {/* Engine 5 */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                5. Ultimate Chemistry &amp; Love Match Score
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                The Ultimate Chemistry engine integrates all four frameworks into a single balanced 100% weighting: Name Numerology (25%), Zodiac Elemental Synastry (30%), Birthday Life Path (25%), and FLAMES Outcome (20%). This delivers a nuanced <strong>romantic compatibility calculator</strong> score that reflects multiple facets of attraction and partnership.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: The Psychology & Biological Chemistry of Attraction */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            The Psychology &amp; Biological Chemistry of Attraction
          </h2>
          <p>
            Romantic attraction and emotional bonding are driven by complex neurochemical cascades, evolutionary psychology, and biological attachment mechanisms. When two people experience mutual romantic chemistry, four primary neurotransmitters and hormones flood the brain&apos;s limbic circuitry:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h4 className="font-bold text-sm text-rose-600 dark:text-rose-400">1. Dopamine (Pleasure &amp; Motivation)</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Triggers intense feelings of euphoria, motivation, and focused romantic attention upon seeing or thinking about a romantic partner. Dopamine stimulates the same neural reward pathways activated by thrill-seeking behaviors.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">2. Oxytocin (Bonding &amp; Pair-Attachment)</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Known as the &quot;cuddle hormone,&quot; oxytocin is released during physical affection, sustained eye contact, and emotional intimacy, deepening long-term security, trust, and pair-bonding stability.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h4 className="font-bold text-sm text-purple-600 dark:text-purple-400">3. Serotonin (Infatuation &amp; Fixation)</h4>
              <p className="text-slate-600 dark:text-slate-300">
                During early stages of romantic infatuation, serotonin levels temporarily drop, sparking frequent, intrusive daydreams about one&apos;s new partner—the classic neurological hallmark of a &quot;crush.&quot;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h4 className="font-bold text-sm text-amber-600 dark:text-amber-400">4. Norepinephrine (Adrenaline &amp; Excitement)</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Produces physiological arousal—causing butterflies in the stomach, racing heartbeats, heightened energy, and intense alertness during early romantic encounters.
              </p>
            </div>
          </div>

          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-zinc-100 pt-2">
            Helen Fisher&apos;s 3 Evolutionary Stages of Love
          </h3>
          <p>
            Renowned biological anthropologist Dr. Helen Fisher categorizes human romantic development into three distinct evolutionary phases:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li><strong>Lust (Driven by Testosterone &amp; Estrogen):</strong> The foundational evolutionary urge for mating, physical attraction, and romantic discovery.</li>
            <li><strong>Attraction (Driven by Dopamine, Norepinephrine &amp; Low Serotonin):</strong> The exhilarating infatuation phase where couples focus their emotional energy exclusively on each other.</li>
            <li><strong>Attachment (Driven by Oxytocin &amp; Vasopressin):</strong> The mature, long-term bonding phase that sustains couples through shared homes, mutual responsibilities, and lifelong partnership.</li>
          </ol>

          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-zinc-100 pt-2">
            Why Do People Seek Compatibility Tests &amp; Crush Calculators?
          </h3>
          <p>
            Psychologists note that using a <strong>crush calculator</strong> or <strong>relationship compatibility test</strong> fulfills deep-seated human desires for self-reflection, reassurance, and conversational play. Humans naturally seek patterns and narratives to understand emotional uncertainty. Testing compatibility provides a safe, low-stakes psychological framework to explore feelings, voice shared hopes, and spark candid conversations about what both partners value in love.
          </p>
        </section>

        {/* Section 4: How to Use the Love Calculator */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the Love Calculator
          </h2>
          <p>Using our <strong>love match calculator</strong> takes only a few simple steps:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="text-xs font-black text-rose-600 dark:text-rose-400">STEP 1</span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-zinc-100">Enter Both Names</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Provide first names, full names, or nicknames for both partners.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="text-xs font-black text-blue-600 dark:text-blue-400">STEP 2</span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-zinc-100">Provide Birthdates &amp; Zodiac</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Optionally enter birth dates and zodiac signs for multi-engine matching.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="text-xs font-black text-purple-600 dark:text-purple-400">STEP 3</span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-zinc-100">Choose Analysis Engine</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Select Numerology, Zodiac, Life Path, FLAMES, or Ultimate Chemistry.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">STEP 4</span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-zinc-100">Calculate Compatibility</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Click calculate to produce immediate client-side results and couple moniker.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="text-xs font-black text-amber-600 dark:text-amber-400">STEP 5</span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-zinc-100">Review Full Breakdown</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Examine your score, 4-pillar dimensions, advice, and FLAMES prediction.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">STEP 6</span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-zinc-100">Export Report or Share</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Download an official PDF audit report or copy your custom share card.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Understanding Your Compatibility Score */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Understanding Your Compatibility Score
          </h2>
          <p>
            The percentage generated by this <strong>love percentage calculator</strong> is structured to help interpret relationship trends across four benchmark tiers:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-zinc-100 text-sm">0–30% (Opposites Attract / High Growth)</span>
              <p className="text-slate-600 dark:text-slate-300">
                Potential personality differences may outweigh immediate similarities. This does not mean a relationship cannot work. In fact, many successful relationships involve complementary partners who balance each other&apos;s strengths and weaknesses.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-zinc-100 text-sm">31–60% (Moderate Dynamic Alignment)</span>
              <p className="text-slate-600 dark:text-slate-300">
                Moderate compatibility. Key areas naturally harmonize while other dimensions require deliberate effort, empathetic listening, and intentional communication to flourish over time.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-zinc-100 text-sm">61–80% (Strong Natural Synergy)</span>
              <p className="text-slate-600 dark:text-slate-300">
                Strong compatibility. Shared core values, balanced communication styles, and mutual emotional appreciation actively support a fulfilling and resilient connection.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-zinc-100 text-sm">81–100% (Exceptional Soulmate Potential)</span>
              <p className="text-slate-600 dark:text-slate-300">
                Very high compatibility. Multiple compatibility indicators align positively, creating effortless rapport, shared humour, intuitive understanding, and seamless collaborative energy.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200 text-xs">
            <strong>Remember:</strong> A score is not destiny. Communication, trust, emotional maturity, and shared commitment will always outweigh any calculated percentage.
          </div>
        </section>

        {/* Section 6: Compatibility Pillars Explained */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Compatibility Pillars Explained
          </h2>
          <p>
            Our engine evaluates four distinct dimensions to provide a multi-pillar assessment of relationship dynamics:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-rose-600 dark:text-rose-400 text-sm">Romantic Passion</span>
              <p className="text-slate-600 dark:text-slate-300">
                Measures physical attraction, dopamine-fueled excitement, romantic chemistry, and emotional intensity between partners.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">Intellectual Communication</span>
              <p className="text-slate-600 dark:text-slate-300">
                Evaluates cognitive alignment, intellectual curiosity, conversational ease, and how effectively partners exchange complex perspectives.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-purple-600 dark:text-purple-400 text-sm">Emotional Trust</span>
              <p className="text-slate-600 dark:text-slate-300">
                Examines psychological safety, reciprocal vulnerability, emotional dependability, and freedom from fear of judgment.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Long-Term Vision</span>
              <p className="text-slate-600 dark:text-slate-300">
                Considers life trajectory alignment, financial values, career support, family expectations, and shared definitions of life purpose.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            A thriving relationship depends on balanced health across all four pillars rather than an isolated spike in a single area.
          </p>
        </section>

        {/* Section 7: What Actually Predicts Relationship Success? */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            What Actually Predicts Relationship Success?
          </h2>
          <p>
            Decades of clinical psychological research—most notably conducted by Dr. John Gottman and Dr. Julie Schwartz Gottman at The Gottman Institute—reveal that enduring love is governed by observable, learned behavioral habits:
          </p>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h4 className="font-bold text-sm text-slate-900 dark:text-zinc-100">1. Constructive Communication &amp; The 5:1 Ratio</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Stable, happy couples maintain a minimum ratio of <strong>5 positive interactions to every 1 negative interaction</strong> during moments of conflict. Positive interactions include humor, validation, active listening, and affectionate touch.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h4 className="font-bold text-sm text-slate-900 dark:text-zinc-100">2. Avoiding Gottman&apos;s &quot;Four Horsemen&quot;</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li><strong>Criticism:</strong> Attacking a partner&apos;s character rather than addressing a specific behavior.</li>
                <li><strong>Contempt:</strong> Expressing mockery, sarcasm, or eye-rolling (the single strongest predictor of divorce).</li>
                <li><strong>Defensiveness:</strong> Making excuses or blaming your partner rather than owning your part.</li>
                <li><strong>Stonewalling:</strong> Withdrawing emotionally and refusing to participate in communication.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h4 className="font-bold text-sm text-slate-900 dark:text-zinc-100">3. Emotional Attunement &amp; Everyday Bids for Connection</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Throughout ordinary days, partners make minor &quot;bids&quot; for attention, affection, or humor. Couples who &quot;turn toward&quot; these bids build an emotional reservoir of goodwill, creating profound everyday intimacy.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 mt-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100">
              Common Factors That Influence Relationships
            </h3>
            <pre className="font-mono text-[11px] sm:text-xs leading-relaxed text-slate-700 dark:text-slate-300 overflow-x-auto p-2">
{`          Relationship Success
                    │
    ┌───────────────┼───────────────┐
    │               │               │
 Communication    Trust          Respect
    │               │               │
 Emotional       Honesty       Shared Goals
 Support         Openness      Commitment`}
            </pre>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              While compatibility tools provide entertaining insights, the strongest relationships are created through daily empathy, mutual respect, and emotional maturity.
            </p>
          </div>
        </section>

        {/* Section 8: Comparison Intent Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Comparison: Evaluating Compatibility Methods
          </h2>
          <p>
            When searching for a <strong>true love calculator</strong> or <strong>compatibility test</strong>, users often wonder how different methodologies compare. Here is how modern approaches differ:
          </p>

          <div className="space-y-3 text-xs sm:text-sm">
            {/* Comparison 1 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-zinc-100">Numerology vs. Zodiac Compatibility</h4>
              <p className="text-slate-600 dark:text-slate-300">
                <strong>Name Numerology</strong> focuses on phonetic patterns, vowel resonance, and vibrational frequencies derived from names. In contrast, <strong>Zodiac Synastry</strong> examines birth dates relative to seasonal sun positions, comparing elemental temperaments (Fire, Earth, Air, Water). While numerology evaluates personal identity vibrations, astrology examines interpersonal behavioral rhythms.
              </p>
            </div>

            {/* Comparison 2 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-zinc-100">FLAMES vs. Modern Compatibility Tests</h4>
              <p className="text-slate-600 dark:text-slate-300">
                <strong>FLAMES</strong> is a beloved 90s cultural pencil-and-paper game based on letter cancellation. It is designed purely for playful recreation. Modern multi-engine compatibility platforms synthesize multiple data points (birth dates, name letters, elemental archetypes) to deliver a comprehensive 4-pillar analysis across passion, communication, trust, and shared values.
              </p>
            </div>

            {/* Comparison 3 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-zinc-100">Love Calculators vs. Psychological Personality Matching</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Algorithmic love calculators provide immediate, engaging insights based on names and dates. Scientific personality systems (such as the Big Five OCEAN inventory or Myers-Briggs Type Indicator) require extensive psychometric self-reports to measure introversion, conscientiousness, and emotional stability. Both approaches offer unique angles for self-exploration and conversation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: Feature Comparison Table */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Love Calculator vs Zodiac Compatibility Calculator
          </h2>
          <p>
            If you are exploring astrology-based matching, you may also consider a dedicated{" "}
            <Link
              href="/calculators/love-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Zodiac Compatibility Calculator
            </Link>
            . The table below outlines how a multi-engine platform compares to single-purpose astrological tools:
          </p>

          <div className="overflow-x-auto my-3">
            <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-700">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-zinc-100 font-bold">
                <tr>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Feature</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Love Calculator</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Zodiac Compatibility Calculator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700">Name Analysis</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-slate-500">No</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700">Numerology</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-slate-500">No</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700">Life Path Numbers</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-slate-500">No</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700">FLAMES Matching</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-slate-500">No</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700">Astrology</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-bold">Yes</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700">Combined Score</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-bold">Yes (Ultimate)</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-slate-500">Limited</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For users seeking holistic relationship analysis, a multi-engine compatibility platform offers a far more complete perspective.
          </p>
        </section>

        {/* Section 10: Related Reading Within Calculator Ecosystem */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Related Reading Within Your Calculator Ecosystem
          </h2>
          <p>
            Explore complementary tools in our lifestyle and chronological suite to calculate couple milestones, anniversaries, and personal patterns:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <Link
                href="/calculators/age-calculator"
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline block text-sm"
              >
                Age Calculator
              </Link>
              <p className="text-slate-600 dark:text-slate-400">
                Determine exact chronological age differences between partners down to days, hours, and minutes.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <Link
                href="/calculators/date-calculator"
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline block text-sm"
              >
                Birthday &amp; Date Calculator
              </Link>
              <p className="text-slate-600 dark:text-slate-400">
                Calculate wedding anniversaries, relationship countdowns, and calendar spans between special events.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <Link
                href="/calculators/time-duration-calculator"
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline block text-sm"
              >
                Date Duration Calculator
              </Link>
              <p className="text-slate-600 dark:text-slate-400">
                Measure precise elapsed time, milestone thresholds, and days elapsed since your very first date.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
            These tools help couples celebrate milestones, track relationship journeys, and explore numerical patterns in everyday life.
          </p>
        </section>

        {/* Section 11: Final Thoughts */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Final Thoughts
          </h2>
          <p>
            Compatibility is one of the most fascinating aspects of human connection. While no calculator can define a relationship, compatibility tools provide an enjoyable way to explore different perspectives on attraction, communication, and emotional intimacy.
          </p>
          <p>
            Use the Love Calculator as a source of curiosity, conversation, and entertainment—and remember that the strongest relationships are built through trust, understanding, and shared effort rather than numbers alone.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              Privacy &amp; Algorithmic Transparency Notice
            </div>
            <p>
              All computations run 100% locally within your client browser. No personal names, birth dates, or relationship inputs are transmitted to external servers or stored in databases.
            </p>
          </div>
        </section>
      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (Unfolded by Default, 401(k) Format) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {love_calculatorFaqs.map((faq, idx) => {
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

export default LoveContent;
