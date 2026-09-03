export interface RatioCalculatorInputs {
  valA?: number;
  valB?: number;
  valC?: number;
  valD?: number;
  target?: "A" | "B" | "C" | "D";
}

export interface RatioCalculatorOutputs {
  valX: number;
  simplifiedRatio: string;
  unitRate?: number;
  gcd?: number;
}
