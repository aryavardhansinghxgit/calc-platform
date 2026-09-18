import { Locale } from "../types";

export interface ScientificLocaleOverlay {
  locale: Locale;
  title?: string;
  description?: string;
  degMode: string;
  radMode: string;
  gradMode: string;
  fixFormat: string;
  sciFormat: string;
  historyBtn: string;
  copyBtn: string;
  copiedBtn: string;
  historyTitle: string;
  noHistory: string;
  clearHistoryBtn: string;
  loadBtn: string;
  deleteBtn: string;
  tabBasic: string;
  tabTrig: string;
  tabAlgebra: string;
  tabStats: string;

  // Sidebar: Math Calculators Links
  mathCalculatorsTitle: string;
  sidebarScientific: string;
  sidebarFraction: string;
  sidebarPercentage: string;
  sidebarTriangle: string;
  sidebarVolume: string;
  sidebarStdDev: string;
  sidebarRandom: string;
  sidebarMoreMath: string;

  // Sidebar: Features Guide
  featuresTitle: string;
  featKeyboardTitle: string;
  featKeyboardDesc: string;
  featHistoryTitle: string;
  featHistoryDesc: string;
  featMemoryTitle: string;
  featMemoryDesc: string;
  featAngleTitle: string;
  featAngleDesc: string;

  // Sidebar: Quick Examples
  examplesTitle: string;
  examplesSubtitle: string;
  loadArrow: string;

  // Keypad & Controls
  additionalFunctionsTitle: string;
  tooltipUp: string;
  tooltipLeft: string;
  tooltipRight: string;
  tooltipDown: string;
  tooltipCursorPos: string;
  emptyHistoryExplanation: string;
  mathError: string;
}

export const SCIENTIFIC_OVERLAYS: Record<Locale, ScientificLocaleOverlay> = {
  en: {
    locale: "en",
    title: "Scientific Calculator",
    description: "Use a scientific calculator for trigonometry, logarithms, powers, roots, factorials, scientific notation and multi-step expressions with DEG, RAD and GRAD modes.",
    degMode: "Deg",
    radMode: "Rad",
    gradMode: "Grad",
    fixFormat: "Fix",
    sciFormat: "Sci",
    historyBtn: "History",
    copyBtn: "Copy",
    copiedBtn: "Copied!",
    historyTitle: "Calculation History",
    noHistory: "No calculations in memory.",
    clearHistoryBtn: "Clear History",
    loadBtn: "Load",
    deleteBtn: "Delete",
    tabBasic: "Basic",
    tabTrig: "Trig",
    tabAlgebra: "Algebra",
    tabStats: "Stats",

    mathCalculatorsTitle: "Math Calculators",
    sidebarScientific: "Scientific",
    sidebarFraction: "Fraction",
    sidebarPercentage: "Percentage",
    sidebarTriangle: "Triangle",
    sidebarVolume: "Volume",
    sidebarStdDev: "Standard Deviation",
    sidebarRandom: "Random Generator",
    sidebarMoreMath: "More Math...",

    featuresTitle: "Calculator Features",
    featKeyboardTitle: "Keyboard Support",
    featKeyboardDesc: "Use your physical keyboard to type expressions directly.",
    featHistoryTitle: "Calculation History",
    featHistoryDesc: "View, click to restore, and clear calculation history.",
    featMemoryTitle: "Memory Functions",
    featMemoryDesc: "Store and recall values (M+, M-, MR, MC, Store, Recall).",
    featAngleTitle: "Angle Unit Modes",
    featAngleDesc: "Switch seamlessly between Degrees, Radians, and Gradians.",

    examplesTitle: "Quick Math Examples",
    examplesSubtitle: "Click any example to load it into the calculator:",
    loadArrow: "Load →",

    additionalFunctionsTitle: "Additional Functions",
    tooltipUp: "Jump to Start of Equation (Up Arrow ▲)",
    tooltipLeft: "Move Cursor Left 1 Character (Left Arrow ◀)",
    tooltipRight: "Move Cursor Right 1 Character (Right Arrow ▶)",
    tooltipDown: "Jump to End of Equation (Down Arrow ▼)",
    tooltipCursorPos: "Current Cursor Position",
    emptyHistoryExplanation: "No past calculations saved yet. Evaluate expressions with = or Enter to populate history.",
    mathError: "Math Error",
  },

  es: {
    locale: "es",
    title: "Calculadora Científica – Trigonometría, Logaritmos y Expresiones",
    description: "Calculadora científica en línea para trigonometría, logaritmos, potencias, raíces, factoriales, notación científica y expresiones complejas con modos DEG, RAD y GRAD.",
    degMode: "Grados",
    radMode: "Radianes",
    gradMode: "Gradianes",
    fixFormat: "Fijo",
    sciFormat: "Científico",
    historyBtn: "Historial",
    copyBtn: "Copiar",
    copiedBtn: "¡Copiado!",
    historyTitle: "Historial de Cálculos",
    noHistory: "No hay cálculos en memoria.",
    clearHistoryBtn: "Borrar Historial",
    loadBtn: "Cargar",
    deleteBtn: "Eliminar",
    tabBasic: "Básico",
    tabTrig: "Trigonometría",
    tabAlgebra: "Álgebra",
    tabStats: "Estadística",

    mathCalculatorsTitle: "Calculadoras Matemáticas",
    sidebarScientific: "Científica",
    sidebarFraction: "Fracciones",
    sidebarPercentage: "Porcentajes",
    sidebarTriangle: "Triángulos",
    sidebarVolume: "Volumen",
    sidebarStdDev: "Desviación Estándar",
    sidebarRandom: "Generador Aleatorio",
    sidebarMoreMath: "Más Matemáticas...",

    featuresTitle: "Características de la Calculadora",
    featKeyboardTitle: "Soporte de Teclado",
    featKeyboardDesc: "Use su teclado físico para escribir expresiones directamente.",
    featHistoryTitle: "Historial de Cálculos",
    featHistoryDesc: "Consulte, restaure con un clic y borre el historial de cálculos.",
    featMemoryTitle: "Funciones de Memoria",
    featMemoryDesc: "Guarde y recupere valores (M+, M-, MR, MC, Store, Recall).",
    featAngleTitle: "Modos de Ángulo",
    featAngleDesc: "Alterne sin problemas entre Grados sexagesimales, Radianes y Gradianes.",

    examplesTitle: "Ejemplos Matemáticos Rápidos",
    examplesSubtitle: "Haga clic en cualquier ejemplo para cargarlo en la calculadora:",
    loadArrow: "Cargar →",

    additionalFunctionsTitle: "Funciones Adicionales",
    tooltipUp: "Ir al inicio de la ecuación (Flecha arriba ▲)",
    tooltipLeft: "Mover cursor 1 carácter a la izquierda (Flecha izquierda ◀)",
    tooltipRight: "Mover cursor 1 carácter a la derecha (Flecha derecha ▶)",
    tooltipDown: "Ir al final de la ecuación (Flecha abajo ▼)",
    tooltipCursorPos: "Posición actual del cursor",
    emptyHistoryExplanation: "Aún no hay cálculos guardados. Evalúe expresiones con = o Enter para registrarlas en el historial.",
    mathError: "Error Matemático",
  },

  fr: {
    locale: "fr",
    degMode: "Degrés",
    radMode: "Radians",
    gradMode: "Grades",
    fixFormat: "Fixe",
    sciFormat: "Scientifique",
    historyBtn: "Historique",
    copyBtn: "Copier",
    copiedBtn: "Copié !",
    historyTitle: "Historique des Calculs",
    noHistory: "Aucun calcul en mémoire.",
    clearHistoryBtn: "Effacer l'historique",
    loadBtn: "Charger",
    deleteBtn: "Supprimer",
    tabBasic: "Base",
    tabTrig: "Trigo",
    tabAlgebra: "Algèbre",
    tabStats: "Statistiques",

    mathCalculatorsTitle: "Calculateurs Mathématiques",
    sidebarScientific: "Scientifique",
    sidebarFraction: "Fractions",
    sidebarPercentage: "Pourcentages",
    sidebarTriangle: "Triangle",
    sidebarVolume: "Volume",
    sidebarStdDev: "Écart-Type",
    sidebarRandom: "Générateur Aléatoire",
    sidebarMoreMath: "Plus de Maths...",

    featuresTitle: "Fonctionnalités du Calculateur",
    featKeyboardTitle: "Support Clavier",
    featKeyboardDesc: "Utilisez votre clavier physique pour saisir des formules directement.",
    featHistoryTitle: "Historique des Calculs",
    featHistoryDesc: "Consultez, restaurez d'un clic et effacez l'historique.",
    featMemoryTitle: "Fonctions de Mémoire",
    featMemoryDesc: "Stockez et rappelez des valeurs (M+, M-, MR, MC, Store, Recall).",
    featAngleTitle: "Unités d'Angle",
    featAngleDesc: "Basculez facilement entre Degrés, Radians et Grades.",

    examplesTitle: "Exemples Mathématiques Rapides",
    examplesSubtitle: "Cliquez sur un exemple pour le charger dans le calculateur :",
    loadArrow: "Charger →",

    additionalFunctionsTitle: "Fonctions Supplémentaires",
    tooltipUp: "Aller au début de l'équation (Flèche haut ▲)",
    tooltipLeft: "Déplacer le curseur vers la gauche (Flèche gauche ◀)",
    tooltipRight: "Déplacer le curseur vers la droite (Flèche droite ▶)",
    tooltipDown: "Aller à la fin de l'équation (Flèche bas ▼)",
    tooltipCursorPos: "Position actuelle du curseur",
    emptyHistoryExplanation: "Aucun calcul enregistré. Évaluez des expressions avec = ou Entrée.",
    mathError: "Erreur Mathématique",
  },

  de: {
    locale: "de",
    degMode: "Grad",
    radMode: "Rad",
    gradMode: "Gon",
    fixFormat: "Fest",
    sciFormat: "Wissenschaftlich",
    historyBtn: "Verlauf",
    copyBtn: "Kopieren",
    copiedBtn: "Kopiert!",
    historyTitle: "Berechnungsverlauf",
    noHistory: "Keine Berechnungen gespeichert.",
    clearHistoryBtn: "Verlauf löschen",
    loadBtn: "Laden",
    deleteBtn: "Entfernen",
    tabBasic: "Basis",
    tabTrig: "Trig",
    tabAlgebra: "Algebra",
    tabStats: "Statistik",

    mathCalculatorsTitle: "Mathematische Rechner",
    sidebarScientific: "Wissenschaftlich",
    sidebarFraction: "Brüche",
    sidebarPercentage: "Prozente",
    sidebarTriangle: "Dreieck",
    sidebarVolume: "Volumen",
    sidebarStdDev: "Standardabweichung",
    sidebarRandom: "Zufallsgenerator",
    sidebarMoreMath: "Mehr Mathe...",

    featuresTitle: "Rechnerfunktionen",
    featKeyboardTitle: "Tastaturunterstützung",
    featKeyboardDesc: "Nutzen Sie Ihre Computertastatur für direkte Formeleingaben.",
    featHistoryTitle: "Berechnungsverlauf",
    featHistoryDesc: "Verlauf ansehen, per Klick wiederherstellen und leeren.",
    featMemoryTitle: "Speicherfunktionen",
    featMemoryDesc: "Werte speichern und abrufen (M+, M-, MR, MC, Store, Recall).",
    featAngleTitle: "Winkeleinheiten",
    featAngleDesc: "Nahtlos zwischen Grad, Radiant und Neugrad wechseln.",

    examplesTitle: "Schnelle Mathebeispiele",
    examplesSubtitle: "Klicken Sie auf ein Beispiel, um es in den Rechner zu laden:",
    loadArrow: "Laden →",

    additionalFunctionsTitle: "Zusätzliche Funktionen",
    tooltipUp: "Zum Anfang der Gleichung springen (Pfeil hoch ▲)",
    tooltipLeft: "Cursor 1 Zeichen nach links bewegen (Pfeil links ◀)",
    tooltipRight: "Cursor 1 Zeichen nach rechts bewegen (Pfeil rechts ▶)",
    tooltipDown: "Zum Ende der Gleichung springen (Pfeil runter ▼)",
    tooltipCursorPos: "Aktuelle Cursorposition",
    emptyHistoryExplanation: "Noch keine Berechnungen gespeichert. Ausdrücke mit = oder Enter auswerten.",
    mathError: "Mathematischer Fehler",
  },

  hi: {
    locale: "hi",
    degMode: "डिग्री",
    radMode: "रेडियन",
    gradMode: "ग्रेडियन",
    fixFormat: "निश्चित",
    sciFormat: "वैज्ञानिक",
    historyBtn: "इतिहास",
    copyBtn: "कॉपी करें",
    copiedBtn: "कॉपी हो गया!",
    historyTitle: "गणना इतिहास",
    noHistory: "मेमोरी में कोई गणना नहीं है।",
    clearHistoryBtn: "इतिहास साफ़ करें",
    loadBtn: "लोड करें",
    deleteBtn: "हटाएं",
    tabBasic: "मूल",
    tabTrig: "त्रिकोणमिति",
    tabAlgebra: "बीजगणित",
    tabStats: "सांख्यिकी",

    mathCalculatorsTitle: "गणित कैलकुलेटर",
    sidebarScientific: "वैज्ञानिक",
    sidebarFraction: "भिन्न",
    sidebarPercentage: "प्रतिशत",
    sidebarTriangle: "त्रिभुज",
    sidebarVolume: "आयतन",
    sidebarStdDev: "मानक विचलन",
    sidebarRandom: "यादृच्छिक संख्या",
    sidebarMoreMath: "और गणित...",

    featuresTitle: "कैलकुलेटर सुविधाएँ",
    featKeyboardTitle: "कीबोर्ड समर्थन",
    featKeyboardDesc: "व्यंजक सीधे टाइप करने के लिए अपने भौतिक कीबोर्ड का उपयोग करें।",
    featHistoryTitle: "गणना इतिहास",
    featHistoryDesc: "इतिहास देखें, पुनः लोड करने के लिए क्लिक करें और साफ़ करें।",
    featMemoryTitle: "मेमोरी फ़ंक्शंस",
    featMemoryDesc: "मान संग्रहीत और याद करें (M+, M-, MR, MC, Store, Recall)।",
    featAngleTitle: "कोण इकाई मोड",
    featAngleDesc: "डिग्री, रेडियन और ग्रेडियन के बीच सहज रूप से स्विच करें।",

    examplesTitle: "त्वरित गणित उदाहरण",
    examplesSubtitle: "कैलकुलेटर में लोड करने के लिए किसी भी उदाहरण पर क्लिक करें:",
    loadArrow: "लोड करें →",

    additionalFunctionsTitle: "अतिरिक्त कार्य",
    tooltipUp: "समीकरण की शुरुआत में जाएं (ऊपर तीर ▲)",
    tooltipLeft: "कर्सर को 1 वर्ण बाईं ओर ले जाएं (बायां तीर ◀)",
    tooltipRight: "कर्सर को 1 वर्ण दाईं ओर ले जाएं (दायां तीर ▶)",
    tooltipDown: "समीकरण के अंत में जाएं (नीचे तीर ▼)",
    tooltipCursorPos: "वर्तमान कर्सर स्थिति",
    emptyHistoryExplanation: "अभी तक कोई गणना सहेजी नहीं गई है। इतिहास जोड़ने के लिए = या Enter दबाएं।",
    mathError: "गणित त्रुटि",
  },

  pt: {
    locale: "pt",
    degMode: "Graus",
    radMode: "Radianos",
    gradMode: "Gradianos",
    fixFormat: "Fixo",
    sciFormat: "Científico",
    historyBtn: "Histórico",
    copyBtn: "Copiar",
    copiedBtn: "Copiado!",
    historyTitle: "Histórico de Cálculos",
    noHistory: "Nenhum cálculo na memória.",
    clearHistoryBtn: "Limpar Histórico",
    loadBtn: "Carregar",
    deleteBtn: "Excluir",
    tabBasic: "Básico",
    tabTrig: "Trigonometria",
    tabAlgebra: "Álgebra",
    tabStats: "Estatística",

    mathCalculatorsTitle: "Calculadoras Matemáticas",
    sidebarScientific: "Científica",
    sidebarFraction: "Frações",
    sidebarPercentage: "Porcentagem",
    sidebarTriangle: "Triângulo",
    sidebarVolume: "Volume",
    sidebarStdDev: "Desvio Padrão",
    sidebarRandom: "Gerador Aleatório",
    sidebarMoreMath: "Mais Matemática...",

    featuresTitle: "Recursos da Calculadora",
    featKeyboardTitle: "Suporte ao Teclado",
    featKeyboardDesc: "Use o teclado físico para digitar expressões matemáticas diretamente.",
    featHistoryTitle: "Histórico de Cálculos",
    featHistoryDesc: "Consulte, restaure com um clique e limpe o histórico de cálculos.",
    featMemoryTitle: "Funções de Memória",
    featMemoryDesc: "Armazene e recupere valores (M+, M-, MR, MC, Store, Recall).",
    featAngleTitle: "Modos de Ângulo",
    featAngleDesc: "Alterne perfeitamente entre Graus, Radianos e Gradianos.",

    examplesTitle: "Exemplos Matemáticos Rápidos",
    examplesSubtitle: "Clique em qualquer exemplo para carregá-lo na calculadora:",
    loadArrow: "Carregar →",

    additionalFunctionsTitle: "Funções Adicionais",
    tooltipUp: "Ir para o início da equação (Seta para cima ▲)",
    tooltipLeft: "Mover cursor 1 caractere para a esquerda (Seta para esquerda ◀)",
    tooltipRight: "Mover cursor 1 caractere para a direita (Seta para direita ▶)",
    tooltipDown: "Ir para o final da equação (Seta para baixo ▼)",
    tooltipCursorPos: "Posição atual do cursor",
    emptyHistoryExplanation: "Nenhum cálculo salvo ainda. Avalie expressões com = ou Enter.",
    mathError: "Erro Matemático",
  },
};

export function getScientificOverlay(locale: string): ScientificLocaleOverlay {
  return SCIENTIFIC_OVERLAYS[locale as Locale] || SCIENTIFIC_OVERLAYS.en;
}
