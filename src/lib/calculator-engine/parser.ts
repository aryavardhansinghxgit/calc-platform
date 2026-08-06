/**
 * Expression parser for evaluating math tokens and string formulas.
 */

export function parseExpression(expression: string): string[] {
  if (!expression) return [];
  return expression.trim().split(/\s+/);
}
