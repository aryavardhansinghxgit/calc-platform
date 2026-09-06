import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const half_life_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is half-life in simple terms?",
    answer: "Half-life is the time required for half of a radioactive quantity or activity to remain after radioactive decay. After each additional half-life, half of what remains is lost again."
  },
  {
    question: "How do you calculate half-life?",
    answer: "For radioactive exponential decay: N(t) = N₀ × (1/2)^(t / t½). When the initial amount N₀, remaining amount N(t), and elapsed time t are known, rearrange the equation to solve for half-life: t½ = t × ln(2) / ln(N₀ / N(t))."
  },
  {
    question: "What is the formula for radioactive decay?",
    answer: "A common form is N(t) = N₀ × e^(-λt), or equivalently N(t) = N₀ × (1/2)^(t / t½). The two forms are mathematically identical when λ = ln(2) / t½ ≈ 0.693147 / t½."
  },
  {
    question: "What remains after two half-lives?",
    answer: "After two half-lives: (1/2)² = 1/4, so exactly 25% of the original quantity remains."
  },
  {
    question: "What remains after three half-lives?",
    answer: "After three half-lives: (1/2)³ = 1/8, so exactly 12.5% of the original quantity remains."
  },
  {
    question: "Does a radioactive sample ever reach exactly zero?",
    answer: "Under the ideal exponential decay model, quantity approaches zero asymptotically rather than reaching exact zero at a finite time. In practice, after about 10 half-lives, less than 0.1% remains, which is negligible for most physical applications."
  },
  {
    question: "Can I calculate half-life if I know only the initial and remaining amounts?",
    answer: "No. You also need the elapsed time t, or enough additional decay-rate information to establish the time scale."
  },
  {
    question: "Can this calculator solve for elapsed time?",
    answer: "Yes. Enter initial amount N₀, remaining amount N(t), and half-life t½, then select 'Elapsed Time t' as the variable to solve. The calculator evaluates t = t½ × ln(N₀ / N(t)) / ln(2)."
  },
  {
    question: "Can this calculator solve for the original amount?",
    answer: "Yes. The inverse solver can calculate N₀ from remaining quantity N(t), half-life t½, and elapsed time t using N₀ = N(t) × 2^(t / t½)."
  },
  {
    question: "What is the decay constant?",
    answer: "The decay constant λ describes the fractional exponential decay rate per unit time and is related to half-life by λ = ln(2) / t½. Its unit is reciprocal time, such as year⁻¹ or s⁻¹."
  },
  {
    question: "What is mean lifetime?",
    answer: "Mean lifetime τ is the reciprocal of the decay constant: τ = 1 / λ = t½ / ln(2) ≈ 1.4427 × t½. It represents the average lifespan of a radioactive nucleus before decaying."
  },
  {
    question: "What is the half-life of carbon-14?",
    answer: "Carbon-14 has an authoritative half-life of approximately 5,730 years. It is widely used in archaeology and geology for radiocarbon dating of organic material up to 50,000 years old."
  },
  {
    question: "Is half-life the same as effective half-life?",
    answer: "No. Physical half-life describes purely radioactive nuclear decay, biological half-life describes metabolic excretion, and effective half-life combines both mechanisms in nuclear medicine (1/t_eff = 1/t_phys + 1/t_biol)."
  },
  {
    question: "Can I use different time units?",
    answer: "Yes. The calculator supports seconds, minutes, hours, days, weeks, months, years, and millennia, automatically performing consistent dimensional conversions behind the scenes."
  },
  {
    question: "Why does the graph become flatter with time?",
    answer: "Exponential decay removes the same constant percentage during each equal time interval rather than a constant fixed amount. As the quantity becomes smaller, each 50% reduction represents a progressively smaller absolute amount, causing the curve to level out smoothly."
  }
];

export default half_life_calculatorFaqs;
