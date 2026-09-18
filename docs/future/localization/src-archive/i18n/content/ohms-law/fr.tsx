import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const FR_OHMS_LAW_SEO = {
  title: "Calculateur Loi d'Ohm | Tension, Intensité, Résistance et Puissance",
  description: "Calculez la tension (U), le courant (I), la résistance (R) et la puissance (P) avec la loi d'Ohm et la loi de Joule. Diviseur de tension et résistance de LED.",
  keywords: ["calculateur loi d ohm", "calcul tension intensite puissance", "formule loi d ohm", "loi de joule"],
};

export const FR_OHMS_LAW_FAQS: CalculatorFAQ[] = [
  {
    question: "Que dit la loi d'Ohm ?",
    answer:
      "La loi d'Ohm énonce que la tension (U) aux bornes d'un conducteur ohmique est égale au produit de sa résistance (R) par l'intensité du courant (I) qui le traverse : U = R × I.",
  },
  {
    question: "Comment calculer la puissance électrique en Watts ?",
    answer:
      "La puissance électrique se calcule selon la formule P = U × I = R × I² = U² / R.",
  },
];

export function FrOhmsLawContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introduction à la Loi d'Ohm
        </h2>
        <p>
          Découverte par Georg Ohm, cette loi fondamentale relie la tension, le courant, la résistance et la puissance dans les circuits électriques.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Formules Fondamentales
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Tension :</strong> U = R × I</p>
          <p><strong>Courant :</strong> I = U / R</p>
          <p><strong>Résistance :</strong> R = U / I</p>
          <p><strong>Puissance :</strong> P = U × I = R × I² = U² / R</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Synthèse
        </h2>
        <p>
          Vérifiez toujours la puissance maximale admissible de vos résistances pour éviter toute surchauffe.
        </p>
      </section>
    </article>
  );
}
