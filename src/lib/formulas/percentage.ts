export function calculatePercentageOf(percent: number, value: number): number {
  return (percent / 100) * value;
}

export function calculatePercentageValue(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}

export function calculatePercentageChange(original: number, newValue: number): number {
  if (original === 0) return 0;
  return ((newValue - original) / original) * 100;
}
