import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const FR_CURRENCY_SEO = {
  title: "Convertisseur de Devises | Taux de Change en Direct et Frais Bancaires",
  description: "Convertissez instantanément plus de 160 devises internationales avec les taux de change du marché moyen. Calculez les frais cachés et marges bancaires.",
  keywords: ["convertisseur de devises", "taux de change euro dollar", "conversion monnaie", "calculateur de devises"],
};

export const FR_CURRENCY_FAQS: CalculatorFAQ[] = [
  {
    question: "Qu'est-ce que le taux de change interbancaire ?",
    answer:
      "Le taux interbancaire est le taux réel du marché utilisé par les grandes banques et institutions financières pour échanger des devises entre elles sans marge commerciale.",
  },
  {
    question: "Comment les banques facturent-elles des frais de change cachés ?",
    answer:
      "Même sans frais fixes affichés, les intermédiaires appliquent souvent une marge de 1,5 à 4 % sur le taux de change réel, réduisant le montant net perçu.",
  },
];

export function FrCurrencyContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introduction au Marché des Changes (Forex)
        </h2>
        <p>
          Le marché des changes permet la négociation et la conversion d'une devise nationale vers une autre, servant de socle aux transactions internationales et aux voyages.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Formules et Notions Clés
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Conversion :</strong> Montant_Arrivée = Montant_Départ × Taux</p>
          <p><strong>Taux Inverse :</strong> Taux_Inverse = 1 / Taux_Direct</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Erreurs à Éviter
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Échanger des devises aux aéroports avec des marges excessives.</li>
          <li>Accepter la conversion dynamique (DCC) lors d'un paiement par carte à l'étranger.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Récapitulatif
        </h2>
        <p>
          Privilégiez les prestataires appliquant le taux de change réel du marché moyen et des frais transparents.
        </p>
      </section>
    </article>
  );
}
