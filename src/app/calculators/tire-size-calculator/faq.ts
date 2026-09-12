import { CalculatorFAQ } from "@/calculators/types";

export const tire_size_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What do the numbers in a tire size such as 225/50R17 mean?",
    answer:
      "In a standard metric tire marking, 225 is the nominal section width in millimetres, 50 is the aspect ratio as a percentage of that width, R indicates radial construction, and 17 is the nominal rim diameter in inches.",
  },
  {
    question: "How do I calculate tire diameter?",
    answer:
      "Calculate sidewall height first: H = W × AR / 100. Then convert the sidewall to inches (H_in = H_mm / 25.4) and use: D = Rim + 2H. For 225/50R17, this produces approximately 25.86 inches.",
  },
  {
    question: "How much bigger is 245/45R18 than 225/50R17?",
    answer:
      "Using nominal tire geometry, 225/50R17 is approximately 25.86 inches in diameter and 245/45R18 is approximately 26.68 inches. The difference is about 0.82 inch, or 3.2%.",
  },
  {
    question: "How does a larger tire affect the speedometer?",
    answer:
      "For the calculator's geometric comparison, a larger tire travels farther per revolution. Therefore, if the vehicle remains calibrated for the smaller stock tire, actual road speed can be higher than the indicated speed. For the reference example, 65 mph indicated corresponds to about 67.1 mph actual.",
  },
  {
    question: "How do I calculate speedometer error from tire size?",
    answer:
      "A simplified diameter-based relationship is: V_actual = V_indicated × (D_new / D_stock). The percentage speed difference is closely related to the percentage change in rolling diameter.",
  },
  {
    question: "What is the difference between section width and tread width?",
    answer:
      "Section width is the nominal maximum width of the inflated tire under the applicable measurement conditions. Tread width refers to the width of the tread area and is not necessarily equal to section width.",
  },
  {
    question: "What does wheel offset ET mean?",
    answer:
      "ET is the wheel offset measured in millimetres relative to the wheel centerline. Positive, zero and negative offsets position the wheel mounting face differently and therefore change inner clearance and outer fender position.",
  },
  {
    question: "How does wheel width affect offset fitment?",
    answer:
      "Changing wheel width moves the inner and outer edges of the wheel even if ET stays the same. Changing both width and ET can therefore substantially alter suspension clearance and fender poke. The calculator evaluates those effects together.",
  },
  {
    question: "What is backspacing?",
    answer:
      "Backspacing is the distance from the wheel's mounting face toward the inner edge of the wheel. It is useful when evaluating inner suspension clearance and should be considered alongside wheel width and offset.",
  },
  {
    question: "How does a larger tire affect gearing?",
    answer:
      "A larger tire covers more road distance per revolution, effectively making the final drive numerically taller. The calculator models this as: R_effective = R_stock × (D_stock / D_new), so a larger tire lowers the effective numerical ratio.",
  },
  {
    question: "Is a 3% tire-diameter change always safe?",
    answer:
      "No. The calculator uses 3% as a warning threshold, but that is not a universal guarantee of ABS, ESC, transmission, suspension or legal compatibility. Vehicle-specific manufacturer recommendations, load capacity, clearance and other requirements must still be checked.",
  },
  {
    question: "How do I know whether a replacement tire has enough load capacity?",
    answer:
      "Check the tire's load index and compare it with the vehicle manufacturer's requirements. Load index is a code corresponding to a maximum load under specified conditions; it is not itself a weight unit. ETRTO explicitly describes the service description as a load index combined with a speed symbol.",
  },
  {
    question: "What does the speed rating on a tire mean?",
    answer:
      "The speed symbol is the letter in the tire's service description that identifies its rated maximum speed capability under the applicable standardized conditions. It should not be interpreted independently of the tire's load, inflation and application requirements.",
  },
  {
    question: "How do I convert 225/75R16 to a 33-inch tire?",
    answer:
      "First calculate the original tire's actual nominal diameter from section width, aspect ratio and rim diameter. Then compare the result with the proposed 33-inch flotation tire. A tire called '33-inch' is nominally 33 inches in overall diameter, but actual dimensions can vary by tire model and measurement conditions.",
  },
  {
    question: "Does plus sizing preserve the original tire diameter?",
    answer:
      "Not automatically. Plus sizing is intended to combine a larger wheel with a lower-profile tire while maintaining a similar rolling diameter, but the actual replacement dimensions should always be calculated. The calculator performs that dimensional comparison rather than assuming equivalence.",
  },
  {
    question: "How much does ride height change when tire diameter changes?",
    answer:
      "The geometric change in tire radius is approximately half the change in diameter. For example, a 0.82-inch diameter increase corresponds to approximately a 0.41-inch increase in radius. Actual vehicle ride height can differ under load because tires deform and suspension systems move.",
  },
  {
    question: "How do I find the recommended tire size for my vehicle?",
    answer:
      "Start with the tire information placard and owner's manual. NHTSA advises using the vehicle manufacturer's original or recommended tire size and following the manufacturer's recommended cold inflation pressure.",
  },
  {
    question: "How do I read the DOT tire date?",
    answer:
      "The final four digits of the applicable date portion indicate the production week and year. For example, 1326 means the 13th week of 2026. NHTSA documentation describes the date code as part of the Tire Identification Number system.",
  },
];
