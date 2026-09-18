import React from "react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const FRENCH_BMI_SEO = {
  title: "Calculateur d'IMC (Indice de Masse Corporelle)",
  description:
    "Calculez votre Indice de Masse Corporelle (IMC), votre fourchette de poids idéal, les percentiles pédiatriques et votre métabolisme selon les standards OMS et CDC.",
  category: "Santé",
  keywords: [
    "calculateur imc",
    "indice de masse corporelle",
    "poids idéal",
    "tableau imc",
    "imc enfant",
    "surpoids",
    "obésité",
  ],
};

export const FRENCH_BMI_FAQS: CalculatorFAQ[] = [
  {
    question: "Qu'est-ce que l'Indice de Masse Corporelle (IMC) et comment le calcule-t-on ?",
    answer:
      "L'Indice de Masse Corporelle (IMC) est un indicateur anthropométrique standard reliant le poids et la taille : IMC = Poids (kg) / [Taille (m)]².",
  },
  {
    question: "Quelles sont les catégories d'IMC chez l'adulte selon l'OMS ?",
    answer:
      "Pour les adultes : Insuffisance pondérale (< 18,5), Poids normal (18,5 à < 25,0), Surpoids (25,0 à < 30,0), Obésité classe 1 (30,0 à < 35,0), Obésité classe 2 (35,0 à < 40,0) et Obésité classe 3 (≥ 40,0 kg/m²).",
  },
  {
    question: "Pourquoi l'IMC utilise-t-il des percentiles chez les enfants et adolescents ?",
    answer:
      "La composition corporelle des jeunes de 2 à 19 ans varie considérablement selon la croissance et le sexe biologique, nécessitant des courbes de percentiles par âge.",
  },
  {
    question: "Quelles sont les limites de l'IMC ?",
    answer:
      "L'IMC ne distingue pas la masse musculaire de la masse grasse et ne mesure pas la distribution de la graisse viscérale.",
  },
  {
    question: "L'IMC est-il un diagnostic médical complet ?",
    answer:
      "Non, l'IMC est un outil de dépistage préliminaire qui doit être complété par des examens cliniques individuels.",
  },
];

export function FrenchBmiContent() {
  return (
    <article className="space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed text-xs sm:text-sm font-sans pt-4">
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          1. Qu&apos;est-ce que l&apos;Indice de Masse Corporelle (IMC) ?
        </h2>
        <p>
          L&apos;Indice de Masse Corporelle (IMC) est une mesure anthropométrique standardisée utilisée par l&apos;OMS et les organismes de santé publique pour évaluer la corpulence d&apos;une personne en fonction de sa taille.
        </p>
        <p>
          Il sert d&apos;indicateur de dépistage épidémiologique et non de diagnostic médical absolu.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          2. Formule de calcul de l&apos;IMC
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 max-w-md">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Formule métrique officielle</h3>
          <div className="p-2.5 bg-white dark:bg-slate-950 rounded text-center font-bold text-blue-600 dark:text-blue-400 text-xs border border-slate-200 dark:border-slate-800">
            IMC = Poids (kg) / [Taille (m)]²
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          3. Classification de l&apos;IMC chez l&apos;adulte
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs my-2">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Catégorie</th>
                <th className="py-2.5 px-3">Intervalle d&apos;IMC (kg/m²)</th>
                <th className="py-2.5 px-3">Interprétation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              <tr><td className="py-2.5 px-3 text-sky-700 dark:text-sky-400 font-bold">Insuffisance pondérale</td><td className="py-2.5 px-3 font-sans tabular-nums">&lt; 18,5</td><td className="py-2.5 px-3">Évaluation nutritionnelle conseillée.</td></tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-950/20"><td className="py-2.5 px-3 text-emerald-700 dark:text-emerald-400 font-bold">Poids normal</td><td className="py-2.5 px-3 font-sans tabular-nums font-bold text-emerald-800 dark:text-emerald-300">18,5 à &lt; 25,0</td><td className="py-2.5 px-3">Plage de référence standard.</td></tr>
              <tr><td className="py-2.5 px-3 text-yellow-700 dark:text-yellow-400 font-bold">Surpoids</td><td className="py-2.5 px-3 font-sans tabular-nums">25,0 à &lt; 30,0</td><td className="py-2.5 px-3">Surveillance recommandée.</td></tr>
              <tr><td className="py-2.5 px-3 text-orange-700 dark:text-orange-400 font-bold">Obésité (Classe 1)</td><td className="py-2.5 px-3 font-sans tabular-nums">30,0 à &lt; 35,0</td><td className="py-2.5 px-3">Risque modéré.</td></tr>
              <tr><td className="py-2.5 px-3 text-rose-700 dark:text-rose-400 font-bold">Obésité (Classe 2)</td><td className="py-2.5 px-3 font-sans tabular-nums">35,0 à &lt; 40,0</td><td className="py-2.5 px-3">Risque accru.</td></tr>
              <tr><td className="py-2.5 px-3 text-rose-900 dark:text-rose-300 font-bold">Obésité (Classe 3)</td><td className="py-2.5 px-3 font-sans tabular-nums">&ge; 40,0</td><td className="py-2.5 px-3">Obésité sévère.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Avertissement de santé</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Cet outil a une visée éducative et ne se substitue pas à une consultation médicale spécialisée.
        </p>
      </section>
    </article>
  );
}
