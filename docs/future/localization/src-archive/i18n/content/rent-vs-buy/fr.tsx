"use client";

import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "Vaut-il mieux louer ou acheter son logement ?",
    "answer": "Cela dépend de votre horizon de séjour, du prix d'achat, du niveau des loyers et du rendement de vos investissements."
  },
  {
    "question": "Qu'est-ce que l'horizon de rentabilité (breakeven) ?",
    "answer": "Le nombre d'années nécessaires pour que l'achat devienne financièrement plus avantageux que la location équivalente."
  },
  {
    "question": "Qu'est-ce que la règle des 5 % ?",
    "answer": "Elle évalue les coûts irrécupérables de l'achat en additionnant les intérêts, les taxes foncières et l'entretien annuel."
  },
  {
    "question": "Comment l'appréciation immobilière influence-t-elle le résultat ?",
    "answer": "Elle augmente la valeur nette du patrimoine à terme, bien qu'elle varie selon les cycles de marché."
  },
  {
    "question": "Quel est l'effet de l'augmentation des loyers ?",
    "answer": "La hausse annuelle des loyers alourdit le coût du locataire, rendant la mensualité fixe d'achat plus avantageuse."
  },
  {
    "question": "Qu'est-ce que le coût d'opportunité de l'apport ?",
    "answer": "Le rendement financier auquel vous renoncez en immobilisant votre épargne dans le bien au lieu de la placer."
  },
  {
    "question": "Quels sont les coûts cachés de l'achat immobilier ?",
    "answer": "Frais de clôture (2 % à 5 %), taxe foncière, assurance, entretien annuel (1 %) et frais d'agence à la revente."
  },
  {
    "question": "Qu'est-ce que le ratio prix/loyer ?",
    "answer": "Le prix du bien divisé par le loyer annuel; un ratio inférieur à 15 favorise l'achat et supérieur à 20 la location."
  },
  {
    "question": "Comment les déductions fiscales sont-elles intégrées ?",
    "answer": "Les intérêts et taxes déductibles réduisent la charge fiscale nette des propriétaires admissibles."
  },
  {
    "question": "Pourquoi la durée de détention est-elle primordiale ?",
    "answer": "Parce que les frais de transaction initiaux nécessitent plusieurs années de remboursement pour être amortis."
  },
  {
    "question": "Quel est l'impact sur le patrimoine après 30 ans ?",
    "answer": "L'acheteur détient un bien immobilier entièrement payé tandis que le locataire capitalise sur son portefeuille boursier."
  },
  {
    "question": "Comment conduire une analyse de sensibilité ?",
    "answer": "Simulez plusieurs scénarios en modifiant l'appréciation, l'inflation des loyers et les rendements boursiers."
  }
];

export const seo = {
  title: "Calculateur Louer ou Acheter (Rent vs Buy) — Ratio = Prix d'Achat / Loyer Annuel Global (Base ",
  description: "Comparez la location et l'achat immobilier : mensualités, appréciation, hausse des loyers, coût d'opportunité et horizon de rentabilité.",
  keywords: ["calculateur louer ou acheter","rent vs buy","rentabilite achat immobilier","comparatif location achat"]
};

export const ContentComponent = function RentVsBuyContentFR() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-normal leading-relaxed max-w-4xl mx-auto py-4">
      {/* 1. Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculateur Louer ou Acheter (Rent vs Buy)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
          Analysez en détail le dilemme entre location et achat immobilier en intégrant amortissement, hausse des loyers, taxes, entretien et coût d'opportunité des capitaux.
        </p>
      </div>

      {/* 2. What Does it Do */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Que Fait Réellement un Calculateur Louer ou Acheter ?
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Choisir entre louer ou acheter ne se résume pas à comparer un loyer à une mensualité hypothécaire. Un modèle complet intègre l'apport personnel, les intérêts, le remboursement de capital, les taxes foncières, les assurances, l'entretien, les charges de copropriété, les frais de transaction, l'appréciation du bien et le coût d'opportunité des fonds investis.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Cet outil est un modèle d'aide à la décision financière. Dans le scénario de référence, l'horizon de rentabilité s'établit à environ 4,8 ans sous les hypothèses sélectionnées.
        </p>
      </section>

      {/* 3. Total Economics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Comparer l'Économie Globale, Pas Uniquement les Mensualités
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Une mensualité de prêt comprend une charge financière (intérêts) et une épargne forcée (amortissement de capital). Le locataire n'assume pas de frais d'entretien lourd mais subit des hausses de loyer continues et conserve des liquidités à investir.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Notre modèle confronte ainsi les coûts irrécupérables, l'accumulation de patrimoine net et les flux de trésorerie sur toute la période.
        </p>
      </section>

      {/* 4. How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. Guide d'Utilisation du Calculateur
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          <li>Saisissez le prix d'achat du bien et le pourcentage d'apport.</li>
          <li>Indiquez le taux d'intérêt et la durée du prêt en années.</li>
          <li>Renseignez la taxe foncière, l'assurance et l'entretien annuel.</li>
          <li>Précisez les frais de clôture à l'achat et les frais de vente futurs.</li>
          <li>Entrez le loyer mensuel initial et le taux de croissance annuel du loyer.</li>
          <li>Ajoutez l'assurance locataire et les charges annexes.</li>
          <li>Indiquez le taux de rendement estimé pour vos placements alternatifs.</li>
          <li>Examinez la décomposition des coûts pour chaque option.</li>
          <li>Analysez l'horizon de rentabilité et le tableau de durée de détention.</li>
          <li>Évaluez le ratio prix/loyer et la règle des 5 %.</li>
          <li>Comparez l'évolution du patrimoine net à 10, 20 et 30 ans.</li>
          <li>Sauvegardez vos scénarios pour tester différentes hypothèses.</li>
        </ol>
      </section>

      {/* 5. Inputs Explained */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          5. Explication des Données d'Entrée
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.1 Prix du Bien et Mise de Fonds</h3>
            <p className="mt-1 leading-relaxed">Ils déterminent le montant emprunté. Pour 500 000 $ avec 20 % d'apport, vous mobilisez 100 000 $ et empruntez 400 000 $.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.2 Taux Hypothécaire et Durée</h3>
            <p className="mt-1 leading-relaxed">Ils définissent le plan d'amortissement fixe. Un taux supérieur augmente le coût financier irrécupérable.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.3 Taxe Foncière, Assurances et Entretien</h3>
            <p className="mt-1 leading-relaxed">Représentent les charges récurrentes liées à la propriété, ajustées chaque année avec l'inflation.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.4 Loyer Initial et Croissance Annuelle</h3>
            <p className="mt-1 leading-relaxed">Le loyer augmente chaque année selon l'inflation locative prévue.</p>
          </div>
        </div>
      </section>

      {/* 6. How Mortgage Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Fonctionnement du Volet Hypothécaire
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Chaque mensualité se compose d'intérêts dégressifs et d'un amortissement progressif du capital.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Au fil des années, la part de capital remboursée s'accroît, accélérant la création de valeur nette.
        </p>
      </section>

      {/* 7. Buying Costs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Coûts d'Achat Hors Mensualité de Prêt
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La propriété implique des dépenses non récupérables : taxes locales, entretien régulier et frais de transaction à la vente (5 % à 6 %).
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Ces frais rendent les détentions courtes risquées : plusieurs années d'amortissement sont requises pour les compenser.
        </p>
      </section>

      {/* 8. Stay Length */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          8. Pourquoi la Durée de Détention est Capitale
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Les frais d'acquisition et de cession sont ponctuels, tandis que l'appréciation et le remboursement s'étalent dans le temps.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Dans notre scénario, le point mort est atteint à 4,8 ans. En dessous de 3 ans, la location s'avère souvent plus rentable.
        </p>
      </section>

      {/* 9. Breakeven Point */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          9. Explication du Point Mort (Breakeven)
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          C'est l'instant où le coût net cumulé de l'achat devient inférieur à celui de la location.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          À 30 ans, le coût net cumulé s'établit à 726 761 $ à l'achat contre 1 721 379 $ en location dans le modèle standard.
        </p>
      </section>

      {/* 10. Appreciation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          10. Appréciation Immobilière
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La hausse annuelle composée de la valeur du logement enrichit le propriétaire.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          À 3 % par an, un bien de 500 000 $ dépasse 1 200 000 $ de valeur marchande après 30 ans.
        </p>
      </section>

      {/* 11. Rent Growth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          11. Inflation des Loyers
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Un loyer de 3 000 $ progressant de 3 % par an atteint 7 280 $/mois au bout de 30 ans.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Cette progression continue renforce l'avantage d'une mensualité de prêt fixe dans le temps.
        </p>
      </section>

      {/* 12. Opportunity Cost */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          12. Coût d'Opportunité de l'Apport
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          L'apport immobilise des capitaux qui auraient pu fructifier sur les marchés financiers.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          À 5 % par an, 100 000 $ investis génèrent plus de 432 000 $ en 30 ans.
        </p>
      </section>

      {/* 13. Price-to-Rent */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          13. Ratio Prix / Loyer
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Établi en divisant le prix d'achat par le loyer annuel (500 000 $ / 36 000 $ = 13,9).
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Un ratio inférieur à 15 reflète un marché structurellement favorable à l'acquisition.
        </p>
      </section>

      {/* 14. 5% Rule */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          14. La Règle des 5 % des Coûts Irrécupérables
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Elle totalise les intérêts nets, les taxes et l'entretien annuel.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Pour 500 000 $, le coût irrécupérable modélisé s'élève à 4 013 $/mois face au loyer équivalent.
        </p>
      </section>

      {/* 15. Tax Benefits */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          15. Avantages Fiscaux Hypothécaires
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La déduction des intérêts d'emprunt peut procurer un allègement fiscal substantiel.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Le modèle évalue une économie fiscale indicative de 1 007 $ la première année.
        </p>
      </section>

      {/* 16. Net Worth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          16. Patrimoine Net : Immobilier vs Portefeuille de Placements
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La comparaison finale porte sur la valeur nette totale accumulée.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          À 10 ans, le patrimoine net immobilier atteint 359 958 $ contre 162 889 $ pour le portefeuille du locataire.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          À 30 ans, le bien immobilier intégralement remboursé constitue un capital net majeur.
        </p>
      </section>

      {/* 17. Scenario Drivers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          17. Pourquoi l'Achat Gagne dans un Cas et la Location dans un Autre
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Un horizon long, une hausse modérée des prix et des loyers dynamiques avantagent l'achat.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Une mobilité fréquente et des marchés boursiers performants favorisent la location.
        </p>
      </section>

      {/* 18. Short vs Long */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          18. Décisions Résidentielles : Court Terme vs Long Terme
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La location assure une grande agilité géographique et professionnelle.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          L'achat stabilise les coûts d'hébergement et bâtit un patrimoine pérenne.
        </p>
      </section>

      {/* 19. Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          19. Erreurs Fréquentes à Éviter
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          <li>Comparer uniquement le loyer à la mensualité de prêt.</li>
          <li>Considérer la mensualité hypothécaire comme une dépense entièrement perdue.</li>
          <li>Oublier les taxes foncières, l'assurance et l'entretien régulier.</li>
          <li>Négliger les frais de transaction à l'achat et à la revente.</li>
          <li>Supposer que l'appréciation immobilière est garantie chaque année.</li>
          <li>Anticiper des rendements boursiers linéaires sans volatilité.</li>
          <li>Prendre le ratio prix/loyer comme seul critère de décision.</li>
          <li>Sous-estimer l'impact de l'inflation cumulée des loyers sur 20 ans.</li>
          <li>Ne pas tester de scénarios de sensibilité avec différentes durées de détention.</li>
        </ul>
      </section>

      {/* 20. Scenario Analysis */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          20. Analyse de Scénarios : La Méthode Recommandée
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Bâtissez un scénario de base, un scénario d'achat prudent et un scénario de location optimisé.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Faites varier un paramètre à la fois pour mesurer les facteurs déterminants de votre choix.
        </p>
      </section>

      {/* 21. Methodology */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          21. Méthodologie et Formules de Référence
        </h2>
        <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.1 Mensualité Hypothécaire</h3>
            <p className="mt-0.5 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
              M = P × [r(1+r)^n] / [(1+r)^n - 1]
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.2 Valeur Future du Bien</h3>
            <p className="mt-0.5 leading-relaxed">Valeur(t) = Valeur(0) × (1 + r_appreciation)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.3 Évolution du Loyer</h3>
            <p className="mt-0.5 leading-relaxed">Loyer(t) = Loyer(0) × (1 + r_inflation_loyer)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.4 Ratio Prix / Loyer</h3>
            <p className="mt-0.5 leading-relaxed">Ratio = Prix d'Achat / Loyer Annuel Global (Base : 13.9)</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.5 Coût d'Opportunité de Placement</h3>
            <p className="mt-0.5 leading-relaxed">Portefeuille(t) = Apport Initial × (1 + r_placement)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.6 Économie Fiscale Estimée</h3>
            <p className="mt-0.5 leading-relaxed">Économie = max(0, Déductions Réelles - Déduction Forfaitaire) × Taux Marginal</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "fr",
  calculatorSlug: "rent-vs-buy-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
