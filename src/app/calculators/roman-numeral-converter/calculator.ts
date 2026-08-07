import { RomanNumeralConverterOutputs } from "./types";

export function calculateRomanNumeralConverter(inputs: Record<string, any>): RomanNumeralConverterOutputs {
  const num = Math.min(3999, Math.max(1, Math.floor(Number(inputs.numberVal) || 2026)));
  const lookup: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];
  let temp = num;
  let roman = "";
  for (const [val, sym] of lookup) {
    while (temp >= val) {
      roman += sym;
      temp -= val;
    }
  }
  return { romanNumeral: roman, arabicNumber: num };
}
