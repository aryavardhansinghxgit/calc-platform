import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const FR_DATE_SEO = {
  title: "Calculateur de Date | Jours Entre Deux Dates, Ajout et Jours Ouvrés",
  description: "Calculez avec précision le nombre de jours entre deux dates, ajoutez ou soustrayez des jours, semaines, mois et années, et calculez les jours ouvrés.",
  keywords: ["calculateur de date", "calculer jours entre deux dates", "ajouter des jours a une date", "jours ouvres", "calcul de duree"],
};

export const FR_DATE_FAQS: CalculatorFAQ[] = [
  {
    question: "Comment calculer le nombre de jours exact entre deux dates ?",
    answer:
      "Entrez les dates de début et de fin. Le calculateur détermine l'intervalle exact en jours calendaires selon les règles du calendrier grégorien, avec option de comptage inclusif ou exclusif.",
  },
  {
    question: "Comment le calculateur gère-t-il les années bissextiles ?",
    answer:
      "Il applique strictement la règle grégorienne : une année est bissextile si elle est divisible par 4, sauf les années séculaires non divisibles par 400. Ainsi, 2000 était bissextile, alors que 1900 et 2100 ne le sont pas.",
  },
  {
    question: "Que se passe-t-il si l'on ajoute un mois au 31 janvier ?",
    answer:
      "Le calculateur applique l'ajustement de fin de mois. Ajouter un mois au 31 janvier donne le 28 février (ou le 29 février lors d'une année bissextile).",
  },
  {
    question: "Comment sont calculés les jours ouvrés ?",
    answer:
      "Le système évalue chaque jour de la période et déduit automatiquement les jours de repos hebdomadaire sélectionnés ainsi que les jours fériés officiels configurés.",
  },
  {
    question: "Peut-on personnaliser les jours de week-end ?",
    answer:
      "Oui, vous pouvez configurer les jours de repos non travaillés pour correspondre aux horaires de travail spécifiques (ex. semaine de 4 ou 6 jours).",
  },
];

export function FrDateContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introduction au Calcul Calendaire
        </h2>
        <p>
          Le calcul précis d'intervalles de temps calendaires est essentiel dans la gestion de contrats, le droit du travail, la finance et la gestion de projet. Les particularités du calendrier grégorien nécessitent une gestion rigoureuse des longueurs variables des mois et des années bissextiles.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Principes et Règles du Calendrier Grégorien
        </h2>
        <p>
          Le calendrier civil ajuste les rotations terrestres autour du soleil en introduisant des règles périodiques :
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Année standard :</strong> 365 jours répartis sur 12 mois.</li>
          <li><strong>Année bissextile :</strong> 366 jours avec un 29 février pour les années divisibles par 4 (sauf exceptions séculaires).</li>
          <li><strong>Ajustement de fin de mois :</strong> Les opérations d'addition de mois respectent la limite supérieure du mois d'arrivée.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Formules de Calcul
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Différence Calendaire :</strong> Δt = Date_Fin − Date_Début</p>
          <p><strong>Jours Ouvrés :</strong> Jours_Ouvrés = Total_Jours − Weekends − Fériés</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Méthode de Calcul Étape par Étape
        </h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Normalisation UTC :</strong> Conversion des composants de dates (année, mois, jour) en temps absolu sans distorsion de fuseau horaire.</li>
          <li><strong>Comptage Calendaire :</strong> Calcul du nombre entier de jours écoulés.</li>
          <li><strong>Filtrage Ouvré :</strong> Vérification de chaque jour vis-à-vis des jours chômés et jours fériés légaux.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          5. Exemples Concrets
        </h2>
        <div className="space-y-4">
          <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-slate-900 dark:text-white">Exemple 1 : Durée entre deux dates</h3>
            <p className="text-sm mt-1">
              <strong>Entrée :</strong> 1er mars au 1er avril (mode exclusif).<br />
              <strong>Calcul :</strong> Le mois de mars compte 31 jours.<br />
              <strong>Résultat :</strong> <strong>31 jours calendaires</strong>.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          6. Erreurs Fréquentes
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Confondre jours calendaires et jours ouvrés/ouvrables.</li>
          <li>Oublier la prise en compte du 29 février lors d'un calcul pluri-annuel.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          7. Applications Pratiques
        </h2>
        <p>
          Idéal pour calculer les préavis de démission ou de licenciement, les délais de prescription juridique, les échéances de facturation et les plannings de livraison.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          8. Récapitulatif
        </h2>
        <p>
          Une planification rigoureuse nécessite d'utiliser des algorithmes conformes au calendrier grégorien plutôt que des approximations manuelles.
        </p>
      </section>
    </article>
  );
}
