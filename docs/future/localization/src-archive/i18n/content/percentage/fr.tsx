import React from "react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const FRENCH_PERCENTAGE_SEO = {
  title: "Calculateur de Pourcentage",
  description:
    "Calculez des pourcentages, résolvez des équations à 3 variables, calculez des variations en pourcentage, augmentations, réductions et proportions.",
  category: "Mathématiques",
  keywords: [
    "calculateur de pourcentage",
    "pourcentage",
    "calculer un pourcentage",
    "différence en pourcentage",
    "augmentation pourcentage",
    "remise",
  ],
};

export const FRENCH_PERCENTAGE_FAQS: CalculatorFAQ[] = [
  {
    question: "Qu'est-ce qu'un pourcentage et comment se calcule-t-il ?",
    answer:
      "Un pourcentage est un rapport sans dimension exprimé sous la forme d'une fraction de 100. Il est calculé en divisant la partie par le tout et en multipliant par 100 : Pourcentage = (Partie / Tout) × 100.",
  },
  {
    question: "Comment calculer quel pourcentage un nombre représente par rapport à un autre ?",
    answer:
      "Pour déterminer quel pourcentage représente A par rapport à B, divisez A par B et multipliez par 100 : P = (A / B) × 100. Par exemple, 8 par rapport à 2 équivaut à 400%. Si B vaut 0, l'opération est indéfinie.",
  },
  {
    question: "Quelle est la différence entre une variation et une différence en pourcentage ?",
    answer:
      "La variation en pourcentage est directionnelle et compare une valeur finale à une valeur de départ : ((V2 - V1) / V1) × 100. La différence en pourcentage est symétrique et compare deux valeurs par rapport à leur moyenne arithmétique.",
  },
  {
    question: "Comment calculer une augmentation ou une réduction en pourcentage ?",
    answer:
      "Pour une augmentation de P%, multipliez la valeur initiale par (1 + P / 100). Pour une réduction de P%, multipliez par (1 - P / 100). Par exemple, 100 avec 10% de réduction donne 100 × 0,90 = 90.",
  },
  {
    question: "Pourquoi un calcul de pourcentage est-il indéfini lorsque la base est nulle ?",
    answer:
      "En mathématiques, la division par zéro n'est pas définie. Lorsque la valeur de base est au dénominateur, aucun nombre réel ne peut satisfaire cette équation.",
  },
];

export function FrenchPercentageContent() {
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Qu&apos;est-ce qu&apos;un pourcentage ?
        </h2>
        <p>
          En mathématiques, un pourcentage est un rapport sans dimension exprimé sous forme de fraction de 100. Il offre une méthode standardisée pour comparer des proportions relatives par rapport à une base fixe. Issu du latin <em>per centum</em> (&quot;pour cent&quot;), le pourcentage est indispensable en finance, en statistique et dans les sciences appliquées.
        </p>
        <p>
          Tout pourcentage peut être converti en nombre décimal en le divisant par 100 ou sous forme de fraction simplifiée. Par exemple, 35% équivaut au décimal 0,35 et à la fraction 7/20.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Formule fondamentale du pourcentage
        </h2>
        <p>
          La relation mathématique fondamentale relie trois variables à travers l&apos;équation :
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P × V<sub>1</sub> = V<sub>2</sub>
        </div>
        <ul className="list-disc pl-5 space-y-1.5 font-sans tabular-nums text-xs">
          <li><strong>Calculer la partie (V<sub>2</sub>) :</strong> V<sub>2</sub> = (P / 100) × V<sub>1</sub></li>
          <li><strong>Calculer le taux de pourcentage (P%) :</strong> P = (V<sub>2</sub> / V<sub>1</sub>) × 100%</li>
          <li><strong>Calculer la base (V<sub>1</sub>) :</strong> V<sub>1</sub> = V<sub>2</sub> / (P / 100)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Différence en pourcentage vs Variation en pourcentage
        </h2>
        <p>
          La <strong>différence en pourcentage</strong> mesure la distance symétrique entre deux nombres relative à leur moyenne arithmétique :
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs">
          Différence = (|V<sub>1</sub> - V<sub>2</sub>| / ((V<sub>1</sub> + V<sub>2</sub>) / 2)) × 100%
        </div>
        <p>
          La <strong>variation en pourcentage</strong> mesure l&apos;évolution directionnelle depuis une valeur initiale V<sub>1</sub> vers une valeur finale V<sub>2</sub> :
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs">
          Variation = ((V<sub>2</sub> - V<sub>1</sub>) / V<sub>1</sub>) × 100%
        </div>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Tableau de conversion des pourcentages courants
        </h2>
        <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded max-w-xl">
          <table className="w-full text-xs text-left border-collapse font-sans tabular-nums">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 font-bold">
                <th className="p-2 border-r border-slate-300 dark:border-slate-700">Fraction</th>
                <th className="p-2 border-r border-slate-300 dark:border-slate-700">Décimal</th>
                <th className="p-2">Pourcentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/2</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,5</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">50%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/4</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,25</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">25%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/5</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,2</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">20%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/10</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,1</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">10%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">3/4</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,75</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">75%</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Résumé Éducatif</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Les pourcentages constituent des outils mathématiques universels permettant d&apos;analyser les ratios, les taux de croissance, les remises commerciales et les variations relatives avec exactitude.
        </p>
      </section>
    </article>
  );
}
