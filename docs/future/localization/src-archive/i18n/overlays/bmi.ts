import { Locale } from "../types";

export interface BmiLocaleOverlay {
  locale: Locale;
  // Header
  title: string;
  description: string;
  resetBtn: string;

  // Tabs
  tabUsUnits: string;
  tabMetricUnits: string;
  tabOtherUnits: string;

  // Input Labels
  ageLabel: string;
  genderLabel: string;
  maleOption: string;
  femaleOption: string;
  heightLabel: string;
  heightFeetLabel: string;
  heightInchesLabel: string;
  heightCmLabel: string;
  weightLabel: string;
  weightLbsLabel: string;
  weightKgLabel: string;
  calcBtn: string;
  clearBtn: string;
  copyBtn: string;
  copiedBtn: string;
  shareBtn: string;
  printBtn: string;
  saveBtn: string;
  savedBtn: string;

  // Unit Dropdowns
  unitMeters: string;
  unitInches: string;
  unitFeet: string;
  unitKg: string;
  unitLbs: string;

  // Categories
  catUnderweight: string;
  catHealthyWeight: string;
  catOverweight: string;
  catObesityClass1: string;
  catObesityClass2: string;
  catObesityClass3: string;

  // Results & Metrics
  bmiScoreTitle: string;
  healthyWeightSpanLabel: string;
  bmiPrimeLabel: string;
  ponderalIndexLabel: string;
  estimatedBodyFatLabel: string;
  bmrLabel: string;
  tdeeLabel: string;
  screeningNote: string;
  historyTitle: string;
  noHistory: string;
  clearHistoryBtn: string;

  // Gauge & Chart Specific Labels
  cdcAssessment: string;
  measuredBmi: string;
  adultChartTitle: string;
  childChartTitle: string;
  weightSpectrumTitle: string;
  weightAxis: string;
  heightAxis: string;
  ageAxis: string;
  bmiAxis: string;
}

export const BMI_OVERLAYS: Record<Locale, BmiLocaleOverlay> = {
  en: {
    locale: "en",
    title: "BMI Calculator – Body Mass Index & Health Screening",
    description: "Calculate BMI and related body-composition estimates using standard anthropometric formulas and age-appropriate reference ranges.",
    resetBtn: "Reset Defaults",

    tabUsUnits: "US Units",
    tabMetricUnits: "Metric Units",
    tabOtherUnits: "Other Units",
    ageLabel: "Age (2–120)",
    genderLabel: "Biological Sex",
    maleOption: "Male",
    femaleOption: "Female",
    heightLabel: "Height",
    heightFeetLabel: "Feet",
    heightInchesLabel: "Inches",
    heightCmLabel: "Centimeters (cm)",
    weightLabel: "Weight",
    weightLbsLabel: "Pounds (lbs)",
    weightKgLabel: "Kilograms (kg)",
    calcBtn: "Calculate BMI",
    clearBtn: "Clear",
    copyBtn: "Copy Results",
    copiedBtn: "Copied!",
    shareBtn: "Share",
    printBtn: "Print",
    saveBtn: "Save",
    savedBtn: "Saved!",

    unitMeters: "meters",
    unitInches: "inches",
    unitFeet: "feet",
    unitKg: "kg",
    unitLbs: "lbs",

    catUnderweight: "Underweight",
    catHealthyWeight: "Healthy Weight",
    catOverweight: "Overweight",
    catObesityClass1: "Obesity (Class 1)",
    catObesityClass2: "Obesity (Class 2)",
    catObesityClass3: "Obesity (Class 3)",

    bmiScoreTitle: "Your BMI Score",
    healthyWeightSpanLabel: "Healthy Weight Range",
    bmiPrimeLabel: "BMI Prime",
    ponderalIndexLabel: "Ponderal Index",
    estimatedBodyFatLabel: "Estimated Body Fat",
    bmrLabel: "Basal Metabolic Rate (BMR)",
    tdeeLabel: "Total Daily Energy Expenditure (TDEE)",
    screeningNote: "BMI is a population screening metric and does not diagnose disease or replace individual clinical evaluation.",
    historyTitle: "Saved BMI History",
    noHistory: "No saved calculations yet.",
    clearHistoryBtn: "Clear History",

    cdcAssessment: "CDC Assessment",
    measuredBmi: "Measured BMI",
    adultChartTitle: "Adult Height vs. Weight BMI Correlation Chart",
    childChartTitle: "CDC BMI-for-Age Growth Percentiles (Ages 2–20)",
    weightSpectrumTitle: "Weight Position Spectrum",
    weightAxis: "Weight (lbs)",
    heightAxis: "Height (inches)",
    ageAxis: "Age (Years)",
    bmiAxis: "BMI (kg/m²)",
  },

  es: {
    locale: "es",
    title: "Calculadora de IMC – Índice de Masa Corporal y Evaluación de Salud",
    description: "Calcule su IMC y estimaciones de composición corporal utilizando fórmulas antropométricas estándar y rangos de referencia por edad.",
    resetBtn: "Restablecer Valores",

    tabUsUnits: "Unidades EE. UU.",
    tabMetricUnits: "Sistema Métrico",
    tabOtherUnits: "Otras Unidades",
    ageLabel: "Edad (2–120 años)",
    genderLabel: "Sexo Biológico",
    maleOption: "Masculino",
    femaleOption: "Femenino",
    heightLabel: "Estatura",
    heightFeetLabel: "Pies",
    heightInchesLabel: "Pulgadas",
    heightCmLabel: "Centímetros (cm)",
    weightLabel: "Peso",
    weightLbsLabel: "Libras (lbs)",
    weightKgLabel: "Kilogramos (kg)",
    calcBtn: "Calcular IMC",
    clearBtn: "Limpiar",
    copyBtn: "Copiar Resultados",
    copiedBtn: "¡Copiado!",
    shareBtn: "Compartir",
    printBtn: "Imprimir",
    saveBtn: "Guardar",
    savedBtn: "¡Guardado!",

    unitMeters: "metros",
    unitInches: "pulgadas",
    unitFeet: "pies",
    unitKg: "kg",
    unitLbs: "lbs",

    catUnderweight: "Bajo peso",
    catHealthyWeight: "Peso saludable",
    catOverweight: "Sobrepeso",
    catObesityClass1: "Obesidad (Clase 1)",
    catObesityClass2: "Obesidad (Clase 2)",
    catObesityClass3: "Obesidad (Clase 3)",

    bmiScoreTitle: "Su Puntuación de IMC",
    healthyWeightSpanLabel: "Rango de Peso Saludable",
    bmiPrimeLabel: "IMC Prime",
    ponderalIndexLabel: "Índice Ponderal",
    estimatedBodyFatLabel: "Grasa Corporal Estimada",
    bmrLabel: "Tasa Metabólica Basal (TMB)",
    tdeeLabel: "Gasto Energético Diario Total (TDEE)",
    screeningNote: "El IMC es una métrica de detección poblacional y no diagnostica enfermedades ni sustituye la evaluación médica individual.",
    historyTitle: "Historial de IMC Guardado",
    noHistory: "Aún no hay cálculos guardados.",
    clearHistoryBtn: "Borrar Historial",

    cdcAssessment: "Evaluación CDC",
    measuredBmi: "IMC Medido",
    adultChartTitle: "Tabla de Correlación de IMC: Estatura vs. Peso",
    childChartTitle: "Percentiles de Crecimiento de IMC por Edad CDC (2–20 años)",
    weightSpectrumTitle: "Espectro de Posición de Peso",
    weightAxis: "Peso (lbs)",
    heightAxis: "Estatura (pulgadas)",
    ageAxis: "Edad (Años)",
    bmiAxis: "IMC (kg/m²)",
  },

  fr: {
    locale: "fr",
    title: "Calculateur d'IMC – Indice de Masse Corporelle",
    description: "Calculez votre IMC et les estimations de composition corporelle selon les normes anthropométriques internationales.",
    resetBtn: "Réinitialiser",

    tabUsUnits: "Unités US",
    tabMetricUnits: "Système Métrique",
    tabOtherUnits: "Autres Unités",
    ageLabel: "Âge (2–120 ans)",
    genderLabel: "Sexe Biologique",
    maleOption: "Homme",
    femaleOption: "Femme",
    heightLabel: "Taille",
    heightFeetLabel: "Pieds",
    heightInchesLabel: "Pouces",
    heightCmLabel: "Centimètres (cm)",
    weightLabel: "Poids",
    weightLbsLabel: "Livres (lbs)",
    weightKgLabel: "Kilogrammes (kg)",
    calcBtn: "Calculer l'IMC",
    clearBtn: "Effacer",
    copyBtn: "Copier les résultats",
    copiedBtn: "Copié !",
    shareBtn: "Partager",
    printBtn: "Imprimer",
    saveBtn: "Enregistrer",
    savedBtn: "Enregistré !",

    unitMeters: "mètres",
    unitInches: "pouces",
    unitFeet: "pieds",
    unitKg: "kg",
    unitLbs: "lbs",

    catUnderweight: "Insuffisance pondérale",
    catHealthyWeight: "Poids normal",
    catOverweight: "Surpoids",
    catObesityClass1: "Obésité (Classe 1)",
    catObesityClass2: "Obésité (Classe 2)",
    catObesityClass3: "Obésité (Classe 3)",

    bmiScoreTitle: "Votre Score d'IMC",
    healthyWeightSpanLabel: "Fourchette de Poids Santé",
    bmiPrimeLabel: "IMC Prime",
    ponderalIndexLabel: "Indice Pondéral",
    estimatedBodyFatLabel: "Graisse Corporelle Estimée",
    bmrLabel: "Métabolisme de Base (MB)",
    tdeeLabel: "Dépense Énergétique Quotidienne Totale",
    screeningNote: "L'IMC est un indicateur de dépistage populationnel qui ne remplace pas une évaluation médicale clinique individuelle.",
    historyTitle: "Historique d'IMC Enregistré",
    noHistory: "Aucun calcul enregistré pour le moment.",
    clearHistoryBtn: "Effacer l'historique",

    cdcAssessment: "Évaluation CDC",
    measuredBmi: "IMC Mesuré",
    adultChartTitle: "Tableau de Corrélation IMC : Taille vs Poids",
    childChartTitle: "Percentiles de Croissance IMC selon l'Âge (2–20 ans)",
    weightSpectrumTitle: "Spectre de Position de Poids",
    weightAxis: "Poids (lbs)",
    heightAxis: "Taille (pouces)",
    ageAxis: "Âge (Années)",
    bmiAxis: "IMC (kg/m²)",
  },

  de: {
    locale: "de",
    title: "BMI-Rechner – Body-Mass-Index & Gesundheits-Screening",
    description: "Berechnen Sie Ihren BMI und Körperzusammensetzungsschätzungen anhand von anthropometrischen Standardformeln.",
    resetBtn: "Zurücksetzen",

    tabUsUnits: "US-Einheiten",
    tabMetricUnits: "Metrisches System",
    tabOtherUnits: "Andere Einheiten",
    ageLabel: "Alter (2–120 Jahre)",
    genderLabel: "Biologisches Geschlecht",
    maleOption: "Männlich",
    femaleOption: "Weiblich",
    heightLabel: "Körpergröße",
    heightFeetLabel: "Fuß",
    heightInchesLabel: "Zoll",
    heightCmLabel: "Zentimeter (cm)",
    weightLabel: "Gewicht",
    weightLbsLabel: "Pfund (lbs)",
    weightKgLabel: "Kilogramm (kg)",
    calcBtn: "BMI Berechnen",
    clearBtn: "Löschen",
    copyBtn: "Ergebnisse Kopieren",
    copiedBtn: "Kopiert!",
    shareBtn: "Teilen",
    printBtn: "Drucken",
    saveBtn: "Speichern",
    savedBtn: "Gespeichert!",

    unitMeters: "Meter",
    unitInches: "Zoll",
    unitFeet: "Fuß",
    unitKg: "kg",
    unitLbs: "lbs",

    catUnderweight: "Untergewicht",
    catHealthyWeight: "Normalgewicht",
    catOverweight: "Übergewicht",
    catObesityClass1: "Adipositas (Grad 1)",
    catObesityClass2: "Adipositas (Grad 2)",
    catObesityClass3: "Adipositas (Grad 3)",

    bmiScoreTitle: "Ihr BMI-Ergebnis",
    healthyWeightSpanLabel: "Gesunder Gewichtsbereich",
    bmiPrimeLabel: "BMI Prime",
    ponderalIndexLabel: "Ponderal-Index",
    estimatedBodyFatLabel: "Geschätzter Körperfettanteil",
    bmrLabel: "Grundumsatz (BMR)",
    tdeeLabel: "Gesamtenergiebedarf (TDEE)",
    screeningNote: "Der BMI ist ein statistischer Screening-Parameter und ersetzt keine individuelle ärztliche Untersuchung.",
    historyTitle: "Gespeicherter BMI-Verlauf",
    noHistory: "Noch keine Berechnungen gespeichert.",
    clearHistoryBtn: "Verlauf löschen",

    cdcAssessment: "CDC-Bewertung",
    measuredBmi: "Gemessener BMI",
    adultChartTitle: "BMI-Korrelationstabelle: Größe vs. Gewicht",
    childChartTitle: "CDC-Wachstumsperzentilen für BMI nach Alter (2–20 Jahre)",
    weightSpectrumTitle: "Gewichtspositionsspektrum",
    weightAxis: "Gewicht (lbs)",
    heightAxis: "Größe (Zoll)",
    ageAxis: "Alter (Jahre)",
    bmiAxis: "BMI (kg/m²)",
  },

  hi: {
    locale: "hi",
    title: "बीएमआई कैलकुलेटर – बॉडी मास इंडेक्स व स्वास्थ्य जांच",
    description: "मानक मानवमिति सूत्रों और आयु-उपयुक्त संदर्भ श्रेणियों का उपयोग करके बीएमआई की गणना करें।",
    resetBtn: "रीसेट करें",

    tabUsUnits: "अमेरिकी इकाइयाँ",
    tabMetricUnits: "मीट्रिक प्रणाली",
    tabOtherUnits: "अन्य इकाइयाँ",
    ageLabel: "आयु (2–120 वर्ष)",
    genderLabel: "जैविक लिंग",
    maleOption: "पुरुष",
    femaleOption: "महिला",
    heightLabel: "कद (ऊंचाई)",
    heightFeetLabel: "फीट",
    heightInchesLabel: "इंच",
    heightCmLabel: "सेंटीमीटर (cm)",
    weightLabel: "वजन (भार)",
    weightLbsLabel: "पाउंड (lbs)",
    weightKgLabel: "किलोग्राम (kg)",
    calcBtn: "बीएमआई गणना करें",
    clearBtn: "साफ़ करें",
    copyBtn: "परिणाम कॉपी करें",
    copiedBtn: "कॉपी हो गया!",
    shareBtn: "साझा करें",
    printBtn: "प्रिंट करें",
    saveBtn: "सहेजें",
    savedBtn: "सहेजा गया!",

    unitMeters: "मीटर",
    unitInches: "इंच",
    unitFeet: "फीट",
    unitKg: "किग्रा",
    unitLbs: "पाउंड",

    catUnderweight: "कम वजन (अंडरवेट)",
    catHealthyWeight: "स्वस्थ सामान्य वजन",
    catOverweight: "अधिक वजन (ओवरवेट)",
    catObesityClass1: "मोटापा (श्रेणी 1)",
    catObesityClass2: "मोटापा (श्रेणी 2)",
    catObesityClass3: "गंभीर मोटापा (श्रेणी 3)",

    bmiScoreTitle: "आपका बीएमआई स्कोर",
    healthyWeightSpanLabel: "स्वस्थ वजन सीमा",
    bmiPrimeLabel: "बीएमआई प्राइम",
    ponderalIndexLabel: "पोंडरल इंडेक्स",
    estimatedBodyFatLabel: "अनुमानित शरीर वसा",
    bmrLabel: "बेसल मेटाबोलिक दर (BMR)",
    tdeeLabel: "दैनिक कुल ऊर्जा व्यय (TDEE)",
    screeningNote: "बीएमआई जनसंख्या स्क्रीनिंग का साधन है और यह किसी नैदानिक चिकित्सा जांच का विकल्प नहीं है।",
    historyTitle: "सहेजा गया बीएमआई इतिहास",
    noHistory: "कोई गणना सहेजी नहीं गई है।",
    clearHistoryBtn: "इतिहास साफ़ करें",

    cdcAssessment: "सीडीसी आकलन",
    measuredBmi: "मापा गया बीएमआई",
    adultChartTitle: "वयस्क ऊंचाई बनाम वजन बीएमआई सहसंबंध चार्ट",
    childChartTitle: "सीडीसी बीएमआई-आयु वृद्धि प्रतिशतक (2–20 वर्ष)",
    weightSpectrumTitle: "वजन स्थिति स्पेक्ट्रम",
    weightAxis: "वजन (lbs)",
    heightAxis: "ऊंचाई (इंच)",
    ageAxis: "आयु (वर्ष)",
    bmiAxis: "बीएमआई (kg/m²)",
  },

  pt: {
    locale: "pt",
    title: "Calculadora de IMC – Índice de Massa Corporal",
    description: "Calcule seu IMC e estimativas de composição corporal usando fórmulas antropométricas padrão.",
    resetBtn: "Redefinir Padrões",

    tabUsUnits: "Unidades dos EUA",
    tabMetricUnits: "Sistema Métrico",
    tabOtherUnits: "Outras Unidades",
    ageLabel: "Idade (2–120 anos)",
    genderLabel: "Sexo Biológico",
    maleOption: "Masculino",
    femaleOption: "Feminino",
    heightLabel: "Altura",
    heightFeetLabel: "Pés",
    heightInchesLabel: "Polegadas",
    heightCmLabel: "Centímetros (cm)",
    weightLabel: "Peso",
    weightLbsLabel: "Libras (lbs)",
    weightKgLabel: "Quilogramas (kg)",
    calcBtn: "Calcular IMC",
    clearBtn: "Limpar",
    copyBtn: "Copiar Resultados",
    copiedBtn: "Copiado!",
    shareBtn: "Compartilhar",
    printBtn: "Imprimir",
    saveBtn: "Salvar",
    savedBtn: "Salvo!",

    unitMeters: "metros",
    unitInches: "polegadas",
    unitFeet: "pés",
    unitKg: "kg",
    unitLbs: "lbs",

    catUnderweight: "Abaixo do peso",
    catHealthyWeight: "Peso saudável",
    catOverweight: "Sobrepeso",
    catObesityClass1: "Obesidade (Grau 1)",
    catObesityClass2: "Obesidade (Grau 2)",
    catObesityClass3: "Obesidade (Grau 3)",

    bmiScoreTitle: "Sua Pontuação de IMC",
    healthyWeightSpanLabel: "Faixa de Peso Saudável",
    bmiPrimeLabel: "IMC Prime",
    ponderalIndexLabel: "Índice Ponderal",
    estimatedBodyFatLabel: "Grasa Corporal Estimada",
    bmrLabel: "Taxa Metabólica Basal (TMB)",
    tdeeLabel: "Gasto Energético Diário Total (TDEE)",
    screeningNote: "O IMC é uma métrica de triagem populacional e não diagnostica doenças nem substitui uma avaliação clínica médica individual.",
    historyTitle: "Histórico de IMC Salvo",
    noHistory: "Nenhum cálculo salvo ainda.",
    clearHistoryBtn: "Limpar Histórico",

    cdcAssessment: "Avaliação CDC",
    measuredBmi: "IMC Medido",
    adultChartTitle: "Gráfico de Correlação de IMC: Altura vs. Peso",
    childChartTitle: "Percentis de Crescimento de IMC por Idade (2–20 anos)",
    weightSpectrumTitle: "Espectro de Posição de Peso",
    weightAxis: "Peso (lbs)",
    heightAxis: "Altura (polegadas)",
    ageAxis: "Idade (Anos)",
    bmiAxis: "IMC (kg/m²)",
  },
};

export function getBmiOverlay(locale: string): BmiLocaleOverlay {
  return BMI_OVERLAYS[locale as Locale] || BMI_OVERLAYS.en;
}
