import { FactorCalculatorOutputs } from "./types";

export function calculateFactorCalculator(inputs: Record<string, any>): FactorCalculatorOutputs {
  const n = Math.min(1000000, Math.max(1, Math.floor(Number(inputs.number) || 120)));
  const factors: number[] = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i * i !== n) factors.push(n / i);
    }
  }
  factors.sort((a, b) => a - b);
  let temp = n;
  const primes: number[] = [];
  let divisor = 2;
  while (temp >= 2) {
    if (temp % divisor === 0) {
      primes.push(divisor);
      temp /= divisor;
    } else divisor++;
  }
  return {
    factorsList: factors.join(", "),
    primeFactors: primes.join(" × "),
    factorCount: factors.length
  };
}
