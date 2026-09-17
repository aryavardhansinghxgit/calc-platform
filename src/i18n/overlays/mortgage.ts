import { MortgageLocaleOverlay } from "../types";

export const MORTGAGE_EN_OVERLAY: MortgageLocaleOverlay = {
  locale: "en",
  title: "Mortgage Calculator",
  description: "Calculate your monthly mortgage payment including principal and interest, property taxes, homeowners insurance, PMI, and HOA fees with full amortization schedules.",
  // Action bar
  managerTitle: "Mortgage Calculation Manager",
  savedCountBadge: "Saved",
  clearBtn: "Clear",
  printPdfBtn: "Print / PDF",
  saveBtn: "Save",
  savedBtn: "Saved!",

  // Basic loan details
  inputsTitle: "Mortgage Inputs",
  inputsSubtitle: "Modify values to recalculate payments instantly",
  basicLoanDetails: "Basic Loan Details",
  homePrice: "Home Price ($)",
  downPayment: "Down Payment",
  amountBtn: "$ Amount",
  percentBtn: "% Percent",
  calculatedDownPayment: "Calculated",
  loanLabel: "Loan",
  loanTermYears: "Loan Term (Years)",
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

  // Taxes & Insurance collapsible
  includeTaxesAndFees: "Include Taxes & Fees",
  propertyTaxes: "Property Taxes",
  homeInsurance: "Home Insurance ($/yr)",
  pmiInsurance: "PMI Insurance (%/yr)",
  hoaFee: "HOA Fee ($/mo)",
  otherCosts: "Other Costs ($/yr)",

  // Annual cost increase collapsible
  annualIncreaseTitle: "Annual Tax & Cost Increase (%)",
  annualIncreaseSubtitle: "Model estimated inflation on non-loan expenses",
  propertyTaxIncrease: "Property Tax Increase %",
  insuranceIncrease: "Home Insurance Increase %",
  hoaIncrease: "HOA Fee Increase %",
  otherCostsIncrease: "Other Costs Increase %",

  // Extra payments collapsible
  extraPaymentsTitle: "Extra Principal Payments",
  extraPaymentsSubtitle: "Accelerate debt reduction and eliminate compounding interest",
  monthlyExtraPayment: "Extra Monthly Pay",
  yearlyExtraPayment: "Extra Yearly Pay",
  fromMonth: "from",
  inMonth: "in",
  oneTimePaymentsTitle: "Extra One-Time Payments",
  addPaymentRow: "Add Payment Row",
  amountHeader: "Amount ($)",
  monthHeader: "Month",
  yearHeader: "Year",
  actionHeader: "Action",

  // Biweekly toggle
  biweeklyTitle: "Biweekly Payment Option",
  biweeklySubtitle: "Pay half of monthly P&I every two weeks (26 half-payments/yr)",
  enableBiweekly: "Show Biweekly Payback Results",
  biweeklySummary: "Biweekly Payback Results Summary",
  payPeriodsYear: "26 Pay Periods / Yr",
  biweeklyPayment: "Biweekly Payment",
  biweeklyPayoffDate: "Biweekly Payoff Date",
  biweeklyTotalInterest: "Biweekly Total Interest",

  // KPI & Results Summary
  paymentBreakdown: "Payment Breakdown",
  totalMonthlyPayment: "Total Estimated Monthly Payment",
  principalAndInterest: "P&I Base",
  propertyTax: "Property Tax",
  homeInsuranceLabel: "Home Insurance",
  pmi: "PMI",
  hoaFeeLabel: "HOA Fee",
  otherCostsLabel: "Other Costs",
  extraPayment: "Extra Payment",

  loanPayoffSummary: "Loan Payoff Summary",
  loanAmount: "Loan Amount",
  payoffDateLabel: "Payoff Date",
  totalInterestLabel: "Total Interest",
  totalCostLabel: "Total Cost of Loan",
  interestSavedLabel: "Interest Savings",
  timeSavedLabel: "Time Saved",

  // Extra payments impact banner
  extraPaymentsImpact: "Extra Payments Impact:",
  saves: "Saves",
  inInterestPaysOff: "in interest & pays off",
  monthsEarly: "months early!",

  // Charts
  chartsTitle: "Visual Analytics & Charts",
  tabDoughnut: "Doughnut",
  tabBalance: "Balance Line",
  tabArea: "Principal vs Interest",
  loadingChart: "Loading chart...",

  // Breakdown Table
  monthlyVsTotalBreakdown: "Monthly vs. Total Lifetime Cost Breakdown",
  categoryCol: "Category",
  monthlyYear1Col: "Monthly (Year 1)",
  lifetimeTotalCol: "Lifetime Total",
  pctTotalCostCol: "% of Total Cost",
  totalOutOfPocket: "Total Out of Pocket",

  // Amortization Table
  amortizationScheduleTitle: "Mortgage Amortization Schedule",
  amortizationSubtitle: "Full breakdown of payments, principal reduction, interest, and remaining balance over time",
  annualSummaryTab: "Annual Summary",
  monthlyScheduleTab: "Monthly Schedule",
  biweeklyScheduleTab: "Biweekly Schedule",
  searchSchedulePlaceholder: "Search schedule...",
  downloadCsv: "Download CSV",
  yearCol: "Year",
  periodCol: "Period",
  dateRangeCol: "Date Range",
  paymentCol: "Payment",
  principalCol: "Principal",
  interestCol: "Interest",
  extraCol: "Extra",
  taxesInsCol: "Taxes & Ins.",
  pmiFeesCol: "PMI & Fees",
  balanceCol: "Balance",
  prevPage: "Previous",
  nextPage: "Next",
  pageOf: "Page",
  showingRecords: "Showing",

  // Modals & Storage
  saveModalTitle: "Save",
  saveModalSubtitle: "Please provide a name and description to save it to your account (up to 100 calculations)",
  calcSummaryLabel: "Current Calculation Summary:",
  monthlyPayLabel: "Monthly Pay:",
  saveModalNameLabel: "Name (optional)",
  saveModalDescLabel: "Description (optional)",
  saveModalNamePlaceholder: "e.g. Primary Residence 30yr",
  saveModalDescPlaceholder: "e.g. Comparing 20% down vs 10% down options",
  cancelBtn: "Cancel",
  resetBtn: "Reset",
  confirmSaveBtn: "Save",
  saveSuccessMsg: "Calculation saved successfully!",
  savedLibraryTitle: "Saved Calculations",
  noSavedCalculations: "No saved calculations found.",
  loadBtn: "Load",
  deleteBtn: "Delete",
  clearAllSavedBtn: "Clear",
};

export const MORTGAGE_ES_OVERLAY: MortgageLocaleOverlay = {
  locale: "es",
  title: "Calculadora de Hipoteca – Analizador de Pagos y Amortización",
  description: "Calcule sus pagos mensuales de hipoteca (capital e intereses), impuestos sobre la propiedad, seguro de vivienda, PMI y cuotas de HOA con tabla de amortización detallada.",
  // Action bar
  managerTitle: "Gestor de Cálculo de Hipoteca",
  savedCountBadge: "Guardados",
  clearBtn: "Borrar",
  printPdfBtn: "Imprimir / PDF",
  saveBtn: "Guardar",
  savedBtn: "¡Guardado!",

  // Basic loan details
  inputsTitle: "Datos de la Hipoteca",
  inputsSubtitle: "Modifique los valores para recalcular los pagos al instante",
  basicLoanDetails: "Detalles Básicos del Préstamo",
  homePrice: "Precio de la Vivienda ($)",
  downPayment: "Pago Inicial",
  amountBtn: "$ Monto",
  percentBtn: "% Porcentaje",
  calculatedDownPayment: "Calculado",
  loanLabel: "Préstamo",
  loanTermYears: "Plazo del Préstamo (Años)",
  interestRate: "Tasa de Interés (%)",
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

  // Taxes & Insurance collapsible
  includeTaxesAndFees: "Incluir Impuestos y Tarifas",
  propertyTaxes: "Impuestos sobre la Propiedad",
  homeInsurance: "Seguro de Vivienda ($/año)",
  pmiInsurance: "Seguro PMI (%/año)",
  hoaFee: "Cuota de HOA ($/mes)",
  otherCosts: "Otros Costos ($/año)",

  // Annual cost increase collapsible
  annualIncreaseTitle: "Aumento Anual de Impuestos y Costos (%)",
  annualIncreaseSubtitle: "Estime la inflación en gastos ajenos al préstamo",
  propertyTaxIncrease: "Aumento del Impuesto sobre la Propiedad %",
  insuranceIncrease: "Aumento del Seguro de Vivienda %",
  hoaIncrease: "Aumento de Cuota de HOA %",
  otherCostsIncrease: "Aumento de Otros Costos %",

  // Extra payments collapsible
  extraPaymentsTitle: "Pagos Extraordinarios a Capital",
  extraPaymentsSubtitle: "Acelere la reducción de la deuda y elimine el interés compuesto",
  monthlyExtraPayment: "Pago Extra Mensual",
  yearlyExtraPayment: "Pago Extra Anual",
  fromMonth: "desde",
  inMonth: "en",
  oneTimePaymentsTitle: "Pagos Únicos Extraordinarios",
  addPaymentRow: "Añadir Fila de Pago",
  amountHeader: "Monto ($)",
  monthHeader: "Mes",
  yearHeader: "Año",
  actionHeader: "Acción",

  // Biweekly toggle
  biweeklyTitle: "Opción de Pago Quincenal",
  biweeklySubtitle: "Pague la mitad del pago mensual de capital e intereses cada dos semanas (26 medios pagos al año)",
  enableBiweekly: "Mostrar Resultados de Pago Quincenal",
  biweeklySummary: "Resumen de Resultados de Pago Quincenal",
  payPeriodsYear: "26 Períodos de Pago / Año",
  biweeklyPayment: "Pago Quincenal",
  biweeklyPayoffDate: "Fecha de Liquidación Quincenal",
  biweeklyTotalInterest: "Interés Total Quincenal",

  // KPI & Results Summary
  paymentBreakdown: "Desglose de Pagos",
  totalMonthlyPayment: "Pago Mensual Total Estimado",
  principalAndInterest: "Base de Capital e Intereses",
  propertyTax: "Impuesto sobre la Propiedad",
  homeInsuranceLabel: "Seguro de Vivienda",
  pmi: "PMI",
  hoaFeeLabel: "Cuota de HOA",
  otherCostsLabel: "Otros Costos",
  extraPayment: "Pago Extraordinario",

  loanPayoffSummary: "Resumen de Liquidación del Préstamo",
  loanAmount: "Monto del Préstamo",
  payoffDateLabel: "Fecha de Liquidación",
  totalInterestLabel: "Interés Total",
  totalCostLabel: "Costo Total del Préstamo",
  interestSavedLabel: "Ahorro en Intereses",
  timeSavedLabel: "Tiempo Ahorrado",

  // Extra payments impact banner
  extraPaymentsImpact: "Impacto de los Pagos Extraordinarios:",
  saves: "Ahorra",
  inInterestPaysOff: "en intereses y liquida",
  monthsEarly: "meses antes!",

  // Charts
  chartsTitle: "Análisis Visual y Gráficos",
  tabDoughnut: "Donut",
  tabBalance: "Línea de Saldo",
  tabArea: "Capital vs. Interés",
  loadingChart: "Cargando gráfico...",

  // Breakdown Table
  monthlyVsTotalBreakdown: "Desglose de Costo Mensual vs. Total a lo Largo del Plazo",
  categoryCol: "Categoría",
  monthlyYear1Col: "Mensual (Año 1)",
  lifetimeTotalCol: "Total a lo Largo del Plazo",
  pctTotalCostCol: "% del Costo Total",
  totalOutOfPocket: "Total Pagado de su Bolsillo",

  // Amortization Table
  amortizationScheduleTitle: "Tabla de Amortización de la Hipoteca",
  amortizationSubtitle: "Desglose completo de pagos, reducción de capital, intereses y saldo pendiente a lo largo del tiempo",
  annualSummaryTab: "Resumen Anual",
  monthlyScheduleTab: "Calendario Mensual",
  biweeklyScheduleTab: "Calendario Quincenal",
  searchSchedulePlaceholder: "Buscar en el calendario...",
  downloadCsv: "Descargar CSV",
  yearCol: "Año",
  periodCol: "Período",
  dateRangeCol: "Rango de Fechas",
  paymentCol: "Pago",
  principalCol: "Capital",
  interestCol: "Interés",
  extraCol: "Extra",
  taxesInsCol: "Impuestos y Seguro",
  pmiFeesCol: "PMI y Tarifas",
  balanceCol: "Saldo",
  prevPage: "Anterior",
  nextPage: "Siguiente",
  pageOf: "Página",
  showingRecords: "Mostrando",

  // Modals & Storage
  saveModalTitle: "Guardar",
  saveModalSubtitle: "Proporcione un nombre y descripción para guardarlo en su cuenta (hasta 100 cálculos)",
  calcSummaryLabel: "Resumen del Cálculo Actual:",
  monthlyPayLabel: "Pago Mensual:",
  saveModalNameLabel: "Nombre (opcional)",
  saveModalDescLabel: "Descripción (opcional)",
  saveModalNamePlaceholder: "ej. Residencia Principal 30 años",
  saveModalDescPlaceholder: "ej. Comparando opciones de 20% vs 10% de pago inicial",
  cancelBtn: "Cancelar",
  resetBtn: "Restablecer",
  confirmSaveBtn: "Guardar",
  saveSuccessMsg: "¡Cálculo guardado con éxito!",
  savedLibraryTitle: "Cálculos Guardados",
  noSavedCalculations: "No se encontraron cálculos guardados.",
  loadBtn: "Cargar",
  deleteBtn: "Eliminar",
  clearAllSavedBtn: "Borrar Todo",
};

/**
 * Returns the immutable locale overlay for mortgage calculator.
 * Supports English ("en") and Spanish ("es").
 * Defaults safely to English if requested locale is unrecognized.
 */
export function getMortgageOverlay(locale?: string): MortgageLocaleOverlay {
  if (locale === "es") {
    return MORTGAGE_ES_OVERLAY;
  }
  return MORTGAGE_EN_OVERLAY;
}
