import { Locale } from "../types";

export interface DateLocaleOverlay {
  locale: Locale;
  title?: string;
  description?: string;
  // Suite Header
  suiteTitle: string;
  suiteSubtitle: string;

  // Tabs
  tabDuration: string;
  tabOffset: string;
  tabBusiness: string;

  // Primary Inputs
  startDateLabel: string;
  endDateLabel: string;
  calcDurationBtn: string;
  resetBtn: string;
  todayBtn: string;
  calendarPickerLabel: string;

  // Units
  yearsLabel: string;
  monthsLabel: string;
  weeksLabel: string;
  daysLabel: string;
  addBtn: string;
  subtractBtn: string;
  calcOffsetBtn: string;

  // Settings & Toggles
  settingsToggle: string;
  holidayCalendarLabel: string;
  holidayHandlingLabel: string;
  holidayExcludeOption: string;
  holidayCountOption: string;
  dayCountingModeLabel: string;
  includeEndDayLabel: string;
  exclusiveOption: string;
  weekendDaysLabel: string;
  dayNames: string[];
  monthNames: string[];

  // Output Cards & Metrics
  resultsTitle: string;
  calcTargetDateHeader: string;
  calcDurationHeader: string;
  allUnitsTitle: string;
  totalDaysLabel: string;
  dayOfWeekLabel: string;
  weekendDaysSkippedLabel: string;
  holidaysSkippedLabel: string;
  totalWeeksDaysLabel: string;
  workingDaysLabel: string;
  totalHoursLabel: string;
  totalMinutesLabel: string;
  totalSecondsLabel: string;
  pctOfYearLabel: string;

  // Visual Breakdown & Charts
  workdayBreakdownTitle: string;
  daysDistributionTitle: string;
  totalSpanLabel: string;
  exactSpanLabel: string;
  encounteredHolidaysLabel: string;

  // Actions & History
  copySummaryBtn: string;
  copiedBtn: string;
  shareBtn: string;
  linkCopiedBtn: string;
  saveToHistoryBtn: string;
  historyTitle: string;
  clearHistoryBtn: string;
  historyModeCol: string;
  historyInputCol: string;
  historyOutputCol: string;
  historyDaysCol: string;
  historyActionsCol: string;
  historyLoadBtn: string;
  historyDeleteBtn: string;

  // String formatters
  formatYearsMonthsDays: (y: number, m: number, d: number) => string;
  formatWeeksDays: (w: number, d: number) => string;
}

export const DATE_OVERLAYS: Record<Locale, DateLocaleOverlay> = {
  en: {
    locale: "en",
    title: "Date Calculator",
    description: "Calculate the number of days between two dates, add or subtract days, weeks, months, and years, and calculate working business days with leap year rules.",
    suiteTitle: "Advanced Date Calculator Suite",
    suiteSubtitle: "Exact day counter • Add/subtract dates • Business day & holiday solver",

    tabDuration: "Date Difference",
    tabOffset: "Add / Subtract Days",
    tabBusiness: "Business Days",

    startDateLabel: "Start Date",
    endDateLabel: "End Date",
    calcDurationBtn: "Calculate Difference",
    resetBtn: "Reset Defaults",
    todayBtn: "Today",
    calendarPickerLabel: "Calendar Picker:",

    yearsLabel: "Years",
    monthsLabel: "Months",
    weeksLabel: "Weeks",
    daysLabel: "Days",
    addBtn: "Add",
    subtractBtn: "Subtract",
    calcOffsetBtn: "Calculate Target Date",

    settingsToggle: "Holiday & Workweek Settings (US Federal, UK, Custom Weekends, Inclusive Count)",
    holidayCalendarLabel: "Holiday Calendar:",
    holidayHandlingLabel: "Holiday Handling:",
    holidayExcludeOption: "Exclude holidays from business days",
    holidayCountOption: "Count holidays as normal working days",
    dayCountingModeLabel: "Day Counting Mode:",
    includeEndDayLabel: "Include End Day (+1 Day)",
    exclusiveOption: "Standard (Exclusive)",
    weekendDaysLabel: "Non-Working Weekend Days:",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthNames: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],

    resultsTitle: "Calculated Date Span",
    calcTargetDateHeader: "Calculated Target Date",
    calcDurationHeader: "Calculated Duration Between Dates",
    allUnitsTitle: "All-Units Conversion Matrix",
    totalDaysLabel: "Total Calendar Days",
    dayOfWeekLabel: "Day of the Week",
    weekendDaysSkippedLabel: "Weekend Days Skipped",
    holidaysSkippedLabel: "Holidays Skipped",
    totalWeeksDaysLabel: "Total Weeks & Days",
    workingDaysLabel: "Working Business Days",
    totalHoursLabel: "Total Hours",
    totalMinutesLabel: "Total Minutes",
    totalSecondsLabel: "Total Seconds",
    pctOfYearLabel: "% of Solar Year",

    workdayBreakdownTitle: "Workday & Calendar Breakdown",
    daysDistributionTitle: "Days Distribution",
    totalSpanLabel: "Total Span",
    exactSpanLabel: "Exact Span",
    encounteredHolidaysLabel: "Encountered Holidays:",

    copySummaryBtn: "Copy Summary",
    copiedBtn: "Copied!",
    shareBtn: "Share",
    linkCopiedBtn: "Link Copied!",
    saveToHistoryBtn: "Save Calculation to History",
    historyTitle: "Saved Calculations History",
    clearHistoryBtn: "Clear History",
    historyModeCol: "Mode",
    historyInputCol: "Dates / Offset",
    historyOutputCol: "Output",
    historyDaysCol: "Total Days",
    historyActionsCol: "Actions",
    historyLoadBtn: "Load",
    historyDeleteBtn: "Delete",

    formatYearsMonthsDays: (y, m, d) => {
      if (y === 0 && m === 0 && d === 0) return "0 days (Same date)";
      const parts: string[] = [];
      if (y > 0) parts.push(y === 1 ? "1 year" : `${y} years`);
      if (m > 0) parts.push(m === 1 ? "1 month" : `${m} months`);
      if (d > 0 || parts.length === 0) parts.push(d === 1 ? "1 day" : `${d} days`);
      return parts.join(", ");
    },
    formatWeeksDays: (w, d) => `${w} weeks${d > 0 ? ` and ${d} days` : ""}`,
  },

  es: {
    locale: "es",
    title: "Calculadora de Fechas – Días Entre Fechas y Días Hábiles",
    description: "Calcule días entre dos fechas, sume o reste días, semanas, meses y años, y cuente días hábiles con soporte para años bisiestos y feriados.",
    suiteTitle: "Calculadora Avanzada de Fechas y Calendario",
    suiteSubtitle: "Contador exacto de días • Sumar/restar fechas • Días laborables y festivos",

    tabDuration: "Diferencia de Fechas",
    tabOffset: "Sumar / Restar Días",
    tabBusiness: "Días Laborables",

    startDateLabel: "Fecha Inicial",
    endDateLabel: "Fecha Final",
    calcDurationBtn: "Calcular Diferencia",
    resetBtn: "Restablecer",
    todayBtn: "Hoy",
    calendarPickerLabel: "Selector de Calendario:",

    yearsLabel: "Años",
    monthsLabel: "Meses",
    weeksLabel: "Semanas",
    daysLabel: "Días",
    addBtn: "Sumar",
    subtractBtn: "Restar",
    calcOffsetBtn: "Calcular Fecha Resultante",

    settingsToggle: "Configuración de Festivos y Semana Laboral (Festivos, Fines de Semana, Conteo Inclusivo)",
    holidayCalendarLabel: "Calendario de Festivos:",
    holidayHandlingLabel: "Gestión de Festivos:",
    holidayExcludeOption: "Excluir festivos de los días hábiles",
    holidayCountOption: "Contar festivos como días laborales normales",
    dayCountingModeLabel: "Modo de Conteo de Días:",
    includeEndDayLabel: "Incluir Día Final (+1 Día)",
    exclusiveOption: "Estándar (Exclusivo)",
    weekendDaysLabel: "Días de Fin de Semana no Laborables:",
    dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    monthNames: [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],

    resultsTitle: "Intervalo de Tiempo Calculado",
    calcTargetDateHeader: "Fecha Resultante Calculada",
    calcDurationHeader: "Duración Calculada entre Fechas",
    allUnitsTitle: "Matriz de Conversión en Todas las Unidades",
    totalDaysLabel: "Total de Días Calendario",
    dayOfWeekLabel: "Día de la Semana",
    weekendDaysSkippedLabel: "Días de Fin de Semana Omitidos",
    holidaysSkippedLabel: "Festivos Omitidos",
    totalWeeksDaysLabel: "Total de Semanas y Días",
    workingDaysLabel: "Días Hábiles Laborables",
    totalHoursLabel: "Total de Horas",
    totalMinutesLabel: "Total de Minutos",
    totalSecondsLabel: "Total de Segundos",
    pctOfYearLabel: "% del Año Solar",

    workdayBreakdownTitle: "Desglose de Días Laborables y Calendario",
    daysDistributionTitle: "Distribución de Días",
    totalSpanLabel: "Período Total",
    exactSpanLabel: "Período Exacto",
    encounteredHolidaysLabel: "Festivos Encontrados:",

    copySummaryBtn: "Copiar Resumen",
    copiedBtn: "¡Copiado!",
    shareBtn: "Compartir",
    linkCopiedBtn: "¡Enlace Copiado!",
    saveToHistoryBtn: "Guardar Cálculo en el Historial",
    historyTitle: "Historial de Cálculos Guardados",
    clearHistoryBtn: "Borrar Historial",
    historyModeCol: "Modo",
    historyInputCol: "Fechas / Desplazamiento",
    historyOutputCol: "Resultado",
    historyDaysCol: "Total Días",
    historyActionsCol: "Acciones",
    historyLoadBtn: "Cargar",
    historyDeleteBtn: "Eliminar",

    formatYearsMonthsDays: (y, m, d) => {
      if (y === 0 && m === 0 && d === 0) return "0 días (Misma fecha)";
      const parts: string[] = [];
      if (y > 0) parts.push(y === 1 ? "1 año" : `${y} años`);
      if (m > 0) parts.push(m === 1 ? "1 mes" : `${m} meses`);
      if (d > 0 || parts.length === 0) parts.push(d === 1 ? "1 día" : `${d} días`);
      return parts.join(", ");
    },
    formatWeeksDays: (w, d) => `${w} semanas${d > 0 ? ` y ${d} días` : ""}`,
  },

  fr: {
    locale: "fr",
    suiteTitle: "Calculateur Avancé de Dates et Calendrier",
    suiteSubtitle: "Compteur exact de jours • Ajouter/soustraire des dates • Jours ouvrés",

    tabDuration: "Différence de Dates",
    tabOffset: "Ajouter / Soustraire",
    tabBusiness: "Jours Ouvrés",

    startDateLabel: "Date de Début",
    endDateLabel: "Date de Fin",
    calcDurationBtn: "Calculer la Différence",
    resetBtn: "Réinitialiser",
    todayBtn: "Aujourd'hui",
    calendarPickerLabel: "Sélecteur de Calendrier :",

    yearsLabel: "Années",
    monthsLabel: "Mois",
    weeksLabel: "Semaines",
    daysLabel: "Jours",
    addBtn: "Ajouter",
    subtractBtn: "Soustraire",
    calcOffsetBtn: "Calculer la Date Finale",

    settingsToggle: "Paramètres Fériés et Semaine de Travail",
    holidayCalendarLabel: "Calendrier des Jours Fériés :",
    holidayHandlingLabel: "Traitement des Fériés :",
    holidayExcludeOption: "Exclure les jours fériés",
    holidayCountOption: "Compter les fériés comme ouvrés",
    dayCountingModeLabel: "Mode de Décompte :",
    includeEndDayLabel: "Inclure le Jour Final (+1 Jour)",
    exclusiveOption: "Standard (Exclusif)",
    weekendDaysLabel: "Jours de Week-end :",
    dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    monthNames: [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ],

    resultsTitle: "Intervalle de Temps Calculé",
    calcTargetDateHeader: "Date Cible Calculée",
    calcDurationHeader: "Durée Calculée entre Dates",
    allUnitsTitle: "Matrice de Conversion Complète",
    totalDaysLabel: "Nombre Total de Jours",
    dayOfWeekLabel: "Jour de la Semaine",
    weekendDaysSkippedLabel: "Jours de Week-end Ignorés",
    holidaysSkippedLabel: "Jours Fériés Ignorés",
    totalWeeksDaysLabel: "Total Semaines et Jours",
    workingDaysLabel: "Jours Ouvrés",
    totalHoursLabel: "Total Heures",
    totalMinutesLabel: "Total Minutes",
    totalSecondsLabel: "Total Secondes",
    pctOfYearLabel: "% de l'Année Solaire",

    workdayBreakdownTitle: "Décomposition Jours Ouvrés & Calendrier",
    daysDistributionTitle: "Répartition des Jours",
    totalSpanLabel: "Durée Totale",
    exactSpanLabel: "Durée Exacte",
    encounteredHolidaysLabel: "Jours Fériés Rencontrés :",

    copySummaryBtn: "Copier le Résumé",
    copiedBtn: "Copié !",
    shareBtn: "Partager",
    linkCopiedBtn: "Lien Copié !",
    saveToHistoryBtn: "Enregistrer dans l'Historique",
    historyTitle: "Historique des Calculs Enregistrés",
    clearHistoryBtn: "Effacer l'historique",
    historyModeCol: "Mode",
    historyInputCol: "Dates / Décalage",
    historyOutputCol: "Résultat",
    historyDaysCol: "Total Jours",
    historyActionsCol: "Actions",
    historyLoadBtn: "Charger",
    historyDeleteBtn: "Supprimer",

    formatYearsMonthsDays: (y, m, d) => {
      if (y === 0 && m === 0 && d === 0) return "0 jours (Même date)";
      const parts: string[] = [];
      if (y > 0) parts.push(y === 1 ? "1 an" : `${y} ans`);
      if (m > 0) parts.push(m === 1 ? "1 mois" : `${m} mois`);
      if (d > 0 || parts.length === 0) parts.push(d === 1 ? "1 jour" : `${d} jours`);
      return parts.join(", ");
    },
    formatWeeksDays: (w, d) => `${w} semaines${d > 0 ? ` et ${d} jours` : ""}`,
  },

  de: {
    locale: "de",
    suiteTitle: "Erweiterter Datumsrechner",
    suiteSubtitle: "Exakter Tageszähler • Daten addieren/subtrahieren • Arbeitstage & Feiertage",

    tabDuration: "Datumsdifferenz",
    tabOffset: "Tage addieren / abziehen",
    tabBusiness: "Arbeitstage",

    startDateLabel: "Startdatum",
    endDateLabel: "Enddatum",
    calcDurationBtn: "Differenz berechnen",
    resetBtn: "Zurücksetzen",
    todayBtn: "Heute",
    calendarPickerLabel: "Kalenderauswahl:",

    yearsLabel: "Jahre",
    monthsLabel: "Monate",
    weeksLabel: "Wochen",
    daysLabel: "Tage",
    addBtn: "Addieren",
    subtractBtn: "Subtrahieren",
    calcOffsetBtn: "Zieldatum berechnen",

    settingsToggle: "Feiertags- und Arbeitswocheneinstellungen",
    holidayCalendarLabel: "Feiertagskalender:",
    holidayHandlingLabel: "Feiertagsbehandlung:",
    holidayExcludeOption: "Feiertage von Arbeitstagen ausschließen",
    holidayCountOption: "Feiertage als normale Arbeitstage zählen",
    dayCountingModeLabel: "Zählmodus:",
    includeEndDayLabel: "Enddatum einbeziehen (+1 Tag)",
    exclusiveOption: "Standard (Exklusiv)",
    weekendDaysLabel: "Wochenendtage:",
    dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    monthNames: [
      "Januar", "Februar", "März", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Dezember"
    ],

    resultsTitle: "Berechneter Zeitraum",
    calcTargetDateHeader: "Berechnetes Zieldatum",
    calcDurationHeader: "Berechnete Zeitspanne",
    allUnitsTitle: "Einheiten-Umrechnungsmatrix",
    totalDaysLabel: "Gesamte Kalendertage",
    dayOfWeekLabel: "Wochentag",
    weekendDaysSkippedLabel: "Übersprungene Wochenendtage",
    holidaysSkippedLabel: "Übersprungene Feiertage",
    totalWeeksDaysLabel: "Wochen und Tage gesamt",
    workingDaysLabel: "Arbeitstage",
    totalHoursLabel: "Stunden gesamt",
    totalMinutesLabel: "Minuten gesamt",
    totalSecondsLabel: "Sekunden gesamt",
    pctOfYearLabel: "% des Sonnenjahres",

    workdayBreakdownTitle: "Aufschlüsselung der Arbeits- und Kalendertage",
    daysDistributionTitle: "Tagesverteilung",
    totalSpanLabel: "Gesamtdauer",
    exactSpanLabel: "Exakte Zeitspanne",
    encounteredHolidaysLabel: "Berücksichtigte Feiertage:",

    copySummaryBtn: "Zusammenfassung kopieren",
    copiedBtn: "Kopiert!",
    shareBtn: "Teilen",
    linkCopiedBtn: "Link kopiert!",
    saveToHistoryBtn: "In Verlauf speichern",
    historyTitle: "Gespeicherter Berechnungsverlauf",
    clearHistoryBtn: "Verlauf löschen",
    historyModeCol: "Modus",
    historyInputCol: "Daten / Offset",
    historyOutputCol: "Ergebnis",
    historyDaysCol: "Tage gesamt",
    historyActionsCol: "Aktionen",
    historyLoadBtn: "Laden",
    historyDeleteBtn: "Löschen",

    formatYearsMonthsDays: (y, m, d) => {
      if (y === 0 && m === 0 && d === 0) return "0 Tage (Gleiches Datum)";
      const parts: string[] = [];
      if (y > 0) parts.push(y === 1 ? "1 Jahr" : `${y} Jahre`);
      if (m > 0) parts.push(m === 1 ? "1 Monat" : `${m} Monate`);
      if (d > 0 || parts.length === 0) parts.push(d === 1 ? "1 Tag" : `${d} Tage`);
      return parts.join(", ");
    },
    formatWeeksDays: (w, d) => `${w} Wochen${d > 0 ? ` und ${d} Tage` : ""}`,
  },

  hi: {
    locale: "hi",
    suiteTitle: "उन्नत तिथि व कैलेंडर कैलकुलेटर",
    suiteSubtitle: "सटीक दिन गणना • तिथियां जोड़ें/घटाएं • कार्य दिवस व अवकाश",

    tabDuration: "तिथियों में अंतर",
    tabOffset: "दिन जोड़ें / घटाएं",
    tabBusiness: "कार्य दिवस",

    startDateLabel: "प्रारंभिक तिथि",
    endDateLabel: "अंतिम तिथि",
    calcDurationBtn: "अंतर की गणना करें",
    resetBtn: "रीसेट करें",
    todayBtn: "आज",
    calendarPickerLabel: "कैलेंडर चयनकर्ता:",

    yearsLabel: "वर्ष",
    monthsLabel: "महीने",
    weeksLabel: "सप्ताह",
    daysLabel: "दिन",
    addBtn: "जोड़ें",
    subtractBtn: "घटाएं",
    calcOffsetBtn: "लक्षित तिथि निकालें",

    settingsToggle: "अवकाश और कार्य सप्ताह सेटिंग्स",
    holidayCalendarLabel: "अवकाश कैलेंडर:",
    holidayHandlingLabel: "अवकाश प्रबंधन:",
    holidayExcludeOption: "कार्य दिवसों से अवकाश बाहर रखें",
    holidayCountOption: "अवकाश को सामान्य कार्य दिवस मानें",
    dayCountingModeLabel: "दिन गणना मोड:",
    includeEndDayLabel: "अंतिम दिन शामिल करें (+1 दिन)",
    exclusiveOption: "मानक (अनन्य)",
    weekendDaysLabel: "सप्ताहांत के दिन:",
    dayNames: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
    monthNames: [
      "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
      "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
    ],

    resultsTitle: "गणना की गई समयावधि",
    calcTargetDateHeader: "गणना की गई लक्षित तिथि",
    calcDurationHeader: "तिथियों के बीच की अवधि",
    allUnitsTitle: "सभी इकाइयों में रूपांतरण",
    totalDaysLabel: "कुल कैलेंडर दिन",
    dayOfWeekLabel: "सप्ताह का दिन",
    weekendDaysSkippedLabel: "छोड़े गए सप्ताहांत दिन",
    holidaysSkippedLabel: "छोड़े गए अवकाश",
    totalWeeksDaysLabel: "कुल सप्ताह व दिन",
    workingDaysLabel: "कार्य दिवस",
    totalHoursLabel: "कुल घंटे",
    totalMinutesLabel: "कुल मिनट",
    totalSecondsLabel: "कुल सेकंड",
    pctOfYearLabel: "% सौर वर्ष",

    workdayBreakdownTitle: "कार्य दिवस व कैलेंडर विवरण",
    daysDistributionTitle: "दिन वितरण",
    totalSpanLabel: "कुल अवधि",
    exactSpanLabel: "सटीक अवधि",
    encounteredHolidaysLabel: "शामिल अवकाश:",

    copySummaryBtn: "सारांश कॉपी करें",
    copiedBtn: "कॉपी हो गया!",
    shareBtn: "साझा करें",
    linkCopiedBtn: "लिंक कॉपी हो गया!",
    saveToHistoryBtn: "इतिहास में सहेजें",
    historyTitle: "सहेजा गया गणना इतिहास",
    clearHistoryBtn: "इतिहास साफ़ करें",
    historyModeCol: "मोड",
    historyInputCol: "तिथियां / अंतराल",
    historyOutputCol: "परिणाम",
    historyDaysCol: "कुल दिन",
    historyActionsCol: "कार्रवाई",
    historyLoadBtn: "लोड करें",
    historyDeleteBtn: "हटाएं",

    formatYearsMonthsDays: (y, m, d) => {
      if (y === 0 && m === 0 && d === 0) return "0 दिन (समान तिथि)";
      const parts: string[] = [];
      if (y > 0) parts.push(`${y} वर्ष`);
      if (m > 0) parts.push(`${m} महीने`);
      if (d > 0 || parts.length === 0) parts.push(`${d} दिन`);
      return parts.join(", ");
    },
    formatWeeksDays: (w, d) => `${w} सप्ताह${d > 0 ? ` और ${d} दिन` : ""}`,
  },

  pt: {
    locale: "pt",
    suiteTitle: "Calculadora Avançada de Datas e Calendário",
    suiteSubtitle: "Contador exato de dias • Adicionar/subtrair datas • Dias úteis e feriados",

    tabDuration: "Diferença entre Datas",
    tabOffset: "Adicionar / Subtrair Dias",
    tabBusiness: "Dias Úteis",

    startDateLabel: "Data Inicial",
    endDateLabel: "Data Final",
    calcDurationBtn: "Calcular Diferença",
    resetBtn: "Redefinir",
    todayBtn: "Hoje",
    calendarPickerLabel: "Seletor de Calendário:",

    yearsLabel: "Anos",
    monthsLabel: "Meses",
    weeksLabel: "Semanas",
    daysLabel: "Dias",
    addBtn: "Somar",
    subtractBtn: "Subtrair",
    calcOffsetBtn: "Calcular Data Resultante",

    settingsToggle: "Configurações de Feriados e Dias Úteis",
    holidayCalendarLabel: "Calendário de Feriados:",
    holidayHandlingLabel: "Tratamento de Feriados:",
    holidayExcludeOption: "Excluir feriados dos dias úteis",
    holidayCountOption: "Contar feriados como dias normais",
    dayCountingModeLabel: "Modo de Contagem:",
    includeEndDayLabel: "Incluir Data Final (+1 Dia)",
    exclusiveOption: "Padrão (Exclusivo)",
    weekendDaysLabel: "Finais de Semana:",
    dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    monthNames: [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ],

    resultsTitle: "Intervalo de Tempo Calculado",
    calcTargetDateHeader: "Data Alvo Calculada",
    calcDurationHeader: "Duração Calculada entre Datas",
    allUnitsTitle: "Matriz de Conversão Completa",
    totalDaysLabel: "Total de Dias Corridos",
    dayOfWeekLabel: "Dia da Semana",
    weekendDaysSkippedLabel: "Fins de Semana Pulados",
    holidaysSkippedLabel: "Feriados Pulados",
    totalWeeksDaysLabel: "Total de Semanas e Dias",
    workingDaysLabel: "Dias Úteis",
    totalHoursLabel: "Total de Horas",
    totalMinutesLabel: "Total de Minutos",
    totalSecondsLabel: "Total de Segundos",
    pctOfYearLabel: "% do Ano Solar",

    workdayBreakdownTitle: "Detalhamento de Dias Úteis e Calendário",
    daysDistributionTitle: "Distribuição dos Dias",
    totalSpanLabel: "Período Total",
    exactSpanLabel: "Período Exato",
    encounteredHolidaysLabel: "Feriados Encontrados:",

    copySummaryBtn: "Copiar Resumo",
    copiedBtn: "Copiado!",
    shareBtn: "Compartilhar",
    linkCopiedBtn: "Link Copiado!",
    saveToHistoryBtn: "Salvar no Histórico",
    historyTitle: "Histórico de Cálculos Salvos",
    clearHistoryBtn: "Limpar Histórico",
    historyModeCol: "Modo",
    historyInputCol: "Datas / Deslocamento",
    historyOutputCol: "Resultado",
    historyDaysCol: "Total Dias",
    historyActionsCol: "Ações",
    historyLoadBtn: "Carregar",
    historyDeleteBtn: "Excluir",

    formatYearsMonthsDays: (y, m, d) => {
      if (y === 0 && m === 0 && d === 0) return "0 dias (Mesma data)";
      const parts: string[] = [];
      if (y > 0) parts.push(y === 1 ? "1 ano" : `${y} anos`);
      if (m > 0) parts.push(m === 1 ? "1 mês" : `${m} meses`);
      if (d > 0 || parts.length === 0) parts.push(d === 1 ? "1 dia" : `${d} dias`);
      return parts.join(", ");
    },
    formatWeeksDays: (w, d) => `${w} semanas${d > 0 ? ` e ${d} dias` : ""}`,
  },
};

export function getDateOverlay(locale: string): DateLocaleOverlay {
  return DATE_OVERLAYS[locale as Locale] || DATE_OVERLAYS.en;
}
