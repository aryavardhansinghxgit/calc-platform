"use client";

import React from "react";
import Link from "next/link";
import { CalculatorFAQ } from "@/calculators/types";

export const FRENCH_FUEL_COST_SEO = {
  title: "Calculateur de Coût du Carburant — Trajets, Déplacements et Économies VE",
  description:
    "Calculez avec précision le coût du carburant pour vos trajets routiers, déplacements domicile-travail, consommation en MPG et L/100km, comparaison avec véhicules électriques et émissions de CO₂.",
  keywords: [
    "calculateur de cout de carburant",
    "calcul cout essence voyage",
    "calculer consommation essence",
    "cout carburant au kilometre",
    "economie vehicule electrique essence",
    "budget essence trajet travail",
  ],
};

export const FRENCH_FUEL_COST_FAQS: CalculatorFAQ[] = [
  {
    question: "Comment calculer le coût du carburant pour un trajet ?",
    answer:
      "Divisez la distance totale du trajet par le rendement du véhicule (MPG ou km/L) pour obtenir le volume de carburant nécessaire, puis multipliez-le par le prix unitaire du carburant.",
  },
  {
    question: "Combien de carburant faut-il pour 300 miles à 25 MPG ?",
    answer:
      "Il vous faut exactement : 300 ÷ 25 = 12 gallons. À un prix de 3,50 $ par gallon, le coût total de carburant est de 42,00 $.",
  },
  {
    question: "Comment calculer le coût du carburant pour un trajet aller-retour ?",
    answer:
      "Multipliez la distance aller par deux avant de diviser par le rendement. Pour 300 miles aller : 600 ÷ 25 = 24 gallons. À 3,50 $/gallon, la dépense est de 84,00 $.",
  },
  {
    question: "Comment calculer la dépense mensuelle de carburant domicile-travail ?",
    answer:
      "Calculez votre consommation journalière de carburant, multipliez-la par le prix au gallon puis par le nombre de jours ouvrés par mois. Pour 300 miles/jour à 25 MPG et 3,50 $/gallon : 42 $/jour × 22 jours = 924,00 $ par mois.",
  },
  {
    question: "Comment calculer le MPG réel à partir du compteur kilométrique ?",
    answer:
      "Soustrayez le relevé initial du relevé final et divisez la distance parcourue par les gallons ravitaillés : MPG = (Compteur Final − Compteur Initial) ÷ Gallons Ravitaillés. Exemple : de 10 000 à 10 350 miles avec 14 gallons donne 25,00 MPG.",
  },
  {
    question: "Quelle est la différence entre MPG et L/100km ?",
    answer:
      "Le MPG exprime la distance parcourue par unité de volume (plus la valeur est élevée, plus le véhicule est sobre), tandis que le L/100km mesure les litres consommés pour 100 kilomètres (plus la valeur est basse, plus le véhicule est sobre).",
  },
  {
    question: "Comment convertir 25 MPG en L/100km ?",
    answer:
      "Pour le MPG américain : 235,214583 ÷ 25 ≈ 9,41 L/100km. La constante de conversion est différente pour les gallons impériaux (282,481) car le gallon britannique est plus grand (4,546 L contre 3,785 L).",
  },
  {
    question: "Quelle est la différence entre un gallon américain et un gallon impérial ?",
    answer:
      "Un gallon américain équivaut à 3,785412 litres, alors qu'un gallon impérial (Royaume-Uni) équivaut à 4,54609 litres. Par conséquent, une même valeur numérique de MPG représente des consommations physiques distinctes.",
  },
  {
    question: "Conduire plus vite augmente-t-il la consommation de carburant ?",
    answer:
      "Oui. La traînée aérodynamique augmente avec le carré de la vitesse (v²), tandis que la puissance requise pour vaincre cette résistance augmente de façon cubique (v³).",
  },
  {
    question: "La climatisation augmente-t-elle la consommation d'essence ?",
    answer:
      "Oui, elle sollicite le moteur par l'entraînement du compresseur. L'impact varie selon la température extérieure, la vitesse et le volume de l'habitacle.",
  },
  {
    question: "Le poids supplémentaire augmente-t-il la dépense de carburant ?",
    answer:
      "Oui. Une masse accrue exige plus d'énergie pour accélérer, particulièrement en cycle urbain avec des arrêts et démarrages fréquents.",
  },
  {
    question: "Une faible pression des pneus augmente-t-elle la consommation ?",
    answer:
      "Des pneus sous-gonflés augmentent la résistance au roulement et accroissent la consommation. Il est conseillé de toujours maintenir la pression à froid préconisée.",
  },
  {
    question: "Combien peut-on économiser en faisant du covoiturage ?",
    answer:
      "Si le coût total du trajet est de 42,00 $, un partage équitable entre 4 passagers réduit le coût individuel à 10,50 $ par personne.",
  },
  {
    question: "Un véhicule électrique (VE) est-il toujours plus économique qu'un véhicule thermique ?",
    answer:
      "Pas nécessairement. Cela dépend du prix local du kWh, du prix de l'essence, du rendement du VE (kWh/100mi), de celui du véhicule thermique (MPG) et du mode de recharge (domicile vs recharge rapide).",
  },
  {
    question: "Comment se calcule le coût de recharge d'un VE pour un trajet ?",
    answer:
      "Pour un VE consommant kWh/100 miles : Énergie Totale = (Distance ÷ 100) × kWh/100mi. Ensuite : Coût = Énergie Totale × Tarif Électrique ($/kWh).",
  },
  {
    question: "Que se passe-t-il si le coût du VE dépasse celui de l'essence ?",
    answer:
      "Le résultat s'affiche sous forme de 'Prime VE' (surcoût) plutôt que d'économie négative. Si l'essence coûte 42 $ et la recharge 72 $, la prime VE est de 30 $ par trajet.",
  },
  {
    question: "Comment sont calculées les émissions de CO₂ de l'essence ?",
    answer:
      "Nous appliquons le facteur d'émission direct officiel de l'EPA de 8,887 kg de CO₂ par gallon d'essence (soit 2,348 kg de CO₂ par litre).",
  },
  {
    question: "Ces valeurs de CO₂ incluent-elles le cycle de vie complet du carburant ?",
    answer:
      "Non. Cette valeur correspond strictement aux émissions directes d'échappement issues de la combustion. Elle n'inclut pas l'extraction ni le raffinage.",
  },
  {
    question: "Pourquoi ma dépense réelle peut-elle différer du calcul ?",
    answer:
      "Des facteurs dynamiques tels que le trafic, le vent de face, le dénivelé, le style de conduite et les variations de prix aux stations influencent le coût réel.",
  },
  {
    question: "Le calculateur inclut-il le coût total de possession du véhicule ?",
    answer:
      "Non. Cet outil se concentre sur le carburant et les frais directs de trajet (péages et stationnement). Il n'intègre pas la dépréciation, l'assurance ni l'entretien.",
  },
];

export function FrenchFuelCostContent() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans leading-relaxed text-slate-800 dark:text-slate-200">
      {/* Related Calculators */}
      <section className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-4 text-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Calculateurs Associés
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/fr/calculators/gas-mileage-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Calculateur de Consommation d'Essence</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
          </Link>
          <Link
            href="/fr/calculators/mileage-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Calculateur de Kilométrage</span>
          </Link>
        </div>
      </section>

      {/* Main Educational Article */}
      <article className="space-y-6 text-sm text-slate-700 dark:text-slate-300">
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            1. Qu'est-ce qu'un Calculateur de Coût du Carburant ?
          </h2>
          <p>
            Un calculateur de coût du carburant permet d'estimer avec rigueur la dépense financière nécessaire pour parcourir une distance donnée avec un véhicule à moteur thermique, hybride ou 100 % électrique. Il relie la distance du trajet, le rendement énergétique du véhicule (en MPG ou en L/100 km) et le prix unitaire du carburant à la pompe ou de l'électricité au kilowatt-heure (kWh).
          </p>
          <p>
            Cet outil est indispensable pour budgétiser les trajets quotidiens domicile-travail, planifier les vacances sur route, répartir équitablement les frais de covoiturage et évaluer la rentabilité d'une transition vers un véhicule électrique.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            2. Méthodologie et Formule de Calcul du Carburant
          </h2>
          <p>
            Pour un trajet simple avec un véhicule thermique, le calcul fondamental repose sur deux étapes successives :
          </p>
          <div className="bg-slate-100 dark:bg-slate-800/80 p-4 rounded-xl font-mono text-xs text-slate-900 dark:text-slate-100 space-y-1">
            <p>1. Volume de Carburant (gallons) = Distance (miles) ÷ Rendement (MPG)</p>
            <p>2. Coût Total du Trajet ($) = Volume de Carburant (gallons) × Prix du Carburant ($/gallon)</p>
          </div>
          <p>
            Pour un trajet de 300 miles avec un véhicule affichant 25 MPG et un carburant à 3,50 $ le gallon, le volume consommé est exactement de 12 gallons, ce qui représente un coût direct de carburant de 42,00 $.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            3. Conversion entre Unités Américaines et Métriques (MPG vs L/100km)
          </h2>
          <p>
            En Amérique du Nord, le rendement s'exprime couramment en miles par gallon (MPG), où une valeur plus élevée traduit une meilleure sobriété. En Europe et dans les pays utilisant le système métrique, la norme est le litre aux 100 kilomètres (L/100 km), où une valeur plus basse indique une meilleure efficacité.
          </p>
          <p>
            La formule de conversion exacte entre MPG US et L/100 km est :
          </p>
          <div className="bg-slate-100 dark:bg-slate-800/80 p-4 rounded-xl font-mono text-xs text-slate-900 dark:text-slate-100">
            <p>L/100 km = 235.214583 ÷ MPG (US)</p>
          </div>
          <p>
            Ainsi, un véhicule consommant 25 MPG consomme environ 9,41 L/100 km.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            4. Comparaison Électrique vs Essence et Émissions de CO₂
          </h2>
          <p>
            Le calculateur intègre l'estimation des coûts de recharge pour véhicules électriques en multipliant la consommation (kWh/100 mi) par le tarif d'électricité local ($/kWh). Il calcule également les émissions directes d'échappement sur la base du facteur EPA de 8,887 kg de CO₂ par gallon d'essence.
          </p>
        </section>
      </article>

      {/* FAQ Section */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Foire Aux Questions — Coût du Carburant
        </h2>
        <div className="space-y-3">
          {FRENCH_FUEL_COST_FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1.5"
            >
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                {faq.question}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
