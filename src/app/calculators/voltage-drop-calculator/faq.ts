import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const voltage_drop_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is voltage drop?",
    answer:
      "Voltage drop is the reduction in voltage that occurs as current flows through the resistance and impedance of a circuit conductor. The receiving equipment therefore sees a lower voltage than the source when the circuit has nonzero voltage drop."
  },
  {
    question: "What is the basic voltage-drop formula?",
    answer:
      "For a two-wire DC or single-phase resistive circuit, the calculator uses: Vdrop = 2 × I × L × R / 1000, where current is in amperes, one-way distance is in feet, and resistance is expressed in ohms per 1,000 feet."
  },
  {
    question: "How do I calculate voltage drop percentage?",
    answer:
      "Use: Voltage Drop % = (Voltage Drop ÷ Supply Voltage) × 100. For example, 5.185 V of drop on a 120 V supply is approximately 4.32%."
  },
  {
    question: "How does wire size affect voltage drop?",
    answer:
      "Larger conductors generally have lower resistance, so increasing conductor size normally reduces voltage drop when the other circuit conditions remain unchanged. In AWG, remember that a smaller number means a larger conductor. Thus 10 AWG is larger than 12 AWG."
  },
  {
    question: "What is the difference between voltage drop and ampacity?",
    answer:
      "Ampacity concerns the amount of current a conductor can safely carry under specified conditions. Voltage drop concerns the voltage lost along the circuit. A conductor can satisfy an ampacity requirement and still have undesirable voltage drop on a long run."
  },
  {
    question: "Does wire length affect voltage drop?",
    answer:
      "Yes. With current and conductor impedance held constant, voltage drop is approximately proportional to conductor length. Doubling the relevant distance approximately doubles the calculated drop."
  },
  {
    question: "Does current affect voltage drop?",
    answer:
      "Yes. For the calculator's fixed-impedance models, voltage drop is approximately proportional to current. Doubling current approximately doubles the calculated voltage drop."
  },
  {
    question: "How is AC single-phase voltage drop different from DC voltage drop?",
    answer:
      "A basic DC calculation can use conductor resistance alone. AC calculations can also involve inductive reactance and power factor, which affect the effective impedance used in the voltage-drop calculation."
  },
  {
    question: "What is the three-phase voltage-drop formula?",
    answer:
      "For the calculator's balanced three-phase model: Vdrop = √3 × I × L × Zeff / 1000. The √3 factor is approximately 1.732 and comes from the phase relationship in a balanced three-phase system."
  },
  {
    question: "Does power factor affect voltage drop?",
    answer:
      "Yes, in the calculator's AC impedance model. Power factor determines the phase relationship between voltage and current and therefore affects how resistance and reactance contribute to effective impedance."
  },
  {
    question: "What is an acceptable voltage drop?",
    answer:
      "There is no single universal percentage that automatically establishes compliance for every electrical installation. Common design targets such as 3% or 5% are useful engineering criteria, but the applicable electrical code, installation conditions and equipment requirements must be evaluated separately."
  },
  {
    question: "Is 3% voltage drop required by the NEC?",
    answer:
      "The calculator should not describe 3% as a blanket mandatory NEC requirement. NEC voltage-drop language includes informational guidance in relevant sections, while other parts of electrical design contain mandatory requirements. The edition adopted by the local jurisdiction and the specific installation must be reviewed for a code determination. The page's own engineering content deliberately distinguishes code rules from voltage-drop guidance."
  },
  {
    question: "Is copper better than aluminum for voltage drop?",
    answer:
      "Copper generally has lower resistivity than aluminum for comparable conductor dimensions, but conductor selection is an engineering decision involving size, cost, installation conditions, terminations and applicable requirements. The calculator evaluates the selected material using its corresponding conductor data."
  },
  {
    question: "Does conduit material affect voltage drop?",
    answer:
      "It can affect AC reactance when the installation and conductor data account for magnetic effects. The calculator therefore distinguishes conduit conditions in its AC conductor model where applicable."
  },
  {
    question: "Does a longer cable always have more voltage drop?",
    answer:
      "Under the same current and conductor characteristics, a longer run produces more voltage drop. The relationship is approximately linear for the fixed-impedance equations used by the calculator."
  },
  {
    question: "What happens if I use two parallel conductors?",
    answer:
      "In the calculator's parallel-conductor model, effective resistance and reactance are reduced according to: R_eff = R/N and X_eff = X/N for N parallel conductors per phase. Actual installation requirements for parallel conductors still need separate verification."
  },
  {
    question: "What happens when current is zero?",
    answer:
      "With zero current, the calculated voltage drop is zero for the supported physical models. The calculator preserves a legitimate explicit zero rather than replacing it with a default value."
  },
  {
    question: "Can voltage drop be zero?",
    answer:
      "Yes. A zero drop can occur in the mathematical model when current or effective circuit impedance is zero, or when the modeled conductor distance is zero. In real installations, exact zero drop is generally an idealized condition."
  }
];
