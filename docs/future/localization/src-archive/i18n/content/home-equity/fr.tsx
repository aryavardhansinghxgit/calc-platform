"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "Qu'est-ce qu'un prêt sur valeur nette immobilière et comment fonctionne-t-il ?",
    "answer": "Un prêt sur valeur nette est une seconde hypothèque à taux fixe permettant d'obtenir un capital forfaitaire en utilisant l'équité accumulée dans votre propriété comme garantie."
  },
  {
    "question": "Combien puis-je emprunter sur la valeur nette de mon logement ?",
    "answer": "La plupart des prêteurs autorisent un ratio CLTV maximal de 80 % à 85 % de la valeur estimée du logement, déduction faite du solde de votre première hypothèque."
  },
  {
    "question": "Qu'est-ce que le CLTV et comment se calcule-t-il ?",
    "answer": "Le CLTV (Combined Loan-to-Value) représente le total cumulé des hypothèques grevant le bien divisé par la valeur marchande du bien immobilier."
  },
  {
    "question": "Comment est calculée la mensualité d'un prêt sur valeur nette ?",
    "answer": "Elle est calculée selon la formule standard d'amortissement à taux fixe basée sur le capital emprunté, le taux d'intérêt périodique et la durée en mois."
  },
  {
    "question": "Quel score de crédit est requis pour être admissible ?",
    "answer": "Un score de crédit de 620 ou plus est généralement exigé, bien que les meilleurs taux soient réservés aux scores supérieurs à 700."
  },
  {
    "question": "Quelle est la différence entre un prêt sur valeur nette et une marge HELOC ?",
    "answer": "Le prêt sur valeur nette octroie un montant forfaitaire avec un taux et des mensualités fixes, tandis que la HELOC est une marge de crédit renouvelable à taux variable."
  },
  {
    "question": "Quelle est la différence avec un refinancement avec retrait d'équité ?",
    "answer": "Le refinancement remplace votre première hypothèque par une nouvelle hypothèque globale, alors que le prêt sur valeur nette conserve votre premier prêt intact."
  },
  {
    "question": "Les intérêts d'un prêt sur valeur domiciliaire sont-ils déductibles d'impôt ?",
    "answer": "Selon les règles fiscales en vigueur, les intérêts ne sont déductibles que si les fonds servent à acheter, construire ou améliorer substantiellement le logement."
  },
  {
    "question": "Puis-je rembourser un prêt sur valeur nette par anticipation ?",
    "answer": "Oui, la plupart des prêts autorisent des remboursements anticipés pour réduire la durée et les intérêts totaux sans pénalité."
  },
  {
    "question": "Quels sont les frais de clôture typiques d'une seconde hypothèque ?",
    "answer": "Ils se situent généralement entre 2 % et 5 % du montant emprunté (frais d'évaluation, d'origination, de notaire et d'enregistrement de titre)."
  },
  {
    "question": "Que se passe-t-il si la valeur marchande baisse et que le solde dépasse la valeur du bien ?",
    "answer": "Vous entrez en situation d'équité négative. Les mensualités restent inchangées, mais la vente ou le refinancement exigera un apport en capital."
  },
  {
    "question": "Combien de temps prend l'approbation et le versement des fonds ?",
    "answer": "Le délai s'étend généralement de 2 à 6 semaines selon les exigences d'évaluation, de vérification des revenus et d'analyse du dossier."
  }
];

export const seo = {
  title: "Calculateur de Prêt sur Valeur Domiciliaire — Dette Totale Maximale ",
  description: "Calculez les mensualités fixes d'un prêt sur valeur nette immobilière, le CLTV, le TAEG réel, l'amortissement et la capacité d'emprunt.",
  keywords: ["calculateur de pret sur valeur domiciliaire","seconde hypotheque","calcul cltv","pret valeur nette"]
};

export const ContentComponent = function HomeEquityContentFR() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculateur de Prêt sur Valeur Domiciliaire
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Calculez les mensualités fixes d'un prêt sur valeur nette, la capacité maximale d'emprunt, le ratio prêt-valeur combiné (CLTV), le TAEG réel, l'amortissement, les économies sur versements anticipés et le ratio d'endettement (DTI).
        </p>
      </div>

      {/* 1. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Qu'est-ce qu'un Calculateur de Prêt sur Valeur Domiciliaire ?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Un calculateur de prêt sur valeur domiciliaire estime le montant empruntable sur l'équité de votre bien et modélise la mensualité fixe d'une seconde hypothèque. Le calcul intègre la valeur marchande du bien, le solde hypothécaire actuel, le plafond CLTV, le taux d'intérêt et les frais de clôture.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Il se distingue de la marge HELOC. Le prêt sur valeur nette est un crédit amortissable à taux fixe avec des paiements réguliers, tandis que la HELOC est une ligne renouvelable à taux variable.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Avis sur le Modèle d'Évaluation</span>
          </div>
          <p>
            Les résultats obtenus constituent des simulations financières mathématiques et ne représentent pas une offre de prêt contractuelle.
          </p>
        </div>
      </section>

      {/* 2. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Comment Utiliser le Calculateur de Prêt sur Valeur Domiciliaire
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Suivez ces étapes pour évaluer précisément votre plan de financement :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. Saisissez la valeur marchande estimée de votre propriété.</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Indiquez le solde restant dû de votre première hypothèque.</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. Choisissez le plafond de CLTV applicable (80 % standard, 85 % ou 90 %).</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. Sélectionnez le Mode A (montant fixe) ou le Mode B (capacité maximale).</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. Entrez le taux d'intérêt annuel fixe et la durée en années (15 ou 30 ans).</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. Indiquez les frais de clôture initiaux estimés.</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. Précisez le traitement des frais (Comptant, Déduit ou Financé).</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. Examinez la mensualité fixe calculée.</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. Vérifiez le capital disponible, le CLTV final et le TAEG réel.</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. Consultez le tableau complet d'amortissement et exportez-le au format CSV.</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. Simulez des versements supplémentaires de capital.</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. Comparez les résultats avec les scénarios HELOC et refinancement.</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. Évaluez le ratio d'endettement DTI et la déductibilité fiscale.</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. Enregistrez votre scénario dans votre historique local.</span>
            </div>
        </div>
      </section>

      {/* 3. CLTV */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Valeur Nette Immobilière et Ratio Prêt-Valeur Combiné (CLTV)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La capacité d'emprunt maximale repose sur le ratio CLTV maximal admissible :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"Dette Totale Maximale = Valeur du Bien × Plafond CLTV"}</div>
          <div>{"Capital Empruntable = Dette Totale Maximale - Solde 1ère Hypothèque"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Exemple : Pour un bien de 500 000 $ avec une hypothèque de 275 000 $ et un CLTV maximal de 80 %, la dette totale autorisée est de 400 000 $. En déduisant 275 000 $, le prêt maximal disponible est de 125 000 $ avec un CLTV post-prêt de 80,0 % et 20,0 % (100 000 $) d'équité protégée.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Ce calcul assure une marge de sécurité financière adéquate face aux évolutions du marché.
        </p>
      </section>

      {/* 4. MODE A VS B */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Mode A vs Mode B : Montant Déterminé ou Capacité Maximale
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Deux modes de calcul vous permettent d'analyser vos besoins :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">Mode A — Montant Spécifique Souhaité</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">Permet de spécifier un montant exact (ex. 125 000 $) pour des rénovations ou une consolidation de dettes et d'en déduire la mensualité exacte.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">Mode B — Capacité Maximale selon CLTV</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">Calcule le montant maximal finançable jusqu'à la limite de CLTV autorisée par le prêteur.</p>
          </div>
        </div>
      </section>

      {/* 5. FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Formule de la Mensualité Fixe
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La mensualité fixe (M) est déterminée par la formule mathématique des annuités constantes :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"M = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          M = P × [r(1+r)^n] / [(1+r)^n - 1], où P est le principal, r le taux d'intérêt mensuel et n le nombre de mensualités. Pour 125 000 $ à 8,50 % sur 15 ans (180 mois), la mensualité s'établit exactement à 1 230,94 $.
        </p>
      </section>

      {/* 6. ZERO INTEREST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Fonctionnement du Moteur à Taux Zéro
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Lors d'offres promotionnelles à 0 % d'intérêt, le calcul s'effectue par division linéaire simple : M = P / n.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Pour 125 000 $ sur 15 ans à 0 %, la mensualité est de 694,44 $ par mois sans aucun frais d'intérêt.
        </p>
      </section>

      {/* 7. AMORTIZATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Tableau d'Amortissement de la Seconde Hypothèque
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          L'amortissement détaille mois par mois la part du paiement allouée aux intérêts et au remboursement du capital.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• {"Beginning Balance / Saldo Inicial"}: $125,000</div>
          <div>• {"Annual Payment / Pago Anual"}: $14,335</div>
          <div>• {"Principal Paid / Capital"}: $4,497</div>
          <div>• {"Interest Paid / Intereses"}: $9,837</div>
          <div>• {"Ending Balance / Saldo Final"}: $120,503</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Au premier mois d'un prêt de 125 000 $ à 8,50 %, sur la mensualité de 1 230,94 $, 885,42 $ couvrent les intérêts et 345,52 $ réduisent le capital à 124 654,48 $.
        </p>
      </section>

      {/* 8. APR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. TAEG Réel et Frais de Clôture
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Le Taux Annuel Effectif Global (TAEG) incorpore l'ensemble des frais de clôture initiaux pour refléter le coût financier réel.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• {"Financed Loan"}: $125,000 | {"Nominal Rate"}: 8.0% | {"Term"}: 15 Years</div>
          <div>• {"Closing Costs"}: $2,500</div>
          <div>• {"Displayed True APR"}: <strong>8.10% / 8.82%</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Pour 125 000 $ à 8,50 % avec 2 500 $ de frais payés comptant, le TAEG réel s'établit à 8,82 %.
        </p>
      </section>

      {/* 9. CLOSING COSTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Modes de Traitement des Frais de Clôture
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Le calculateur prend en charge trois modes de règlement des frais :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Paid Upfront in Cash"}</div>
            <p className="text-slate-600 dark:text-slate-400">1. Payé Comptant : Réglé le jour de la signature sans impacter le montant emprunté. 2. Déduit du Montant : Le capital reste de 125 000 $ mais vous recevez 122 500 $ net. 3. Financé : Le solde emprunté augmente à 127 500 $, portant la mensualité à 1 255,56 $.</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Deducted from Proceeds"}</div>
            <p className="text-slate-600 dark:text-slate-400">Ce comparatif facilite le choix de la solution la plus économique selon vos liquidités.</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Financed into Loan"}</div>
            <p className="text-slate-600 dark:text-slate-400">1. Payé Comptant : Réglé le jour de la signature sans impacter le montant emprunté. 2. Déduit du Montant : Le capital reste de 125 000 $ mais vous recevez 122 500 $ net. 3. Financé : Le solde emprunté augmente à 127 500 $, portant la mensualité à 1 255,56 $.</p>
          </div>
        </div>
      </section>

      {/* 10. DTI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Ratio d'Endettement (DTI) et Éligibilité
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Le ratio d'endettement global (DTI) mesure votre capacité à supporter les mensualités :
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"DTI % = [(Housing Payments + Other Debts) / Gross Income] × 100"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          DTI Global = (Charges Hypothécaires Totales + Dettes Mensuelles) / Revenus Bruts Mensuels. Un ratio inférieur à 36 % est idéal, tandis qu'entre 43 % et 50 % nécessite des critères compensatoires.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Avec 8 500 $ de revenus, 1 850 $ de première hypothèque et 500 $ de dettes diverses, la nouvelle mensualité de 1 230,94 $ porte le DTI à 42,1 %, conforme aux critères de souscription habituels.
        </p>
      </section>

      {/* 11. CREDIT TIERS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Score de Crédit et Paliers de CLTV
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Votre cote de crédit conditionne le ratio CLTV maximal et les conditions tarifaires :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Un score supérieur à 740 permet un CLTV jusqu'à 85 %–90 % aux meilleurs taux, entre 680 et 739 autorise 80 %–85 %, et entre 620 et 679 plafonne généralement à 80 %.
        </p>
      </section>

      {/* 12. HELOAN VS HELOC */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. Prêt sur Valeur Nette vs Marge HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Le prêt sur valeur nette offre la sécurité d'un taux fixe et de mensualités constantes tout au long de la durée.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Fixed Second Mortgage: $717 - $1,231/mo</div>
          <div>• HELOC (Interest-Only Draw): $578/mo</div>
          <div>• Cash-Out Refinance: $2,296/mo</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La HELOC permet des tirages échelonnés à taux variable mais expose l'emprunteur aux hausses de taux et au choc de paiement lors du passage en phase de remboursement.
        </p>
      </section>

      {/* 13. HELOAN VS CASH OUT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Prêt sur Valeur Nette vs Refinancement avec Retrait d'Équité
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Le prêt sur valeur nette permet de conserver intact le taux avantageux de votre première hypothèque.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Le refinancement global remplace la totalité de votre dette au taux actuel du marché, ce qui peut s'avérer très coûteux si votre taux d'origine était faible.
        </p>
      </section>

      {/* 14. EXTRA PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Versements Anticipés et Économies d'Intérêts
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Effectuer des remboursements anticipés réguliers accélère le désendettement et génère des économies substantielles.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Extra Monthly Payment: $100 - $150/month</div>
          <div>• Accelerated Term: 146 - 156 months</div>
          <div>• Time Saved: 24 - 34 months shaved off</div>
          <div>• Lifetime Interest Saved: $16,400 - $19,341</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Sur un prêt de 125 000 $ à 8,50 %, un versement supplémentaire de 100 $ par mois réduit la durée de 24 mois et fait économiser plus de 16 400 $ d'intérêts.
        </p>
      </section>

      {/* 15. IRS TAX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. Déductibilité Fiscale des Intérêts (Règles Fiscales)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Selon la réglementation fiscale en vigueur, les intérêts ne sont déductibles que si les fonds sont alloués à l'acquisition, la construction ou l'amélioration substantielle de la résidence principale.
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"Tax Savings = Deductible Interest × Marginal Tax Rate"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Si les fonds servent à consolider des dettes de consommation ou financer des dépenses personnelles, les intérêts ne sont pas déductibles.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Pour un contribuable dans la tranche marginale de 24 % avec 9 800 $ d'intérêts déductibles en première année, l'économie fiscale estimée s'élève à 2 352 $.
        </p>
      </section>

      {/* 16. RENOVATION ROI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          16. Estimation de la Plus-Value Immobilière par Rénovation
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Les travaux de rénovation bien ciblés augmentent la valeur vénale du bien et reconstituent votre patrimoine net.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Project Cost: $50,000 @ 70% ROI</div>
          <div>• Value Added: $35,000 ($50,000 × 70%)</div>
          <div>• Projected Post-Remodel Value: $535,000</div>
          <div>• Resulting Net Home Equity: $210,000</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Une rénovation de 50 000 $ offrant un retour sur investissement estimé à 70 % ajoute 35 000 $ à la valeur du logement.
        </p>
      </section>

      {/* 17. RISKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. Risques Associés au Prêt sur Valeur Nette
        </h2>
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Security Warning & Foreclosure Risk</span>
          </div>
          <p>Le bien immobilier servant de garantie, un défaut de paiement prolongé peut mener à une saisie hypothécaire.</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Il convient d'évaluer rigoureusement votre trésorerie pour honorer conjointement la première et la seconde hypothèque ainsi que les taxes foncières.
        </p>
      </section>

      {/* 18. UNDERWATER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          18. Scénarios d'Équité Négative
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          En cas de repli du marché immobilier, si le cumul des dettes dépasse la valeur de la maison, le bien entre en équité négative. Les mensualités restent dues, mais toute vente exigera de combler la différence en liquidités.
        </p>
      </section>

      {/* 19. PREPAYMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          19. Pénalités de Remboursement Anticipé
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La majorité des contrats de seconde hypothèque n'appliquent pas de pénalités pour remboursement anticipé, mais il est toujours recommandé de vérifier les clauses spécifiques de votre offre.
        </p>
      </section>

      {/* 20. TIMELINES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          20. Frais de Clôture et Délais de Versement
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Les frais de clôture oscillent entre 2 % et 5 % du capital emprunté (1 500 $ à 4 000 $). Le délai moyen de traitement et de décaissement s'étend de 2 à 6 semaines.
        </p>
      </section>

      {/* 21. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          21. Erreurs Fréquentes à Éviter
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Confondre la valeur nette totale et la capacité réelle d'emprunt (les prêteurs exigent une réserve d'équité de 15 % à 20 %).</li>
            <li>Oublier de déduire le solde de la première hypothèque lors de l'estimation de l'équité accessible.</li>
            <li>Supposer qu'un plafond de CLTV de 80 % est uniformément appliqué par tous les établissements.</li>
            <li>Penser qu'un bon score de crédit garantit l'approbation sans vérification du ratio DTI.</li>
            <li>Comparer les mensualités sans intégrer l'impact du changement de taux de la première hypothèque.</li>
            <li>Négliger les frais de clôture dans le calcul du coût effectif global (TAEG).</li>
            <li>Croire que tous les intérêts sont déductibles sans justificatif de rénovation immobilière.</li>
            <li>Supposer que chaque euro investi en travaux se traduit par un euro équivalent d'augmentation de valeur vénale.</li>
            <li>S'endetter sans conserver un fonds de prévoyance en cas de baisse de revenus.</li>
            <li>Prendre des engagements sans réaliser une simulation financière préalable.</li>
          </ul>
        </div>
      </section>

      {/* 22. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          22. Synthèse des Formules Mathématiques
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Dette Totale Maximale :</strong>  Valeur du Bien × Plafond CLTV</div>
          <div>• <strong>Capital Empruntable :</strong>  max(0, Dette Totale Maximale - Solde 1ère Hypothèque)</div>
          <div>• <strong>CLTV Post-Prêt :</strong>  (Solde 1ère Hypothèque + Solde 2nde Hypothèque) / Valeur du Bien × 100</div>
          <div>• <strong>Équité Protégée :</strong>  100 % - CLTV Post-Prêt</div>
          <div>• <strong>Mensualité Fixe :</strong>  P × [r(1+r)^n] / [(1+r)^n - 1]</div>
          <div>• <strong>Ratio DTI Post-Prêt :</strong>  (Charges Logement + Dettes Mensuelles) / Revenus Bruts × 100</div>
          <div>• <strong>Économie Fiscale Estimée :</strong>  Intérêts Déductibles Annuels × Taux Marginal d'Imposition</div>
        </div>
      </section>

      {/* 23. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Orientation Pédagogique et Avis Réglementaire</span>
        </div>
        <p>
          Les prêts sur valeur nette immobilière sont encadrés par les lois sur la transparence du crédit (TILA/RESPA) et les réglementations fiscales. Cette calculatrice fournit des simulations indicatives à visée éducative.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "fr",
  calculatorSlug: "home-equity-loan-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
