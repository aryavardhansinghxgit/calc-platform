/**
 * Enterprise Typed Error Hierarchy for Calculator Engine & Platform.
 */

export class CalculatorError extends Error {
  public readonly timestamp: string;

  constructor(message: string, public readonly code: string = "CALCULATOR_ERROR") {
    super(message);
    this.name = "CalculatorError";
    this.timestamp = new Date().toISOString();
  }
}

export class ValidationError extends CalculatorError {
  constructor(message: string, public readonly fieldErrors?: Record<string, string>) {
    super(message, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class CalculationError extends CalculatorError {
  constructor(message: string) {
    super(message, "CALCULATION_ERROR");
    this.name = "CalculationError";
  }
}

export class PluginNotFoundError extends CalculatorError {
  constructor(slug: string) {
    super(`Calculator plugin with slug '${slug}' not found in registry.`, "PLUGIN_NOT_FOUND");
    this.name = "PluginNotFoundError";
  }
}
