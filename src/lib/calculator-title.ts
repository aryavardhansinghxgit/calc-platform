export function getCalculatorDisplayTitle(title: string): string {
  return title.replace(/\s+[-–—]\s+.*$/, "").trim();
}
