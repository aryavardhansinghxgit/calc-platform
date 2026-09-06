import { Metadata } from "next";

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://calcplatform.com";
const canonicalUrl = `${DEFAULT_BASE_URL}/calculators/binary-calculator`;

export const binary_calculatorMetadata: Metadata = {
  title: "Binary Calculator – Binary Arithmetic, Bitwise & Base Converter",
  description:
    "Free binary calculator for addition, subtraction, multiplication, division, modulo, AND, OR, XOR, NOT and shifts. Convert binary, decimal, hex and bases 2–36 with exact BigInt precision.",
  keywords: [
    "binary calculator",
    "binary calculator online",
    "binary arithmetic calculator",
    "binary addition calculator",
    "binary subtraction calculator",
    "binary multiplication calculator",
    "binary division calculator",
    "binary modulo calculator",
    "bitwise calculator",
    "bitwise AND OR XOR calculator",
    "binary shift calculator",
    "binary to decimal converter",
    "decimal to binary converter",
    "binary to hexadecimal converter",
    "binary to octal converter",
    "hexadecimal to binary converter",
    "base converter",
    "base 2 calculator",
    "base 16 calculator",
    "base 36 converter",
    "two's complement calculator",
    "signed binary calculator",
    "unsigned binary calculator",
    "binary number converter",
    "binary arithmetic with steps",
    "binary calculator with steps",
    "arbitrary precision binary calculator",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Binary Calculator – Binary Arithmetic, Bitwise & Base Converter",
    description:
      "Free binary calculator for addition, subtraction, multiplication, division, modulo, AND, OR, XOR, NOT and shifts. Convert binary, decimal, hex and bases 2–36 with exact BigInt precision.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${DEFAULT_BASE_URL}/og?title=${encodeURIComponent("Binary Calculator – Binary Arithmetic, Bitwise & Base Converter")}`,
        width: 1200,
        height: 630,
        alt: "Binary Calculator – Binary Arithmetic, Bitwise & Base Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Binary Calculator – Binary Arithmetic, Bitwise & Base Converter",
    description:
      "Free binary calculator for addition, subtraction, multiplication, division, modulo, AND, OR, XOR, NOT and shifts. Convert binary, decimal, hex and bases 2–36 with exact BigInt precision.",
    images: [
      `${DEFAULT_BASE_URL}/og?title=${encodeURIComponent("Binary Calculator – Binary Arithmetic, Bitwise & Base Converter")}`,
    ],
  },
};

export default binary_calculatorMetadata;
