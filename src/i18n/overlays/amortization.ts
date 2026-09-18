import { AmortizationLocaleOverlay, Locale } from "../types";

export const AMORTIZATION_EN_OVERLAY: AmortizationLocaleOverlay = {
  locale: "en",
  title: "Amortization Calculator — Mortgage & Loan Payment Schedule",
  description:
    "Calculate monthly payments, principal and interest, amortization schedules, payoff dates and interest savings with extra monthly, yearly or lump-sum payments.",

  // Action Bar
  managerTitle: "Amortization Manager",
  savedCountBadge: "Saved",
  printPdfBtn: "Print / PDF",
  saveBtn: "Save",
  savedBtn: "Saved",
  shareSuccessMsg: "Shareable link copied to clipboard!",

  // Input Card
  inputsTitle: "Loan Inputs",
  inputsSubtitle: "Modify the values and click the Calculate button to use",
  loanAmount: "Loan Amount ($)",
  loanTermYears: "Loan Term (Years)",
  loanTermMonths: "Loan Term (Months)",
  interestRate: "Interest Rate (%)",
  startMonth: "Start Month",
  startYear: "Start Year",
  monthOptions: [
    { value: 1, label: "Jan" },
    { value: 2, label: "Feb" },
    { value: 3, label: "Mar" },
    { value: 4, label: "Apr" },
    { value: 5, label: "May" },
    { value: 6, label: "Jun" },
    { value: 7, label: "Jul" },
    { value: 8, label: "Aug" },
    { value: 9, label: "Sep" },
    { value: 10, label: "Oct" },
    { value: 11, label: "Nov" },
    { value: 12, label: "Dec" },
  ],
  fullMonthNames: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],

  // Extra Payments
  optionalExtraPayments: "Optional: make extra payments",
  extraMonthlyPayment: "Extra Monthly Payment ($)",
  extraYearlyPayment: "Extra Yearly Payment ($)",
  extraOneTimePayment: "One-Time Extra Payment ($)",
  extraStartMonth: "Extra Start Month",
  extraStartYear: "Extra Start Year",

  // Actions & Validation
  calculateBtn: "Calculate",
  clearBtn: "Clear",
  validationErrorAmount: "Loan amount must be greater than $0.",
  validationErrorRate: "Interest rate must be between 0% and 100%.",
  validationErrorTerm: "Loan term must be greater than 0.",
  validationErrorMaxTerm: "Maximum supported loan term is 50 years.",

  // Results
  monthlyPaymentTitle: "Monthly Loan Payment",
  totalPaymentsCount: "Total Payments",
  paymentsLabel: "payments",
  totalPrincipal: "Total Principal",
  totalInterest: "Total Interest",
  totalAmountPaid: "Total Amount Paid",
  loanPayoffDate: "Loan Payoff Date",
  interestSaved: "Interest Saved",

  // Comparison
  comparisonTitle: "Comparison: Original Loan vs. Extra Payments Loan",
  originalInterestVsNew: "Original Interest vs. New Interest",
  savedLabel: "Saved",
  originalPayoffVsNew: "Original Payoff Date vs. New Payoff Date",
  timeSavedLabel: "Time Saved",
  yearsLabel: "Years",
  monthsLabel: "Months",

  // Visual Charts
  chartsTitle: "Visual Charts & Loan Breakdown",
  tabBreakdown: "Chart 1: Breakdown",
  tabProgress: "Chart 2: Progress",
  loadingPieChart: "Loading pie chart...",
  loadingProgressChart: "Loading progress chart...",

  // Schedule Table
  scheduleTitle: "Amortization Schedule",
  scheduleSubtitle:
    "Annual & Monthly breakdown tables with search, sorting, pagination, and CSV / Excel / PDF / Print export",
  annualTab: "Annual Schedule",
  monthlyTab: "Monthly Schedule",
  searchYearPlaceholder: "Search year...",
  searchPaymentPlaceholder: "Search payment or date...",
  exportCsvBtn: "Export CSV",
  exportExcelBtn: "Excel",
  yearCol: "Year",
  paymentNumberCol: "Payment #",
  paymentDateCol: "Payment Date",
  beginningBalanceCol: "Beginning Balance",
  paymentAmountCol: "Payment Amount",
  principalPaidCol: "Principal",
  interestPaidCol: "Interest",
  extraPaidCol: "Extra Paid",
  endingBalanceCol: "Ending Balance",
  prevPage: "Prev",
  nextPage: "Next",
  pageOf: "Page",
  showingRecords: "Showing",

  // Save Modal
  saveModalTitle: "Save Calculation",
  saveModalSubtitle: "Save your amortization calculation setup locally to restore later",
  calcSummaryLabel: "Calculation Summary",
  monthlyPaySummary: "Monthly Pay",
  saveNameLabel: "Calculation Name",
  saveNamePlaceholder: "e.g. 15-Year Mortgage Setup",
  cancelBtn: "Cancel",
  confirmSaveBtn: "Save",
  saveSuccessMsg: "Calculation saved successfully!",
  savedCalculationsTitle: "Saved Calculations",
  restoreBtn: "Restore",
  deleteBtnTitle: "Delete saved calculation",
};

export const AMORTIZATION_ES_OVERLAY: AmortizationLocaleOverlay = {
  locale: "es",
  title: "Calculadora de Amortización — Tabla y Calendario de Pagos",
  description:
    "Calcula pagos mensuales, desglose de capital e intereses, tabla de amortización, fecha de liquidación y ahorro con pagos adicionales.",

  // Action Bar
  managerTitle: "Gestor de Amortización",
  savedCountBadge: "Guardados",
  printPdfBtn: "Imprimir / PDF",
  saveBtn: "Guardar",
  savedBtn: "Guardado",
  shareSuccessMsg: "¡Enlace copiado al portapapeles!",

  // Input Card
  inputsTitle: "Datos del Préstamo",
  inputsSubtitle: "Modifica los valores y haz clic en Calcular",
  loanAmount: "Monto del Préstamo ($)",
  loanTermYears: "Plazo del Préstamo (Años)",
  loanTermMonths: "Plazo del Préstamo (Meses)",
  interestRate: "Tasa de Interés Anual (%)",
  startMonth: "Mes de Inicio",
  startYear: "Año de Inicio",
  monthOptions: [
    { value: 1, label: "Ene" },
    { value: 2, label: "Feb" },
    { value: 3, label: "Mar" },
    { value: 4, label: "Abr" },
    { value: 5, label: "May" },
    { value: 6, label: "Jun" },
    { value: 7, label: "Jul" },
    { value: 8, label: "Ago" },
    { value: 9, label: "Sep" },
    { value: 10, label: "Oct" },
    { value: 11, label: "Nov" },
    { value: 12, label: "Dic" },
  ],
  fullMonthNames: [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ],

  // Extra Payments
  optionalExtraPayments: "Opcional: realizar pagos adicionales",
  extraMonthlyPayment: "Pago Mensual Extra ($)",
  extraYearlyPayment: "Pago Anual Extra ($)",
  extraOneTimePayment: "Pago Extra Único ($)",
  extraStartMonth: "Mes de Inicio Extra",
  extraStartYear: "Año de Inicio Extra",

  // Actions & Validation
  calculateBtn: "Calcular",
  clearBtn: "Limpiar",
  validationErrorAmount: "El monto del préstamo debe ser mayor a $0.",
  validationErrorRate: "La tasa de interés debe estar entre 0% y 100%.",
  validationErrorTerm: "El plazo del préstamo debe ser mayor a 0.",
  validationErrorMaxTerm: "El plazo máximo admitido es de 50 años.",

  // Results
  monthlyPaymentTitle: "Pago Mensual del Préstamo",
  totalPaymentsCount: "Total de Pagos",
  paymentsLabel: "pagos",
  totalPrincipal: "Capital Total",
  totalInterest: "Interés Total",
  totalAmountPaid: "Monto Total Pagado",
  loanPayoffDate: "Fecha de Liquidación",
  interestSaved: "Interés Ahorrado",

  // Comparison
  comparisonTitle: "Comparación: Préstamo Original vs. Con Pagos Extras",
  originalInterestVsNew: "Interés Original vs. Nuevo Interés",
  savedLabel: "Ahorro",
  originalPayoffVsNew: "Fecha Original vs. Nueva Fecha de Liquidación",
  timeSavedLabel: "Tiempo Ahorrado",
  yearsLabel: "Años",
  monthsLabel: "Meses",

  // Visual Charts
  chartsTitle: "Gráficos Visuales y Desglose",
  tabBreakdown: "Gráfico 1: Desglose",
  tabProgress: "Gráfico 2: Evolución",
  loadingPieChart: "Cargando gráfico circular...",
  loadingProgressChart: "Cargando gráfico de evolución...",

  // Schedule Table
  scheduleTitle: "Tabla de Amortización",
  scheduleSubtitle:
    "Tablas de desglose anual y mensual con búsqueda, ordenación, paginación y exportación a CSV / Excel / PDF",
  annualTab: "Tabla Anual",
  monthlyTab: "Tabla Mensual",
  searchYearPlaceholder: "Buscar año...",
  searchPaymentPlaceholder: "Buscar pago o fecha...",
  exportCsvBtn: "Exportar CSV",
  exportExcelBtn: "Excel",
  yearCol: "Año",
  paymentNumberCol: "Nº Pago",
  paymentDateCol: "Fecha de Pago",
  beginningBalanceCol: "Saldo Inicial",
  paymentAmountCol: "Monto del Pago",
  principalPaidCol: "Capital",
  interestPaidCol: "Interés",
  extraPaidCol: "Pago Extra",
  endingBalanceCol: "Saldo Final",
  prevPage: "Ant",
  nextPage: "Sig",
  pageOf: "Página",
  showingRecords: "Mostrando",

  // Save Modal
  saveModalTitle: "Guardar Cálculo",
  saveModalSubtitle: "Guarda tu configuración de amortización localmente para recuperarla más tarde",
  calcSummaryLabel: "Resumen del Cálculo",
  monthlyPaySummary: "Pago Mensual",
  saveNameLabel: "Nombre del Cálculo",
  saveNamePlaceholder: "Ej. Hipoteca 15 Años",
  cancelBtn: "Cancelar",
  confirmSaveBtn: "Guardar",
  saveSuccessMsg: "¡Cálculo guardado exitosamente!",
  savedCalculationsTitle: "Cálculos Guardados",
  restoreBtn: "Restaurar",
  deleteBtnTitle: "Eliminar cálculo guardado",
};

export const AMORTIZATION_FR_OVERLAY: AmortizationLocaleOverlay = {
  locale: "fr",
  title: "Calculateur d'Amortissement — Tableau et Échéancier de Prêt",
  description:
    "Calculez les mensualités, la répartition capital/intérêts, le tableau d'amortissement, la date de fin et les économies avec versements anticipés.",

  // Action Bar
  managerTitle: "Gestionnaire d'Amortissement",
  savedCountBadge: "Enregistrés",
  printPdfBtn: "Imprimer / PDF",
  saveBtn: "Enregistrer",
  savedBtn: "Enregistré",
  shareSuccessMsg: "Lien de partage copié dans le presse-papiers !",

  // Input Card
  inputsTitle: "Données du Prêt",
  inputsSubtitle: "Modifiez les valeurs et cliquez sur Calculer",
  loanAmount: "Montant du Prêt ($)",
  loanTermYears: "Durée du Prêt (Années)",
  loanTermMonths: "Durée du Prêt (Mois)",
  interestRate: "Taux d'Intérêt Annuel (%)",
  startMonth: "Mois de Début",
  startYear: "Année de Début",
  monthOptions: [
    { value: 1, label: "Janv" },
    { value: 2, label: "Févr" },
    { value: 3, label: "Mars" },
    { value: 4, label: "Avr" },
    { value: 5, label: "Mai" },
    { value: 6, label: "Juin" },
    { value: 7, label: "Juil" },
    { value: 8, label: "Août" },
    { value: 9, label: "Sept" },
    { value: 10, label: "Oct" },
    { value: 11, label: "Nov" },
    { value: 12, label: "Déc" },
  ],
  fullMonthNames: [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
  ],

  // Extra Payments
  optionalExtraPayments: "Optionnel : effectuer des versements supplémentaires",
  extraMonthlyPayment: "Remboursement Mensuel Extra ($)",
  extraYearlyPayment: "Remboursement Annuel Extra ($)",
  extraOneTimePayment: "Remboursement Ponctuel Extra ($)",
  extraStartMonth: "Mois de Début Extra",
  extraStartYear: "Année de Début Extra",

  // Actions & Validation
  calculateBtn: "Calculer",
  clearBtn: "Effacer",
  validationErrorAmount: "Le montant du prêt doit être supérieur à 0 $.",
  validationErrorRate: "Le taux d'intérêt doit être compris entre 0 % et 100 %.",
  validationErrorTerm: "La durée du prêt doit être supérieure à 0.",
  validationErrorMaxTerm: "La durée maximale autorisée est de 50 ans.",

  // Results
  monthlyPaymentTitle: "Mensualité du Prêt",
  totalPaymentsCount: "Nombre de Mensualités",
  paymentsLabel: "mensualités",
  totalPrincipal: "Capital Total",
  totalInterest: "Intérêts Totaux",
  totalAmountPaid: "Montant Total Remboursé",
  loanPayoffDate: "Date de Fin du Prêt",
  interestSaved: "Intérêts Économisés",

  // Comparison
  comparisonTitle: "Comparaison : Prêt Initial vs. Prêt avec Versements Extras",
  originalInterestVsNew: "Intérêts Initiaux vs. Nouveaux Intérêts",
  savedLabel: "Économie",
  originalPayoffVsNew: "Date Finale Initiale vs. Nouvelle Date",
  timeSavedLabel: "Temps Économisé",
  yearsLabel: "Ans",
  monthsLabel: "Mois",

  // Visual Charts
  chartsTitle: "Graphiques Visuels et Répartition",
  tabBreakdown: "Graphique 1 : Répartition",
  tabProgress: "Graphique 2 : Évolution",
  loadingPieChart: "Chargement du graphique circulaire...",
  loadingProgressChart: "Chargement du graphique d'évolution...",

  // Schedule Table
  scheduleTitle: "Tableau d'Amortissement",
  scheduleSubtitle:
    "Tableaux d'échéancier annuel et mensuel avec recherche, tri, pagination et export CSV / Excel / PDF",
  annualTab: "Échéancier Annuel",
  monthlyTab: "Échéancier Mensuel",
  searchYearPlaceholder: "Rechercher une année...",
  searchPaymentPlaceholder: "Rechercher une échéance ou date...",
  exportCsvBtn: "Exporter CSV",
  exportExcelBtn: "Excel",
  yearCol: "Année",
  paymentNumberCol: "N° Échéance",
  paymentDateCol: "Date d'Échéance",
  beginningBalanceCol: "Solde Initial",
  paymentAmountCol: "Mensualité",
  principalPaidCol: "Capital Amorti",
  interestPaidCol: "Intérêts",
  extraPaidCol: "Paiement Extra",
  endingBalanceCol: "Solde Restant",
  prevPage: "Préc",
  nextPage: "Suiv",
  pageOf: "Page",
  showingRecords: "Affichage",

  // Save Modal
  saveModalTitle: "Enregistrer le Calcul",
  saveModalSubtitle: "Enregistrez vos paramètres d'amortissement localement pour les restaurer plus tard",
  calcSummaryLabel: "Résumé du Calcul",
  monthlyPaySummary: "Mensualité",
  saveNameLabel: "Nom du Calcul",
  saveNamePlaceholder: "Ex. Prêt Immobilier 15 Ans",
  cancelBtn: "Annuler",
  confirmSaveBtn: "Enregistrer",
  saveSuccessMsg: "Calcul enregistré avec succès !",
  savedCalculationsTitle: "Calculs Enregistrés",
  restoreBtn: "Restaurer",
  deleteBtnTitle: "Supprimer le calcul enregistré",
};

export const AMORTIZATION_DE_OVERLAY: AmortizationLocaleOverlay = {
  locale: "de",
  title: "Tilgungsrechner — Tilgungsplan & Darlehensberechnung",
  description:
    "Berechnen Sie Monatsraten, Aufteilung in Zins und Tilgung, Tilgungsplan, Restschuld, Rückzahlungsdatum und Zinsersparnis durch Sondertilgungen.",

  // Action Bar
  managerTitle: "Tilgungs-Manager",
  savedCountBadge: "Gespeichert",
  printPdfBtn: "Drucken / PDF",
  saveBtn: "Speichern",
  savedBtn: "Gespeichert",
  shareSuccessMsg: "Link in die Zwischenablage kopiert!",

  // Input Card
  inputsTitle: "Kreditdaten",
  inputsSubtitle: "Werte anpassen und auf Berechnen klicken",
  loanAmount: "Darlehensbetrag ($)",
  loanTermYears: "Laufzeit (Jahre)",
  loanTermMonths: "Laufzeit (Monate)",
  interestRate: "Sollzins p.a. (%)",
  startMonth: "Startmonat",
  startYear: "Startjahr",
  monthOptions: [
    { value: 1, label: "Jan" },
    { value: 2, label: "Feb" },
    { value: 3, label: "Mär" },
    { value: 4, label: "Apr" },
    { value: 5, label: "Mai" },
    { value: 6, label: "Jun" },
    { value: 7, label: "Jul" },
    { value: 8, label: "Aug" },
    { value: 9, label: "Sep" },
    { value: 10, label: "Okt" },
    { value: 11, label: "Nov" },
    { value: 12, label: "Dez" },
  ],
  fullMonthNames: [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember",
  ],

  // Extra Payments
  optionalExtraPayments: "Optional: Sondertilgungen vornehmen",
  extraMonthlyPayment: "Monatliche Sondertilgung ($)",
  extraYearlyPayment: "Jährliche Sondertilgung ($)",
  extraOneTimePayment: "Einmalige Sondertilgung ($)",
  extraStartMonth: "Startmonat Sondertilgung",
  extraStartYear: "Startjahr Sondertilgung",

  // Actions & Validation
  calculateBtn: "Berechnen",
  clearBtn: "Zurücksetzen",
  validationErrorAmount: "Der Darlehensbetrag muss größer als 0 $ sein.",
  validationErrorRate: "Der Zinssatz muss zwischen 0 % und 100 % liegen.",
  validationErrorTerm: "Die Laufzeit muss größer als 0 sein.",
  validationErrorMaxTerm: "Die maximale Laufzeit beträgt 50 Jahre.",

  // Results
  monthlyPaymentTitle: "Monatliche Kreditrate",
  totalPaymentsCount: "Gesamtzahl der Raten",
  paymentsLabel: "Raten",
  totalPrincipal: "Gesamte Tilgung",
  totalInterest: "Gesamtzinsen",
  totalAmountPaid: "Gesamtrückzahlung",
  loanPayoffDate: "Schuldenfrei am",
  interestSaved: "Zinsersparnis",

  // Comparison
  comparisonTitle: "Vergleich: Ursprünglicher Kredit vs. Mit Sondertilgungen",
  originalInterestVsNew: "Ursprüngliche Zinsen vs. Neue Zinsen",
  savedLabel: "Gespart",
  originalPayoffVsNew: "Ursprüngliches vs. Neues Tilgungsdatum",
  timeSavedLabel: "Zeitersparnis",
  yearsLabel: "Jahre",
  monthsLabel: "Monate",

  // Visual Charts
  chartsTitle: "Visuelle Diagramme & Darlehensaufteilung",
  tabBreakdown: "Diagramm 1: Aufteilung",
  tabProgress: "Diagramm 2: Verlauf",
  loadingPieChart: "Kreisdiagramm wird geladen...",
  loadingProgressChart: "Verlaufsdiagramm wird geladen...",

  // Schedule Table
  scheduleTitle: "Tilgungsplan",
  scheduleSubtitle:
    "Jährliche und monatliche Tilgungsübersicht mit Suche, Sortierung, Paginierung und CSV / Excel / PDF Export",
  annualTab: "Jährlicher Tilgungsplan",
  monthlyTab: "Monatlicher Tilgungsplan",
  searchYearPlaceholder: "Jahr suchen...",
  searchPaymentPlaceholder: "Rate oder Datum suchen...",
  exportCsvBtn: "CSV Export",
  exportExcelBtn: "Excel",
  yearCol: "Jahr",
  paymentNumberCol: "Rate #",
  paymentDateCol: "Fälligkeitsdatum",
  beginningBalanceCol: "Anfangssaldo",
  paymentAmountCol: "Ratenbetrag",
  principalPaidCol: "Tilgungsanteil",
  interestPaidCol: "Zinsanteil",
  extraPaidCol: "Sondertilgung",
  endingBalanceCol: "Restschuld",
  prevPage: "Zurück",
  nextPage: "Weiter",
  pageOf: "Seite",
  showingRecords: "Zeige",

  // Save Modal
  saveModalTitle: "Berechnung Speichern",
  saveModalSubtitle: "Speichern Sie Ihre Tilgungsberechnung lokal für später",
  calcSummaryLabel: "Berechnungsübersicht",
  monthlyPaySummary: "Monatsrate",
  saveNameLabel: "Name der Berechnung",
  saveNamePlaceholder: "z.B. 15-Jahre Baufinanzierung",
  cancelBtn: "Abbrechen",
  confirmSaveBtn: "Speichern",
  saveSuccessMsg: "Berechnung erfolgreich gespeichert!",
  savedCalculationsTitle: "Gespeicherte Berechnungen",
  restoreBtn: "Laden",
  deleteBtnTitle: "Gespeicherte Berechnung löschen",
};

export const AMORTIZATION_HI_OVERLAY: AmortizationLocaleOverlay = {
  locale: "hi",
  title: "परिशोधन कैलकुलेटर — ऋण व ईएमआई भुगतान अनुसूची",
  description:
    "मासिक किस्त (EMI), मूलधन और ब्याज का विभाजन, परिशोधन तालिका, ऋण समाप्ति तिथि और अतिरिक्त भुगतान से ब्याज बचत की गणना करें।",

  // Action Bar
  managerTitle: "परिशोधन प्रबंधक",
  savedCountBadge: "सहेजे गए",
  printPdfBtn: "प्रिंट / पीडीएफ",
  saveBtn: "सहेजें",
  savedBtn: "सहेजा गया",
  shareSuccessMsg: "शेयर करने योग्य लिंक क्लिपबोर्ड पर कॉपी हो गया!",

  // Input Card
  inputsTitle: "ऋण इनपुट",
  inputsSubtitle: "मान बदलें और गणना करने के लिए बटन पर क्लिक करें",
  loanAmount: "ऋण राशि ($)",
  loanTermYears: "ऋण अवधि (वर्ष)",
  loanTermMonths: "ऋण अवधि (माह)",
  interestRate: "वार्षिक ब्याज दर (%)",
  startMonth: "प्रारंभ माह",
  startYear: "प्रारंभ वर्ष",
  monthOptions: [
    { value: 1, label: "जन" },
    { value: 2, label: "फ़र" },
    { value: 3, label: "मार्च" },
    { value: 4, label: "अप्रै" },
    { value: 5, label: "मई" },
    { value: 6, label: "जून" },
    { value: 7, label: "जुला" },
    { value: 8, label: "अग" },
    { value: 9, label: "सित" },
    { value: 10, label: "अक्टू" },
    { value: 11, label: "नव" },
    { value: 12, label: "दिस" },
  ],
  fullMonthNames: [
    "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
    "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
  ],

  // Extra Payments
  optionalExtraPayments: "वैकल्पिक: अतिरिक्त भुगतान जोड़ें",
  extraMonthlyPayment: "अतिरिक्त मासिक भुगतान ($)",
  extraYearlyPayment: "अतिरिक्त वार्षिक भुगतान ($)",
  extraOneTimePayment: "एकमुश्त अतिरिक्त भुगतान ($)",
  extraStartMonth: "अतिरिक्त प्रारंभ माह",
  extraStartYear: "अतिरिक्त प्रारंभ वर्ष",

  // Actions & Validation
  calculateBtn: "गणना करें",
  clearBtn: "रीसेट करें",
  validationErrorAmount: "ऋण राशि $0 से अधिक होनी चाहिए।",
  validationErrorRate: "ब्याज दर 0% और 100% के बीच होनी चाहिए।",
  validationErrorTerm: "ऋण अवधि 0 से अधिक होनी चाहिए।",
  validationErrorMaxTerm: "अधिकतम समर्थित ऋण अवधि 50 वर्ष है।",

  // Results
  monthlyPaymentTitle: "मासिक ऋण भुगतान (EMI)",
  totalPaymentsCount: "कुल किस्तों की संख्या",
  paymentsLabel: "किस्तें",
  totalPrincipal: "कुल मूलधन",
  totalInterest: "कुल ब्याज",
  totalAmountPaid: "कुल भुगतान राशि",
  loanPayoffDate: "ऋण मुक्ति तिथि",
  interestSaved: "ब्याज की बचत",

  // Comparison
  comparisonTitle: "तुलना: मूल ऋण बनाम अतिरिक्त भुगतान ऋण",
  originalInterestVsNew: "मूल ब्याज बनाम नया ब्याज",
  savedLabel: "बचत",
  originalPayoffVsNew: "मूल ऋण मुक्ति तिथि बनाम नई तिथि",
  timeSavedLabel: "समय की बचत",
  yearsLabel: "वर्ष",
  monthsLabel: "माह",

  // Visual Charts
  chartsTitle: "दृश्य चार्ट और ऋण विभाजन",
  tabBreakdown: "चार्ट 1: विभाजन",
  tabProgress: "चार्ट 2: प्रगति",
  loadingPieChart: "पाई चार्ट लोड हो रहा है...",
  loadingProgressChart: "प्रगति चार्ट लोड हो रहा है...",

  // Schedule Table
  scheduleTitle: "ऋण परिशोधन अनुसूची (Amortization Schedule)",
  scheduleSubtitle:
    "खोज, सॉर्टिंग, पेजिनेशन और CSV / Excel / PDF निर्यात के साथ वार्षिक और मासिक तालिका",
  annualTab: "वार्षिक अनुसूची",
  monthlyTab: "मासिक अनुसूची",
  searchYearPlaceholder: "वर्ष खोजें...",
  searchPaymentPlaceholder: "किस्त या तिथि खोजें...",
  exportCsvBtn: "CSV निर्यात",
  exportExcelBtn: "Excel",
  yearCol: "वर्ष",
  paymentNumberCol: "किस्त #",
  paymentDateCol: "भुगतान तिथि",
  beginningBalanceCol: "प्रारंभिक शेष",
  paymentAmountCol: "किस्त राशि",
  principalPaidCol: "मूलधन",
  interestPaidCol: "ब्याज",
  extraPaidCol: "अतिरिक्त भुगतान",
  endingBalanceCol: "अंतिम शेष",
  prevPage: "पिछला",
  nextPage: "अगला",
  pageOf: "पृष्ठ",
  showingRecords: "प्रदर्शित",

  // Save Modal
  saveModalTitle: "गणना सहेजें",
  saveModalSubtitle: "बाद में पुनर्स्थापित करने के लिए अपनी परिशोधन गणना को स्थानीय रूप से सहेजें",
  calcSummaryLabel: "गणना सारांश",
  monthlyPaySummary: "मासिक भुगतान",
  saveNameLabel: "गणना का नाम",
  saveNamePlaceholder: "उदा. 15-वर्षीय ऋण सेटअप",
  cancelBtn: "रद्द करें",
  confirmSaveBtn: "सहेजें",
  saveSuccessMsg: "गणना सफलतापूर्वक सहेजी गई!",
  savedCalculationsTitle: "सहेजे गए ऋण विवरण",
  restoreBtn: "पुनर्स्थापित करें",
  deleteBtnTitle: "सहेजी गई गणना हटाएं",
};

export const AMORTIZATION_PT_OVERLAY: AmortizationLocaleOverlay = {
  locale: "pt",
  title: "Calculadora de Amortização — Tabela e Calendário de Pagamentos",
  description:
    "Calcule parcelas mensais, divisão entre principal e juros, tabela de amortização, data de quitação e economia com amortizações extraordinárias.",

  // Action Bar
  managerTitle: "Gestor de Amortização",
  savedCountBadge: "Salvos",
  printPdfBtn: "Imprimir / PDF",
  saveBtn: "Salvar",
  savedBtn: "Salvo",
  shareSuccessMsg: "Link copiado para a área de transferência!",

  // Input Card
  inputsTitle: "Dados do Empréstimo",
  inputsSubtitle: "Ajuste os valores e clique no botão Calcular",
  loanAmount: "Valor do Empréstimo ($)",
  loanTermYears: "Prazo (Anos)",
  loanTermMonths: "Prazo (Meses)",
  interestRate: "Taxa de Juros Anual (%)",
  startMonth: "Mês Inicial",
  startYear: "Ano Inicial",
  monthOptions: [
    { value: 1, label: "Jan" },
    { value: 2, label: "Fev" },
    { value: 3, label: "Mar" },
    { value: 4, label: "Abr" },
    { value: 5, label: "Mai" },
    { value: 6, label: "Jun" },
    { value: 7, label: "Jul" },
    { value: 8, label: "Ago" },
    { value: 9, label: "Set" },
    { value: 10, label: "Out" },
    { value: 11, label: "Nov" },
    { value: 12, label: "Dez" },
  ],
  fullMonthNames: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ],

  // Extra Payments
  optionalExtraPayments: "Opcional: realizar amortizações extras",
  extraMonthlyPayment: "Amortização Mensal Extra ($)",
  extraYearlyPayment: "Amortização Anual Extra ($)",
  extraOneTimePayment: "Amortização Única Extra ($)",
  extraStartMonth: "Mês de Início Extra",
  extraStartYear: "Ano de Início Extra",

  // Actions & Validation
  calculateBtn: "Calcular",
  clearBtn: "Limpar",
  validationErrorAmount: "O valor do empréstimo deve ser superior a $0.",
  validationErrorRate: "A taxa de juros deve estar entre 0% e 100%.",
  validationErrorTerm: "O prazo do empréstimo deve ser superior a 0.",
  validationErrorMaxTerm: "O prazo máximo suportado é de 50 anos.",

  // Results
  monthlyPaymentTitle: "Parcela Mensal do Empréstimo",
  totalPaymentsCount: "Total de Parcelas",
  paymentsLabel: "parcelas",
  totalPrincipal: "Principal Total",
  totalInterest: "Juros Totais",
  totalAmountPaid: "Total Pago",
  loanPayoffDate: "Data de Quitação",
  interestSaved: "Juros Economizados",

  // Comparison
  comparisonTitle: "Comparação: Empréstimo Original vs. Com Amortizações Extras",
  originalInterestVsNew: "Juros Originais vs. Novos Juros",
  savedLabel: "Economia",
  originalPayoffVsNew: "Data Original vs. Nova Data de Quitação",
  timeSavedLabel: "Tempo Economizado",
  yearsLabel: "Anos",
  monthsLabel: "Meses",

  // Visual Charts
  chartsTitle: "Gráficos Visuais e Composição",
  tabBreakdown: "Gráfico 1: Composição",
  tabProgress: "Gráfico 2: Evolução",
  loadingPieChart: "Carregando gráfico de pizza...",
  loadingProgressChart: "Carregando gráfico de evolução...",

  // Schedule Table
  scheduleTitle: "Tabela de Amortização",
  scheduleSubtitle:
    "Tabelas de evolução anual e mensal com busca, ordenação, paginação e exportação em CSV / Excel / PDF",
  annualTab: "Tabela Anual",
  monthlyTab: "Tabela Mensal",
  searchYearPlaceholder: "Buscar ano...",
  searchPaymentPlaceholder: "Buscar parcela ou data...",
  exportCsvBtn: "Exportar CSV",
  exportExcelBtn: "Excel",
  yearCol: "Ano",
  paymentNumberCol: "Nº Parcela",
  paymentDateCol: "Data de Vencimento",
  beginningBalanceCol: "Saldo Devedor Inicial",
  paymentAmountCol: "Valor da Parcela",
  principalPaidCol: "Amortização (Principal)",
  interestPaidCol: "Juros",
  extraPaidCol: "Pagamento Extra",
  endingBalanceCol: "Saldo Devedor Final",
  prevPage: "Ant",
  nextPage: "Próx",
  pageOf: "Página",
  showingRecords: "Exibindo",

  // Save Modal
  saveModalTitle: "Salvar Cálculo",
  saveModalSubtitle: "Salve sua simulação de amortização localmente para consultar mais tarde",
  calcSummaryLabel: "Resumo do Cálculo",
  monthlyPaySummary: "Parcela Mensal",
  saveNameLabel: "Nome da Simulação",
  saveNamePlaceholder: "Ex. Financiamento 15 Anos",
  cancelBtn: "Cancelar",
  confirmSaveBtn: "Salvar",
  saveSuccessMsg: "Cálculo salvo com sucesso!",
  savedCalculationsTitle: "Simulações Salvas",
  restoreBtn: "Restaurar",
  deleteBtnTitle: "Excluir cálculo salvo",
};

export function getAmortizationOverlay(locale: string): AmortizationLocaleOverlay {
  switch (locale) {
    case "es":
      return AMORTIZATION_ES_OVERLAY;
    case "fr":
      return AMORTIZATION_FR_OVERLAY;
    case "de":
      return AMORTIZATION_DE_OVERLAY;
    case "hi":
      return AMORTIZATION_HI_OVERLAY;
    case "pt":
      return AMORTIZATION_PT_OVERLAY;
    case "en":
    default:
      return AMORTIZATION_EN_OVERLAY;
  }
}
