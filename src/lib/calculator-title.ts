export function getCalculatorDisplayTitle(title?: string): string {
  if (!title) return "";
  return title
    .replace(/\s*\|.*$/, "")
    .replace(/\s+[-–—]\s+.*$/, "")
    .trim();
}

