"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  HelpCircle,
  Dumbbell,
  Scale,
  Sparkles,
  Zap,
  Activity,
  HeartPulse,
  Award,
  Apple,
} from "lucide-react";
import { protein_calculatorFaqs } from "@/app/calculators/protein-calculator/faq";

export function ProteinContent() {
  // 401(k) Standard: All 15 FAQs unfolded by default in DOM with individual toggle support
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(
    () => new Set(Array.from({ length: protein_calculatorFaqs.length }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => {
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
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed space-y-10">
      {/* Article Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Complete Guide to Daily Protein Requirements
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-3 leading-relaxed">
          Protein is an essential macronutrient made from amino acids. Your body uses protein to build and maintain muscle and other tissues, produce enzymes and hormones, support immune function, and carry out many other biological processes.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
          The amount of protein appropriate for one person is not necessarily appropriate for another. Body weight, age, physical activity, training goal, physiological state, and overall diet can all affect a useful protein target.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
          This calculator provides an estimated daily protein target rather than a laboratory measurement or individualized medical prescription. It lets you compare several practical protein-planning approaches, including a general baseline, muscle building, fat loss, maintenance, athletic training, older-adult needs, pregnancy and lactation, plant-based eating, and a custom target.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
          The supplied calculator also converts the daily target into a per-meal amount, estimates protein calories, compares the result with the adult RDA baseline, and provides additional amino-acid and dietary context.
        </p>
      </div>

      {/* Section 1: What Does a Protein Calculator Actually Calculate? */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          What Does a Protein Calculator Actually Calculate?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          At its simplest, a protein calculator estimates:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-mono text-sm text-emerald-800 dark:text-emerald-300 font-semibold text-center">
          Daily Protein = Body Weight × Protein Target per Unit of Body Weight
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For example, a person weighing 72.6 kg using a 1.6 g/kg planning target would have:
        </p>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">
          72.6 × 1.6 ≈ 116 g protein/day
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator can express the target in either grams per kilogram or grams per pound and keeps the underlying weight consistent when you switch between US and metric units.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The general adult RDA for protein is 0.8 g/kg/day for healthy adults. That value is intended as a population reference for meeting physiological requirements; it should not be confused with the higher targets often used for exercise, muscle retention, or other specific objectives.
        </p>
      </section>

      {/* Section 2: RDA vs. a Fitness Protein Target */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          RDA vs. a Fitness Protein Target
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          One of the most common sources of confusion is treating the RDA as an ideal target for every situation.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The adult RDA is approximately <strong>0.8 g/kg/day</strong>. For an individual weighing 72.6 kg:
        </p>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">
          72.6 × 0.8 = 58.1 g/day
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          That is why the calculator&apos;s example shows an RDA comparison of approximately 58 g/day.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A person who regularly exercises may reasonably use a higher planning range. Sports-nutrition guidance commonly places protein requirements for routinely active people above the sedentary-adult RDA; one widely cited ISSN position stand gives approximately 1.4–2.0 g/kg/day for exercising individuals. Other sports-nutrition guidance gives a broader 1.2–2.0 g/kg/day range depending on the population and training situation.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5 text-xs sm:text-sm">
          <p><strong>RDA:</strong> Population-level minimum reference to prevent deficiency.</p>
          <p><strong>Fitness target:</strong> Context-dependent planning target optimized for athletic training and body composition.</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A higher calculated target is therefore not evidence that the RDA is inadequate for every sedentary adult.
        </p>
      </section>

      {/* Section 3: How the Protein Calculator's Modes Work */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          How the Protein Calculator&apos;s Modes Work
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator contains several predefined approaches. These are planning models, not universal physiological laws.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-emerald-600" />
              Daily Baseline
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Uses a moderate protein target intended as a practical general-purpose starting point.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              Muscle Building
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Uses a higher protein target for resistance-training and hypertrophy-oriented planning.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-rose-600" />
              Fat Loss / Cutting
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Uses a higher protein target intended to support lean-mass retention while calories are restricted.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-600" />
              Maintenance
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Uses a moderate target for people whose primary objective is maintaining body weight and composition.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-600" />
              Senior / Sarcopenia
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Provides a higher protein-planning level for older adults. ESPEN guidance states that older adults should receive at least 1.0 g/kg/day, with commonly suggested amounts around 1.0–1.2 g/kg/day for healthy older people.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-cyan-600" />
              Endurance Athlete &amp; Strength Athlete
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Provides training-oriented protein targets appropriate for endurance or strength and power training. The exact requirement depends on training volume, energy intake, and sport type.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pink-600" />
              Pregnancy &amp; Lactation
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Adds pregnancy- or lactation-specific adjustments to the underlying calculation. Should be treated as a planning aid rather than a substitute for prenatal or postpartum care.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Apple className="w-4 h-4 text-emerald-600" />
              Plant-Based / Vegan &amp; Custom Builder
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Provides a planning adjustment for plant-based diets or allows the user to configure a custom g/kg target rather than relying on a predefined mode.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Protein Per Meal */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Protein Per Meal
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Daily protein is only one part of the calculation. The calculator also divides your daily target across your selected number of meals.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-mono text-sm text-emerald-800 dark:text-emerald-300 font-semibold text-center">
          Protein per meal = Daily protein target ÷ Number of meals
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For example:
        </p>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">
          116 g/day ÷ 4 meals = 29 g/meal
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          That matches the supplied calculator&apos;s baseline result. Meal distribution can be useful for making a daily target practical, but it does not mean every meal must contain exactly the same quantity. Real meals vary in size, protein quality and composition.
        </p>
      </section>

      {/* Section 5: Protein, Leucine and Muscle Protein Synthesis */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Protein, Leucine and Muscle Protein Synthesis
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Leucine is one of the nine essential amino acids and plays an important role in signaling pathways involved in muscle protein synthesis.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator provides a leucine planning value alongside the per-meal protein target. In the reference scenario, 29 g of protein per meal corresponds to a displayed leucine target of approximately 2.6 g.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator&apos;s implementation uses an approximately 9% leucine-content assumption for its planning output. This should be understood as a simplified model rather than a guarantee that consuming a particular number of grams of leucine will produce a specific physiological response.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Protein quality, total protein intake, energy availability, training stimulus, age and the composition of the meal can all influence the response.
        </p>
      </section>

      {/* Section 6: Protein Calories */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Protein Calories
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Protein contributes approximately 4 kcal per gram. Therefore:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-mono text-sm text-emerald-800 dark:text-emerald-300 font-semibold text-center">
          Protein Calories = Protein grams × 4
        </div>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700/60 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
              <tr>
                <th className="p-3">Protein (g)</th>
                <th className="p-3">Approx. Protein Energy (kcal)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3">50 g</td>
                <td className="p-3">200 kcal</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3">100 g</td>
                <td className="p-3">400 kcal</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">116 g (Baseline)</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">464 kcal</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3">150 g</td>
                <td className="p-3">600 kcal</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3">200 g</td>
                <td className="p-3">800 kcal</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator uses this conversion when showing the calorie contribution of your protein target. The remaining calories can then be allocated between carbohydrates and dietary fat according to your selected diet preferences or [macro ratio goals](/calculators/macro-calculator).
        </p>
      </section>

      {/* Section 7: Protein and Muscle Building */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Protein and Muscle Building
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Increasing protein is useful for muscle development, but protein by itself does not create muscle. Muscle hypertrophy depends on the interaction of:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-semibold text-xs sm:text-sm text-center text-slate-800 dark:text-slate-200">
          Resistance training + sufficient protein + adequate energy + recovery
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Research and sports-nutrition position statements generally support protein intakes above the adult RDA for people engaged in resistance and other intense exercise. A commonly used range is approximately 1.4–2.0 g/kg/day, although the appropriate point within that range depends on the individual&apos;s circumstances.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          More protein is therefore not automatically better. A target should be evaluated together with total calorie intake, training quality and the rest of the diet.
        </p>
      </section>

      {/* Section 8: Protein During Fat Loss */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Protein During Fat Loss
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          During calorie restriction, maintaining adequate protein becomes particularly important because weight loss can involve both fat mass and lean tissue.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Higher protein intake is commonly used as part of a fat-loss strategy, especially when combined with resistance training. The calculator therefore uses a higher protein-planning target in its Cutting mode.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          However, a calculator cannot determine whether a particular calorie deficit is appropriate for an individual. Weight loss rate, medical history, [body fat percentage](/calculators/body-fat-calculator) and training status all matter.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The goal should not simply be the lowest possible calorie intake. A sustainable diet that provides sufficient protein, essential nutrients and adequate energy for daily function is generally a more useful approach.
        </p>
      </section>

      {/* Section 9: Protein for Older Adults */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Protein for Older Adults
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Protein needs can become more important with aging because maintaining muscle mass and physical function becomes increasingly relevant.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          ESPEN guidance recommends at least 1.0 g/kg/day for older adults and notes that healthy older adults may commonly require around 1.0–1.2 g/kg/day, with higher amounts sometimes considered in illness or other clinical circumstances.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator&apos;s Senior/Sarcopenia mode should therefore be interpreted as a planning estimate, not as a clinical treatment for sarcopenia. Older adults with kidney disease, significant weight loss, frailty, swallowing difficulties or other medical conditions may require individualized nutritional assessment.
        </p>
      </section>

      {/* Section 10: Protein for Athletes */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Protein for Athletes
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Exercise increases the importance of adequate protein intake because training increases the need for tissue repair and adaptation.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Common sports-nutrition recommendations are above the adult RDA. ISSN guidance has historically placed exercising individuals around 1.4–2.0 g/kg/day, while other professional guidance gives ranges such as 1.2–2.0 g/kg/day. The appropriate amount depends on:
        </p>
        <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1">
          <li>training type and volume</li>
          <li>energy intake</li>
          <li>body size and composition</li>
          <li>training status</li>
          <li>the athlete&apos;s objective</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          An endurance athlete, strength athlete and athlete dieting for competition may therefore have different practical protein targets.
        </p>
      </section>

      {/* Section 11: Protein From Plant Foods */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Protein From Plant Foods
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A plant-based diet can provide adequate protein when foods are selected and combined appropriately. Useful plant protein sources include:
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Soy foods, tofu, tempeh, beans, lentils, peas, seitan, nuts, seeds and whole grains.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Some plant foods have lower digestibility or a different essential-amino-acid profile than certain animal proteins. This is one reason protein quality measures such as amino-acid composition and digestibility are useful when evaluating individual foods.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The practical objective is not to label a food simply &quot;complete&quot; or &quot;incomplete,&quot; but to consider the overall dietary pattern and variety of protein sources.
        </p>
      </section>

      {/* Section 12: Pregnancy and Lactation */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Pregnancy and Lactation
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Protein requirements change during pregnancy and breastfeeding because the body is supporting maternal tissue expansion, fetal development and milk production.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The National Academies&apos; dietary reference tables use approximately 0.8 g/kg/day as the adult reference basis, while pregnancy and lactation have different life-stage recommendations.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Because pregnancy nutrition involves energy, micronutrients, fetal growth and maternal health—not protein alone—calculator results in this mode should be used for general planning and discussed with an obstetric clinician or qualified dietitian when personalized guidance is needed.
        </p>
      </section>

      {/* Section 13: Nine Essential Amino Acids */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Nine Essential Amino Acids
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Humans cannot synthesize the nine essential amino acids in sufficient amounts and therefore must obtain them through dietary protein:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
          Histidine, isoleucine, leucine, lysine, methionine, phenylalanine, threonine, tryptophan and valine.
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Protein quality depends partly on the quantity and availability of these essential amino acids. This is also why looking only at total protein grams can miss an important part of dietary protein quality.
        </p>
      </section>

      {/* Section 14: Example: How the Calculator Arrives at 116 g/day */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Example: How the Calculator Arrives at 116 g/day
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Consider the calculator&apos;s reference scenario:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs sm:text-sm">
          <p>• Age: 25</p>
          <p>• Sex: Male</p>
          <p>• Weight: 160 lb</p>
          <p>• Height: 5 ft 10 in</p>
          <p>• Activity: Light Active</p>
          <p>• Goal: Maintain Weight</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          160 lb converts to approximately 72.6 kg. Using the displayed 1.6 g/kg protein target:
        </p>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">
          72.6 × 1.6 ≈ 116 g/day
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Then:
        </p>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">
          116 ÷ 4 = 29 g/meal
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          and:
        </p>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">
          116 × 4 = 464 kcal from protein
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator therefore displays approximately:
        </p>
        <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1">
          <li><strong>116 g protein/day</strong></li>
          <li><strong>29 g protein/meal</strong></li>
          <li><strong>464 kcal from protein</strong></li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This matches the reference PDF baseline.
        </p>
      </section>

      {/* Section 15: How to Use Your Result */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Protein Calculator: How to Use Your Result
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Start with the calculator&apos;s result rather than treating it as a number you must hit perfectly every day. A practical approach is to:
        </p>
        <ol className="list-decimal pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-2">
          <li>
            <strong>Choose the mode that matches your actual goal.</strong> A maintenance target is different from a muscle-building or calorie-restricted target.
          </li>
          <li>
            <strong>Check the protein amount in grams per day.</strong> This is your main planning number.
          </li>
          <li>
            <strong>Divide it across meals.</strong> The per-meal value gives you a practical distribution target.
          </li>
          <li>
            <strong>Look at protein calories within your total calorie target.</strong> Protein should fit into the overall diet rather than being considered in isolation. Check your [TDEE](/calculators/tdee-calculator) and [BMR](/calculators/bmr-calculator).
          </li>
          <li>
            <strong>Reassess as your circumstances change.</strong> Changes in body weight, training volume, goals, pregnancy/lactation status or health can make a previous target less appropriate.
          </li>
        </ol>
      </section>

      {/* Section 16: Important Limitations */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Important Limitations
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This calculator estimates protein needs using mathematical models and nutritional assumptions. It does not directly measure protein requirements, metabolism, muscle protein synthesis or nutritional status.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Actual needs can vary because of factors that a calculator cannot fully capture, including: body composition, training status, total energy intake, food quality, illness, kidney function, pregnancy, age, recovery, and individual variation.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The RDA is a population reference rather than a universal optimal target, while higher exercise-oriented protein targets are planning ranges rather than guaranteed requirements.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          People with chronic kidney disease, significant liver disease, pregnancy-related medical complications, eating disorders, severe illness, or other specialized nutritional needs should obtain individualized guidance from an appropriately qualified healthcare professional.
        </p>
      </section>

      {/* Section 17: Frequently Asked Questions (15 Curated Q&As) */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {protein_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqs.has(idx);
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold shrink-0">
                      Q{idx + 1}
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 18: Nutritional Disclaimer */}
      <section className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Nutritional Disclaimer
          </h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          This calculator is provided for educational and planning purposes. It estimates protein requirements using body-weight, activity and nutritional assumptions; it does not directly measure metabolism, nutritional status or individual protein requirements. People who are pregnant, have kidney or liver disease, have significant medical conditions, have a history of eating disorders, or have specialized athletic or clinical nutrition needs should obtain individualized guidance from a qualified healthcare professional.
        </p>
      </section>

      {/* Related Calculators */}
      <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
        <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Related Health &amp; Nutrition Calculators
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-semibold">
          <Link href="/calculators/calorie-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            Calorie Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/tdee-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            TDEE Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/bmr-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            BMR Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/macro-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            Macro Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            Body Fat Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/carbohydrate-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            Carbohydrate Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/fat-intake-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            Fat Intake Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/bmi-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            BMI Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/calculators/ideal-weight-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            Ideal Weight Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProteinContent;
