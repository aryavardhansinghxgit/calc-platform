"use client";

import React from "react";
import Link from "next/link";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const FRENCH_MORTGAGE_SEO = {
  title: "Calculateur de Prêt Hypothécaire",
  description:
    "Calculez vos mensualités de prêt hypothécaire (capital et intérêts), taxes foncières, assurance habitation, PMI et charges de copropriété. Simulez remboursements anticipés, paiements bihebdomadaires et tableau d'amortissement complet.",
  category: "Finance",
  keywords: [
    "calculateur de prêt hypothécaire",
    "simulateur prêt immobilier",
    "mensualité prêt hypothécaire",
    "tableau d'amortissement",
    "taux d'intérêt immobilier",
    "assurance emprunteur pmi",
    "taxe foncière",
    "charges de copropriété",
    "remboursement anticipé",
    "paiement bihebdomadaire",
  ],
};

export const FRENCH_MORTGAGE_FAQS: CalculatorFAQ[] = [
  {
    question: "Comment est calculée la mensualité de base (capital et intérêts) ?",
    answer:
      "Votre mensualité de base est calculée à l'aide de la formule d'amortissement à taux fixe : M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ], où P est le montant emprunté, r est le taux d'intérêt périodique mensuel (taux nominal annuel divisé par 12) et n est le nombre total d'échéances mensuelles (ex. 360 mois pour un emprunt sur 30 ans).",
  },
  {
    question: "Quelle est la différence entre PITI et le Déboursement Mensuel Total du Logement ?",
    answer:
      "Le standard PITI (Principal, Interest, Taxes, Insurance) regroupe le Capital, les Intérêts, les Taxes foncières et l'Assurance habitation. Le Déboursement Mensuel Total est une notion budgétaire exhaustive qui englobe le PITI plus l'Assurance Emprunteur (PMI), les charges de copropriété (HOA), les provisions pour entretien et les remboursements anticipés volontaires.",
  },
  {
    question: "Quelle est la différence entre le taux d'intérêt nominal et le TAEG (APR) ?",
    answer:
      "Le taux d'intérêt nominal contractuel est le pourcentage annuel appliqué sur le capital restant dû. Le Taux Annuel Effectif Global (TAEG / APR) intègre le taux nominal augmenté des frais de dossier, des commissions d'intermédiation, des frais de garantie et des primes d'assurance obligatoire, exprimé en pourcentage annualisé.",
  },
  {
    question: "Quand l'assurance emprunteur / PMI peut-elle être résiliée ?",
    answer:
      "Selon les normes standardisées (comme la loi HPA de 1998 aux États-Unis), l'emprunteur peut demander la résiliation écrite de l'assurance dès que le capital restant dû atteint 80% de la valeur d'achat initiale du bien (LTV 80%). La suppression devient automatique lorsque le plan d'amortissement atteint 78% LTV, sous réserve de la régularité des paiements.",
  },
  {
    question: "Comment les remboursements anticipés raccourcissent-ils la durée du prêt ?",
    answer:
      "Les remboursements anticipés sont affectés à 100% à la réduction directe du capital restant dû. Comme les intérêts futurs sont calculés sur ce solde réduit, la charge d'intérêts diminue de manière irréversible, permettant aux échéances constantes de solder la dette plusieurs années plus tôt.",
  },
  {
    question: "Comment un programme de paiement toutes les deux semaines permet-il d'économiser des intérêts ?",
    answer:
      "Un plan bihebdomadaire divise l'échéance mensuelle de base par deux (M / 2) et la règle toutes les deux semaines. Une année comptant 52 semaines, vous effectuez 26 demi-paiements, soit l'équivalent de 13 mensualités pleines par an. Cette treizième mensualité annuelle affectée au capital réduit la durée du prêt et fait économiser des milliers d'euros d'intérêts cumulés.",
  },
];

export function FrenchMortgageContent() {
  return (
    <div className="space-y-10 py-4 text-slate-900 dark:text-slate-100">
      {/* SECTION 1: Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Comprendre Votre Prêt Hypothécaire et le Coût Global du Logement
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Un prêt immobilier résidentiel constitue l&apos;un des engagements financiers à plus long terme qu&apos;un ménage puisse souscrire.
          Bien que les acquéreurs évaluent souvent les biens en fonction du seul prix d&apos;achat et du taux d&apos;intérêt nominal,
          le coût réel de la propriété immobilière associe le service de la dette, les taxes foncières municipales, l&apos;assurance habitation,
          les charges de copropriété et l&apos;éventuelle assurance emprunteur (PMI).
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Ce <strong>Calculateur de Prêt Hypothécaire</strong> est conçu pour fournir une ventilation exhaustive et transparente de
          vos dépenses de logement. Au-delà des calculs standard de capital et d&apos;intérêts, il vous permet de simuler les frais de séquestre (escrow),
          l&apos;inflation annuelle projetée des coûts, les calendriers accélérés de paiement bihebdomadaire et les stratégies personnalisées
          d&apos;amortissement anticipé pour évaluer les économies d&apos;intérêts sur toute la durée du crédit.
        </p>
      </section>

      {/* SECTION 2: Comment Utiliser le Calculateur de Prêt Hypothécaire */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Comment Utiliser le Calculateur de Prêt Hypothécaire
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Le simulateur est structuré en modules interactifs qui mettent à jour en temps réel vos mensualités, vos graphiques et vos tableaux d&apos;amortissement :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Prix du Bien et Apport Personnel</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Saisissez le prix d&apos;achat contractuel et votre apport initial (en dollars ou en pourcentage). L&apos;outil calcule automatiquement le capital emprunté requis et le ratio prêt-valeur (LTV).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Durée du Prêt et Taux d&apos;Intérêt</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Indiquez l&apos;horizon d&apos;amortissement (ex. 15 ou 30 ans) et le taux d&apos;intérêt nominal annuel fixe appliqué sur le capital restant dû.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Taxes, Assurance et PMI</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Renseignez la taxe foncière annuelle (en montant fixe ou en pourcentage), les primes d&apos;assurance habitation et les taux d&apos;assurance emprunteur (PMI) applicables lorsque l&apos;apport est inférieur à 20%.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Charges de Copropriété et Entretien</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Indiquez les charges mensuelles de copropriété (HOA) et les provisions annuelles d&apos;entretien (que le calculateur divise par 12 pour fixer une réserve mensuelle).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Indexation Annuelle des Coûts (Inflation)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Modélisez l&apos;inflation à long terme en précisant les augmentations annuelles estimées pour les taxes locales, primes d&apos;assurance, charges de copropriété et frais d&apos;entretien.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Amortissement Extra et Paiement Bihebdomadaire</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Simulez des versements mensuels anticipés, des apports annuels programmés, jusqu&apos;à 8 remboursements ponctuels ou activez le rythme bihebdomadaire de 26 périodes par an.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: Ce que Calcule le Simulateur */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Ce que Calcule le Simulateur Hypothécaire
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Le calculateur produit un récapitulatif multidimensionnel de vos engagements mensuels initiaux et de vos dépenses cumulées sur 30 ans :
        </p>
        <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Capital et Intérêts (Base P&amp;I) :</strong> Le montant contractuel mensuel requis pour amortir intégralement le capital emprunté sur la durée convenue.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Provision Mensuelle pour Taxe Foncière :</strong> Exactement 1/12e de votre taxe foncière municipale annuelle estimée.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Provision Mensuelle pour Assurance Habitation :</strong> Exactement 1/12e de votre prime d&apos;assurance multirisque habitation annuelle.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Assurance Emprunteur Mensuelle (PMI) :</strong> Frais temporaires appliqués lorsque l&apos;apport est inférieur à 20% (LTV &gt; 80%).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Charges de Copropriété et Entretien :</strong> Charges mensuelles non séquestrées plus 1/12e des provisions d&apos;entretien.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Déboursement Mensuel Global du Logement :</strong> Le budget mensuel global en première année (P&amp;I + Taxes + Assurance + PMI + Copropriété + Entretien + Paiement Extra).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Intérêts Cumulés et Coût Total :</strong> Somme totale des intérêts payés sur la durée du prêt et montant total net décaissé sur l&apos;ensemble des postes.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Date de Libération du Prêt :</strong> Mois et année calendaires précis où le capital restant dû atteint exactement zéro.</span>
          </li>
        </ul>
      </section>

      {/* SECTION 4: Comment les Mensualités sont Calculées */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Comment les Mensualités sont Calculées
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Les mensualités de crédit immobilier à taux fixe reposent sur les mathématiques financières des annuités constantes.
          Chaque versement est structuré de sorte que la somme du capital remboursé et des intérêts périodiques reste invariable tout au long du terme.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            Formule Standard du Prêt Hypothécaire à Taux Fixe :
          </span>
          <div className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100 py-1 overflow-x-auto">
            M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
            <div><strong>M :</strong> Mensualité de base (Capital et Intérêts)</div>
            <div><strong>P :</strong> Montant du capital emprunté (Prix du bien - Apport)</div>
            <div><strong>r :</strong> Taux d&apos;intérêt périodique mensuel (Taux annuel / 12 / 100)</div>
            <div><strong>n :</strong> Nombre total d&apos;échéances mensuelles (Durée en années × 12)</div>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>Cas Limite à Taux Zéro :</strong> Dans l&apos;hypothèse théorique d&apos;un prêt à 0% d&apos;intérêt (r = 0),
          la formule se simplifie en une division linéaire : <code>M = P / n</code>. Les intérêts totaux sont de 0,00 $, et chaque dollar versé amortit directement le principal.
        </p>
      </section>

      {/* SECTION 5: Exemple Complet Calculé Pas à Pas */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Exemple Complet Calculé Pas à Pas
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Pour visualiser comment chaque élément compose votre dépense mensuelle totale, examinons l&apos;arithmétique détaillée du scénario de référence suivant :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-200 dark:border-slate-700 pb-2.5">
            <div><span className="text-slate-500 block">Prix du Bien :</span><strong>400 000,00 $</strong></div>
            <div><span className="text-slate-500 block">Apport (20%) :</span><strong>80 000,00 $</strong></div>
            <div><span className="text-slate-500 block">Capital Emprunté (P) :</span><strong>320 000,00 $</strong></div>
            <div><span className="text-slate-500 block">Taux d&apos;Intérêt :</span><strong>6,706%</strong></div>
          </div>
          <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
            <p>1. Taux Mensuel (r) = 0,06706 / 12 = 0,0055883333...</p>
            <p>2. Nombre de Périodes (n) = 30 ans × 12 = 360 mois</p>
            <p>3. Facteur d&apos;Intérêt Composé (1 + r)^360 = (1,0055883333)^360 ≈ 7,464627</p>
            <p>4. Mensualité P&amp;I = 320 000 $ × [ 0,0055883333 × 7,464627 ] / [ 7,464627 - 1 ] = <strong>2 066,16 $</strong></p>
            <p>5. Taxe Foncière Mensuelle (1,2% sur 400 k$) = 4 800,00 $ / 12 = <strong>400,00 $</strong></p>
            <p>6. Assurance Habitation Mensuelle = 1 500,00 $ / 12 = <strong>125,00 $</strong></p>
            <p>7. Assurance Emprunteur (PMI) = 0,00 $ (Exonérée grâce aux 20% d&apos;apport)</p>
            <p>8. Charges de Copropriété (HOA) = <strong>333,33 $</strong></p>
            <p>9. Provisions pour Entretien = 4 000,00 $ / 12 = <strong>333,33 $</strong></p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-sans font-bold text-blue-700 dark:text-blue-400">
              Déboursement Mensuel Global = 2 066,16 $ + 400,00 $ + 125,00 $ + 0,00 $ + 333,33 $ + 333,33 $ = 3 257,82 $ / mois
            </div>
            <div className="text-[11px] font-sans text-slate-600 dark:text-slate-400">
              Coût Total sur 30 Ans = 320 000 $ (Capital) + 423 818,78 $ (Intérêts) + 144 000 $ (Taxes) + 45 000 $ (Assurance) + 120 000 $ (Copropriété) + 120 000 $ (Entretien) = <strong>1 172 818,78 $</strong>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Mécanique d'Amortissement */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Mécanique d&apos;Amortissement du Prêt Immobilier
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          L&apos;amortissement désigne le processus d&apos;extinction progressive de la dette au fil des versements programmés. Dans un prêt à taux fixe, la répartition interne de la mensualité évolue constamment :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Premières Années (Années 1 à 5)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Puisque les intérêts mensuels sont calculés sur le capital initial élevé (<code>Intérêts = Solde × r</code>), la part d&apos;intérêts absorbe l&apos;essentiel des premiers versements. Au mois 1 de notre exemple, 1 788,27 $ rémunèrent le prêteur et seulement 277,89 $ amortissent le capital.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Dernières Années (Années 20 à 30)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              À mesure que les mensualités réduisent le capital restant dû, la part d&apos;intérêts diminue proportionnellement. La mensualité globale restant constante, une fraction croissante amortit directement le capital, accélérant la constitution de patrimoine net.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Pour consulter un échéancier complet isolant les déductions fiscales d&apos;intérêts, utilisez notre{" "}
          <Link href="/calculators/amortization-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculateur d&apos;amortissement dédié
          </Link>.
        </p>
      </section>

      {/* SECTION 7: Taxes Foncières, Assurance et Séquestre */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Taxes Foncières, Assurance Habitation et Comptes de Séquestre (Escrow)
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          La plupart des organismes prêteurs exigent l&apos;ouverture d&apos;un <strong>compte de séquestre (escrow)</strong> afin de s&apos;assurer que les impôts fonciers et les primes d&apos;assurance sont honorés ponctuellement.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          L&apos;établissement financier collecte chaque mois 1/12e de vos impôts et primes d&apos;assurance annuels estimés. En vertu des réglementations bancaires, le gestionnaire procède à une analyse annuelle pour ajuster les prélèvements en fonction de l&apos;évolution des taxes municipales. Dans ce calculateur, définir un pourcentage d&apos;augmentation annuelle permet d&apos;anticiper l&apos;impact de l&apos;inflation sur ces charges annexes sur 15 à 30 ans.
        </p>
      </section>

      {/* SECTION 8: Assurance Emprunteur (PMI) et Seuils LTV */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Assurance Emprunteur (PMI) et Seuils de Ratio Prêt-Valeur (LTV)
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Lors de l&apos;achat d&apos;un logement avec un prêt conventionnel et un apport inférieur à 20% du prix d&apos;achat, le ratio prêt-valeur (LTV) dépasse 80%. Les banques imposent alors une assurance emprunteur (PMI) pour couvrir le risque de défaut.
        </p>
        <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs space-y-1.5">
          <span className="font-bold text-blue-900 dark:text-blue-200 block">
            Réglementation et Règles d&apos;Annulation de la PMI (Homeowners Protection Act de 1998) :
          </span>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Résiliation à la Demande de l&apos;Emprunteur (80% LTV) :</strong> L&apos;emprunteur a le droit légal de demander par écrit la résiliation de la PMI dès que le solde de capital atteint 80% de la valeur d&apos;achat originale, sous réserve d&apos;un historique de paiement irréprochable.</li>
            <li><strong>Résiliation Automatique par le Prêteur (78% LTV) :</strong> Le prêteur est légalement tenu de résilier automatiquement la PMI à la date où le capital programmé atteint 78% du prix d&apos;acquisition initial selon le tableau d&apos;amortissement d&apos;origine.</li>
          </ul>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <em>Hypothèse de Modélisation du Simulateur :</em> Ce calculateur applique une <strong>hypothèse de résiliation à 80% LTV</strong> pour annuler les primes de PMI dans le tableau d&apos;amortissement. Pour tester l&apos;impact de différents montants d&apos;apport sur votre LTV, explorez notre{" "}
          <Link href="/calculators/down-payment-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculateur d&apos;apport personnel
          </Link>.
        </p>
      </section>

      {/* SECTION 9: Charges de Copropriété et Entretien */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Charges de Copropriété et Coûts Annexes du Logement
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Une erreur fréquente consiste à confondre le <strong>PITI</strong> (Capital, Intérêts, Taxes, Assurance) avec le <strong>coût total réel d&apos;occupation du logement</strong>.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Les cotisations de copropriété (HOA) et les charges de lotissement sont payées directement au syndic pour financer l&apos;entretien des parties communes, les espaces verts et les fonds de travaux. De plus, les conseillers financiers recommandent de provisionner régulièrement pour l&apos;entretien du logement. Dans notre calculateur, la saisie d&apos;un montant annuel sous <code>Autres Frais ($/an)</code> le divise par 12 pour l&apos;intégrer à votre budget mensuel sans fausser la dette bancaire contractuelle.
        </p>
      </section>

      {/* SECTION 10: Remboursements Extraordinaires */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Remboursements Anticipés et Amortissement Accéléré de Capital
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Effectuer des remboursements supplémentaires de principal réduit considérablement la charge totale d&apos;intérêts et raccourcit la durée de remboursement :
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-2.5 font-bold">Stratégie d&apos;Amortissement (Prêt 320 k$ à 6,706%)</th>
                <th className="p-2.5 font-bold">Nouvelle Durée</th>
                <th className="p-2.5 font-bold">Temps Gagné</th>
                <th className="p-2.5 font-bold">Économie Totale d&apos;Intérêts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-sans tabular-nums text-slate-600 dark:text-slate-400">
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">Référence (Sans Paiement Extra)</td>
                <td className="p-2.5">360 Mois (30,0 Ans)</td>
                <td className="p-2.5">0 Mois</td>
                <td className="p-2.5">0,00 $</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">+200 $ / Mois de Capital Extra</td>
                <td className="p-2.5">295 Mois (~24,6 Ans)</td>
                <td className="p-2.5">65 Mois (5,4 Ans)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">90 073,60 $</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">+2 000 $ / An (Prime Annuelle)</td>
                <td className="p-2.5">289 Mois (~24,1 Ans)</td>
                <td className="p-2.5">71 Mois (5,9 Ans)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">97 337,83 $</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">Versement Unique de 20 000 $ (Mois 12)</td>
                <td className="p-2.5">304 Mois (~25,3 Ans)</td>
                <td className="p-2.5">56 Mois (4,7 Ans)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">84 926,92 $</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Si les taux du marché ont baissé depuis la souscription de votre crédit, évaluez les gains potentiels et le seuil de rentabilité avec notre{" "}
          <Link href="/calculators/refinance-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculateur de rachat de crédit immobilier
          </Link>.
        </p>
      </section>

      {/* SECTION 11: Paiements Bihebdomadaires */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Mécanique des Paiements Toutes les Deux Semaines (Bihebdomadaires)
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Un prêt standard exige 12 mensualités par an. Dans un plan bihebdomadaire, vous réglez exactement la moitié de votre mensualité de base (<code>M / 2</code>) toutes les deux semaines.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Une année calendaire comprenant 52 semaines, ce calendrier génère <strong>26 demi-versements</strong>, ce qui équivaut à <strong>13 mensualités complètes par an</strong> (<code>26 × 0,5 = 13</code>). Cette treizième mensualité annuelle affectée directement au capital raccourcit le prêt de plusieurs années et élimine d&apos;importants intérêts composés.
        </p>
      </section>

      {/* SECTION 12: Prêt sur 15 Ans vs. 30 Ans */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Prêt Immobilier sur 15 Ans vs. 30 Ans à Taux Fixe
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Choisir entre un horizon de 15 ans et de 30 ans représente un arbitrage direct entre flexibilité mensuelle de trésorerie et coût total du crédit :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Prêt à Taux Fixe sur 30 Ans</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Mensualités contractuelles obligatoires plus faibles.</li>
              <li>Flexibilité maximale du budget familial face aux imprévus de revenus.</li>
              <li>Volume total d&apos;intérêts plus important sur l&apos;ensemble des décennies.</li>
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Prêt à Taux Fixe sur 15 Ans</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Mensualités obligatoires plus élevées (généralement de 35% à 50% de plus).</li>
              <li>Économies majeures sur les intérêts globaux (souvent plus de 50% d&apos;intérêts en moins).</li>
              <li>Constitution rapide de capital dès les cinq premières années.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 13: Capacité d'Emprunt et Ratio DTI */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Quel Prix de Maison Pouvez-Vous Vous Permettre ?
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Calculer la mensualité sur un prix d&apos;achat connu est une estimation directe. Cependant, si vous commencez vos recherches et souhaitez déterminer votre budget d&apos;achat maximal en fonction de vos revenus bruts et de vos dettes existantes, vous devez calculer votre capacité d&apos;emprunt.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Les banques évaluent votre éligibilité via le <strong>ratio d&apos;endettement (DTI)</strong> :
          un ratio logement (coûts du logement divisés par les revenus mensuels bruts, généralement plafonné à 28-33%) et un ratio d&apos;endettement global (toutes mensualités de crédit confondues, souvent plafonné à 36-43%). Pour évaluer votre capacité d&apos;achat, utilisez notre{" "}
          <Link href="/calculators/house-affordability-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculateur de capacité d&apos;achat immobilier
          </Link>{" "}
          ou vérifiez vos ratios d&apos;endettement avec notre{" "}
          <Link href="/calculators/dti-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculateur de ratio DTI
          </Link>.
        </p>
      </section>

      {/* SECTION 14: Erreurs Fréquentes */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Erreurs Courantes dans le Calcul d&apos;un Prêt Immobilier
        </h3>
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>1. Confondre Taux Nominal et TAEG (APR) :</strong> Le taux nominal sert au calcul du service de la dette mensuelle. Le TAEG intègre tous les frais annexes. Saisir le TAEG dans une formule d&apos;amortissement surestimera votre mensualité réelle de capital et d&apos;intérêts.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>2. Ne Budgétiser que le Capital et les Intérêts :</strong> Oublier la taxe foncière, l&apos;assurance et les charges de copropriété peut entraîner un déficit de trésorerie de 20% à 40% par rapport aux débours réels du logement.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>3. Croire que les Prêts Aidés Suivent les Règles de la PMI Conventionnelle :</strong> Certains prêts garantis par l&apos;État (comme les prêts FHA) appliquent des primes d&apos;assurance sur toute la durée du crédit. Pour ces financements spécifiques, consultez notre{" "}
            <Link href="/calculators/fha-loan-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              calculateur de prêt FHA
            </Link>{" "}
            ou notre{" "}
            <Link href="/calculators/va-mortgage-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              calculateur de prêt VA
            </Link>.
          </div>
        </div>
      </section>

      {/* SECTION 15: Calculateurs Associés */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Calculateurs Immobiliers et Financiers Associés
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <Link
            href="/calculators/house-affordability-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Capacité d&apos;Achat Immobilier
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Calculez le budget d&apos;achat maximal selon vos revenus.</span>
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Calculateur d&apos;Amortissement
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Échéanciers complets annuels et mensuels.</span>
          </Link>
          <Link
            href="/calculators/down-payment-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Apport Personnel
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Optimisez votre apport pour éliminer la PMI.</span>
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Rachat de Crédit
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Calculez les économies et le seuil de rentabilité.</span>
          </Link>
          <Link
            href="/calculators/rent-vs-buy-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Louer vs Acheter
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Comparez la création de patrimoine à long terme.</span>
          </Link>
          <Link
            href="/calculators/dti-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Ratio d&apos;Endettement (DTI)
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Vérifiez vos ratios d&apos;endettement bancaire.</span>
          </Link>
          <Link
            href="/calculators/fha-loan-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Prêt FHA
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Financement avec 3,5% d&apos;apport et MIP.</span>
          </Link>
          <Link
            href="/calculators/va-mortgage-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Prêt VA
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Financement sans apport pour militaires et vétérans.</span>
          </Link>
        </div>
      </section>

      {/* SECTION 16: Foire Aux Questions */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Foire Aux Questions
        </h3>
        <div className="space-y-3">
          {FRENCH_MORTGAGE_FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {faq.question}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FrenchMortgageContent;
