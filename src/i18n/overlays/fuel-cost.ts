import { Locale } from "../types";

export interface FuelCostLocaleOverlay {
  locale: Locale;
  title: string;
  description: string;
  inputs: {
    distance: { label: string; unit?: string; description?: string; placeholder?: string };
    efficiency: { label: string; unit?: string; description?: string; placeholder?: string };
    fuelPrice: { label: string; unit?: string; description?: string; placeholder?: string };
  };
  outputs: {
    totalCost: { label: string; description?: string; unit?: string };
  };
  labels: {
    inputsTitle: string;
    realtimeBadge: string;
    summaryTitle: string;
    saveBtn: string;
    savedBtn: string;
    copyBtn: string;
    copiedBtn: string;
    savedListTitle: string;
    clearBtn: string;
    relatedTitle: string;
  };
}

export const FUEL_COST_OVERLAYS: Record<Locale, FuelCostLocaleOverlay> = {
  en: {
    locale: "en",
    title: "Fuel Cost Calculator",
    description: "Calculate road-trip fuel cost, commute expenses, MPG, L/100km, EV vs gas savings, tolls, parking, and estimated CO₂ emissions.",
    inputs: {
      distance: { label: "Trip Distance (miles)", unit: "miles", placeholder: "300" },
      efficiency: { label: "Vehicle Efficiency (MPG)", unit: "MPG", placeholder: "25" },
      fuelPrice: { label: "Fuel Price per Gallon ($)", unit: "$", placeholder: "3.50" },
    },
    outputs: {
      totalCost: { label: "Total Trip Expense", description: "Estimated total fuel expense for the trip" },
    },
    labels: {
      inputsTitle: "Inputs",
      realtimeBadge: "Real-time",
      summaryTitle: "Calculated Summary",
      saveBtn: "Save",
      savedBtn: "Saved!",
      copyBtn: "Copy",
      copiedBtn: "Copied!",
      savedListTitle: "Saved Calculations",
      clearBtn: "Clear",
      relatedTitle: "RELATED CALCULATORS:",
    },
  },
  es: {
    locale: "es",
    title: "Calculadora de Costo de Combustible",
    description: "Calcule el gasto de combustible para viajes, traslados diarios, rendimiento en MPG y L/100km, ahorro de vehículos eléctricos vs gasolina y emisiones de CO₂.",
    inputs: {
      distance: { label: "Distancia del Viaje (millas)", unit: "millas", placeholder: "300" },
      efficiency: { label: "Rendimiento del Vehículo (MPG)", unit: "MPG", placeholder: "25" },
      fuelPrice: { label: "Precio del Combustible por Galón ($)", unit: "$", placeholder: "3.50" },
    },
    outputs: {
      totalCost: { label: "Gasto Total del Viaje", description: "Gasto estimado total de combustible para el viaje" },
    },
    labels: {
      inputsTitle: "Entradas",
      realtimeBadge: "Tiempo real",
      summaryTitle: "Resumen Calculado",
      saveBtn: "Guardar",
      savedBtn: "¡Guardado!",
      copyBtn: "Copiar",
      copiedBtn: "¡Copiado!",
      savedListTitle: "Cálculos guardados",
      clearBtn: "Borrar",
      relatedTitle: "CALCULADORAS RELACIONADAS:",
    },
  },
  fr: {
    locale: "fr",
    title: "Calculateur de Coût du Carburant",
    description: "Calculez le coût du carburant pour vos trajets, trajets quotidiens, consommation et émissions de CO₂.",
    inputs: {
      distance: { label: "Distance du trajet (miles)", unit: "miles", placeholder: "300" },
      efficiency: { label: "Consommation du véhicule (MPG)", unit: "MPG", placeholder: "25" },
      fuelPrice: { label: "Prix du carburant par gallon ($)", unit: "$", placeholder: "3.50" },
    },
    outputs: {
      totalCost: { label: "Coût Total du Trajet", description: "Dépense totale estimée en carburant pour le trajet" },
    },
    labels: {
      inputsTitle: "Entrées",
      realtimeBadge: "Temps réel",
      summaryTitle: "Résumé Calculé",
      saveBtn: "Enregistrer",
      savedBtn: "Enregistré !",
      copyBtn: "Copier",
      copiedBtn: "Copié !",
      savedListTitle: "Calculs enregistrés",
      clearBtn: "Effacer",
      relatedTitle: "CALCULATEURS CONNEXES :",
    },
  },
  de: {
    locale: "de",
    title: "Kraftstoffkosten-Rechner",
    description: "Berechnen Sie Fahrtkosten, Pendlerkosten, Kraftstoffeffizienz und CO₂-Emissionen.",
    inputs: {
      distance: { label: "Fahrtstrecke (Meilen)", unit: "Meilen", placeholder: "300" },
      efficiency: { label: "Fahrzeugeffizienz (MPG)", unit: "MPG", placeholder: "25" },
      fuelPrice: { label: "Kraftstoffpreis pro Gallone ($)", unit: "$", placeholder: "3.50" },
    },
    outputs: {
      totalCost: { label: "Gesamte Fahrtkosten", description: "Geschätzte Gesamtausgaben für Kraftstoff" },
    },
    labels: {
      inputsTitle: "Eingaben",
      realtimeBadge: "Echtzeit",
      summaryTitle: "Berechnete Übersicht",
      saveBtn: "Speichern",
      savedBtn: "Gespeichert!",
      copyBtn: "Kopieren",
      copiedBtn: "Kopiert!",
      savedListTitle: "Gespeicherte Berechnungen",
      clearBtn: "Löschen",
      relatedTitle: "VERWANDTE RECHNER:",
    },
  },
  hi: {
    locale: "hi",
    title: "ईंधन लागत कैलकुलेटर (Fuel Cost Calculator)",
    description: "यात्रा ईंधन लागत, दैनिक आवागमन खर्च, माइलेज और CO₂ उत्सर्जन की गणना करें।",
    inputs: {
      distance: { label: "यात्रा दूरी (मील)", unit: "मील", placeholder: "300" },
      efficiency: { label: "वाहन माइलेज (MPG)", unit: "MPG", placeholder: "25" },
      fuelPrice: { label: "प्रति गैलन ईंधन मूल्य ($)", unit: "$", placeholder: "3.50" },
    },
    outputs: {
      totalCost: { label: "कुल यात्रा व्यय", description: "यात्रा के लिए कुल अनुमानित ईंधन व्यय" },
    },
    labels: {
      inputsTitle: "इनपुट",
      realtimeBadge: "रियल-टाइम",
      summaryTitle: "परिकलित सारांश",
      saveBtn: "सहेजें",
      savedBtn: "सहेजा गया!",
      copyBtn: "कॉपी करें",
      copiedBtn: "कॉपी हो गया!",
      savedListTitle: "सहेजी गई गणनाएं",
      clearBtn: "साफ़ करें",
      relatedTitle: "संबंधित कैलकुलेटर:",
    },
  },
  pt: {
    locale: "pt",
    title: "Calculadora de Custo de Combustível",
    description: "Calcule o custo de combustível para viagens, despesas diárias, consumo e emissões de CO₂.",
    inputs: {
      distance: { label: "Distância da Viagem (milhas)", unit: "milhas", placeholder: "300" },
      efficiency: { label: "Eficiência do Veículo (MPG)", unit: "MPG", placeholder: "25" },
      fuelPrice: { label: "Preço do Combustível por Galão ($)", unit: "$", placeholder: "3.50" },
    },
    outputs: {
      totalCost: { label: "Despesa Total da Viagem", description: "Gasto total estimado em combustível para a viagem" },
    },
    labels: {
      inputsTitle: "Entradas",
      realtimeBadge: "Tempo real",
      summaryTitle: "Resumo Calculado",
      saveBtn: "Salvar",
      savedBtn: "Salvo!",
      copyBtn: "Copiar",
      copiedBtn: "Copiado!",
      savedListTitle: "Cálculos Salvos",
      clearBtn: "Limpar",
      relatedTitle: "CALCULADORAS RELACIONADAS:",
    },
  },
};

export function getFuelCostOverlay(locale: string): FuelCostLocaleOverlay {
  return FUEL_COST_OVERLAYS[locale as Locale] || FUEL_COST_OVERLAYS.en;
}
