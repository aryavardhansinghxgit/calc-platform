import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const big_number_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Big Number Calculator – Arbitrary Precision & Large Integer Math",
    description: "Calculate huge integers exactly with arbitrary-precision arithmetic. Add, subtract, multiply, divide, modulo, powers, GCD, LCM, factorials, nPr, nCr and more.",
    slug: "big-number-calculator"
  }),
  title: "Big Number Calculator – Arbitrary Precision & Large Integer Math | CalcPlatform",
  description: "Calculate huge integers exactly with arbitrary-precision arithmetic. Add, subtract, multiply, divide, modulo, powers, GCD, LCM, factorials, nPr, nCr and more.",
  keywords: [
    "big number calculator",
    "arbitrary precision calculator",
    "large number calculator",
    "big integer calculator",
    "arbitrary precision arithmetic",
    "BigInt calculator",
    "large integer calculator",
    "big number multiplication",
    "big number addition",
    "big number division",
    "modular exponentiation calculator",
    "large factorial calculator",
    "nCr calculator",
    "nPr calculator",
    "GCD calculator for large numbers",
    "LCM calculator for large numbers",
    "large number primality test",
    "digit frequency calculator"
  ]
};

