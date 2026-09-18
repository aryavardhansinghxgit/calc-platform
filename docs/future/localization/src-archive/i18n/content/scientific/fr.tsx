import React from "react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const FRENCH_SCIENTIFIC_SEO = {
  title: "Calculatrice Scientifique en Ligne",
  description:
    "Calculatrice scientifique avancée : trigonométrie, logarithmes, puissances, racines n-ièmes, combinatoire et statistiques.",
  category: "Mathématiques",
  keywords: [
    "calculatrice scientifique",
    "trigonométrie",
    "logarithmes",
    "puissances et racines",
    "combinatoire",
    "statistiques",
  ],
};

export const FRENCH_SCIENTIFIC_FAQS: CalculatorFAQ[] = [
  {
    question: "Quelles fonctions sont disponibles sur cette calculatrice scientifique ?",
    answer:
      "Elle intègre la trigonométrie (sin, cos, tan), les logarithmes (ln, log₁₀, log₂), les puissances, racines, factorielles, permutations (nPr), combinaisons (nCr) et outils statistiques.",
  },
  {
    question: "Comment basculer entre degrés et radians ?",
    answer:
      "Utilisez le sélecteur d'angle (Deg / Rad / Grad) situé au-dessus du pavé numérique.",
  },
  {
    question: "Quelle est la précision numérique du moteur ?",
    answer:
      "Le moteur applique la norme IEEE 754 64 bits avec algorithme Shunting-Yard pour une évaluation sans compromis.",
  },
  {
    question: "Comment calculer un logarithme d'une base personnalisée ?",
    answer:
      "Appliquez la formule log_b(a) = ln(a) / ln(b) ou utilisez la fonction à deux arguments log(x, base).",
  },
  {
    question: "Pourquoi certaines opérations affichent-elles une erreur de domaine ?",
    answer:
      "Les racines paires de nombres négatifs et les logarithmes de valeurs inférieures ou égales à zéro ne sont pas définis dans l'ensemble des réels.",
  },
];

export function FrenchScientificContent() {
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Qu&apos;est-ce qu&apos;une calculatrice scientifique ?
        </h2>
        <p>
          Une calculatrice scientifique est conçue pour résoudre des équations complexes en mathématiques appliquées, physique et ingénierie.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Trigonométrie et unités d&apos;angle
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Degrés (Deg) :</strong> 360° pour un tour complet.</li>
          <li><strong>Radians (Rad) :</strong> 2π radians pour un tour complet (standard international).</li>
          <li><strong>Grades (Grad) :</strong> 400 grades pour un tour complet.</li>
        </ul>
      </section>

      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Résumé Éducatif</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Le calcul scientifique précis permet d&apos;analyser les lois physiques et les modèles probabilistes avec une grande rigueur.
        </p>
      </section>
    </article>
  );
}
