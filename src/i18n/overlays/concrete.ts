import { Locale } from "../types";

export interface ConcreteLocaleOverlay {
  locale: Locale;
  tabSlab: string;
  tabColumn: string;
  tabTube: string;
  tabCurb: string;
  tabStairs: string;
  lengthLabel: string;
  widthLabel: string;
  heightLabel: string;
  diameterLabel: string;
  thicknessLabel: string;
  quantityLabel: string;
  wastageLabel: string;
  calculateBtn: string;
  resetBtn: string;
  copyBtn: string;
  copiedBtn: string;
  saveBtn: string;
  volumeLabel: string;
  cubicYardsLabel: string;
  cubicFeetLabel: string;
  cubicMetersLabel: string;
  bags60Label: string;
  bags80Label: string;
  estimatedCostLabel: string;
}

export const CONCRETE_OVERLAYS: Record<Locale, ConcreteLocaleOverlay> = {
  en: {
    locale: "en",
    tabSlab: "Slab / Square Footing",
    tabColumn: "Round Column / Sonotube",
    tabTube: "Hollow Cylinder / Pipe",
    tabCurb: "Curb & Gutter Barrier",
    tabStairs: "Concrete Staircase",
    lengthLabel: "Length",
    widthLabel: "Width",
    heightLabel: "Depth / Thickness",
    diameterLabel: "Diameter",
    thicknessLabel: "Wall Thickness",
    quantityLabel: "Quantity / Units",
    wastageLabel: "Wastage Allowance (%)",
    calculateBtn: "Calculate Concrete Volume",
    resetBtn: "Reset Defaults",
    copyBtn: "Copy Results",
    copiedBtn: "Copied!",
    saveBtn: "Save Estimate",
    volumeLabel: "Total Concrete Volume",
    cubicYardsLabel: "Cubic Yards (yd³)",
    cubicFeetLabel: "Cubic Feet (ft³)",
    cubicMetersLabel: "Cubic Meters (m³)",
    bags60Label: "60 lb Bags Needed",
    bags80Label: "80 lb Bags Needed",
    estimatedCostLabel: "Estimated Material Cost",
  },

  es: {
    locale: "es",
    tabSlab: "Losa / Zapata Cuadrada",
    tabColumn: "Columna Redonda / Tubo",
    tabTube: "Cilindro Hueco / Tubo",
    tabCurb: "Bordillo y Cuneta",
    tabStairs: "Escalera de Hormigón",
    lengthLabel: "Longitud",
    widthLabel: "Anchura",
    heightLabel: "Espesor / Profundidad",
    diameterLabel: "Diámetro",
    thicknessLabel: "Espesor de Pared",
    quantityLabel: "Cantidad / Unidades",
    wastageLabel: "Margen de Desperdicio (%)",
    calculateBtn: "Calcular Volumen de Hormigón",
    resetBtn: "Restablecer",
    copyBtn: "Copiar Resultados",
    copiedBtn: "¡Copiado!",
    saveBtn: "Guardar Presupuesto",
    volumeLabel: "Volumen Total de Hormigón",
    cubicYardsLabel: "Yardas Cúbicas (yd³)",
    cubicFeetLabel: "Pies Cúbicos (ft³)",
    cubicMetersLabel: "Metros Cúbicos (m³)",
    bags60Label: "Sacos de 60 lb Requeridos",
    bags80Label: "Sacos de 80 lb Requeridos",
    estimatedCostLabel: "Coste Estimado de Material",
  },

  fr: {
    locale: "fr",
    tabSlab: "Dalle / Semelle Carrée",
    tabColumn: "Colonne Ronde / Poteau",
    tabTube: "Tube Creux / Cylindre",
    tabCurb: "Bordure et Caniveau",
    tabStairs: "Escalier en Béton",
    lengthLabel: "Longueur",
    widthLabel: "Largeur",
    heightLabel: "Épaisseur / Hauteur",
    diameterLabel: "Diamètre",
    thicknessLabel: "Épaisseur de Paroi",
    quantityLabel: "Quantité",
    wastageLabel: "Marge de Perte (%)",
    calculateBtn: "Calculer le Volume de Béton",
    resetBtn: "Réinitialiser",
    copyBtn: "Copier",
    copiedBtn: "Copié !",
    saveBtn: "Enregistrer",
    volumeLabel: "Volume Total de Béton",
    cubicYardsLabel: "Verges Cubes (yd³)",
    cubicFeetLabel: "Pieds Cubes (ft³)",
    cubicMetersLabel: "Mètres Cubes (m³)",
    bags60Label: "Sacs de 60 lb (27 kg)",
    bags80Label: "Sacs de 80 lb (36 kg)",
    estimatedCostLabel: "Coût Estimé des Matériaux",
  },

  de: {
    locale: "de",
    tabSlab: "Betonplatte / Fundament",
    tabColumn: "Rundsäule / Pfeiler",
    tabTube: "Hohlzylinder / Rohr",
    tabCurb: "Bordstein & Rinne",
    tabStairs: "Betontreppe",
    lengthLabel: "Länge",
    widthLabel: "Breite",
    heightLabel: "Dicke / Tiefe",
    diameterLabel: "Durchmesser",
    thicknessLabel: "Wandstärke",
    quantityLabel: "Menge / Anzahl",
    wastageLabel: "Verschnitt / Zuschlag (%)",
    calculateBtn: "Betonvolumen berechnen",
    resetBtn: "Zurücksetzen",
    copyBtn: "Kopieren",
    copiedBtn: "Kopiert!",
    saveBtn: "Speichern",
    volumeLabel: "Gesamtes Betonvolumen",
    cubicYardsLabel: "Kubik-Yards (yd³)",
    cubicFeetLabel: "Kubikfuß (ft³)",
    cubicMetersLabel: "Kubikmeter (m³)",
    bags60Label: "60-lb-Säcke benötigt",
    bags80Label: "80-lb-Säcke benötigt",
    estimatedCostLabel: "Geschätzte Materialkosten",
  },

  hi: {
    locale: "hi",
    tabSlab: "स्लैब / चौकोर नींव",
    tabColumn: "गोल खंभा (Column)",
    tabTube: "खोखला पाइप / सिलेंडर",
    tabCurb: "कर्व एवं गटर",
    tabStairs: "कंक्रीट सीढ़ी",
    lengthLabel: "लंबाई",
    widthLabel: "चौड़ाई",
    heightLabel: "मोटाई / गहराई",
    diameterLabel: "व्यास (Diameter)",
    thicknessLabel: "दीवार की मोटाई",
    quantityLabel: "संख्या / मात्रा",
    wastageLabel: "अतिरिक्त बर्बादी मार्जिन (%)",
    calculateBtn: "कंक्रीट मात्रा की गणना करें",
    resetBtn: "रीसेट करें",
    copyBtn: "परिणाम कॉपी करें",
    copiedBtn: "कॉपी हो गया!",
    saveBtn: "अनुमान सहेजें",
    volumeLabel: "कुल कंक्रीट आयतन (Volume)",
    cubicYardsLabel: "क्यूबिक यार्ड (yd³)",
    cubicFeetLabel: "क्यूबिक फीट (ft³)",
    cubicMetersLabel: "क्यूबिक मीटर (m³)",
    bags60Label: "60 पाउंड की बोरियाँ",
    bags80Label: "80 पाउंड की बोरियाँ",
    estimatedCostLabel: "अनुमानित सामग्री लागत",
  },

  pt: {
    locale: "pt",
    tabSlab: "Laje / Sapata Quadrada",
    tabColumn: "Coluna Redonda / Pilar",
    tabTube: "Cilindro Oco / Tubo",
    tabCurb: "Meio-Fio e Sarjeta",
    tabStairs: "Escada de Concreto",
    lengthLabel: "Comprimento",
    widthLabel: "Largura",
    heightLabel: "Espessura / Profundidade",
    diameterLabel: "Diâmetro",
    thicknessLabel: "Espessura da Parede",
    quantityLabel: "Quantidade",
    wastageLabel: "Margem de Perda (%)",
    calculateBtn: "Calcular Volume de Concreto",
    resetBtn: "Redefinir",
    copyBtn: "Copiar Resultados",
    copiedBtn: "Copiado!",
    saveBtn: "Salvar Orçamento",
    volumeLabel: "Volume Total de Concreto",
    cubicYardsLabel: "Jardas Cúbicas (yd³)",
    cubicFeetLabel: "Pés Cúbicos (ft³)",
    cubicMetersLabel: "Metros Cúbicos (m³)",
    bags60Label: "Sacos de 60 lb Necessários",
    bags80Label: "Sacos de 80 lb Necessários",
    estimatedCostLabel: "Custo Estimado de Materiais",
  },
};

export function getConcreteOverlay(locale: string): ConcreteLocaleOverlay {
  return CONCRETE_OVERLAYS[locale as Locale] || CONCRETE_OVERLAYS.en;
}
