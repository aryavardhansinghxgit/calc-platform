"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "Qu'est-ce qu'une marge de crédit HELOC et comment fonctionne-t-elle ?",
    "answer": "Une HELOC est une ligne de crédit renouvelable garantie par votre propriété, permettant des retraits échelonnés selon vos besoins durant la période d'utilisation."
  },
  {
    "question": "Quel montant puis-je obtenir avec une HELOC ?",
    "answer": "La plupart des institutions autorisent un CLTV de 80 % à 85 % de la valeur marchande du bien, déduction faite du solde de votre première hypothèque."
  },
  {
    "question": "Comment se calculent les paiements en période de tirage et de remboursement ?",
    "answer": "Pendant la phase de tirage, vous ne payez que les intérêts mensuels sur les sommes utilisées. En phase de remboursement, vous remboursez le capital et les intérêts."
  },
  {
    "question": "Qu'est-ce que le choc de paiement (payment shock) ?",
    "answer": "C'est la hausse soudaine de la mensualité lorsque prend fin la période d'intérêts seuls et que débute l'amortissement obligatoire du capital."
  },
  {
    "question": "Quel type de taux s'applique à une HELOC ?",
    "answer": "Il s'agit généralement d'un taux variable indexé sur le taux préférentiel majoré d'une marge définie par le prêteur."
  },
  {
    "question": "Quels frais sont associés à une marge HELOC ?",
    "answer": "Ils peuvent inclure des frais de dossier, des frais annuels de gestion (50 $ à 100 $), des frais d'évaluation et de clôture."
  },
  {
    "question": "Les intérêts d'une HELOC sont-ils déductibles d'impôt ?",
    "answer": "Ils ne sont déductibles que si les montants empruntés servent à acquérir, construire ou rénover substantiellement la résidence principale."
  },
  {
    "question": "La banque peut-elle réduire ou geler ma marge HELOC ?",
    "answer": "Oui, le prêteur se réserve le droit de restreindre ou geler la ligne en cas de baisse notable de la valeur marchande ou de dégradation financière."
  },
  {
    "question": "Que se passe-t-il si je n'utilise pas ma marge disponible ?",
    "answer": "Aucun intérêt n'est facturé tant que le solde utilisé est nul, bien que des frais annuels puissent s'appliquer."
  },
  {
    "question": "Puis-je rembourser le capital pendant la période de tirage ?",
    "answer": "Oui, vous pouvez effectuer des versements volontaires de capital à tout moment pour reconstituer votre réserve de crédit."
  },
  {
    "question": "Quel score de crédit est requis ?",
    "answer": "Un score de 660 à 680 est généralement requis, et plus de 720 pour bénéficier des meilleures marges tarifaires."
  },
  {
    "question": "Quel est l'impact d'une hausse des taux d'intérêt ?",
    "answer": "Toute hausse du taux de référence augmente immédiatement le coût de vos intérêts et vos mensualités futures."
  }
];

export const seo = {
  title: "Calculateur de Marge de Crédit HELOC — Dette Totale Autorisée ",
  description: "Calculez la capacité d'emprunt HELOC, les mensualités d'intérêts seuls, les paiements en phase de remboursement et les scénarios de hausse de taux.",
  keywords: ["calculateur heloc","marge de credit hypothecaire","interet heloc","credit valeur domiciliaire"]
};

export const ContentComponent = function HELOCContentFR() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculateur de Marge de Crédit HELOC
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Estimez la capacité maximale d'emprunt HELOC, le ratio combiné (CLTV), les mensualités d'intérêts seuls, les paiements en phase d'amortissement, le choc de paiement et les scénarios de stress de taux.
        </p>
      </div>

      {/* 1. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Qu'est-ce qu'un Calculateur HELOC ?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Un calculateur de marge de crédit sur valeur domiciliaire (HELOC) évalue le crédit renouvelable accessible à partir de votre équité immobilière et modélise vos paiements lors des phases d'utilisation et de remboursement.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Contrairement à un prêt à terme fixe, la HELOC offre une période de tirage flexible (ex. 10 ans) suivie d'une période de remboursement structurée (ex. 20 ans).
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Avis sur le Modèle Financier</span>
          </div>
          <p>
            Les résultats fournis constituent des simulations financières mathématiques indicatives.
          </p>
        </div>
      </section>

      {/* 2. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Comment Utiliser le Calculateur HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Suivez ces étapes pour simuler votre marge de crédit :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. Saisissez la valeur estimée de votre propriété.</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Indiquez le solde restant dû de la première hypothèque.</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. Choisissez le ratio maximal de CLTV (80 % standard ou 85 % élevé).</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. Indiquez le montant de marge HELOC souhaité.</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. Entrez le taux d'intérêt variable initial.</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. Définissez la durée de tirage (5, 10, 15 ans) et de remboursement (10, 15, 20 ans).</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. Précisez les frais initiaux et les frais annuels de gestion.</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. Sélectionnez la structure de paiement en période de tirage.</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. Analysez la capacité d'emprunt, la mensualité de tirage et celle de remboursement.</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. Consultez le tableau d'amortissement complet en deux phases.</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. Simulez des hausses de taux d'intérêt (+1 %, +2 %, +3 %).</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. Testez des tirages additionnels et des remboursements accélérés.</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. Comparez avec un prêt sur valeur nette à taux fixe.</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. Évaluez la déductibilité fiscale applicable.</span>
            </div>
        </div>
      </section>

      {/* 3. CAPACITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Calcul de la Capacité d'Emprunt HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La capacité d'emprunt est fonction de l'endettement maximal permis par le ratio CLTV :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"Dette Totale Autorisée = Valeur Marchande × Plafond CLTV %"}</div>
          <div>{"Marge HELOC Maximale = max(0, Dette Totale Autorisée - Solde 1ère Hypothèque)"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Exemple : Pour une maison de 500 000 $ avec une hypothèque de 260 000 $ et un CLTV de 80 %, la dette autorisée est de 400 000 $. En soustrayant 260 000 $, la marge HELOC maximale est de 140 000 $. Une ligne de 50 000 $ donne un CLTV utilisé de 62,0 %.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Ce modèle assure une visibilité complète sur la flexibilité financière disponible.
        </p>
      </section>

      {/* 4. DRAW VS REPAY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Période de Tirage vs Période de Remboursement
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La durée de vie d'une HELOC s'articule en deux étapes distinctes :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Pendant le tirage (10 ans), vous empruntez selon vos besoins en payant uniquement les intérêts. En phase de remboursement (20 ans), la ligne est fermée et vous remboursez capital et intérêts.
        </p>
      </section>

      {/* 5. INTEREST ONLY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Paiements d'Intérêts Seuls en Phase de Tirage
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La mensualité d'intérêts seuls (I) s'établit ainsi :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          I = Solde Utilisé × (Taux Annuel / 12). Pour 50 000 $ à 8,50 %, la mensualité est de 354,17 $.
        </p>
      </section>

      {/* 6. FULL PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Paiements Complets en Phase de Remboursement
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          À l'entrée en phase d'amortissement, le paiement passe en annuité constante :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Pour 50 000 $ à 8,50 % sur 20 ans (240 mois), la mensualité s'élève à 433,91 $.
        </p>
      </section>

      {/* 7. PAYMENT SHOCK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Analyse du Choc de Paiement (Payment Shock)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Le choc de paiement mesure le saut financier lors de la transition vers le remboursement.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Dans cet exemple, la mensualité passe de 354,17 $ à 433,91 $ (+22,5 %). Sur 10 ans de remboursement, elle atteindrait 620,06 $ (+75,1 %).
        </p>
      </section>

      {/* 8. STRESS TEST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Scénarios de Stress de Taux Variables
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          En cas de resserrement monétaire, les mensualités augmentent :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Une hausse de taux de +2 % (à 10,50 %) porte la mensualité de tirage à 437,50 $ (+23,5 %) et celle de remboursement à 498,98 $ (+15,0 %).
        </p>
      </section>

      {/* 9. ANNUAL FEES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Frais Annuels et Coût Global
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Les frais annuels de gestion (50 $ à 100 $) s'ajoutent au coût global du crédit.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Sur 30 ans, 75 $ par an représentent 2 250 $ de frais cumulés.
        </p>
      </section>

      {/* 10. MULTI DRAW */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Gestion du Cycle de Vie et Remboursements Anticipés
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Effectuer des versements volontaires de capital permet de réduire les intérêts débiteurs.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Un versement supplémentaire de 100 $ par mois en phase d'amortissement génère d'importantes économies d'intérêts.
        </p>
      </section>

      {/* 11. HELOC VS HELOAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. HELOC vs Prêt sur Valeur Nette Fixe
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La HELOC privilégie la souplesse de trésorerie pour des dépenses échelonnées.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Le prêt fixe garantit une sécurité totale sur le montant des mensualités.
        </p>
      </section>

      {/* 12. HELOC VS CASH OUT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. HELOC vs Refinancement avec Retrait d'Équité
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La HELOC conserve le taux d'intérêt avantageux de votre première hypothèque.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Le refinancement global convertit toute la dette au taux actuel du marché.
        </p>
      </section>

      {/* 13. CREDIT QUAL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Critères d'Admissibilité et Ratios
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Un ratio d'endettement DTI inférieur à 43 % et un score de crédit de 680+ sont recommandés.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Une expertise immobilière favorable est requise pour débloquer les plafonds de 85 % de CLTV.
        </p>
      </section>

      {/* 14. TAX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Déductibilité Fiscale des Intérêts
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Les intérêts ne sont déductibles que si les fonds servent à l'amélioration du bien immobilier.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          L'utilisation pour des dépenses courantes ne donne droit à aucune déduction fiscale.
        </p>
      </section>

      {/* 15. FREEZE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. Risque de Gel de la Ligne de Crédit
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Le prêteur peut bloquer de nouveaux tirages si les prix immobiliers chutent.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Il est prudent de maintenir une épargne de précaution distincte.
        </p>
      </section>

      {/* 16. UNDERWATER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          16. Scénarios d'Équité Négative
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          En cas de dépréciation du marché, la marge disponible est suspendue.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Le service des intérêts et remboursements reste dû.
        </p>
      </section>

      {/* 17. FIXED RATE LOCK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. Options de Verrouillage à Taux Fixe
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Certains contrats permettent de convertir une partie du solde en tranche à taux fixe.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Cela permet de se prémunir contre la volatilité des taux variables.
        </p>
      </section>

      {/* 18. CLOSING AND EARLY CLOSURE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          18. Frais de Clôture et Fermeture Anticipée
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Les frais d'ouverture varient de 500 $ à 2 500 $.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Résilier la ligne dans les premières années peut entraîner des pénalités de clôture anticipée.
        </p>
      </section>

      {/* 19. STRATEGIC USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          19. Utilisation Stratégique du Crédit
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Consacrer la HELOC à des projets valorisant le patrimoine maximise le rendement du capital.
        </p>
      </section>

      {/* 20. TRANSITION PLANNING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          20. Anticipation de la Phase de Remboursement
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Préparer la hausse de mensualité plusieurs années avant la fin du tirage évite les tensions financières.
        </p>
      </section>

      {/* 21. OPTIMIZATION TIPS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          21. Bonnes Pratiques de Gestion
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Amortir régulièrement le capital permet de limiter les intérêts débiteurs cumulés.
        </p>
      </section>

      {/* 22. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          22. Erreurs à Éviter avec une HELOC
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Ne payer que les intérêts sans anticiper le saut de mensualité en phase de remboursement.</li>
            <li>Utiliser la marge pour financer des dépenses de consommation non productives.</li>
            <li>Négliger l'impact potentiel des hausses de taux d'intérêt variables.</li>
            <li>Supposer que la ligne restera ouverte sans risque de gel par l'institution.</li>
            <li>Oublier les frais annuels de gestion dans le coût total du financement.</li>
            <li>Croire que les intérêts sont automatiquement déductibles sans justificatif.</li>
            <li>Omettre de comparer avec un prêt fixe de seconde hypothèque.</li>
            <li>Utiliser 100 % de la marge sans conserver de marge de sécurité.</li>
            <li>Fermer la ligne prématurément sans vérifier les frais de clôture anticipée.</li>
            <li>Ne pas tester de scénarios de stress de taux avant la souscription.</li>
          </ul>
        </div>
      </section>

      {/* 23. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          23. Synthèse des Formules Mathématiques HELOC
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Dette Totale Autorisée :</strong>  Valeur Marchande × Plafond CLTV %</div>
          <div>• <strong>Marge HELOC Maximale :</strong>  max(0, Dette Totale - Solde 1ère Hypothèque)</div>
          <div>• <strong>CLTV Utilisé :</strong>  (Solde 1ère Hypothèque + Solde HELOC) / Valeur Marchande × 100</div>
          <div>• <strong>Mensualité Intérêts Seuls :</strong>  Solde Utilisé × (Taux Annuel / 12)</div>
          <div>• <strong>Mensualité de Remboursement :</strong>  P × [r(1+r)^n] / [(1+r)^n - 1]</div>
          <div>• <strong>Choc de Paiement :</strong>  (Mensualité Remboursement - Mensualité Tirage) / Mensualité Tirage × 100</div>
          <div>• <strong>Économie Fiscale Estimée :</strong>  Intérêts Déductibles Annuels × Taux Marginal d'Imposition</div>
        </div>
      </section>

      {/* 24. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Orientation Pédagogique et Avis Réglementaire</span>
        </div>
        <p>
          Les marges de crédit sur valeur domiciliaire sont encadrées par la réglementation financière. Cette calculatrice fournit des simulations indicatives à des fins éducatives.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "fr",
  calculatorSlug: "heloc-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
