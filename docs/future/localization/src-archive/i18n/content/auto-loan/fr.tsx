import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const FR_AUTO_LOAN_SEO = {
  title: "Calculateur de Crédit Auto | Mensualité, Taux et Tableau d'Amortissement",
  description: "Calculez précisément les mensualités de votre crédit auto, le coût total des intérêts, l'apport personnel et consultez le tableau d'amortissement complet.",
  keywords: ["calculateur credit auto", "simulation pret voiture", "mensualite credit auto", "taux credit voiture"],
};

export const FR_AUTO_LOAN_FAQS: CalculatorFAQ[] = [
  {
    question: "Comment est calculée la mensualité d'un crédit automobile ?",
    answer:
      "Elle est calculée à partir du montant emprunté, du taux d'intérêt annuel effectif global (TAEG) et de la durée de remboursement selon la formule de rente standard.",
  },
  {
    question: "Quel apport personnel est conseillé pour l'achat d'un véhicule ?",
    answer:
      "Un apport de 10 à 20 % est fortement recommandé pour couvrir la décote initiale de la voiture et réduire les mensualités.",
  },
];

export function FrAutoLoanContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introduction au Financement Automobile
        </h2>
        <p>
          Le crédit automobile permet d'étaler le coût d'achat d'un véhicule neuf ou d'occasion sur une période définie en contrepartie d'intérêts financiers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Formule Mathématique
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Mensualité :</strong> M = P × [r(1 + r)^n] / [(1 + r)^n − 1]</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Synthèse
        </h2>
        <p>
          Examinez attentivement le TAEG et privilégiez des durées inférieures à 48 ou 60 mois.
        </p>
      </section>
    </article>
  );
}
