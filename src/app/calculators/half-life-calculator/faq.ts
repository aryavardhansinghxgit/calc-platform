import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const half_life_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "Can half-life be altered by temperature or pressure?",
    answer: "No. Physical radioactive half-life is an intrinsic property of atomic nuclear structure governed by the weak and strong nuclear forces. Extreme changes in ambient temperature, atmospheric pressure, or chemical bonding do not alter radioactive half-life."
  },
  {
    question: "What is the difference between physical and biological half-life?",
    answer: "Physical half-life is the time required for 50% of radioactive atomic nuclei in a sample to spontaneously decay. Biological half-life is the time required for a living organism to metabolize or excrete 50% of an administered drug or substance."
  },
  {
    question: "How is Carbon-14 used for radiocarbon dating?",
    answer: "Living organisms continuously absorb Carbon-14 from the atmosphere. Upon death, absorption stops and Carbon-14 decays with a half-life of 5,730 years. By measuring the remaining ratio of C-14 to C-12, scientists determine the age of organic material up to 50,000 years."
  },
  {
    question: "What is the relationship between decay constant (λ) and mean lifetime (τ)?",
    answer: "The decay constant λ represents the fraction of atoms decaying per unit time (λ = ln(2) / t½). Mean lifetime τ represents the average lifespan of an individual atom before decay (τ = 1 / λ = t½ / ln(2) ≈ 1.4427 × t½)."
  },
  {
    question: "How many half-lives does it take for a substance to completely disappear?",
    answer: "Mathematically, exponential decay never reaches absolute zero. However, after 10 half-lives (10t½), less than 0.1% (1/1024th) of the original quantity remains, which is functionally negligible for most practical purposes."
  },
  {
    question: "What is the half-life equation formula?",
    answer: "The standard formula is N(t) = N₀ × (1/2)^(t / t½), where N(t) is the remaining quantity, N₀ is initial quantity, t is elapsed time, and t½ is half-life."
  },
  {
    question: "How do you calculate remaining radioisotope quantity after elapsed time?",
    answer: "Divide the elapsed time by the half-life to get the number of cycles n = t / t½. Then multiply the initial quantity by 0.5 raised to power n: N(t) = N₀ × (0.5)^n."
  },
  {
    question: "Why is Technetium-99m used so widely in nuclear medicine?",
    answer: "Technetium-99m has an ideal half-life of 6.006 hours—long enough to complete diagnostic SPECT scans and clear organ imaging, yet short enough to minimize patient radiation exposure."
  },
  {
    question: "What is the difference between Becquerels (Bq) and Curies (Ci)?",
    answer: "Both measure radioactive activity (decays per second). 1 Becquerel (Bq) equals 1 disintegration per second (SI unit). 1 Curie (Ci) equals 3.7 × 10¹0 disintegrations per second."
  },
  {
    question: "How is drug elimination half-life calculated in pharmacokinetics?",
    answer: "Drug half-life is calculated as t½ = (0.693 × Vd) / CL, where Vd is the volume of distribution and CL is clearance rate."
  }
];

export default half_life_calculatorFaqs;
