import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const FR_CONCRETE_SEO = {
  title: "Calculateur de Béton | Calcul du Volume en Mètres et Verges Cubes",
  description: "Calculez avec précision le volume de béton pour dalles, semelles, poteaux et escaliers. Obtenez le cubage exact, les sacs nécessaires et la marge de perte.",
  keywords: ["calculateur de beton", "calculer volume beton", "calculer m3 beton", "dalle beton sac", "calcul toupie beton"],
};

export const FR_CONCRETE_FAQS: CalculatorFAQ[] = [
  {
    question: "Comment calculer le volume de béton pour une dalle ?",
    answer:
      "Multipliez la longueur par la largeur et par l'épaisseur : Longueur (m) × Largeur (m) × Épaisseur (m) = Volume en m³. En unités impériales, divisez les pieds cubes par 27 pour obtenir des verges cubes (yd³).",
  },
  {
    question: "Quelle marge de sécurité prévoir pour la commande de béton ?",
    answer:
      "Il est recommandé de prévoir 5 à 10 % supplémentaires pour compenser les irrégularités du sol, la déformation des coffrages et les pertes lors du coulage.",
  },
  {
    question: "Combien de sacs de béton de 35 kg pour 1 m³ ?",
    answer:
      "Il faut environ 55 à 60 sacs de béton prêt à l'emploi de 35 kg pour réaliser 1 mètre cube de béton.",
  },
];

export function FrConcreteContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introduction au Calcul de Cubage Béton
        </h2>
        <p>
          Le dimensionnement précis du volume de béton est indispensable pour tous les travaux de maçonnerie, fondations et dallages. Commander la juste quantité garantit la continuité structurelle de l'ouvrage sans interruption de coulage.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Formules Géométriques
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Dalle rectangulaire :</strong> V = Longueur × Largeur × Épaisseur</p>
          <p><strong>Poteau cylindrique :</strong> V = π × (Rayon)² × Hauteur</p>
          <p><strong>Volume total avec pertes :</strong> V_total = V_net × (1 + %perte / 100)</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Erreurs Courantes
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Oublier de convertir les centimètres ou pouces en mètres/pieds.</li>
          <li>Négliger le tassement et les irrégularités du fond de fouille.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Synthèse
        </h2>
        <p>
          Vérifiez scrupuleusement vos cotes de coffrage et intégrez toujours une marge de sécurité de 5 à 10 %.
        </p>
      </section>
    </article>
  );
}
