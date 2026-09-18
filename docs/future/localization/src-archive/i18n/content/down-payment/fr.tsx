"use client";

import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "Combien devrais-je verser comme mise de fonds ?",
    "answer": "Cela dépend de votre épargne et du type de prêt; la majorité des acheteurs versent entre 3 % et 20 % du prix d'achat."
  },
  {
    "question": "La mise de fonds de 20 % est-elle obligatoire ?",
    "answer": "Non, la plupart des programmes conventionnels et gouvernementaux autorisent des apports dès 0 % à 5 %."
  },
  {
    "question": "Comment la mise de fonds influence-t-elle la mensualité ?",
    "answer": "Un apport supérieur réduit le capital emprunté, les intérêts totaux et supprime l'assurance hypothécaire (PMI)."
  },
  {
    "question": "Qu'est-ce que l'assurance hypothécaire privée (PMI) ?",
    "answer": "Avec un apport inférieur à 20 %, une prime d'assurance est exigée pour protéger le prêteur en cas de défaut."
  },
  {
    "question": "Quels liquidités faut-il prévoir pour les frais de clôture ?",
    "answer": "Il faut prévoir entre 2 % et 5 % supplémentaires du prix du bien pour les frais de notaire et d'enregistrement."
  },
  {
    "question": "Peut-on acheter sans mise de fonds (0 %) ?",
    "answer": "Oui, grâce à des programmes spécifiques comme les prêts VA (militaires/vétérans) ou USDA (zones rurales)."
  },
  {
    "question": "Quelle différence entre 3 %, 5 %, 10 % ou 20 % d'apport ?",
    "answer": "Moins d'apport signifie des mensualités plus élevées, mais préserve des liquidités pour d'autres investissements."
  },
  {
    "question": "Vaut-il mieux augmenter l'apport ou investir son épargne ?",
    "answer": "Comparez le taux hypothécaire net au rendement espéré sur vos placements diversifiés."
  },
  {
    "question": "Comment est calculée l'assurance PMI et quand s'annule-t-elle ?",
    "answer": "Elle coûte 0.3 % à 1.5 % par an et s'annule sur demande à 80 % de LTV ou automatiquement à 78 % de LTV."
  },
  {
    "question": "Qu'est-ce que le ratio prêt-valeur (LTV) ?",
    "answer": "C'est le montant emprunté divisé par la valeur marchande du bien exprimé en pourcentage."
  },
  {
    "question": "Peut-on utiliser des dons familiaux pour la mise de fonds ?",
    "answer": "Oui, la majorité des programmes acceptent les dons familiaux accompagnés d'une attestation formelle."
  },
  {
    "question": "Combien de temps faut-il pour épargner la mise de fonds ?",
    "answer": "Cela dépend de vos revenus nets, de votre taux d'épargne mensuel et du prix cible de la propriété."
  }
];

export const seo = {
  title: "Calculateur de Mise de Fonds (Apport Personnel) — Conventionnel 97",
  description: "Calculez la mise de fonds requise, comparez les mensualités avec 3%, 5%, 10% et 20%, l'annulation de l'assurance PMI et les frais de clôture.",
  keywords: ["calculateur mise de fonds","apport personnel hypotheque","calcul assurance pmi","montant apport immobilier"]
};

export const ContentComponent = function DownPaymentContentFR() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* H1 Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculateur de Mise de Fonds (Apport Personnel)
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Guide exhaustif pour calculer votre mise de fonds immobilière, les exigences minimales par programme, la suppression du PMI à 78 % de LTV et les liquidités requises.
        </p>
      </div>

      {/* SECTION 1: WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Qu'est-ce qu'une Mise de Fonds et Comment Fonctionne-t-elle ?
        </h2>
        <p className="text-sm leading-relaxed">
          La mise de fonds (apport personnel) est la somme en espèces versée par l'acheteur lors de l'acquisition d'un bien immobilier. Le solde restant est financé par un prêt hypothécaire garanti par le bien. L'apport détermine directement le ratio prêt-valeur (LTV) et le coût des mensualités.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans text-center">Formules Fondamentales de la Mise de Fonds</div>
          
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 space-y-2">
            <div><strong>1. Montant de la Mise de Fonds ($) :</strong></div>
            <div className="text-center font-mono">{"Mise de Fonds = Prix d'Achat (P) × (% Apport / 100)"}</div>
            
            <div className="pt-2"><strong>2. Capital Emprunté Financé ($) :</strong></div>
            <div className="text-center font-mono">{"Montant du Prêt = Prix d'Achat - Mise de Fonds"}</div>

            <div className="pt-2"><strong>3. Liquidités Totales Nécessaires à la Clôture ($) :</strong></div>
            <div className="text-center font-mono">{"Liquidités Requises = Mise de Fonds + Frais de Clôture (2 % - 5 %)"}</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW MUCH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Quelle Mise de Fonds Vous Faut-il Réellement ?
        </h2>
        <p className="text-sm leading-relaxed">
          Le pourcentage minimum requis dépend du programme de crédit hypothécaire sélectionné :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">0 % de Mise de Fonds</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Accessible via les programmes garantis par l'État tels que les prêts VA (vétérans et militaires) et les prêts USDA (zones rurales éligibles).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">3 % – 3.5 % de Mise de Fonds</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Les programmes Conventionnels 97 requièrent 3 % pour les premiers acheteurs (score 620+). Les prêts FHA exigent 3.5 % (score 580+).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">20 % de Mise de Fonds</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Le seuil standard permettant de supprimer l'assurance hypothécaire privée (PMI) et de minimiser le coût global des intérêts.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: 20% MYTH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Le Mythe des 20 % d'Apport face à la Réalité
        </h2>
        <p className="text-sm leading-relaxed">
          Un apport de 20 % élimine le PMI, mais attendre plusieurs années pour l'épargner peut comporter des coûts d'opportunité majeurs :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <h3 className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">Avantages d'un Apport de 20 %</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Économie immédiate de 100 $ à 300 $/mois en supprimant l'assurance PMI.</li>
              <li>Mensualités de capital et d'intérêts nettement plus faibles.</li>
              <li>Coût cumulé d'intérêts réduit sur la durée totale du financement.</li>
              <li>Offre d'achat plus solide et attractive pour les vendeurs.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h3 className="font-extrabold text-amber-700 dark:text-amber-400 text-sm">Inconvénients et Coûts d'Opportunité</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Épuisement des réserves de liquidités et du fonds de sécurité familiale.</li>
              <li>Retarder l'achat expose aux augmentations des prix immobiliers.</li>
              <li>Coût d'opportunité d'immobiliser un capital qui pourrait être investi sur d'autres marchés.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Comparatif des Programmes Hypothécaires et Apports Minimaux
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Programme de Prêt</th>
                <th className="p-3">Mise de Fonds Min %</th>
                <th className="p-3">Score Min</th>
                <th className="p-3">Règles d'Assurance PMI</th>
                <th className="p-3 rounded-tr-xl">Frais Initiaux</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Conventionnel 97"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"3.0%"}</td>
                <td className="p-3">{"620"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"S'annule à 78 %–80 % LTV"}</td>
                <td className="p-3 text-amber-600">{"0 $"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"Prêt FHA"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"3.5%"}</td>
                <td className="p-3">{"580"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"Durée totale du prêt (<10 % apport)"}</td>
                <td className="p-3 text-amber-600">{"1.75 % UFMIP"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Prêt VA (Militaires)"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"0.0%"}</td>
                <td className="p-3">{"580+"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0 $ de PMI Mensuel"}</td>
                <td className="p-3 text-amber-600">{"1.4 %–2.15 % Droits de Financement"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"USDA Rural"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"0.0%"}</td>
                <td className="p-3">{"640"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0.35 % Garantie Annuelle"}</td>
                <td className="p-3 text-amber-600">{"1.0 % Frais de Garantie"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: PMI REMOVAL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Assurance Hypothécaire Privée (PMI) et Suppression (80 % vs 78 % LTV)
        </h2>
        <p className="text-sm leading-relaxed">
          La loi fédérale (Homeowners Protection Act de 1998) encadre la résiliation obligatoire du PMI :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Annulation sur Demande à 80 % LTV</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Dès que le solde de votre prêt atteint 80 % du prix d'achat initial, vous avez le droit légal de demander la résiliation écrite du PMI.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Résiliation Automatique Obligatoire à 78 % LTV</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Le prêteur est légalement tenu d'annuler automatiquement le PMI dès que le solde atteint 78 % de la valeur initiale selon le tableau d'amortissement.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: ASSISTANCE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Programmes d'Aide à la Mise de Fonds (DPA)
        </h2>
        <p className="text-sm leading-relaxed">
          De nombreuses aides publiques soutiennent les acheteurs qualifiés :
        </p>
        <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
          <li>Subventions directes (Grants) : Fonds sans obligation de remboursement.</li>
          <li>Prêts secondaires remboursables sous conditions : Prêts à 0 % annulés après 3 à 5 ans de résidence.</li>
          <li>Prêts à remboursement différé : Prêts à 0 % remboursés lors de la revente du bien.</li>
        </ul>
      </section>

      {/* SECTION 7: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          7. Synthèse Pédagogique
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Maîtriser les critères d'apport, les seuils de fin de PMI et les frais annexes permet de définir une stratégie d'achat performante et équilibrée.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "fr",
  calculatorSlug: "down-payment-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
