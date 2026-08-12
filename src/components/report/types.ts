export interface ReportMeta {
  calculatorName: string;
  reportTitle: string;
  generatedDate: string;
  generatedTime: string;
  currencySymbol?: string;
}

export interface ReportKeyValuePair {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export interface ReportSectionData {
  title: string;
  items: ReportKeyValuePair[];
}

export interface ReportMetricCardData {
  label: string;
  value: string;
  subtitle?: string;
  colorTheme?: "blue" | "emerald" | "purple" | "amber" | "rose" | "cyan" | "indigo" | "teal";
}

export interface ReportTableHeader {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

export interface ReportTableData {
  title: string;
  headers: ReportTableHeader[];
  rows: Record<string, string | number>[];
  footerSummary?: string;
}

export interface ReportRecommendationData {
  title?: string;
  text: string;
  reasons?: string[];
  score?: number;
  rating?: string;
}

export interface CalculatorReportData {
  meta: ReportMeta;
  keyMetrics: ReportMetricCardData[];
  sections: ReportSectionData[];
  recommendation?: ReportRecommendationData;
  table?: ReportTableData;
  notes?: string[];
}
