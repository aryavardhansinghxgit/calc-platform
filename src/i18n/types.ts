/**
 * Multilingual Platform Type System & Contracts
 */

export const SUPPORTED_LOCALES = ["en", "es", "fr", "de", "hi", "pt"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type SupportedLocale = Locale;

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorLocalizedContent {
  slug?: string;
  calculatorSlug?: string;
  locale?: Locale | string;
  seo: {
    title: string;
    description: string;
    shortDescription?: string;
  };
  faqs: FAQItem[];
  ContentComponent: React.ComponentType<any>;
}

export type PublishingStatus = "DRAFT" | "TRANSLATING" | "REVIEW" | "PUBLISHED";

export interface LocalePublishingMetadata {
  locale: Locale;
  calculatorSlug: string;
  uiStatus: PublishingStatus;
  contentStatus: PublishingStatus;
  seoStatus: PublishingStatus;
  isPublished: boolean;
  publishedAt?: string;
  lastUpdated?: string;
}

export interface MortgageLocaleOverlay {
  locale: Locale;
  title?: string;
  description?: string;
  // Action bar
  managerTitle: string;
  savedCountBadge: string;
  clearBtn: string;
  printPdfBtn: string;
  saveBtn: string;
  savedBtn: string;

  // Basic loan details
  inputsTitle: string;
  inputsSubtitle: string;
  basicLoanDetails: string;
  homePrice: string;
  downPayment: string;
  amountBtn: string;
  percentBtn: string;
  calculatedDownPayment: string;
  loanLabel: string;
  loanTermYears: string;
  interestRate: string;
  startMonth: string;
  startYear: string;
  monthOptions: Array<{ value: number; label: string }>;

  // Taxes & Insurance collapsible
  includeTaxesAndFees: string;
  propertyTaxes: string;
  homeInsurance: string;
  pmiInsurance: string;
  hoaFee: string;
  otherCosts: string;

  // Annual cost increase collapsible
  annualIncreaseTitle: string;
  annualIncreaseSubtitle?: string;
  propertyTaxIncrease: string;
  insuranceIncrease: string;
  hoaIncrease: string;
  otherCostsIncrease: string;

  // Extra payments collapsible
  extraPaymentsTitle: string;
  extraPaymentsSubtitle?: string;
  monthlyExtraPayment: string;
  yearlyExtraPayment: string;
  fromMonth: string;
  inMonth: string;
  oneTimePaymentsTitle: string;
  addPaymentRow: string;
  amountHeader: string;
  monthHeader: string;
  yearHeader: string;
  actionHeader: string;

  // Biweekly toggle
  biweeklyTitle: string;
  biweeklySubtitle?: string;
  enableBiweekly: string;
  biweeklySummary: string;
  payPeriodsYear: string;
  biweeklyPayment: string;
  biweeklyPayoffDate: string;
  biweeklyTotalInterest: string;

  // KPI & Results Summary
  paymentBreakdown: string;
  totalMonthlyPayment: string;
  principalAndInterest: string;
  propertyTax: string;
  homeInsuranceLabel: string;
  pmi: string;
  hoaFeeLabel: string;
  otherCostsLabel: string;
  extraPayment: string;

  loanPayoffSummary: string;
  loanAmount: string;
  payoffDateLabel: string;
  totalInterestLabel: string;
  totalCostLabel: string;
  interestSavedLabel: string;
  timeSavedLabel: string;

  // Extra payments impact banner
  extraPaymentsImpact: string;
  saves: string;
  inInterestPaysOff: string;
  monthsEarly: string;

  // Charts
  chartsTitle: string;
  tabDoughnut: string;
  tabBalance: string;
  tabArea: string;
  loadingChart: string;

  // Breakdown Table
  monthlyVsTotalBreakdown: string;
  categoryCol: string;
  monthlyYear1Col: string;
  lifetimeTotalCol: string;
  pctTotalCostCol: string;
  totalOutOfPocket: string;

  // Amortization Table
  amortizationScheduleTitle: string;
  amortizationSubtitle: string;
  annualSummaryTab: string;
  monthlyScheduleTab: string;
  biweeklyScheduleTab: string;
  searchSchedulePlaceholder: string;
  downloadCsv: string;
  yearCol: string;
  periodCol: string;
  dateRangeCol: string;
  paymentCol: string;
  principalCol: string;
  interestCol: string;
  extraCol: string;
  taxesInsCol: string;
  pmiFeesCol: string;
  balanceCol: string;
  prevPage: string;
  nextPage: string;
  pageOf: string;
  showingRecords: string;

  // Modals & Storage
  saveModalTitle: string;
  saveModalSubtitle: string;
  calcSummaryLabel: string;
  monthlyPayLabel: string;
  saveModalNameLabel: string;
  saveModalDescLabel: string;
  saveModalNamePlaceholder: string;
  saveModalDescPlaceholder: string;
  cancelBtn: string;
  resetBtn: string;
  confirmSaveBtn: string;
  saveSuccessMsg: string;
  savedLibraryTitle: string;
  noSavedCalculations: string;
  loadBtn: string;
  deleteBtn: string;
  clearAllSavedBtn: string;
}

export interface AmortizationLocaleOverlay {
  locale: Locale;
  title?: string;
  description?: string;

  // Action Bar
  managerTitle: string;
  savedCountBadge: string;
  printPdfBtn: string;
  saveBtn: string;
  savedBtn: string;
  shareSuccessMsg: string;

  // Input Card
  inputsTitle: string;
  inputsSubtitle: string;
  loanAmount: string;
  loanTermYears: string;
  loanTermMonths: string;
  interestRate: string;
  startMonth: string;
  startYear: string;
  monthOptions: Array<{ value: number; label: string }>;
  fullMonthNames: Array<string>;

  // Extra Payments
  optionalExtraPayments: string;
  extraMonthlyPayment: string;
  extraYearlyPayment: string;
  extraOneTimePayment: string;
  extraStartMonth: string;
  extraStartYear: string;

  // Actions & Validation
  calculateBtn: string;
  clearBtn: string;
  validationErrorAmount: string;
  validationErrorRate: string;
  validationErrorTerm: string;
  validationErrorMaxTerm: string;

  // Results
  monthlyPaymentTitle: string;
  totalPaymentsCount: string;
  paymentsLabel: string;
  totalPrincipal: string;
  totalInterest: string;
  totalAmountPaid: string;
  loanPayoffDate: string;
  interestSaved: string;

  // Comparison
  comparisonTitle: string;
  originalInterestVsNew: string;
  savedLabel: string;
  originalPayoffVsNew: string;
  timeSavedLabel: string;
  yearsLabel: string;
  monthsLabel: string;

  // Visual Charts
  chartsTitle: string;
  tabBreakdown: string;
  tabProgress: string;
  loadingPieChart: string;
  loadingProgressChart: string;

  // Schedule Table
  scheduleTitle: string;
  scheduleSubtitle: string;
  annualTab: string;
  monthlyTab: string;
  searchYearPlaceholder: string;
  searchPaymentPlaceholder: string;
  exportCsvBtn: string;
  exportExcelBtn: string;
  yearCol: string;
  paymentNumberCol: string;
  paymentDateCol: string;
  beginningBalanceCol: string;
  paymentAmountCol: string;
  principalPaidCol: string;
  interestPaidCol: string;
  extraPaidCol: string;
  endingBalanceCol: string;
  prevPage: string;
  nextPage: string;
  pageOf: string;
  showingRecords: string;

  // Save Modal
  saveModalTitle: string;
  saveModalSubtitle: string;
  calcSummaryLabel: string;
  monthlyPaySummary: string;
  saveNameLabel: string;
  saveNamePlaceholder: string;
  cancelBtn: string;
  confirmSaveBtn: string;
  saveSuccessMsg: string;
  savedCalculationsTitle: string;
  restoreBtn: string;
  deleteBtnTitle: string;
}

