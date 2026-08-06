/**
 * Analytics Event Logging Framework.
 */

export type CalculatorAnalyticsEvent =
  | "Calculator Opened"
  | "Calculation Performed"
  | "Calculator Shared"
  | "PDF Downloaded"
  | "Calculator Printed";

export interface AnalyticsPayload {
  event: CalculatorAnalyticsEvent;
  calculatorId: string;
  calculatorTitle: string;
  timestamp?: number;
  metadata?: Record<string, unknown>;
}

export function trackCalculatorEvent(payload: AnalyticsPayload): void {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Tracked]: ${payload.event}`, payload);
  }
}
